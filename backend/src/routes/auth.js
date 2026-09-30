import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { pool } from '../db.js'
import { requireAuth } from '../middleware/auth.js'
import { sendTempPasswordEmail } from '../mailer.js'

export const authRouter = Router()

// ดึง permissions ของ role มาเป็น array ของ 'resource:action' เพื่อฝังลง JWT
async function getPermissionsForRole(roleId) {
  if (!roleId) return []
  const { rows } = await pool.query(
    `SELECT p.resource, p.action FROM role_permissions rp
     JOIN permissions p ON p.id = rp.permission_id
     WHERE rp.role_id = $1`,
    [roleId]
  )
  return rows.map((r) => `${r.resource}:${r.action}`)
}

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) {
    return res.status(400).json({ error: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' })
  }

  const { rows } = await pool.query(
    `SELECT u.id, u.username, u.password_hash, u.role_id, u.display_name,
            u.temp_password_hash, u.temp_password_expires,
            r.name as role_name, r.label as role_label
     FROM admin_users u
     LEFT JOIN roles r ON r.id = u.role_id
     WHERE u.username = $1`,
    [username]
  )
  const user = rows[0]
  if (!user) {
    return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' })
  }

  const hasValidTemp =
    !!user.temp_password_hash &&
    !!user.temp_password_expires &&
    new Date(user.temp_password_expires) > new Date()

  // บัญชีที่ admin สร้างไว้แต่ยังไม่เคยตั้งรหัสผ่านครั้งแรก (และไม่มีรหัสชั่วคราวที่ยังใช้ได้)
  if (!user.password_hash && !hasValidTemp) {
    return res.status(403).json({
      error: 'บัญชีนี้ยังไม่ได้ตั้งรหัสผ่าน กรุณาใช้ลิงก์ตั้งรหัสผ่านที่ผู้ดูแลระบบส่งให้',
      needsSetup: true,
    })
  }

  // ลองรหัสผ่านจริงก่อน แล้วค่อยลองรหัสชั่วคราวที่ส่งทางอีเมล
  let ok = user.password_hash ? await bcrypt.compare(password, user.password_hash) : false
  let mustChange = false
  if (!ok && hasValidTemp) {
    ok = await bcrypt.compare(password, user.temp_password_hash)
    mustChange = ok
  }
  if (!ok) {
    return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' })
  }

  // เข้าด้วยรหัสจริงได้แล้ว (จำรหัสเดิมได้) -> ยกเลิกรหัสชั่วคราวที่ค้างอยู่
  if (!mustChange && user.temp_password_hash) {
    await pool.query(
      `UPDATE admin_users SET temp_password_hash = NULL, temp_password_expires = NULL WHERE id = $1`,
      [user.id]
    )
  }

  // เข้าด้วยรหัสชั่วคราว: ออก token อายุสั้น ไม่มีสิทธิ์ใดๆ ใช้ได้แค่เปลี่ยนรหัสผ่านเท่านั้น
  if (mustChange) {
    const token = jwt.sign(
      { sub: user.id, username: user.username, mustChange: true, permissions: [] },
      process.env.JWT_SECRET,
      { expiresIn: '30m' }
    )
    return res.json({ token, username: user.username, mustChangePassword: true })
  }

  const permissions = await getPermissionsForRole(user.role_id)

  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username,
      role: user.role_name,
      roleLabel: user.role_label,
      permissions,
    },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  )

  res.json({ token, username: user.username, role: user.role_name, roleLabel: user.role_label })
})

// ลืมรหัสผ่านด้วยตัวเอง: รับ username หรืออีเมล -> สุ่มรหัสผ่านชั่วคราวส่งไปที่อีเมลของบัญชีนั้น
// เมื่อเข้าสู่ระบบด้วยรหัสชั่วคราว ระบบจะบังคับให้ผู้ใช้ตั้งรหัสผ่านใหม่ด้วยตัวเองทันที
// หลักการสำคัญ:
//  - ตอบข้อความเดิมเสมอไม่ว่าจะเจอบัญชีหรือไม่ (กันคนเดาว่ามี username/อีเมลไหนในระบบ)
//  - รหัสชั่วคราวเก็บแยกจาก password_hash และรหัสเดิมยังใช้ได้อยู่ (กันคนอื่นแกล้งกดลืมรหัสเพื่อล็อกบัญชีเจ้าของ)
//  - รหัสชั่วคราวอายุสั้น และหายไปเมื่อตั้งรหัสใหม่แล้ว
const TEMP_PASSWORD_MINUTES = 30
const RESET_COOLDOWN_SECONDS = 60
const FORGOT_GENERIC_MESSAGE =
  'หากมีบัญชีนี้อยู่ในระบบและมีอีเมลที่ลงทะเบียนไว้ เราได้ส่งรหัสผ่านชั่วคราวไปให้แล้ว กรุณาตรวจสอบอีเมล (รวมถึงกล่องจดหมายขยะ)'

// สุ่มรหัสผ่าน 10 ตัว ตัดตัวที่สับสนง่าย (0/O, 1/l/I) และรับประกันว่ามีตัวพิมพ์ใหญ่ ตัวเล็ก และตัวเลข
function generateTempPassword(length = 10) {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const lower = 'abcdefghijkmnopqrstuvwxyz'
  const digits = '23456789'
  const all = upper + lower + digits
  const pick = (chars) => chars[crypto.randomInt(chars.length)]

  const chars = [pick(upper), pick(lower), pick(digits)]
  while (chars.length < length) chars.push(pick(all))
  // สลับตำแหน่งแบบสุ่ม (Fisher-Yates) ไม่ให้ 3 ตัวแรกเป็นรูปแบบตายตัว
  for (let i = chars.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1)
    ;[chars[i], chars[j]] = [chars[j], chars[i]]
  }
  return chars.join('')
}

authRouter.post('/forgot-password', async (req, res) => {
  const identifier = String(req.body?.identifier || '').trim()
  if (!identifier) {
    return res.status(400).json({ error: 'กรุณากรอกชื่อผู้ใช้หรืออีเมล' })
  }

  try {
    // ถ้าไม่ได้บันทึก email แยกไว้ แต่ username เป็นรูปแบบอีเมลอยู่แล้ว ใช้ username เป็นที่อยู่ส่งได้เลย
    const { rows } = await pool.query(
      `SELECT id, username, display_name,
              COALESCE(NULLIF(email, ''), CASE WHEN username LIKE '%@%' THEN username END) AS send_to,
              last_reset_requested_at
       FROM admin_users
       WHERE lower(username) = lower($1) OR lower(email) = lower($1)
       LIMIT 1`,
      [identifier]
    )
    const user = rows[0]

    if (user?.send_to) {
      const last = user.last_reset_requested_at ? new Date(user.last_reset_requested_at).getTime() : 0
      const tooSoon = Date.now() - last < RESET_COOLDOWN_SECONDS * 1000

      if (!tooSoon) {
        const tempPassword = generateTempPassword()
        const hash = await bcrypt.hash(tempPassword, 10)
        const expires = new Date(Date.now() + TEMP_PASSWORD_MINUTES * 60 * 1000)

        await pool.query(
          `UPDATE admin_users
           SET temp_password_hash = $1, temp_password_expires = $2, last_reset_requested_at = now()
           WHERE id = $3`,
          [hash, expires, user.id]
        )

        const siteUrl = (process.env.SITE_URL || process.env.CORS_ORIGIN?.split(',')[0] || 'http://localhost:5173')
          .trim()
          .replace(/\/$/, '')

        try {
          await sendTempPasswordEmail({
            to: user.send_to,
            username: user.username,
            displayName: user.display_name,
            tempPassword,
            expiresMinutes: TEMP_PASSWORD_MINUTES,
            siteUrl,
          })
        } catch (mailErr) {
          // ส่งเมลไม่สำเร็จ -> ยกเลิกรหัสชั่วคราว ไม่ให้ค้างในระบบโดยที่ผู้ใช้ไม่เคยได้รับ
          await pool.query(
            `UPDATE admin_users SET temp_password_hash = NULL, temp_password_expires = NULL WHERE id = $1`,
            [user.id]
          )
          throw mailErr
        }
      }
    }
  } catch (err) {
    // ไม่บอกรายละเอียดให้ผู้ใช้ (กันเดาข้อมูล) แต่ log ไว้ให้ดูฝั่งเซิร์ฟเวอร์
    console.error('forgot-password ล้มเหลว:', err)
  }

  res.json({ ok: true, message: FORGOT_GENERIC_MESSAGE })
})

// ตั้งรหัสผ่านครั้งแรก ด้วย setup_token ที่ admin สร้างให้ (ดู routes/users.js)
authRouter.post('/setup-password', async (req, res) => {
  const { token: setupToken, password } = req.body || {}
  if (!setupToken || !password) {
    return res.status(400).json({ error: 'ข้อมูลไม่ครบ' })
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร' })
  }

  const { rows } = await pool.query(
    `SELECT id, setup_token_expires FROM admin_users WHERE setup_token = $1`,
    [setupToken]
  )
  const user = rows[0]
  if (!user) {
    return res.status(400).json({ error: 'ลิงก์ตั้งรหัสผ่านไม่ถูกต้องหรือถูกใช้ไปแล้ว' })
  }
  if (user.setup_token_expires && new Date(user.setup_token_expires) < new Date()) {
    return res.status(400).json({ error: 'ลิงก์ตั้งรหัสผ่านหมดอายุแล้ว กรุณาติดต่อผู้ดูแลระบบ' })
  }

  const hash = await bcrypt.hash(password, 10)
  await pool.query(
    `UPDATE admin_users SET password_hash = $1, setup_token = NULL, setup_token_expires = NULL WHERE id = $2`,
    [hash, user.id]
  )

  res.json({ ok: true })
})

// เช็คว่า setup_token ยังใช้ได้อยู่ไหม (หน้าตั้งรหัสผ่านเรียกก่อน แสดงชื่อ user ให้เห็น)
authRouter.get('/setup-password/:token', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT username, display_name, setup_token_expires FROM admin_users WHERE setup_token = $1`,
    [req.params.token]
  )
  const user = rows[0]
  if (!user) return res.status(404).json({ error: 'ลิงก์ไม่ถูกต้อง' })
  if (user.setup_token_expires && new Date(user.setup_token_expires) < new Date()) {
    return res.status(400).json({ error: 'ลิงก์หมดอายุแล้ว' })
  }
  res.json({ username: user.username, displayName: user.display_name })
})

authRouter.get('/me', requireAuth, async (req, res) => {
  const { rows } = await pool.query(
    `SELECT u.username, r.name as role_name, r.label as role_label
     FROM admin_users u
     LEFT JOIN roles r ON r.id = u.role_id
     WHERE u.id = $1`,
    [req.user.sub]
  )
  const user = rows[0]
  if (!user) return res.status(401).json({ error: 'ไม่พบผู้ใช้นี้แล้ว' })

  const permissions = await getPermissionsForRole(
    (await pool.query('SELECT role_id FROM admin_users WHERE id = $1', [req.user.sub])).rows[0]?.role_id
  )

  res.json({
    username: user.username,
    role: user.role_name,
    roleLabel: user.role_label,
    permissions,
  })
})

// เปลี่ยนรหัสผ่านของตัวเอง (ต้อง login อยู่แล้ว + ยืนยันรหัสเก่าให้ถูกก่อน)
authRouter.post('/change-password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {}
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'กรุณากรอกรหัสผ่านเดิมและรหัสผ่านใหม่' })
  }
  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร' })
  }
  if (newPassword === currentPassword) {
    return res.status(400).json({ error: 'รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านเดิม' })
  }

  const { rows } = await pool.query(
    `SELECT id, password_hash, temp_password_hash, temp_password_expires FROM admin_users WHERE id = $1`,
    [req.user.sub]
  )
  const user = rows[0]
  if (!user) {
    return res.status(401).json({ error: 'ไม่พบผู้ใช้นี้แล้ว' })
  }

  // "รหัสเดิม" ที่ยืนยันได้ คือรหัสผ่านปัจจุบัน หรือรหัสชั่วคราวที่ส่งทางอีเมล (ถ้ายังไม่หมดอายุ)
  const hasValidTemp =
    !!user.temp_password_hash &&
    !!user.temp_password_expires &&
    new Date(user.temp_password_expires) > new Date()

  let ok = user.password_hash ? await bcrypt.compare(currentPassword, user.password_hash) : false
  if (!ok && hasValidTemp) {
    ok = await bcrypt.compare(currentPassword, user.temp_password_hash)
  }
  if (!ok) {
    return res.status(401).json({ error: 'รหัสผ่านเดิมไม่ถูกต้อง' })
  }

  // ตั้งรหัสใหม่สำเร็จ -> ล้างรหัสชั่วคราวทิ้งด้วย
  const hash = await bcrypt.hash(newPassword, 10)
  await pool.query(
    `UPDATE admin_users
     SET password_hash = $1, temp_password_hash = NULL, temp_password_expires = NULL
     WHERE id = $2`,
    [hash, user.id]
  )

  res.json({ ok: true })
})

export function generateSetupToken() {
  return crypto.randomBytes(24).toString('hex')
}
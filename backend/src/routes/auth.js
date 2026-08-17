import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { pool } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

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
    `SELECT u.id, u.username, u.password_hash, u.role_id, u.display_name, r.name as role_name, r.label as role_label
     FROM admin_users u
     LEFT JOIN roles r ON r.id = u.role_id
     WHERE u.username = $1`,
    [username]
  )
  const user = rows[0]
  if (!user) {
    return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' })
  }

  // บัญชีที่ admin สร้างไว้แต่ยังไม่เคยตั้งรหัสผ่านครั้งแรก
  if (!user.password_hash) {
    return res.status(403).json({
      error: 'บัญชีนี้ยังไม่ได้ตั้งรหัสผ่าน กรุณาใช้ลิงก์ตั้งรหัสผ่านที่ผู้ดูแลระบบส่งให้',
      needsSetup: true,
    })
  }

  const ok = await bcrypt.compare(password, user.password_hash)
  if (!ok) {
    return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' })
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

// ใช้ให้ frontend เช็คว่า token ที่เก็บไว้ยังใช้ได้อยู่ไหม (ตอนโหลดหน้าเว็บใหม่)
authRouter.get('/me', requireAuth, async (req, res) => {
  res.json({
    username: req.user.username,
    role: req.user.role,
    roleLabel: req.user.roleLabel,
    permissions: req.user.permissions,
  })
})

export function generateSetupToken() {
  return crypto.randomBytes(24).toString('hex')
}
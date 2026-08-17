import { Router } from 'express'
import { pool } from '../db.js'
import { requireAuth } from '../middleware/auth.js'
import { requirePermission } from '../middleware/requirePermission.js'
import { generateSetupToken } from './auth.js'

export const usersRouter = Router()

usersRouter.use(requireAuth)

// GET /api/users/roles-assignable -> รายชื่อ role ที่ผู้ใช้ปัจจุบันมีสิทธิ์กำหนดให้คนอื่นได้
// (ไม่ใช่ super_admin เพราะ role นั้นกำหนดได้เฉพาะ super_admin เท่านั้น กันการยกระดับสิทธิ์)
// ไม่แนบ permissions ของแต่ละ role มาด้วย เพื่อไม่ให้ role ที่ไม่ใช่ super_admin เห็นว่า role อื่นมีสิทธิ์อะไรบ้าง
usersRouter.get('/roles-assignable', requirePermission('USERS', 'view'), async (req, res) => {
  const isSuperAdmin = req.user?.role === 'super_admin'
  const { rows } = await pool.query(
    `SELECT id, name, label FROM roles ${isSuperAdmin ? '' : "WHERE name != 'super_admin'"} ORDER BY id`
  )
  res.json(rows)
})

// GET /api/users -> รายชื่อ user ทั้งหมด พร้อม role
usersRouter.get('/', requirePermission('USERS', 'view'), async (req, res) => {
  const { rows } = await pool.query(
    `SELECT u.id, u.username, u.display_name, u.created_at,
            u.password_hash IS NOT NULL as has_password,
            r.id as role_id, r.name as role_name, r.label as role_label
     FROM admin_users u
     LEFT JOIN roles r ON r.id = u.role_id
     ORDER BY u.created_at DESC`
  )

  res.json(rows)
})

// POST /api/users -> admin สร้างบัญชีใหม่ (ยังไม่มีรหัสผ่าน) คืนลิงก์ตั้งรหัสผ่านกลับไป
usersRouter.post('/', requirePermission('USERS', 'create'), async (req, res) => {
  const { username, displayName, roleId } = req.body || {}
  if (!username || !roleId) {
    return res.status(400).json({ error: 'กรุณาระบุ username และ role' })
  }

  const { rows: existing } = await pool.query('SELECT id FROM admin_users WHERE username = $1', [username])
  if (existing[0]) {
    return res.status(409).json({ error: 'มีชื่อผู้ใช้นี้อยู่แล้ว' })
  }

  // กัน role ที่ไม่ใช่ super_admin มอบสิทธิ์ super_admin ให้บัญชีอื่น (ยกระดับสิทธิ์)
  if (req.user?.role !== 'super_admin') {
    const { rows: roleCheck } = await pool.query('SELECT name FROM roles WHERE id = $1', [roleId])
    if (roleCheck[0]?.name === 'super_admin') {
      return res.status(403).json({ error: 'เฉพาะผู้ดูแลระบบสูงสุดเท่านั้นที่มอบสิทธิ์นี้ได้' })
    }
  }

  // กัน role ที่ไม่ใช่ super_admin มอบสิทธิ์ super_admin ให้บัญชีอื่น (ยกระดับสิทธิ์)
  if (req.user?.role !== 'super_admin') {
    const { rows: roleCheck } = await pool.query('SELECT name FROM roles WHERE id = $1', [roleId])
    if (roleCheck[0]?.name === 'super_admin') {
      return res.status(403).json({ error: 'เฉพาะผู้ดูแลระบบสูงสุดเท่านั้นที่มอบสิทธิ์นี้ได้' })
    }
  }

  if (existing[0]) {
    return res.status(409).json({
      error: 'มีชื่อผู้ใช้นี้อยู่แล้ว'
    })
  }

  const setupToken = generateSetupToken()
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const { rows } = await pool.query(
    `INSERT INTO admin_users
      (username, display_name, role_id, setup_token, setup_token_expires)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, username, display_name`,
    [username, displayName || null, roleId, setupToken, expires]
  )

  // ไม่มีระบบส่งอีเมลในโปรเจกต์นี้
  // ส่ง token กลับไปให้ frontend ประกอบเป็นลิงก์เต็มเอง
  res.status(201).json({
    ...rows[0],
    setupToken,
  })
}) // <-- ตรงนี้ที่ขาด


// PATCH /api/users/:id -> เปลี่ยน role ของ user
usersRouter.patch('/:id', requirePermission('USERS', 'update'), async (req, res) => {
  const { roleId } = req.body || {}
  if (!roleId) return res.status(400).json({ error: 'กรุณาระบุ role' })

  if (req.user?.role !== 'super_admin') {
    const [{ rows: newRoleCheck }, { rows: targetUserCheck }] = await Promise.all([
      pool.query('SELECT name FROM roles WHERE id = $1', [roleId]),
      pool.query(
        `SELECT r.name FROM admin_users u LEFT JOIN roles r ON r.id = u.role_id WHERE u.id = $1`,
        [req.params.id]
      ),
    ])
    if (newRoleCheck[0]?.name === 'super_admin' || targetUserCheck[0]?.name === 'super_admin') {
      return res.status(403).json({ error: 'เฉพาะผู้ดูแลระบบสูงสุดเท่านั้นที่ทำรายการนี้ได้' })
    }
  }

// กันไม่ให้เปลี่ยน role ของ super_admin คนสุดท้ายออกไปเป็น role อื่น
  const { rows: targetCheck } = await pool.query(
    `SELECT r.name FROM admin_users u LEFT JOIN roles r ON r.id = u.role_id WHERE u.id = $1`,
    [req.params.id]
  )
  if (targetCheck[0]?.name === 'super_admin') {
    const { rows: newRoleRows } = await pool.query('SELECT name FROM roles WHERE id = $1', [roleId])
    if (newRoleRows[0]?.name !== 'super_admin') {
      const { rows: countCheck } = await pool.query(
        `SELECT COUNT(*) FROM admin_users u JOIN roles r ON r.id = u.role_id WHERE r.name = 'super_admin'`
      )
      if (Number(countCheck[0].count) <= 1) {
        return res.status(400).json({ error: 'ไม่สามารถเปลี่ยน role ของผู้ดูแลระบบสูงสุดคนสุดท้ายได้' })
      }
    }
  }

  await pool.query('UPDATE admin_users SET role_id = $1 WHERE id = $2', [roleId, req.params.id])
  res.json({ ok: true })
})


// POST /api/users/:id/reset-password -> ล้างรหัสผ่านเดิม + สร้าง setup_token ใหม่
// ใช้ได้ทั้ง 2 กรณี: user ลืมรหัสผ่านที่เคยตั้งไว้ / ลิงก์ตั้งรหัสผ่านครั้งแรกหมดอายุไปแล้ว
usersRouter.post('/:id/reset-password', requirePermission('USERS', 'update'), async (req, res) => {
  // กันไม่ให้ role อื่นที่ไม่ใช่ super_admin รีเซ็ตรหัสผ่านของ super_admin (ยึดอำนาจได้ถ้าไม่กัน)
  if (req.user?.role !== 'super_admin') {
    const { rows: targetCheck } = await pool.query(
      `SELECT r.name FROM admin_users u LEFT JOIN roles r ON r.id = u.role_id WHERE u.id = $1`,
      [req.params.id]
    )
    if (targetCheck[0]?.name === 'super_admin') {
      return res.status(403).json({ error: 'เฉพาะผู้ดูแลระบบสูงสุดเท่านั้นที่รีเซ็ตรหัสผ่านนี้ได้' })
    }
  }

  const setupToken = generateSetupToken()
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 วัน

  const { rows } = await pool.query(
    `UPDATE admin_users
     SET password_hash = NULL, setup_token = $1, setup_token_expires = $2
     WHERE id = $3
     RETURNING username`,
    [setupToken, expires, req.params.id]
  )
  if (!rows[0]) return res.status(404).json({ error: 'ไม่พบผู้ใช้นี้' })

  res.json({ username: rows[0].username, setupToken })
})


// DELETE /api/users/:id
usersRouter.delete('/:id', requirePermission('USERS', 'delete'), async (req, res) => {
  if (String(req.user.sub) === String(req.params.id)) {
    return res.status(400).json({ error: 'ไม่สามารถลบบัญชีตัวเองได้' })
  }

  // กันไม่ให้ระบบเหลือ super_admin 0 คน (ล็อกทุกคนออกจากการจัดการ role/permission ถาวร)
  const { rows: targetCheck } = await pool.query(
    `SELECT r.name FROM admin_users u LEFT JOIN roles r ON r.id = u.role_id WHERE u.id = $1`,
    [req.params.id]
  )
  if (targetCheck[0]?.name === 'super_admin') {
    const { rows: countCheck } = await pool.query(
      `SELECT COUNT(*) FROM admin_users u JOIN roles r ON r.id = u.role_id WHERE r.name = 'super_admin'`
    )
    if (Number(countCheck[0].count) <= 1) {
      return res.status(400).json({ error: 'ไม่สามารถลบผู้ดูแลระบบสูงสุดคนสุดท้ายได้ ต้องมีอย่างน้อย 1 คนเสมอ' })
    }
  }

  await pool.query('DELETE FROM admin_users WHERE id = $1', [req.params.id])
  res.json({ ok: true })
})
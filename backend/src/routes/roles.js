import { Router } from 'express'
import { pool } from '../db.js'
import { requireAuth } from '../middleware/auth.js'
import { requireSuperAdmin } from '../middleware/requireSuperAdmin.js'
import { PERMISSION_CATALOG, ACTIONS } from '../permissionCatalog.js'

export const rolesRouter = Router()

rolesRouter.use(requireAuth)
// การจัดการ role/permission ทั้งหมด สงวนไว้ให้ super_admin เท่านั้น — ป้องกันไม่ให้
// role อื่นที่ได้สิทธิ์ USERS:* มายกระดับสิทธิ์ตัวเองหรือแก้สิทธิ์ role อื่นได้
rolesRouter.use(requireSuperAdmin)

// GET /api/roles -> รายชื่อ role ทั้งหมด พร้อม permission ที่มี (เป็น array ของ 'resource:action')
rolesRouter.get('/', async (req, res) => {
  const { rows: roles } = await pool.query('SELECT id, name, label FROM roles ORDER BY id')
  const { rows: perms } = await pool.query(
    `SELECT rp.role_id, p.resource, p.action FROM role_permissions rp
     JOIN permissions p ON p.id = rp.permission_id`
  )

  const result = roles.map((role) => ({
    ...role,
    permissions: perms.filter((p) => p.role_id === role.id).map((p) => `${p.resource}:${p.action}`),
  }))
  res.json(result)
})

// GET /api/roles/permission-catalog -> รายการ resource x action ทั้งหมดที่มีในระบบ (ใช้ render checkbox)
rolesRouter.get('/permission-catalog', async (req, res) => {
  res.json({ resources: PERMISSION_CATALOG, actions: ACTIONS })
})

// POST /api/roles -> สร้าง role ใหม่
rolesRouter.post('/', async (req, res) => {
  const { name, label } = req.body || {}
  if (!name || !label) return res.status(400).json({ error: 'กรุณาระบุชื่อ role' })

  const { rows: existing } = await pool.query('SELECT id FROM roles WHERE name = $1', [name])
  if (existing[0]) return res.status(409).json({ error: 'มี role ชื่อนี้อยู่แล้ว' })

  const { rows } = await pool.query(
    'INSERT INTO roles (name, label) VALUES ($1, $2) RETURNING id, name, label',
    [name, label]
  )
  res.status(201).json({ ...rows[0], permissions: [] })
})

// PUT /api/roles/:id/permissions -> ตั้งค่า permission ทั้งหมดของ role นี้ (แทนที่ทั้งชุด)
// body: { permissions: ['ANN_NEWS:view', 'ANN_NEWS:create', ...] }
rolesRouter.put('/:id/permissions', async (req, res) => {
  const { permissions } = req.body || {}
  if (!Array.isArray(permissions)) return res.status(400).json({ error: 'รูปแบบข้อมูลไม่ถูกต้อง' })

  const roleId = req.params.id

  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query('DELETE FROM role_permissions WHERE role_id = $1', [roleId])

    for (const key of permissions) {
      const [resource, action] = key.split(':')
      const { rows } = await client.query(
        'SELECT id FROM permissions WHERE resource = $1 AND action = $2',
        [resource, action]
      )
      if (rows[0]) {
        await client.query(
          'INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
          [roleId, rows[0].id]
        )
      }
    }
    await client.query('COMMIT')
    res.json({ ok: true })
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
})

// DELETE /api/roles/:id
rolesRouter.delete('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT name FROM roles WHERE id = $1', [req.params.id])
  if (rows[0]?.name === 'super_admin') {
    return res.status(400).json({ error: 'ไม่สามารถลบ role super_admin ได้' })
  }
  await pool.query('DELETE FROM roles WHERE id = $1', [req.params.id])
  res.json({ ok: true })
})
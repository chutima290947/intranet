import { pool } from '../db.js'

// เช็คสิทธิ์แบบ real-time จาก database ทุกครั้ง
// เพราะถ้า admin ถอดสิทธิ์ role ไหนออกไป ต้องมีผลทันที ไม่ใช่รอจน token หมดอายุ (สูงสุด 12 ชม.)
export function requirePermission(resource, action) {       
  return async (req, res, next) => {                            
    try {
      const { rows } = await pool.query(
        `SELECT 1 FROM admin_users u
         JOIN role_permissions rp ON rp.role_id = u.role_id
         JOIN permissions p ON p.id = rp.permission_id
         WHERE u.id = $1 AND p.resource = $2 AND p.action = $3
         LIMIT 1`,
        [req.user.sub, resource, action]
      )

      if (rows.length > 0 || req.user.role === 'super_admin') {
        return next()
      }

      const { rows: roleCheck } = await pool.query(
        `SELECT r.name FROM admin_users u LEFT JOIN roles r ON r.id = u.role_id WHERE u.id = $1`,
        [req.user.sub]
      )
      if (roleCheck[0]?.name === 'super_admin') {
        return next()
      }

      return res.status(403).json({ error: 'คุณไม่มีสิทธิ์ทำรายการนี้' })
    } catch (err) {
      next(err)
    }
  }
}
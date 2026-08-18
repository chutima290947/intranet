import { pool } from '../db.js'

// ใช้กับ endpoint ที่อ่อนไหวมาก (เช่น จัดการ role/permission ของทั้งระบบ)
// ต้องเป็น super_admin เท่านั้น ไม่ว่าจะมี permission อื่นแค่ไหนก็ตาม
// เช็คจาก database สดทุกครั้ง แทนอ่านจาก req.user.role (JWT) เพราะถ้า admin ถอด role super_admin
// ออกจากใครไปแล้ว ต้องมีผลทันที ไม่ใช่รอจน token หมดอายุ
export async function requireSuperAdmin(req, res, next) {
  try {
    const { rows } = await pool.query(
      `SELECT r.name FROM admin_users u LEFT JOIN roles r ON r.id = u.role_id WHERE u.id = $1`,
      [req.user.sub]
    )
    if (rows[0]?.name !== 'super_admin') {
      return res.status(403).json({ error: 'เฉพาะผู้ดูแลระบบสูงสุดเท่านั้นที่ทำรายการนี้ได้' })
    }
    next()
  } catch (err) {
    next(err)
  }
}
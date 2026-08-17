// ใช้กับ endpoint ที่อ่อนไหวมาก (เช่น จัดการ role/permission ของทั้งระบบ)
// ต้องเป็น super_admin เท่านั้น ไม่ว่าจะมี permission อื่นแค่ไหนก็ตาม
// ป้องกันไม่ให้ role อื่นที่ได้สิทธิ์ USERS:* มายกระดับสิทธิ์ตัวเองผ่านการแก้ role_permissions
export function requireSuperAdmin(req, res, next) {
  if (req.user?.role !== 'super_admin') {
    return res.status(403).json({ error: 'เฉพาะผู้ดูแลระบบสูงสุดเท่านั้นที่ทำรายการนี้ได้' })
  }
  next()
}
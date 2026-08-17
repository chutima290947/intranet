// เช็คว่า user (จาก JWT ที่ requireAuth ถอดรหัสไว้แล้วใน req.user) มีสิทธิ์ resource:action นี้ไหม
// permissions ถูกฝังไว้ใน JWT ตอน login แล้ว (ดู routes/auth.js) ไม่ต้อง query database ซ้ำทุก request
export function requirePermission(resource, action) {
  return (req, res, next) => {
    const perms = req.user?.permissions || []
    const key = `${resource}:${action}`
    if (!perms.includes(key)) {
      return res.status(403).json({ error: 'คุณไม่มีสิทธิ์ทำรายการนี้' })
    }
    next()
  }
}
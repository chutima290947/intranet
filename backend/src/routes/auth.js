import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../db.js'

export const authRouter = Router()

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) {
    return res.status(400).json({ error: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' })
  }

  const { rows } = await pool.query(
    'SELECT id, username, password_hash FROM admin_users WHERE username = $1',
    [username]
  )
  const user = rows[0]
  if (!user) {
    return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' })
  }

  const ok = await bcrypt.compare(password, user.password_hash)
  if (!ok) {
    return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' })
  }

  const token = jwt.sign(
    { sub: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  )

  res.json({ token, username: user.username })
})

// ใช้ให้ frontend เช็คว่า token ที่เก็บไว้ยังใช้ได้อยู่ไหม (ตอนโหลดหน้าเว็บใหม่)
authRouter.get('/me', async (req, res) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'no token' })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    res.json({ username: payload.username })
  } catch {
    res.status(401).json({ error: 'invalid token' })
  }
})

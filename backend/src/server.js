import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'

import { authRouter } from './routes/auth.js'
import { contentRouter } from './routes/content.js'
import { uploadsRouter } from './routes/uploads.js'

const app = express()

// CORS
const allowedOrigins = (
  process.env.CORS_ORIGIN || 'http://localhost:5173'
)
  .split(',')
  .map((s) => s.trim())

app.use(
  cors({
    origin: allowedOrigins,
  })
)

// JSON body
app.use(
  express.json({
    limit: '2mb',
  })
)

// เปิดให้เข้าถึงไฟล์ที่อัปโหลด
// เช่น /uploads/photo/ชื่อไฟล์.jpg
app.use(
  '/uploads',
  express.static(path.resolve('uploads'))
)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
  })
})

// Routes
app.use('/api/auth', authRouter)

app.use('/api/content', contentRouter)

app.use('/api/uploads', uploadsRouter)

// Error handler
app.use((err, req, res, next) => {
  console.error(err)

  // Multer: ไฟล์ใหญ่เกิน 25MB
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      error: 'ไฟล์ใหญ่เกิน 25MB',
    })
  }

  // Error อื่น ๆ
  res.status(500).json({
    error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์',
  })
})

// Start server
const port = process.env.PORT || 3001

app.listen(port, '0.0.0.0', () => {
  console.log(
    `intranet-backend กำลังทำงานที่ port ${port}`
  )
})
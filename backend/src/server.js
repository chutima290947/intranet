import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.js'
import { contentRouter } from './routes/content.js'
import { uploadsRouter } from './routes/uploads.js'

const app = express()

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())

app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (req, res) => res.json({ ok: true }))

app.use('/api/auth', authRouter)
app.use('/api/content', contentRouter)
app.use('/api/uploads', uploadsRouter)

// error handler กลาง (เช่น multer ไฟล์ใหญ่เกิน, query พัง ฯลฯ)
app.use((err, req, res, next) => {
  console.error(err)
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'ไฟล์ใหญ่เกิน 25MB' })
  }
  res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`intranet-backend กำลังทำงานที่ port ${port}`)
})

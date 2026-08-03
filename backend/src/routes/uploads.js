import { Router } from 'express'
import multer from 'multer'
import { pool } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

export const uploadsRouter = Router()

const MAX_SIZE = 25 * 1024 * 1024 // 25MB ให้ตรงกับ UploadBox.jsx ฝั่ง frontend
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE },
})

const ALLOWED_FOLDERS = new Set([
  'doctor', 'nurse', 'pharmacy', 'photo', 'emp', 'med',
  'mservice', 'avatar', 'pt', 'marketing', 'technician', 'hr',
])

// POST /api/uploads  (multipart/form-data: field "file", field "folder")
// หมายเหตุ: จุดนี้ไม่บังคับ login เพราะ UploadBox เดิมออกแบบให้พนักงานทั่วไป
// (ที่เข้าถึง intranet ได้อยู่แล้ว) อัปโหลดเอกสารเข้าระบบได้เลย ไม่ใช่ฟีเจอร์แอดมิน
// ถ้าต้องการจำกัดสิทธิ์เพิ่ม แนะนำทำระบบ login พนักงานแยกต่างหาก แล้วค่อยใส่ requireAuth ตรงนี้
uploadsRouter.post('/', upload.single('file'), async (req, res) => {
  const { folder } = req.body || {}
  const file = req.file

  if (!file) return res.status(400).json({ error: 'ไม่พบไฟล์ที่อัปโหลด' })
  if (!ALLOWED_FOLDERS.has(folder)) return res.status(400).json({ error: 'folder ไม่ถูกต้อง' })

  const { rows } = await pool.query(
    `INSERT INTO uploads (folder, original_name, mime_type, size_bytes, data, uploaded_by)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, folder, original_name, mime_type, size_bytes, created_at`,
    [folder, file.originalname, file.mimetype, file.size, file.buffer, 'staff']
  )

  res.status(201).json(rows[0])
})

// GET /api/uploads?folder=doctor -> รายการไฟล์ (ไม่รวมเนื้อไฟล์)
uploadsRouter.get('/', async (req, res) => {
  const { folder } = req.query
  const params = []
  let sql = 'SELECT id, folder, original_name, mime_type, size_bytes, uploaded_by, created_at FROM uploads'
  if (folder) {
    params.push(folder)
    sql += ' WHERE folder = $1'
  }
  sql += ' ORDER BY created_at DESC'

  const { rows } = await pool.query(sql, params)
  res.json(rows)
})

// GET /api/uploads/:id/download -> สตรีมไฟล์จริงกลับไป
uploadsRouter.get('/:id/download', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT original_name, mime_type, data FROM uploads WHERE id = $1',
    [req.params.id]
  )
  const file = rows[0]
  if (!file) return res.status(404).json({ error: 'ไม่พบไฟล์' })

  res.setHeader('Content-Type', file.mime_type)
  res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(file.original_name)}"`)
  res.send(file.data)
})

// DELETE /api/uploads/:id -- ต้อง login
uploadsRouter.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM uploads WHERE id = $1', [req.params.id])
  res.json({ ok: true })
})

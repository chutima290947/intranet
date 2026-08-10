import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'
import { pool } from '../db.js'

export const uploadsRouter = Router()

const ALLOWED_FOLDERS = [
  'doctor', 'nurse', 'pharmacy', 'photo', 'emp', 'med',
  'mservice', 'avatar', 'pt', 'marketing', 'technician', 'hr',
]

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.body.folder

    if (!ALLOWED_FOLDERS.includes(folder)) {
      return cb(new Error('โฟลเดอร์ไม่ถูกต้อง'))
    }

    const dir = path.resolve('uploads', folder)
    fs.mkdirSync(dir, { recursive: true })

    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const stored = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`
    cb(null, stored)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB ตาม error handler ใน server.js
})

// POST /api/uploads — อัปโหลดไฟล์ + บันทึกลงตาราง uploads
uploadsRouter.post('/', upload.single('file'), async (req, res) => {
  try {
    const { folder } = req.body
    const file = req.file

    if (!file) {
      return res.status(400).json({ error: 'ไม่พบไฟล์ที่อัปโหลด' })
    }

    if (!ALLOWED_FOLDERS.includes(folder)) {
      fs.unlinkSync(file.path)
      return res.status(400).json({ error: 'โฟลเดอร์ไม่ถูกต้อง' })
    }

    const url = `/uploads/${folder}/${file.filename}`

    const result = await pool.query(
      `INSERT INTO uploads
        (folder, original_name, stored_name, url, mime_type, size_bytes, uploaded_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, folder, original_name, stored_name, url, mime_type, size_bytes, created_at`,
      [
        folder,
        file.originalname,
        file.filename,
        url,
        file.mimetype,
        file.size,
        req.body.uploaded_by || null,
      ]
    )

    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'บันทึกข้อมูลไฟล์ไม่สำเร็จ' })
  }
})

// GET /api/uploads?folder=doctor — ดูรายการไฟล์ (ใช้ทำหน้าคลังไฟล์ทีหลังได้)
uploadsRouter.get('/', async (req, res) => {
  try {
    const { folder } = req.query

    const result = folder
      ? await pool.query(
          'SELECT * FROM uploads WHERE folder = $1 ORDER BY created_at DESC',
          [folder]
        )
      : await pool.query('SELECT * FROM uploads ORDER BY created_at DESC')

    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'ดึงข้อมูลไม่สำเร็จ' })
  }
})

// DELETE /api/uploads/:id — ลบทั้งไฟล์จริงและ record ในฐานข้อมูล
uploadsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'DELETE FROM uploads WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'ไม่พบไฟล์' })
    }

    const row = result.rows[0]
    const filePath = path.resolve('uploads', row.folder, row.stored_name)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'ลบไฟล์ไม่สำเร็จ' })
  }
})
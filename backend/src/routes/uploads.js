import { Router } from 'express'
import multer from 'multer'
import crypto from 'crypto'
import path from 'path'
import { pool } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

export const uploadsRouter = Router()

// จำกัดขนาดไฟล์ทั่วไป (PDF ฯลฯ) 25 MB / รูปภาพ 25 MB
const MAX_SIZE = 25 * 1024 * 1024
const IMAGE_MAX_SIZE = 25 * 1024 * 1024

// เก็บไฟล์ไว้ใน memory ก่อนบันทึกลง PostgreSQL
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_SIZE,
  },
})

// ครอบ multer ด้วย middleware เพื่อโชว์ error ที่อ่านง่ายขึ้น
// (ถ้าไม่ครอบไว้ ไฟล์เกิน 25MB จะโดน Express ปัดตกแบบข้อความไม่เป็นมิตร)
function uploadSingle(req, res, next) {
  upload.single('file')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'ไฟล์มีขนาดใหญ่เกินไป (สูงสุด 25MB)' })
      }
      return res.status(400).json({ error: err.message || 'อัปโหลดไฟล์ไม่สำเร็จ' })
    }
    next()
  })
}

// โฟลเดอร์ที่อนุญาตให้อัปโหลด
const ALLOWED_FOLDERS = new Set([
  'doctor',
  'nurse',
  'pharmacy',
  'photo',
  'emp',
  'med',
  'mservice',
  'avatar',
  'pt',
  'marketing',
  'technician',
  'hr',
  'quality',
])

// ---------------------------------------------------------
// แก้ชื่อไฟล์ภาษาไทยเพี้ยน: Multer/Busboy อ่านชื่อไฟล์เป็น latin1
// จึงต้องแปลงกลับเป็น utf8 (ถ้าชื่อถูกต้องอยู่แล้วจะคืนค่าเดิม)
// ---------------------------------------------------------
export function fixFilename(name) {
  if (!name) return name
  try {
    const decoded = Buffer.from(name, 'latin1').toString('utf8')
    if (/[\u0E00-\u0E7F]/.test(decoded)) {
      return decoded
    }
  } catch {}
  return name
}

// ---------------------------------------------------------
// POST /api/uploads
// multipart/form-data
// field: file
// field: folder
// ---------------------------------------------------------
uploadsRouter.post('/', uploadSingle, async (req, res) => {
  try {
    const { folder } = req.body || {}
    const file = req.file

    // ไม่พบไฟล์
    if (!file) {
      return res.status(400).json({
        error: 'ไม่พบไฟล์ที่อัปโหลด',
      })
    }

    // ตรวจสอบ folder
    if (!ALLOWED_FOLDERS.has(folder)) {
      return res.status(400).json({
        error: 'folder ไม่ถูกต้อง',
      })
    }

    // รูปภาพจำกัดขนาดแยกต่างหาก (25MB) เท่ากับไฟล์ทั่วไป (25MB)
    if (file.mimetype.startsWith('image/') && file.size > IMAGE_MAX_SIZE) {
      return res.status(400).json({
        error: 'รูปภาพมีขนาดใหญ่เกินไป (สูงสุด 25MB)',
      })
    }

    // แก้ชื่อไฟล์ภาษาไทยให้ถูกต้อง (latin1 -> utf8)
    const originalName = fixFilename(file.originalname)

    // นามสกุลไฟล์เดิม
    const ext = path.extname(originalName)

    // สร้างชื่อไฟล์ใหม่ไม่ซ้ำกัน
    const storedName = `${crypto.randomUUID()}${ext}`

    // ---------------------------------------------------------
    // 1) Insert ข้อมูลก่อน เพื่อให้ได้ id
    // ---------------------------------------------------------
    const inserted = await pool.query(
      `
      INSERT INTO uploads (
        folder,
        original_name,
        stored_name,
        url,
        mime_type,
        size_bytes,
        uploaded_by,
        data
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8
      )
      RETURNING id
      `,
      [
        folder,
        originalName,
        storedName,
        '',
        file.mimetype,
        file.size,
        'staff',
        file.buffer,
      ],
    )

    const newId = inserted.rows[0].id

    // ---------------------------------------------------------
    // 2) สร้าง URL สำหรับดาวน์โหลดไฟล์
    // ---------------------------------------------------------
    const fileUrl = `/api/uploads/${newId}/download`

    // ---------------------------------------------------------
    // 3) Update URL
    // ---------------------------------------------------------
    const { rows } = await pool.query(
      `
      UPDATE uploads
      SET url = $1
      WHERE id = $2
      RETURNING
        id,
        folder,
        original_name,
        stored_name,
        url,
        mime_type,
        size_bytes,
        uploaded_by,
        created_at
      `,
      [fileUrl, newId],
    )

    return res.status(201).json(rows[0])
  } catch (error) {
    console.error('Upload error:', error)

    return res.status(500).json({
      error: 'ไม่สามารถอัปโหลดไฟล์ได้',
    })
  }
})

// ---------------------------------------------------------
// GET /api/uploads?folder=doctor
// แสดงรายการไฟล์ โดยไม่ส่ง data กลับ
// ---------------------------------------------------------
uploadsRouter.get('/', async (req, res) => {
  try {
    const { folder } = req.query

    const params = []

    let sql = `
      SELECT
        id,
        folder,
        original_name,
        stored_name,
        url,
        mime_type,
        size_bytes,
        uploaded_by,
        created_at
      FROM uploads
    `

    if (folder) {
      params.push(folder)
      sql += ` WHERE folder = $1`
    }

    sql += ` ORDER BY created_at DESC`

    const { rows } = await pool.query(sql, params)

    return res.json(rows)
  } catch (error) {
    console.error('Get uploads error:', error)

    return res.status(500).json({
      error: 'ไม่สามารถดึงรายการไฟล์ได้',
    })
  }
})

// ---------------------------------------------------------
// GET /api/uploads/:id/download
// ดาวน์โหลด/เปิดไฟล์จริงจาก PostgreSQL BYTEA
// ---------------------------------------------------------
uploadsRouter.get('/:id/download', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT
        original_name,
        mime_type,
        data
      FROM uploads
      WHERE id = $1
      `,
      [req.params.id],
    )

    const file = rows[0]

    if (!file) {
      return res.status(404).json({
        error: 'ไม่พบไฟล์',
      })
    }

    res.setHeader(
      'Content-Type',
      file.mime_type || 'application/octet-stream',
    )

    if (file.data) {
      res.setHeader('Content-Length', Buffer.byteLength(file.data))
    }

    // ป้องกัน ERR_CACHE_READ_FAILURE บน Server รพ. / เครื่องลูกข่าย
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')

    // รองรับชื่อไฟล์ภาษาไทย (RFC 5987 / RFC 6266)
    const rawName = file.original_name || 'download'
    const ext = path.extname(rawName)
    const baseAscii = path.basename(rawName, ext).replace(/[^\x20-\x7e]|["\\]/g, '_') || 'file'
    const utf8Name = encodeURIComponent(rawName).replace(
      /['()*]/g,
      (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase(),
    )

    res.setHeader(
      'Content-Disposition',
      `inline; filename="${baseAscii}${ext}"; filename*=UTF-8''${utf8Name}`,
    )

    return res.send(file.data)
  } catch (error) {
    console.error('Download error:', error)

    return res.status(500).json({
      error: 'ไม่สามารถเปิดไฟล์ได้',
    })
  }
})

// ---------------------------------------------------------
// DELETE /api/uploads/:id
// ลบไฟล์ - ต้อง Login
// ---------------------------------------------------------
uploadsRouter.delete('/:id', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `
      DELETE FROM uploads
      WHERE id = $1
      `,
      [req.params.id],
    )

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: 'ไม่พบไฟล์ที่ต้องการลบ',
      })
    }

    return res.json({
      ok: true,
    })
  } catch (error) {
    console.error('Delete upload error:', error)

    return res.status(500).json({
      error: 'ไม่สามารถลบไฟล์ได้',
    })
  }
})

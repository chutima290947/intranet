import { Router } from 'express'
import { pool } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

export const contentRouter = Router()

// GET /api/content -> { SITE: {...}, ANN_NEWS: [...], ... }
// คืนเฉพาะ key ที่มีอยู่จริงใน DB เท่านั้น ฝั่ง frontend จะ merge ทับ DEFAULT_CONTENT เอง
contentRouter.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT key, value FROM content_store')
  const content = {}
  for (const row of rows) content[row.key] = row.value
  res.json(content)
})

// PUT /api/content/:key  body: { value: <json> }   (ต้อง login)
contentRouter.put('/:key', requireAuth, async (req, res) => {
  const { key } = req.params
  const { value } = req.body || {}
  if (value === undefined) {
    return res.status(400).json({ error: 'ต้องส่ง value มาด้วย' })
  }

  await pool.query(
    `INSERT INTO content_store (key, value, updated_by, updated_at)
     VALUES ($1, $2, $3, now())
     ON CONFLICT (key) DO UPDATE
       SET value = EXCLUDED.value, updated_by = EXCLUDED.updated_by, updated_at = now()`,
    [key, JSON.stringify(value), req.user.username]
  )

  res.json({ ok: true })
})

// DELETE /api/content/:key -> รีเซ็ต key นี้กลับไปใช้ DEFAULT_CONTENT ของ frontend (ต้อง login)
contentRouter.delete('/:key', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM content_store WHERE key = $1', [req.params.key])
  res.json({ ok: true })
})

// สคริปต์ครั้งเดียว: ซ่อมชื่อไฟล์ภาษาไทยที่เพี้ยนอยู่แล้วในตาราง uploads
// รัน: node src/fixFilenames.js
import { pool } from './db.js'
import { fixFilename } from './routes/uploads.js'

async function main() {
  const { rows } = await pool.query('SELECT id, original_name FROM uploads')
  let fixed = 0
  for (const row of rows) {
    const next = fixFilename(row.original_name)
    if (next !== row.original_name) {
      await pool.query('UPDATE uploads SET original_name = $1 WHERE id = $2', [next, row.id])
      console.log(`#${row.id}: ${row.original_name} -> ${next}`)
      fixed++
    }
  }
  console.log(`เสร็จแล้ว ✅ แก้ไข ${fixed} จาก ${rows.length} ไฟล์`)
  await pool.end()
}

main().catch((err) => {
  console.error('ล้มเหลว:', err)
  process.exit(1)
})
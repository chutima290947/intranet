import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { pool } from './db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function main() {
  const sql = readFileSync(join(__dirname, 'schema.sql'), 'utf8')
  console.log('กำลังสร้าง/อัปเดตตารางบน Neon Postgres...')
  await pool.query(sql)
  console.log('เสร็จแล้ว ✅ ตาราง: content_store, admin_users, uploads')
  await pool.end()
}

main().catch((err) => {
  console.error('Migrate ล้มเหลว:', err)
  process.exit(1)
})

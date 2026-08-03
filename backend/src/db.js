import pg from 'pg'
import 'dotenv/config'

const { Pool } = pg

if (!process.env.DATABASE_URL) {
  throw new Error('ไม่พบ DATABASE_URL — โปรดตั้งค่าใน .env (ดู .env.example)')
}

// Neon ต้องใช้ SSL เสมอ; rejectUnauthorized: false เพราะ Neon ใช้ certificate
// ที่ออกโดย CA กลาง ซึ่ง Node บางเวอร์ชันอาจไม่มีอยู่ใน trust store ในตัว
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,
  idleTimeoutMillis: 30_000,
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle Postgres client', err)
})

export async function query(text, params) {
  return pool.query(text, params)
}

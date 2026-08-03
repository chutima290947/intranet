import bcrypt from 'bcryptjs'
import 'dotenv/config'
import { pool } from './db.js'

// หมายเหตุ: ไม่ต้อง seed content_store เพราะฝั่ง frontend จะ merge
// DEFAULT_CONTENT (ค่าเริ่มต้นในโค้ด) เข้ากับข้อมูลจาก API เองอยู่แล้ว
// (เหมือนที่เคย merge กับ localStorage เดิม) ตารางว่างๆ ก็ใช้งานได้ทันที
// แล้วพอแอดมิน login เข้าไปแก้ไขผ่านหน้า Admin ค่าที่แก้จะถูกเซฟลง DB

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME
  const password = process.env.SEED_ADMIN_PASSWORD

  if (!username || !password) {
    throw new Error('โปรดตั้งค่า SEED_ADMIN_USERNAME และ SEED_ADMIN_PASSWORD ใน .env ก่อนรัน seed')
  }
  if (password.length < 8) {
    throw new Error('SEED_ADMIN_PASSWORD ควรยาวอย่างน้อย 8 ตัวอักษร')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await pool.query(
    `INSERT INTO admin_users (username, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    [username, passwordHash]
  )

  console.log(`สร้าง/อัปเดตบัญชีแอดมิน "${username}" เรียบร้อย ✅`)
  await pool.end()
}

main().catch((err) => {
  console.error('Seed ล้มเหลว:', err)
  process.exit(1)
})

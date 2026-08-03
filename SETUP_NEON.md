# เชื่อมต่อ Intranet กับ Neon Postgres — คู่มือฉบับเต็ม

โปรเจกต์นี้ตอนนี้มี 2 ส่วน:
- `frontend/` — React + Vite (เว็บ intranet เดิม, แก้ให้เรียก API แล้ว)
- `backend/`  — Node.js/Express API ตัวใหม่ที่ต่อกับ Neon Postgres

ข้อมูล 3 อย่างที่ย้ายจาก localStorage / hardcode ไปอยู่บน Neon แล้ว:
1. **Content ที่แอดมินแก้ไข** (ประกาศ, ลิงก์ระบบ, digital services ฯลฯ) — ตาราง `content_store`
2. **บัญชีแอดมิน** (เดิม hardcode ใน `authConfig.js`) — ตาราง `admin_users`
3. **ไฟล์ที่อัปโหลดผ่าน UploadBox** — ตาราง `uploads`

---

## ขั้นตอนที่ 1: สร้าง Neon Project

1. ไปที่ https://console.neon.tech แล้วสมัคร/ล็อกอิน (มี free tier)
2. กด **New Project** → ตั้งชื่อ เช่น `bsi-intranet` → เลือก region ใกล้ผู้ใช้งานที่สุด (เช่น Singapore ถ้าอยู่ไทย)
3. เมื่อสร้างเสร็จ ไปที่หน้า **Dashboard > Connection Details**
4. เลือก **Pooled connection** (ตัวที่มี `-pooler` อยู่ใน hostname) — ใช้ตัวนี้เพราะ backend เป็น server ที่รับ request พร้อมกันหลาย connection
5. คัดลอก connection string ที่ได้ (หน้าตาประมาณ)
   ```
   postgresql://neondb_owner:XXXXXXXX@ep-xxxx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```

## ขั้นตอนที่ 2: ตั้งค่า Backend

```bash
cd backend
cp .env.example .env
```

แก้ไฟล์ `.env`:
- `DATABASE_URL` = connection string จากขั้นตอนที่ 1
- `JWT_SECRET` = string สุ่มยาวๆ (เช่น รันคำสั่ง `openssl rand -hex 32`)
- `SEED_ADMIN_USERNAME` / `SEED_ADMIN_PASSWORD` = บัญชีแอดมินที่ต้องการตั้งต้น (**เปลี่ยนรหัสผ่านจาก `siriroj@2026` เดิมด้วย** เพราะรหัสเดิมเคยฝังอยู่ใน source code ที่ใครก็เปิดดูได้)
- `CORS_ORIGIN` = URL ของ frontend ที่จะ deploy จริง (ตอน dev ใช้ `http://localhost:5173` ได้)

จากนั้นรัน:

```bash
npm install
npm run migrate   # สร้างตาราง content_store, admin_users, uploads บน Neon
npm run seed       # สร้างบัญชีแอดมินตาม .env
npm run dev         # รันเซิร์ฟเวอร์ dev ที่ http://localhost:3001
```

ทดสอบว่าเชื่อม Neon สำเร็จ:
```bash
curl http://localhost:3001/api/health   # ควรได้ {"ok":true}
curl http://localhost:3001/api/content  # ควรได้ {} (ยังไม่มีข้อมูลที่แก้)
```

## ขั้นตอนที่ 3: ตั้งค่า Frontend

```bash
cd frontend
cp .env.example .env
```

แก้ `VITE_API_URL` ใน `.env` ให้ชี้ไปที่ backend (ตอน dev คือ `http://localhost:3001`)

```bash
npm install
npm run dev
```

เข้าเว็บ, ล็อกอินแอดมิน (ใช้ username/password ที่ตั้งใน `SEED_ADMIN_*`), ลองแก้ content หรืออัปโหลดไฟล์ — ข้อมูลจะถูกเก็บบน Neon Postgres แล้ว ปิดเปิดเบราว์เซอร์ใหม่/เปลี่ยนเครื่อง ก็ยังเห็นข้อมูลเดิม (ต่างจาก localStorage เดิมที่เห็นเฉพาะเครื่องที่แก้)

---

## ขั้นตอนที่ 4: Deploy จริง

**แนะนำ: Render.com** (ฟรี tier พอสำหรับ intranet ขนาดนี้, รองรับ Node.js แบบ long-running server ซึ่งเหมาะกับโค้ดนี้มากกว่า serverless เพราะใช้ connection pool ของ `pg` ตรงๆ)

### Backend บน Render
1. Push โค้ดขึ้น GitHub repo
2. Render Dashboard → **New > Web Service** → เชื่อม repo → เลือกโฟลเดอร์ `backend`
3. Build command: `npm install` / Start command: `npm start`
4. ใส่ Environment Variables ตามใน `.env` (DATABASE_URL, JWT_SECRET, SEED_ADMIN_*, CORS_ORIGIN ให้ตรงกับ URL frontend จริงที่จะ deploy)
5. Deploy แล้วรัน migrate/seed ครั้งเดียวผ่าน Render Shell: `npm run migrate && npm run seed`

### Frontend บน Render (Static Site) หรือ Netlify/Vercel
1. New Static Site → เลือกโฟลเดอร์ `frontend`
2. Build command: `npm run build` / Publish directory: `dist`
3. ใส่ Environment Variable: `VITE_API_URL` = URL ของ backend ที่ deploy ไว้ (เช่น `https://intranet-backend.onrender.com`)

### ทางเลือกอื่น
- **Serverless (Vercel/Netlify Functions)**: ทำได้ แต่ต้องแก้โค้ดจาก Express เป็น handler function แยก และเปลี่ยนมาใช้ `@neondatabase/serverless` (HTTP driver) แทน `pg` เพื่อเลี่ยงปัญหา connection pool ของ serverless — แจ้งได้ถ้าต้องการให้ปรับให้

---

## หมายเหตุด้านความปลอดภัย

- Neon บังคับ SSL เสมอ (`sslmode=require`) — โค้ดตั้งค่าไว้ให้แล้ว
- รหัสผ่านแอดมินเก็บแบบ hash (bcrypt) ในตาราง `admin_users` ไม่เก็บ plain text
- Login คืน JWT อายุ 12 ชั่วโมง เก็บใน `sessionStorage` ฝั่ง frontend (หมดอายุอัตโนมัติ)
- Route อัปโหลดไฟล์ (`POST /api/uploads`) **ไม่บังคับ login** ตามพฤติกรรมเดิมของ UploadBox (ออกแบบให้พนักงานทั่วไปที่เข้า intranet ได้ใช้งาน) — ถ้าต้องการจำกัดสิทธิ์เพิ่มเติม แจ้งได้ จะเพิ่มระบบ login พนักงานแยกให้
- ไฟล์ที่อัปโหลดเก็บเป็น `bytea` ตรงในตาราง Postgres — เหมาะกับไฟล์ปริมาณ/ขนาดระดับ intranet ทั่วไป ถ้าปริมาณไฟล์เยอะมากในอนาคต แนะนำย้ายไปเก็บบน object storage (S3/Cloudflare R2) แล้วเก็บแค่ URL แทน

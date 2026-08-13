-- Schema สำหรับ intranet backend บน Neon Postgres
-- รันผ่าน `npm run migrate`

-- เก็บ content ทุก collection ของเว็บไซต์ (เดิมอยู่ใน localStorage ผ่าน ContentContext)
-- key ตรงกับ key ใน DEFAULT_CONTENT / ADMIN_SCHEMAS เช่น 'SITE', 'ANN_NEWS', 'N_SYSTEMS' ฯลฯ
CREATE TABLE IF NOT EXISTS content_store (
  key         TEXT PRIMARY KEY,
  value       JSONB NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by  TEXT
);

-- บัญชีแอดมิน (แทน ADMIN_CREDENTIALS ที่ hardcode ไว้ใน frontend เดิม)
CREATE TABLE IF NOT EXISTS admin_users (
  id             SERIAL PRIMARY KEY,
  username       TEXT UNIQUE NOT NULL,
  password_hash  TEXT NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ไฟล์ที่อัปโหลดผ่าน UploadBox
-- เก็บตัวไฟล์จริงบน disk (multer) ส่วน DB เก็บแค่ metadata + path (stored_name/url)
-- คอลัมน์ data (bytea) เป็นของเดิมจากยุค store-in-DB ก่อน migrate มาเป็น disk-based —
-- คงไว้เพื่อ backward-compat กับ record เก่า, record ใหม่ไม่ต้องเขียนคอลัมน์นี้แล้ว (NULL ได้)
CREATE TABLE IF NOT EXISTS uploads (
  id             SERIAL PRIMARY KEY,
  folder         VARCHAR(100) NOT NULL,
  original_name  TEXT NOT NULL,
  stored_name    TEXT NOT NULL,
  url            TEXT NOT NULL,
  mime_type      VARCHAR(150) NOT NULL,
  size_bytes     INTEGER NOT NULL,
  uploaded_by    VARCHAR(150),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  data           BYTEA
);

CREATE INDEX IF NOT EXISTS idx_uploads_folder ON uploads (folder);
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

-- ไฟล์ที่อัปโหลดผ่าน UploadBox (เก็บตัวไฟล์เป็น bytea ตรงในตาราง
-- เหมาะกับไฟล์ขนาดเล็ก-กลาง เช่น PDF/รูปภาพของ intranet ภายในองค์กร
-- ถ้าปริมาณไฟล์เยอะ/ใหญ่ในอนาคต แนะนำย้ายไปเก็บใน object storage เช่น S3/R2 แล้วเก็บแค่ URL แทน)
CREATE TABLE IF NOT EXISTS uploads (
  id             SERIAL PRIMARY KEY,
  folder         TEXT NOT NULL,
  original_name  TEXT NOT NULL,
  mime_type      TEXT NOT NULL,
  size_bytes     INTEGER NOT NULL,
  data           BYTEA NOT NULL,
  uploaded_by    TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_uploads_folder ON uploads (folder);

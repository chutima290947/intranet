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

-- role ของผู้ใช้ (เช่น super_admin) — ต้องสร้างก่อน admin_users เพราะ admin_users.role_id
-- อ้างอิงกลับมาที่ตารางนี้
CREATE TABLE IF NOT EXISTS roles (
  id     SERIAL PRIMARY KEY,
  name   TEXT UNIQUE NOT NULL,
  label  TEXT NOT NULL
);

-- รายการ resource x action ทั้งหมดที่กำหนดสิทธิ์ได้ (seed จาก permissionCatalog.js)
CREATE TABLE IF NOT EXISTS permissions (
  id              SERIAL PRIMARY KEY,
  resource        TEXT NOT NULL,
  resource_label  TEXT NOT NULL,
  action          TEXT NOT NULL,
  UNIQUE (resource, action)
);

-- ตารางเชื่อม role <-> permission (many-to-many)
-- ต้องมี PRIMARY KEY คู่นี้ เพราะโค้ดใช้ ON CONFLICT DO NOTHING ตอน seed/set permissions
CREATE TABLE IF NOT EXISTS role_permissions (
  role_id       INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id INTEGER NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

-- บัญชีแอดมิน (แทน ADMIN_CREDENTIALS ที่ hardcode ไว้ใน frontend เดิม)
-- password_hash เป็น NULL ได้ชั่วคราว: กรณี admin สร้างบัญชีใหม่แต่ผู้ใช้ยังไม่ได้ตั้งรหัสผ่านครั้งแรก
-- (ดู setup_token / setup_token_expires) และตอน reset-password ก็ set กลับเป็น NULL ชั่วคราวเช่นกัน
CREATE TABLE IF NOT EXISTS admin_users (
  id                    SERIAL PRIMARY KEY,
  username              TEXT UNIQUE NOT NULL,
  password_hash         TEXT,
  display_name          TEXT,
  role_id               INTEGER REFERENCES roles(id),
  setup_token           TEXT UNIQUE,
  setup_token_expires   TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ไฟล์ที่อัปโหลดผ่าน UploadBox (เก็บตัวไฟล์เป็น bytea ตรงในตาราง
-- เหมาะกับไฟล์ขนาดเล็ก-กลาง เช่น PDF/รูปภาพของ intranet ภายในองค์กร
-- ถ้าปริมาณไฟล์เยอะ/ใหญ่ในอนาคต แนะนำย้ายไปเก็บใน object storage เช่น S3/R2 แล้วเก็บแค่ URL แทน)
CREATE TABLE IF NOT EXISTS uploads (
  id             SERIAL PRIMARY KEY,
  folder         TEXT NOT NULL,
  original_name  TEXT NOT NULL,
  stored_name    TEXT,
  url            TEXT,
  mime_type      TEXT NOT NULL,
  size_bytes     INTEGER NOT NULL,
  data           BYTEA NOT NULL,
  uploaded_by    TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_uploads_folder ON uploads (folder);
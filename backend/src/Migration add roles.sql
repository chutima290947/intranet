-- migration_add_roles.sql
-- ใช้กับ database ที่มีข้อมูลอยู่แล้ว (production) แทนการรัน schema.sql ตัวเต็มซ้ำ
-- ใช้ ALTER TABLE ... ADD COLUMN IF NOT EXISTS และ CREATE TABLE IF NOT EXISTS ทั้งหมด
-- เพื่อเติมเฉพาะส่วนที่ขาด โดยไม่กระทบตาราง/ข้อมูลเดิมที่มีอยู่แล้ว
--
-- วิธีใช้: รันไฟล์นี้ครั้งเดียวผ่าน psql หรือ Neon SQL editor แล้วตามด้วย
--   node src/seedPermissions.js
-- เพื่อ seed ตาราง permissions/roles/role_permissions และผูกบัญชี admin_users
-- เดิมที่มีอยู่แล้วเข้ากับ role 'super_admin'

-- 1) ตาราง role ของผู้ใช้ (ต้องสร้างก่อน เพราะ admin_users.role_id อ้างอิงกลับมาที่นี่)
CREATE TABLE IF NOT EXISTS roles (
  id     SERIAL PRIMARY KEY,
  name   TEXT UNIQUE NOT NULL,
  label  TEXT NOT NULL
);

-- 2) ตารางรายการสิทธิ์ทั้งหมด (resource x action)
CREATE TABLE IF NOT EXISTS permissions (
  id              SERIAL PRIMARY KEY,
  resource        TEXT NOT NULL,
  resource_label  TEXT NOT NULL,
  action          TEXT NOT NULL,
  UNIQUE (resource, action)
);

-- 3) ตารางเชื่อม role <-> permission (many-to-many)
CREATE TABLE IF NOT EXISTS role_permissions (
  role_id       INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id INTEGER NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

-- 4) เติมคอลัมน์ที่ขาดใน admin_users ของเดิม
--    - ผ่อน password_hash ให้เว้นว่างได้ (บัญชีที่ยังไม่ตั้งรหัสผ่านครั้งแรก)
--    - เพิ่ม display_name, role_id, setup_token, setup_token_expires
ALTER TABLE admin_users
  ALTER COLUMN password_hash DROP NOT NULL,
  ADD COLUMN IF NOT EXISTS display_name TEXT,
  ADD COLUMN IF NOT EXISTS role_id INTEGER REFERENCES roles(id),
  ADD COLUMN IF NOT EXISTS setup_token TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS setup_token_expires TIMESTAMPTZ;

-- 5) เติมคอลัมน์ที่ขาดใน uploads ของเดิม
ALTER TABLE uploads
  ADD COLUMN IF NOT EXISTS stored_name TEXT,
  ADD COLUMN IF NOT EXISTS url TEXT;

-- หมายเหตุ: อย่ารัน schema.sql ตัวเต็มซ้ำกับ database ที่มีข้อมูลอยู่แล้ว
-- เพราะ CREATE TABLE IF NOT EXISTS จะข้ามตารางเดิมไปเฉยๆ และจะไม่เพิ่มคอลัมน์ใหม่
-- ให้ admin_users/uploads ที่มีอยู่ก่อนแล้ว ต้องใช้ไฟล์นี้แทน
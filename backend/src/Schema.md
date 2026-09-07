# เอกสารโครงสร้างฐานข้อมูล (Database Schema) — intranet backend

ฐานข้อมูล: **PostgreSQL** (Neon) เข้าถึงผ่าน `pg` ในไฟล์ `backend/src/db.js`
ไฟล์ migration หลัก: `backend/src/schema.sql` (รันด้วย `npm run migrate`)

> ⚠️ **ข้อควรระวัง — schema ไม่ตรงกับโค้ดจริง (schema drift):** ไฟล์ `schema.sql` เดิมสร้างได้แค่ตาราง `content_store`, `admin_users` (ไม่ครบ), และ `uploads` (ไม่ครบ) เท่านั้น แต่โค้ดฝั่งแอปพลิเคชัน (`routes/auth.js`, `routes/users.js`, `routes/roles.js`, `routes/uploads.js`, `middleware/requirePermission.js`, `middleware/requireSuperAdmin.js`, `seedPermissions.js`) เรียกใช้ตาราง/คอลัมน์อีกหลายตัวที่ **ไม่มีอยู่ใน `schema.sql`** เลย จุดที่ขาดจะทำเครื่องหมายไว้ด้านล่างว่า *"ไม่มีใน schema.sql — ถูกสร้างแยกต่างหาก"* ถ้ารัน database ใหม่จาก `schema.sql` เพียงไฟล์เดียว ระบบ login, การจัดการผู้ใช้ และการอัปโหลดไฟล์จะใช้งานไม่ได้ทันทีจนกว่าจะเพิ่มส่วนที่ขาดเข้าไป

---

## ภาพรวมความสัมพันธ์ของตาราง

```
roles ──< role_permissions >── permissions
  │
  └──< admin_users
           │
           └──< (อ้างอิงทางอ้อม) content_store.updated_by, uploads.uploaded_by (เก็บเป็น username เฉยๆ ไม่ใช่ FK)

content_store   (ตาราง key-value แยกเดี่ยว)
uploads         (ตารางแยกเดี่ยว)
```

---

## รายละเอียดแต่ละตาราง

### `content_store`
เก็บ "collection" เนื้อหาที่แก้ไขได้ทุกส่วนของเว็บไซต์ (เดิมเก็บใน `localStorage` ผ่าน `ContentContext`) 1 แถว ต่อ 1 content key ระดับบนสุด

| คอลัมน์      | ชนิดข้อมูล    | เงื่อนไข                      | หมายเหตุ |
|--------------|---------------|--------------------------------|-------|
| `key`        | `TEXT`        | **PK**                         | ตรงกับ key ใน `DEFAULT_CONTENT` / `ADMIN_SCHEMAS` ฝั่ง frontend เช่น `SITE`, `ANN_NEWS`, `N_SYSTEMS`, `DIVISIONS`, `REPORTS`, `CONTACT_LINKS`, `ONCALL`, `NEWS`, `PROMOS`, `QUALITY`, `PARTNERS`, `DIGITAL_SERVICES`, `FINANCE_DOCS`, `TEMPLATE_OPTIONS`, `DOCTOR_LINKS`, `REQUEST_CATEGORIES`, `SECTIONS`, `USERS` |
| `value`      | `JSONB`       | `NOT NULL`                     | ข้อมูล JSON รูปแบบอิสระ โครงสร้างขึ้นอยู่กับแต่ละ key (กำหนดฝั่ง frontend) ไม่ได้ถูกบังคับโครงสร้างจากฝั่ง database |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT now()`       | อัปเดตทุกครั้งที่มีการ upsert |
| `updated_by` | `TEXT`        | เว้นว่างได้                    | เก็บ `username` ของแอดมินที่แก้ (มาจาก JWT) ไม่ใช่ foreign key |

รูปแบบการเข้าถึง (`routes/content.js`):
- `GET /api/content` → คืนค่าทุกแถวในรูป `{ key: value }` ไม่ต้อง login
- `PUT /api/content/:key` → upsert (`INSERT ... ON CONFLICT (key) DO UPDATE`) ต้อง login
- `DELETE /api/content/:key` → ลบแถวนั้นทิ้ง ทำให้ frontend กลับไปใช้ค่า default ที่ hardcode ไว้แทน

---

### `admin_users`
บัญชีแอดมิน/เจ้าหน้าที่ ใช้แทนระบบ credential แบบ hardcode เดิม

| คอลัมน์                 | ชนิดข้อมูล      | เงื่อนไข                    | อยู่ใน `schema.sql`? | หมายเหตุ |
|------------------------|-----------------|------------------------------|:---:|-------|
| `id`                   | `SERIAL`        | **PK**                     | ✅ | |
| `username`             | `TEXT`          | `UNIQUE NOT NULL`          | ✅ | |
| `password_hash`        | `TEXT`          | เว้นว่างได้ (bcrypt hash)   | ✅ (เดิมเป็น `NOT NULL` — ต้องแก้ให้เว้นว่างได้ ดูด้านล่าง) | เป็น `NULL` จนกว่าผู้ใช้จะตั้งรหัสผ่านครั้งแรกผ่าน `setup_token` |
| `created_at`           | `TIMESTAMPTZ`   | `NOT NULL DEFAULT now()`   | ✅ | |
| `display_name`         | `TEXT`          | เว้นว่างได้                 | ❌ *ไม่มีใน schema.sql* | แสดงในหน้าจัดการผู้ใช้ (Admin) |
| `role_id`              | `INTEGER`       | `REFERENCES roles(id)`, เว้นว่างได้ | ❌ *ไม่มีใน schema.sql* | ผู้ใช้ที่ `role_id IS NULL` จะไม่มีสิทธิ์ใดๆ เลย |
| `setup_token`          | `TEXT`          | เว้นว่างได้ ควรเป็น unique  | ❌ *ไม่มีใน schema.sql* | token แบบสุ่ม (`crypto.randomBytes(24)`) ใช้ส่งให้ผู้ใช้ตั้งรหัสผ่านครั้งแรกหรือรีเซ็ตรหัสผ่าน (ส่งเอง ไม่มีระบบอีเมล) |
| `setup_token_expires`  | `TIMESTAMPTZ`   | เว้นว่างได้                 | ❌ *ไม่มีใน schema.sql* | หมดอายุใน 7 วันหลังสร้าง (ดู `routes/users.js`, `routes/auth.js`) |

**ข้อควรระวังเรื่อง constraint:** `schema.sql` เดิมกำหนด `password_hash TEXT NOT NULL` แต่ `routes/users.js` สร้างผู้ใช้ใหม่โดยไม่ใส่รหัสผ่าน (`password_hash` จะเป็น `NULL` โดย default) และ endpoint `POST /:id/reset-password` ก็ตั้งค่ากลับเป็น `NULL` โดยตรง ต้องผ่อน constraint นี้ในฐานข้อมูลจริง ไม่งั้นการสร้างบัญชีใหม่จะ error

---

### `roles`  *(ไม่มีใน schema.sql — ถูกสร้างแยกต่างหาก)*
ชุดสิทธิ์ที่ตั้งชื่อไว้ (role) seed มาจาก `backend/src/seedPermissions.js`

| คอลัมน์  | ชนิดข้อมูล | เงื่อนไข               | หมายเหตุ |
|---------|-----------|------------------------|-------|
| `id`    | `SERIAL`  | **PK**                 | |
| `name`  | `TEXT`    | `UNIQUE NOT NULL`      | ชื่อสำหรับใช้ในโค้ด เช่น `super_admin` ถูกใช้เป็น magic string ทั่วทั้งระบบ (ให้สิทธิ์เต็มทุกอย่าง, ลบ/ลดสิทธิ์ไม่ได้ถ้าเหลือคนเดียว) |
| `label` | `TEXT`    | `NOT NULL`             | ชื่อแสดงผลภาษาไทย เช่น "ผู้ดูแลระบบสูงสุด" |

---

### `permissions`  *(ไม่มีใน schema.sql — ถูกสร้างแยกต่างหาก)*
รายการสิทธิ์ทั้งหมดแบบ `resource × action` seed มาจาก `backend/src/permissionCatalog.js`

| คอลัมน์           | ชนิดข้อมูล | เงื่อนไข                                  | หมายเหตุ |
|------------------|--------|---------------------------------------------|-------|
| `id`             | `SERIAL` | **PK**                                    | |
| `resource`       | `TEXT` | เป็นส่วนหนึ่งของ `UNIQUE (resource, action)` | 1 ใน 18 resource ที่ตรงกับ section ต่างๆ ในระบบ/`content_store`: `ANN_NEWS`, `N_SYSTEMS`, `CONTACT_LINKS`, `ONCALL`, `NEWS`, `PROMOS`, `QUALITY`, `PARTNERS`, `DIGITAL_SERVICES`, `FINANCE_DOCS`, `TEMPLATE_OPTIONS`, `DIVISIONS`, `REPORTS`, `DOCTOR_LINKS`, `REQUEST_CATEGORIES`, `SITE`, `CUSTOM_SECTIONS`, `USERS` |
| `resource_label` | `TEXT` | `NOT NULL`                                  | ชื่อแสดงผลภาษาไทย |
| `action`         | `TEXT` | เป็นส่วนหนึ่งของ `UNIQUE (resource, action)` | 1 ใน 4 แบบ: `view`, `create`, `update`, `delete` |

18 resource × 4 action = 72 แถว เมื่อ seed ครบ

---

### `role_permissions`  *(ไม่มีใน schema.sql — ถูกสร้างแยกต่างหาก)*
ตารางเชื่อมระหว่าง role กับ permission (ความสัมพันธ์แบบ many-to-many)

| คอลัมน์          | ชนิดข้อมูล   | เงื่อนไข                                       | หมายเหตุ |
|-----------------|-----------|--------------------------------------------------|-------|
| `role_id`       | `INTEGER` | `REFERENCES roles(id)`                          | |
| `permission_id` | `INTEGER` | `REFERENCES permissions(id)`                    | |
| —               | —         | ต้องมี unique constraint บนคู่ `(role_id, permission_id)` | โค้ดใช้ `ON CONFLICT DO NOTHING` กับคู่นี้ (`seedPermissions.js`, `routes/roles.js`) ถ้าไม่มี unique/PK คู่นี้ การ insert จะ error |

`PUT /api/roles/:id/permissions` จะแทนที่สิทธิ์ทั้งหมดของ role นั้นด้วยการลบทุกแถวของ `role_id` นั้นแล้ว insert ใหม่ทั้งชุด

---

### `uploads`
ไฟล์ที่อัปโหลด (PDF, รูปภาพ) เก็บเป็นไบต์ตรงในฐานข้อมูล Postgres

| คอลัมน์          | ชนิดข้อมูล    | เงื่อนไข                  | อยู่ใน `schema.sql`? | หมายเหตุ |
|-----------------|---------------|----------------------------|:---:|-------|
| `id`            | `SERIAL`      | **PK**                    | ✅ | |
| `folder`        | `TEXT`        | `NOT NULL`, ทำ index ไว้    | ✅ | เป็น 1 ในรายการที่อนุญาตไว้ตายตัว: `doctor`, `nurse`, `pharmacy`, `photo`, `emp`, `med`, `mservice`, `avatar`, `pt`, `marketing`, `technician`, `hr` |
| `original_name` | `TEXT`        | `NOT NULL`                | ✅ | |
| `stored_name`   | `TEXT`        | เว้นว่างได้                | ❌ *ไม่มีใน schema.sql* | สร้างจาก `crypto.randomUUID() + นามสกุลไฟล์` ตอนอัปโหลด |
| `url`           | `TEXT`        | เว้นว่างได้                | ❌ *ไม่มีใน schema.sql* | ตั้งค่าด้วยคำสั่ง `UPDATE` รอบที่สองทันทีหลัง insert เป็น `/api/uploads/:id/download` |
| `mime_type`     | `TEXT`        | `NOT NULL`                | ✅ | |
| `size_bytes`    | `INTEGER`     | `NOT NULL`                | ✅ | จำกัดขนาดในโค้ดแอป: ทั่วไป 25MB, รูปภาพ (`image/*`) 5MB |
| `data`          | `BYTEA`       | `NOT NULL`                | ✅ | ไบต์ไฟล์จริง |
| `uploaded_by`   | `TEXT`        | เว้นว่างได้                | ✅ | ปัจจุบัน hardcode เป็น `'staff'` ใน `routes/uploads.js` — ยังไม่ได้ใช้ username จริงของผู้ที่ login |
| `created_at`    | `TIMESTAMPTZ` | `NOT NULL DEFAULT now()`  | ✅ | |

Index: `idx_uploads_folder` บนคอลัมน์ `folder`

> คอมเมนต์ในไฟล์ `schema.sql` เองก็ระบุไว้ว่า ถ้าปริมาณไฟล์เยอะขึ้นในอนาคต ควรย้ายไปเก็บที่ object storage (S3/R2) แล้วเก็บแค่ URL ไว้ใน Postgres แทน

---

## สรุป flow การยืนยันตัวตน (auth) เพื่อความเข้าใจ (ไม่ใช่ส่วนของ schema)

1. **Login** (`POST /api/auth/login`) — ค้นหาใน `admin_users` join กับ `roles`, ตรวจสอบ `password_hash` ด้วย bcrypt, ฝัง `role`, `roleLabel`, และ array สิทธิ์แบบเรียบ (`"RESOURCE:action"`) ลงใน JWT (เซ็นด้วย `JWT_SECRET` หมดอายุใน 12 ชั่วโมง)
2. **ตั้งรหัสผ่านครั้งแรก / รีเซ็ต** (`POST /api/auth/setup-password`, `POST /api/users/:id/reset-password`) — ใช้ `setup_token` + `setup_token_expires` ในตาราง `admin_users` ไม่มีระบบส่งอีเมล token จะถูกส่งกลับให้ผู้เรียก API โดยตรง
3. **การเช็คสิทธิ์** (`middleware/requirePermission.js`) — query จาก database สดทุกครั้ง (ไม่ได้อ่านจาก JWT อย่างเดียว) เพื่อให้การถอดสิทธิ์มีผลทันที โดย `role = 'super_admin'` จะผ่านทุกกรณีเสมอ
4. **การเช็ค super-admin** (`middleware/requireSuperAdmin.js`) — เช็คจาก database สดเช่นเดียวกัน ใช้กับ endpoint ที่อ่อนไหวที่สุดในการจัดการ role/permission

---

## ข้อเสนอแนะการแก้ `schema.sql`

เพื่อให้ clone ใหม่รันได้เลยผ่าน `npm run migrate` เพียงคำสั่งเดียว ควรเพิ่มส่วนนี้เข้าไปใน `schema.sql`:

```sql
CREATE TABLE IF NOT EXISTS roles (
  id     SERIAL PRIMARY KEY,
  name   TEXT UNIQUE NOT NULL,
  label  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS permissions (
  id              SERIAL PRIMARY KEY,
  resource        TEXT NOT NULL,
  resource_label  TEXT NOT NULL,
  action          TEXT NOT NULL,
  UNIQUE (resource, action)
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id       INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id INTEGER NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

ALTER TABLE admin_users
  ALTER COLUMN password_hash DROP NOT NULL,
  ADD COLUMN IF NOT EXISTS display_name TEXT,
  ADD COLUMN IF NOT EXISTS role_id INTEGER REFERENCES roles(id),
  ADD COLUMN IF NOT EXISTS setup_token TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS setup_token_expires TIMESTAMPTZ;

ALTER TABLE uploads
  ADD COLUMN IF NOT EXISTS stored_name TEXT,
  ADD COLUMN IF NOT EXISTS url TEXT;
```

หลังจากนั้นให้รัน `node src/seedPermissions.js` อีกครั้งหนึ่ง เพื่อ seed ตาราง `permissions`/`roles`/`role_permissions` ให้ครบ และผูกบัญชี `admin_users` เดิมที่มีอยู่แล้วเข้ากับ role `super_admin`

---

## หมายเหตุสำหรับกรณีมี database ที่มีข้อมูลอยู่แล้ว (production)

**ห้ามใช้ `schema.sql` ตัวเต็มด้านบนกับ database ที่มีข้อมูลอยู่แล้ว** เพราะจะพยายาม `CREATE TABLE` ทับตารางเดิมที่มีอยู่ (แม้จะมี `IF NOT EXISTS` แต่คอลัมน์ใหม่ใน `admin_users`/`uploads` จะไม่ถูกเพิ่มให้ถ้าตารางมีอยู่ก่อนแล้ว) ให้ใช้ไฟล์ **`migration_add_roles.sql`** แยกต่างหาก ซึ่งใช้ `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` แทน เพื่อเติมส่วนที่ขาดโดยไม่กระทบข้อมูลเดิม แล้วค่อยรัน `node src/seedPermissions.js` ตามหลัง
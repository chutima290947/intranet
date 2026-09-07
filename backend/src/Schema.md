# เอกสารโครงสร้างฐานข้อมูล (Database Schema) — Intranet Backend

**ฐานข้อมูล:** PostgreSQL (โฮสต์บน Neon) — เข้าถึงผ่านไลบรารี `pg` ใน `backend/src/db.js`
**ไฟล์นิยาม schema:** `backend/src/schema.sql` — รันผ่านคำสั่ง `npm run migrate` (`backend/src/migrate.js`)
**Seed data:** `backend/src/seed.js` (สร้างบัญชีแอดมินคนแรก) และ `backend/src/seedPermissions.js` (สร้าง permission/role/role_permissions เริ่มต้น)

> อัปเดตล่าสุด: ตรวจสอบโดยเทียบ `schema.sql` กับโค้ดจริงในทุก route/middleware แล้ว — ปัจจุบัน **`schema.sql` มีตารางและคอลัมน์ครบตามที่แอปพลิเคชันต้องใช้ทั้งหมด** (ต่างจากเวอร์ชันเก่าที่เคยขาด `roles`, `permissions`, `role_permissions` และบางคอลัมน์ใน `admin_users`/`uploads`) ดูหัวข้อ **"ข้อควรระวัง"** ท้ายเอกสารสำหรับปัญหาที่ยังหลงเหลืออยู่

---

## ภาพรวมความสัมพันธ์ของตาราง

```
roles ──1:N──< admin_users
  │
  └──N:M── permissions   (ผ่านตารางเชื่อม role_permissions)

content_store   (ตาราง key-value อิสระ ไม่ผูก FK กับตารางอื่น)
uploads         (ตารางอิสระ ไม่ผูก FK กับตารางอื่น — uploaded_by เก็บเป็น text เฉยๆ)
```

- `admin_users.role_id` → `roles.id` (FK, ไม่มี `ON DELETE`, เว้นว่างได้)
- `role_permissions.role_id` → `roles.id` (FK, `ON DELETE CASCADE`)
- `role_permissions.permission_id` → `permissions.id` (FK, `ON DELETE CASCADE`)
- `content_store.updated_by` และ `uploads.uploaded_by` เก็บเป็น **ข้อความ (username)** เฉยๆ ไม่ใช่ foreign key จริง

---

## รายละเอียดแต่ละตาราง

### 1. `content_store`
เก็บ "collection" เนื้อหาที่แอดมินแก้ไขได้ทุกส่วนของเว็บไซต์ (เดิมเก็บใน `localStorage` ผ่าน `ContentContext` ฝั่ง frontend) — 1 แถวต่อ 1 content key ระดับบนสุด

| คอลัมน์ | ชนิดข้อมูล | เงื่อนไข | หมายเหตุ |
|---|---|---|---|
| `key` | `TEXT` | **PK** | ตรงกับ key ใน `DEFAULT_CONTENT` (frontend `src/data/defaultContent.js`) เช่น `SITE`, `ANN_NEWS`, `N_SYSTEMS`, `CONTACT_LINKS`, `ONCALL`, `NEWS`, `PROMOS`, `QUALITY`, `PARTNERS`, `DIGITAL_SERVICES`, `FINANCE_DOCS`, `TEMPLATE_OPTIONS`, `DIVISIONS`, `REPORTS`, `DOCTOR_LINKS`, `REQUEST_CATEGORIES`, `SECTIONS` |
| `value` | `JSONB` | `NOT NULL` | โครงสร้าง JSON อิสระ ขึ้นอยู่กับแต่ละ key (กำหนดฝั่ง frontend เท่านั้น database ไม่บังคับ schema ภายใน) |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT now()` | อัปเดตทุกครั้งที่มีการ upsert |
| `updated_by` | `TEXT` | เว้นว่างได้ | เก็บ `username` ของแอดมินที่แก้ (จาก JWT) — ไม่ใช่ FK ไปยัง `admin_users` |

**การเข้าถึง** (`routes/content.js`):
- `GET /api/content` — คืนทุกแถวเป็น `{ key: value }` **ไม่ต้อง login**
- `PUT /api/content/:key` — upsert ด้วย `INSERT ... ON CONFLICT (key) DO UPDATE` ต้อง login
- `DELETE /api/content/:key` — ลบแถว ทำให้ frontend กลับไปใช้ `DEFAULT_CONTENT` ที่ hardcode ไว้แทน

---

### 2. `roles`
ชุดสิทธิ์ที่ตั้งชื่อไว้ (role) — seed เริ่มต้นจาก `backend/src/seedPermissions.js`

| คอลัมน์ | ชนิดข้อมูล | เงื่อนไข | หมายเหตุ |
|---|---|---|---|
| `id` | `SERIAL` | **PK** | |
| `name` | `TEXT` | `UNIQUE NOT NULL` | ค่า `super_admin` ถูกใช้เป็น magic string ทั่วทั้งระบบ — ให้สิทธิ์เต็มทุกอย่างเสมอ (ดูหัวข้อ auth flow), ลบ/ลดสิทธิ์ role นี้ไม่ได้ถ้าเหลือผู้ใช้คนเดียว |
| `label` | `TEXT` | `NOT NULL` | ชื่อแสดงผลภาษาไทย เช่น "ผู้ดูแลระบบสูงสุด" |

**การเข้าถึง** (`routes/roles.js`, สงวนเฉพาะ `super_admin` ทั้งหมดผ่าน `requireSuperAdmin` middleware):
- `GET /api/roles` — คืน role ทั้งหมดพร้อม permissions (array แบบ `resource:action`)
- `POST /api/roles` — สร้าง role ใหม่ (permissions ว่างเปล่า)
- `DELETE /api/roles/:id` — ลบ role (ห้ามลบ `super_admin`) — **หมายเหตุ:** ถ้ายังมี `admin_users` ที่ผูก `role_id` นี้อยู่ การลบจะ error เพราะ FK constraint (ดูหัวข้อ "ข้อควรระวัง")

---

### 3. `permissions`
รายการสิทธิ์ทั้งหมดแบบ `resource × action` seed จาก `backend/src/permissionCatalog.js`

| คอลัมน์ | ชนิดข้อมูล | เงื่อนไข | หมายเหตุ |
|---|---|---|---|
| `id` | `SERIAL` | **PK** | |
| `resource` | `TEXT` | ส่วนหนึ่งของ `UNIQUE (resource, action)` | 1 ใน 18 resource ที่ตรงกับ section/สิทธิ์ต่างๆ ในระบบ: `ANN_NEWS`, `N_SYSTEMS`, `CONTACT_LINKS`, `ONCALL`, `NEWS`, `PROMOS`, `QUALITY`, `PARTNERS`, `DIGITAL_SERVICES`, `FINANCE_DOCS`, `TEMPLATE_OPTIONS`, `DIVISIONS`, `REPORTS`, `DOCTOR_LINKS`, `REQUEST_CATEGORIES`, `SITE`, `CUSTOM_SECTIONS`, `USERS` |
| `resource_label` | `TEXT` | `NOT NULL` | ชื่อแสดงผลภาษาไทย |
| `action` | `TEXT` | ส่วนหนึ่งของ `UNIQUE (resource, action)` | หนึ่งใน 4 แบบ: `view`, `create`, `update`, `delete` |

รวม 18 resource × 4 action = **72 แถว** เมื่อ seed ครบ (ผ่าน `node src/seedPermissions.js`)

---

### 4. `role_permissions`
ตารางเชื่อม many-to-many ระหว่าง `roles` และ `permissions`

| คอลัมน์ | ชนิดข้อมูล | เงื่อนไข | หมายเหตุ |
|---|---|---|---|
| `role_id` | `INTEGER` | `REFERENCES roles(id) ON DELETE CASCADE`, ส่วนหนึ่งของ **PK** | |
| `permission_id` | `INTEGER` | `REFERENCES permissions(id) ON DELETE CASCADE`, ส่วนหนึ่งของ **PK** | |

`PRIMARY KEY (role_id, permission_id)` — รองรับ `ON CONFLICT DO NOTHING` ที่โค้ดใช้ตอน seed และตอนตั้งค่าสิทธิ์

**การเข้าถึง** (`routes/roles.js`):
- `PUT /api/roles/:id/permissions` — แทนที่สิทธิ์ทั้งหมดของ role นั้น (ลบทุกแถวของ `role_id` แล้ว insert ใหม่ทั้งชุดใน transaction เดียว)

---

### 5. `admin_users`
บัญชีแอดมิน/เจ้าหน้าที่ ใช้แทนระบบ credential แบบ hardcode เดิม (`authConfig.js`)

| คอลัมน์ | ชนิดข้อมูล | เงื่อนไข | หมายเหตุ |
|---|---|---|---|
| `id` | `SERIAL` | **PK** | |
| `username` | `TEXT` | `UNIQUE NOT NULL` | |
| `password_hash` | `TEXT` | เว้นว่างได้ (bcrypt hash) | เป็น `NULL` ได้ชั่วคราว 2 กรณี: (1) แอดมินสร้างบัญชีใหม่แต่ผู้ใช้ยังไม่ตั้งรหัสผ่านครั้งแรก (2) หลังทำ reset-password |
| `display_name` | `TEXT` | เว้นว่างได้ | แสดงในหน้าจัดการผู้ใช้ (Admin) |
| `role_id` | `INTEGER` | `REFERENCES roles(id)`, เว้นว่างได้ | ผู้ใช้ที่ `role_id IS NULL` จะไม่มีสิทธิ์ใดๆ เลย |
| `setup_token` | `TEXT` | `UNIQUE`, เว้นว่างได้ | token สุ่ม (`crypto.randomBytes(24)`) ใช้ให้ผู้ใช้ตั้งรหัสผ่านครั้งแรก/รีเซ็ตรหัสผ่าน — ไม่มีระบบอีเมล ผู้ดูแลต้องส่ง token/ลิงก์เองด้วยมือ |
| `setup_token_expires` | `TIMESTAMPTZ` | เว้นว่างได้ | หมดอายุ 7 วันหลังสร้าง (`routes/users.js`, `routes/auth.js`) |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT now()` | |

**การเข้าถึง:**
- `POST /api/auth/login` — ตรวจสอบด้วย bcrypt, ออก JWT (อายุ 12 ชม.) ที่ฝัง role และ permissions แบบ flatten ไว้
- `POST /api/auth/setup-password`, `GET /api/auth/setup-password/:token` — ใช้ `setup_token`
- `POST /api/auth/change-password` — เปลี่ยนรหัสผ่านตัวเอง (ต้อง login + ยืนยันรหัสเดิม)
- `GET/POST/PATCH/DELETE /api/users*` (`routes/users.js`) — CRUD ผู้ใช้ + reset-password, สงวนไว้ด้วย permission `USERS:*`
  - กันไม่ให้ role ที่ไม่ใช่ `super_admin` มอบ/แก้/ลบ/รีเซ็ตรหัสของบัญชีที่เป็น `super_admin` (กันการยกระดับสิทธิ์)
  - กันไม่ให้ระบบเหลือ `super_admin` 0 คน (เช็คก่อนลบ/เปลี่ยน role ของ `super_admin` คนสุดท้าย)

---

### 6. `uploads`
ไฟล์ที่อัปโหลดผ่าน UploadBox (PDF, รูปภาพ ฯลฯ) — เก็บไบต์ไฟล์ตรงในตาราง Postgres

| คอลัมน์ | ชนิดข้อมูล | เงื่อนไข | หมายเหตุ |
|---|---|---|---|
| `id` | `SERIAL` | **PK** | |
| `folder` | `TEXT` | `NOT NULL`, มี index | ต้องอยู่ในรายการที่อนุญาตตายตัวในโค้ด (`ALLOWED_FOLDERS`): `doctor`, `nurse`, `pharmacy`, `photo`, `emp`, `med`, `mservice`, `avatar`, `pt`, `marketing`, `technician`, `hr` |
| `original_name` | `TEXT` | `NOT NULL` | ชื่อไฟล์เดิมจากผู้ใช้ |
| `stored_name` | `TEXT` | เว้นว่างได้ | สร้างจาก `crypto.randomUUID() + นามสกุลไฟล์` ตอนอัปโหลด กันชื่อไฟล์ชนกัน |
| `url` | `TEXT` | เว้นว่างได้ | อัปเดตด้วยคำสั่ง `UPDATE` รอบสองทันทีหลัง insert (เพราะต้องใช้ `id` ที่เพิ่ง insert มาประกอบ URL) เป็นรูปแบบ `/api/uploads/:id/download` |
| `mime_type` | `TEXT` | `NOT NULL` | |
| `size_bytes` | `INTEGER` | `NOT NULL` | จำกัดในโค้ดแอป: ไฟล์ทั่วไป 25MB, รูปภาพ (`image/*`) 5MB |
| `data` | `BYTEA` | `NOT NULL` | ไบต์ไฟล์จริง |
| `uploaded_by` | `TEXT` | เว้นว่างได้ | ปัจจุบัน **hardcode เป็น `'staff'`** เสมอใน `routes/uploads.js` — ยังไม่ผูกกับ username จริงของผู้ login (แม้ route นี้จะไม่บังคับ login อยู่แล้วก็ตาม) |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT now()` | |

**Index:** `idx_uploads_folder` บนคอลัมน์ `folder`

**การเข้าถึง** (`routes/uploads.js`):
- `POST /api/uploads` — **ไม่บังคับ login** (ตามพฤติกรรมเดิมของ UploadBox ที่ให้พนักงานทั่วไปใช้ได้)
- `GET /api/uploads?folder=...` — รายการไฟล์ (ไม่ส่ง `data` กลับ), ไม่บังคับ login
- `GET /api/uploads/:id/download` — สตรีมไฟล์จริงกลับ, ไม่บังคับ login
- `DELETE /api/uploads/:id` — **ต้อง login**

> คอมเมนต์ในไฟล์ `schema.sql` เองก็ระบุว่า ถ้าปริมาณ/ขนาดไฟล์เยอะขึ้นในอนาคต ควรย้ายไปเก็บที่ object storage (S3/Cloudflare R2) แล้วเก็บแค่ URL ไว้ใน Postgres แทนการเก็บ `bytea` ตรงๆ

---

## Flow การยืนยันตัวตนและสิทธิ์ (ไม่ใช่ส่วนของ schema แต่ช่วยให้เข้าใจว่าทำไม schema ถึงออกแบบแบบนี้)

1. **Login** (`POST /api/auth/login`) — join `admin_users` กับ `roles`, ตรวจ `password_hash` ด้วย bcrypt, ฝัง `role`, `roleLabel` และ permissions แบบเรียบ (`"RESOURCE:action"`) ลงใน JWT (เซ็นด้วย `JWT_SECRET`, อายุ 12 ชม.)
2. **ตั้งรหัสผ่านครั้งแรก/รีเซ็ต** — ใช้ `setup_token` + `setup_token_expires` ใน `admin_users` ไม่มีระบบอีเมล ผู้ดูแลต้องส่ง token ให้เองนอกระบบ
3. **เช็คสิทธิ์รายคำขอ** (`middleware/requirePermission.js`) — query จาก database สดทุกครั้ง (ไม่อ่านจาก JWT อย่างเดียว) เพื่อให้การถอดสิทธิ์มีผลทันที โดย `role = 'super_admin'` จะผ่านทุกกรณีเสมอ
4. **เช็ค super-admin** (`middleware/requireSuperAdmin.js`) — เช็คจาก database สดเช่นกัน ใช้กับ endpoint การจัดการ role/permission ที่อ่อนไหวที่สุด

---

## ข้อควรระวัง 

1. **`admin_users.role_id` ไม่มี `ON DELETE` กำหนดไว้** (default คือ `NO ACTION`) การลบ role ที่ยังมีผู้ใช้ผูกอยู่ (`DELETE /api/roles/:id`) จะทำให้ query ล้มเหลวด้วย foreign key violation แทนที่จะแจ้งข้อความที่เข้าใจง่ายกว่า ควรพิจารณาเช็คก่อนลบว่ามีผู้ใช้ผูก role นี้อยู่หรือไม่ แล้วแจ้ง error ที่เป็นมิตรกว่า
2. **`uploads.uploaded_by` hardcode เป็น `'staff'` เสมอ** ไม่ได้บันทึก username ผู้ login จริง (ทั้งที่ route ลบไฟล์ต้อง login แล้วก็ตาม) ถ้าต้องการ audit ว่าใครอัปโหลด/ลบไฟล์ ต้องแก้โค้ดให้ดึง username จาก JWT (ถ้ามี) มาบันทึกแทน
3. **`content_store.value` ไม่มีการบังคับโครงสร้าง JSON ใดๆ ในระดับฐานข้อมูล** โครงสร้างข้อมูลของแต่ละ key กำหนดโดย `ADMIN_SCHEMAS`/`DEFAULT_CONTENT` ฝั่ง frontend ล้วนๆ — การเปลี่ยนโครงสร้างฝั่ง frontend โดยไม่ migrate ข้อมูลเดิมใน `content_store` อาจทำให้ข้อมูลเก่าใช้ไม่ได้กับ schema ใหม่ของ frontend
# Hospital Intranet – Digital Workplace

ระบบอินทราเน็ตสำหรับพนักงานโรงพยาบาลกรุงเทพศิริโรจน์ (BSI) กลุ่ม BDMS
รวมทุกช่องทางการสื่อสารและระบบงานภายในไว้ในที่เดียว พร้อม **Admin Panel แบบ CMS**
ที่ให้ผู้ดูแลระบบแก้ไขเนื้อหาทุกส่วนของเว็บได้เองโดยไม่ต้องแก้โค้ด

เอกสารฉบับนี้รวม **โครงสร้างฐานข้อมูล (Database Schema)** ไว้ในไฟล์เดียว สรุปจากไฟล์จริงใน repo ทั้งหมด ได้แก่
`backend/src/schema.sql`, `permissionCatalog.js`, `migrate.js`, `seed.js`,
`seedPermissions.js`, `routes/*.js`, `middleware/*.js`, `server.js`, `db.js`,
`frontend/src/data/adminSchemas.js` และโครงสร้างโฟลเดอร์จริงของ repo
---

## ✨ ภาพรวมระบบ

- **Frontend**: React 19 + Vite + Tailwind CSS 4 + Lucide Icons (Tabler Icons)
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (Neon) เข้าถึงผ่าน `pg.Pool` (`backend/src/db.js`)
  บังคับใช้ SSL เสมอ (`ssl: { rejectUnauthorized: false }` เพราะ Neon
  ออก certificate จาก CA กลาง)
- **File Storage**: อัปโหลดผ่าน Multer (`memoryStorage`) แล้วเก็บตัวไฟล์เป็น
  `bytea` ตรงในตาราง `uploads` ของ PostgreSQL
- **Content Management**: ระบบ Admin Panel แบบ Schema-driven — เพิ่ม/แก้ field
  ใหม่ได้จากไฟล์ schema เดียว (`adminSchemas.js`) โดยไม่ต้องแก้ฟอร์ม UI
- **ไม่มี ORM** — ใช้ raw SQL ผ่าน `pool.query()` ทุกจุด (ไม่มี
  Prisma/Sequelize/Knex)
- **Migration แบบ idempotent**: `schema.sql` ทั้งไฟล์ใช้
  `CREATE TABLE IF NOT EXISTS` รันซ้ำได้ปลอดภัยผ่าน `npm run migrate`
- **RBAC สดจาก DB เสมอ**: สิทธิ์ไม่ได้เชื่อ JWT อย่างเดียว —
  ระบบเช็คสิทธิ์จากฐานข้อมูลทุก request เพื่อให้การถอดสิทธิ์มีผลทันที
  ไม่ต้องรอ JWT หมดอายุ (สูงสุด 12 ชม.)

สถาปัตยกรรมเป็นแบบ **SPA + REST API**: Frontend ดึงเนื้อหาทั้งหมด (ข่าว, โปรโมชัน,
เอกสาร, ตารางเวร ฯลฯ) จาก backend ผ่าน REST API และมี `DEFAULT_CONTENT` เป็น
fallback กรณีเรียก API ไม่สำเร็จ (offline-first UX)

---

## 🧩 Tech Stack

### Frontend
| ส่วน | เทคโนโลยี |
|---|---|
| Framework | React 19 (`react`, `react-dom`) |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 (ผ่าน `@tailwindcss/vite`) |
| Icons | `lucide-react` (Tabler-style icon set) |
| Lint | `oxlint` |
| TypeScript types | `@types/react`, `@types/react-dom` |

### Backend
| ส่วน | เทคโนโลยี |
|---|---|
| Runtime | Node.js (ESM, `"type": "module"`) |
| Framework | Express `^4.19.2` |
| Database | PostgreSQL (Neon) ผ่าน `pg ^8.13.1` |
| File upload | `multer ^2.0.1` (memory storage → `bytea` ใน DB) |
| Auth | `jsonwebtoken ^9.0.2` + `bcryptjs ^2.4.3` (hash รหัสผ่าน) |
| CORS | `cors ^2.8.5` |
| Env config | `dotenv ^16.4.5` |

---

## 📁 โครงสร้างโปรเจกต์ (จาก repo จริง)

Repo เป็นแบบ monorepo แยก `frontend/` และ `backend/` ไว้ที่ root เดียวกัน

```
intranet/
├── .gitignore
├── package-lock.json
├── SETUP_NEON.md                     # คู่มือตั้งค่า Neon (PostgreSQL)
│
├── backend/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── src/
│   │   ├── server.js                 # entry point
│   │   ├── db.js                     # PostgreSQL (Neon) connection pool
│   │   ├── migrate.js                # migration runner
│   │   ├── seed.js                   # seed บัญชีแอดมินแรก
│   │   ├── seedPermissions.js        # seed permission + role super_admin
│   │   ├── permissionCatalog.js      # รายการ permission ทั้งหมดในระบบ
│   │   ├── schema.sql                # DB schema (DDL)
│   │   ├── middleware/
│   │   │   ├── auth.js               # ตรวจสอบ JWT
│   │   │   ├── requirePermission.js  # guard ตาม permission ราย endpoint
│   │   │   └── requireSuperAdmin.js  # guard เฉพาะ super admin
│   │   └── routes/
│   │       ├── auth.js               # login / setup password
│   │       ├── content.js            # CRUD เนื้อหา CMS ทุก collection
│   │       ├── roles.js              # จัดการ role และ permission
│   │       ├── uploads.js            # อัปโหลดไฟล์ (multer)
│   │       └── users.js              # จัดการผู้ใช้งาน
│   └── uploads/                      # ไฟล์ที่อัปโหลดจริง แยกตามโฟลเดอร์ เช่น
│       ├── doctor/
│       └── photo/
│
└── frontend/
    ├── .env
    ├── .env.example
    ├── .oxlintrc.json
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── public/
    │   ├── favicon.svg
    │   ├── icons.svg
    │   └── pdf/
    │       └── partnerlist.pdf
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── assets/                   # รูปภาพ static: โลโก้ระบบ (~50 ไฟล์),
        │                              # รูป division, promo, QR code ฯลฯ
        ├── components/
        │   ├── Admin/
        │   │   ├── AdminLayout.jsx
        │   │   ├── ChangePasswordModal.jsx
        │   │   ├── CustomSectionsPanel.jsx
        │   │   ├── UserRolePanel.jsx
        │   │   └── editors/
        │   │       ├── CollectionEditor.jsx
        │   │       ├── FieldInputs.jsx
        │   │       ├── JsonEditor.jsx
        │   │       └── SiteSettingsEditor.jsx
        │   ├── Auth/
        │   │   └── SetupPasswordPage.jsx
        │   ├── Division/
        │   │   └── DivisionGrid.jsx
        │   ├── Home/                  # ส่วนใหญ่ของฟีเจอร์หน้า Home อยู่ที่นี่
        │   │   ├── Announcement.jsx
        │   │   ├── AnnouncementTreePage.jsx
        │   │   ├── ContactCard.jsx
        │   │   ├── DigitalServicePage.jsx
        │   │   ├── DigitalServices.jsx
        │   │   ├── DoctorSchedulePage.jsx
        │   │   ├── ExpandableCards.jsx
        │   │   ├── GenericExpandableSection.jsx
        │   │   ├── GenericGridSection.jsx
        │   │   ├── GenericListSection.jsx
        │   │   ├── Hero.jsx
        │   │   ├── NSystem.jsx
        │   │   ├── OnCall.jsx
        │   │   ├── PartnerDetailPage.jsx
        │   │   ├── PartnerList.jsx
        │   │   ├── PopupAd.jsx
        │   │   ├── Promo.jsx
        │   │   ├── PromoModal.jsx
        │   │   ├── QualityCenter.jsx
        │   │   ├── QualityDetailPage.jsx
        │   │   ├── QuickNav.jsx
        │   │   ├── StatsBar.jsx
        │   │   └── UploadBox.jsx
        │   ├── Online/
        │   │   ├── Requestgrid.jsx
        │   │   └── RequestItemDetailPage.jsx
        │   ├── Report/
        │   │   └── Reportgrid.jsx
        │   ├── BackToTop.jsx
        │   ├── Footer.jsx
        │   ├── NavBar.jsx
        │   └── TopBar.jsx
        ├── config/
        │   ├── data.js
        │   ├── site.js
        │   └── uploadFolders.js
        ├── context/
        │   ├── AuthContext.jsx
        │   └── ContentContext.jsx
        ├── data/
        │   ├── adminSchemas.js       # schema ของ Admin Panel (เดิมเรียก ADMIN_SCHEMAS.js)
        │   ├── defaultContent.js     # fallback content เมื่อ API เรียกไม่สำเร็จ
        │   ├── annualHealthCheckPartners.js
        │   ├── clinicNursePartners.js
        │   ├── partnerHealthcareList.js
        │   ├── preEmploymentHealthCheckPartners.js
        │   ├── preInsuranceHealthCheckPartners.js
        │   ├── promoPackageItems.js
        │   └── schoolpartners.js
        ├── hooks/
        │   └── useClock.js
        ├── lib/
        │   └── api.js                # wrapper เรียก backend API
        └── utils/
            └── guessIcon.js
```

> โฟลเดอร์ `assets/logos/` มีไฟล์โลโก้ระบบงานออนไลน์กว่า 50 ไฟล์ (สอดคล้องกับ
> รายการใน `DIGITAL_SERVICES` / `N_SYSTEMS`) จึงไม่แจกแจงทีละไฟล์ในนี้

---

## 🚀 ฟีเจอร์หลัก

ระบบแบ่งเนื้อหาเป็นกลุ่มตาม Admin Panel (`adminSchemas.js`) ดังนี้

### ป๊อปอัพโฆษณา
- `POPUP_ADS` — ป๊อปอัพก่อนเข้าหน้าแรก รองรับหลายรายการพร้อมกันแบบ carousel
  (ลูกศร / จุดบอกตำแหน่ง / ปัดนิ้ว) เปิด/ปิดปุ่ม CTA และลิงก์หรือไฟล์ PDF ได้ต่อรายการ
  พร้อมตั้งค่าให้แสดงทุกครั้งหรือแสดงครั้งแรกต่อ session

### หน้า Home
- **ข่าวประชาสัมพันธ์** (`ANN_NEWS`) — ปักหมุดข่าวเป็น Banner ใหญ่ได้, รองรับเมนูย่อยแบบ tree
- **ระบบงานออนไลน์โรงพยาบาล** (`N_SYSTEMS`)
- **ติดต่อภายใน** (`CONTACT_LINKS`)
- **ตารางเวรผู้บริหาร/พยาบาล** (`ONCALL`)
- **ข่าวประชาสัมพันธ์พยาบาล** (`NEWS`) — รองรับรายการย่อยแบบ accordion ในตัว
- **โปรโมชันและแพ็กเกจสุขภาพ** (`PROMOS`) — เปิดดูรายการย่อยผ่าน `PromoModal`
- **ศูนย์รวมระบบคุณภาพและความปลอดภัย** (`QUALITY`) — schema แบบ conditional field
  ตาม `kind` ที่เลือก: Document Management, Quality Center, Print Form,
  Occupational Health, Occurrence Online, โรคติดต่อ (มีหน้ารายละเอียดโรคในตัว
  พร้อม banner, sections, และรายการย่อยเชื่อมลิงก์)
- **รายชื่อลูกค้าบริษัทคู่สัญญา** (`PARTNERS`) — รายชื่อบริษัท/โรงแรม พร้อม QR code,
  วันหมดอายุสัญญา, Payor Code และเอกสารแนบไม่จำกัดจำนวน
- **Digital Services** (`DIGITAL_SERVICES`) — รองรับ 2 รูปแบบเมนูย่อย:
  - แบบแท็บ (`groups`) เช่น HR System
  - แบบ breadcrumb tree (`tree`) เช่น Drug Information (ปี → เดือน)
- **เอกสารการมอบหมายอำนาจทางการเงิน** (`FINANCE_DOCS`)
- **Template PowerPoint** (`TEMPLATE_OPTIONS`)

### Division
- ฝ่ายงาน พร้อมทีมย่อย/ระบบภายในฝ่าย (`DIVISIONS`)

### Report / ระบบ Online
- ระบบรายงาน (`REPORTS`) และหมวดหมู่ระบบ Online (`REQUEST_CATEGORIES`)

### ตารางแพทย์
- ลิงก์และรายการย่อยในหน้าตารางแพทย์ (`DOCTOR_LINKS`)

### ตั้งค่าเว็บไซต์
- ข้อมูลองค์กร (`SITE`)

---

## 🛠️ Admin Panel (CMS)

- Schema-driven: เพิ่ม field ใหม่ทำได้จาก `frontend/src/data/adminSchemas.js` เพียงไฟล์เดียว
  แล้วฟอร์มใน `CollectionEditor.jsx` / `FieldInputs.jsx` จะ render ให้อัตโนมัติ
- รองรับ field type: `text`, `textarea`, `boolean`, `image`, `file`, `url`,
  `date`, `icon`, `select`, `list`, `sublist`, `tree`, `site`
- **Conditional fields** ผ่าน `showIf()` — เช่น ฟอร์ม `QUALITY` จะแสดงเฉพาะ field
  ที่เกี่ยวกับ `kind` ที่เลือกไว้ (พร้อม fallback รองรับ record เก่าที่ยังไม่มี field นี้)
- **Tree editor** รองรับซ้อนได้หลายชั้น พร้อม expand/collapse แบบ accordion
  และแยกสีตามความลึก (depth-based background)
- **File upload**: อัปโหลดผ่าน Multer (`memoryStorage`) แล้วเก็บตัวไฟล์เป็น
  `bytea` ตรงในตาราง `uploads` — แก้ปัญหาไฟล์ชื่อภาษาไทยเพี้ยน
  (latin1 → utf8) และรองรับไฟล์ `.mht` / `.mhtml` เพิ่มเติม
- **Template PowerPoint**: ใช้ `window.showSaveFilePicker()` ก่อนเรียก
  `await fetch()` เพื่อให้อยู่ใน browser gesture window

---

## ⚙️ การติดตั้งฝั่ง Frontend (`frontend/`)

### Prerequisites
- Node.js (แนะนำเวอร์ชัน LTS ล่าสุด)
- เข้าถึง backend API (ดู `VITE_API_URL` ใน `.env`)

### ติดตั้ง dependencies
```bash
npm install
```

### ตั้งค่า Environment Variables
สร้างไฟล์ `.env` ที่ root ของโปรเจกต์ฝั่ง frontend (ดูตัวแปรที่ต้องใช้จาก
`.env.example`) — ตัวแปรหลักคือ `VITE_API_URL` ชี้ไปที่ backend server
ที่ใช้งานจริง (dev / staging / production)

### รันโหมด Development
```bash
npm run dev
```
จะรัน Vite dev server พร้อม `--host` (เข้าถึงได้จากเครื่องอื่นในวง LAN เดียวกัน)

### Build สำหรับ Production
```bash
npm run build
```

### Preview build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

---

## ⚙️ การติดตั้งฝั่ง Backend (`backend/`)

### ติดตั้ง dependencies
```bash
cd backend
npm install
```

### ตั้งค่า Environment Variables
คัดลอกจาก `.env.example` ที่มีอยู่ในโฟลเดอร์ `backend/` แล้วใส่ค่าจริง:
```bash
cp .env.example .env
```

ตัวแปรที่ระบบใช้จริง (อ้างอิงจากชื่อตัวแปรในโค้ด `db.js` / `server.js` /
`seed.js` เท่านั้น — ไม่ได้เปิดอ่านค่าจริงใน `.env`):
- `DATABASE_URL` — connection string ของ Neon (ต้องมี ไม่งั้น `db.js` throw error ทันที)
- `JWT_SECRET` — ใช้ sign/verify JWT
- `PORT` — พอร์ตที่ server ฟัง (default `3001` ถ้าไม่ตั้งค่า)
- `CORS_ORIGIN` — origin ที่อนุญาต แยกด้วย `,` (default `http://localhost:5173`)
- `SEED_ADMIN_USERNAME`, `SEED_ADMIN_PASSWORD` — ใช้ตอนรัน `npm run seed` เท่านั้น (รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร)

### รัน Migration และ Seed (ครั้งแรก)
```bash
npm run migrate            # 1) สร้าง 6 ตารางทั้งหมด
npm run seed                # 2) สร้างบัญชีแอดมินแรก (ยังไม่มี role)
node src/seedPermissions.js # 3) สร้าง permission + role super_admin + ผูกบัญชีแอดมินเข้ากับ super_admin
```

### รันโหมด Development
```bash
npm run dev
```
ใช้ `node --watch src/server.js` — restart อัตโนมัติเมื่อไฟล์เปลี่ยน

### รันโหมด Production
```bash
npm start
```

---

## 📜 Scripts

### Frontend
| Command | หน้าที่ |
|---|---|
| `npm run dev` | รัน dev server (Vite, เปิด `--host`) |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build ในเครื่อง |
| `npm run lint` | ตรวจสอบโค้ดด้วย `oxlint` |

### Backend
| Command | ไฟล์ | หน้าที่ |
|---|---|---|
| `npm run dev` | `src/server.js` | รัน server แบบ auto-restart (`node --watch`) |
| `npm start` | `src/server.js` | รัน server แบบ production (`node`) |
| `npm run migrate` | `src/migrate.js` | รัน `schema.sql` ทั้งไฟล์ สร้าง/อัปเดต 6 ตาราง |
| `npm run seed` | `src/seed.js` | สร้าง/อัปเดตบัญชีแอดมินแรก (ไม่ seed `content_store`) |
| `node src/seedPermissions.js` | `src/seedPermissions.js` | สร้าง permission ครบ + role `super_admin` + ผูกสิทธิ์ทั้งหมดให้ (รันครั้งเดียวหลัง migrate) |

---

## 🗄️ Database Schema (PostgreSQL / Neon)

ครอบคลุมทั้งตาราง, ความสัมพันธ์ระหว่างตาราง, รูปแบบข้อมูล JSON ที่เก็บจริงใน
แต่ละ collection ของ `content_store` — สรุปจาก `backend/src/schema.sql`
และ `frontend/src/data/adminSchemas.js` จริง

### ภาพรวมตาราง

| ตาราง | หน้าที่ | ใช้โดย route/middleware |
|---|---|---|
| `content_store` | เนื้อหา CMS ทุก collection ของเว็บไซต์ (key–value + JSONB) | `routes/content.js` |
| `roles` | รายชื่อ role ของผู้ใช้งานระบบแอดมิน | `routes/roles.js`, `routes/users.js`, `routes/auth.js` |
| `permissions` | รายการสิทธิ์ทั้งหมด (resource × action) | `routes/roles.js`, `middleware/requirePermission.js` |
| `role_permissions` | เชื่อม many-to-many `roles` ↔ `permissions` | `routes/roles.js`, `middleware/requirePermission.js`, `routes/auth.js` |
| `admin_users` | บัญชีผู้ใช้งาน Admin Panel | `routes/auth.js`, `routes/users.js` |
| `uploads` | ไฟล์ที่อัปโหลด (เก็บเป็น `bytea` ในตาราง) | `routes/uploads.js` |

### ตาราง `content_store`

```sql
CREATE TABLE IF NOT EXISTS content_store (
  key         TEXT PRIMARY KEY,
  value       JSONB NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by  TEXT
);
```

| คอลัมน์ | ชนิด | หมายเหตุ |
|---|---|---|
| `key` | `TEXT` **PK** | ตรงกับ `key` ของแต่ละ item ใน `ADMIN_SCHEMAS` |
| `value` | `JSONB NOT NULL` | เนื้อหาจริง — array (`type: 'list'`) หรือ object เดี่ยว (`type: 'site'`) แล้วแต่ schema |
| `updated_at` | `TIMESTAMPTZ NOT NULL DEFAULT now()` | อัปเดตอัตโนมัติทุกครั้งที่แก้ |
| `updated_by` | `TEXT` | username ของแอดมินที่แก้ล่าสุด (จาก JWT `req.user.username`) |

**พฤติกรรมสำคัญ**
- **ไม่ seed ข้อมูลเริ่มต้น** — `seed.js` ตั้งใจข้ามตารางนี้ เพราะ frontend
  merge `DEFAULT_CONTENT` (`defaultContent.js`) เข้ากับสิ่งที่ได้จาก API เอง
  อยู่แล้ว ตารางว่างก็ใช้งานได้ทันที (offline-first UX)
- `GET /api/content` คืนเฉพาะ key ที่มีจริงใน DB เท่านั้น key ที่ไม่มีจะ
  fallback ไปใช้ `DEFAULT_CONTENT` ฝั่ง frontend
- `PUT /api/content/:key` upsert แบบ `INSERT ... ON CONFLICT (key) DO UPDATE`
- `DELETE /api/content/:key` ลบแถวออก → key นั้นกลับไปใช้ค่า default อัตโนมัติ

**รายชื่อ `key` ทั้งหมดที่ใช้จริง (จาก `ADMIN_SCHEMAS`)**

| Group | Key | ชนิดข้อมูล | โครงสร้างโดยย่อ |
|---|---|---|---|
| ป๊อปอัพโฆษณา | `POPUP_ADS` | list | `{ enabled, img, badge, timeLabel, title, description, ctaEnabled, href, file, showEveryTime }[]` |
| หน้า Home | `ANN_NEWS` | list | `{ title, sub, img, badge, pinned, href, file, tree }[]` — `pinned: true` = แสดงเป็น Banner ใหญ่ |
| หน้า Home | `N_SYSTEMS` | list | `{ name, desc, href }[]` |
| หน้า Home | `CONTACT_LINKS` | list | `{ label, href, file }[]` |
| หน้า Home | `ONCALL` | list | `{ label, href, file }[]` |
| หน้า Home | `NEWS` | list | `{ title, sub, href, file, subItems: { label, href, file }[] }[]` |
| หน้า Home | `PROMOS` | list | `{ name, tag, img, items: { label, href, file }[] }[]` |
| หน้า Home | `QUALITY` | list | `{ label, icon, kind, warn, author, updatedAt, href, file, tree, articleItems: { label, isNew, href, file }[], diseases: { label, img, href, badge, intro, author, publishedAt, updatedAt, banners:[{img,href,label}], sections:[{title,href,file,items:[{label,href}]}] }[] }[]` — field แสดง/ซ่อนตาม `kind` ที่เลือก (`showIf`) |
| หน้า Home | `PARTNERS` | list | รายชื่อบริษัทคู่สัญญา พร้อม QR code, วันหมดอายุสัญญา, Payor Code, เอกสารแนบไม่จำกัดจำนวน |
| หน้า Home | `DIGITAL_SERVICES` | list | รองรับเมนูย่อย 2 แบบ: `groups` (แท็บ) หรือ `tree` (breadcrumb ปี → เดือน) |
| หน้า Home | `FINANCE_DOCS` | list | `{ text, ... }[]` |
| หน้า Home | `TEMPLATE_OPTIONS` | list | ตัวเลือก Template PowerPoint |
| Division | `DIVISIONS` | list | `{ name, desc, icon, img, subItems: { label, icon, href, file }[] }[]` |
| Report | `REPORTS` | list | `{ name, href }[]` |
| ตารางแพทย์ | `DOCTOR_LINKS` | list | `{ label, href, file, ... }[]` |
| ระบบ Online | `REQUEST_CATEGORIES` | list | `{ label, items: { name, href, img (uploadFolder: mservice) }[] }[]` |
| ตั้งค่าเว็บไซต์ | `SITE` | single object (`type: 'site'`) | ข้อมูลองค์กร — object เดียว ไม่ใช่ array |

### ตาราง `roles`

```sql
CREATE TABLE IF NOT EXISTS roles (
  id     SERIAL PRIMARY KEY,
  name   TEXT UNIQUE NOT NULL,
  label  TEXT NOT NULL
);
```

ต้องสร้างก่อน `admin_users` เพราะ `admin_users.role_id` อ้างอิงกลับมาที่
ตารางนี้ — role `super_admin` ถูกสร้างและผูกสิทธิ์ทั้งหมดให้อัตโนมัติผ่าน
`node src/seedPermissions.js`

### ตาราง `permissions`

```sql
CREATE TABLE IF NOT EXISTS permissions (
  id              SERIAL PRIMARY KEY,
  resource        TEXT NOT NULL,
  resource_label  TEXT NOT NULL,
  action          TEXT NOT NULL,
  UNIQUE (resource, action)
);
```

**`PERMISSION_CATALOG` — resource ทั้งหมด (× 4 actions: `view`/`create`/`update`/`delete`)**

| Resource | Label |
|---|---|
| `ANN_NEWS` | ข่าวประชาสัมพันธ์ |
| `N_SYSTEMS` | ระบบงานออนไลน์โรงพยาบาล |
| `CONTACT_LINKS` | ติดต่อภายใน (Contact Tools) |
| `ONCALL` | ตารางเวรผู้บริหาร / พยาบาล |
| `NEWS` | ข่าวประชาสัมพันธ์พยาบาล |
| `PROMOS` | โปรโมชันและแพ็กเกจสุขภาพ |
| `QUALITY` | ศูนย์รวมระบบคุณภาพและความปลอดภัย |
| `PARTNERS` | รายชื่อลูกค้าบริษัทคู่สัญญา |
| `DIGITAL_SERVICES` | Digital Services |
| `FINANCE_DOCS` | เอกสารการมอบหมายอำนาจทางการเงิน |
| `TEMPLATE_OPTIONS` | รายการ Template PowerPoint |
| `DIVISIONS` | ฝ่ายงาน (Division) |
| `REPORTS` | ระบบรายงาน (Report) |
| `DOCTOR_LINKS` | ลิงก์ในหน้าตารางแพทย์ |
| `REQUEST_CATEGORIES` | หมวดหมู่และรายการระบบ Online |
| `SITE` | ตั้งค่าเว็บไซต์ |
| `CUSTOM_SECTIONS` | Section ที่สร้างเอง (หน้า Home) |
| `USERS` | จัดการผู้ใช้และสิทธิ์ |

รวม 18 resource × 4 action = **72 permission rows** เมื่อ seed ครบ

### ตาราง `role_permissions`

```sql
CREATE TABLE IF NOT EXISTS role_permissions (
  role_id       INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id INTEGER NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);
```

ตารางเชื่อม many-to-many ระหว่าง role กับ permission — ต้องมี **PK คู่**
`(role_id, permission_id)` เพราะโค้ด seed/set permissions ใช้
`ON CONFLICT DO NOTHING` เวลา insert

### ตาราง `admin_users`

```sql
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
```

| คอลัมน์ | หมายเหตุ |
|---|---|
| `password_hash` | hash ด้วย `bcryptjs` — เป็น `NULL` ได้ชั่วคราว 2 กรณี: (1) สร้างบัญชีใหม่ที่ยังไม่ตั้งรหัสผ่านครั้งแรก (2) ตอน reset-password |
| `setup_token` | random hex 24 bytes คู่กับหน้า `SetupPasswordPage.jsx` |
| `setup_token_expires` | หมดอายุใน 7 วันหลังสร้าง/reset |

แทนที่ `ADMIN_CREDENTIALS` ที่เคย hardcode ไว้ในฝั่ง frontend เดิม

### ตาราง `uploads`

```sql
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
```

| คอลัมน์ | หมายเหตุ |
|---|---|
| `stored_name` | `crypto.randomUUID() + นามสกุลเดิม` กันชื่อไฟล์ซ้ำ/พังจาก encoding |
| `url` | `/api/uploads/{id}/download` (set หลัง insert เพราะต้องรู้ `id` ก่อน) |
| `data` | เนื้อไฟล์จริง เก็บตรงในตาราง ผ่าน `multer.memoryStorage()` |
| `uploaded_by` | ปัจจุบัน hardcode เป็น `'staff'` ใน `routes/uploads.js` |

**Index:** `idx_uploads_folder` — ค้นหาไฟล์ตามโฟลเดอร์เร็วขึ้น
(ใช้กับ `GET /api/uploads?folder=...`)

> 💡 หมายเหตุจาก `schema.sql`: ถ้าปริมาณไฟล์เยอะ/ใหญ่ขึ้นในอนาคต แนะนำย้าย
> ไปเก็บใน object storage (เช่น S3/R2) แล้วเก็บแค่ `url` แทนการเก็บ `bytea`
> ตรงในตาราง

### ความสัมพันธ์ระหว่างตาราง (ER สรุป)

```
roles (1) ──< role_permissions >── (1) permissions
  │
  └──< admin_users.role_id

content_store   -- ไม่มี FK เชื่อมตารางอื่น (standalone, key-based)
uploads         -- ไม่มี FK เชื่อมตารางอื่น (อ้างอิงด้วย folder แบบ standalone)
```

- `ON DELETE CASCADE` ทั้งสองฝั่งของ `role_permissions` — ลบ role หรือ
  permission จะลบความเชื่อมโยงที่เกี่ยวข้องออกไปด้วยอัตโนมัติ
- `admin_users.role_id` **ไม่มี** `ON DELETE CASCADE` — โค้ดฝั่ง route
  ป้องกันการลบ role `super_admin` ไว้แล้ว แต่ role อื่นยังลบได้แม้มี user
  ผูกอยู่ ต้องระวังเวลาลบ role ที่ยังมี user ผูกอยู่

---

## 📤 ระบบอัปโหลดไฟล์

- เก็บไฟล์เป็น `bytea` ตรงในตาราง `uploads` ผ่าน Multer (`memoryStorage()`)
  — PostgreSQL เป็นแหล่งเก็บไฟล์เดียว ไม่มีไฟล์แยกอยู่บน disk
- **ข้อควรระวังเรื่อง FormData**: ต้อง append `folder` ก่อน `file` เสมอ
  เพราะ Multer/Busboy parse stream ตามลำดับฟิลด์ — ถ้าใส่ผิดลำดับจะหา folder ไม่เจอ
- **โฟลเดอร์ที่อนุญาต (`ALLOWED_FOLDERS`)**: `doctor`, `nurse`, `pharmacy`,
  `photo`, `emp`, `med`, `mservice`, `avatar`, `pt`, `marketing`,
  `technician`, `hr`
- **ข้อจำกัดขนาดไฟล์**:

  | ประเภท | ขนาดสูงสุด |
  |---|---|
  | ไฟล์ทั่วไป (PDF, PowerPoint, Word, Excel, `.mht`/`.mhtml`) | 25 MB |
  | รูปภาพ (`image/*`) | 5 MB (เข้มกว่าไฟล์ทั่วไป) |

- แก้ปัญหาไฟล์ชื่อภาษาไทยเพี้ยนจากการ encode latin1 → utf8

---

## 🔒 Authentication & Permissions (RBAC)

### แนวคิด
- ทุก permission คือคู่ `resource:action` เช่น `PARTNERS:update`, `USERS:delete`
- JWT (`jsonwebtoken`, อายุ 12 ชม.) ฝัง `permissions: string[]` ไว้ตอน login
  แต่ endpoint ที่สำคัญ **ไม่ได้เชื่อค่าที่ฝังใน JWT อย่างเดียว** —
  `middleware/requirePermission.js` และ `middleware/requireSuperAdmin.js`
  query ฐานข้อมูลสดทุกครั้ง เพื่อให้การถอด/แก้สิทธิ์มีผลทันที ไม่ต้องรอ
  JWT หมดอายุ

### ขั้นตอนสร้างสิทธิ์เริ่มต้น (`node src/seedPermissions.js`)
1. Insert permission ทุก resource × action จาก `PERMISSION_CATALOG` (upsert)
2. สร้าง role `super_admin` (label: "ผู้ดูแลระบบสูงสุด")
3. ผูก permission **ทุกตัว** เข้ากับ `super_admin`
4. ผูก `admin_users` แถวเดิมที่ยังไม่มี `role_id` เข้ากับ `super_admin`

### กฎป้องกันการยกระดับสิทธิ์ (privilege escalation) ที่ฝังในโค้ด
- การจัดการ role/permission ทั้งหมด (`routes/roles.js`) สงวนไว้เฉพาะ
  `super_admin` เท่านั้น
- สร้าง/แก้ role ของ user: ถ้าผู้ทำรายการไม่ใช่ `super_admin`
  จะมอบ role `super_admin` ให้คนอื่นไม่ได้
- ลบ role `super_admin` ไม่ได้
- ต้องมี `super_admin` เหลืออย่างน้อย 1 คนเสมอ — ป้องกันทั้งการเปลี่ยน role
  ออกและการลบบัญชีของ `super_admin` คนสุดท้าย
- ลบบัญชีตัวเองไม่ได้
- reset รหัสผ่านของ `super_admin` ได้เฉพาะ `super_admin` ด้วยกันเท่านั้น
- `GET /api/users/roles-assignable` ไม่คืน role `super_admin` มาให้เลือก
  ถ้าผู้เรียกไม่ใช่ `super_admin` และไม่แนบ permission ของแต่ละ role มาด้วย

### วงจรบัญชีผู้ใช้
1. ผู้มีสิทธิ์ `USERS:create` สร้าง user ใหม่ → `password_hash = NULL`,
   ได้ `setup_token` (หมดอายุ 7 วัน)
2. ระบบไม่มีการส่งอีเมล — ต้องคัดลอกลิงก์ setup ไปส่งเองนอกระบบ
3. ผู้ใช้ตั้งรหัสผ่านครั้งแรกผ่าน `POST /api/auth/setup-password`
   (รหัสผ่านอย่างน้อย 8 ตัวอักษร)
4. Login ผ่าน `POST /api/auth/login` → ได้ JWT อายุ 12 ชม.
5. เปลี่ยนรหัสผ่านเองได้ผ่าน `POST /api/auth/change-password`
6. ถ้าลืมรหัสผ่าน: แอดมิน `USERS:update` เรียก
   `POST /api/users/:id/reset-password` → เคลียร์ `password_hash` และออก
   `setup_token` ใหม่

### สรุป API Endpoints ทั้งหมด (mount ที่ `server.js`)

| Base path | ต้อง login? |
|---|---|
| `/api/health` | ไม่ต้อง |
| `/api/auth` | ผสม (login ไม่ต้อง, ที่เหลือต้อง) |
| `/api/users` | ต้อง login ทุก endpoint |
| `/api/roles` | ต้อง login + `super_admin` เท่านั้น |
| `/api/content` | GET ไม่ต้อง, PUT/DELETE ต้อง login |
| `/api/uploads` | POST/GET/download ไม่ต้อง, DELETE ต้อง login |

**`/api/auth`**

| Method & Path | ต้องสิทธิ์ | หน้าที่ |
|---|---|---|
| `POST /login` | — | login ด้วย username/password คืน JWT (12 ชม.) |
| `POST /setup-password` | — | ตั้งรหัสผ่านครั้งแรกด้วย `setup_token` |
| `GET /setup-password/:token` | — | เช็คว่า token ยังใช้ได้ไหม |
| `GET /me` | login | คืนข้อมูล user + permissions ปัจจุบัน |
| `POST /change-password` | login | เปลี่ยนรหัสผ่านตัวเอง |

**`/api/users`**

| Method & Path | ต้องสิทธิ์ | หน้าที่ |
|---|---|---|
| `GET /roles-assignable` | `USERS:view` | role ที่มอบให้คนอื่นได้ |
| `GET /` | `USERS:view` | รายชื่อ user ทั้งหมด + role |
| `POST /` | `USERS:create` | สร้าง user ใหม่ (ยังไม่มีรหัสผ่าน) |
| `PATCH /:id` | `USERS:update` | เปลี่ยน role ของ user |
| `POST /:id/reset-password` | `USERS:update` | ล้างรหัสผ่านเดิม + ออก setup_token ใหม่ |
| `DELETE /:id` | `USERS:delete` | ลบบัญชี |

**`/api/roles`** (ทุก endpoint ต้องเป็น `super_admin`)

| Method & Path | หน้าที่ |
|---|---|
| `GET /` | รายชื่อ role ทั้งหมด พร้อม permission (`resource:action[]`) |
| `GET /permission-catalog` | resource × action ทั้งหมดในระบบ |
| `POST /` | สร้าง role ใหม่ |
| `PUT /:id/permissions` | แทนที่ permission ทั้งชุดของ role (transaction) |
| `DELETE /:id` | ลบ role (ห้ามลบ `super_admin`) |

**`/api/content`**

| Method & Path | ต้อง login? | หน้าที่ |
|---|---|---|
| `GET /` | ไม่ต้อง | คืน `{ KEY: value, ... }` เฉพาะ key ที่มีใน DB |
| `PUT /:key` | ต้อง | upsert เนื้อหาของ key นั้น |
| `DELETE /:key` | ต้อง | รีเซ็ต key นั้นกลับไปใช้ `DEFAULT_CONTENT` |

**`/api/uploads`**

| Method & Path | ต้อง login? | หน้าที่ |
|---|---|---|
| `POST /` | ไม่ต้อง | อัปโหลดไฟล์ (`multipart/form-data`, field `folder` ต้องมาก่อน `file`) |
| `GET /?folder=` | ไม่ต้อง | รายการไฟล์ (ไม่ส่ง `data` กลับ) |
| `GET /:id/download` | ไม่ต้อง | ดาวน์โหลด/เปิดไฟล์จริงจาก `bytea` |
| `DELETE /:id` | ต้อง | ลบไฟล์ |

---

## 📝 หมายเหตุ

เอกสารฉบับนี้รวมโครงสร้างโฟลเดอร์จริงของ repo (`tree` output),
`adminSchemas.js`, `package.json` ทั้งฝั่ง frontend/backend เข้ากับเอกสาร
Database Schema ที่สรุปจาก `backend/src/schema.sql`, `permissionCatalog.js`,
`migrate.js`, `seed.js`, `seedPermissions.js`, `server.js`, `db.js`,
`middleware/*.js` และ `routes/*.js` จริงใน repo — **ไม่ได้เปิดอ่านไฟล์
`.env` / `.env.example` ตามที่ระบุไว้**


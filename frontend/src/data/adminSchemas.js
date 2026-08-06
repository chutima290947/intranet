/* ------------------------------------------------------------------
   ADMIN_SCHEMAS
   นิยามว่าแต่ละหัวข้อข้อมูล (collection) ในเว็บไซต์มีฟิลด์อะไรบ้าง
   ใช้ให้ CollectionEditor / JsonEditor / SiteSettingsEditor สร้างฟอร์มแก้ไขอัตโนมัติ

   type ที่รองรับ:
   - 'list'  : รายการ (array ของ object) แก้ไขผ่านฟอร์มที่สร้างจาก fields
   - 'json'  : ข้อมูลซับซ้อนที่ซ้อนกันหลายชั้นเกินกว่าจะทำฟอร์มปกติ (เช่น เมนูแบบ tree)
               จะแก้ไขผ่านช่องแก้โค้ด JSON โดยตรง
   - 'site'  : ฟอร์มตั้งค่าทั่วไปของเว็บไซต์ (ไม่ใช่ list)

   field.type ที่รองรับใน CollectionEditor:
   'text' | 'textarea' | 'icon' | 'color' | 'url' | 'image' | 'file' | 'sublist'
   - 'image' : อัปโหลดรูปภาพ (jpg/png/webp) มี preview
   - 'file'  : อัปโหลดไฟล์เอกสาร (pdf) แสดงชื่อไฟล์
------------------------------------------------------------------ */

export const ADMIN_SCHEMAS = [
  {
    group: 'หน้า Home',
    items: [
      {
        key: 'ANN_NEWS',
        label: 'ข่าวประชาสัมพันธ์ (รายการทั้งหมด)',
        description: 'รายการข่าวที่แสดงเมื่อกด "ดูประกาศทั้งหมด" ในการ์ดข่าวประชาสัมพันธ์',
        type: 'list',
        itemLabel: (i) => i.title,
        fields: [
          { key: 'title', label: 'หัวข้อข่าว', type: 'text' },
          { key: 'sub', label: 'คำอธิบายย่อ', type: 'textarea' },
          { key: 'href', label: 'ลิงก์ (URL ภายนอก)', type: 'url' },
          { key: 'file', label: 'หรือแนบไฟล์ PDF', type: 'file' },
        ],
      },
      {
        key: 'N_SYSTEMS',
        label: 'ระบบงานออนไลน์โรงพยาบาล',
        type: 'list',
        itemLabel: (i) => i.name,
        fields: [
          { key: 'name', label: 'ชื่อระบบ', type: 'text' },
          { key: 'desc', label: 'คำอธิบาย', type: 'text' },
          { key: 'href', label: 'ลิงก์ (URL)', type: 'url' },
        ],
      },

          {
      key: 'CONTACT_LINKS',
      label: 'ติดต่อภายใน (Contact Tools)',
      type: 'list',
      itemLabel: (i) => i.label,
      fields: [
        { key: 'label', label: 'ข้อความปุ่ม', type: 'text' },
        { key: 'href', label: 'ลิงก์ (URL หรือ tel:เบอร์โทร)', type: 'url' },
        { key: 'file', label: 'หรือแนบไฟล์ PDF', type: 'file' },
      ],
    },

      {
        key: 'ONCALL',
        label: 'ตารางเวรผู้บริหาร / พยาบาล',
        type: 'list',
        itemLabel: (i) => i.label,
        fields: [
          { key: 'label', label: 'ข้อความ', type: 'text' },
          { key: 'href', label: 'ลิงก์ (URL)', type: 'url' },
          { key: 'file', label: 'หรือแนบไฟล์ PDF', type: 'file' },
        ],
      },
      {
        key: 'NEWS',
        label: 'ข่าวประชาสัมพันธ์พยาบาล',
        type: 'list',
        itemLabel: (i) => i.title,
        fields: [
          { key: 'title', label: 'หัวข้อ', type: 'text' },
          { key: 'sub', label: 'คำอธิบายย่อ', type: 'text' },
          { key: 'href', label: 'ลิงก์ (URL) (ใช้เมื่อไม่มีรายการย่อยด้านล่าง)', type: 'url' },
          { key: 'file', label: 'หรือแนบไฟล์ PDF', type: 'file' },
          {
            key: 'subItems', label: 'รายการย่อย (ลิงก์ภายในหัวข้อนี้)', type: 'sublist',
            fields: [
              { key: 'label', label: 'ข้อความ', type: 'text' },
              { key: 'href', label: 'ลิงก์ (URL ภายนอก)', type: 'url' },
              { key: 'file', label: 'หรือแนบไฟล์ PDF', type: 'file' },
            ],
          },
        ],
      },
      {
        key: 'PROMOS',
        label: 'โปรโมชันและแพ็กเกจสุขภาพ',
        type: 'list',
        itemLabel: (i) => i.name,
        fields: [
          { key: 'name', label: 'ชื่อแพ็กเกจ', type: 'text' },
          { key: 'tag', label: 'ป้ายหมวด (เช่น หมวด A)', type: 'text' },
          { key: 'img', label: 'รูปภาพปก (jpg/png/webp)', type: 'image' },
          {
            key: 'items', label: 'รายการย่อยในแพ็กเกจ', type: 'sublist',
            fields: [
              { key: 'label', label: 'ชื่อรายการ', type: 'text' },
              { key: 'href', label: 'ลิงก์ (URL ภายนอก)', type: 'url' },
              { key: 'file', label: 'หรือแนบไฟล์ PDF', type: 'file' },
            ],
          },
        ],
      },
      {
        key: 'QUALITY',
        label: 'ศูนย์รวมระบบคุณภาพและความปลอดภัย',
        type: 'list',
        itemLabel: (i) => i.label,
        fields: [
          { key: 'label', label: 'ข้อความ', type: 'text' },
          { key: 'href', label: 'ลิงก์ (URL)', type: 'url' },
          { key: 'file', label: 'หรือแนบไฟล์ PDF', type: 'file' },
        ],
      },
      {
        key: 'PARTNERS',
        label: 'รายชื่อลูกค้าบริษัทคู่สัญญา',
        type: 'list',
        itemLabel: (i) => i.name,
        fields: [
          { key: 'name', label: 'ชื่อหมวดหมู่', type: 'text' },
          { key: 'href', label: 'ลิงก์ (URL ภายนอก) (ใช้เมื่อไม่มีรายการย่อยด้านล่าง)', type: 'url' },
          { key: 'file', label: 'หรือแนบไฟล์ PDF (ใช้เมื่อไม่มีรายการย่อยด้านล่าง)', type: 'file' },
          {
            key: 'subItems', label: 'รายชื่อบริษัท/โรงแรมในหมวดนี้', type: 'sublist',
            fields: [
              { key: 'label', label: 'ชื่อบริษัท/โรงแรม', type: 'text' },
              { key: 'expiry', label: 'วันหมดอายุสัญญา (เช่น Exp.31/12/2570)', type: 'text' },
              { key: 'payorCode', label: 'Payor Code', type: 'text' },
              { key: 'contact', label: 'ผู้ติดต่อกรณีมีปัญหา', type: 'text' },
              { key: 'detailHref', label: 'ลิงก์ "รายละเอียด" (URL)', type: 'url' },
              { key: 'detailFile', label: 'หรือแนบไฟล์ "รายละเอียด"', type: 'file' },
              { key: 'contractHref', label: 'ลิงก์ "เอกสารสัญญา" (URL)', type: 'url' },
              { key: 'contractFile', label: 'หรือแนบไฟล์ "เอกสารสัญญา"', type: 'file' },
              { key: 'attachmentHref', label: 'ลิงก์ "เอกสารแนบท้ายสัญญา" (URL)', type: 'url' },
              { key: 'attachmentFile', label: 'หรือแนบไฟล์ "เอกสารแนบท้ายสัญญา"', type: 'file' },
              { key: 'signatureHref', label: 'ลิงก์ "ลายเซ็นผู้มีอำนาจส่งตัว" (URL)', type: 'url' },
              { key: 'signatureFile', label: 'หรือแนบไฟล์ "ลายเซ็นผู้มีอำนาจส่งตัว"', type: 'file' },
            ],
          },
        ],
      },
      {
        key: 'DIGITAL_SERVICES',
        label: 'Digital Services',
        description: 'ไอคอนบริการดิจิทัลทั้งหมด บางรายการมีเมนูย่อยแบบแท็บ (groups) หรือเมนูต้นไม้ซ้อนหลายชั้น (tree)',
        type: 'list',
        itemLabel: (i) => i.label,
        fields: [
          { key: 'label', label: 'ชื่อบริการ', type: 'text' },
            {
            key: 'groups',
            label: 'เมนูย่อยแบบแท็บ (groups) — ใช้เมื่อมีหลายหมวดในป๊อปอัพเดียว เช่น HR System',
            type: 'sublist',
            fields: [
              { key: 'title', label: 'ชื่อแท็บ', type: 'text' },
              { key: 'icon', label: 'ไอคอน (ใช้เมื่อไม่มีรูปโลโก้ด้านล่าง)', type: 'icon' },
              { key: 'img', label: 'รูปโลโก้วงกลม (แนะนำ 200x200px ขึ้นไป)', type: 'image' },
              {
                key: 'items',
                label: 'รายการในแท็บนี้',
                type: 'sublist',
                fields: [
                  { key: 'label', label: 'ข้อความ', type: 'text' },
                  { key: 'icon', label: 'ไอคอน', type: 'icon' },
                  { key: 'href', label: 'ลิงก์ (URL)', type: 'url' },
                  { key: 'file', label: 'หรือแนบไฟล์ PDF', type: 'file' },
                ],
              },
            ],
          },
          {
            key: 'tree',
            label: 'เมนูต้นไม้ซ้อนหลายชั้น (tree) — ใช้เมื่อเป็นเมนูลึกหลายระดับ เช่น Drug Information',
            type: 'tree',
          },
        ],
      },

      {
        key: 'FINANCE_DOCS',
        label: 'เอกสารการมอบหมายอำนาจทางการเงิน',
        type: 'list',
        itemLabel: (i) => i.text,
        fields: [
          { key: 'text', label: 'ข้อความ', type: 'textarea' },
          { key: 'href', label: 'ลิงก์ (URL ภายนอก, ถ้ามี)', type: 'url' },
          { key: 'file', label: 'แนบไฟล์ PDF', type: 'file' },
        ],
      },
      {
        key: 'TEMPLATE_OPTIONS',
        label: 'รายการ Template PowerPoint',
        type: 'list',
        itemLabel: (i) => i.label,
        fields: [
          { key: 'label', label: 'ชื่อรายการ', type: 'text' },
          { key: 'href', label: 'ลิงก์ (URL ภายนอก, ถ้ามี)', type: 'url' },
          { key: 'file', label: 'แนบไฟล์ (pptx/pdf)', type: 'file' },
        ],
      },
    ],
  },
  {
    group: 'Division',
    items: [
      {
        key: 'DIVISIONS',
        label: 'ฝ่ายงาน (Division)',
        type: 'list',
        itemLabel: (i) => i.name,
        fields: [
          { key: 'name', label: 'ชื่อฝ่าย', type: 'text' },
          { key: 'desc', label: 'คำอธิบาย', type: 'textarea' },
          {
            key: 'subItems', label: 'ทีมย่อย / ระบบภายในฝ่าย', type: 'sublist',
            fields: [
              { key: 'label', label: 'ชื่อทีม/ระบบ', type: 'text' },
              { key: 'href', label: 'ลิงก์ (URL)', type: 'url' },
              { key: 'file', label: 'หรือแนบไฟล์ PDF', type: 'file' },
            ],
          },
        ],
      },
    ],
  },
  {
    group: 'Report',
    items: [
      {
        key: 'REPORTS',
        label: 'ระบบรายงาน (Report)',
        type: 'list',
        itemLabel: (i) => i.name,
        fields: [
          { key: 'name', label: 'ชื่อระบบ', type: 'text' },
          { key: 'href', label: 'ลิงก์ (URL)', type: 'url' },
        ],
      },
    ],
  },
  {
    group: 'ตารางแพทย์',
    items: [
      {
        key: 'DOCTOR_LINKS',
        label: 'ลิงก์ในหน้าตารางแพทย์',
        type: 'list',
        itemLabel: (i) => i.label,
        fields: [
          { key: 'label', label: 'ข้อความ', type: 'text' },
          { key: 'href', label: 'ลิงก์ (URL ภายนอก, ถ้ามี)', type: 'url' },
          { key: 'file', label: 'หรือแนบไฟล์ PDF', type: 'file' },
        ],
      },
    ],
  },
  {
    group: 'ระบบ Online',
    items: [
      {
        key: 'REQUEST_CATEGORIES',
        label: 'หมวดหมู่และรายการระบบ Online',
        type: 'list',
        itemLabel: (i) => i.label,
        fields: [
          {
            key: 'items', label: 'รายการระบบในหมวดนี้', type: 'sublist',
            fields: [
              { key: 'name', label: 'ชื่อระบบ', type: 'text' },
              { key: 'href', label: 'ลิงก์ (URL)', type: 'url' },
            ],
          },
        ],
      },
    ],
  },
  {
    group: 'ตั้งค่าเว็บไซต์',
    items: [{ key: 'SITE', label: 'ข้อมูลองค์กร', type: 'site' }],
  },
]
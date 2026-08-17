export const ADMIN_SCHEMAS = [
  {
    group: 'หน้า Home',
    items: [
      {
        key: 'ANN_NEWS',
        label: 'ข่าวประชาสัมพันธ์ (รายการทั้งหมด)',
        description:
          'รายการข่าวที่แสดงในลิสต์ด้านล่าง "ดูประกาศทั้งหมด" — ติ๊ก "ปักหมุดเป็น Banner" ที่ข่าวใดข่าวหนึ่ง เพื่อให้ข่าวนั้นแสดงเป็น Banner ใหญ่ด้านบนแทน — ถ้าข่าวมีรายชื่อย่อย/เมนูย่อย ให้ใส่ในช่อง "เมนูรายชื่อย่อย" ด้านล่าง (ระบบจะพาไปหน้าแสดงรายชื่อย่อยแทนการเปิดลิงก์ตรง)',
        type: 'list',
        itemLabel: (i) => i.title,
        fields: [
          {
            key: 'title',
            label: 'หัวข้อข่าว',
            type: 'text',
          },
          {
            key: 'sub',
            label: 'คำอธิบายย่อ',
            type: 'textarea',
          },
          {
            key: 'img',
            label: 'รูปภาพ Banner (ใช้เมื่อปักหมุดข่าวนี้)',
            type: 'image',
            uploadFolder: 'marketing',
          },
          {
            key: 'badge',
            label:
              'ป้ายข้อความมุมซ้ายบน (เช่น New) — เว้นว่างได้ถ้าไม่ต้องการ',
            type: 'text',
          },
          {
            key: 'pinned',
            label: 'ปักหมุดเป็น Banner ใหญ่ด้านบน',
            type: 'boolean',
          },
          {
            key: 'href',
            label:
              'ลิงก์ (URL ภายนอก) — ใช้เมื่อไม่มีเมนูรายชื่อย่อยด้านล่าง',
            type: 'url',
          },
          {
            key: 'file',
            label:
              'หรือแนบไฟล์ PDF — ใช้เมื่อไม่มีเมนูรายชื่อย่อยด้านล่าง',
            type: 'file',
            uploadFolder: 'marketing',
          },
          {
            key: 'tree',
            label: 'เมนูรายชื่อย่อย (ซ้อนได้หลายชั้น)',
            type: 'tree',
          },
        ],
      },

      {
        key: 'N_SYSTEMS',
        label: 'ระบบงานออนไลน์โรงพยาบาล',
        type: 'list',
        itemLabel: (i) => i.name,
        fields: [
          {
            key: 'name',
            label: 'ชื่อระบบ',
            type: 'text',
          },
          {
            key: 'desc',
            label: 'คำอธิบาย',
            type: 'text',
          },
          {
            key: 'href',
            label: 'ลิงก์ (URL)',
            type: 'url',
          },
        ],
      },

      {
        key: 'CONTACT_LINKS',
        label: 'ติดต่อภายใน (Contact Tools)',
        type: 'list',
        itemLabel: (i) => i.label,
        fields: [
          {
            key: 'label',
            label: 'ข้อความปุ่ม',
            type: 'text',
          },
          {
            key: 'href',
            label: 'ลิงก์ (URL หรือ tel:เบอร์โทร)',
            type: 'url',
          },
          {
            key: 'file',
            label: 'หรือแนบไฟล์ PDF',
            type: 'file',
            uploadFolder: 'mservice',
          },
        ],
      },

      {
        key: 'ONCALL',
        label: 'ตารางเวรผู้บริหาร / พยาบาล',
        type: 'list',
        itemLabel: (i) => i.label,
        fields: [
          {
            key: 'label',
            label: 'ข้อความ',
            type: 'text',
          },
          {
            key: 'href',
            label: 'ลิงก์ (URL)',
            type: 'url',
          },
          {
            key: 'file',
            label: 'หรือแนบไฟล์ PDF',
            type: 'file',
            uploadFolder: 'nurse',
          },
        ],
      },

      {
        key: 'NEWS',
        label: 'ข่าวประชาสัมพันธ์พยาบาล',
        type: 'list',
        itemLabel: (i) => i.title,
        fields: [
          {
            key: 'title',
            label: 'หัวข้อ',
            type: 'text',
          },
          {
            key: 'sub',
            label: 'คำอธิบายย่อ',
            type: 'text',
          },
          {
            key: 'href',
            label:
              'ลิงก์ (URL) (ใช้เมื่อไม่มีรายการย่อยด้านล่าง)',
            type: 'url',
          },
          {
            key: 'file',
            label: 'หรือแนบไฟล์ PDF',
            type: 'file',
            uploadFolder: 'nurse',
          },
          {
            key: 'subItems',
            label: 'รายการย่อย (ลิงก์ภายในหัวข้อนี้)',
            type: 'sublist',
            fields: [
              {
                key: 'label',
                label: 'ข้อความ',
                type: 'text',
              },
              {
                key: 'href',
                label: 'ลิงก์ (URL ภายนอก)',
                type: 'url',
              },
              {
                key: 'file',
                label: 'หรือแนบไฟล์ PDF',
                type: 'file',
                uploadFolder: 'nurse',
              },
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
          {
            key: 'name',
            label: 'ชื่อแพ็กเกจ',
            type: 'text',
          },
          {
            key: 'tag',
            label: 'ป้ายหมวด (เช่น หมวด A)',
            type: 'text',
          },
          {
            key: 'img',
            label: 'รูปภาพปก (jpg/png/webp)',
            type: 'image',
            uploadFolder: 'marketing',
          },
          {
            key: 'items',
            label: 'รายการย่อยในแพ็กเกจ',
            type: 'sublist',
            fields: [
              {
                key: 'label',
                label: 'ชื่อรายการ',
                type: 'text',
              },
              {
                key: 'href',
                label: 'ลิงก์ (URL ภายนอก)',
                type: 'url',
              },
              {
                key: 'file',
                label: 'หรือแนบไฟล์ PDF',
                type: 'file',
                uploadFolder: 'marketing',
              },
            ],
          },
        ],
      },

      {
        key: 'QUALITY',
        label: 'ศูนย์รวมระบบคุณภาพและความปลอดภัย',
        description:
          'ถ้าใส่ "หัวข้อบทความ" ด้านล่าง คลิกไอคอนนี้จะพาไปหน้าเนื้อหาแทนการเปิดลิงก์ตรง — ถ้าเว้นว่างไว้ จะใช้ลิงก์/ไฟล์แนบด้านบนตามปกติ',
        type: 'list',
        itemLabel: (i) => i.label,
        fields: [
          {
            key: 'label',
            label: 'ชื่อเมนู (แสดงบนไอคอน)',
            type: 'text',
          },
          {
            key: 'icon',
            label: 'ไอคอน',
            type: 'icon',
          },
          {
            key: 'warn',
            label: 'ใช้สีแดง (เตือน) แทนสีเขียวปกติ',
            type: 'boolean',
          },
          {
            key: 'href',
            label:
              'ลิงก์ (URL) — ใช้เมื่อไม่มี "หัวข้อบทความ" ด้านล่าง',
            type: 'url',
          },
          {
            key: 'file',
            label:
              'หรือแนบไฟล์ PDF — ใช้เมื่อไม่มี "หัวข้อบทความ" ด้านล่าง',
            type: 'file',
            uploadFolder: 'hr',
          },
          {
            key: 'articleTitle',
            label:
              'หัวข้อบทความ (หน้าเนื้อหา) — กรอกช่องนี้เพื่อเปิดใช้หน้าเนื้อหา',
            type: 'text',
          },
          {
            key: 'author',
            label: 'ผู้เขียน/ผู้เผยแพร่',
            type: 'text',
          },
          {
            key: 'publishedAt',
            label: 'วันที่เผยแพร่ (อัตโนมัติ)',
            type: 'readonly-datetime', // แสดงผลอย่างเดียว แก้ไม่ได้
          },
          {
            key: 'updatedAt',
            label: 'วันที่อัปเดตล่าสุด (อัตโนมัติ)',
            type: 'readonly-datetime',
          },
          {
            key: 'intro',
            label: 'คำอธิบายนำ',
            type: 'textarea',
          },
          {
            key: 'articleItems',
            label: 'รายการเอกสาร/ลิงก์ในหน้าเนื้อหา',
            type: 'sublist',
            fields: [
              {
                key: 'label',
                label: 'ข้อความ',
                type: 'text',
              },
              {
                key: 'isNew',
                label: 'ติดป้าย "ใหม่"',
                type: 'boolean',
              },
              {
                key: 'href',
                label: 'ลิงก์ (URL)',
                type: 'url',
              },
              {
                key: 'file',
                label: 'หรือแนบไฟล์ PDF',
                type: 'file',
                uploadFolder: 'hr',
              },
            ],
          },
        ],
      },

      {
        key: 'PARTNERS',
        label: 'รายชื่อลูกค้าบริษัทคู่สัญญา',
        type: 'list',
        itemLabel: (i) => i.name,
        fields: [
          {
            key: 'name',
            label: 'ชื่อหมวดหมู่',
            type: 'text',
          },
          {
            key: 'href',
            label:
              'ลิงก์ (URL ภายนอก) (ใช้เมื่อไม่มีรายการย่อยด้านล่าง)',
            type: 'url',
          },
          {
            key: 'file',
            label:
              'หรือแนบไฟล์ PDF (ใช้เมื่อไม่มีรายการย่อยด้านล่าง)',
            type: 'file',
            uploadFolder: 'hr',
          },
          {
            key: 'subItems',
            label: 'รายชื่อบริษัท/โรงแรมในหมวดนี้',
            type: 'sublist',
            fields: [
              {
                key: 'label',
                label: 'ชื่อบริษัท/โรงแรม',
                type: 'text',
              },
              {
                key: 'expiry',
                label:
                  'วันหมดอายุสัญญา (เช่น Exp.31/12/2570)',
                type: 'text',
              },
              {
                key: 'payorCode',
                label: 'Payor Code',
                type: 'text',
              },
              {
                key: 'contact',
                label: 'ผู้ติดต่อกรณีมีปัญหา',
                type: 'text',
              },
              {
                key: 'qr',
                label:
                  'รูปบาร์โค้ด/QR Code สำหรับสแกน (แสดงมุมขวาบนของการ์ด ต่อท้ายชื่อ)',
                type: 'image',
                uploadFolder: 'hr',
              },
              {
                key: 'docs',
                label:
                  'เอกสารแนบเพิ่มเติม (จำนวนไม่จำกัด — ใช้กรณีมีหลายไฟล์ เช่น รายชื่อโรงเรียนแต่ละแห่งในเครือ)',
                type: 'sublist',
                fields: [
                  {
                    key: 'label',
                    label: 'ชื่อรายการ (เช่น ชื่อโรงเรียน/สาขา)',
                    type: 'text',
                  },
                  {
                    key: 'href',
                    label: 'ลิงก์ (URL ภายนอก)',
                    type: 'url',
                  },
                  {
                    key: 'file',
                    label: 'หรือแนบไฟล์ PDF',
                    type: 'file',
                    uploadFolder: 'hr',
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        key: 'DIGITAL_SERVICES',
        label: 'Digital Services',
        description:
          'ไอคอนบริการดิจิทัลทั้งหมด บางรายการมีเมนูย่อยแบบแท็บ (groups) หรือเมนูต้นไม้ซ้อนหลายชั้น (tree) — ถ้าไม่มีเมนูย่อยเลย ให้ใส่ลิงก์/แนบไฟล์ตรงตัวได้เลย',
        type: 'list',
        itemLabel: (i) => i.label,
        fields: [
          {
            key: 'label',
            label: 'ชื่อบริการ',
            type: 'text',
          },

          {
            key: 'href',
            label:
              'ลิงก์ (URL) — ใช้เมื่อไม่มีเมนูย่อยด้านล่าง (groups/tree)',
            type: 'url',
          },
          {
            key: 'file',
            label:
              'หรือแนบไฟล์ PDF — ใช้เมื่อไม่มีเมนูย่อยด้านล่าง (groups/tree)',
            type: 'file',
            uploadFolder: 'med',
          },

          {
            key: 'groups',
            label:
              'เมนูย่อยแบบแท็บ (groups)',
            type: 'sublist',
            fields: [
              {
                key: 'title',
                label: 'ชื่อแท็บ',
                type: 'text',
              },
              {
                key: 'icon',
                label:
                  'ไอคอน (ใช้เมื่อไม่มีรูปโลโก้ด้านล่าง)',
                type: 'icon',
              },
              {
                key: 'img',
                label:
                  'รูปโลโก้วงกลม (แนะนำ 200x200px ขึ้นไป)',
                type: 'image',
                uploadFolder: 'med',
              },
              {
                key: 'href',
                label:
                  'ลิงก์ (URL) — ใช้เมื่อไม่มีรายการย่อยด้านล่าง',
                type: 'url',
              },
              {
                key: 'file',
                label:
                  'หรือแนบไฟล์ PDF — ใช้เมื่อไม่มีรายการย่อยด้านล่าง',
                type: 'file',
                uploadFolder: 'med',
              },
              {
                key: 'items',
                label: 'รายการในแท็บนี้',
                type: 'sublist',
                fields: [
                  {
                    key: 'label',
                    label: 'ข้อความ',
                    type: 'text',
                  },
                  {
                    key: 'icon',
                    label: 'ไอคอน',
                    type: 'icon',
                  },
                  {
                    key: 'href',
                    label: 'ลิงก์ (URL)',
                    type: 'url',
                  },
                  {
                    key: 'file',
                    label: 'หรือแนบไฟล์ PDF',
                    type: 'file',
                    uploadFolder: 'med',
                  },
                ],
              },
            ],
          },

          {
            key: 'tree',
            label:
              'เมนูต้นไม้ซ้อนหลายชั้น (tree)',
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
          {
            key: 'text',
            label: 'ข้อความ',
            type: 'textarea',
          },
          {
            key: 'href',
            label: 'ลิงก์ (URL ภายนอก, ถ้ามี)',
            type: 'url',
          },
          {
            key: 'file',
            label: 'แนบไฟล์ PDF',
            type: 'file',
            uploadFolder: 'finance',
          },
        ],
      },

      {
        key: 'TEMPLATE_OPTIONS',
        label: 'รายการ Template PowerPoint',
        type: 'list',
        itemLabel: (i) => i.label,
        fields: [
          {
            key: 'label',
            label: 'ชื่อรายการ',
            type: 'text',
          },
          {
            key: 'href',
            label: 'ลิงก์ (URL ภายนอก, ถ้ามี)',
            type: 'url',
          },
          {
            key: 'file',
            label: 'แนบไฟล์ (pptx/pdf)',
            type: 'file',
            uploadFolder: 'marketing',
          },
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
    { key: 'icon', label: 'ไอคอน (เว้นว่างได้ ระบบจะเดาให้อัตโนมัติ)', type: 'icon' },
    { key: 'img', label: 'รูปภาพปก (jpg/png/webp)', type: 'image' },
    {
      key: 'subItems', label: 'ทีมย่อย / ระบบภายในฝ่าย', type: 'sublist',
      fields: [
        { key: 'label', label: 'ชื่อทีม/ระบบ', type: 'text' },
        { key: 'icon', label: 'ไอคอน', type: 'icon' },
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
          {
            key: 'name',
            label: 'ชื่อระบบ',
            type: 'text',
          },
          {
            key: 'href',
            label: 'ลิงก์ (URL)',
            type: 'url',
          },
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
          {
            key: 'label',
            label: 'ข้อความ',
            type: 'text',
          },
          {
            key: 'href',
            label:
              'ลิงก์ (URL ภายนอก) — ใช้เมื่อไม่มีรายการย่อยด้านล่าง',
            type: 'url',
          },
          {
            key: 'file',
            label:
              'หรือแนบไฟล์ PDF — ใช้เมื่อไม่มีรายการย่อยด้านล่าง',
            type: 'file',
            uploadFolder: 'doctor',
          },
          {
            key: 'subItems',
            label: 'รายการย่อย (ลิงก์ภายในหัวข้อนี้)',
            type: 'sublist',
            fields: [
              {
                key: 'label',
                label: 'ข้อความ',
                type: 'text',
              },
              {
                key: 'href',
                label: 'ลิงก์ (URL ภายนอก)',
                type: 'url',
              },
              {
                key: 'file',
                label: 'หรือแนบไฟล์ PDF',
                type: 'file',
                uploadFolder: 'doctor',
              },
            ],
          },
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
            key: 'items',
            label: 'รายการระบบในหมวดนี้',
            type: 'sublist',
            fields: [
              {
                key: 'name',
                label: 'ชื่อระบบ',
                type: 'text',
              },
              {
                key: 'href',
                label: 'ลิงก์ (URL)',
                type: 'url',
              },
              {
                key: 'img',
                label:
                  'โลโก้ระบบ',
                type: 'image',
                uploadFolder: 'mservice',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    group: 'ตั้งค่าเว็บไซต์',
    items: [
      {
        key: 'SITE',
        label: 'ข้อมูลองค์กร',
        type: 'site',
      },
    ],
  },
]
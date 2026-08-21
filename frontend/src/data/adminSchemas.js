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
          'เลือก "ประเภทเนื้อหา" ก่อน เพื่อให้ฟอร์มแสดงเฉพาะช่องที่ใช้จริงสำหรับหมวดนั้นๆ',
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
            key: 'kind',
            label: 'ประเภทเนื้อหา',
            type: 'select',
            options: [
              { value: 'document', label: 'Document Management' },
              { value: 'quality_center', label: 'Quality Center' },
              { value: 'print_form', label: 'Print Form' },
              { value: 'occupational_health', label: 'Occupational Health' },
              { value: 'occurrence_online', label: 'Occurrence Online' },
              { value: 'infectious_disease', label: 'โรคติดต่อ' },
            ],
          },
          {
            key: 'warn',
            label: 'ใช้สีแดง (เตือน) แทนสีเขียวปกติ',
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
          {
            key: 'tree',
            label:
              'เมนูต้นไม้ซ้อนหลายชั้น (tree) — เช่น KEY DATA > กรอกฟอร์ม Close Chart, REPORT > Medical Record Audit ฯลฯ ซ้อนกี่ชั้นก็ได้',
            type: 'tree',
            showIf: (item) =>
              item.kind === 'document' || item.kind === 'quality_center',
          },
          {
            key: 'articleItems',
            label: 'รายการเอกสาร/ลิงก์แบบข้อความล้วน',
            type: 'sublist',
            showIf: (item) =>
              item.kind === 'occupational_health' ||
              item.kind === 'occurrence_online' ,
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
          {
            key: 'diseases',
            label:
              'การ์ดโรคติดต่อ (ใช้เมื่อเมนูนี้เป็นหมวด "โรคติดต่อ") — แต่ละการ์ดมีรูป/ป้าย/คำอธิบาย และมีหน้าความรู้+แนวทางในตัวเอง',
            type: 'sublist',
            showIf: (item) => item.kind === 'infectious_disease',
            fields: [
              {
                key: 'label',
                label: 'ชื่อโรค (เช่น โรคฝีดาษลิง)',
                type: 'text',
              },
              {
                key: 'img',
                label: 'รูปภาพประกอบการ์ด',
                type: 'image',
                uploadFolder: 'hr',
              },
              {
                key: 'badge',
                label: 'ป้ายข้อความ (เช่น เฝ้าระวัง, ระบาด) — เว้นว่างได้',
                type: 'text',
              },
              {
                key: 'intro',
                label: 'คำนำ (ข้อความเกริ่นก่อนรูปภาพในหน้ารายละเอียด) — เว้นว่างได้',
                type: 'textarea',
              },
              {
                key: 'author',
                label: 'ผู้เขียน/ผู้เผยแพร่',
                type: 'text',
              },
              {
                key: 'publishedAt',
                label: 'วันที่เผยแพร่',
                type: 'date',
              },
              {
                key: 'updatedAt',
                label: 'วันที่อัปเดตล่าสุด',
                type: 'date',
              },
              {
                key: 'banners',
                label:
                  'รูปภาพหัวเรื่อง (ใส่ได้หลายรูป แสดงเรียงกันด้านบนสุดของหน้ารายละเอียด — แต่ละรูปกำหนดลิงก์ของตัวเองได้ กดแล้วเปิดลิงก์นั้น)',
                type: 'sublist',
                fields: [
                  {
                    key: 'img',
                    label: 'รูปภาพ',
                    type: 'image',
                    uploadFolder: 'hr',
                  },
                  {
                    key: 'href',
                    label:
                      'ลิงก์เมื่อกดรูปนี้ (เว้นว่างได้ถ้าไม่ต้องการให้กดได้)',
                    type: 'url',
                  },
                  {
                    key: 'label',
                    label: 'คำอธิบายรูป (alt text) — เว้นว่างได้',
                    type: 'text',
                  },
                ],
              },
              {
                key: 'sections',
                label:
                  'หัวข้อเนื้อหา (ใส่ได้หลายหัวข้อ แต่ละหัวข้อมีรายการย่อยที่เชื่อมลิงก์ได้ — ระบบใส่เลขนำหน้าหัวข้อให้อัตโนมัติ เช่น "2. ความรู้เกี่ยวกับโรค...")',
                type: 'sublist',
                fields: [
                  {
                    key: 'title',
                    label: 'ชื่อหัวข้อ (เช่น ความรู้เกี่ยวกับโรคฝีดาษลิง)',
                    type: 'text',
                  },
                  {
                    key: 'items',
                    label: 'รายการย่อยในหัวข้อนี้',
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
                        uploadFolder: 'hr',
                      },
                      {
                        key: 'badge',
                        label: 'ป้ายข้อความ (เช่น ใหม่) — เว้นว่างได้',
                        type: 'text',
                      },
                    ],
                  },
                ],
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
                  'เอกสารแนบ (ตั้งชื่อรายการเองได้ เช่น รายละเอียด, โปรแกรมตรวจ, หนังสือสัญญา ฯลฯ จำนวนไม่จำกัด)',
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
                label: 'ลิงก์ (URL) — ใช้เมื่อไม่มีรายการย่อยด้านล่าง',
                type: 'url',
              },
              {
                key: 'img',
                label:
                  'โลโก้ระบบ',
                type: 'image',
                uploadFolder: 'mservice',
              },
              {
                key: 'subItems',
                label:
                  'รายการย่อย (เช่น Sale, Cashier, Admin, Report) — ถ้าใส่ คลิกที่ระบบนี้จะเปิดหน้ารายการย่อยแทนการเปิดลิงก์ตรง',
                type: 'sublist',
                fields: [
                  {
                    key: 'label',
                    label: 'ชื่อรายการย่อย',
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
                    uploadFolder: 'mservice',
                  },
                ],
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
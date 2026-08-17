// รายการ resource ทั้งหมดในระบบที่กำหนดสิทธิ์ได้ (ตรงกับ key ใน ADMIN_SCHEMAS ฝั่ง frontend)
// action มาตรฐาน 4 แบบ: view (ดู), create (เพิ่ม), update (แก้ไข), delete (ลบ)
export const PERMISSION_CATALOG = [
  { resource: 'ANN_NEWS', label: 'ข่าวประชาสัมพันธ์' },
  { resource: 'N_SYSTEMS', label: 'ระบบงานออนไลน์โรงพยาบาล' },
  { resource: 'CONTACT_LINKS', label: 'ติดต่อภายใน (Contact Tools)' },
  { resource: 'ONCALL', label: 'ตารางเวรผู้บริหาร / พยาบาล' },
  { resource: 'NEWS', label: 'ข่าวประชาสัมพันธ์พยาบาล' },
  { resource: 'PROMOS', label: 'โปรโมชันและแพ็กเกจสุขภาพ' },
  { resource: 'QUALITY', label: 'ศูนย์รวมระบบคุณภาพและความปลอดภัย' },
  { resource: 'PARTNERS', label: 'รายชื่อลูกค้าบริษัทคู่สัญญา' },
  { resource: 'DIGITAL_SERVICES', label: 'Digital Services' },
  { resource: 'FINANCE_DOCS', label: 'เอกสารการมอบหมายอำนาจทางการเงิน' },
  { resource: 'TEMPLATE_OPTIONS', label: 'รายการ Template PowerPoint' },
  { resource: 'DIVISIONS', label: 'ฝ่ายงาน (Division)' },
  { resource: 'REPORTS', label: 'ระบบรายงาน (Report)' },
  { resource: 'DOCTOR_LINKS', label: 'ลิงก์ในหน้าตารางแพทย์' },
  { resource: 'REQUEST_CATEGORIES', label: 'หมวดหมู่และรายการระบบ Online' },
  { resource: 'SITE', label: 'ตั้งค่าเว็บไซต์' },
  { resource: 'CUSTOM_SECTIONS', label: 'Section ที่สร้างเอง (หน้า Home)' },
  { resource: 'USERS', label: 'จัดการผู้ใช้และสิทธิ์' },
]

export const ACTIONS = ['view', 'create', 'update', 'delete']
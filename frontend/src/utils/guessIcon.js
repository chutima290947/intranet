// เดาไอคอน Tabler จากคำในชื่อรายการ (ใช้เป็น fallback เวลาไม่ได้ระบุ icon มา)
// เรียงจากคำเฉพาะเจาะจง → คำทั่วไป เพื่อให้ match แม่นก่อน

const ICON_RULES = [
  // การเงิน / งบประมาณ
  { keywords: ['เงิน', 'งบ', 'ค่าใช้จ่าย', 'ค่ารักษา', 'บัญชี', 'เบิก', 'จ่าย', 'cost', 'budget', 'finance', 'payment'], icon: 'ti-cash' },
  { keywords: ['ใบเสร็จ', 'receipt', 'invoice'], icon: 'ti-receipt' },
  { keywords: ['บัตรโดยสาร', 'ตั๋ว', 'ticket', 'airway', 'เครื่องบิน'], icon: 'ti-plane' },

  // บุคคล / HR
  { keywords: ['พนักงาน', 'บุคลากร', 'staff', 'employee', 'people'], icon: 'ti-users' },
  { keywords: ['ลา', 'วันหยุด', 'leave', 'holiday', 'time off'], icon: 'ti-calendar-off' },
  { keywords: ['สวัสดิการ', 'welfare', 'benefit'], icon: 'ti-heart-handshake' },
  { keywords: ['อบรม', 'training', 'หลักสูตร', 'course'], icon: 'ti-school' },
  { keywords: ['ผู้จัดการ', 'manager', 'หัวหน้า'], icon: 'ti-user-star' },

  // การแพทย์ / พยาบาล
  { keywords: ['แพทย์', 'หมอ', 'doctor', 'physician'], icon: 'ti-stethoscope' },
  { keywords: ['พยาบาล', 'nurse'], icon: 'ti-user-shield' },
  { keywords: ['ยา', 'drug', 'medicine', 'medication', 'pharmacy', 'เภสัช'], icon: 'ti-pill' },
  { keywords: ['วัคซีน', 'vaccine'], icon: 'ti-syringe' },
  { keywords: ['ฉุกเฉิน', 'emergency', 'อุบัติเหตุ'], icon: 'ti-ambulance' },
  { keywords: ['แพ้', 'allergy', 'adr', 'adverse'], icon: 'ti-alert-triangle' },
  { keywords: ['ห้องปฏิบัติการ', 'lab', 'ตรวจ'], icon: 'ti-flask' },

  // เอกสาร / นโยบาย
  { keywords: ['นโยบาย', 'policy', 'ระเบียบ', 'ข้อปฏิบัติ'], icon: 'ti-shield-check' },
  { keywords: ['แบบฟอร์ม', 'form', 'ใบสมัคร'], icon: 'ti-file-description' },
  { keywords: ['รายงาน', 'report', 'สรุป'], icon: 'ti-report' },
  { keywords: ['เอกสาร', 'document', 'ไฟล์', 'file'], icon: 'ti-file-text' },
  { keywords: ['คู่มือ', 'guideline', 'แนวทาง'], icon: 'ti-book' },

  // ระบบ / เทคโนโลยี
  { keywords: ['ระบบ', 'system', 'online', 'ออนไลน์'], icon: 'ti-world' },
  { keywords: ['โทรศัพท์', 'มือถือ', 'phone', 'mobile', 'hotline', 'สายด่วน'], icon: 'ti-phone' },
  { keywords: ['dashboard', 'แดชบอร์ด'], icon: 'ti-chart-bar' },
  { keywords: ['จอดรถ', 'parking', 'รถ', 'car'], icon: 'ti-car' },

  // คุณภาพ / ความปลอดภัย
  { keywords: ['คุณภาพ', 'quality'], icon: 'ti-award' },
  { keywords: ['ปลอดภัย', 'safety'], icon: 'ti-shield-check' },
  { keywords: ['เวร', 'oncall', 'on call'], icon: 'ti-user-shield' },
  { keywords: ['ตารางเวลา', 'schedule', 'ตาราง', 'ปฏิทิน', 'calendar'], icon: 'ti-calendar-event' },

  // ติดต่อ / ประกาศ
  { keywords: ['ประกาศ', 'ข่าว', 'news', 'announce'], icon: 'ti-speakerphone' },
  { keywords: ['ประกัน', 'insurance'], icon: 'ti-shield' },
  { keywords: ['บริษัท', 'company', 'คู่สัญญา', 'partner'], icon: 'ti-building' },
  { keywords: ['ส่วนลด', 'discount', 'โปรโมชัน', 'promotion'], icon: 'ti-discount-2' },

  // ฝ่ายงาน / องค์กร
  { keywords: ['ฝ่าย', 'แผนก', 'department', 'division'], icon: 'ti-building-community' },
  { keywords: ['สารสนเทศ', 'it ', 'เทคโนโลยี', 'technology'], icon: 'ti-device-desktop-analytics' },
  { keywords: ['การตลาด', 'marketing'], icon: 'ti-speakerphone' },
  { keywords: ['ทรัพยากรบุคคล', 'hr'], icon: 'ti-users' },
  { keywords: ['international', 'ต่างชาติ', 'ต่างประเทศ'], icon: 'ti-world' },
  { keywords: ['trauma', 'อุบัติเหตุ', 'คัดกรอง', 'triage'], icon: 'ti-ambulance' },
]

const DEFAULT_ICON = 'ti-file-text'

export function guessIcon(text) {
  if (!text) return DEFAULT_ICON
  const lower = text.toLowerCase()

  for (const rule of ICON_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      return rule.icon
    }
  }
  return DEFAULT_ICON
}
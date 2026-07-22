import promoDental from '../assets/promo-dental.jpg'
import promoCheckup from '../assets/promo-checkup.jpg'
import promoPed from '../assets/promo-ped.jpg'
import promoGyn from '../assets/promo-gyn.webp'
import promoMed from '../assets/promo-med.jpg'

import divisionTpp from '../assets/division-tpp.jpg'
import divisionMedical from '../assets/division-medical.jpg'
import divisionFinance from '../assets/division-finance.jpg'
import divisionIt from '../assets/division-it.jpg'

export const SECTIONS = [
  { id: 'sec-ann', label: 'ข่าวประชาสัมพันธ์', icon: 'ti-speakerphone', color: 'var(--color-coral)' },
  { id: 'sec-digital', label: 'Digital Services', icon: 'ti-device-desktop', color: 'var(--color-blue-600)' },
  { id: 'sec-nsystem', label: 'ระบบงานออนไลน์โรงพยาบาล', icon: 'ti-world', color: 'var(--color-blue-600)' },
  { id: 'sec-contact', label: 'Contact Tools', icon: 'ti-phone-call', color: 'var(--color-blue-600)' },
  { id: 'sec-doctor', label: 'ตารางแพทย์', icon: 'ti-stethoscope', color: 'var(--color-coral)' },
  { id: 'sec-oncall', label: 'ตารางเวรผู้บริหาร/พยาบาล', icon: 'ti-user-shield', color: 'var(--color-blue-600)' },
  { id: 'sec-quality', label: 'ศูนย์รวมระบบคุณภาพและความปลอดภัย', icon: 'ti-shield-check', color: 'var(--color-teal)' },
  { id: 'sec-nursing', label: 'ข่าวประชาสัมพันธ์พยาบาล', icon: 'ti-news', color: 'var(--color-coral)' },
  { id: 'sec-promo', label: 'โปรโมชันและแพ็กเกจสุขภาพ', icon: 'ti-star', color: 'var(--color-coral)' },
  { id: 'sec-partner', label: 'รายชื่อลูกค้าบริษัทคู่สัญญา', icon: 'ti-building', color: 'var(--color-blue-600)' },
  { id: 'sec-template', label: 'Template PowerPoint', icon: 'ti-presentation', color: 'var(--color-ink-soft)' },
  { id: 'sec-finance', label: 'การมอบหมายอำนาจดำเนินการทางการเงิน กลุ่ม 6', icon: 'ti-cash', color: 'var(--color-ink-soft)' },
  { id: 'sec-upload', label: 'Upload เอกสาร', icon: 'ti-upload', color: 'var(--color-ink-soft)' },
]

export const DIGITAL_SERVICES = [
  { icon: 'ti-world', label: 'Office 365', color: 'var(--color-blue-600)' },
  { icon: 'ti-users', label: 'HR System', color: 'var(--color-blue-600)' },
  { icon: 'ti-flame', label: 'Fire Marshal', color: 'var(--color-coral)' },
  { icon: 'ti-database', label: 'BDMS Intranet', color: 'var(--color-blue-600)' },
  { icon: 'ti-message-circle', label: 'BES', color: 'var(--color-blue-600)' },
  { icon: 'ti-link', label: 'Pharmacy DIS', color: 'var(--color-blue-600)' },
  { icon: 'ti-shield', label: 'BDMS Insurance', color: 'var(--color-blue-600)' },
]

export const N_SYSTEMS = [
  { icon: 'ti-droplet', name: 'N-Sterile', desc: 'ระบบจ่ายกลาง' },
  { icon: 'ti-device-laptop', name: 'N-Smart', desc: 'ระบบบริหารข้อมูล' },
  { icon: 'ti-heartbeat', name: 'N-Health', desc: 'ระบบสุขภาพพนักงานออนไลน์' },
]

export const ONCALL = [
  { icon: 'ti-user-circle', label: 'On Call Executive' },
  { icon: 'ti-heart-rate-monitor', label: 'On Call HEMO' },
  { icon: 'ti-flask', label: 'On Call Chemo' },
  { icon: 'ti-activity', label: 'On Call Coordinator' },
  { icon: 'ti-calendar-stats', label: 'On Call IV Nurse' },
  { icon: 'ti-calendar-event', label: 'ตาราง Palliative care' },
]

export const NEWS = [
  { icon: 'ti-file-text', title: 'การคีย์ E-Memo', sub: 'ระบบบันทึกความคิดเห็นอิเล็กทรอนิกส์' },
  { icon: 'ti-file-invoice', title: 'การคัด Procurement Connect', sub: 'ระบบบริหารจัดซื้อจัดจ้างออนไลน์' },
  { icon: 'ti-ambulance', title: 'อัตราค่าบริการรถพยาบาล', sub: 'ตารางอัตราบริการรถพยาบาล 2568' },
  { icon: 'ti-file-medical', title: 'Trauma Center', sub: 'แนวทางการปฏิบัติอุบัติเหตุ' }
]

export const PROMOS = [
  { name: 'Dental', tag: 'หมวด A', color: 'var(--color-navy-900)', icon: 'ti-tooth', img: promoDental },
  { name: 'Health Check Up Package', tag: 'หมวด B', color: 'var(--color-navy-900)', icon: 'ti-eye', img: promoCheckup },
  { name: 'OPD PED Package', tag: 'หมวด B', color: 'var(--color-navy-900)', icon: 'ti-heart', img: promoPed },
  { name: 'OPD GYN Package', tag: 'หมวด C', color: 'var(--color-coral)', icon: 'ti-stethoscope', img: promoGyn },
  { name: 'OPD Med Package', tag: 'หมวด D', color: 'var(--color-navy-900)', icon: 'ti-pill', img: promoMed },
]

export const QUALITY = [
  { icon: 'ti-file-text', label: 'การควบคุมเอกสาร' },
  { icon: 'ti-award', label: 'Quality Center' },
  { icon: 'ti-printer', label: 'Print Form' },
  { icon: 'ti-briefcase', label: 'Occupational Health' },
  { icon: 'ti-alert-circle', label: 'Occurrence Online', warn: true },
  { icon: 'ti-virus', label: 'โรคติดต่อ' },
]

export const PARTNERS = [
  { name: 'บัญชีรายชื่อบริษัทคู่สัญญา' },
  { name: 'รายชื่อรักษาพยาบาล' },
  { name: 'ราชื่อคลินิคพยาบาล' },
  { name: 'รายชื่อตรวจสุขภาพก่อนเข้าทำงาน' },
  { name: 'รายชื่อตรวจสุขภาพประจำปี' },
  { name: 'โปรแกรมบริหารจัดการคะแนนตัวแทนประกัน' },
  { name: 'รายชื่อบริษัทประกัน' },
  { name: 'รายชื่อตรวจสุขภาพก่อนทำประกัน' },
  { name: 'รายชื่อประกันกลุ่มโรงเรียน' },
  { name: 'Foreign Insurance companies' },
]

//Division
export const DIVISIONS = [
  {
    id: 'div-tpp',
    name: 'Third Party Payor Service',
    desc: 'ดูแลงานประสานสิทธิ์การเบิกจ่ายกับบริษัทประกันและคู่สัญญา',
    phone: 'ต่อ 1101',
    icon: 'ti-credit-card', 
    gradient: ['#0C447C', '#378ADD'],  img: divisionTpp,
    subItems: [
      { icon: 'ti-clipboard-list',   label: 'UM Portal' },
      { icon: 'ti-file-invoice',     label: 'IPS Local' },
      { icon: 'ti-plane',            label: 'IPS Inter' },
      { icon: 'ti-building-hospital',label: 'Group 6 UCEP' },
      { icon: 'ti-shield-check',     label: 'NHSO.UCEP' },
      { icon: 'ti-pill',             label: 'Drug catalogue' },
      { icon: 'ti-file-check',       label: 'PA UCEP' },
      { icon: 'ti-file-plus',        label: 'NEW PA UCEP' },
      { icon: 'ti-receipt',          label: 'E-claim' },
      { icon: 'ti-building-bank',    label: 'KTB' },
    ],
  },
  {
    id: 'div-medical',
    name: 'ฝ่ายการแพทย์',
    desc: 'ดูแลงานบริการทางการแพทย์และตารางแพทย์ผู้ตรวจ',
    phone: 'ต่อ 2000',
    icon: 'ti-stethoscope',
    gradient: ['#712B13', '#F0997B'], img: divisionMedical,
    subItems: [
      { icon: 'ti-calendar-user', label: 'Doctor Schedule' },
    ],
  },
  {
    id: 'div-finance',
    name: 'บัญชีและการเงิน',
    desc: 'ดูแลงบประมาณ การเบิกจ่าย และระบบบัญชีขององค์กร',
    phone: 'ต่อ 1300',
    icon: 'ti-report-money',
    gradient: ['#085041', '#5DCAA5'], img: divisionFinance,
    subItems: [
      { icon: 'ti-file-spreadsheet', label: 'Capex List 2026' },
      { icon: 'ti-settings', label: 'Admin My B+' },
    ],
  },
  {
    id: 'div-it',
    name: 'ฝ่ายสารสนเทศ',
    desc: 'ดูแลระบบไอทีและให้บริการช่วยเหลือด้านเทคนิคแก่บุคลากร',
    phone: 'ต่อ 1400',
    icon: 'ti-device-desktop-analytics',
    gradient: ['#0C447C', '#378ADD'], img: divisionIt,
    subItems: [
      { icon: 'ti-headset', label: 'IT Oncall' },
      { icon: 'ti-lock-open', label: 'Reset & Unlock SAP' },
    ],
  },
]
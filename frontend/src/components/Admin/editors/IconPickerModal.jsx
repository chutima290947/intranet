import { useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { getFileUrl } from './FieldInputs'
import { UPLOAD_FOLDERS } from '../../../config/uploadFolders'

// ขนาดสูงสุดของรูปภาพ (ต้องตรงกับ IMAGE_MAX_SIZE ฝั่ง Backend)
const IMAGE_MAX_MB = 25
const IMAGE_MAX_SIZE = IMAGE_MAX_MB * 1024 * 1024

// รายการไอคอน Tabler ยอดนิยม จัดหมวดหมู่ พร้อมคีย์เวิร์ดภาษาไทย/อังกฤษสำหรับค้นหา
export const TABLER_ICON_CATEGORIES = [
  {
    name: 'ประกันและความปลอดภัย',
    icons: [
      { id: 'ti-shield', label: 'โล่ / ประกัน', tags: ['shield', 'insurance', 'ประกัน'] },
      { id: 'ti-shield-check', label: 'ประกันผ่าน / ปลอดภัย', tags: ['check', 'safety', 'อนุมัติ', 'สิทธิ์'] },
      { id: 'ti-shield-lock', label: 'ระบบความปลอดภัย', tags: ['lock', 'security'] },
      { id: 'ti-shield-heart', label: 'ประกันสุขภาพ', tags: ['health', 'heart', 'สุขภาพ'] },
      { id: 'ti-shield-half', label: 'ความคุ้มครอง', tags: ['coverage'] },
      { id: 'ti-shield-star', label: 'ประกันพรีเมียม', tags: ['star', 'vip'] },
      { id: 'ti-award', label: 'รางวัล / มาตรฐาน', tags: ['award', 'quality', 'คะแนน'] },
      { id: 'ti-certificate', label: 'ใบรับรอง / เซอร์ติฟิเคต', tags: ['certificate', 'license'] },
      { id: 'ti-license', label: 'ใบอนุญาต / บัตร', tags: ['card', 'license'] },
      { id: 'ti-heart-handshake', label: 'คู่สัญญา / พันธมิตร', tags: ['handshake', 'partner', 'สวัสดิการ'] },
      { id: 'ti-lock-check', label: 'ยืนยันความปลอดภัย', tags: ['verify', 'auth'] },
      { id: 'ti-key', label: 'กุญแจ / รหัสผ่าน', tags: ['key', 'access'] },
    ],
  },
  {
    name: 'การเงิน ค่ารักษา และบัตร',
    icons: [
      { id: 'ti-cash', label: 'เงินสด / ค่ารักษา', tags: ['money', 'cash', 'เบิกจ่าย'] },
      { id: 'ti-credit-card', label: 'บัตรเครดิต / บัตรประกัน', tags: ['card', 'pay', 'ชำระ'] },
      { id: 'ti-receipt', label: 'ใบเสร็จ / ใบเคลม', tags: ['receipt', 'claim', 'บิล'] },
      { id: 'ti-file-invoice', label: 'ใบแจ้งหนี้ / เคลม', tags: ['invoice', 'billing'] },
      { id: 'ti-wallet', label: 'กระเป๋าเงิน / บัญชี', tags: ['wallet', 'budget'] },
      { id: 'ti-coin', label: 'เหรียญ / ค่าธรรมเนียม', tags: ['coin', 'fee'] },
      { id: 'ti-coins', label: 'งบประมาณ', tags: ['coins', 'budget'] },
      { id: 'ti-building-bank', label: 'ธนาคาร / การเงิน', tags: ['bank', 'ktb'] },
      { id: 'ti-percentage', label: 'ส่วนลด / เปอร์เซ็นต์', tags: ['percent', 'discount'] },
      { id: 'ti-discount-2', label: 'โปรโมชันส่วนลด', tags: ['promo', 'special'] },
      { id: 'ti-calculator', label: 'คำนวณสิทธิ์', tags: ['calc', 'estimate'] },
      { id: 'ti-businessplan', label: 'แผนความคุ้มครอง', tags: ['plan', 'policy'] },
    ],
  },
  {
    name: 'การแพทย์และสุขภาพ',
    icons: [
      { id: 'ti-heartbeat', label: 'ตรวจสุขภาพ / ชีพจร', tags: ['checkup', 'heart', 'ecg'] },
      { id: 'ti-stethoscope', label: 'แพทย์ / ตรวจรักษา', tags: ['doctor', 'clinic'] },
      { id: 'ti-pill', label: 'ยา / เภสัชกรรม', tags: ['drug', 'medicine', 'pharmacy'] },
      { id: 'ti-first-aid-kit', label: 'ปฐมพยาบาล', tags: ['emergency', 'kit'] },
      { id: 'ti-cross', label: 'โรงพยาบาล / กาชาด', tags: ['hospital', 'red cross'] },
      { id: 'ti-heart', label: 'หัวใจ / การดูแล', tags: ['care', 'wellness'] },
      { id: 'ti-flask', label: 'ห้องแล็บ / ตรวจวิเคราะห์', tags: ['lab', 'test'] },
      { id: 'ti-syringe', label: 'วัคซีน / ฉีดยา', tags: ['vaccine', 'injection'] },
      { id: 'ti-report-medical', label: 'ผลตรวจแพทย์', tags: ['medical record', 'report'] },
      { id: 'ti-ambulance', label: 'รถพยาบาล / ฉุกเฉิน', tags: ['er', 'emergency'] },
      { id: 'ti-nurse', label: 'พยาบาล', tags: ['nurse', 'care'] },
      { id: 'ti-virus', label: 'โรคติดต่อ / ไวรัส', tags: ['virus', 'infection'] },
      { id: 'ti-dna', label: 'พันธุกรรม / สุขภาพ', tags: ['dna', 'genetics'] },
      { id: 'ti-droplet', label: 'โลหิต / สารน้ำ', tags: ['blood', 'iv'] },
    ],
  },
  {
    name: 'เอกสาร รายงาน และแบบฟอร์ม',
    icons: [
      { id: 'ti-file-text', label: 'เอกสารทั่วไป', tags: ['doc', 'file', 'text'] },
      { id: 'ti-file-check', label: 'เอกสารอนุมัติ / เช็คสิทธิ์', tags: ['check', 'approved', 'สิทธิ์'] },
      { id: 'ti-files', label: 'ชุดเอกสาร', tags: ['documents', 'files'] },
      { id: 'ti-file-description', label: 'แบบฟอร์ม / รายละเอียด', tags: ['form', 'description'] },
      { id: 'ti-clipboard-check', label: 'เช็กลิสต์ / อนุมัติสิทธิ์', tags: ['approval', 'audit', 'ตรวจ'] },
      { id: 'ti-clipboard-list', label: 'รายการเช็คสิทธิ์ (UM)', tags: ['um portal', 'list'] },
      { id: 'ti-checklist', label: 'รายการตรวจสอบ', tags: ['task', 'todo'] },
      { id: 'ti-book', label: 'คู่มือปฏิบัติงาน', tags: ['guide', 'manual', 'book'] },
      { id: 'ti-notebook', label: 'สมุดบันทึก', tags: ['note', 'record'] },
      { id: 'ti-folder', label: 'โฟลเดอร์', tags: ['folder', 'category'] },
      { id: 'ti-printer', label: 'พิมพ์เอกสาร', tags: ['print', 'ใบเสร็จ'] },
      { id: 'ti-scan', label: 'สแกนบัตร / เอกสาร', tags: ['scan', 'barcode'] },
    ],
  },
  {
    name: 'องค์กร บริษัท และคู่สัญญา',
    icons: [
      { id: 'ti-building', label: 'บริษัท / องค์กร', tags: ['company', 'corporate'] },
      { id: 'ti-building-hospital', label: 'โรงพยาบาล', tags: ['hospital', 'center'] },
      { id: 'ti-building-community', label: 'ฝ่ายงาน / แผนก', tags: ['department', 'division'] },
      { id: 'ti-briefcase', label: 'ธุรกิจ / งาน', tags: ['business', 'work'] },
      { id: 'ti-users', label: 'พนักงาน / ผู้เอาประกัน', tags: ['staff', 'employee', 'group'] },
      { id: 'ti-user-check', label: 'ยืนยันตัวตนผู้รับบริการ', tags: ['verify', 'patient'] },
      { id: 'ti-user-shield', label: 'ผู้ดูแลสิทธิ์ / เวร', tags: ['admin', 'officer'] },
      { id: 'ti-user-star', label: 'ตัวแทน / VIP', tags: ['agent', 'leader'] },
      { id: 'ti-school', label: 'โรงเรียน / นักเรียน', tags: ['school', 'student'] },
      { id: 'ti-trademark', label: 'แบรนด์ / บริษัท', tags: ['brand', 'tm'] },
      { id: 'ti-world', label: 'ต่างประเทศ / Inter', tags: ['international', 'foreign', 'global'] },
      { id: 'ti-plane', label: 'เดินทาง / ต่างชาติ', tags: ['travel', 'abroad'] },
    ],
  },
  {
    name: 'ระบบ ไอที และออนไลน์',
    icons: [
      { id: 'ti-device-desktop', label: 'ระบบคอมพิวเตอร์', tags: ['pc', 'system'] },
      { id: 'ti-device-laptop', label: 'พอร์ทัลออนไลน์', tags: ['portal', 'web'] },
      { id: 'ti-device-mobile', label: 'แอปมือถือ / เช็คสิทธิ์', tags: ['mobile', 'app'] },
      { id: 'ti-database', label: 'ฐานข้อมูลสิทธิ์', tags: ['data', 'edi'] },
      { id: 'ti-browser', label: 'เว็บเช็คสิทธิ์ (Web Claim)', tags: ['browser', 'portal'] },
      { id: 'ti-apps', label: 'ระบบแอปพลิเคชัน', tags: ['apps', 'service'] },
      { id: 'ti-cloud', label: 'ระบบคลาวด์', tags: ['cloud', 'online'] },
      { id: 'ti-link', label: 'ลิงก์ภายนอก', tags: ['link', 'url'] },
      { id: 'ti-external-link', label: 'เปิดระบบภายนอก', tags: ['external', 'open'] },
      { id: 'ti-qr', label: 'QR Code สแกนสิทธิ์', tags: ['qr', 'code'] },
      { id: 'ti-network', label: 'เครือข่ายอินทราเน็ต', tags: ['network', 'lan'] },
      { id: 'ti-login', label: 'เข้าสู่ระบบเคลม', tags: ['login', 'signin'] },
    ],
  },
  {
    name: 'สัญลักษณ์และการติดต่อ',
    icons: [
      { id: 'ti-star', label: 'รายการแนะนำ / ดาว', tags: ['star', 'favorite'] },
      { id: 'ti-check', label: 'ถูกต้อง / ผ่าน', tags: ['check', 'done'] },
      { id: 'ti-alert-circle', label: 'ข้อควรระวัง / แจ้งเตือน', tags: ['warning', 'alert'] },
      { id: 'ti-info-circle', label: 'ข้อมูลเพิ่มเติม', tags: ['info', 'help'] },
      { id: 'ti-help-circle', label: 'คำถาม / ช่วยเหลือ', tags: ['question', 'support'] },
      { id: 'ti-calendar', label: 'วันหมดอายุ / ปฏิทิน', tags: ['calendar', 'date'] },
      { id: 'ti-calendar-event', label: 'นัดหมายตรวจ', tags: ['event', 'appointment'] },
      { id: 'ti-clock', label: 'เวลาทำการ', tags: ['time', 'hours'] },
      { id: 'ti-phone', label: 'เบอร์ติดต่อประกัน', tags: ['call', 'contact'] },
      { id: 'ti-phone-call', label: 'สายด่วน Call Center', tags: ['hotline', 'support'] },
      { id: 'ti-mail', label: 'อีเมลประสานงาน', tags: ['email', 'letter'] },
      { id: 'ti-map-pin', label: 'สถานที่ / สาขา', tags: ['location', 'branch'] },
    ],
  },
]

// อัปโหลดไฟล์รูปภาพไปยัง Backend
async function uploadImageFile(file, folder = 'med') {
  const formData = new FormData()
  formData.append('folder', folder)
  formData.append('file', file)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
  const response = await fetch(`${API_URL}/api/uploads`, {
    method: 'POST',
    body: formData,
  })

  let data = {}
  try {
    data = await response.json()
  } catch {
    data = {}
  }

  if (!response.ok) {
    throw new Error(data.error || 'อัปโหลดรูปภาพไม่สำเร็จ')
  }

  return data
}

/**
 * IconPickerModal
 * หน้าต่างสำหรับ:
 * 1. เลือกรูปภาพมาใช้เป็นไอคอนแทน (อัปโหลดรูปโลโก้บริษัทประกัน เช่น AIA, FWD, เมืองไทย ฯลฯ)
 * 2. หากไม่มีรูป หรือต้องการใช้ไอคอน ให้มีแผงเลือกรูปไอคอนต่างๆ คลิกเลือกแทนการพิมพ์
 */
export function IconPickerModal({
  open,
  onClose,
  currentIcon = '',
  currentImg = '',
  onSelectIcon,
  onSelectImg,
  title = 'เลือกไอคอน หรือ ใส่รูปภาพแทนไอคอน',
}) {
  const [tab, setTab] = useState(currentImg ? 'image' : 'icon')
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // สถานะสำหรับอัปโหลดรูปภาพ
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [selectedFolder, setSelectedFolder] = useState('med')
  const [urlInput, setUrlInput] = useState('')

  // กรองไอคอนตามคำค้นและหมวดหมู่
  const filteredIcons = useMemo(() => {
    const q = search.trim().toLowerCase()
    const all = []

    TABLER_ICON_CATEGORIES.forEach((cat) => {
      if (selectedCategory !== 'all' && cat.name !== selectedCategory) return
      cat.icons.forEach((ico) => {
        if (!q) {
          all.push({ ...ico, category: cat.name })
          return
        }
        const matchId = ico.id.toLowerCase().includes(q)
        const matchLabel = ico.label.toLowerCase().includes(q)
        const matchTags = ico.tags.some((t) => t.toLowerCase().includes(q))
        if (matchId || matchLabel || matchTags) {
          all.push({ ...ico, category: cat.name })
        }
      })
    })

    return all
  }, [search, selectedCategory])

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setUploadError('กรุณาเลือกไฟล์รูปภาพ (JPG, PNG, WEBP, SVG)')
      return
    }

    if (file.size > IMAGE_MAX_SIZE) {
      setUploadError(`ไฟล์รูปภาพใหญ่เกินไป (จำกัดไม่เกิน ${IMAGE_MAX_MB}MB)`)
      return
    }

    try {
      setUploadError('')
      setUploading(true)
      const res = await uploadImageFile(file, selectedFolder)
      onSelectImg?.(res.url)
      // เมื่อใส่รูปแล้ว แจ้งผู้ใช้และปิดได้
    } catch (err) {
      setUploadError(err.message || 'อัปโหลดรูปภาพไม่สำเร็จ')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    onSelectImg?.('')
    setTab('icon')
  }

  const handlePickIcon = (iconId) => {
    onSelectIcon?.(iconId)
    // หากก่อนหน้านี้มีรูปอยู่ เมื่อเลือกไอคอน ให้เคลียร์รูปออกเพื่อให้ไอคอนแสดงผล
    if (currentImg) {
      onSelectImg?.('')
    }
    onClose()
  }

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-navy-950/50 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="flex max-h-[88vh] w-full max-w-[620px] flex-col rounded-2xl bg-white shadow-[0_20px_50px_rgba(11,40,80,.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <i className="ti ti-icons text-xl" />
            </span>
            <div>
              <h3 className="text-[15px] font-bold text-navy-900">{title}</h3>
              <p className="text-[11.5px] text-ink-soft">
                ใส่รูปภาพเป็นไอคอน (เช่น โลโก้บริษัทประกัน) หรือเลือกคลิกไอคอนจากแผงด้านล่าง
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-paper hover:text-navy-900"
          >
            <i className="ti ti-x text-lg" />
          </button>
        </div>

        {/* Tabs: เลือกไอคอน หรือ ใส่รูปภาพแทนไอคอน */}
        <div className="flex border-b border-line bg-bg-soft/50 px-5 pt-2">
          <button
            type="button"
            onClick={() => setTab('image')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-[12.5px] font-semibold transition-colors ${
              tab === 'image'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg'
                : 'border-transparent text-ink-soft hover:text-navy-900'
            }`}
          >
            <i className="ti ti-photo text-base" />
            <span>ใส่รูปภาพแทนไอคอน</span>
            {currentImg && (
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                มีรูปอยู่แล้ว
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setTab('icon')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-[12.5px] font-semibold transition-colors ${
              tab === 'icon'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg'
                : 'border-transparent text-ink-soft hover:text-navy-900'
            }`}
          >
            <i className="ti ti-grid-dots text-base" />
            <span>แผงเลือกไอคอน (คลิกเลือก)</span>
            {!currentImg && currentIcon && (
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600">
                {currentIcon}
              </span>
            )}
          </button>
        </div>

        {/* เนื้อหาแท็บ */}
        <div className="flex-1 overflow-y-auto p-5">
          {tab === 'image' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                <div className="flex items-start gap-3">
                  <i className="ti ti-info-circle text-lg text-blue-600" />
                  <div className="text-[12px] leading-relaxed text-navy-900">
                    <p className="font-semibold">การใช้รูปภาพเป็นไอคอนแทน:</p>
                    <p className="mt-0.5 text-ink-soft">
                      ระบบจะแสดงรูปภาพนี้เป็นไอคอน (เช่น โลโก้บริษัท AIA, FWD, เมืองไทย ฯลฯ) ในขนาดที่พอดีกับการ์ด
                      หากไม่มีรูปหรือลบรูปออก ระบบจะนำไอคอนสัญลักษณ์จากแท็บ "แผงเลือกไอคอน" มาแสดงแทนอัตโนมัติ
                    </p>
                  </div>
                </div>
              </div>

              {currentImg ? (
                <div className="rounded-xl border border-line bg-paper/30 p-4 text-center">
                  <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                    รูปภาพไอคอนปัจจุบัน
                  </div>
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl border border-line bg-white p-2 shadow-sm">
                    <img
                      src={getFileUrl(currentImg)}
                      alt="รูปไอคอน"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="flex items-center gap-1.5 rounded-lg border border-coral/30 bg-coral/10 px-3 py-1.5 text-[11.5px] font-semibold text-coral hover:bg-coral/20"
                    >
                      <i className="ti ti-trash text-sm" />
                      ลบรูปนี้ (กลับไปใช้ไอคอน)
                    </button>
                    <label className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-blue-600 bg-blue-600 px-3 py-1.5 text-[11.5px] font-semibold text-white hover:bg-blue-700">
                      <i className="ti ti-upload text-sm" />
                      เปลี่ยนรูปใหม่
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-bold text-navy-900">
                      โฟลเดอร์สำหรับเก็บรูป
                    </label>
                    <select
                      value={selectedFolder}
                      onChange={(e) => setSelectedFolder(e.target.value)}
                      className="w-full rounded-lg border border-line bg-white px-3 py-2 text-[12.5px] outline-none focus:border-blue-500"
                    >
                      {UPLOAD_FOLDERS.map((f) => (
                        <option key={f.value} value={f.value}>
                          {f.label} — {f.desc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <label
                    className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/20 p-8 text-center transition-all ${
                      uploading
                        ? 'cursor-wait opacity-60'
                        : 'cursor-pointer hover:border-blue-400 hover:bg-blue-50/40'
                    }`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-sm">
                      <i className="ti ti-cloud-upload text-2xl" />
                    </span>
                    <span className="mt-3 text-[13px] font-bold text-navy-900">
                      {uploading ? 'กำลังอัปโหลดรูปภาพ...' : 'คลิกเพื่อเลือกไฟล์รูปภาพไอคอน / โลโก้'}
                    </span>
                    <span className="mt-1 text-[11.5px] text-ink-soft">
                      รองรับไฟล์ JPG, PNG, WEBP, SVG ขนาดไม่เกิน {IMAGE_MAX_MB}MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="หรือวาง URL รูปภาพ เช่น /uploads/... หรือ https://..."
                      className="flex-1 rounded-lg border border-line bg-white px-3 py-2 text-[12px] outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (urlInput.trim()) {
                          onSelectImg?.(urlInput.trim())
                          setUrlInput('')
                        }
                      }}
                      disabled={!urlInput.trim()}
                      className="rounded-lg bg-blue-600 px-3.5 py-2 text-[12px] font-semibold text-white transition-colors disabled:opacity-40 hover:bg-blue-700"
                    >
                      ใช้ URL นี้
                    </button>
                  </div>
                </div>
              )}

              {uploadError && (
                <div className="rounded-lg bg-coral-tint p-2.5 text-[12px] font-semibold text-coral">
                  {uploadError}
                </div>
              )}
            </div>
          )}

          {tab === 'icon' && (
            <div className="space-y-4">
              {/* ช่องค้นหา และตัวกรองหมวดหมู่ */}
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <div className="relative flex-1">
                  <i className="ti ti-search absolute left-3 top-2.5 text-base text-ink-soft" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="ค้นหาไอคอน เช่น ประกัน, shield, check, card, doc..."
                    className="w-full rounded-xl border border-line bg-paper/40 py-2 pl-9 pr-3 text-[12.5px] outline-none focus:border-blue-500 focus:bg-white"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch('')}
                      className="absolute right-2.5 top-2.5 text-ink-soft hover:text-navy-900"
                    >
                      <i className="ti ti-x text-sm" />
                    </button>
                  )}
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-xl border border-line bg-white px-3 py-2 text-[12px] font-medium outline-none focus:border-blue-500"
                >
                  <option value="all">ทุกหมวดหมู่ ({TABLER_ICON_CATEGORIES.length})</option>
                  {TABLER_ICON_CATEGORIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ข้อความแจ้งสถานะและไอคอนปัจจุบัน */}
              <div className="flex items-center justify-between text-[11.5px] text-ink-soft">
                <span>พบไอคอนที่เลือกได้ {filteredIcons.length} รายการ</span>
                {currentIcon && (
                  <span className="flex items-center gap-1 font-semibold text-navy-900">
                    ไอคอนปัจจุบัน:
                    <i className={`ti ${currentIcon} text-base text-blue-600`} />
                    <span className="font-mono text-blue-600">{currentIcon}</span>
                  </span>
                )}
              </div>

              {/* แผง Grid รูปไอคอนต่างๆ สำหรับคลิกเลือก */}
              <div className="grid max-h-[360px] grid-cols-4 gap-2 overflow-y-auto pr-1 sm:grid-cols-6">
                {filteredIcons.map((ico) => {
                  const isSelected = currentIcon === ico.id
                  return (
                    <button
                      key={ico.id}
                      type="button"
                      onClick={() => handlePickIcon(ico.id)}
                      className={`group flex flex-col items-center justify-center rounded-xl border p-2.5 text-center transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 shadow-sm'
                          : 'border-line/70 bg-white hover:-translate-y-0.5 hover:border-blue-300 hover:bg-paper/70'
                      }`}
                      title={`${ico.label} (${ico.id})`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-paper text-navy-900 group-hover:bg-blue-100 group-hover:text-blue-700'
                        }`}
                      >
                        <i className={`ti ${ico.id} text-2xl`} />
                      </div>
                      <span className="mt-1.5 line-clamp-1 w-full text-[10.5px] font-medium leading-tight text-ink group-hover:text-blue-700">
                        {ico.label}
                      </span>
                      <span className="line-clamp-1 text-[9px] text-ink-soft/70">
                        {ico.id.replace('ti-', '')}
                      </span>
                    </button>
                  )
                })}
              </div>

              {filteredIcons.length === 0 && (
                <div className="py-10 text-center text-[12.5px] text-ink-soft">
                  ไม่พบไอคอนที่ค้นหา ลองเปลี่ยนคำค้นหาดูครับ
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-line bg-bg-soft/40 px-5 py-3 rounded-b-2xl">
          <div className="text-[11.5px] text-ink-soft">
            {tab === 'image'
              ? currentImg
                ? 'ระบบกำลังใช้รูปภาพนี้เป็นไอคอน'
                : 'ยังไม่ได้ใส่รูปภาพ (ระบบจะใช้ไอคอนแทน)'
              : 'คลิกไอคอนที่ต้องการเพื่อนำไปใช้ทันที'}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-line bg-white px-4 py-1.5 text-[12px] font-semibold text-navy-900 hover:bg-paper"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

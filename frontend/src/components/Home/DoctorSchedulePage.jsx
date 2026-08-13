import { useContent } from '../../context/ContentContext'
import { guessIcon } from '../../utils/guessIcon'

// แปลง URL ของไฟล์ที่อัปโหลดให้เปิดจาก Frontend ได้ (relative path จาก backend -> absolute)
// รูปแบบเดียวกับ getFileUrl ใน CollectionEditor.jsx / Announcement.jsx / OnCall.jsx
function getFileUrl(url) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url

  const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001`
  return `${API_URL}${url}`
}

// item อาจมี "href" (ลิงก์ภายนอก) หรือ "file" (ไฟล์ที่อัปโหลด เช่น pdf/jpg) อย่างใดอย่างหนึ่ง
// ตาม schema ใน ADMIN_SCHEMAS (DOCTOR_LINKS) — href มาก่อนถ้ามีทั้งคู่
function resolveLink(item) {
  if (item?.href) return item.href
  if (item?.file?.url) return getFileUrl(item.file.url)
  return null
}

export function DoctorSchedulePage({ onBack }) {
  const { content } = useContent()
  const DOCTOR_LINKS = content.DOCTOR_LINKS

  return (
    <div className="mx-auto max-w-[1680px] px-8 pb-[60px] pt-[22px]">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 rounded-lg border-none bg-transparent text-[13px] font-medium text-blue-600"
      >
        <i className="ti ti-arrow-left text-base" />กลับหน้าหลัก
      </button>

      <div className="mb-5">
        <h2 className="font-display text-2xl font-semibold text-ink">ตารางแพทย์</h2>
        <p className="mt-1 text-sm text-ink-soft">เลือกหัวข้อเพื่อดูตารางหรือเอกสารที่เกี่ยวข้อง</p>
      </div>

      <div className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
        {DOCTOR_LINKS.map((item) => {
          const link = resolveLink(item)
          const cardClasses =
            'flex items-center gap-3 rounded-lg border border-line bg-white px-4 py-3.5 no-underline transition-colors hover:border-blue-500/40 hover:bg-blue-tint'

          const cardContent = (
            <>
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-tint">
                <i className={`ti ${item.icon || guessIcon(item.label)} text-base text-blue-600`} />
              </div>
              <span className="flex-1 text-[13px] leading-tight text-ink">{item.label}</span>
              <i className="ti ti-chevron-right flex-shrink-0 text-sm text-ink-soft/60" />
            </>
          )

          // มี href หรือ file (pdf/jpg/...) -> เปิดแท็บใหม่ ไม่มีเลย -> แสดงเป็นการ์ดปกติ กดไม่ได้
          return link ? (
            <a key={item.label} href={link} target="_blank" rel="noopener noreferrer" className={cardClasses}>
              {cardContent}
            </a>
          ) : (
            <div key={item.label} className={cardClasses + ' cursor-default opacity-70 hover:border-line hover:bg-white'}>
              {cardContent}
            </div>
          )
        })}
      </div>
    </div>
  )
}
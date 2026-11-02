import { useContent } from '../../context/ContentContext'
import { guessIcon } from '../../utils/guessIcon'

function getFileUrl(url) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url

  const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001`
  return `${API_URL}${url}`
}

function resolveLink(item) {
  if (item?.href) return item.href
  if (item?.file?.url) return getFileUrl(item.file.url)
  return null
}

export function QualityCenter({ onOpenQuality }) {
  const { content } = useContent()
  const QUALITY = content.QUALITY

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white" id="sec-quality" data-card>
      <div className="flex items-center gap-2 border-b border-line px-[18px] py-[13px]">
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-teal-tint">
          <i className="ti ti-shield-check text-teal" />
        </div>
        <h3 className="text-[13px] font-bold text-navy-900">ศูนย์รวมระบบคุณภาพและความปลอดภัย</h3>
      </div>
      <div className="px-[18px] py-4">
        <div className="grid grid-cols-3 gap-[9px] max-[560px]:grid-cols-2">
          {QUALITY.map(q => {
            // มีหัวข้อบทความ หรือมีการ์ดโรคติดต่อ (diseases) -> ทั้งคู่ต้องพาไปหน้าเนื้อหาภายในเว็บ (QualityDetailPage)
            // ไม่ใช่แค่เช็ค articleTitle อย่างเดียว เพราะหมวด "โรคติดต่อ" อาจไม่มีการกรอกหัวข้อบทความไว้เลย
            const hasDiseases = Array.isArray(q.diseases) && q.diseases.length > 0
            const hasTree = Array.isArray(q.tree) && q.tree.length > 0
            const hasArticleItems = Array.isArray(q.articleItems) && q.articleItems.length > 0
            const hasBanners = Array.isArray(q.banners) && q.banners.length > 0
            const hasArticle =
              Boolean(q.articleTitle) ||
              Boolean(q.intro) ||
              hasDiseases ||
              hasTree ||
              hasArticleItems ||
              hasBanners ||
              Boolean(q.img && !q.href && !q.file)
            const link = resolveLink(q)
            const iconImg = q.iconImg || q.img ? getFileUrl(q.iconImg || q.img) : null
            const cellClasses =
              'flex flex-col items-center gap-2 rounded-md border border-line bg-white px-2 py-4 text-center transition-colors hover:border-blue-500/40'
            const cellContent = (
              <>
                {/* ขนาด 56px (ปรับที่ h-[56px] w-[56px]) — ไอคอน: มีกรอบพื้นหลังสี / รูปภาพ: ไม่มีกรอบพื้นหลัง แสดงรูปเต็ม */}
                {iconImg ? (
                  <div className="flex h-[56px] w-[56px] items-center justify-center">
                    <img src={iconImg} alt="" className="h-full w-full object-contain" />
                  </div>
                ) : (
                  <div className={`flex h-[56px] w-[56px] items-center justify-center rounded-xl ${q.warn ? 'bg-coral-tint' : 'bg-teal-tint'}`}>
                    <i className={`ti ${q.icon || guessIcon(q.label)} text-[26px] ${q.warn ? 'text-coral' : 'text-teal'}`} />
                  </div>
                )}
                <span className="text-[10px] leading-[1.3] font-semibold">{q.label}</span>
              </>
            )

            // มีหัวข้อบทความ หรือมี diseases -> ไปหน้าเนื้อหาภายในเว็บ
            // ใช้ cellClasses เดียวกับการ์ดอื่นทุกอัน (มีกรอบ+พื้นขาว) ต่างกันแค่ tag เป็น <button> เพราะไม่มี href
            if (hasArticle) {
              return (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => onOpenQuality?.(q)}
                  className={cellClasses}
                >
                  {cellContent}
                </button>
              )
            }

            // มีลิงก์ (href หรือไฟล์แนบ) -> คลิกได้ เปิดแท็บใหม่
            // ไม่มี -> แสดงเฉยๆ ไม่ทำเป็นลิงก์
            return link ? (
              <a
                key={q.label}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cellClasses} no-underline`}
              >
                {cellContent}
              </a>
            ) : (
              <div className={cellClasses} key={q.label}>
                {cellContent}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
import { useState, useEffect } from 'react'

// แปลง URL ของไฟล์ที่อัปโหลดให้เปิดจาก Frontend ได้ (relative path จาก backend -> absolute)
// รูปแบบเดียวกับ getFileUrl ใน Announcement.jsx / CollectionEditor.jsx / OnCall.jsx
function getFileUrl(url) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url

  const API_URL =
  import.meta.env.VITE_API_URL ||
  `http://${window.location.hostname}:3001`;
  return `${API_URL}${url}`
}

// แต่ละโหนดปลายทางอาจมี "href" (ลิงก์ภายนอก) หรือ "file" (ไฟล์ที่อัปโหลด เช่น jpg/pdf) อย่างใดอย่างหนึ่ง
// href มาก่อนถ้ามีทั้งคู่ — เหมือน resolveLink ใน Announcement.jsx
function resolveLink(item) {
  if (item?.href) return item.href
  if (item?.file?.url) return getFileUrl(item.file.url)
  return null
}

export function AnnouncementTreePage({ news, onBack }) {
  const [stack, setStack] = useState([])

  useEffect(() => {
    setStack([])
  }, [news])

  if (!news) return null

  const rootItems = news.tree || []
  const currentItems = stack.length === 0 ? rootItems : stack[stack.length - 1].items

  const enter = (node) => {
    if (node.children && node.children.length > 0) {
      setStack([...stack, { label: node.label, items: node.children }])
    }
  }
  const goBack = () => setStack(stack.slice(0, -1))
  const goToCrumb = (index) => setStack(index < 0 ? [] : stack.slice(0, index + 1))

  return (
    <div className="mx-auto max-w-[900px] px-8 pb-[60px] pt-[22px]">
      <button
        onClick={stack.length === 0 ? onBack : goBack}
        className="mb-4 flex items-center gap-1.5 rounded-lg border-none bg-transparent text-[13px] font-medium text-blue-600"
      >
        <i className="ti ti-arrow-left text-base" />
        {stack.length === 0 ? 'กลับหน้าหลัก' : news.title}
      </button>

      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-blue-tint">
          <i className={`ti ${news.icon || 'ti-news'} text-lg text-blue-600`} />
        </div>
        <h2 className="font-display text-2xl font-semibold text-ink">
          {stack.length === 0 ? news.title : stack[stack.length - 1].label}
        </h2>
      </div>

      {stack.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-1.5 rounded-lg bg-blue-tint/40 px-3.5 py-2 text-[12px] font-semibold text-ink-soft">
          <button type="button" onClick={onBack} className="flex items-center gap-1 rounded-md px-1.5 py-1 text-blue-600 hover:bg-blue-100">
            <i className="ti ti-home text-sm" />หน้าหลัก
          </button>
          <span className="text-line">|</span>
          <button type="button" onClick={() => goToCrumb(-1)} className="rounded px-1 hover:bg-blue-100 hover:text-blue-600">
            {news.title}
          </button>
          {stack.map((s, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <i className="ti ti-chevron-right text-[10px]" />
              <button type="button" onClick={() => goToCrumb(i)} className="rounded px-1 hover:bg-blue-100 hover:text-blue-600">
                {s.label}
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
        {currentItems.map((node, i) => {
          const hasChildren = node.children && node.children.length > 0
          if (hasChildren) {
            return (
              <button
                key={i}
                type="button"
                onClick={() => enter(node)}
                className="flex items-center gap-3 rounded-lg border border-line bg-white px-4 py-3.5 text-left transition-colors hover:border-blue-500/40 hover:bg-blue-tint"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-tint">
                  <i className={`ti ${node.icon || 'ti-folder'} text-base text-blue-600`} />
                </div>
                <span className="flex-1 text-[13px] leading-tight text-ink">{node.label}</span>
                <i className="ti ti-chevron-right flex-shrink-0 text-sm text-ink-soft/60" />
              </button>
            )
          }
          const link = resolveLink(node)
          return (
            <a
              key={i}
              href={link || '#'}
              {...(link && { target: '_blank', rel: 'noopener noreferrer' })}
              className="flex items-center gap-3 rounded-lg border border-line bg-white px-4 py-3.5 no-underline transition-colors hover:border-blue-500/40 hover:bg-blue-tint"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-tint">
                <i className={`ti ${node.icon || 'ti-file-text'} text-base text-blue-600`} />
              </div>
              <span className="flex-1 text-[13px] leading-tight text-ink">{node.label}</span>
            </a>
          )
        })}
        {currentItems.length === 0 && (
          <p className="col-span-full py-6 text-center text-[13px] text-ink-soft">ยังไม่มีรายการในหัวข้อนี้</p>
        )}
      </div>
    </div>
  )
}
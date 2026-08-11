import { useState } from 'react'
import { useContent } from '../../context/ContentContext'

const ANN_COLORS = [
  { bg: 'bg-blue-tint', text: 'text-blue-600' },
  { bg: 'bg-coral-tint', text: 'text-coral' },
  { bg: 'bg-teal-tint', text: 'text-teal' },
  { bg: 'bg-amber-tint', text: 'text-amber' },
  { bg: 'bg-violet-tint', text: 'text-violet' },
  { bg: 'bg-green-tint', text: 'text-green' },
]

export function Announcement() {
  const { content } = useContent()
  const ANN_NEWS = content.ANN_NEWS
  const [showAll, setShowAll] = useState(false)

  // ข่าวที่กำลังเจาะเข้าไปดูเมนูย่อยอยู่ (null = ยังอยู่หน้าลิสต์ข่าวปกติ)
  const [activeNews, setActiveNews] = useState(null)
  // stack ของ breadcrumb เวลาเจาะลึกเข้าไปในเมนูย่อยหลายชั้น
  const [stack, setStack] = useState([])

  const pinned = ANN_NEWS.find((n) => n.pinned) || ANN_NEWS[0]
  const bannerImg = pinned?.img || ''

  const openNews = (n) => {
    if (n.tree && n.tree.length > 0) {
      setActiveNews(n)
      setStack([])
    }
  }
  const closeNewsTree = () => {
    setActiveNews(null)
    setStack([])
  }
  const enterNode = (node) => {
    if (node.children && node.children.length > 0) {
      setStack([...stack, { label: node.label, items: node.children }])
    }
  }
  const goBackNode = () => setStack(stack.slice(0, -1))
  const goToCrumb = (index) => setStack(index < 0 ? [] : stack.slice(0, index + 1))

  const rootItems = activeNews?.tree || []
  const currentItems = stack.length === 0 ? rootItems : stack[stack.length - 1].items

  return (
    <div id="sec-ann">
      <div className="mb-[11px] flex items-center gap-2 font-display text-base font-semibold text-navy-900">
        <span className="h-[7px] w-[7px] rounded-full bg-coral" />
        ข่าวประชาสัมพันธ์
      </div>

      {pinned && (
        <div
          className="relative flex min-h-[176px] flex-col justify-end overflow-hidden rounded-lg bg-gradient-to-tr from-navy-950 to-blue-600 p-6"
          style={
            bannerImg
              ? {
                  backgroundImage: `linear-gradient(90deg, rgba(10,20,50,.88) 30%, rgba(10,20,50,.35) 75%), url(${bannerImg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {}
          }
        >
          {pinned.badge && (
            <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-[20px] bg-coral px-2.5 py-[3px] text-[9px] font-bold text-white">
              <i className="ti ti-sparkles text-[11px]" />
              {pinned.badge}
            </span>
          )}
          <div className="mb-[5px] max-w-[80%] font-display text-lg font-semibold text-white">{pinned.title}</div>
          <div className="mb-4 max-w-[75%] text-[11.5px] leading-[1.5] text-white/62">{pinned.sub}</div>
          <div className="flex items-center gap-[9px]">
            {pinned.href && (
              <a
                href={pinned.href}
                className="rounded-xs border-none bg-white px-4 py-2 text-[11.5px] font-bold text-coral no-underline"
              >
                อ่านรายละเอียด
              </a>
            )}
            {pinned.file?.dataUrl && (
              <a
                href={pinned.file.dataUrl}
                download={pinned.file.name}
                className="rounded-xs border-none bg-white px-4 py-2 text-[11.5px] font-bold text-coral no-underline"
              >
                อ่านรายละเอียด
              </a>
            )}
            <button
              className="rounded-xs border border-white/30 bg-white/10 px-3.5 py-2 text-[11.5px] text-white"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? 'ซ่อนประกาศ ↑' : 'ดูประกาศทั้งหมด →'}
            </button>
          </div>
        </div>
      )}

      {showAll && !activeNews && (
        <div className="mt-3 flex flex-col gap-2">
          {ANN_NEWS.map((n, i) => {
            const c = ANN_COLORS[i % ANN_COLORS.length]
            const hasTree = n.tree && n.tree.length > 0
            const href = !hasTree ? n.href || n.file?.dataUrl : undefined
            const rowContent = (
              <>
                <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] ${c.bg}`}>
                  <i className={`ti ${n.icon || 'ti-news'} text-lg ${c.text}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium text-navy-900">{n.title}</p>
                  <p className="mt-0.5 truncate text-xs text-ink-soft">{n.sub}</p>
                </div>
                <i className="ti ti-chevron-right flex-shrink-0 text-base text-ink-soft/60" />
              </>
            )
            const rowClass =
              'flex items-center gap-3 rounded-md border border-line bg-white px-3.5 py-3 no-underline transition-colors hover:border-blue-500/40'

            return hasTree ? (
              <button key={n.title} type="button" onClick={() => openNews(n)} className={rowClass + ' text-left'}>
                {rowContent}
              </button>
            ) : href ? (
              <a key={n.title} href={href} download={n.file?.name} className={rowClass}>
                {rowContent}
              </a>
            ) : (
              <div key={n.title} className={rowClass}>
                {rowContent}
              </div>
            )
          })}
        </div>
      )}

      {activeNews && (
        <div className="mt-3">
          <button
            type="button"
            onClick={stack.length === 0 ? closeNewsTree : goBackNode}
            className="mb-2.5 flex items-center gap-1.5 rounded-lg border-none bg-transparent text-[13px] font-medium text-blue-600"
          >
            <i className="ti ti-arrow-left text-base" />
            {stack.length === 0 ? 'กลับไปหน้ารายการข่าว' : activeNews.title}
          </button>

          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-blue-tint">
              <i className={`ti ${activeNews.icon || 'ti-news'} text-lg text-blue-600`} />
            </div>
            <h3 className="text-[14px] font-bold text-navy-900">
              {stack.length === 0 ? activeNews.title : stack[stack.length - 1].label}
            </h3>
          </div>

          {stack.length > 0 && (
            <div className="mb-3 flex flex-wrap items-center gap-1.5 rounded-lg bg-blue-tint/40 px-3.5 py-2 text-[12px] font-semibold text-ink-soft">
              <button type="button" onClick={() => goToCrumb(-1)} className="rounded px-1 hover:bg-blue-100 hover:text-blue-600">
                {activeNews.title}
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

          <div className="flex flex-col gap-2">
            {currentItems.map((node, i) => {
              const hasChildren = node.children && node.children.length > 0
              const rowClass =
                'flex items-center gap-3 rounded-md border border-line bg-white px-3.5 py-3 no-underline transition-colors hover:border-blue-500/40'

              if (hasChildren) {
                return (
                  <button key={i} type="button" onClick={() => enterNode(node)} className={rowClass + ' text-left'}>
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-blue-tint">
                      <i className={`ti ${node.icon || 'ti-folder'} text-sm text-blue-600`} />
                    </div>
                    <span className="flex-1 text-[13px] text-navy-900">{node.label}</span>
                    <i className="ti ti-chevron-right flex-shrink-0 text-sm text-ink-soft/60" />
                  </button>
                )
              }
              return (
                <a key={i} href={node.href || '#'} className={rowClass}>
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-blue-tint">
                    <i className={`ti ${node.icon || 'ti-file-text'} text-sm text-blue-600`} />
                  </div>
                  <span className="flex-1 text-[13px] text-navy-900">{node.label}</span>
                </a>
              )
            })}
            {currentItems.length === 0 && (
              <p className="py-6 text-center text-[12px] text-ink-soft">ยังไม่มีรายการในหัวข้อนี้</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
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

export function Announcement({ onOpenNews }) {
  const { content } = useContent()
  const ANN_NEWS = content.ANN_NEWS
  const [showAll, setShowAll] = useState(false)

  const pinned = ANN_NEWS.find((n) => n.pinned) || ANN_NEWS[0]
  const bannerImg = pinned?.img || ''

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

      {showAll && (
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
              <button key={n.title} type="button" onClick={() => onOpenNews(n)} className={rowClass + ' text-left'}>
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
    </div>
  )
}
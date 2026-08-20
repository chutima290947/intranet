import { useContent } from '../../context/ContentContext'

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

export function QualityDetailPage({ quality, onBack }) {
  const { content } = useContent()

  if (!quality) {
    return (
      <div className="mx-auto max-w-[900px] px-8 py-16 text-center">
        <p className="text-[13px] text-ink-soft">ไม่พบเนื้อหานี้</p>
        <button
          onClick={onBack}
          className="mt-3 flex items-center gap-1.5 rounded-lg border-none bg-transparent text-[13px] font-medium text-blue-600 mx-auto"
        >
          <i className="ti ti-arrow-left text-base" />กลับหน้าหลัก
        </button>
      </div>
    )
  }

  const articleItems = Array.isArray(quality.articleItems) ? quality.articleItems : []
  const sections = Array.isArray(quality.sections) ? quality.sections : []

  return (
    <div className="mx-auto max-w-[900px] px-8 pb-[60px] pt-[22px]">
      <button
        onClick={onBack}
        className="mb-5 flex items-center gap-1.5 rounded-lg border-none bg-transparent text-[13px] font-medium text-blue-600"
      >
        <i className="ti ti-arrow-left text-base" />กลับหน้าหลัก
      </button>

      <div className="rounded-lg border border-line bg-white px-7 py-7">
        <p className="mb-1.5 text-[11.5px] font-bold uppercase tracking-wide text-ink-soft/60">
          {content.SITE?.name || 'Articles'}
        </p>

        <h1 className="mb-3 font-display text-[26px] font-bold leading-tight text-navy-900">
          {quality.articleTitle || quality.label}
        </h1>

        <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-line pb-4 text-[11.5px] text-ink-soft">
          {quality.updatedAt && (
            <span>
              อัปเดตล่าสุด <strong className="font-semibold text-navy-900">{quality.updatedAt}</strong>
            </span>
          )}
          {quality.author && (
            <span>
              เขียนโดย <strong className="font-semibold text-navy-900">{quality.author}</strong>
            </span>
          )}
        </div>

        {quality.intro && (
          <p className="mb-4 text-[13.5px] leading-relaxed text-ink">{quality.intro}</p>
        )}

        {sections.length > 0 && (
          <div className="mb-6 flex flex-col gap-6">
            {sections.map((sec, si) => {
              const secItems = Array.isArray(sec.items) ? sec.items : []
              if (!sec.title && secItems.length === 0) return null

              return (
                <div key={si}>
                  {sec.title && (
                    <h2 className="mb-3 text-[12px] font-bold uppercase tracking-wide text-blue-700">
                      {sec.title}
                    </h2>
                  )}

                  <div className="grid grid-cols-4 gap-3 max-[700px]:grid-cols-2">
                    {secItems.map((it, ii) => {
                      const link = resolveLink(it)
                      const imgUrl = getFileUrl(it.img)

                      const cardInner = imgUrl ? (
                        <div className="overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-blue-500/40">
                          <div
                            className="h-[86px] w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${imgUrl})` }}
                          />
                          <div className="px-2.5 py-2 text-center text-[11px] font-semibold leading-tight text-navy-900">
                            {it.label}
                          </div>
                        </div>
                      ) : (
                        <div
                          className="flex h-full items-center gap-2 rounded-lg px-3 py-3 text-[11.5px] font-bold leading-tight text-white"
                          style={{ background: it.color || '#1B3A6B' }}
                        >
                          <i className={`ti ${it.icon || 'ti-file-text'} flex-shrink-0 text-lg`} />
                          <span>{it.label}</span>
                        </div>
                      )

                      return link ? (
                        <a
                          key={ii}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline"
                        >
                          {cardInner}
                        </a>
                      ) : (
                        <div key={ii}>{cardInner}</div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {articleItems.length > 0 && (
          <ul className="flex flex-col gap-2.5">
            {articleItems.map((item) => {
              const link = resolveLink(item)
              return (
                <li key={item.label} className="flex items-start gap-2">
                  <i className="ti ti-point-filled mt-[3px] flex-shrink-0 text-[10px] text-blue-500" />
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center gap-2 text-[13.5px] text-blue-600 hover:underline"
                    >
                      <span>{item.label}</span>
                      {item.isNew && (
                        <span className="rounded bg-coral-tint px-1.5 py-0.5 text-[9.5px] font-bold text-coral">
                          NEW
                        </span>
                      )}
                    </a>
                  ) : (
                    <span className="flex flex-1 items-center gap-2 text-[13.5px] text-ink">
                      <span>{item.label}</span>
                      {item.isNew && (
                        <span className="rounded bg-coral-tint px-1.5 py-0.5 text-[9.5px] font-bold text-coral">
                          NEW
                        </span>
                      )}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        )}

        {articleItems.length === 0 && sections.length === 0 && !quality.intro && (
          <p className="text-[13px] text-ink-soft">ยังไม่มีเนื้อหา</p>
        )}
      </div>
    </div>
  )
}
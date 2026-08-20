import { useContent } from '../../context/ContentContext'

function getFileUrl(url) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url

  const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001`
  return `${API_URL}${url}`
}

// เพิ่มฟังก์ชันนี้ — เดิมหายไป ทำให้เกิด "resolveLink is not defined"
function resolveLink(item) {
  if (item?.href) return item.href
  if (item?.file?.url) return getFileUrl(item.file.url)
  return null
}

function groupByCategory(items) {
  const order = []
  const map = new Map()
  for (const item of items) {
    const key = item.category?.trim() || ''
    if (!map.has(key)) {
      map.set(key, [])
      order.push(key)
    }
    map.get(key).push(item)
  }
  return order.map((key) => ({ category: key, items: map.get(key) }))
}

function DiseaseCard({ item }) {
  const link = resolveLink(item)
  const imgSrc = getFileUrl(item.img)
  const cardInner = (
    <>
      <div className="aspect-[4/3] w-full overflow-hidden rounded-md border border-line bg-paper">
        <img
          src={imgSrc}
          alt={item.label}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <span className="text-[13.5px] font-bold text-navy-900">{item.label}</span>
        {item.isNew && (
          <span className="rounded bg-coral-tint px-1.5 py-0.5 text-[9.5px] font-bold text-coral">
            NEW
          </span>
        )}
      </div>
      {item.sub && <p className="mt-0.5 text-[12px] text-ink-soft">{item.sub}</p>}
      {item.tag && (
        <span className="mt-1.5 inline-block rounded bg-blue-tint px-2 py-0.5 text-[10.5px] font-semibold text-blue-700">
          {item.tag}
        </span>
      )}
    </>
  )
  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block no-underline"
    >
      {cardInner}
    </a>
  ) : (
    <div className="group">{cardInner}</div>
  )
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

  return (
    <div className="mx-auto max-w-[900px] px-8 pb-[60px] pt-[22px]">
      <button
        onClick={onBack}
        className="mb-5 flex items-center gap-1.5 rounded-lg border-none bg-transparent text-[13px] font-medium text-blue-600"
      >
        <i className="ti ti-arrow-left text-base" />กลับหน้าหลัก
      </button>

      <div className="px-1 py-2">
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

        {articleItems.length > 0 && (
          <>
            {/* รายการที่มีรูปภาพ -> แสดงเป็นการ์ดรูปภาพ (แกลเลอรี) จัดกลุ่มตามหมวดหมู่ถ้ามี */}
            {articleItems.some((item) => item.img) && (
              <div className="mb-5 flex flex-col gap-6">
                {groupByCategory(articleItems.filter((item) => item.img)).map((group) => (
                  <div key={group.category || '__none__'} className="flex flex-col gap-3">
                    {group.category && (
                      <div className="flex items-center gap-2 border-b border-line pb-1.5">
                        <h4 className="text-[13.5px] font-bold text-navy-900">{group.category}</h4>
                        <span className="text-[11px] text-ink-soft/70">{group.items.length} รายการ</span>
                      </div>
                    )}
                    <div className="grid grid-cols-5 gap-4 max-[900px]:grid-cols-3 max-[640px]:grid-cols-2">
                      {group.items.map((item) => (
                        <DiseaseCard key={item.label} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* รายการที่ไม่มีรูปภาพ -> แสดงเป็นลิสต์ข้อความแบบเดิม */}
            {articleItems.some((item) => !item.img) && (
              <ul className="flex flex-col gap-2.5">
                {articleItems
                  .filter((item) => !item.img)
                  .map((item) => {
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
          </>
        )}

        {articleItems.length === 0 && !quality.intro && (
          <p className="text-[13px] text-ink-soft">ยังไม่มีเนื้อหา</p>
        )}
      </div>
    </div>
  )
}
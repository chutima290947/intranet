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

// รูปภาพของ node อาจถูกเก็บเป็น string url ตรงๆ หรือเป็น object { url } (แล้วแต่ตัว FieldInput image คืนค่ามา)
function resolveImageUrl(img) {
  if (!img) return null
  const raw = typeof img === 'string' ? img : img.url
  return raw ? getFileUrl(raw) : null
}

// ============================================================
// Recursive tree renderer
// - node ที่มีลูกซึ่ง "มีหลาน" ต่อ -> ถือเป็นหมวดหมู่ ให้ขึ้นหัวข้อแล้ว recurse เป็น section ของตัวเอง
// - node ที่ไม่มีลูก -> ถือเป็น "การ์ด" (รูปภาพ/ลิงก์)
// การ์ดที่อยู่ "ระดับเดียวกัน" ติดกันจะถูกรวมเป็น grid เดียวกันเสมอ แม้จะสลับกับหมวดหมู่อื่นอยู่
// ไม่มีการคลิกไล่ชั้นอีกต่อไป — ทุกชั้นถูกกางออกมาให้เห็นพร้อมกันในหน้าเดียว
// ============================================================

// แบ่ง children ของ node หนึ่งๆ ออกเป็น "ช่วง" (block) ตามลำดับที่ปรากฏ:
// - block การ์ด (leafGroup): รวม node ที่ไม่มีลูกที่อยู่ติดกันเป็น grid เดียว
// - block หมวดหมู่ (section): node ที่มีลูก แยกเป็น section ของตัวเอง
function groupChildren(nodes) {
  const list = Array.isArray(nodes) ? nodes : []
  const blocks = []
  let leafRun = []

  list.forEach((node) => {
    const isSection = Array.isArray(node.children) && node.children.length > 0

    if (isSection) {
      if (leafRun.length > 0) {
        blocks.push({ type: 'leafGroup', items: leafRun })
        leafRun = []
      }
      blocks.push({ type: 'section', node })
    } else {
      leafRun.push(node)
    }
  })

  if (leafRun.length > 0) {
    blocks.push({ type: 'leafGroup', items: leafRun })
  }

  return blocks
}

function TreeLeafGrid({ items }) {
  const list = Array.isArray(items) ? items : []

  return (
    <div className="grid grid-cols-3 gap-4 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
      {list.map((child, i) => {
        const link = resolveLink(child)
        const imgUrl = resolveImageUrl(child.img)
        const CardTag = link ? 'a' : 'div'

        return (
          <CardTag
            key={i}
            {...(link && { href: link, target: '_blank', rel: 'noopener noreferrer' })}
            className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white no-underline shadow-[0_1px_2px_rgba(11,40,80,.04)] transition-all hover:-translate-y-0.5 hover:border-blue-400/50 hover:shadow-[0_6px_16px_rgba(11,40,80,.08)]"
          >
            <div className="aspect-[4/3] w-full flex-shrink-0 overflow-hidden bg-slate-50">
              {imgUrl ? (
                <img
                  src={imgUrl}
                  alt={child.label}
                  className="h-full w-full object-contain p-2 transition-transform duration-200 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <i className={`ti ${child.icon || 'ti-file-text'} text-3xl text-blue-500`} />
                </div>
              )}
            </div>
            <div className="flex min-h-[2.75rem] items-center justify-center px-3.5 py-2.5">
              <span className="text-center text-[12.5px] font-medium leading-snug text-ink">
                {child.label || 'ไม่มีชื่อ'}
              </span>
            </div>
          </CardTag>
        )
      })}

      {list.length === 0 && (
        <p className="col-span-full py-4 text-center text-[12px] text-ink-soft">
          ยังไม่มีรายการในหมวดนี้
        </p>
      )}
    </div>
  )
}

function TreeSection({ node, depth }) {
  const blocks = groupChildren(node.children)
  if (blocks.length === 0) return null

  return (
    <div className={depth === 0 ? 'mb-8' : 'mb-6'}>
      <h2
        className={
          depth === 0
            ? 'mb-3 flex items-center gap-2 text-[14px] font-bold text-navy-900'
            : 'mb-2.5 flex items-center gap-1.5 text-[12.5px] font-bold text-ink-soft'
        }
      >
        <i className={`ti ${node.icon || 'ti-folder'} text-base text-blue-600`} />
        {node.label}
      </h2>

      <div className="flex flex-col gap-5">
        {blocks.map((block, i) =>
          block.type === 'section' ? (
            <TreeSection key={i} node={block.node} depth={depth + 1} />
          ) : (
            <TreeLeafGrid key={i} items={block.items} />
          )
        )}
      </div>
    </div>
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
  let rootTree = Array.isArray(quality.tree) ? quality.tree : []

  // ถ้า root มี node เดียวและชื่อซ้ำกับหัวข้อหน้า (label/articleTitle) -> เป็น wrapper ที่ไม่จำเป็น
  // ข้ามหัวข้อนั้นไปเลย ใช้ลูกของมันเป็น root แทน กันหัวข้อซ้ำซ้อน (เช่น "Quality Center" ขึ้นซ้ำ 2 รอบ)
  if (rootTree.length === 1) {
    const only = rootTree[0]
    const onlyHasChildren = Array.isArray(only.children) && only.children.length > 0
    const sameLabel =
      only.label && (only.label === quality.label || only.label === quality.articleTitle)

    if (onlyHasChildren && sameLabel) {
      rootTree = only.children
    }
  }

  const hasTree = rootTree.length > 0
  const rootBlocks = hasTree ? groupChildren(rootTree) : []

  return (
    <div className="mx-auto max-w-[900px] px-8 pb-[60px] pt-[22px]">
      <button
        onClick={onBack}
        className="mb-5 flex items-center gap-1.5 rounded-lg border-none bg-transparent text-[13px] font-medium text-blue-600"
      >
        <i className="ti ti-arrow-left text-base" />
        กลับหน้าหลัก
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

        {hasTree && (
          <div className="flex flex-col gap-2">
            {rootBlocks.map((block, i) =>
              block.type === 'section' ? (
                <TreeSection key={i} node={block.node} depth={0} />
              ) : (
                <div key={i} className="mb-8">
                  <TreeLeafGrid items={block.items} />
                </div>
              )
            )}
          </div>
        )}

        {!hasTree && articleItems.length > 0 && (
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

        {!hasTree && articleItems.length === 0 && !quality.intro && (
          <p className="text-[13px] text-ink-soft">ยังไม่มีเนื้อหา</p>
        )}
      </div>
    </div>
  )
}
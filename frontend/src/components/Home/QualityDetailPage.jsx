import { useState, useEffect } from 'react'
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

// เช็คว่า tree นี้ซ้อนลึกเกิน 2 ชั้นไหม (มีหลานอยู่ใต้ลูกอีกที)
// ถ้าไม่มี -> ใช้โหมด "แสดงหมวดหมู่ทั้งหมดพร้อมกัน" (flat mode)
// ถ้ามี -> ใช้โหมดคลิกเข้าไปทีละชั้นแบบเดิม (สำหรับเมนูอื่นที่ซ้อนลึกกว่านี้)
function hasGrandchildren(nodes) {
  const list = Array.isArray(nodes) ? nodes : []
  return list.some((node) => Array.isArray(node.children) && node.children.some((c) => Array.isArray(c.children) && c.children.length > 0))
}

export function QualityDetailPage({ quality, onBack }) {
  const { content } = useContent()

  // stack ของเมนูต้นไม้ที่กำลังดูอยู่ — เหมือน DigitalServicePage.jsx
  // แต่ละชั้นเก็บ { label, items } เพื่อใช้ทำ breadcrumb
  // ใช้เฉพาะโหมด "คลิกเข้าไปทีละชั้น" (เมื่อ tree ซ้อนลึกกว่า 2 ชั้น) เท่านั้น
  const [stack, setStack] = useState([])

  useEffect(() => {
    setStack([])
  }, [quality])

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
  const rootTree = Array.isArray(quality.tree) ? quality.tree : []
  const hasTree = rootTree.length > 0

  // โหมด flat: ทุกหมวดหมู่หลัก (เช่น quality / keydata / report) แสดงพร้อมกันหมด
  // ใต้แต่ละหมวดเป็นการ์ดรูปภาพ+ลิงก์ของรายการลูก ไม่ต้องคลิกเข้าไปทีละชั้น
  const flatMode = hasTree && !hasGrandchildren(rootTree)

  const currentItems = stack.length === 0 ? rootTree : stack[stack.length - 1].items

  const enter = (node) => {
    if (node.children && node.children.length > 0) {
      setStack([...stack, { label: node.label, items: node.children }])
    }
  }
  const goBackTree = () => setStack(stack.slice(0, -1))
  const goToCrumb = (index) => setStack(index < 0 ? [] : stack.slice(0, index + 1))

  const handleTopBack = () => {
    if (stack.length > 0) {
      goBackTree()
    } else {
      onBack()
    }
  }

  return (
    <div className="mx-auto max-w-[900px] px-8 pb-[60px] pt-[22px]">
      <button
        onClick={handleTopBack}
        className="mb-5 flex items-center gap-1.5 rounded-lg border-none bg-transparent text-[13px] font-medium text-blue-600"
      >
        <i className="ti ti-arrow-left text-base" />
        {stack.length > 0 ? stack[stack.length - 1].label : 'กลับหน้าหลัก'}
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

        {hasTree && flatMode && (
          <div className="flex flex-col gap-7">
            {rootTree.map((category, ci) => {
              const children = Array.isArray(category.children) ? category.children : []

              return (
                <div key={ci}>
                  <h2 className="mb-3 flex items-center gap-2 text-[14px] font-bold text-navy-900">
                    <i className={`ti ${category.icon || 'ti-folder'} text-base text-blue-600`} />
                    {category.label}
                  </h2>

                  <div className="grid grid-cols-3 gap-3 max-[640px]:grid-cols-2">
                    {children.map((child, i) => {
                      const link = resolveLink(child)
                      const imgUrl = resolveImageUrl(child.img)
                      const CardTag = link ? 'a' : 'div'

                      return (
                        <CardTag
                          key={i}
                          {...(link && { href: link, target: '_blank', rel: 'noopener noreferrer' })}
                          className="flex flex-col overflow-hidden rounded-lg border border-line bg-white no-underline transition-colors hover:border-blue-500/40 hover:bg-blue-tint"
                        >
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={child.label}
                              className="h-28 w-full flex-shrink-0 object-cover"
                            />
                          ) : (
                            <div className="flex h-28 w-full flex-shrink-0 items-center justify-center bg-blue-tint">
                              <i className={`ti ${child.icon || 'ti-file-text'} text-2xl text-blue-600`} />
                            </div>
                          )}
                          <span className="px-3 py-2.5 text-[12.5px] leading-tight text-ink">
                            {child.label}
                          </span>
                        </CardTag>
                      )
                    })}

                    {children.length === 0 && (
                      <p className="col-span-full py-4 text-center text-[12px] text-ink-soft">
                        ยังไม่มีรายการในหมวดนี้
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {hasTree && !flatMode && (
          <>
            {/* breadcrumb — โชว์เมื่อเข้าไปดูหัวข้อย่อยแล้วเท่านั้น */}
            {stack.length > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-1.5 rounded-lg bg-blue-tint/40 px-3.5 py-2 text-[12px] font-semibold text-ink-soft">
                <button
                  type="button"
                  onClick={goBackTree}
                  className="flex items-center gap-1 rounded-md px-1.5 py-1 text-blue-600 hover:bg-blue-100"
                >
                  <i className="ti ti-chevron-left text-sm" />
                  ย้อนกลับ
                </button>
                <span className="text-line">|</span>
                <button
                  type="button"
                  onClick={() => goToCrumb(-1)}
                  className="rounded px-1 hover:bg-blue-100 hover:text-blue-600"
                >
                  {quality.articleTitle || quality.label}
                </button>
                {stack.map((s, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <i className="ti ti-chevron-right text-[10px]" />
                    <button
                      type="button"
                      onClick={() => goToCrumb(i)}
                      className="rounded px-1 hover:bg-blue-100 hover:text-blue-600"
                    >
                      {s.label}
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="mb-6 grid grid-cols-2 gap-3">
              {currentItems.map((node, i) => {
                const hasChildren = node.children && node.children.length > 0

                if (hasChildren) {
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => enter(node)}
                      className="flex w-full items-center gap-3 rounded-lg border border-line bg-white px-4 py-3.5 text-left transition-colors hover:border-blue-500/40 hover:bg-blue-tint"
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
                    className="flex w-full items-center gap-3 rounded-lg border border-line bg-white px-4 py-3.5 no-underline transition-colors hover:border-blue-500/40 hover:bg-blue-tint"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-tint">
                      <i className={`ti ${node.icon || 'ti-file-text'} text-base text-blue-600`} />
                    </div>
                    <span className="flex-1 text-[13px] leading-tight text-ink">{node.label}</span>
                  </a>
                )
              })}

              {currentItems.length === 0 && (
                <p className="col-span-full py-6 text-center text-[13px] text-ink-soft">
                  ยังไม่มีรายการในหัวข้อนี้
                </p>
              )}
            </div>
          </>
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
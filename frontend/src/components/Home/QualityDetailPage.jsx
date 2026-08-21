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

// การ์ดขนาดกะทัดรัด ใช้ร่วมกันทั้ง TreeLeafGrid และ DiseaseGrid
// รูป/โลโก้เป็นสี่เหลี่ยมจัตุรัส วางกึ่งกลางบนพื้นขาว มีขอบบางคั่นก่อนชื่อด้านล่าง
// h-full ให้การ์ดยืดเต็มความสูงของแถวใน grid เสมอ (grid จะยืดให้เท่ากับใบสูงสุดในแถวอยู่แล้ว
// แต่ต้องมี h-full กำกับไว้ด้วย ไม่งั้นเนื้อหาข้างในจะไม่ขยายตาม เหลือช่องว่างค้างด้านล่าง)
const GRID_COLS =
  'grid grid-cols-5 gap-3.5 max-[1024px]:grid-cols-4 max-[768px]:grid-cols-3 max-[560px]:grid-cols-2 max-[380px]:grid-cols-1'

const CARD_BASE =
  'group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white no-underline shadow-[0_1px_2px_rgba(11,40,80,.04)] transition-all hover:-translate-y-0.5 hover:border-blue-400/50 hover:shadow-[0_6px_16px_rgba(11,40,80,.08)]'

// กล่องรูป/ไอคอนของการ์ด — ใช้ "ความสูงคงที่" (h-32 = 128px) แทน aspect-square เดิม
// เหตุผล: aspect-square อิงความกว้างของคอลัมน์ ซึ่งอาจต่างกันได้เล็กน้อยระหว่าง section/breakpoint
// ทำให้กล่องรูปสูงไม่เท่ากัน 100% และดันบล็อคชื่อด้านล่างขึ้น-ลงไม่ตรงกัน
// พอ fix เป็นค่าคงที่ กล่องรูปกับบล็อคชื่อจะอยู่ตำแหน่งเดียวกันเป๊ะทุกการ์ด ไม่ว่ารูปต้นฉบับจะเล็กหรือใหญ่แค่ไหน
const CARD_IMAGE_BOX =
  'flex h-32 w-full flex-shrink-0 items-center justify-center bg-white p-4'

// กล่องชื่อใต้การ์ด — สูงคงที่เป๊ะๆ (ไม่ใช่ min-height) + line-clamp-2 ตัดข้อความไว้แค่ 2 บรรทัดเสมอ
// ทำให้ทุกการ์ดในแถวเดียวกันมีความสูงเท่ากันโดยไม่ต้องพึ่งพาการยืดของ grid เลย
// ไม่ว่าอัปโหลดรูปสัดส่วนไหนมา หรือชื่อสั้น/ยาวแค่ไหน การ์ดจะมีขนาดสม่ำเสมอเสมอ
const CARD_TITLE_BOX =
  'flex h-11 flex-shrink-0 items-center justify-center overflow-hidden border-t border-line/70 px-2.5 py-1.5'

const CARD_TITLE_TEXT =
  'line-clamp-2 text-center text-[11.5px] font-semibold leading-snug text-ink'

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
    <div className={GRID_COLS}>
      {list.map((child, i) => {
        const link = resolveLink(child)
        const imgUrl = resolveImageUrl(child.img)
        const CardTag = link ? 'a' : 'div'

        return (
          <CardTag
            key={i}
            {...(link && { href: link, target: '_blank', rel: 'noopener noreferrer' })}
            className={CARD_BASE}
          >
            <div className={CARD_IMAGE_BOX}>
              {imgUrl ? (
                <img
                  src={imgUrl}
                  alt={child.label}
                  className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.04]"
                />
              ) : (
                <i className={`ti ${child.icon || 'ti-file-text'} text-3xl text-blue-500`} />
              )}
            </div>
            <div className={CARD_TITLE_BOX}>
              <span className={CARD_TITLE_TEXT}>{child.label || 'ไม่มีชื่อ'}</span>
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

// depth === 0 ปกติแสดงไอคอน + label — ถ้าส่ง `index` มาด้วย (ใช้ในหน้ารายละเอียดโรค)
// จะแสดงเป็นเลขลำดับ "1." "2." แทนไอคอน ตามรูปแบบ "หัวข้อมีเลขกำกับ"
function TreeSection({ node, depth, index }) {
  const blocks = groupChildren(node.children)
  if (blocks.length === 0) return null

  const showNumber = depth === 0 && typeof index === 'number'

  return (
    <div className={depth === 0 ? 'mb-8' : 'mb-6'}>
      <h2
        className={
          depth === 0
            ? 'mb-3 flex items-center gap-2 text-[14px] font-bold text-navy-900'
            : 'mb-2.5 flex items-center gap-1.5 text-[12.5px] font-bold text-ink-soft'
        }
      >
        {showNumber ? (
          <span className="text-blue-600">{index}.</span>
        ) : (
          <i className={`ti ${node.icon || 'ti-folder'} text-base text-blue-600`} />
        )}
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

// ============================================================
// Disease grid + disease detail (หมวด "โรคติดต่อ")
// - การ์ดโรค: รูปภาพสี่เหลี่ยมจัตุรัส + badge มุมซ้ายบน + ชื่อใต้รูป (สไตล์เดียวกับ TreeLeafGrid)
//   ถ้าการ์ดมีลิงก์ตรง (href หรือไฟล์แนบ) -> กดแล้วเปิดลิงก์นั้นเลย (แท็บใหม่) ไม่เข้าไปหน้ารายละเอียด
//   ถ้าไม่มีลิงก์ตรง -> กดแล้วเข้าไปหน้ารายละเอียดโรค (มีรูป/หัวข้อ/รายการย่อยในตัว) ตามปกติ
// - หน้ารายละเอียดโรค: รูปแบนเนอร์ใหญ่เต็มความกว้าง (กดลิงก์ได้ถ้าตั้งไว้) + หัวข้อมีเลขกำกับพร้อมลิงก์ย่อยซ้อนชั้นได้ (ใช้ tree เดิม)
// การ์ดโรคใช้ object-cover (รูปเต็มกรอบเสมอ) จึงไม่มีปัญหาช่องว่างเหมือน TreeLeafGrid
// แต่ยังคงกล่องรูปเป็น aspect-square ได้ตามเดิม เพราะรูปเต็มกรอบพอดีทุกใบอยู่แล้ว
// ============================================================

function DiseaseGrid({ diseases, onOpenDisease }) {
  const list = Array.isArray(diseases) ? diseases : []

  return (
    <div className={GRID_COLS}>
      {list.map((d, i) => {
        const imgUrl = resolveImageUrl(d.img)
        // มีลิงก์ตรง (href หรือไฟล์แนบ) -> การ์ดนี้เป็นลิงก์ล้วนๆ ไม่มีหน้ารายละเอียด กดแล้วออกลิงก์ทันที
        // ไม่มีลิงก์ตรง -> การ์ดนี้มีหน้าความรู้/แนวทางของตัวเอง กดแล้วเข้าไปดูรายละเอียด
        const link = resolveLink(d)
        const CardTag = link ? 'a' : 'button'
        const cardExtraProps = link
          ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
          : { type: 'button', onClick: () => onOpenDisease(d) }

        return (
          <CardTag key={i} {...cardExtraProps} className={`${CARD_BASE} text-left`}>
            <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden bg-slate-50">
              {imgUrl ? (
                <img
                  src={imgUrl}
                  alt={d.label}
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <i className="ti ti-virus text-3xl text-blue-500" />
                </div>
              )}

              {d.badge && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-coral px-1.5 py-0.5 text-[9px] font-bold text-white">
                  {d.badge}
                </span>
              )}
            </div>

            <div className={CARD_TITLE_BOX}>
              <span className={CARD_TITLE_TEXT}>{d.label || 'ไม่มีชื่อ'}</span>
            </div>
          </CardTag>
        )
      })}

      {list.length === 0 && (
        <p className="col-span-full py-4 text-center text-[12px] text-ink-soft">
          ยังไม่มีข้อมูลโรคติดต่อ
        </p>
      )}
    </div>
  )
}

// รูปหัวเรื่อง (banners) — วางเรียงกันเป็นแถว ขนาดตามสัดส่วนจริงของรูป ไม่ครอปเหมือนการ์ด
// กดไปลิงก์ได้ถ้าตั้งไว้ ไม่ตั้งก็แสดงเฉยๆ ตรงกับของระบบเก่าที่วางรูปอินโฟกราฟิก/แดชบอร์ดไว้ด้านบนสุด
function DiseaseBanners({ banners }) {
  const list = Array.isArray(banners) ? banners : []
  const withImg = list.filter((b) => resolveImageUrl(b.img))
  if (withImg.length === 0) return null

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {withImg.map((b, i) => {
        const imgUrl = resolveImageUrl(b.img)
        const altText = b.label || `รูปภาพ ${i + 1}`
        const img = (
          <img
            src={imgUrl}
            alt={altText}
            className="h-auto w-full rounded-lg border border-line"
          />
        )

        return (
          <div key={i} className="min-w-[240px] flex-1 basis-[320px]">
            {b.href ? (
              <a href={b.href} target="_blank" rel="noopener noreferrer" className="block">
                {img}
              </a>
            ) : (
              img
            )}
          </div>
        )
      })}
    </div>
  )
}

// หัวข้อ + ลิสต์ลิงก์แบบข้อความล้วน (ไม่มีรูปการ์ด) — ระบบใส่เลขนำหน้าหัวข้อให้อัตโนมัติ
// ตรงกับของเก่าที่แสดง "2. ความรู้เกี่ยวกับโรค...", "3. เอกสาร/ฟอร์มที่เกี่ยวข้อง" ฯลฯ
function DiseaseSection({ section, index }) {
  const items = Array.isArray(section.items) ? section.items : []
  // หัวข้อเองก็ผูกลิงก์/ไฟล์ตรงๆ ได้ (ไม่ต้องมีรายการย่อยเสมอไป) — ใช้ resolveLink ตัวเดียวกับที่การ์ดอื่นๆ ใช้
  const link = resolveLink(section)
  if (!section.title && items.length === 0 && !link) return null

  return (
    <div className="mb-7">
      {section.title && (
        <h2 className="mb-2.5 text-[14.5px] font-bold text-navy-900">
          <span className="text-blue-600">{index}.</span>{' '}
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-900 hover:text-blue-600 hover:underline"
            >
              {section.title}
            </a>
          ) : (
            section.title
          )}
        </h2>
      )}

      {items.length > 0 && (
        <ul className="flex flex-col gap-2">
          {items.map((item, i) => {
            const link = resolveLink(item)
            return (
              <li key={i} className="flex items-start gap-2 pl-1">
                <i className="ti ti-point-filled mt-[3px] flex-shrink-0 text-[10px] text-blue-500" />
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center gap-2 text-[13.5px] text-blue-600 hover:underline"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="rounded bg-coral-tint px-1.5 py-0.5 text-[9.5px] font-bold text-coral">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ) : (
                  <span className="flex flex-1 items-center gap-2 text-[13.5px] text-ink">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="rounded bg-coral-tint px-1.5 py-0.5 text-[9.5px] font-bold text-coral">
                        {item.badge}
                      </span>
                    )}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function DiseaseDetail({ disease, onBack }) {
  const banners = Array.isArray(disease.banners) ? disease.banners : []
  const sections = Array.isArray(disease.sections) ? disease.sections : []
  const hasBanners = banners.some((b) => resolveImageUrl(b.img))
  const hasSections = sections.some(
    (s) => s.title || (Array.isArray(s.items) && s.items.length > 0)
  )

  return (
    <div className="mx-auto max-w-[1100px] px-8 pb-[60px] pt-[22px]">
      <button
        onClick={onBack}
        className="mb-5 flex items-center gap-1.5 rounded-lg border-none bg-transparent text-[13px] font-medium text-blue-600"
      >
        <i className="ti ti-arrow-left text-base" />
        กลับ
      </button>

      <div className="rounded-lg border border-line bg-white px-7 py-7">
        <h1 className="mb-3 font-display text-[26px] font-bold leading-tight text-navy-900">
          {disease.label}
        </h1>

        {(disease.updatedAt || disease.author) && (
          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-line pb-4 text-[11.5px] text-ink-soft">
            {disease.updatedAt && (
              <span>
                อัปเดตล่าสุด{' '}
                <strong className="font-semibold text-navy-900">{disease.updatedAt}</strong>
              </span>
            )}
            {disease.author && (
              <span>
                เขียนโดย <strong className="font-semibold text-navy-900">{disease.author}</strong>
              </span>
            )}
          </div>
        )}

        {disease.intro && (
          <p className="mb-5 whitespace-pre-line text-[13.5px] leading-relaxed text-ink">
            {disease.intro}
          </p>
        )}

        {hasBanners && <DiseaseBanners banners={banners} />}

        {hasSections &&
          sections.map((s, i) => <DiseaseSection key={i} section={s} index={i + 1} />)}

        {!hasBanners && !hasSections && !disease.intro && (
          <p className="text-[13px] text-ink-soft">ยังไม่มีเนื้อหา</p>
        )}
      </div>
    </div>
  )
}

export function QualityDetailPage({ quality, onBack }) {
  const { content } = useContent()
  const [selectedDisease, setSelectedDisease] = useState(null)

  // สลับหัวข้อ quality อื่น (เช่น กด browser back/forward หรือ selectedQualityLabel เปลี่ยน)
  // ต้องรีเซ็ตโรคที่เลือกไว้ทิ้ง ไม่งั้นจะค้างแสดงหน้าโรคของหัวข้อเก่า
  useEffect(() => {
    setSelectedDisease(null)
  }, [quality?.label])

  if (!quality) {
    return (
      <div className="mx-auto max-w-[1100px] px-8 py-16 text-center">
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

  const diseases = Array.isArray(quality.diseases) ? quality.diseases : []

  // เปิดหน้ารายละเอียดโรคอยู่ -> แสดงแทนหน้ารายการ quality ปกติ
  // กด "กลับ" ในหน้านี้จะกลับมาที่ grid โรค ไม่ออกไปหน้า Home เลย
  if (selectedDisease) {
    return <DiseaseDetail disease={selectedDisease} onBack={() => setSelectedDisease(null)} />
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
    <div className="mx-auto max-w-[1100px] px-8 pb-[60px] pt-[22px]">
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

        {diseases.length > 0 && (
          <div className="mb-8">
            <DiseaseGrid diseases={diseases} onOpenDisease={setSelectedDisease} />
          </div>
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

        {!hasTree && articleItems.length === 0 && !quality.intro && diseases.length === 0 && (
          <p className="text-[13px] text-ink-soft">ยังไม่มีเนื้อหา</p>
        )}
      </div>
    </div>
  )
}
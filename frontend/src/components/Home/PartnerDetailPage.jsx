import { useState, useMemo, useEffect } from 'react'
import { buildDocs } from './PartnerList'

const PAGE_SIZE = 50
const DOCS_COLLAPSE_LIMIT = 8
const DOCS_SEARCH_THRESHOLD = 10

// แปลง URL ของไฟล์ที่อัปโหลดให้เปิดจาก Frontend ได้ (relative path จาก backend -> absolute)
// รูปแบบเดียวกับ getFileUrl ใน Announcement.jsx / PartnerList.jsx / OnCall.jsx
function getFileUrl(url) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url

  const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001`
  return `${API_URL}${url}`
}

const normalize = (str) => (str || '').toLowerCase().replace(/\s+/g, '')

// แปลง URL ที่อยู่ในข้อความ (เช่น field contact) ให้กลายเป็นลิงก์กดได้
// รองรับกรณีมีช่องว่างแปลกๆ ต่อจาก https:// เช่น "https:// example.com"
function renderTextWithLinks(text) {
  if (!text) return null

  const urlRegex = /https?:\/\/\s*\S+/g
  const nodes = []
  let lastIndex = 0
  let match
  let key = 0

  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    const raw = match[0]
    const display = raw.trim()
    const href = raw.replace(/\s+/g, '')

    nodes.push(
      <a
        key={`link-${key++}`}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="break-all text-blue-600 underline"
      >
        {display}
      </a>
    )

    lastIndex = match.index + raw.length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

// ตรวจสอบว่าวันหมดอายุ (expiry) ผ่านไปแล้วหรือไม่
// รองรับรูปแบบ "Exp.31/07/2569" หรือ "31/07/2569" (dd/mm/yyyy, ปี พ.ศ.)
function isExpired(expiry) {
  if (!expiry) return false

  const match = expiry.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/)
  if (!match) return false

  const day = parseInt(match[1], 10)
  const month = parseInt(match[2], 10)
  let year = parseInt(match[3], 10)

  if (
    Number.isNaN(day) ||
    Number.isNaN(month) ||
    Number.isNaN(year) ||
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12
  ) {
    return false
  }

  // แปลงปี พ.ศ. เป็น ค.ศ. (ถ้าปีมากกว่า 2500 ถือว่าเป็น พ.ศ.)
  if (year > 2500) {
    year -= 543
  }

  const expiryDate = new Date(year, month - 1, day)
  if (Number.isNaN(expiryDate.getTime())) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  expiryDate.setHours(0, 0, 0, 0)

  return expiryDate < today
}

// รายการเอกสารแนบของแต่ละ item — ย่อ/ขยาย + ค้นหาในตัว เมื่อมีจำนวนเยอะ
// เพื่อไม่ให้การ์ดที่มีเอกสาร 40+ ไฟล์ (เช่น Health Buddy @ School) ยืดยาวจนใช้งานยาก
function DocsList({ docs }) {
  const [expanded, setExpanded] = useState(false)
  const [docQuery, setDocQuery] = useState('')

  const filteredDocs = useMemo(() => {
    if (!docQuery) return docs
    const q = normalize(docQuery)
    return docs.filter((d) => normalize(d.label).includes(q))
  }, [docs, docQuery])

  useEffect(() => {
    // เคลียร์สถานะขยาย/ค้นหาเมื่อผลค้นหาสั้นลงกว่าลิมิตอยู่แล้ว ไม่จำเป็นต้องรีเซ็ต expanded
  }, [docQuery])

  const showSearch = docs.length > DOCS_SEARCH_THRESHOLD
  const visibleDocs = expanded
    ? filteredDocs
    : filteredDocs.slice(0, DOCS_COLLAPSE_LIMIT)
  const hasMore = filteredDocs.length > DOCS_COLLAPSE_LIMIT

  return (
    <div className="mt-2.5 pl-[22px]">
      {showSearch && (
        <div className="mb-2 flex max-w-[280px] items-center gap-1.5 rounded-md border border-line bg-bg-soft px-2.5 py-1.5">
          <i className="ti ti-search text-[12px] text-ink-soft" />
          <input
            value={docQuery}
            onChange={(e) => {
              setDocQuery(e.target.value)
              setExpanded(true)
            }}
            placeholder={`ค้นหาเอกสาร (${docs.length} ไฟล์)...`}
            className="w-full border-none bg-transparent text-[11.5px] outline-none"
          />
          {docQuery && (
            <button
              type="button"
              onClick={() => setDocQuery('')}
              className="flex h-4 w-4 items-center justify-center text-ink-soft"
            >
              <i className="ti ti-x text-[11px]" />
            </button>
          )}
        </div>
      )}

      {filteredDocs.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {visibleDocs.map((d, di) => (
            <a
              key={di}
              href={d.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 rounded-[20px] border border-blue-600 px-2.5 py-[3px] text-[11px] font-semibold text-blue-600 no-underline"
            >
              <i className="ti ti-file-text text-[11px]" />
              {d.label}
            </a>
          ))}
        </div>
      )}

      {filteredDocs.length === 0 && (
        <div className="text-[11px] text-ink-soft">ไม่พบเอกสารที่ค้นหา</div>
      )}

      {!expanded && hasMore && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-2 flex items-center gap-1 text-[11.5px] font-semibold text-blue-600"
        >
          <i className="ti ti-chevron-down text-[11px]" />
          แสดงทั้งหมด ({filteredDocs.length})
        </button>
      )}

      {expanded && docs.length > DOCS_COLLAPSE_LIMIT && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="mt-2 flex items-center gap-1 text-[11.5px] font-semibold text-blue-600"
        >
          <i className="ti ti-chevron-up text-[11px]" />
          ย่อรายการ
        </button>
      )}
    </div>
  )
}

export function PartnerDetailPage({ partner, onBack }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [zoomQr, setZoomQr] = useState(null) // เก็บ src ของรูป QR ที่กำลังขยายดู

  const subItems = partner?.subItems || []

  const filtered = useMemo(() => {
    if (!query) return subItems
    const q = normalize(query)
    return subItems.filter((s) => normalize(s.label).includes(q))
  }, [subItems, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

  useEffect(() => {
    setPage(1)
  }, [query, partner])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [totalPages, page])

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  if (!partner) {
    return (
      <div className="mx-auto max-w-[900px] px-4 py-8 sm:px-6 sm:py-10">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-semibold text-blue-600"
        >
          <i className="ti ti-arrow-left" />
          กลับหน้าแรก
        </button>
        <p className="mt-4 text-sm text-ink-soft">
          ไม่พบข้อมูลหมวดหมู่ที่เลือก
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[900px] px-4 pb-16 pt-6 sm:px-6">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 text-[13px] font-semibold text-blue-600"
      >
        <i className="ti ti-arrow-left" />
        กลับหน้าแรก
      </button>

      <div className="mb-5 flex items-center gap-2.5">
        <i
          className={`ti ${partner.icon || 'ti-building'} text-2xl text-blue-600`}
        />
        <h1 className="text-lg font-bold text-navy-900">{partner.name}</h1>

        <span className="rounded-[20px] bg-blue-600 px-2.5 py-0.5 font-mono text-[11px] font-bold text-white">
          {subItems.length}
        </span>
      </div>

      {subItems.length > 6 && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2">
          <i className="ti ti-search text-ink-soft" />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาชื่อบริษัท / โรงแรม..."
            className="w-full border-none text-[13px] outline-none"
          />
        </div>
      )}

      {filtered.length > 0 && (
        <div className="mb-3 flex items-center justify-between text-[11.5px] text-ink-soft">
          <span>
            พบ {filtered.length} รายการ · หน้า {page}/{totalPages}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2.5">
        {paged.map((s, idx) => {
          const docs = buildDocs(s)
          const expired = isExpired(s.expiry)

          return (
            <div
              key={idx}
              className="relative rounded-md border border-line bg-white px-4 py-3"
            >
              {s.qr && (
                <button
                  type="button"
                  onClick={() => setZoomQr(s.qr)}
                  className="absolute right-3 top-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line bg-white p-1 shadow-sm"
                  title="คลิกเพื่อขยาย Barcode/QR Code"
                >
                  <img
                    src={getFileUrl(s.qr)}
                    alt={`Barcode/QR - ${s.label}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              )}

              <div
                className={`flex items-start gap-2 text-[13px] font-semibold ${
                  s.qr ? 'pr-14' : ''
                } ${expired ? 'text-red-700' : 'text-navy-900'}`}
              >
                <i
                  className={`ti ${
                    expired ? 'ti-alert-triangle' : 'ti-building'
                  } mt-[2px] text-sm ${
                    expired ? 'text-red-600' : 'text-blue-600'
                  }`}
                />
                <span className="min-w-0 flex-1 break-words leading-snug">
                  {s.label}
                  {expired && (
                    <span className="ml-2 rounded-[20px] bg-red-600 px-2 py-[1px] text-[10px] font-bold text-white">
                      หมดอายุ
                    </span>
                  )}
                </span>
              </div>

              {(s.expiry || s.payorCode || s.contact) && (
                <div className="mt-1.5 pl-[22px]">
                  <div className="text-[11.5px] leading-relaxed text-ink-soft">
                    {s.expiry && <div>{s.expiry}</div>}
                    {s.payorCode && (
                      <div>Payor Code : {s.payorCode}</div>
                    )}
                    {s.contact && (
                      <div className="whitespace-pre-line">
                        กรณีมีปัญหาติดต่อ {renderTextWithLinks(s.contact)}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {docs.length > 0 && <DocsList docs={docs} />}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="py-10 text-center text-[13px] text-ink-soft">
            ไม่พบรายการที่ค้นหา
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-ink-soft disabled:opacity-40"
          >
            <i className="ti ti-chevron-left text-sm" />
          </button>

          <span className="px-2 text-[12px] font-semibold text-navy-900">
            {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-ink-soft disabled:opacity-40"
          >
            <i className="ti ti-chevron-right text-sm" />
          </button>
        </div>
      )}

      {/* Modal ขยายดู QR Code */}
      {zoomQr && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-6"
          onClick={() => setZoomQr(null)}
        >
          <div
            className="max-w-[90vw] rounded-lg bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex justify-end">
              <button
                onClick={() => setZoomQr(null)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-ink-soft hover:bg-line/50"
              >
                <i className="ti ti-x text-base" />
              </button>
            </div>
            <img
              src={getFileUrl(zoomQr)}
              alt="QR Code ขยาย"
              className="max-h-[70vh] w-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
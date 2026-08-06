import { useState } from 'react'
import { buildDocs } from './PartnerList'

export function PartnerDetailPage({ partner, onBack }) {
  const [query, setQuery] = useState('')

  if (!partner) {
    return (
      <div className="mx-auto max-w-[900px] px-6 py-10">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-semibold text-blue-600">
          <i className="ti ti-arrow-left" />กลับหน้าแรก
        </button>
        <p className="mt-4 text-sm text-ink-soft">ไม่พบข้อมูลหมวดหมู่ที่เลือก</p>
      </div>
    )
  }

  const subItems = partner.subItems || []
  const filtered = query
    ? subItems.filter((s) => (s.label || '').toLowerCase().includes(query.toLowerCase()))
    : subItems

  return (
    <div className="mx-auto max-w-[900px] px-6 pb-16 pt-6">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 text-[13px] font-semibold text-blue-600"
      >
        <i className="ti ti-arrow-left" />กลับหน้าแรก
      </button>

      <div className="mb-5 flex items-center gap-2.5">
        <i className={`ti ${partner.icon || 'ti-building'} text-2xl text-blue-600`} />
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

      <div className="flex flex-col gap-2.5">
        {filtered.map((s, idx) => {
          const docs = buildDocs(s)
          return (
            <div key={idx} className="rounded-md border border-line bg-white px-4 py-3">
              <div className="flex items-start gap-2 text-[13px] font-semibold text-navy-900">
                <i className="ti ti-building mt-[2px] text-sm text-blue-600" />
                <span className="flex-1 leading-snug">{s.label}</span>
              </div>

              {(s.expiry || s.payorCode || s.contact) && (
                <div className="mt-1.5 pl-[22px] text-[11.5px] leading-relaxed text-ink-soft">
                  {s.expiry && <div>{s.expiry}</div>}
                  {s.payorCode && <div>Payor Code : {s.payorCode}</div>}
                  {s.contact && (
                    <div className="whitespace-pre-line">กรณีมีปัญหาติดต่อ {s.contact}</div>
                  )}
                </div>
              )}

              {docs.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5 pl-[22px]">
                  {docs.map((d, di) => (
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
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="py-10 text-center text-[13px] text-ink-soft">ไม่พบรายการที่ค้นหา</div>
        )}
      </div>
    </div>
  )
}
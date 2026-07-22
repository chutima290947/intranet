import { useState } from 'react'
import { PARTNERS } from '../../config/data'

export function PartnerList() {
  const [tab, setTab] = useState('ทั้งหมด')
  const [expanded, setExpanded] = useState(false)
  const tabs = ['ทั้งหมด']
  const visible = expanded ? PARTNERS : PARTNERS.slice(0, 4)

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white" id="sec-partner" data-card>
      <div className="flex items-center justify-between border-b border-line px-[18px] py-3.5">
        <div className="flex items-center gap-[9px]">
          <i className="ti ti-building text-blue-600" style={{ fontSize: 15 }} />
          <h3 className="text-[13px] font-bold text-navy-900">รายชื่อลูกค้าบริษัทคู่สัญญา</h3>
          <span className="rounded-[20px] bg-blue-600 px-2.5 py-0.5 font-mono text-[10px] font-bold text-white">{PARTNERS.length}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 overflow-x-auto border-b border-line px-[15px] py-[11px]">
        {tabs.map(t => (
          <div
            key={t}
            className={`flex-shrink-0 rounded-[20px] border px-3 py-[5px] text-[11px] font-semibold ${
              tab === t ? 'border-blue-600 bg-blue-600 text-white' : 'border-line bg-white text-ink-soft'
            }`}
            onClick={() => setTab(t)}
          >
            {t}
          </div>
        ))}
      </div>
      <div className="py-1">
        {visible.map(p => (
          <div className="flex items-center justify-between border-b border-line px-[18px] py-2.5 last:border-b-0" key={p.name}>
            <div className="flex items-center gap-[9px] text-xs font-semibold">
              <i className="ti ti-building text-sm text-ink-soft" />{p.name}
            </div>
          </div>
        ))}
      </div>
      <div className="px-[18px] py-[11px] text-center">
        <a
          href="#"
          className="flex items-center justify-center gap-1 text-[11px] font-semibold text-blue-600 no-underline"
          onClick={(e) => { e.preventDefault(); setExpanded(!expanded) }}
        >
          <i className={`ti ${expanded ? 'ti-chevron-up' : 'ti-chevron-down'}`} />
          <span>{expanded ? 'ย่อรายการ' : `ดูเพิ่มเติม ${PARTNERS.length - 4} รายการ`}</span>
        </a>
      </div>
    </div>
  )
}

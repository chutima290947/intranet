import { useState } from 'react'
import { guessIcon } from '../../utils/guessIcon'

// Section แบบการ์ดพับ/กางเดียว ใช้กับ custom sections ที่เลือกเทมเพลต "expandable"
// section.sub: คำอธิบายรองใต้ชื่อ (เช่น "กลุ่ม 6")
// item แต่ละอัน: { text, icon, href }
export function GenericExpandableSection({ section }) {
  const [open, setOpen] = useState(false)
  const items = section.items || []

  return (
    <div
      className="cursor-pointer rounded-lg border border-line bg-white p-[17px]"
      data-card
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-start justify-between">
        <div>
          <div
            className="mb-[11px] flex h-[38px] w-[38px] items-center justify-center rounded-[10px]"
            style={{ background: section.color }}
          >
            <i className={`ti ${section.icon} text-lg text-white`} />
          </div>
          <h3 className="text-[13px] font-bold text-navy-900">{section.label}</h3>
          {section.sub && <p className="mt-px text-[11px] text-ink-soft">{section.sub}</p>}
        </div>
        <i
          className={`ti ti-chevron-down text-[15px] text-ink-soft transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>
      <div className={`mt-2.5 border-t border-line pt-2.5 ${open ? 'block' : 'hidden'}`}>
        {items.map((item, i) => {
          const icon = item.icon || guessIcon(item.text)
          const content = (
            <>
              <i className="text-[13px] text-blue-600" style={{ color: section.color }}>
                <i className={`ti ${icon}`} />
              </i>
              {item.text}
            </>
          )
          return item.href ? (
            <a
              key={i}
              href={item.href}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 border-b border-line py-2 text-[11px] no-underline last:border-b-0"
            >
              {content}
            </a>
          ) : (
            <div key={i} className="flex items-center gap-2 border-b border-line py-2 text-[11px] last:border-b-0">
              {content}
            </div>
          )
        })}
        {items.length === 0 && <p className="py-3 text-center text-[11px] text-ink-soft">ยังไม่มีรายการ</p>}
      </div>
    </div>
  )
}
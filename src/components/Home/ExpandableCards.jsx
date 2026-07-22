import { useState } from 'react'

export function ExpandableCards() {
  const [open, setOpen] = useState(null)
  const toggle = (key) => setOpen(open === key ? null : key)
  return (
    <div className="flex flex-col gap-3.5">
      <div
        className="cursor-pointer rounded-lg border border-line bg-white p-[17px]"
        id="sec-finance"
        data-card
        onClick={() => toggle('a')}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-[11px] flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-blue-tint">
              <i className="ti ti-cash text-lg text-blue-600" />
            </div>
            <h3 className="text-[13px] font-bold text-navy-900">การมอบหมายอำนาจการเงิน</h3>
            <p className="mt-px text-[11px] text-ink-soft">กลุ่ม 6</p>
          </div>
          <i className={`ti ti-chevron-down text-[15px] text-ink-soft transition-transform duration-200 ${open === 'a' ? 'rotate-180' : ''}`} />
        </div>
        <div className={`mt-2.5 border-t border-line pt-2.5 ${open === 'a' ? 'block' : 'hidden'}`}>
          <div className="flex items-center gap-2 border-b border-line py-2 text-[11px] last:border-b-0">
            <i className="ti ti-file text-[13px] text-blue-600" />คำสั่ง CEO G6 ที่ สน.ผบ. 021/2568 เรื่องการมอบหมายอำนาจดำเนินการทางการเงินของรพ.กลุ่ม 6
          </div>
          <div className="flex items-center gap-2 border-b border-line py-2 text-[11px] last:border-b-0">
            <i className="ti ti-file text-[13px] text-blue-600" />คำสั่ง CEO G6 ที่ สน.ผบ. 006/2568 เรื่องอำนาจการอนุมัติส่วนลดของบริษัทคู่สัญญา และผู้ป่วย กลุ่ม 6
          </div>
          <div className="flex items-center gap-2 border-b border-line py-2 text-[11px] last:border-b-0">
            <i className="ti ti-table text-[13px] text-blue-600" />ตารางอำนาจอนุมัติดำเนินการทางการเงิน ลวท.1 พฤษภาคม 2568
          </div>
          <div className="flex items-center gap-2 border-b border-line py-2 text-[11px] last:border-b-0">
            <i className="ti ti-file text-[13px] text-blue-600" />แนวทางการเสนอหนังสือเพื่อขออนุมัติ
          </div>
        </div>
      </div>
      <div
        className="cursor-pointer rounded-lg border border-line bg-white p-[17px]"
        id="sec-template"
        data-card
        onClick={() => toggle('b')}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-[11px] flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-blue-tint">
              <i className="ti ti-presentation text-lg text-blue-600" />
            </div>
            <h3 className="text-[13px] font-bold text-navy-900">Template Powerpoint</h3>
            <p className="mt-px text-[11px] text-ink-soft">Re-branding template</p>
          </div>
          <i className={`ti ti-chevron-down text-[15px] text-ink-soft transition-transform duration-200 ${open === 'b' ? 'rotate-180' : ''}`} />
        </div>
        <div className={`mt-2.5 border-t border-line pt-2.5 ${open === 'b' ? 'block' : 'hidden'}`}>
          <select onClick={(e) => e.stopPropagation()} className="w-full rounded-xs border border-line px-[9px] py-2 text-xs">
            <option>เลือกดูรายการ...</option>
            <option>Bangkok Siriroj presentation 1</option>
            <option>Bangkok Siriroj presentation 2</option>
            <option>Bangkok Siriroj presentation 3</option>
            <option>Bangkok Siriroj presentation 4</option>
          </select>
        </div>
      </div>
    </div>
  )
}

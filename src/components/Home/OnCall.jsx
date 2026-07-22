import { ONCALL, NEWS } from '../../config/data'

export function OnCall() {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white" id="sec-oncall" data-card>
      <div className="flex items-center gap-2 border-b border-line px-[18px] py-[13px]">
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-violet-tint">
          <i className="ti ti-user-shield text-violet" />
        </div>
        <h3 className="text-[13px] font-bold text-navy-900">ตารางเวรผู้บริหาร / พยาบาล</h3>
      </div>
      <div className="px-[18px] py-4">
        <div className="grid grid-cols-3 gap-2.5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {ONCALL.map(o => (
            <div className="flex items-center gap-2.5 rounded-md border border-line bg-white px-[13px] py-[11px] text-xs font-bold" key={o.label}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-tint">
                <i className={`ti ${o.icon} text-blue-600`} />
              </div>
              {o.label}
            </div>
          ))}
        </div>
        <div className="mt-[18px] mb-3.5 h-px bg-line" />
        <div className="mb-2.5 flex items-center gap-2 text-[12.5px] font-bold text-navy-900" id="sec-nursing">
          <i className="ti ti-news text-base text-teal" />ข่าวประชาสัมพันธ์พยาบาล
        </div>
        <div className="flex flex-col">
          {NEWS.map(n => (
            <div className="flex items-start gap-2.5 border-b border-line py-2.5 last:border-b-0" key={n.title}>
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-teal-tint">
                <i className={`ti ${n.icon} text-sm text-teal`} />
              </div>
              <div>
                <div className="text-xs font-bold text-navy-900">{n.title}</div>
                <div className="mt-px text-[10px] text-ink-soft">{n.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { QUALITY } from '../../config/data'

export function QualityCenter() {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white" id="sec-quality" data-card>
      <div className="flex items-center gap-2 border-b border-line px-[18px] py-[13px]">
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-teal-tint">
          <i className="ti ti-shield-check text-teal" />
        </div>
        <h3 className="text-[13px] font-bold text-navy-900">ศูนย์รวมระบบคุณภาพและความปลอดภัย</h3>
      </div>
      <div className="px-[18px] py-4">
        <div className="grid grid-cols-3 gap-[9px] max-[560px]:grid-cols-2">
          {QUALITY.map(q => (
            <div className="flex flex-col items-center gap-[7px] rounded-md border border-line px-2 py-3 text-center" key={q.label}>
              <div className={`flex h-[38px] w-[38px] items-center justify-center rounded-[10px] ${q.warn ? 'bg-coral-tint' : 'bg-teal-tint'}`}>
                <i className={`ti ${q.icon} text-lg ${q.warn ? 'text-coral' : 'text-teal'}`} />
              </div>
              <span className="text-[10px] leading-[1.3] font-semibold">{q.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

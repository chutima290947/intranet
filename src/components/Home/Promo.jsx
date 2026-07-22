import { PROMOS } from '../../config/data'

export function Promo() {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white" id="sec-promo" data-card>
      <div className="flex items-center gap-2 border-b border-line px-[18px] py-[13px]">
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-coral-tint">
          <i className="ti ti-star text-coral" />
        </div>
        <h3 className="text-[13px] font-bold text-navy-900">โปรโมชันและแพ็กเกจสุขภาพ</h3>
      </div>
      <div className="px-[18px] py-4">
        <div className="grid grid-cols-4 gap-[11px] max-[1100px]:grid-cols-3 max-[560px]:grid-cols-2">
          {PROMOS.map(p => (
            <div className="overflow-hidden rounded-md border border-line" key={p.name}>
              <div
                className="flex h-[92px] w-full items-center justify-center"
                style={
                  p.img
                    ? { backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : { background: `linear-gradient(135deg, ${p.color}, var(--color-blue-500))` }
                }
              >
                {!p.img && <i className={`ti ${p.icon} text-[34px] text-white/85`} />}
              </div>
              <span className="relative top-0 left-0 m-1.5 inline-block rounded-[20px] px-2.5 py-[3px] text-[8px] font-bold text-white" style={{ background: p.color }}>{p.tag}</span>
              <div className="bg-white px-[9px] py-2 text-[10.5px] leading-[1.35] font-bold text-navy-900">{p.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

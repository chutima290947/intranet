import { useState } from 'react'
import { DIVISIONS } from '../../config/data'

export function DivisionGrid() {
  const [active, setActive] = useState(null)

  return (
    <div className="mx-auto max-w-[1680px] px-8 pb-[60px] pt-[22px]">
      <div className="mb-5">
        <h2 className="font-display text-2xl font-semibold text-ink">Division</h2>
        <p className="mt-1 text-sm text-ink-soft">เลือกฝ่ายงานเพื่อดูรายละเอียดและทีมย่อยภายใน</p>
      </div>

      <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        {DIVISIONS.map(d => (
          <div
            key={d.id}
            data-card
            onClick={() => setActive(d)}
            className="cursor-pointer overflow-hidden rounded-md border border-line bg-white transition-transform duration-150 hover:-translate-y-1 hover:shadow-lg"
          >
          <div
            className="flex h-[76px] items-center justify-center bg-cover bg-center"
            style={
              d.img
                ? { backgroundImage: `url(${d.img})` }
                : { background: `linear-gradient(135deg, ${d.gradient[0]}, ${d.gradient[1]})` }
            }
          >
            {!d.img && <i className={`ti ${d.icon} text-[28px] text-white`} />}
          </div>
            <div className="p-[18px]">
              <h3 className="mb-1.5 text-[14.5px] font-bold text-ink">{d.name}</h3>
              <p className="mb-3 text-xs leading-relaxed text-ink-soft">{d.desc}</p>
              <span className="inline-flex items-center gap-1.5 rounded-3xl bg-blue-tint px-2.5 py-1 text-[11.5px] font-semibold text-blue-600">
                <i className="ti ti-phone text-xs" />{d.phone}
              </span>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-5"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-[360px] max-h-[85vh] overflow-y-auto rounded-md bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 border-none"
            >
              <i className="ti ti-x text-[15px] text-ink" />
            </button>
            <div
              className="flex h-16 items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${active.gradient[0]}, ${active.gradient[1]})` }}
            >
              <i className={`ti ${active.icon} text-2xl text-white`} />
            </div>
            <div className="p-[18px]">
              <h3 className="mb-1.5 text-[15px] font-bold text-ink">{active.name}</h3>
              <p className="mb-3.5 text-[12.5px] leading-relaxed text-ink-soft">{active.desc}</p>

              {active.subItems?.length > 0 && (
                <>
                  <div className="mb-2 text-[10.5px] font-bold uppercase tracking-wide text-ink-soft">
                    ทีมย่อยภายในฝ่าย
                  </div>
                  <div
                    className={
                      active.subItems.length > 4
                        ? 'mb-3.5 grid grid-cols-2 gap-1.5'
                        : 'mb-3.5 flex flex-col gap-1.5'
                    }
                  >
                    {active.subItems.map(s => (
                      <div key={s.label} className="flex items-center gap-2 rounded-lg bg-paper px-2.5 py-2">
                        <i className={`ti ${s.icon} text-sm text-blue-600 shrink-0`} />
                        <span className="text-[12px] leading-tight text-ink">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <span className="inline-flex items-center gap-1.5 rounded-3xl bg-blue-tint px-2.5 py-1 text-[11.5px] font-semibold text-blue-600">
                <i className="ti ti-phone text-xs" />{active.phone}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
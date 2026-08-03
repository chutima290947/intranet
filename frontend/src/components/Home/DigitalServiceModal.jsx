import { useState, useEffect } from 'react'

export function DigitalServiceModal({ service, onClose }) {
  const groups = service && service.groups ? service.groups : []
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    setActiveIdx(0)
  }, [service])

  if (!service) return null

  const activeGroup = groups[activeIdx]

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[82vh] w-full max-w-[480px] flex-col overflow-hidden rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-[18px] py-[13px]">
          <div className="flex items-center gap-2">
            <div
              className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px]"
              style={{ background: service.color }}
            >
              <i className={"ti " + service.icon + " text-[13px] text-white"} />
            </div>
            <h3 className="text-[13px] font-bold text-navy-900">{service.label}</h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-blue-50"
          >
            <i className="ti ti-x text-[16px]" />
          </button>
        </div>

        <div className="flex gap-1.5 overflow-x-auto border-b border-line px-[14px] py-2.5">
          {groups.map((g, i) => {
            const isActive = i === activeIdx
            return (
              <button
                key={g.title}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={
                  "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-[7px] text-[11.5px] font-semibold transition-colors " +
                  (isActive
                    ? "bg-navy-900 text-white"
                    : "bg-blue-50/60 text-navy-900 hover:bg-blue-50")
                }
              >
                <i className={"ti " + (g.icon ? g.icon : "ti-folder") + " text-[13px]"} />
                {g.title}
              </button>
            )
          })}
        </div>

        <div className="overflow-y-auto">
          <div className="divide-y divide-line">
            {activeGroup && activeGroup.items.map((item, i) => (
              <a
                key={i}
                href={item.href ? item.href : "#"}
                className="flex items-center gap-3 px-[18px] py-3 no-underline transition-colors hover:bg-blue-50/60"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-blue-100">
                  <i className={"ti " + (item.icon ? item.icon : "ti-file-text") + " text-[16px] text-blue-600"} />
                </div>
                <span className="text-[12.5px] font-medium leading-snug text-navy-900">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

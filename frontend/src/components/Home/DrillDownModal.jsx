import { useState, useEffect } from 'react'

export function DrillDownModal({ service, onClose }) {
  const rootItems = service && service.tree ? service.tree : []
  const [stack, setStack] = useState([])

  useEffect(() => {
    setStack([])
  }, [service])

  if (!service) return null

  const currentItems = stack.length === 0 ? rootItems : stack[stack.length - 1].items

  const enter = (node) => {
    if (node.children && node.children.length > 0) {
      setStack([...stack, { label: node.label, items: node.children }])
    }
  }

  const goBack = () => {
    setStack(stack.slice(0, -1))
  }

  const goToCrumb = (index) => {
    if (index < 0) {
      setStack([])
    } else {
      setStack(stack.slice(0, index + 1))
    }
  }

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

        {stack.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto border-b border-line bg-blue-50/40 px-[14px] py-2 text-[11px] font-semibold text-ink-soft">
            <button
              type="button"
              onClick={goBack}
              className="flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1 text-blue-600 hover:bg-blue-50"
            >
              <i className="ti ti-chevron-left text-[13px]" />
              ย้อนกลับ
            </button>
            <span className="shrink-0 text-line">|</span>
            <button
              type="button"
              onClick={() => goToCrumb(-1)}
              className="shrink-0 rounded px-1 hover:bg-blue-50 hover:text-blue-600"
            >
              {service.label}
            </button>
            {stack.map((s, i) => (
              <span key={i} className="flex shrink-0 items-center gap-1.5">
                <i className="ti ti-chevron-right text-[10px]" />
                <button
                  type="button"
                  onClick={() => goToCrumb(i)}
                  className="shrink-0 rounded px-1 hover:bg-blue-50 hover:text-blue-600"
                >
                  {s.label}
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="overflow-y-auto">
          <div className="divide-y divide-line">
            {currentItems.map((node, i) => {
              const hasChildren = node.children && node.children.length > 0
              const iconClass = "ti " + (node.icon ? node.icon : "ti-file-text") + " text-[16px] text-blue-600"

              if (hasChildren) {
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => enter(node)}
                    className="flex w-full items-center gap-3 px-[18px] py-3 text-left transition-colors hover:bg-blue-50/60"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-blue-100">
                      <i className={iconClass} />
                    </div>
                    <span className="flex-1 text-[12.5px] font-medium leading-snug text-navy-900">{node.label}</span>
                    <i className="ti ti-chevron-right text-[14px] text-ink-soft" />
                  </button>
                )
              }

              return (
                <a
                  key={i}
                  href={node.href ? node.href : "#"}
                  className="flex items-center gap-3 px-[18px] py-3 no-underline transition-colors hover:bg-blue-50/60"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-blue-100">
                    <i className={iconClass} />
                  </div>
                  <span className="text-[12.5px] font-medium leading-snug text-navy-900">{node.label}</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

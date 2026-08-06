import { useContent } from '../../context/ContentContext'

export function DigitalServices({ onOpenService }) {
  const { content } = useContent()
  const DIGITAL_SERVICES = content.DIGITAL_SERVICES

  const handleClick = (s) => {
    if ((s.groups && s.groups.length > 0) || (s.tree && s.tree.length > 0)) {
      onOpenService(s)
    }
  }

  return (
    <div id="sec-digital">
      <div className="mb-[11px] flex items-center justify-between">
        <div className="flex items-center gap-2 font-display text-sm font-semibold text-navy-900">
          <span className="h-[7px] w-[7px] rounded-full bg-coral" />Digital Services
        </div>
      </div>
      <div className="grid grid-cols-4 gap-[9px] max-[900px]:grid-cols-3 max-[560px]:grid-cols-2">
        {DIGITAL_SERVICES.map(s => (
          <button
            type="button"
            className="flex flex-col items-center gap-[7px] rounded-md border border-line bg-white px-1.5 py-3.5 text-center"
            key={s.label}
            onClick={() => handleClick(s)}
          >
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[11px]" style={{ background: s.color }}>
              <i className={"ti " + s.icon + " text-[19px] text-white"} />
            </div>
            <span className="text-[10px] font-semibold">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
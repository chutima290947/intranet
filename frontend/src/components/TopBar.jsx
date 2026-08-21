import { useContent } from '../context/ContentContext'

export function TopBar() {
  const { content } = useContent()
  return (
    <div className="flex flex-col items-center justify-between gap-1 bg-navy-950 px-3 py-1.5 text-[10.5px] text-white/[0.68] sm:flex-row sm:gap-0 sm:px-7 sm:py-[7px] sm:text-[11.5px]">
      <span className="flex items-center gap-1.5">
        <i className="ti ti-map-pin text-[13px] text-coral" />
        <span className="truncate">{content.SITE.location}</span>
      </span>
      <span className="flex items-center gap-1.5">
        <i className="ti ti-phone text-[13px] text-coral" />
        {content.SITE.hotlineLabel}
      </span>
    </div>
  )
}
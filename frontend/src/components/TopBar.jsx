import { useContent } from '../context/ContentContext'

export function TopBar() {
  const { content } = useContent()
  return (
    <div className="flex items-center justify-between bg-navy-950 px-7 py-[7px] text-[11.5px] text-white/[0.68]">
      <span className="flex items-center gap-1.5">
        <i className="ti ti-map-pin text-[13px] text-coral" />
        {content.SITE.location}
      </span>
      <span className="flex items-center gap-1.5">
        <i className="ti ti-phone text-[13px] text-coral" />
        {content.SITE.hotlineLabel}
      </span>
    </div>
  )
}

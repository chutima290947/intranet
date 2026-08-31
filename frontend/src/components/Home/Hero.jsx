import { useContent } from '../../context/ContentContext'
import heroImg from '../../assets/hero-building1.jpg'

export function Hero() {
  const { content } = useContent()

  return (
    <div
      className="relative min-h-[272px] overflow-hidden bg-gradient-to-tr from-navy-950 to-navy-800"
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(4,10,30,.82) 15%, rgba(9, 49, 124, 0.55) 100%), url(${heroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-[1] mx-auto flex max-w-[1680px] items-center px-[34px] py-9">
        <div>
          <div className="mb-3.5 flex items-center gap-2.5 text-[11px] font-bold tracking-[3px] text-white/50 uppercase">
            <span className="h-0.5 w-[26px] flex-shrink-0 rounded-sm bg-coral" />
            {content.SITE.orgName}
          </div>
          <div className="font-display text-[38px] leading-[1.08] font-semibold text-white">
            Intranet <em className="font-medium text-coral not-italic italic">System</em>
          </div>
          <div className="mt-3.5 max-w-[380px] text-[13px] leading-[1.65] text-white/60">
            {content.SITE.orgTag}
          </div>
        </div>
      </div>
    </div>
  )
}
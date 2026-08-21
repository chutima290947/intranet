import { forwardRef } from 'react'
import { useContent } from '../../context/ContentContext'

export const QuickNav = forwardRef(function QuickNav({ active, onNavClick }, ref) {
  const { content, customSections } = useContent()
  // รวม section เดิม (ในโค้ด) กับ custom sections (สร้างเองผ่านแอดมิน) เข้าเมนูเดียวกัน
  const SECTIONS = [...content.SECTIONS, ...customSections]

  return (
    <div
      className="sticky top-0 z-[200] flex flex-col items-center gap-2.5 border-b border-line bg-white/92 px-3 pt-3 pb-3 shadow-[0_2px_14px_rgba(11,40,80,.06)] backdrop-blur-md sm:px-6 sm:pt-4 sm:pb-3.5"
      ref={ref}
      onClick={onNavClick}
    >
      <div className="flex w-full flex-wrap justify-center gap-2.5 overflow-x-auto">
        {SECTIONS.map(s => {
          const isActive = active === s.id
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`inline-flex flex-shrink-0 items-center gap-[9px] rounded-[28px] border py-[7px] pr-4 pl-[7px] text-[12.5px] font-semibold whitespace-nowrap no-underline ${
                isActive
                  ? 'border-navy-900 bg-navy-900 text-white'
                  : 'border-line bg-white text-ink'
              }`}
            >
              <span
                className={`flex h-[27px] w-[27px] items-center justify-center rounded-full ${isActive ? 'bg-white/20!' : ''}`}
                style={isActive ? undefined : { background: s.color }}
              >
                <i className={`ti ${s.icon} text-[13px] text-white`} />
              </span>
              {s.label}
            </a>
          )
        })}
      </div>
    </div>
  )
})
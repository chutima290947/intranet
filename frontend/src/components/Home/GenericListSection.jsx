import { guessIcon } from '../../utils/guessIcon'

// Section แบบ list ทั่วไป ใช้กับ custom sections ที่สร้างผ่านหน้าแอดมิน
export function GenericListSection({ section }) {
  const items = section.items || []

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white" data-card>
      <div className="flex items-center gap-2 border-b border-line px-[18px] py-[13px]">
        <div
          className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px]"
          style={{ background: section.color }}
        >
          <i className={`ti ${section.icon} text-white`} />
        </div>
        <h3 className="text-[13px] font-bold text-navy-900">{section.label}</h3>
      </div>
      <div className="flex flex-col gap-2 px-[18px] py-4">
        {items.map((item, i) => {
          const href = item.href || item.file?.dataUrl
          const icon = item.icon || guessIcon(item.title)
          const content = (
            <>
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-blue-tint">
                <i className={`ti ${icon} text-lg text-blue-600`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-medium text-navy-900">{item.title}</p>
                {item.sub && <p className="mt-0.5 truncate text-xs text-ink-soft">{item.sub}</p>}
              </div>
              <i className="ti ti-chevron-right flex-shrink-0 text-base text-ink-soft/60" />
            </>
          )
          const rowClass =
            'flex items-center gap-3 rounded-md border border-line bg-white px-3.5 py-3 no-underline transition-colors hover:border-blue-500/40'

          return href ? (
            <a key={i} href={href} download={item.file?.name} className={rowClass}>
              {content}
            </a>
          ) : (
            <div key={i} className={rowClass}>
              {content}
            </div>
          )
        })}
        {items.length === 0 && (
          <p className="py-6 text-center text-[12px] text-ink-soft">ยังไม่มีรายการในหัวข้อนี้</p>
        )}
      </div>
    </div>
  )
}
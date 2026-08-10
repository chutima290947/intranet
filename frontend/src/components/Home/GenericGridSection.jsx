import { guessIcon } from '../../utils/guessIcon'

// Section แบบกริดไอคอน ใช้กับ custom sections ที่เลือกเทมเพลต "grid"
// item แต่ละอัน: { label, icon, warn, href }
// warn: true จะทำให้ไอคอนเปลี่ยนเป็นสีแดง/coral แทนสีของ section (ใช้เน้นรายการสำคัญ)
export function GenericGridSection({ section }) {
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
      <div className="px-[18px] py-4">
        <div
          className={`grid gap-[9px] ${
            items.length === 1
              ? 'grid-cols-1'
              : items.length === 2
              ? 'grid-cols-2'
              : 'grid-cols-3 max-[560px]:grid-cols-2'
          }`}
        >
          {items.map((item, i) => {
            const icon = item.icon || guessIcon(item.label)
            const inner = (
              <>
                <div
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px]"
                  style={{ background: item.warn ? 'var(--color-coral-tint)' : section.color + '22' }}
                >
                  <i
                    className={`ti ${icon} text-lg`}
                    style={{ color: item.warn ? 'var(--color-coral)' : section.color }}
                  />
                </div>
                <span className="text-[10px] leading-[1.3] font-semibold">{item.label}</span>
              </>
            )
            const cellClass =
              'flex flex-col items-center gap-[7px] rounded-md border border-line px-2 py-3 text-center'

            return item.href ? (
              <a key={i} href={item.href} className={cellClass + ' no-underline'}>
                {inner}
              </a>
            ) : (
              <div key={i} className={cellClass}>
                {inner}
              </div>
            )
          })}
        </div>
        {items.length === 0 && (
          <p className="col-span-full py-6 text-center text-[12px] text-ink-soft">ยังไม่มีรายการในหัวข้อนี้</p>
        )}
      </div>
    </div>
  )
}
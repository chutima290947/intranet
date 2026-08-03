import { useContent } from '../../context/ContentContext'

export function DoctorSchedulePage({ onBack }) {
  const { content } = useContent()
  const DOCTOR_LINKS = content.DOCTOR_LINKS

  return (
    <div className="mx-auto max-w-[1680px] px-8 pb-[60px] pt-[22px]">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 rounded-lg border-none bg-transparent text-[13px] font-medium text-blue-600"
      >
        <i className="ti ti-arrow-left text-base" />กลับหน้าหลัก
      </button>

      <div className="mb-5">
        <h2 className="font-display text-2xl font-semibold text-ink">ตารางแพทย์</h2>
        <p className="mt-1 text-sm text-ink-soft">เลือกหัวข้อเพื่อดูตารางหรือเอกสารที่เกี่ยวข้อง</p>
      </div>

      <div className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
        {DOCTOR_LINKS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-lg border border-line bg-white px-4 py-3.5 no-underline transition-colors hover:border-blue-500/40 hover:bg-blue-tint"
          >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-tint">
              <i className={`ti ${item.icon} text-base text-blue-600`} />
            </div>
            <span className="flex-1 text-[13px] leading-tight text-ink">{item.label}</span>
            <i className="ti ti-chevron-right flex-shrink-0 text-sm text-ink-soft/60" />
          </a>
        ))}
      </div>
    </div>
  )
}

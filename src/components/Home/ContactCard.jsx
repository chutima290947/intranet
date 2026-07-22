export function ContactCard() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-[#4A5568] px-[19px] py-[17px]" id="sec-contact" data-card>
      <div className="mb-[5px] text-[9px] font-bold tracking-[1.2px] text-white/50 uppercase">Contact Tools</div>
      <div className="mb-0.5 font-display text-base font-semibold text-white">ติดต่อภายใน</div>
      <div className="mb-[13px] text-[10.5px] leading-[1.5] text-white/55">หมายเลขโทรภายใน · สายด่วนแผนก </div>
      <div className="flex gap-2">
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xs border border-white/20 bg-white/[0.08] px-3 py-2 text-[11px] font-semibold text-white">
          <i className="ti ti-phone-call" />Extension No.
        </button>
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xs border border-white/20 bg-white/[0.08] px-3 py-2 text-[11px] font-semibold text-white">
          <i className="ti ti-stethoscope" />Hotline
        </button>
      </div>
    </div>
  )
}

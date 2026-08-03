export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-[1680px] px-8 py-10">
        <div className="grid grid-cols-[1.8fr_1fr_1fr] gap-10 max-[900px]:grid-cols-1">
          {/* Hospital info */}
          <div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-navy-900">
                BSR
              </div>
              <div>
                <div className="text-base font-semibold">โรงพยาบาลกรุงเทพสิริโรจน์</div>
                <div className="text-[11px] text-white/50">Bangkok Sirioj Hospital</div>
              </div>
            </div>
            <p className="mt-3 max-w-[420px] text-[12.5px] leading-[1.6] text-white/60">
              มุ่งมั่นให้บริการทางการแพทย์ที่มีคุณภาพมาตรฐานสากล ด้วยความใส่ใจและทีมแพทย์ผู้เชี่ยวชาญ
            </p>
          </div>

          {/* Services */}
          <div>
            <div className="mb-3 text-[13px] font-semibold">บริการ</div>
            <ul className="flex flex-col gap-2 text-[12.5px] text-white/60">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white/40" />
                ห้องฉุกเฉิน 24 ชม.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white/40" />
                นัดหมายแพทย์
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white/40" />
                ตรวจสุขภาพ
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white/40" />
                บริการผู้ป่วยใน
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="mb-3 text-[13px] font-semibold">ติดต่อ</div>
            <ul className="flex flex-col gap-2.5 text-[12.5px] text-white/60">
              <li className="flex items-start gap-2">
                <i className="ti ti-map-pin mt-[2px] text-[13px] text-white/40" />
                44 ถนนเฉลิมพระเกียรติ ร.9 ตำบลวิชิต อำเภอเมือง จังหวัดภูเก็ต 83000 
              </li>
              <li className="flex items-center gap-2">
                <i className="ti ti-phone text-[13px] text-white/40" />
                076 361 888 / 076 683 270
              </li>
              <li className="flex items-center gap-2">
                <i className="ti ti-mail text-[13px] text-white/40" />
                info.siriroj@bangkokhospital.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1680px] flex-col items-center justify-between gap-2 px-8 py-4 text-[11px] text-white/40 min-[600px]:flex-row">
          <span>© 2568 โรงพยาบาลกรุงเทพสิริโรจน์ - สงวนลิขสิทธิ์</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/70">
              Do not sell or share my personal info
            </a>
            <span>Hospital Information System v2.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
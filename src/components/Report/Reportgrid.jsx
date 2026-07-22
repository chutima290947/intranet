const REPORTS = [
  { id: 'bsi-room', name: 'BSI Room', icon: 'ti-door', from: '#2563eb', to: '#1e3a8a', glow: '37,99,235' },
  { id: 'admin-error', name: 'Administration Error', icon: 'ti-alert-triangle', from: '#e11d48', to: '#9f1239', glow: '225,29,72' },
  { id: 'idoctor', name: 'iDoctor', icon: 'ti-stethoscope', from: '#059669', to: '#065f46', glow: '5,150,105' },
  { id: 'death-cert', name: 'Death Cert', icon: 'ti-certificate', from: '#7c3aed', to: '#4c1d95', glow: '124,58,237' },
  { id: 'bed-management', name: 'Bed Management', icon: 'ti-bed', from: '#4338ca', to: '#312e81', glow: '67,56,202' },
  { id: 'lexicomp', name: 'Lexicomp', icon: 'ti-pill', from: '#0891b2', to: '#155e75', glow: '8,145,178' },
  { id: 'uptodate', name: 'UpToDate', icon: 'ti-refresh', from: '#ea580c', to: '#9a3412', glow: '234,88,12' },
]

export function ReportGrid() {
  return (
    <div className="mx-auto max-w-[1680px] px-8 pb-[70px] pt-[22px]">
      <div className="mb-10 flex items-start gap-3">
        <span className="mt-1 h-6 w-1 rounded-full bg-navy-900" />
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Report</h2>
          <p className="mt-1 text-sm text-ink-soft">เลือกระบบรายงานที่ต้องการเข้าใช้งาน</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-x-10 gap-y-14">
        {REPORTS.map((r) => (
          <a
            key={r.id}
            href="#"
            className="group flex w-[150px] flex-col items-center gap-3.5 no-underline"
          >
            <div
              className="flex h-[76px] w-[76px] items-center justify-center rounded-full transition-all duration-200 group-hover:-translate-y-1.5"
              style={{
                background: `linear-gradient(145deg, ${r.from}, ${r.to})`,
                boxShadow: `0 8px 20px -6px rgba(${r.glow},0.45)`,
              }}
            >
              <i className={`ti ${r.icon} text-[30px] text-white`} />
            </div>
            <span className="text-center text-[13.5px] font-semibold leading-snug text-ink transition-colors group-hover:text-blue-600">
              {r.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
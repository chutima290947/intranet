import { useMemo, useState } from 'react'

function getFileUrl(url) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url

  const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001`
  return `${API_URL}${url}`
}

function resolveLink(item) {
  if (item?.href) return item.href
  if (item?.file?.url) return getFileUrl(item.file.url)
  return null
}

// หน้ารายการย่อยของระบบ Online หนึ่งตัว (เช่น BSI eCoupon -> Sale, Cashier, Admin, Report ...)
// สไตล์การ์ดเดียวกับหน้าตารางแพทย์ (DoctorSchedulePage) เพื่อความสม่ำเสมอของ UI ทั้งเว็บ
export function RequestItemDetailPage({ item, onBack }) {
  const [search, setSearch] = useState('')

  const subItems = Array.isArray(item?.subItems) ? item.subItems : []

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    if (!keyword) return subItems
    return subItems.filter((s) => s.label?.toLowerCase().includes(keyword))
  }, [subItems, search])

  if (!item) {
    return (
      <div className="min-h-screen bg-[#f6f8fc]">
        <div className="mx-auto max-w-[1500px] px-5 py-16 text-center sm:px-8">
          <p className="text-sm text-slate-400">ไม่พบระบบนี้</p>
          <button
            type="button"
            onClick={onBack}
            className="mt-3 border-none bg-transparent text-sm font-medium text-blue-600"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <div className="mx-auto max-w-[1500px] px-5 pb-16 pt-5 sm:px-8">
        {/* กลับหน้าหลัก */}
        <button
          type="button"
          onClick={onBack}
          className="mb-5 border-none bg-transparent p-0 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          กลับหน้าหลัก
        </button>

        {/* Header */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-800">{item.name}</h1>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-600">
                  {subItems.length} รายการ
                </span>
              </div>
              <p className="text-sm leading-6 text-slate-500">
                เลือกรายการเพื่อเปิดใช้งาน
              </p>
            </div>

            <div className="w-full md:max-w-sm">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`ค้นหาใน ${item.name}...`}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>
        </div>

        {/* Section title */}
        <div className="mb-3 flex items-center justify-between px-1">
          <div>
            <h2 className="text-sm font-semibold text-slate-700">รายการย่อย</h2>
            <p className="mt-0.5 text-xs text-slate-400">เลือกรายการเพื่อเปิดดูรายละเอียด</p>
          </div>
          {search && <span className="text-xs text-slate-400">พบ {filtered.length} รายการ</span>}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {filtered.map((sub, idx) => {
            const link = resolveLink(sub)
            return (
              <a
                key={sub.label || idx}
                href={link || '#'}
                {...(link && { target: '_blank', rel: 'noopener noreferrer' })}
                className="group flex min-h-[82px] items-center rounded-2xl border border-slate-200 bg-white px-4 py-4 no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:px-5"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold leading-5 text-slate-700 transition-colors group-hover:text-blue-700">
                    {sub.label}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">คลิกเพื่อเปิดรายการ</p>
                </div>
                <span className="ml-4 flex-shrink-0 text-xs font-medium text-slate-400 transition-colors group-hover:text-blue-600">
                  เปิด
                </span>
              </a>
            )
          })}
        </div>

        {/* ไม่พบข้อมูล */}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
            <h3 className="text-sm font-semibold text-slate-600">ไม่พบรายการ</h3>
            <p className="mt-1 text-xs text-slate-400">ลองค้นหาด้วยคำอื่น</p>
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-blue-600 shadow-sm hover:bg-blue-50"
              >
                ล้างการค้นหา
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
import { useMemo, useState } from 'react'
import { useContent } from '../../context/ContentContext'

function getFileUrl(url) {
  if (!url) return ''

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  const API_URL =
    import.meta.env.VITE_API_URL ||
    `http://${window.location.hostname}:3001`

  return `${API_URL}${url}`
}

function resolveLink(item) {
  if (item?.href) return item.href
  if (item?.file?.url) return getFileUrl(item.file.url)

  return null
}

export function DoctorSchedulePage({ onBack }) {
  const { content } = useContent()

  const DOCTOR_LINKS = content?.DOCTOR_LINKS || []

  const [openIdx, setOpenIdx] = useState(null)
  const [search, setSearch] = useState('')

  const filteredLinks = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    if (!keyword) return DOCTOR_LINKS

    return DOCTOR_LINKS.filter((item) => {
      const mainMatch = item.label?.toLowerCase().includes(keyword)

      const subMatch = Array.isArray(item.subItems)
        ? item.subItems.some((sub) =>
            sub.label?.toLowerCase().includes(keyword)
          )
        : false

      return mainMatch || subMatch
    })
  }, [DOCTOR_LINKS, search])

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
                <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                  ตารางแพทย์
                </h1>

                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-600">
                  {DOCTOR_LINKS.length} รายการ
                </span>
              </div>

              <p className="text-sm leading-6 text-slate-500">
                ค้นหาและเลือกตารางแพทย์ เอกสาร หรือลิงก์ที่เกี่ยวข้อง
              </p>
            </div>

            {/* Search */}
            <div className="w-full md:max-w-sm">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาตารางแพทย์..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

          </div>
        </div>

        {/* Section title */}
        <div className="mb-3 flex items-center justify-between px-1">
          <div>
            <h2 className="text-sm font-semibold text-slate-700">
              รายการตารางและเอกสาร
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              เลือกรายการเพื่อเปิดดูรายละเอียด
            </p>
          </div>

          {search && (
            <span className="text-xs text-slate-400">
              พบ {filteredLinks.length} รายการ
            </span>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">

          {filteredLinks.map((item, idx) => {
            const hasSubItems =
              Array.isArray(item.subItems) &&
              item.subItems.length > 0

            const link = resolveLink(item)
            const isOpen = openIdx === idx

            {/* มีรายการย่อย */}
            if (hasSubItems) {
              return (
                <div
                  key={item.label || idx}
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${
                    isOpen
                      ? 'border-blue-300 shadow-md shadow-blue-100/50 lg:col-span-2'
                      : 'border-slate-200 shadow-sm hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md'
                  }`}
                >

                  {/* หัวข้อ */}
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIdx(isOpen ? null : idx)
                    }
                    className="flex w-full items-center gap-4 border-none bg-transparent px-4 py-4 text-left sm:px-5"
                  >
                    <div className="min-w-0 flex-1">

                      <h3 className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-blue-700">
                        {item.label}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        มีเอกสารและลิงก์ที่เกี่ยวข้อง {item.subItems.length} รายการ
                      </p>

                    </div>

                    <span className="flex-shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                      {item.subItems.length} รายการ
                    </span>

                    <span
                      className={`flex-shrink-0 text-xs font-medium transition-colors ${
                        isOpen
                          ? 'text-blue-600'
                          : 'text-slate-400'
                      }`}
                    >
                      {isOpen ? 'ปิด' : 'ดูรายการ'}
                    </span>
                  </button>

                  {/* รายการย่อย */}
                  {isOpen && (
                    <div className="border-t border-slate-100 bg-slate-50/70 px-4 pb-4 pt-3 sm:px-5">

                      <div className="mb-2 px-1">
                        <span className="text-xs font-semibold text-slate-500">
                          รายการที่เกี่ยวข้อง
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">

                        {item.subItems.map((sub, subIdx) => {
                          const subLink = resolveLink(sub)

                          return (
                            <a
                              key={sub.label || subIdx}
                              href={subLink || '#'}
                              {...(subLink && {
                                target: '_blank',
                                rel: 'noopener noreferrer',
                              })}
                              className="group flex min-h-[64px] items-center rounded-xl border border-slate-200 bg-white px-4 py-3 no-underline transition-all hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-sm"
                            >
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium leading-5 text-slate-600 group-hover:text-blue-700">
                                  {sub.label}
                                </p>

                                {subLink && (
                                  <p className="mt-0.5 text-[10px] text-slate-400">
                                    คลิกเพื่อเปิดเอกสาร
                                  </p>
                                )}
                              </div>

                              <span className="ml-3 flex-shrink-0 text-xs text-slate-300 transition-colors group-hover:text-blue-500">
                                เปิด
                              </span>
                            </a>
                          )
                        })}

                      </div>
                    </div>
                  )}

                </div>
              )
            }

            {/* รายการปกติ */}
            return (
              <a
                key={item.label || idx}
                href={link || '#'}
                {...(link && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
                className="group flex min-h-[82px] items-center rounded-2xl border border-slate-200 bg-white px-4 py-4 no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:px-5"
              >

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold leading-5 text-slate-700 transition-colors group-hover:text-blue-700">
                    {item.label}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    คลิกเพื่อเปิดรายการ
                  </p>
                </div>

                <span className="ml-4 flex-shrink-0 text-xs font-medium text-slate-400 transition-colors group-hover:text-blue-600">
                  เปิด
                </span>

              </a>
            )
          })}

        </div>

        {/* ไม่พบข้อมูล */}
        {filteredLinks.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">

            <h3 className="text-sm font-semibold text-slate-600">
              ไม่พบรายการ
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              ลองค้นหาด้วยคำอื่น
            </p>

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
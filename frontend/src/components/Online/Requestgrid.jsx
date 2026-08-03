import { useState } from 'react'
import { useContent } from '../../context/ContentContext'

/**
 * RequestGrid — launcher-style grid page for staff-facing request/service apps.
 * ข้อมูลหมวดหมู่และรายการทั้งหมดดึงมาจาก content.REQUEST_CATEGORIES
 * (แก้ไขได้ผ่านแผงควบคุมเนื้อหา หมวด "ระบบ Online")
 *
 * โลโก้: ใช้ไฟล์รูปจาก src/assets/logos/ ถ้ามีไฟล์ชื่อตรงกับชื่อระบบ (slugify แล้ว)
 * ถ้าไม่มีไฟล์ จะ fallback ไปใช้ไอคอน Tabler (ตั้งค่าได้ในแผงควบคุม)
 */

const logoModules = import.meta.glob('../../assets/logos/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
})

const LOGOS = Object.fromEntries(
  Object.entries(logoModules).map(([path, url]) => {
    const filename = path.split('/').pop().replace(/\.(png|jpg|jpeg|svg|webp)$/i, '')
    return [filename, url]
  })
)

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9ก-๙]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function AppCard({ item, accent }) {
  const logoUrl = LOGOS[slugify(item.name)]

  return (
    <button
      data-card
      className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 text-center transition-colors hover:border-gray-300 hover:bg-gray-50"
    >
      {logoUrl ? (
        <span className="flex w-full flex-1 items-center justify-center">
          <img src={logoUrl} alt={item.name} className="h-full w-full object-contain" />
        </span>
      ) : (
        <span
          className="flex h-16 w-16 items-center justify-center rounded-2xl text-white"
          style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
        >
          <i className={`ti ${item.icon} text-2xl`} />
        </span>
      )}
      <span className="line-clamp-2 text-[12.5px] font-medium leading-snug text-gray-800">
        {item.name}
      </span>
    </button>
  )
}

function CategorySection({ category }) {
  const accent = { from: category.accentFrom, to: category.accentTo }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full text-white"
          style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
        >
          <i className={`ti ${category.icon} text-[13px]`} />
        </span>
        <h3 className="text-[14px] font-bold text-navy-900">{category.label}</h3>
        <span className="text-[11.5px] text-gray-400">{category.items.length} รายการ</span>
      </div>

      <div className="grid grid-cols-8 gap-3 max-[900px]:grid-cols-3 max-[560px]:grid-cols-2">
        {category.items.map((item) => (
          <AppCard key={item.name} item={item} accent={accent} />
        ))}
      </div>
    </section>
  )
}

export function RequestGrid({ searchQuery = '' }) {
  const { content } = useContent()
  const CATEGORIES = content.REQUEST_CATEGORIES
  const [query, setQuery] = useState(searchQuery)

  const filtered = CATEGORIES.map((category) => ({
    ...category,
    items: category.items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((category) => category.items.length > 0)

  return (
    <div className="mx-auto max-w-[1680px] px-8 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-[19px] font-bold text-navy-900">Request &amp; Services</h2>
          <p className="text-[13px] text-gray-500">ระบบและแบบฟอร์มออนไลน์ทั้งหมดของโรงพยาบาล</p>
        </div>
        <div className="relative w-full max-w-[280px]">
          <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาระบบ..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-[13px] outline-none focus:border-navy-900 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex flex-col gap-7">
        {filtered.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-[13px] text-gray-400">ไม่พบระบบที่ค้นหา</p>
        )}
      </div>
    </div>
  )
}

import { useState, useRef } from 'react'
import { useContent } from '../context/ContentContext'
import logo from '../assets/logo.png'

export function NavBar({ page, onNavigate, onSearch }) {
  const { content } = useContent()
  const { DIVISIONS, REPORTS, SITE } = content

  const [searchQuery, setSearchQuery] = useState('')
  const debounceRef = useRef(null)
  const [openMenu, setOpenMenu] = useState(null) // 'division' | 'report' | null
  const [expandedId, setExpandedId] = useState(null)

  const linkClass = (isActive) =>
    `flex items-center gap-[7px] whitespace-nowrap rounded-xs px-4 py-[11px] text-sm no-underline ${
      isActive ? 'bg-blue-tint font-bold text-blue-600' : 'font-medium text-ink hover:bg-paper'
    }`

  const runSearch = (value) => {
    if (onSearch) onSearch(value)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      runSearch(value)
    }, 300)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (debounceRef.current) clearTimeout(debounceRef.current)
      runSearch(searchQuery)
    }
    if (e.key === 'Escape') {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      setSearchQuery('')
      runSearch('')
    }
  }

  const handleClear = () => {
    setSearchQuery('')
    runSearch('')
  }

  // ---- Division ----
  const handleDivisionClick = (divisionId) => {
    setOpenMenu(null)
    setExpandedId(null)
    onNavigate('division', divisionId)
  }

  const handleSubItemClick = (s) => {
    setOpenMenu(null)
    setExpandedId(null)
    // TODO: เมื่อมี link ของแต่ละทีมย่อยแล้ว ให้ใช้ s.href หรือ s.url ตรงนี้
  }

  const toggleDivisionMenu = (e) => {
    e.preventDefault()
    onNavigate('division')
    setOpenMenu(openMenu === 'division' ? null : 'division')
    setExpandedId(null)
  }

  const handleHeaderClick = (d) => {
    if (d.subItems?.length > 0) {
      setExpandedId(expandedId === d.id ? null : d.id)
    } else {
      handleDivisionClick(d.id)
    }
  }

  // ---- Report ----
  const handleReportClick = (reportId) => {
    setOpenMenu(null)
    onNavigate('report', reportId)
  }

  const toggleReportMenu = (e) => {
    e.preventDefault()
    onNavigate('report')
    setOpenMenu(openMenu === 'report' ? null : 'report')
  }

  // ---- Shared ----
  const openSubMenu = (menu) => {
    setOpenMenu(menu)
  }

  const closeSubMenu = () => {
    setOpenMenu(null)
    setExpandedId(null)
  }

  return (
    <div className="relative flex h-20 items-center border-b border-line bg-white px-[34px] max-[900px]:h-auto max-[900px]:flex-wrap max-[900px]:gap-2.5 max-[900px]:px-5 max-[900px]:py-3">
      <div className="mr-6 flex flex-shrink-0 items-center gap-2.5">
        <img src={logo} alt={SITE.orgName} className="h-9 w-auto object-contain" />
      </div>

      <nav className="flex flex-1 gap-0.5 overflow-visible">
        <a href="#" className={linkClass(page === 'home')} onClick={(e) => { e.preventDefault(); onNavigate('home') }}>
          <i className="ti ti-home" /> HOME
        </a>

        {/* DIVISION + dropdown */}
        <div className="relative" onMouseEnter={() => openSubMenu('division')} onMouseLeave={closeSubMenu}>
          <a href="#" className={linkClass(page === 'division')} onClick={toggleDivisionMenu}>
            <i className="ti ti-layout-grid" /> DIVISION
            <i className={`ti ti-chevron-down text-[10px] transition-transform ${openMenu === 'division' ? 'rotate-180' : ''}`} />
          </a>

          {openMenu === 'division' && (
            <div className="absolute left-0 top-full z-40 w-[min(300px,calc(100vw-2rem))] rounded-md border border-line bg-white p-2 shadow-xl">
              <div className="flex flex-col gap-0.5">
                {DIVISIONS.map((d) => {
                  const hasSub = d.subItems?.length > 0
                  const isExpanded = expandedId === d.id
                  return (
                    <div key={d.id} className="rounded-md">
                      <button
                        type="button"
                        onClick={() => handleHeaderClick(d)}
                        className="flex w-full items-center gap-2 rounded-md border-none bg-transparent px-2 py-2 text-left cursor-pointer hover:bg-paper"
                      >
                        <i className={`ti ${d.icon} text-[15px] text-blue-600 shrink-0`} />
                        <span className="flex-1 text-[12.5px] font-bold text-ink">{d.name}</span>
                        {hasSub && (
                          <i
                            className={`ti ti-chevron-down text-[11px] text-ink-soft transition-transform ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                      </button>

                      {hasSub && isExpanded && (
                        <div className="ml-[29px] mb-1 flex flex-col gap-0.5 border-l border-line pl-2.5">
                          {d.subItems.map((s) => (
                            <button
                              key={s.label}
                              type="button"
                              onClick={() => handleSubItemClick(s)}
                              className="flex items-center gap-1.5 rounded-md border-none bg-transparent px-2 py-1.5 text-left cursor-pointer text-[11.5px] text-ink-soft hover:bg-paper hover:text-blue-600"
                            >
                              <i className={`ti ${s.icon} text-[12px] shrink-0`} />
                              {s.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* REPORT + dropdown */}
        <div className="relative" onMouseEnter={() => openSubMenu('report')} onMouseLeave={closeSubMenu}>
          <a href="#" className={linkClass(page === 'report')} onClick={toggleReportMenu}>
            <i className="ti ti-chart-bar" /> REPORT
            <i className={`ti ti-chevron-down text-[10px] transition-transform ${openMenu === 'report' ? 'rotate-180' : ''}`} />
          </a>

          {openMenu === 'report' && (
            <div className="absolute left-0 top-full z-40 w-[min(260px,calc(100vw-2rem))] rounded-md border border-line bg-white p-2 shadow-xl">
              <div className="flex flex-col gap-0.5">
                {REPORTS.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleReportClick(r.id)}
                    className="flex w-full items-center gap-2 rounded-md border-none bg-transparent px-2 py-2 text-left cursor-pointer hover:bg-paper"
                  >
                    <i className={`ti ${r.icon} text-[15px] shrink-0`} style={{ color: r.from }} />
                    <span className="text-[12.5px] font-bold text-ink">{r.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <a
          href="#"
          className={linkClass(page === 'online')}
          onClick={(e) => {
            e.preventDefault()
            setOpenMenu(null)
            onNavigate('online')
          }}
        >
          <i className="ti ti-device-desktop" /> ระบบ ONLINE
        </a>
      </nav>

      <div className="flex min-w-0 flex-1 items-center gap-[9px] rounded-3xl border border-line bg-paper px-[18px] py-2.5 max-[900px]:w-full max-[900px]:flex-none sm:min-w-[200px] sm:flex-none">
        <button
          type="button"
          onClick={() => runSearch(searchQuery)}
          className="flex items-center justify-center border-none bg-transparent p-0 cursor-pointer text-inherit"
          aria-label="ค้นหา"
        >
          <i className="ti ti-search" />
        </button>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full min-w-0 border-none bg-transparent font-body text-sm outline-none sm:w-[150px]"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center border-none bg-transparent p-0 cursor-pointer text-gray-400 hover:text-gray-600"
            aria-label="ล้างคำค้นหา"
          >
            <i className="ti ti-x" />
          </button>
        )}
      </div>
    </div>
  )
}
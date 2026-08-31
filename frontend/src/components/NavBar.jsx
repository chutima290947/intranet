import { useState, useRef } from 'react'
import { useContent } from '../context/ContentContext'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.png'

export function NavBar({ page, onNavigate, onSearch, onLoginSuccess }) {
  const { content } = useContent()
  const { DIVISIONS, REPORTS, SITE } = content
  const { login, logout, error, isAuthenticated } = useAuth()

  const [searchQuery, setSearchQuery] = useState('')
  const debounceRef = useRef(null)
  const [openMenu, setOpenMenu] = useState(null) // 'division' | 'report' | null
  const [expandedId, setExpandedId] = useState(null)

  // ---- Login widget (ไอคอนเล็กๆ ข้างช่องค้นหา -> กดแล้วเด้ง modal กลางจอ) ----
  const [loginOpen, setLoginOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // เคลียร์ username/password ทุกครั้งที่ปิด modal เพื่อไม่ให้ค่าเก่าค้าง
  const closeLoginModal = () => {
    setLoginOpen(false)
    setUsername('')
    setPassword('')
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const ok = await login(username, password)
    setIsSubmitting(false)
    if (ok) {
      setUsername('')
      setPassword('')
      setLoginOpen(false)
      onLoginSuccess?.()
    }
  }

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

      <div className="flex min-w-0 flex-1 items-center gap-[9px] rounded-3xl border border-line bg-paper px-[18px] py-2.5 max-[900px]:w-full max-[900px]:flex-none sm:min-w-[280px] sm:flex-none">
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
          className="w-full min-w-0 border-none bg-transparent font-body text-sm outline-none sm:w-[240px]"
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

      {/* ไอคอน Login เล็กๆ ข้างช่องค้นหา -> กดแล้วเด้ง modal กลางจอ
          ถ้า login อยู่แล้ว ไอคอนจะเปลี่ยนสี + modal แสดงทางลัดไปแผงควบคุมแทนฟอร์ม
          z-[9999] เพื่อให้อยู่เหนือ QuickNav (sticky z-[200]) ไม่งั้นแถบเมนูจะซ้อนทับบังฟอร์ม */}
      <div className="ml-2.5 flex-shrink-0">
        <button
          type="button"
          onClick={() => setLoginOpen(true)}
          aria-label={isAuthenticated ? 'บัญชีผู้ดูแลระบบ' : 'เข้าสู่ระบบผู้ดูแล'}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
            isAuthenticated
              ? 'border-teal/30 bg-teal/10 text-teal hover:bg-teal/15'
              : 'border-line bg-white text-ink-soft hover:bg-paper hover:text-blue-600'
          }`}
        >
          <i className={`ti ${isAuthenticated ? 'ti-shield-check' : 'ti-user-circle'} text-lg`} />
        </button>

        {loginOpen && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4"
            onClick={closeLoginModal}
          >
            <div
              className="w-full max-w-[420px] rounded-xl bg-white p-8 shadow-[0_20px_44px_rgba(4,16,36,.35)]"
              onClick={(e) => e.stopPropagation()}
            >
              {isAuthenticated ? (
                <div className="flex flex-col gap-3 text-center">
                  <button
                    type="button"
                    onClick={closeLoginModal}
                    aria-label="ปิด"
                    className="ml-auto rounded-xs border-none bg-transparent p-1 text-ink-soft hover:text-ink"
                  >
                    <i className="ti ti-x text-lg" />
                  </button>
                  <i className="ti ti-shield-check mx-auto text-3xl text-teal" />
                  <p className="text-[15px] font-semibold text-ink">เข้าสู่ระบบผู้ดูแลแล้ว</p>
                  <button
                    type="button"
                    onClick={() => {
                      closeLoginModal()
                      onLoginSuccess?.()
                    }}
                    className="rounded-md border-none bg-navy-900 p-3.5 text-[15px] font-bold text-white"
                  >
                    ไปที่แผงควบคุมเนื้อหา
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      logout()
                      closeLoginModal()
                    }}
                    className="rounded-md border border-line bg-white p-3 text-[13px] font-semibold text-ink-soft"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
                  <div className="mb-1 flex items-center justify-between text-[13px] font-bold tracking-wide text-ink-soft uppercase">
                    Login form<i className="ti ti-lock text-base text-coral" />
                    <button
                      type="button"
                      onClick={closeLoginModal}
                      aria-label="ปิด"
                      className="rounded-xs border-none bg-transparent p-1 text-ink-soft hover:text-ink"
                    >
                      <i className="ti ti-x text-lg" />
                    </button>
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="User Name"
                    autoComplete="off"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-md border border-line bg-paper px-4 py-3 text-[15px] focus:bg-white focus:outline-2 focus:outline-offset-1 focus:outline-blue-500"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-line bg-paper px-4 py-3 text-[15px] focus:bg-white focus:outline-2 focus:outline-offset-1 focus:outline-blue-500"
                  />
                  {error && <p className="text-[12px] font-semibold text-coral">{error}</p>}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-md border-none bg-coral p-3.5 text-[15px] font-bold text-white hover:bg-[#C13E27] disabled:opacity-60"
                  >
                    {isSubmitting ? 'กำลังเข้าสู่ระบบ...' : 'Login'}
                  </button>
                  <div className="text-[11px] text-ink-soft/60">* สำหรับเจ้าหน้าที่ผู้ดูแลระบบเท่านั้น</div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
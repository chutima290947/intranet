import { useState } from 'react'
import { ORG_NAME } from '../config/site'
import logo from '../assets/logo.png'

export function NavBar({ page, onNavigate, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('')

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
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      runSearch(searchQuery)
    }
    if (e.key === 'Escape') {
      setSearchQuery('')
      runSearch('')
    }
  }

  const handleClear = () => {
    setSearchQuery('')
    runSearch('')
  }

  return (
    <div className="flex h-20 items-center border-b border-line bg-white px-[34px] max-[900px]:h-auto max-[900px]:flex-wrap max-[900px]:gap-2.5 max-[900px]:px-5 max-[900px]:py-3">
      <div className="mr-6 flex flex-shrink-0 items-center gap-2.5">
        <img src={logo} alt={ORG_NAME} className="h-9 w-auto object-contain" />
      </div>
      <nav className="flex flex-1 gap-0.5 overflow-x-auto">
        <a href="#" className={linkClass(page === 'home')} onClick={(e) => { e.preventDefault(); onNavigate('home') }}>
          <i className="ti ti-home" /> HOME
        </a>
        <a href="#" className={linkClass(page === 'division')} onClick={(e) => { e.preventDefault(); onNavigate('division') }}>
          <i className="ti ti-layout-grid" /> DIVISION
        </a>
        <a href="#" className={linkClass(page === 'report')} onClick={(e) => { e.preventDefault(); onNavigate('report') }}>
          <i className="ti ti-chart-bar" /> REPORT
        </a>
        <a href="#" className={linkClass(false)}>
          <i className="ti ti-device-desktop" /> ระบบ ONLINE
        </a>
      </nav>
      <div className="flex min-w-[200px] items-center gap-[9px] rounded-3xl border border-line bg-paper px-[18px] py-2.5">
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
          className="w-[150px] border-none bg-transparent font-body text-sm outline-none"
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
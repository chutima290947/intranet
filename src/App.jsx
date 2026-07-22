import { useState, useEffect, useRef } from 'react'
import './index.css'

import { SECTIONS } from './config/data'

import { TopBar } from './components/TopBar'
import { NavBar } from './components/NavBar'
import { BackToTop } from './components/BackToTop'

import { Hero } from './components/Home/Hero'
import { StatsBar } from './components/Home/StatsBar'
import { QuickNav } from './components/Home/QuickNav'
import { Announcement } from './components/Home/Announcement'
import { DigitalServices } from './components/Home/DigitalServices'
import { NSystem } from './components/Home/NSystem'
import { OnCall } from './components/Home/OnCall'
import { Promo } from './components/Home/Promo'
import { ContactCard } from './components/Home/ContactCard'
import { QualityCenter } from './components/Home/QualityCenter'
import { PartnerList } from './components/Home/PartnerList'
import { UploadBox } from './components/Home/UploadBox'
import { ExpandableCards } from './components/Home/ExpandableCards'
import { DivisionGrid } from './components/Division/DivisionGrid'
import { ReportGrid } from './components/Report/Reportgrid'

export default function App() {
  const [page, setPage] = useState('home') // 'home' | 'division' | 'report'
  const [activeSection, setActiveSection] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const quicknavRef = useRef(null)

  useEffect(() => {
    if (page !== 'home') return
    const onScroll = () => {
      const offset = (quicknavRef.current?.offsetHeight || 0) + 20
      let current = ''
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= offset) current = s.id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [page])

  const handleQuickNavClick = (e) => {
    const link = e.target.closest('.qn-btn') || e.target.closest('a[href^="#"]')
    if (!link) return
    const id = link.getAttribute('href').slice(1)
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    const offset = (quicknavRef.current?.offsetHeight || 0) + 8
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    const focusEl = target.closest('[data-card]') || target
    focusEl.classList.add('section-focus')
    setTimeout(() => focusEl.classList.remove('section-focus'), 2000)
  }

  const goTo = (target) => {
    setPage(target)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // เลื่อนไป section ที่ตรงกับคำค้นหา (เฉพาะหน้า Home ตอนนี้)
  const scrollToSection = (id) => {
    const target = document.getElementById(id)
    if (!target) return
    const offset = (quicknavRef.current?.offsetHeight || 0) + 8
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    const focusEl = target.closest('[data-card]') || target
    focusEl.classList.add('section-focus')
    setTimeout(() => focusEl.classList.remove('section-focus'), 2000)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (!query) return

    if (page === 'home') {
      const match = SECTIONS.find((s) =>
        (s.label || s.title || s.name || '').toLowerCase().includes(query.toLowerCase())
      )
      if (match) scrollToSection(match.id)
    }
    // page === 'division' / 'report' -> ส่ง searchQuery ลงไปกรองใน component ด้านล่าง
  }

  return (
    <>
      <TopBar />
      <NavBar page={page} onNavigate={goTo} onSearch={handleSearch} />
      <Hero />
      <StatsBar />

      {page === 'home' && (
        <>
          <QuickNav ref={quicknavRef} active={activeSection} onNavClick={handleQuickNavClick} />

          <div className="mx-auto max-w-[1680px] px-8 pt-[22px] pb-[60px]">
            <div className="grid grid-cols-[1.65fr_1fr] gap-[18px] max-[1100px]:grid-cols-1">
              <div className="flex flex-col gap-4">
                <Announcement />
                <NSystem />
                <OnCall />
                <Promo />
                <UploadBox />
              </div>
              <div className="flex flex-col gap-3.5">
                <DigitalServices />
                <ContactCard />
                <a className="flex w-full items-center justify-center gap-[9px] rounded-lg border-none bg-navy-900 p-4 text-[13.5px] font-bold text-white no-underline" id="sec-doctor" data-card href="#">
                  <i className="ti ti-stethoscope text-[17px]" />ตารางแพทย์
                </a>
                <QualityCenter />
                <PartnerList />
                <ExpandableCards />
              </div>
            </div>
          </div>
        </>
      )}

      {page === 'division' && <DivisionGrid searchQuery={searchQuery} />}

      {page === 'report' && <ReportGrid searchQuery={searchQuery} />}

      <BackToTop />
    </>
  )
}
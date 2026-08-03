import { useState, useEffect } from 'react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`fixed right-7 bottom-7 z-[300] flex h-[46px] w-[46px] items-center justify-center rounded-full border-none bg-navy-900 text-white shadow-[0_8px_20px_rgba(8,27,51,.28)] transition-[opacity,transform,background,visibility] duration-[250ms] ease-out hover:bg-coral max-[560px]:right-[18px] max-[560px]:bottom-[18px] max-[560px]:h-[42px] max-[560px]:w-[42px] ${
        visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0'
      }`}
      onClick={scrollToTop}
      aria-label="เลื่อนขึ้นด้านบน"
    >
      <i className="ti ti-arrow-up text-xl max-[560px]:text-[18px]" />
    </button>
  )
}

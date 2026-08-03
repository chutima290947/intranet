import { useState } from 'react'
import { useContent } from '../../context/ContentContext'
import { useAuth } from '../../context/AuthContext'
import heroImg from '../../assets/hero-building1.jpg'

export function Hero({ onLoginSuccess }) {
  const { content } = useContent()
  const { login, logout, error, isAuthenticated } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const ok = await login(username, password)
    setIsSubmitting(false)
    if (ok) {
      setPassword('')
      onLoginSuccess?.()
    }
  }

  return (
    <div
      className="relative min-h-[272px] overflow-hidden bg-gradient-to-tr from-navy-950 to-navy-800"
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(4,10,30,.82) 15%, rgba(9, 49, 124, 0.55) 100%), url(${heroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-[1] mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-6 px-[34px] py-9 max-[900px]:flex-col max-[900px]:items-start">
        <div>
          <div className="mb-3.5 flex items-center gap-2.5 text-[11px] font-bold tracking-[3px] text-white/50 uppercase">
            <span className="h-0.5 w-[26px] flex-shrink-0 rounded-sm bg-coral" />
            {content.SITE.orgName}
          </div>
          <div className="font-display text-[38px] leading-[1.08] font-semibold text-white">
            Intranet <em className="font-medium text-coral not-italic italic">System</em>
          </div>
          <div className="mt-3.5 max-w-[380px] text-[13px] leading-[1.65] text-white/60">
            {content.SITE.orgTag}
          </div>
        </div>

        {isAuthenticated ? (
          <div className="flex min-w-[250px] flex-col gap-2.5 rounded-lg bg-white/98 px-5 py-5 text-center shadow-[0_20px_44px_rgba(4,16,36,.35)]">
            <i className="ti ti-shield-check mx-auto text-2xl text-teal" />
            <p className="text-[12.5px] font-semibold text-ink">เข้าสู่ระบบผู้ดูแลแล้ว</p>
            <button
              type="button"
              onClick={onLoginSuccess}
              className="rounded-xs border-none bg-navy-900 p-[11px] text-[13px] font-bold text-white"
            >
              ไปที่แผงควบคุมเนื้อหา
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-xs border border-line bg-white p-[9px] text-[12px] font-semibold text-ink-soft"
            >
              ออกจากระบบ
            </button>
          </div>
        ) : (
          <form
            className="flex min-w-[250px] flex-col gap-2.5 rounded-lg bg-white/98 px-5 pt-5 pb-[18px] shadow-[0_20px_44px_rgba(4,16,36,.35)]"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center justify-between text-[10.5px] font-bold tracking-wide text-ink-soft uppercase">
              Login form<i className="ti ti-lock text-sm text-coral" />
            </div>
            <input
              type="text"
              name="username"
              placeholder="User Name"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xs border border-line bg-paper px-[11px] py-[9px] text-[12.5px] focus:bg-white focus:outline-2 focus:outline-offset-1 focus:outline-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xs border border-line bg-paper px-[11px] py-[9px] text-[12.5px] focus:bg-white focus:outline-2 focus:outline-offset-1 focus:outline-blue-500"
            />
            {error && <p className="text-[10.5px] font-semibold text-coral">{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xs border-none bg-coral p-[11px] text-[13px] font-bold text-white hover:bg-[#C13E27] disabled:opacity-60"
            >
              {isSubmitting ? 'กำลังเข้าสู่ระบบ...' : 'Login'}
            </button>
            <div className="mt-2 text-[9.5px] text-white/40">* สำหรับเจ้าหน้าที่ผู้ดูแลระบบเท่านั้น</div>
          </form>
        )}
      </div>
    </div>
  )
}

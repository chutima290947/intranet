import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

export function SetupPasswordPage({ token }) {
  const [status, setStatus] = useState('loading') // loading | ready | invalid | done
  const [userInfo, setUserInfo] = useState(null)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    api
      .checkSetupToken(token)
      .then((res) => {
        setUserInfo(res)
        setStatus('ready')
      })
      .catch((err) => {
        setError(err.message || 'ลิงก์ไม่ถูกต้องหรือหมดอายุ')
        setStatus('invalid')
      })
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 8) {
      setError('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร')
      return
    }
    if (password !== confirm) {
      setError('รหัสผ่านทั้งสองช่องไม่ตรงกัน')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      await api.setupPassword(token, password)
      setStatus('done')
    } catch (err) {
      setError(err.message || 'ตั้งรหัสผ่านไม่สำเร็จ')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="w-full max-w-[380px] rounded-xl bg-white p-6 shadow-lg">
        {status === 'loading' && <p className="text-center text-[13px] text-ink-soft">กำลังตรวจสอบลิงก์...</p>}

        {status === 'invalid' && (
          <div className="text-center">
            <i className="ti ti-link-off mx-auto mb-2 text-3xl text-coral" />
            <p className="text-[13px] font-semibold text-coral">{error}</p>
          </div>
        )}

        {status === 'ready' && (
          <>
            <h1 className="mb-1 text-[16px] font-bold text-navy-900">ตั้งรหัสผ่านครั้งแรก</h1>
            <p className="mb-4 text-[12px] text-ink-soft">
              บัญชี: <span className="font-semibold text-navy-900">{userInfo?.username}</span>
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-ink">รหัสผ่านใหม่</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-line px-3 py-2 text-[13px]"
                  placeholder="อย่างน้อย 8 ตัวอักษร"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-ink">ยืนยันรหัสผ่าน</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full rounded-md border border-line px-3 py-2 text-[13px]"
                />
              </div>
              {error && <p className="text-[11.5px] font-semibold text-coral">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="rounded-md border-none bg-navy-900 py-2.5 text-[13px] font-bold text-white disabled:opacity-60"
              >
                {submitting ? 'กำลังบันทึก...' : 'ตั้งรหัสผ่าน'}
              </button>
            </form>
          </>
        )}

        {status === 'done' && (
          <div className="text-center">
            <i className="ti ti-circle-check mx-auto mb-2 text-3xl text-teal" />
            <p className="mb-3 text-[13px] font-semibold text-navy-900">ตั้งรหัสผ่านสำเร็จแล้ว</p>
            <a href="/" className="text-[12.5px] font-semibold text-blue-600 no-underline">
              ไปหน้าเข้าสู่ระบบ →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
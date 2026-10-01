import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

// หลังเปลี่ยนรหัสผ่านสำเร็จ จะนับถอยหลังแล้วเรียก onPasswordChanged() เพื่อ Logout อัตโนมัติ
// ให้ผู้ใช้ Login ใหม่ด้วยรหัสผ่านใหม่ (หรือกดปุ่ม/ปิดหน้าต่างเพื่อออกทันที)
const AUTO_LOGOUT_SECONDS = 3

export function ChangePasswordModal({ onClose, onPasswordChanged }) {
  const { changePassword } = useAuth()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(AUTO_LOGOUT_SECONDS)
  const loggedOutRef = useRef(false)

  const finishAndLogout = () => {
    if (loggedOutRef.current) return // กันเรียกซ้ำ (ทั้งตัวนับเวลาและการกดปุ่มพร้อมกัน)
    loggedOutRef.current = true
    if (onPasswordChanged) onPasswordChanged()
    else onClose()
  }

  useEffect(() => {
    if (!success) return undefined
    if (secondsLeft <= 0) {
      finishAndLogout()
      return undefined
    }
    const timer = setTimeout(() => setSecondsLeft((n) => n - 1), 1000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, secondsLeft])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง')
      return
    }
    if (newPassword.length < 8) {
      setError('รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('รหัสผ่านใหม่และการยืนยันไม่ตรงกัน')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await changePassword(oldPassword, newPassword)
     if (result.ok) {
       setSuccess(true)
      setOldPassword('')
       setNewPassword('')
       setConfirmPassword('')
     } else {
       setError(result.error || 'เปลี่ยนรหัสผ่านไม่สำเร็จ')
     }
   } catch (err) {
     setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
   } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-[380px] rounded-lg bg-white p-6 shadow-[0_20px_44px_rgba(4,16,36,.35)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-navy-900">เปลี่ยนรหัสผ่าน</h2>
          <button
            type="button"
            onClick={success ? finishAndLogout : onClose}
            className="rounded-xs border-none bg-transparent p-1 text-ink-soft hover:text-ink"
          >
            <i className="ti ti-x text-lg" />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <i className="ti ti-circle-check text-3xl text-teal" />
            <p className="text-[13px] font-semibold text-ink">เปลี่ยนรหัสผ่านสำเร็จ</p>
            <p className="text-[12px] leading-relaxed text-ink-soft">
              เพื่อความปลอดภัย ระบบจะออกจากระบบให้อัตโนมัติใน {Math.max(secondsLeft, 0)} วินาที
              <br />
              กรุณาเข้าสู่ระบบอีกครั้งด้วยรหัสผ่านใหม่
            </p>
            <button
              type="button"
              onClick={finishAndLogout}
              className="mt-2 w-full rounded-xs border-none bg-navy-900 p-[11px] text-[13px] font-bold text-white"
            >
              ออกจากระบบทันที
            </button>
          </div>
        ) : (
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-ink-soft">รหัสผ่านเดิม</label>
              <input
                type="password"
                autoComplete="off"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full rounded-xs border border-line bg-paper px-[11px] py-[9px] text-[12.5px] focus:bg-white focus:outline-2 focus:outline-offset-1 focus:outline-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-ink-soft">รหัสผ่านใหม่</label>
              <input
                type="password"
                autoComplete="off"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-xs border border-line bg-paper px-[11px] py-[9px] text-[12.5px] focus:bg-white focus:outline-2 focus:outline-offset-1 focus:outline-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-ink-soft">ยืนยันรหัสผ่านใหม่</label>
              <input
                type="password"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xs border border-line bg-paper px-[11px] py-[9px] text-[12.5px] focus:bg-white focus:outline-2 focus:outline-offset-1 focus:outline-blue-500"
              />
            </div>

            {error && <p className="text-[10.5px] font-semibold text-coral">{error}</p>}

            <div className="mt-1 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xs border border-line bg-white p-[11px] text-[13px] font-semibold text-ink-soft"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-xs border-none bg-coral p-[11px] text-[13px] font-bold text-white hover:bg-[#C13E27] disabled:opacity-60"
              >
                {isSubmitting ? 'กำลังบันทึก...' : 'บันทึก'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
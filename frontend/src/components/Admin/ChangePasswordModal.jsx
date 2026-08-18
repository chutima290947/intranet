import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export function ChangePasswordModal({ onClose }) {
  const { changePassword } = useAuth()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง')
      return
    }
    if (newPassword.length < 6) {
      setError('รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร')
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
            onClick={onClose}
            className="rounded-xs border-none bg-transparent p-1 text-ink-soft hover:text-ink"
          >
            <i className="ti ti-x text-lg" />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <i className="ti ti-circle-check text-3xl text-teal" />
            <p className="text-[13px] font-semibold text-ink">เปลี่ยนรหัสผ่านสำเร็จ</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 w-full rounded-xs border-none bg-navy-900 p-[11px] text-[13px] font-bold text-white"
            >
              ปิดหน้าต่างนี้
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
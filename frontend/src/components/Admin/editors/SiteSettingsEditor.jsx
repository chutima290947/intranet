import { useEffect, useState } from 'react'
import { useContent } from '../../../context/ContentContext'

const FIELDS = [
  { key: 'orgName', label: 'ชื่อองค์กร (แสดงบน Header / กล่อง Login)' },
  { key: 'orgTag', label: 'ข้อความใต้ชื่อระบบ (คำอธิบายสั้นๆ)' },
  { key: 'location', label: 'ที่ตั้ง (แถบบนสุดของเว็บ)' },
  { key: 'hotlineLabel', label: 'ข้อความสายด่วน (แถบบนสุดของเว็บ)' },
]

export function SiteSettingsEditor() {
  const { content, updateCollection } = useContent()
  const [form, setForm] = useState(content.SITE)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => setForm(content.SITE), [content.SITE])

  const handleChange = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSave = async () => {
    try {
      setBusy(true)
      setError('')
      await updateCollection('SITE', form)
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
    } catch (e) {
      setError(e.message || 'บันทึกไม่สำเร็จ กรุณาลองใหม่')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <h2 className="mb-4 text-[16px] font-bold text-navy-900">ตั้งค่าเว็บไซต์</h2>
      <div className="flex max-w-[420px] flex-col gap-3">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="mb-1 block text-[11px] font-bold text-ink-soft">{f.label}</label>
            <input
              value={form[f.key] || ''}
              onChange={(e) => handleChange(f.key, e.target.value)}
              disabled={busy}
              className="w-full rounded-md border border-line px-3 py-2 text-[13px] outline-none focus:border-blue-500 disabled:opacity-60"
            />
          </div>
        ))}
        {error && <p className="text-[12px] font-semibold text-coral">{error}</p>}
        <div className="mt-1 flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={busy}
            className="w-fit rounded-md border-none bg-navy-900 px-4 py-2 text-[12.5px] font-bold text-white disabled:opacity-60"
          >
            {busy ? 'กำลังบันทึก...' : 'บันทึก'}
          </button>
          {saved && <span className="text-[12px] font-semibold text-teal">บันทึกแล้ว ✓</span>}
        </div>
      </div>
    </div>
  )
}
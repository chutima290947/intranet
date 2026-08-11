import { useEffect, useState } from 'react'
import { useContent } from '../../../context/ContentContext'

export function JsonEditor({ schema }) {
  const { content, updateCollection, resetCollection } = useContent()
  const [text, setText] = useState(() => JSON.stringify(content[schema.key], null, 2))
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setText(JSON.stringify(content[schema.key], null, 2))
    setError('')
  }, [schema.key])

  const handleSave = async () => {
    let parsed

    try {
      parsed = JSON.parse(text)
    } catch (e) {
      setError('รูปแบบ JSON ไม่ถูกต้อง: ' + e.message)
      return
    }

    try {
      setBusy(true)
      setError('')
      await updateCollection(schema.key, parsed)
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
    } catch (e) {
      setError(e.message || 'บันทึกไม่สำเร็จ กรุณาลองใหม่')
    } finally {
      setBusy(false)
    }
  }

  const handleReset = async () => {
    if (!window.confirm('รีเซ็ตกลับเป็นค่าเริ่มต้น? การแก้ไขทั้งหมดในหัวข้อนี้จะหายไป')) {
      return
    }

    try {
      setBusy(true)
      setError('')
      await resetCollection(schema.key)
    } catch (e) {
      setError(e.message || 'รีเซ็ตไม่สำเร็จ กรุณาลองใหม่')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <div className="mb-3">
        <h2 className="text-[16px] font-bold text-navy-900">{schema.label}</h2>
        {schema.description && <p className="mt-0.5 text-[12px] text-ink-soft">{schema.description}</p>}
        <p className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-[11px] text-amber-700">
          ⚠ ข้อมูลส่วนนี้มีโครงสร้างซับซ้อนซ้อนกันหลายชั้น จึงแก้ไขผ่านโค้ด JSON โดยตรง — แก้เฉพาะข้อความในเครื่องหมาย
          "..." อย่าลบวงเล็บ {'{ }'} {'[ ]'} หรือเครื่องหมายจุลภาค (,) โดยไม่จำเป็น ไม่งั้นจะบันทึกไม่ได้
        </p>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        disabled={busy}
        className="h-[520px] w-full rounded-md border border-line bg-[#0d1520] p-3 font-mono text-[11.5px] leading-relaxed text-[#d4e0f0] outline-none disabled:opacity-60"
      />
      {error && <p className="mt-2 text-[12px] font-semibold text-coral">{error}</p>}
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={busy}
          className="rounded-md border-none bg-navy-900 px-4 py-2 text-[12px] font-bold text-white disabled:opacity-60"
        >
          {busy ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
        </button>
        {saved && <span className="text-[12px] font-semibold text-teal">บันทึกแล้ว ✓</span>}
        <button
          type="button"
          onClick={handleReset}
          disabled={busy}
          className="rounded-md border border-line bg-white px-4 py-2 text-[12px] font-semibold text-ink-soft disabled:opacity-60"
        >
          รีเซ็ตค่าเริ่มต้น
        </button>
      </div>
    </div>
  )
}
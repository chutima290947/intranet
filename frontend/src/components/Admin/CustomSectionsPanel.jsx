import { useEffect, useState } from 'react'
import { useContent } from '../../context/ContentContext'

const TEMPLATES = [
  { value: 'list', label: 'รายการ (ลิสต์ยาว)' },
  { value: 'grid', label: 'กริดไอคอน' },
  { value: 'expandable', label: 'การ์ดพับ/กาง' },
]

function emptyItem(template) {
  if (template === 'grid') return { label: '', icon: '', warn: false, href: '' }
  if (template === 'expandable') return { text: '', icon: '', href: '' }
  return { title: '', sub: '', icon: '', href: '', file: '' }
}

// ฟอร์มแก้รายการข้างในของ 1 custom section — ฟิลด์ที่โชว์เปลี่ยนไปตาม section.template
function ItemsEditor({ section }) {
  const { updateCustomSectionItems } = useContent()
  const [draft, setDraft] = useState(section.items || [])
  const [openIdx, setOpenIdx] = useState(null)

  useEffect(() => {
    setDraft(section.items || [])
    setOpenIdx(null)
  }, [section.id])

  const isDirty = JSON.stringify(draft) !== JSON.stringify(section.items || [])
  const template = section.template || 'list'

  const updateItem = (idx, key, value) => {
    setDraft((items) => items.map((it, i) => (i === idx ? { ...it, [key]: value } : it)))
  }
  const addItem = () => {
    setDraft((items) => [...items, emptyItem(template)])
    setOpenIdx(draft.length)
  }
  const removeItem = (idx) => {
    if (!window.confirm('ยืนยันลบรายการนี้?')) return
    setDraft((items) => items.filter((_, i) => i !== idx))
    setOpenIdx(null)
  }
  const moveItem = (idx, dir) => {
    const target = idx + dir
    if (target < 0 || target >= draft.length) return
    setDraft((items) => {
      const next = [...items]
      ;[next[idx], next[target]] = [next[target], next[idx]]
      return next
    })
  }
  const handleSave = () => updateCustomSectionItems(section.id, draft)
  const handleDiscard = () => setDraft(section.items || [])

  const titleOf = (item) => item.title || item.label || item.text || '(ยังไม่ตั้งชื่อ)'

  return (
    <div className="mt-3 rounded-lg border border-line bg-paper/40 p-3">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[12px] font-bold text-navy-900">รายการในหัวข้อนี้</span>
        <div className="flex items-center gap-2">
          {isDirty && (
            <button type="button" onClick={handleDiscard} className="rounded-md border border-line bg-white px-2.5 py-1.5 text-[10.5px] font-semibold text-ink-soft">
              ยกเลิก
            </button>
          )}
          <button type="button" onClick={addItem} className="rounded-md border-none bg-blue-600 px-2.5 py-1.5 text-[10.5px] font-bold text-white">
            + เพิ่มรายการ
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!isDirty}
            className={`rounded-md border-none px-2.5 py-1.5 text-[10.5px] font-bold text-white ${isDirty ? 'bg-navy-900' : 'cursor-not-allowed bg-navy-900/40'}`}
          >
            บันทึก
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        {draft.map((item, idx) => {
          const isOpen = openIdx === idx
          return (
            <div key={idx} className="overflow-hidden rounded-md border border-line bg-white">
              <div className="flex items-center gap-2 px-2.5 py-2">
                <button type="button" onClick={() => setOpenIdx(isOpen ? null : idx)} className="flex flex-1 items-center gap-1.5 border-none bg-transparent text-left">
                  <i className={`ti ${isOpen ? 'ti-chevron-down' : 'ti-chevron-right'} text-[12px] text-ink-soft`} />
                  <span className="truncate text-[12px] font-semibold text-ink">{titleOf(item)}</span>
                </button>
                <button type="button" onClick={() => moveItem(idx, -1)} className="text-ink-soft"><i className="ti ti-arrow-up text-[12px]" /></button>
                <button type="button" onClick={() => moveItem(idx, 1)} className="text-ink-soft"><i className="ti ti-arrow-down text-[12px]" /></button>
                <button type="button" onClick={() => removeItem(idx)} className="text-coral"><i className="ti ti-trash text-[12px]" /></button>
              </div>
              {isOpen && (
                <div className="grid grid-cols-2 gap-2 border-t border-line bg-paper/30 p-2.5">
                  {/* ---------- แบบ list ---------- */}
                  {template === 'list' && (
                    <>
                      <div className="col-span-2">
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">หัวข้อ</label>
                        <input value={item.title} onChange={(e) => updateItem(idx, 'title', e.target.value)} className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]" />
                      </div>
                      <div className="col-span-2">
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">คำอธิบายย่อ</label>
                        <input value={item.sub} onChange={(e) => updateItem(idx, 'sub', e.target.value)} className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]" />
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">ไอคอน (เว้นว่างได้)</label>
                        <input value={item.icon} onChange={(e) => updateItem(idx, 'icon', e.target.value)} placeholder="ti-file-text" className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]" />
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">ลิงก์ (URL)</label>
                        <input value={item.href} onChange={(e) => updateItem(idx, 'href', e.target.value)} placeholder="https://..." className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]" />
                      </div>
                    </>
                  )}

                  {/* ---------- แบบ grid ---------- */}
                  {template === 'grid' && (
                    <>
                      <div className="col-span-2">
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">ชื่อรายการ</label>
                        <input value={item.label} onChange={(e) => updateItem(idx, 'label', e.target.value)} className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]" />
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">ไอคอน (เว้นว่างได้)</label>
                        <input value={item.icon} onChange={(e) => updateItem(idx, 'icon', e.target.value)} placeholder="ti-file-text" className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]" />
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">ลิงก์ (URL, ถ้ามี)</label>
                        <input value={item.href} onChange={(e) => updateItem(idx, 'href', e.target.value)} placeholder="https://..." className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]" />
                      </div>
                      <div className="col-span-2">
                        <label className="flex cursor-pointer items-center gap-2">
                          <input type="checkbox" checked={!!item.warn} onChange={(e) => updateItem(idx, 'warn', e.target.checked)} className="h-4 w-4 accent-coral" />
                          <span className="text-[11px] text-ink-soft">เน้นสีแดง (ใช้กับรายการสำคัญ เช่น แจ้งเหตุ)</span>
                        </label>
                      </div>
                    </>
                  )}

                  {/* ---------- แบบ expandable ---------- */}
                  {template === 'expandable' && (
                    <>
                      <div className="col-span-2">
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">ข้อความ</label>
                        <input value={item.text} onChange={(e) => updateItem(idx, 'text', e.target.value)} className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]" />
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">ไอคอน (เว้นว่างได้)</label>
                        <input value={item.icon} onChange={(e) => updateItem(idx, 'icon', e.target.value)} placeholder="ti-file-text" className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]" />
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">ลิงก์ (URL, ถ้ามี)</label>
                        <input value={item.href} onChange={(e) => updateItem(idx, 'href', e.target.value)} placeholder="https://..." className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]" />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )
        })}
        {draft.length === 0 && <p className="py-3 text-center text-[11px] text-ink-soft">ยังไม่มีรายการ กด "+ เพิ่มรายการ"</p>}
      </div>
    </div>
  )
}

export function CustomSectionsPanel() {
  const { customSections, addCustomSection, updateCustomSectionMeta, removeCustomSection, moveCustomSection } = useContent()
  const [openId, setOpenId] = useState(null)
  const [newLabel, setNewLabel] = useState('')
  const [newColumn, setNewColumn] = useState('left')
  const [newTemplate, setNewTemplate] = useState('list')
  const [metaDraft, setMetaDraft] = useState(null)

    useEffect(() => {
    if (!openId) {
      setMetaDraft(null)
      return
    }
    const s = customSections.find((sec) => sec.id === openId)
    setMetaDraft(s ? { label: s.label, icon: s.icon, color: s.color, column: s.column || 'left', sub: s.sub || '' } : null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId])



  const handleAdd = () => {
    const label = newLabel.trim() || 'Section ใหม่'
    const id = addCustomSection({ label, icon: 'ti-list', color: '#1B3A6B', column: newColumn, template: newTemplate })
    setNewLabel('')
    setOpenId(id)
  }

  const handleDelete = (id) => {
    if (!window.confirm('ลบ Section นี้ทั้งหมด? การกระทำนี้ย้อนกลับไม่ได้')) return
    removeCustomSection(id)
    if (openId === id) setOpenId(null)
  }

  const currentSection = customSections.find((s) => s.id === openId)
  const originalMeta = currentSection
    ? { label: currentSection.label, icon: currentSection.icon, color: currentSection.color, column: currentSection.column || 'left', sub: currentSection.sub || '' }
    : null
  const isMetaDirty = metaDraft && originalMeta && JSON.stringify(metaDraft) !== JSON.stringify(originalMeta)

  const handleSaveMeta = () => {
    if (!openId || !metaDraft) return
    updateCustomSectionMeta(openId, metaDraft)
  }
  const handleCancelMeta = () => {
    if (originalMeta) setMetaDraft(originalMeta)
  }

  return (
    <div>
      <div className="mb-5 border-b border-line pb-4">
        <h2 className="text-[18px] font-bold text-navy-900">Section ที่สร้างเอง (หน้า Home)</h2>
        <p className="mt-1 text-[12.5px] text-ink-soft">
          เพิ่ม Section ใหม่ในหน้า Home ได้จากที่นี่ — เลือกเทมเพลตให้ตรงกับรูปแบบที่ต้องการ
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="ชื่อ Section ใหม่"
          className="flex-1 rounded-lg border border-line px-3 py-2 text-[12.5px]"
        />
        <select value={newTemplate} onChange={(e) => setNewTemplate(e.target.value)} className="rounded-lg border border-line px-2.5 py-2 text-[12.5px]">
          {TEMPLATES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <select value={newColumn} onChange={(e) => setNewColumn(e.target.value)} className="rounded-lg border border-line px-2.5 py-2 text-[12.5px]">
          <option value="left">คอลัมน์ซ้าย</option>
          <option value="right">คอลัมน์ขวา</option>
        </select>
        <button type="button" onClick={handleAdd} className="flex items-center gap-1.5 rounded-lg border-none bg-navy-900 px-3.5 py-2 text-[11.5px] font-bold text-white">
          <i className="ti ti-plus text-[13px]" />
          เพิ่ม Section ใหม่
        </button>

        {openId && metaDraft && isMetaDirty && (
          <div className="flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-tint px-2.5 py-1.5">
            <span className="text-[11px] font-semibold text-blue-600">มีการแก้ไขที่ยังไม่บันทึก</span>
            <button
              type="button"
              onClick={handleCancelMeta}
              className="rounded-md border border-line bg-white px-2.5 py-1.5 text-[10.5px] font-semibold text-ink-soft"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleSaveMeta}
              className="rounded-md border-none bg-navy-900 px-2.5 py-1.5 text-[10.5px] font-bold text-white"
            >
              บันทึกการเปลี่ยนแปลง
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {customSections.map((s, idx) => {
          const isOpen = openId === s.id
          const templateLabel = TEMPLATES.find((t) => t.value === (s.template || 'list'))?.label
          return (
            <div key={s.id} className="overflow-hidden rounded-xl border border-line bg-white">
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-white" style={{ background: s.color }}>
                  <i className={`ti ${s.icon}`} />
                </span>
                <button type="button" onClick={() => setOpenId(isOpen ? null : s.id)} className="flex flex-1 items-center gap-2 border-none bg-transparent text-left">
                  <span className="text-[13.5px] font-semibold text-navy-900">{s.label}</span>
                  <span className="rounded-full bg-paper px-2 py-0.5 text-[10px] font-semibold text-ink-soft ring-1 ring-line">{templateLabel}</span>
                </button>
                <button type="button" onClick={() => moveCustomSection(s.id, -1)} disabled={idx === 0} className="text-ink-soft disabled:opacity-30"><i className="ti ti-arrow-up text-[13px]" /></button>
                <button type="button" onClick={() => moveCustomSection(s.id, 1)} disabled={idx === customSections.length - 1} className="text-ink-soft disabled:opacity-30"><i className="ti ti-arrow-down text-[13px]" /></button>
                <button type="button" onClick={() => handleDelete(s.id)} className="text-coral"><i className="ti ti-trash text-[13px]" /></button>
              </div>

              {isOpen && metaDraft && (
                <div className="border-t border-line bg-paper/30 px-4 py-4">
                  <div className="grid grid-cols-4 gap-2.5">
                    <div>
                      <label className="mb-1 block text-[10px] font-bold text-ink-soft">ชื่อ Section</label>
                      <input value={metaDraft.label} onChange={(e) => setMetaDraft((d) => ({ ...d, label: e.target.value }))} className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]" />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold text-ink-soft">ไอคอน</label>
                      <input value={metaDraft.icon} onChange={(e) => setMetaDraft((d) => ({ ...d, icon: e.target.value }))} placeholder="ti-list" className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]" />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold text-ink-soft">สี</label>
                      <input type="color" value={/^#/.test(metaDraft.color) ? metaDraft.color : '#1B3A6B'} onChange={(e) => setMetaDraft((d) => ({ ...d, color: e.target.value }))} className="h-9 w-full cursor-pointer rounded-md border border-line" />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold text-ink-soft">ตำแหน่ง</label>
                      <select value={metaDraft.column} onChange={(e) => setMetaDraft((d) => ({ ...d, column: e.target.value }))} className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]">
                        <option value="left">ซ้าย</option>
                        <option value="right">ขวา</option>
                      </select>
                    </div>
                    {(s.template || 'list') === 'expandable' && (
                      <div className="col-span-4">
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">คำอธิบายรอง (ใต้ชื่อ Section เช่น "กลุ่ม 6")</label>
                        <input value={metaDraft.sub} onChange={(e) => setMetaDraft((d) => ({ ...d, sub: e.target.value }))} className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]" />
                      </div>
                    )}
                  </div>

                  <ItemsEditor section={s} />
                </div>
              )}
            </div>
          )
        })}
        {customSections.length === 0 && (
          <p className="rounded-xl border border-dashed border-line py-10 text-center text-[12px] text-ink-soft">
            ยังไม่มี Section ที่สร้างเอง — ใส่ชื่อด้านบนแล้วกด "เพิ่ม Section ใหม่"
          </p>
        )}
      </div>
    </div>
  )
}
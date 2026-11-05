import { useEffect, useState } from 'react'
import { useContent } from '../../context/ContentContext'
import { useAuth } from '../../context/AuthContext'
import { IconPickerModal } from './editors/IconPickerModal'
import { FieldInput, getFileUrl } from './editors/FieldInputs'

const TEMPLATES = [
  { value: 'list', label: 'รายการ (แบบข่าว/ลิสต์ยาว)' },
  { value: 'grid', label: 'กริดไอคอน (แบบศูนย์รวมระบบคุณภาพ)' },
  { value: 'expandable', label: 'การ์ดพับ/กาง (แบบการมอบหมายอำนาจการเงิน)' },
]

function emptyItem(template) {
  if (template === 'grid') return { label: '', icon: '', img: '', warn: false, href: '' }
  if (template === 'expandable') return { text: '', icon: '', href: '' }
  return { title: '', sub: '', icon: '', href: '', file: '' }
}

// ช่องเลือกไอคอน: พรีวิว + ช่องพิมพ์ + ปุ่ม "เลือกไอคอน" (เปิดหน้าต่างเลือกไอคอนเหมือนส่วนอื่นของแผงควบคุม)
// color (ไม่บังคับ) = สีพื้นของพรีวิว ใช้กับ Section เพื่อให้เห็นหน้าตาจริง
// allowImage = เปิดให้ใส่รูปแทนไอคอนได้ (ใช้เฉพาะเทมเพลตกริด) — อัปโหลดผ่านระบบเดิมของ FieldInput (เลือกโฟลเดอร์ → /api/uploads)
// ถ้ามีรูป รูปจะแสดงแทนไอคอน ถ้าไม่มีรูปจึงแสดงไอคอน
function IconField({ label, value, onChange, placeholder = 'ti-file-text', color, allowImage = false, img = '', onImgChange }) {
  const [open, setOpen] = useState(false)
  const hasImg = allowImage && !!img

  return (
    <div className="w-full max-w-[520px]">
      <label className="mb-1 block text-[10px] font-bold text-ink-soft">{label}</label>
      <div className="flex items-center gap-2">
        <span
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg text-[16px] ${color ? 'text-white' : 'border border-line bg-white text-navy-900'}`}
          style={color ? { background: color } : undefined}
        >
          {hasImg ? (
            <img src={getFileUrl(img)} alt="" className="max-h-full max-w-full object-contain p-0.5" />
          ) : value ? (
            <i className={`ti ${value}`} />
          ) : (
            <i className="ti ti-photo-off opacity-40" />
          )}
        </span>
        <input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`min-w-0 flex-1 rounded-md border border-line bg-white px-2.5 py-1.5 font-mono text-[12px] ${hasImg ? 'opacity-50' : ''}`}
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex flex-shrink-0 items-center gap-1.5 rounded-md border border-line bg-white px-2.5 py-1.5 text-[11.5px] font-semibold text-blue-600 hover:bg-paper disabled:cursor-not-allowed"
        >
          <i className="ti ti-grid-dots text-[13px]" />
          เลือกไอคอน
        </button>
      </div>

      {allowImage && (
        <div className="mt-2.5">
          <label className="mb-1 block text-[10px] font-bold text-ink-soft">
            รูปภาพ (ถ้าใส่รูป จะแสดงรูปแทนไอคอน)
          </label>
          <FieldInput field={{ type: 'image' }} value={img} onChange={onImgChange} />
        </div>
      )}

      <IconPickerModal
        open={open}
        onClose={() => setOpen(false)}
        currentIcon={value || ''}
        currentImg={hasImg ? img : ''}
        onSelectIcon={onChange}
        onSelectImg={allowImage ? onImgChange : undefined}
      />
    </div>
  )
}

// ฟอร์มแก้รายการข้างในของ 1 custom section — ฟิลด์ที่โชว์เปลี่ยนไปตาม section.template
// canCreate/canUpdate/canDelete มาจากสิทธิ์ CUSTOM_SECTIONS ของผู้ใช้ที่ login อยู่
function ItemsEditor({ section, canCreate, canUpdate, canDelete }) {
  const { updateCustomSectionItems } = useContent()
  const [draft, setDraft] = useState(section.items || [])
  const [openIdx, setOpenIdx] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setDraft(section.items || [])
    setOpenIdx(null)
    setSaved(false)
  }, [section.id])

  useEffect(() => {
    if (!saved) return
    const t = setTimeout(() => setSaved(false), 2500)
    return () => clearTimeout(t)
  }, [saved])

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
  const handleSave = () => {
    updateCustomSectionItems(section.id, draft)
    setSaved(true)
  }
  const handleDiscard = () => setDraft(section.items || [])

  const titleOf = (item) => item.title || item.label || item.text || '(ยังไม่ตั้งชื่อ)'

  return (
    <div className="mt-3 rounded-lg border border-line bg-paper/40 p-3">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[12px] font-bold text-navy-900">รายการในหัวข้อนี้</span>
        <div className="flex items-center gap-2">
          {saved && !isDirty && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <i className="ti ti-circle-check text-[13px]" />
              บันทึกแล้ว
            </span>
          )}
          {canCreate && (
            <button type="button" onClick={addItem} className="rounded-md border-none bg-blue-600 px-2.5 py-1.5 text-[10.5px] font-bold text-white">
              + เพิ่มรายการ
            </button>
          )}
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
                  {template === 'grid' && item.img ? (
                    <img src={getFileUrl(item.img)} alt="" className="h-4 w-4 object-contain" />
                  ) : (
                    item.icon && <i className={`ti ${item.icon} text-[13px] text-navy-900`} />
                  )}
                  <span className="truncate text-[12px] font-semibold text-ink">{titleOf(item)}</span>
                </button>
                {canUpdate && (
                  <>
                    <button type="button" onClick={() => moveItem(idx, -1)} className="text-ink-soft"><i className="ti ti-arrow-up text-[12px]" /></button>
                    <button type="button" onClick={() => moveItem(idx, 1)} className="text-ink-soft"><i className="ti ti-arrow-down text-[12px]" /></button>
                  </>
                )}
                {canDelete && (
                  <button type="button" onClick={() => removeItem(idx)} className="text-coral"><i className="ti ti-trash text-[12px]" /></button>
                )}
              </div>
              {isOpen && (
                <fieldset disabled={!canUpdate} className="grid grid-cols-1 gap-2 border-t border-line bg-paper/30 p-2.5 disabled:opacity-60 sm:grid-cols-2">
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
                      <div className="col-span-2">
                        <IconField label="ไอคอน (เว้นว่างได้)" value={item.icon} onChange={(v) => updateItem(idx, 'icon', v)} />
                      </div>
                      <div className="col-span-2">
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">ลิงก์ (URL)</label>
                        <input value={item.href} onChange={(e) => updateItem(idx, 'href', e.target.value)} placeholder="https://..." className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]" />
                      </div>
                    </>
                  )}

                  {/* ---------- แบบ grid (ใส่รูปแทนไอคอนได้) ---------- */}
                  {template === 'grid' && (
                    <>
                      <div className="col-span-2">
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">ชื่อรายการ</label>
                        <input value={item.label} onChange={(e) => updateItem(idx, 'label', e.target.value)} className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]" />
                      </div>
                      <div className="col-span-2">
                        <IconField
                          label="ไอคอน (แสดงเมื่อไม่มีรูปภาพ)"
                          value={item.icon}
                          onChange={(v) => updateItem(idx, 'icon', v)}
                          allowImage
                          img={item.img || ''}
                          onImgChange={(v) => updateItem(idx, 'img', v)}
                        />
                      </div>
                      <div className="col-span-2">
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
                      <div className="col-span-2">
                        <IconField label="ไอคอน (เว้นว่างได้)" value={item.icon} onChange={(v) => updateItem(idx, 'icon', v)} />
                      </div>
                      <div className="col-span-2">
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">ลิงก์ (URL, ถ้ามี)</label>
                        <input value={item.href} onChange={(e) => updateItem(idx, 'href', e.target.value)} placeholder="https://..." className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]" />
                      </div>
                    </>
                  )}
                </fieldset>
              )}
            </div>
          )
        })}
        {draft.length === 0 && <p className="py-3 text-center text-[11px] text-ink-soft">ยังไม่มีรายการ{canCreate ? ' กด "+ เพิ่มรายการ"' : ''}</p>}
      </div>

      {/* แถบบันทึกด้านล่าง: ลอยติดขอบล่างเมื่อมีการแก้ไขที่ยังไม่บันทึก */}
      {canUpdate && isDirty && (
        <div className="sticky bottom-3 z-10 mt-3 flex items-center justify-between gap-3 rounded-xl border border-blue-100 bg-white px-3.5 py-2.5 shadow-[0_6px_20px_rgba(11,40,80,.12)]">
          <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-soft">
            <i className="ti ti-alert-circle text-[14px] text-coral" />
            มีการแก้ไขที่ยังไม่ได้บันทึก
          </span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={handleDiscard} className="rounded-md border border-line bg-white px-3 py-1.5 text-[11.5px] font-semibold text-ink-soft">
              ยกเลิก
            </button>
            <button type="button" onClick={handleSave} className="flex items-center gap-1.5 rounded-md border-none bg-navy-900 px-3.5 py-1.5 text-[11.5px] font-bold text-white">
              <i className="ti ti-device-floppy text-[13px]" />
              บันทึก
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function CustomSectionsPanel() {
  const { customSections, addCustomSection, updateCustomSectionMeta, removeCustomSection, moveCustomSection } = useContent()
  const { can } = useAuth()
  const canCreate = can('CUSTOM_SECTIONS', 'create')
  const canUpdate = can('CUSTOM_SECTIONS', 'update')
  const canDelete = can('CUSTOM_SECTIONS', 'delete')

  const [openId, setOpenId] = useState(null)
  const [newLabel, setNewLabel] = useState('')
  const [newColumn, setNewColumn] = useState('left')
  const [newTemplate, setNewTemplate] = useState('list')
  const [newIcon, setNewIcon] = useState('ti-list')
  const [showNewIconPicker, setShowNewIconPicker] = useState(false)

  const handleAdd = () => {
    const label = newLabel.trim() || 'Section ใหม่'
    const id = addCustomSection({ label, icon: newIcon || 'ti-list', color: '#1B3A6B', column: newColumn, template: newTemplate })
    setNewLabel('')
    setNewIcon('ti-list')
    setOpenId(id)
  }

  const handleDelete = (id) => {
    if (!window.confirm('ลบ Section นี้ทั้งหมด? การกระทำนี้ย้อนกลับไม่ได้')) return
    removeCustomSection(id)
    if (openId === id) setOpenId(null)
  }

  return (
    <div>
      <div className="mb-5 border-b border-line pb-4">
        <h2 className="text-[18px] font-bold text-navy-900">Section ที่สร้างเอง (หน้า Home)</h2>
        <p className="mt-1 text-[12.5px] text-ink-soft">
          เพิ่ม Section ใหม่ในหน้า Home ได้จากที่นี่ โดยไม่ต้องแก้โค้ด — เลือกเทมเพลตให้ตรงกับรูปแบบที่ต้องการ
        </p>
      </div>

      {canCreate && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowNewIconPicker(true)}
            title="เลือกไอคอน"
            className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-lg border border-line bg-white text-[17px] text-navy-900 hover:bg-paper"
          >
            <i className={`ti ${newIcon || 'ti-list'}`} />
          </button>
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="ชื่อ Section ใหม่ เช่น ประกาศฉุกเฉิน"
            className="min-w-[200px] flex-1 rounded-lg border border-line px-3 py-2 text-[12.5px]"
          />
          <select value={newTemplate} onChange={(e) => setNewTemplate(e.target.value)} className="rounded-lg border border-line px-2.5 py-2 text-[12.5px]">
            {TEMPLATES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <select value={newColumn} onChange={(e) => setNewColumn(e.target.value)} className="rounded-lg border border-line px-2.5 py-2 text-[12.5px]">
            <option value="left">คอลัมน์ซ้าย (กว้าง)</option>
            <option value="right">คอลัมน์ขวา (แคบ)</option>
          </select>
          <button type="button" onClick={handleAdd} className="flex items-center gap-1.5 rounded-lg border-none bg-navy-900 px-3.5 py-2 text-[11.5px] font-bold text-white">
            <i className="ti ti-plus text-[13px]" />
            เพิ่ม Section ใหม่
          </button>
          <IconPickerModal
            open={showNewIconPicker}
            onClose={() => setShowNewIconPicker(false)}
            currentIcon={newIcon}
            currentImg=""
            onSelectIcon={setNewIcon}
            title="เลือกไอคอนของ Section"
          />
        </div>
      )}

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
                {canUpdate && (
                  <>
                    <button type="button" onClick={() => moveCustomSection(s.id, -1)} disabled={idx === 0} className="text-ink-soft disabled:opacity-30"><i className="ti ti-arrow-up text-[13px]" /></button>
                    <button type="button" onClick={() => moveCustomSection(s.id, 1)} disabled={idx === customSections.length - 1} className="text-ink-soft disabled:opacity-30"><i className="ti ti-arrow-down text-[13px]" /></button>
                  </>
                )}
                {canDelete && (
                  <button type="button" onClick={() => handleDelete(s.id)} className="text-coral"><i className="ti ti-trash text-[13px]" /></button>
                )}
              </div>

              {isOpen && (
                <div className="border-t border-line bg-paper/30 px-4 py-4">
                  <fieldset disabled={!canUpdate} className="flex flex-col gap-3 disabled:opacity-60">
                    <div className="flex flex-wrap items-end gap-3">
                      <div className="min-w-[220px] flex-1">
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">ชื่อ Section</label>
                        <input value={s.label} onChange={(e) => updateCustomSectionMeta(s.id, { label: e.target.value })} className="w-full rounded-md border border-line bg-white px-2.5 py-1.5 text-[12px]" />
                      </div>
                      <div className="w-[130px]">
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">ตำแหน่ง</label>
                        <select value={s.column || 'left'} onChange={(e) => updateCustomSectionMeta(s.id, { column: e.target.value })} className="w-full rounded-md border border-line bg-white px-2.5 py-1.5 text-[12px]">
                          <option value="left">ซ้าย</option>
                          <option value="right">ขวา</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">สี</label>
                        <input type="color" value={/^#/.test(s.color) ? s.color : '#1B3A6B'} onChange={(e) => updateCustomSectionMeta(s.id, { color: e.target.value })} className="block h-[32px] w-[56px] cursor-pointer rounded-md border border-line bg-white p-0.5" />
                      </div>
                    </div>

                    <IconField
                      label="ไอคอน"
                      value={s.icon}
                      placeholder="ti-list"
                      color={/^#/.test(s.color) ? s.color : '#1B3A6B'}
                      onChange={(v) => updateCustomSectionMeta(s.id, { icon: v })}
                    />

                    {(s.template || 'list') === 'expandable' && (
                      <div>
                        <label className="mb-1 block text-[10px] font-bold text-ink-soft">คำอธิบายรอง (ใต้ชื่อ Section เช่น "กลุ่ม 6")</label>
                        <input value={s.sub || ''} onChange={(e) => updateCustomSectionMeta(s.id, { sub: e.target.value })} className="w-full rounded-md border border-line bg-white px-2.5 py-1.5 text-[12px]" />
                      </div>
                    )}
                  </fieldset>

                  <ItemsEditor section={s} canCreate={canCreate} canUpdate={canUpdate} canDelete={canDelete} />
                </div>
              )}
            </div>
          )
        })}
        {customSections.length === 0 && (
          <p className="rounded-xl border border-dashed border-line py-10 text-center text-[12px] text-ink-soft">
            ยังไม่มี Section ที่สร้างเอง{canCreate ? ' — ใส่ชื่อด้านบนแล้วกด "เพิ่ม Section ใหม่"' : ''}
          </p>
        )}
      </div>
    </div>
  )
}
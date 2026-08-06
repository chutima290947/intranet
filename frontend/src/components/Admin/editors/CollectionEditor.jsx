import { useEffect, useState } from 'react'
import { useContent } from '../../../context/ContentContext'

function emptyFromFields(fields) {
  const obj = {}
  fields.forEach((f) => {
    if (f.type === 'sublist' || f.type === 'tree') obj[f.key] = []
    else if (f.type === 'boolean') obj[f.key] = false
    else obj[f.key] = ''
  })
  return obj
}

// อ่านไฟล์เป็น base64 data URL — สำหรับเดโม่ที่ยังไม่มี storage จริง
// พอมี backend/database แล้ว ให้เปลี่ยนฟังก์ชันนี้เป็นการอัปโหลดไป storage
// แล้ว resolve เป็น URL จริงแทน — ไม่ต้องแก้ที่อื่น
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve({ dataUrl: reader.result, name: file.name, size: file.size })
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function ImageFieldInput({ value, onChange }) {
  const [error, setError] = useState('')

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('กรุณาเลือกไฟล์รูปภาพ (jpg, png, webp)')
      return
    }
    if (file.size > 3 * 1024 * 1024) {
      setError('ไฟล์รูปใหญ่เกินไป (จำกัด 3MB สำหรับเดโม่)')
      return
    }
    setError('')
    const { dataUrl } = await readFileAsDataUrl(file)
    onChange(dataUrl)
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        {value ? (
          <img src={value} alt="" className="h-16 w-24 flex-shrink-0 rounded-md border border-line object-cover" />
        ) : (
          <div className="flex h-16 w-24 flex-shrink-0 items-center justify-center rounded-md border border-dashed border-line bg-paper">
            <i className="ti ti-photo text-lg text-ink-soft" />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="text-[11.5px] file:mr-2 file:rounded-md file:border-none file:bg-navy-900 file:px-2.5 file:py-1.5 file:text-[11px] file:font-bold file:text-white"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="w-fit text-[11px] font-semibold text-coral"
            >
              ลบรูปภาพ
            </button>
          )}
        </div>
      </div>
      {error && <p className="mt-1 text-[11px] font-semibold text-coral">{error}</p>}
    </div>
  )
}

function FileFieldInput({ value, onChange }) {
  const [error, setError] = useState('')
  const fileInfo = value && typeof value === 'object' ? value : null

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      setError('กรุณาเลือกไฟล์ PDF เท่านั้น')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('ไฟล์ใหญ่เกินไป (จำกัด 10MB สำหรับเดโม่)')
      return
    }
    setError('')
    const result = await readFileAsDataUrl(file)
    onChange(result)
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        {fileInfo ? (
          <div className="flex flex-1 items-center gap-2 rounded-md border border-line bg-paper px-3 py-2">
            <i className="ti ti-file-type-pdf text-lg text-coral" />
            <span className="flex-1 truncate text-[11.5px] font-semibold text-ink">{fileInfo.name}</span>
            <a
              href={fileInfo.dataUrl}
              download={fileInfo.name}
              className="text-[11px] font-semibold text-blue-600"
            >
              เปิดดู
            </a>
            <button type="button" onClick={() => onChange('')} className="text-[11px] font-semibold text-coral">
              ลบ
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFile}
            className="text-[11.5px] file:mr-2 file:rounded-md file:border-none file:bg-navy-900 file:px-2.5 file:py-1.5 file:text-[11px] file:font-bold file:text-white"
          />
        )}
      </div>
      {error && <p className="mt-1 text-[11px] font-semibold text-coral">{error}</p>}
    </div>
  )
}

function FieldInput({ field, value, onChange }) {
  if (field.type === 'textarea') {
    return (
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-md border border-line px-3 py-2 text-[12.5px] outline-none focus:border-blue-500"
      />
    )
  }

  if (field.type === 'boolean') {
    return (
      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 cursor-pointer accent-navy-900"
        />
        <span className="text-[12px] text-ink-soft">{value ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</span>
      </label>
    )
  }

  if (field.type === 'icon') {
    return (
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-paper">
          <i className={`ti ${value || 'ti-help-circle'} text-navy-900`} />
        </span>
        <input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="เช่น ti-home (ดูชื่อไอคอนทั้งหมดที่ tabler.io/icons)"
          className="w-full rounded-md border border-line px-3 py-2 text-[12.5px] outline-none focus:border-blue-500"
        />
      </div>
    )
  }

  if (field.type === 'color') {
    const isHex = /^#/.test(value || '')
    return (
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={isHex ? value : '#1B3A6B'}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-11 flex-shrink-0 cursor-pointer rounded-md border border-line"
        />
        <input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="เช่น #1B3A6B หรือ var(--color-blue-600)"
          className="w-full rounded-md border border-line px-3 py-2 text-[12.5px] outline-none focus:border-blue-500"
        />
      </div>
    )
  }

  if (field.type === 'image') {
    return <ImageFieldInput value={value} onChange={onChange} />
  }

  if (field.type === 'file') {
    return <FileFieldInput value={value} onChange={onChange} />
  }

  return (
    <input
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.type === 'url' ? 'https://...' : ''}
      className="w-full rounded-md border border-line px-3 py-2 text-[12.5px] outline-none focus:border-blue-500"
    />
  )
}

function SubListEditor({ field, items, onChange }) {
  const list = Array.isArray(items) ? items : []
  const [primaryField, ...restFields] = field.fields
  const [openIdx, setOpenIdx] = useState(null)

  const updateItem = (idx, key, value) => {
    onChange(list.map((it, i) => (i === idx ? { ...it, [key]: value } : it)))
  }
  const addItem = () => {
    onChange([...list, emptyFromFields(field.fields)])
    setOpenIdx(list.length)
  }
  const removeItem = (idx) => {
    onChange(list.filter((_, i) => i !== idx))
    setOpenIdx(null)
  }
  const moveItem = (idx, dir) => {
    const target = idx + dir
    if (target < 0 || target >= list.length) return
    const next = [...list]
    ;[next[idx], next[target]] = [next[target], next[idx]]
    onChange(next)
  }

  return (
    <div className="rounded-xl border border-line bg-paper/40 p-3">
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold text-navy-900">{field.label}</span>
          <span className="rounded-full bg-white px-2 py-0.5 text-[10.5px] font-bold text-ink-soft ring-1 ring-line">
            {list.length}
          </span>
        </div>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1 rounded-lg border-none bg-blue-600 px-2.5 py-1.5 text-[10.5px] font-bold text-white hover:bg-blue-700"
        >
          <i className="ti ti-plus text-[11px]" />
          เพิ่มรายการ
        </button>
      </div>
      <div className="flex flex-col gap-1.5">
        {list.map((item, idx) => {
          const isOpen = openIdx === idx
          return (
            <div
              key={idx}
              className={`overflow-hidden rounded-lg border bg-white transition-shadow ${
                isOpen ? 'border-blue-300 shadow-[0_2px_8px_rgba(37,99,235,.08)]' : 'border-line'
              }`}
            >
              <div className="flex items-center gap-2 px-2.5 py-2">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-paper text-[10.5px] font-bold text-ink-soft">
                  {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex flex-1 items-center gap-1.5 overflow-hidden border-none bg-transparent text-left"
                >
                  <span className="truncate text-[12px] font-semibold text-ink">
                    {primaryField ? item[primaryField.key] || '(ยังไม่ตั้งชื่อ)' : `รายการที่ ${idx + 1}`}
                  </span>
                  {restFields.length > 0 && (
                    <i
                      className={`ti ti-chevron-down flex-shrink-0 text-[12px] text-ink-soft transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
                <RowActions
                  size="xs"
                  onUp={() => moveItem(idx, -1)}
                  onDown={() => moveItem(idx, 1)}
                  onDelete={() => removeItem(idx)}
                />
              </div>

              {isOpen && (
                <div className="border-t border-line bg-paper/30 px-2.5 py-2.5">
                  {primaryField && (
                    <div className="mb-2">
                      <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-ink-soft/70">
                        {primaryField.label}
                      </label>
                      <FieldInput
                        field={primaryField}
                        value={item[primaryField.key]}
                        onChange={(v) => updateItem(idx, primaryField.key, v)}
                      />
                    </div>
                  )}
                  {restFields.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {restFields.map((f) => (
                        <div
                          key={f.key}
                          className={
                            f.type === 'textarea' || f.type === 'image' || f.type === 'file' || f.type === 'sublist'
                              ? 'col-span-2'
                              : ''
                          }
                        >
                          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-ink-soft/70">
                            {f.label}
                          </label>
                          {f.type === 'sublist' ? (
                            <SubListEditor field={f} items={item[f.key]} onChange={(v) => updateItem(idx, f.key, v)} />
                          ) : (
                            <FieldInput field={f} value={item[f.key]} onChange={(v) => updateItem(idx, f.key, v)} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
        {list.length === 0 && (
          <p className="rounded-lg border border-dashed border-line py-4 text-center text-[11px] text-ink-soft">
            ยังไม่มีรายการย่อย — กด "เพิ่มรายการ" เพื่อเริ่มต้น
          </p>
        )}
      </div>
    </div>
  )
}

function emptyTreeNode() {
  return { label: '' }
}

function TreeNodeEditor({ nodes, onChange, depth = 0 }) {
  const list = Array.isArray(nodes) ? nodes : []

  const updateNode = (idx, patch) => {
    onChange(list.map((n, i) => (i === idx ? { ...n, ...patch } : n)))
  }
  const removeNode = (idx) => onChange(list.filter((_, i) => i !== idx))
  const addNode = () => onChange([...list, emptyTreeNode()])
  const addChild = (idx) => {
    const node = list[idx]
    const children = Array.isArray(node.children) ? node.children : []
    updateNode(idx, { children: [...children, emptyTreeNode()] })
  }
  const moveNode = (idx, dir) => {
    const target = idx + dir
    if (target < 0 || target >= list.length) return
    const next = [...list]
    ;[next[idx], next[target]] = [next[target], next[idx]]
    onChange(next)
  }

  return (
    <div className={depth > 0 ? 'mt-2 border-l-2 border-line pl-3' : ''}>
      <div className="flex flex-col gap-2">
        {list.map((node, idx) => (
          <div key={idx} className="rounded-lg border border-line bg-white p-2.5 shadow-[0_1px_2px_rgba(11,40,80,.04)]">
            <div className="flex items-center gap-1.5">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-paper text-[10px] font-bold text-ink-soft">
                {idx + 1}
              </span>
              <input
                value={node.label || ''}
                onChange={(e) => updateNode(idx, { label: e.target.value })}
                placeholder="ข้อความหัวข้อ"
                className="flex-1 rounded-lg border border-line px-2.5 py-2 text-[12px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {depth === 0 && (
                <input
                  value={node.icon || ''}
                  onChange={(e) => updateNode(idx, { icon: e.target.value })}
                  placeholder="ti-icon"
                  className="w-24 flex-shrink-0 rounded-lg border border-line px-2 py-2 text-[11.5px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              )}
              <button
                type="button"
                onClick={() => addChild(idx)}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border-none bg-blue-50 text-blue-600 hover:bg-blue-100"
                aria-label="เพิ่มหัวข้อย่อย"
                title="เพิ่มหัวข้อย่อย"
              >
                <i className="ti ti-indent-increase text-[13px]" />
              </button>
              <RowActions onUp={() => moveNode(idx, -1)} onDown={() => moveNode(idx, 1)} onDelete={() => removeNode(idx)} />
            </div>
            {Array.isArray(node.children) && node.children.length > 0 && (
              <TreeNodeEditor
                nodes={node.children}
                onChange={(next) => updateNode(idx, { children: next })}
                depth={depth + 1}
              />
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addNode}
        className="mt-2 flex items-center gap-1 rounded-lg border-none bg-blue-600 px-2.5 py-1.5 text-[10.5px] font-bold text-white hover:bg-blue-700"
      >
        <i className="ti ti-plus text-[11px]" />
        เพิ่มหัวข้อ{depth > 0 ? 'ย่อย' : ''}
      </button>
    </div>
  )
}

// ปุ่มชุด ขึ้น/ลง/ลบ แบบกลุ่มเดียว มีเส้นแบ่งให้ดูเป็นก้อนเดียวกัน
function RowActions({ onUp, onDown, onDelete, size = 'sm' }) {
  const btnSize = size === 'xs' ? 'h-6 w-6' : size === 'sm' ? 'h-7 w-7' : 'h-6 w-6'
  const iconSize = size === 'xs' ? 'text-[11px]' : size === 'sm' ? 'text-[13px]' : 'text-[11px]'
  return (
    <div className="flex flex-shrink-0 items-center gap-0.5 rounded-lg border border-line bg-paper/70 p-0.5">
      <button
        type="button"
        onClick={onUp}
        className={`flex ${btnSize} items-center justify-center rounded-md border-none bg-transparent text-ink-soft hover:bg-white`}
        aria-label="เลื่อนขึ้น"
      >
        <i className={`ti ti-arrow-up ${iconSize}`} />
      </button>
      <button
        type="button"
        onClick={onDown}
        className={`flex ${btnSize} items-center justify-center rounded-md border-none bg-transparent text-ink-soft hover:bg-white`}
        aria-label="เลื่อนลง"
      >
        <i className={`ti ti-arrow-down ${iconSize}`} />
      </button>
      <div className="mx-0.5 h-4 w-px bg-line" />
      <button
        type="button"
        onClick={onDelete}
        className={`flex ${btnSize} items-center justify-center rounded-md border-none bg-transparent text-coral hover:bg-coral-tint`}
        aria-label="ลบรายการนี้"
      >
        <i className={`ti ti-trash ${iconSize}`} />
      </button>
    </div>
  )
}

export function CollectionEditor({ schema }) {
  const { content, updateCollection } = useContent()
  const savedItems = content[schema.key] || []

  // ---------- ระบบ Draft ----------
  // แก้ไขทั้งหมดเกิดขึ้นใน draft ก่อน ไม่มีผลกับข้อมูลจริงจนกว่าจะกด "บันทึกการเปลี่ยนแปลง"
  // เปลี่ยน schema.key (สลับไปหน้าอื่น) ให้รีเซ็ต draft ใหม่จากข้อมูลจริงล่าสุดเสมอ
  const [draftItems, setDraftItems] = useState(savedItems)
  const [openIdx, setOpenIdx] = useState(null)
  const [justSaved, setJustSaved] = useState(false)

  useEffect(() => {
    setDraftItems(content[schema.key] || [])
    setOpenIdx(null)
    setJustSaved(false)
  }, [schema.key])

  const isDirty = JSON.stringify(draftItems) !== JSON.stringify(savedItems)

  const updateItem = (idx, key, value) => {
    setDraftItems((items) => items.map((it, i) => (i === idx ? { ...it, [key]: value } : it)))
  }
  const addItem = () => {
    setDraftItems((items) => [...items, emptyFromFields(schema.fields)])
    setOpenIdx(draftItems.length)
  }
  const removeItem = (idx) => {
    if (!window.confirm('ยืนยันลบรายการนี้?')) return
    setDraftItems((items) => items.filter((_, i) => i !== idx))
    setOpenIdx(null)
  }
  const moveItem = (idx, dir) => {
    const target = idx + dir
    if (target < 0 || target >= draftItems.length) return
    setDraftItems((items) => {
      const next = [...items]
      ;[next[idx], next[target]] = [next[target], next[idx]]
      return next
    })
  }

  const handleSave = () => {
    updateCollection(schema.key, draftItems)
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 1500)
  }

  const handleDiscard = () => {
    if (!window.confirm('ยกเลิกการแก้ไขทั้งหมดที่ยังไม่บันทึก?')) return
    setDraftItems(savedItems)
    setOpenIdx(null)
  }

  return (
    <div>
      <div className="mb-5 flex items-start justify-between gap-3 border-b border-line pb-4">
        <div>
          <h2 className="text-[18px] font-bold text-navy-900">{schema.label}</h2>
          {schema.description && <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{schema.description}</p>}
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          {isDirty && (
            <button
              type="button"
              onClick={handleDiscard}
              className="rounded-lg border border-line bg-white px-3 py-2 text-[11.5px] font-semibold text-ink-soft hover:bg-paper"
            >
              ยกเลิกการแก้ไข
            </button>
          )}
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-[11.5px] font-semibold text-navy-900 hover:bg-paper"
          >
            <i className="ti ti-plus text-[13px]" />
            เพิ่มรายการใหม่
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!isDirty}
            className={`flex items-center gap-1.5 rounded-lg border-none px-3.5 py-2 text-[11.5px] font-bold text-white ${
              isDirty ? 'bg-navy-900 hover:bg-navy-800' : 'cursor-not-allowed bg-navy-900/40'
            }`}
          >
            <i className="ti ti-device-floppy text-[13px]" />
            {justSaved ? 'บันทึกแล้ว ✓' : 'บันทึกการเปลี่ยนแปลง'}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {draftItems.map((item, idx) => {
          const isOpen = openIdx === idx
          const title = schema.itemLabel
            ? schema.itemLabel(item)
            : item.label || item.name || item.title || `รายการที่ ${idx + 1}`
          return (
            <div
              key={idx}
              className={`overflow-hidden rounded-xl border bg-white transition-shadow ${
                isOpen ? 'border-blue-300 shadow-[0_4px_16px_rgba(37,99,235,.08)]' : 'border-line shadow-[0_1px_3px_rgba(11,40,80,.04)] hover:shadow-[0_2px_8px_rgba(11,40,80,.06)]'
              }`}
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-navy-900/[.06] text-[11px] font-bold text-navy-900">
                  {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex flex-1 items-center gap-2 overflow-hidden border-none bg-transparent text-left"
                >
                  <span className="truncate text-[13.5px] font-semibold text-navy-900">{title || '(ยังไม่ตั้งชื่อ)'}</span>
                  <i
                    className={`ti ti-chevron-down flex-shrink-0 text-[13px] text-ink-soft transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <RowActions onUp={() => moveItem(idx, -1)} onDown={() => moveItem(idx, 1)} onDelete={() => removeItem(idx)} />
              </div>

              {isOpen && (
                <div className="border-t border-line bg-paper/30 px-4 py-4">
                  <div className="grid grid-cols-2 gap-3.5">
                    {schema.fields.map((f) => (
                      <div
                        key={f.key}
                        className={
                          f.type === 'textarea' || f.type === 'sublist' || f.type === 'image' || f.type === 'file' || f.type === 'tree'
                            ? 'col-span-2'
                            : ''
                        }
                      >
                        <label className="mb-1.5 block text-[10.5px] font-bold uppercase tracking-wide text-ink-soft/70">
                          {f.label}
                        </label>
                        {f.type === 'sublist' ? (
                          <SubListEditor field={f} items={item[f.key]} onChange={(v) => updateItem(idx, f.key, v)} />
                        ) : f.type === 'tree' ? (
                          <div className="rounded-xl border border-line bg-paper/40 p-3">
                            <TreeNodeEditor nodes={item[f.key]} onChange={(v) => updateItem(idx, f.key, v)} />
                          </div>
                        ) : (
                          <FieldInput field={f} value={item[f.key]} onChange={(v) => updateItem(idx, f.key, v)} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
        {draftItems.length === 0 && (
          <p className="rounded-xl border border-dashed border-line py-10 text-center text-[12px] text-ink-soft">
            ยังไม่มีรายการ กด "+ เพิ่มรายการใหม่" เพื่อเริ่มต้น
          </p>
        )}
      </div>

      {isDirty && (
        <div className="sticky bottom-4 mt-4 flex items-center justify-between rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5">
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-amber-700">
            <i className="ti ti-alert-circle text-[14px]" />
            มีการแก้ไขที่ยังไม่ได้บันทึก
          </span>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md border-none bg-amber-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-amber-700"
          >
            บันทึกตอนนี้
          </button>
        </div>
      )}
    </div>
  )
}
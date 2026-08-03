import { useState } from 'react'
import { useContent } from '../../../context/ContentContext'

function emptyFromFields(fields) {
  const obj = {}
  fields.forEach((f) => {
    obj[f.key] = f.type === 'sublist' ? [] : ''
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
  // value เก็บเป็น object { dataUrl, name } หรือ '' ถ้ายังไม่มีไฟล์
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

  const updateItem = (idx, key, value) => {
    onChange(list.map((it, i) => (i === idx ? { ...it, [key]: value } : it)))
  }
  const addItem = () => onChange([...list, emptyFromFields(field.fields)])
  const removeItem = (idx) => onChange(list.filter((_, i) => i !== idx))

  return (
    <div className="mt-1 rounded-md border border-line bg-paper/60 p-2.5">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-bold text-ink-soft">{field.label}</span>
        <button
          type="button"
          onClick={addItem}
          className="rounded-md border-none bg-blue-600 px-2 py-1 text-[10.5px] font-bold text-white"
        >
          + เพิ่มรายการ
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {list.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2 rounded-md border border-line bg-white p-2">
            <div className="grid flex-1 grid-cols-2 gap-1.5">
              {field.fields.map((f) => (
                <div key={f.key} className={f.type === 'textarea' || f.type === 'image' || f.type === 'file' ? 'col-span-2' : ''}>
                  <FieldInput field={f} value={item[f.key]} onChange={(v) => updateItem(idx, f.key, v)} />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => removeItem(idx)}
              className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border-none bg-coral-tint text-coral"
              aria-label="ลบรายการนี้"
            >
              <i className="ti ti-trash text-sm" />
            </button>
          </div>
        ))}
        {list.length === 0 && <p className="py-2 text-center text-[11px] text-ink-soft">ยังไม่มีรายการย่อย</p>}
      </div>
    </div>
  )
}

export function CollectionEditor({ schema }) {
  const { content, updateCollection, resetCollection } = useContent()
  const items = content[schema.key] || []
  const [openIdx, setOpenIdx] = useState(null)

  const updateItem = (idx, key, value) => {
    updateCollection(
      schema.key,
      items.map((it, i) => (i === idx ? { ...it, [key]: value } : it))
    )
  }
  const addItem = () => {
    updateCollection(schema.key, [...items, emptyFromFields(schema.fields)])
    setOpenIdx(items.length)
  }
  const removeItem = (idx) => {
    if (!window.confirm('ยืนยันลบรายการนี้?')) return
    updateCollection(schema.key, items.filter((_, i) => i !== idx))
    setOpenIdx(null)
  }
  const moveItem = (idx, dir) => {
    const target = idx + dir
    if (target < 0 || target >= items.length) return
    const next = [...items]
    ;[next[idx], next[target]] = [next[target], next[idx]]
    updateCollection(schema.key, next)
  }
  const handleReset = () => {
    if (window.confirm('รีเซ็ตกลับเป็นค่าเริ่มต้น? การแก้ไขทั้งหมดในหัวข้อนี้จะหายไป')) {
      resetCollection(schema.key)
      setOpenIdx(null)
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[16px] font-bold text-navy-900">{schema.label}</h2>
          {schema.description && <p className="mt-0.5 text-[12px] text-ink-soft">{schema.description}</p>}
        </div>
        <div className="flex flex-shrink-0 gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border border-line bg-white px-3 py-1.5 text-[11.5px] font-semibold text-ink-soft"
          >
            รีเซ็ตค่าเริ่มต้น
          </button>
          <button
            type="button"
            onClick={addItem}
            className="rounded-md border-none bg-navy-900 px-3 py-1.5 text-[11.5px] font-bold text-white"
          >
            + เพิ่มรายการใหม่
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {items.map((item, idx) => {
          const isOpen = openIdx === idx
          const title = schema.itemLabel
            ? schema.itemLabel(item)
            : item.label || item.name || item.title || `รายการที่ ${idx + 1}`
          return (
            <div key={idx} className="overflow-hidden rounded-lg border border-line bg-white">
              <div className="flex items-center gap-2 px-3.5 py-2.5">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex flex-1 items-center gap-2 overflow-hidden border-none bg-transparent text-left"
                >
                  <i className={`ti ${isOpen ? 'ti-chevron-down' : 'ti-chevron-right'} flex-shrink-0 text-[13px] text-ink-soft`} />
                  <span className="truncate text-[13px] font-semibold text-navy-900">{title || '(ยังไม่ตั้งชื่อ)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(idx, -1)}
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-none bg-paper text-ink-soft"
                  aria-label="เลื่อนขึ้น"
                >
                  <i className="ti ti-arrow-up text-[12px]" />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(idx, 1)}
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-none bg-paper text-ink-soft"
                  aria-label="เลื่อนลง"
                >
                  <i className="ti ti-arrow-down text-[12px]" />
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-none bg-coral-tint text-coral"
                  aria-label="ลบรายการนี้"
                >
                  <i className="ti ti-trash text-[12px]" />
                </button>
              </div>

              {isOpen && (
                <div className="border-t border-line px-3.5 py-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    {schema.fields.map((f) => (
                      <div
                        key={f.key}
                        className={f.type === 'textarea' || f.type === 'sublist' || f.type === 'image' || f.type === 'file' ? 'col-span-2' : ''}
                      >
                        <label className="mb-1 block text-[10.5px] font-bold text-ink-soft">{f.label}</label>
                        {f.type === 'sublist' ? (
                          <SubListEditor field={f} items={item[f.key]} onChange={(v) => updateItem(idx, f.key, v)} />
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
        {items.length === 0 && (
          <p className="py-8 text-center text-[12px] text-ink-soft">ยังไม่มีรายการ กด "+ เพิ่มรายการใหม่" เพื่อเริ่มต้น</p>
        )}
      </div>
    </div>
  )
}
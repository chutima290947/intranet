import { useState } from 'react'
import { UPLOAD_FOLDERS } from '../../../config/uploadFolders'

// ============================================================
// Datetime formatting (ใช้ format แบบ "FRIDAY, 17 APRIL 2026 15:25")
// ============================================================

function formatAutoDatetime(iso) {
  if (!iso) return 'ยังไม่มีข้อมูล'

  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return 'ยังไม่มีข้อมูล'

  const formatted = d.toLocaleString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return formatted.toUpperCase().replace(',', ',')
}

// สร้างค่าเริ่มต้นของ field ทั้งหมดในรายการใหม่
// - datetime-auto / datetime-auto-once: stamp เวลาปัจจุบันทันทีตอนสร้างรายการ
// - sublist / tree: array ว่าง
// - boolean: false
// - อื่นๆ: string ว่าง
export function emptyFromFields(fields) {
  const obj = {}
  const now = new Date().toISOString()

  fields.forEach((f) => {
    if (f.type === 'sublist' || f.type === 'tree') {
      obj[f.key] = []
    } else if (f.type === 'boolean') {
      obj[f.key] = false
    } else if (f.type === 'datetime-auto' || f.type === 'datetime-auto-once') {
      obj[f.key] = now
    } else {
      obj[f.key] = ''
    }
  })

  return obj
}

// อัปเดตค่า field ประเภท datetime-auto (ไม่รวม datetime-auto-once) ให้เป็นเวลาปัจจุบัน
// ใช้ตอนกด "บันทึกการเปลี่ยนแปลง" เพื่อ stamp "วันที่อัปเดตล่าสุด" อัตโนมัติ
export function stampAutoDatetime(item, fields) {
  const next = { ...item }
  const now = new Date().toISOString()

  fields.forEach((f) => {
    if (f.type === 'datetime-auto') {
      next[f.key] = now
    }
    // sublist ซ้อนกันก็ stamp ให้ด้วย (เผื่อมี datetime-auto อยู่ข้างใน)
    if (f.type === 'sublist' && Array.isArray(next[f.key])) {
      next[f.key] = next[f.key].map((sub) => stampAutoDatetime(sub, f.fields))
    }
  })

  return next
}

// ============================================================
// Upload File
// ============================================================

async function uploadFile(file, folder) {
  const formData = new FormData()

  formData.append('folder', folder)
  formData.append('file', file)

  const API_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:3001'

  const response = await fetch(`${API_URL}/api/uploads`, {
    method: 'POST',
    body: formData,
  })

  let data = {}

  try {
    data = await response.json()
  } catch {
    data = {}
  }

  if (!response.ok) {
    throw new Error(
      data.error || 'อัปโหลดไฟล์ไม่สำเร็จ'
    )
  }

  return data
}

// แปลง URL จาก Backend ให้เปิดจาก Frontend ได้
export function getFileUrl(url) {
  if (!url) return ''

  if (
    url.startsWith('http://') ||
    url.startsWith('https://')
  ) {
    return url
  }

  const API_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:3001'

  return `${API_URL}${url}`
}

// ============================================================
// Folder Select (ใช้ร่วมกันทั้งรูปและไฟล์)
// ============================================================

function FolderSelect({ value, onChange }) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-ink-soft/70">
        เลือกโฟลเดอร์ปลายทาง
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-line bg-white px-3 py-2 text-[12.5px] outline-none focus:border-blue-500"
      >
        <option value="">-- กรุณาเลือกโฟลเดอร์ --</option>

        {UPLOAD_FOLDERS.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label} — {f.desc}
          </option>
        ))}
      </select>
    </div>
  )
}

// ============================================================
// Image Field
// ============================================================

function ImageFieldInput({ value, onChange }) {
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState('')

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!selectedFolder) {
      setError('กรุณาเลือกโฟลเดอร์ก่อนอัปโหลด')
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('กรุณาเลือกไฟล์รูปภาพ')
      return
    }

    if (file.size > 3 * 1024 * 1024) {
      setError('ไฟล์รูปใหญ่เกินไป (จำกัด 3MB)')
      return
    }

    try {
      setError('')
      setUploading(true)
      const result = await uploadFile(file, selectedFolder)
      onChange(result.url)
    } catch (err) {
      setError(err.message || 'อัปโหลดรูปไม่สำเร็จ')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="space-y-2">
          <img
            src={getFileUrl(value)}
            alt=""
            className="h-32 w-auto rounded-lg border border-line object-contain"
          />
          <button
            type="button"
            onClick={() => {
              onChange('')
              setSelectedFolder('')
            }}
            className="w-fit text-[11px] font-semibold text-coral"
          >
            ลบรูปภาพ
          </button>
        </div>
      ) : (
        <>
          <FolderSelect value={selectedFolder} onChange={setSelectedFolder} />

          <label
            className={`mt-2 flex items-center justify-center rounded-lg border border-dashed border-line bg-paper/30 px-4 py-6 text-[12px] text-ink-soft ${
              selectedFolder
                ? 'cursor-pointer hover:bg-paper'
                : 'cursor-not-allowed opacity-50'
            }`}
          >
            {uploading
              ? 'กำลังอัปโหลด...'
              : selectedFolder
                ? 'เลือกไฟล์รูปภาพ'
                : 'กรุณาเลือกโฟลเดอร์ก่อน'}

            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              disabled={uploading || !selectedFolder}
              className="hidden"
            />
          </label>
        </>
      )}

      {error && (
        <p className="text-[11px] font-semibold text-coral">{error}</p>
      )}
    </div>
  )
}

// ============================================================
// PDF / Image / Office File Field
// ============================================================

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
]
const ALLOWED_FILE_ACCEPT =
  '.pdf,.jpg,.jpeg,.png,.webp,.pptx,.ppt,.docx,.doc,.xlsx,.xls'

export function FileFieldInput({ value, onChange }) {
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState('')

  const fileInfo =
    value && typeof value === 'object'
      ? value
      : null

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!selectedFolder) {
      setError('กรุณาเลือกโฟลเดอร์ก่อนอัปโหลด')
      return
    }

    const ext = '.' + (file.name.split('.').pop() || '').toLowerCase()
    const allowedExts = ALLOWED_FILE_ACCEPT.split(',')
    const isAllowed =
      ALLOWED_FILE_TYPES.includes(file.type) || allowedExts.includes(ext)

    if (!isAllowed) {
      setError(
        'รองรับเฉพาะไฟล์ PDF, รูปภาพ (JPG/PNG/WEBP), PowerPoint, Word หรือ Excel เท่านั้น'
      )
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('ไฟล์ใหญ่เกินไป (จำกัด 10MB)')
      return
    }

    try {
      setError('')
      setUploading(true)

      const result = await uploadFile(file, selectedFolder)

      onChange({
        id: result.id,
        name: result.original_name,
        url: result.url,
        size: result.size_bytes,
      })
    } catch (err) {
      setError(err.message || 'อัปโหลดไฟล์ไม่สำเร็จ')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      {fileInfo ? (
        <div className="flex items-center justify-between rounded-lg border border-line bg-white px-3 py-2">
          <span className="truncate text-[12px]">
            {fileInfo.name}
          </span>

          <div className="flex items-center gap-3">
            {fileInfo.url && (
              <a 
                href={getFileUrl(fileInfo.url)}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-semibold text-blue-600"
              >
                เปิดดู
              </a>
            )}

            <button
              type="button"
              onClick={() => {
                onChange('')
                setSelectedFolder('')
              }}
              className="text-[11px] font-semibold text-coral"
            >
              ลบ
            </button>
          </div>
        </div>
      ) : (
        <>
          <FolderSelect value={selectedFolder} onChange={setSelectedFolder} />

          <label
            className={`mt-2 flex items-center justify-center rounded-lg border border-dashed border-line bg-paper/30 px-4 py-6 text-center text-[12px] text-ink-soft ${
              selectedFolder
                ? 'cursor-pointer hover:bg-paper'
                : 'cursor-not-allowed opacity-50'
            }`}
          >
            {uploading
              ? 'กำลังอัปโหลด...'
              : selectedFolder
                ? 'เลือกไฟล์ PDF, รูปภาพ, PowerPoint, Word หรือ Excel'
                : 'กรุณาเลือกโฟลเดอร์ก่อน'}

            <input
              type="file"
              accept={ALLOWED_FILE_ACCEPT}
              onChange={handleFile}
              disabled={uploading || !selectedFolder}
              className="hidden"
            />
          </label>
        </>
      )}

      {error && (
        <p className="text-[11px] font-semibold text-coral">
          {error}
        </p>
      )}
    </div>
  )
}

// ============================================================
// Field Input (dispatcher)
// ============================================================

export function FieldInput({ field, value, onChange }) {
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

        <span className="text-[12px] text-navy-900">
          {value ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
        </span>
      </label>
    )
  }

  if (field.type === 'icon') {
    return (
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-line bg-paper">
          <i
            className={`ti ${
              value || 'ti-help-circle'
            } text-[18px] text-navy-900`}
          />
        </div>

        <input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="เช่น ti-home"
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
          placeholder="#1B3A6B"
          className="w-full rounded-md border border-line px-3 py-2 text-[12.5px] outline-none focus:border-blue-500"
        />
      </div>
    )
  }

  // วันที่อัปเดตล่าสุด — stamp อัตโนมัติทุกครั้งที่บันทึก, แก้ไขเองไม่ได้
  if (field.type === 'datetime-auto') {
    return (
      <div className="flex items-center gap-2 rounded-md border border-line bg-paper/50 px-3 py-2 text-[12.5px] text-ink-soft">
        <i className="ti ti-clock text-[15px] text-ink-soft/60" />
        {formatAutoDatetime(value)}
      </div>
    )
  }

  // วันที่เผยแพร่ — stamp ครั้งเดียวตอนสร้างรายการ, แก้ไขเองไม่ได้
  if (field.type === 'datetime-auto-once') {
    return (
      <div className="flex items-center gap-2 rounded-md border border-line bg-paper/50 px-3 py-2 text-[12.5px] text-ink-soft">
        <i className="ti ti-calendar-event text-[15px] text-ink-soft/60" />
        {formatAutoDatetime(value)}
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
      placeholder={
        field.type === 'url'
          ? 'https://...'
          : ''
      }
      className="w-full rounded-md border border-line px-3 py-2 text-[12.5px] outline-none focus:border-blue-500"
    />
  )
}

// ============================================================
// Row Actions
// ============================================================

export function RowActions({ onUp, onDown, onDelete, size = 'sm', hideDelete = false }) {
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
      {!hideDelete && (
        <>
          <div className="mx-0.5 h-4 w-px bg-line" />
          <button
            type="button"
            onClick={onDelete}
            className={`flex ${btnSize} items-center justify-center rounded-md border-none bg-transparent text-coral hover:bg-coral-tint`}
            aria-label="ลบรายการนี้"
          >
            <i className={`ti ti-trash ${iconSize}`} />
          </button>
        </>
      )}
    </div>
  )
}
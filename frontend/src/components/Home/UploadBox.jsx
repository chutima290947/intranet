import { useRef, useState, useCallback, useEffect } from 'react'
import { api } from '../../lib/api'

function Modal({ onClose, children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/50 p-4"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="flex max-h-[85vh] min-h-[520px] w-full max-w-lg flex-col overflow-y-auto rounded-xl bg-white shadow-xl">
        {children}
      </div>
    </div>
  )
}

const FOLDERS = [
  { id: 'doctor',     label: 'Doctor',          desc: 'ข้อมูลเกี่ยวกับตารางแพทย์',           icon: 'ti-stethoscope' },
  { id: 'nurse',      label: 'Nurse',           desc: 'ข้อมูลด้านการพยาบาล',                 icon: 'ti-vaccine' },
  { id: 'pharmacy',   label: 'Pharmacy',        desc: 'ข้อมูลด้านเภสัชกรรม',                 icon: 'ti-pill' },
  { id: 'photo',      label: 'Photo',           desc: 'รูปภาพใน Forum',                      icon: 'ti-photo' },
  { id: 'emp',        label: 'Emp',             desc: 'รูปภาพพนักงาน',                       icon: 'ti-users' },
  { id: 'med',        label: 'Med',             desc: 'รูปภาพแนะนำแพทย์ใหม่',                icon: 'ti-user-plus' },
  { id: 'mservice',   label: 'Medical Service', desc: 'ข้อมูลฝ่ายบริการทางการแพทย์',         icon: 'ti-building-hospital' },
  { id: 'avatar',     label: 'User Avatar',     desc: 'ภาพ/สัญลักษณ์สมาชิกใน Forum',         icon: 'ti-user-circle' },
  { id: 'pt',         label: 'PT',              desc: 'ไฟล์ของแผนกกายภาพ',                   icon: 'ti-activity' },
  { id: 'marketing',  label: 'Marketing',       desc: 'ข้อมูลฝ่ายการตลาด',                   icon: 'ti-speakerphone' },
  { id: 'technician', label: 'Technician',      desc: 'ข้อมูลฝ่ายการช่าง',                   icon: 'ti-tool' },
  { id: 'hr',         label: 'HR',              desc: 'ข้อมูลฝ่ายบุคคล',                     icon: 'ti-briefcase' },
]

const MAX_SIZE = 25 * 1024 * 1024 // 25MB

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fileIcon(name) {
  const ext = name.split('.').pop().toLowerCase()
  if (ext === 'pdf') return 'ti-file-type-pdf'
  if (['doc', 'docx'].includes(ext)) return 'ti-file-type-doc'
  if (['xls', 'xlsx', 'csv'].includes(ext)) return 'ti-file-type-xls'
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'ti-photo'
  return 'ti-file'
}

export function UploadBox() {
  const inputRef = useRef(null)
  const folderRef = useRef(null)
  const pickerRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [files, setFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [shake, setShake] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  const folder = FOLDERS.find(f => f.id === selectedFolder)
  const filtered = FOLDERS.filter(f =>
    f.label.toLowerCase().includes(query.toLowerCase()) || f.desc.includes(query)
  )

  useEffect(() => {
    const onClick = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) setPickerOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const addFiles = useCallback((fileList) => {
    const incoming = Array.from(fileList).map(file => {
      const oversize = file.size > MAX_SIZE
      return {
        id: `${file.name}-${file.size}-${file.lastModified}`,
        file, progress: 0,
        status: oversize ? 'error' : 'pending',
        error: oversize ? 'ไฟล์ใหญ่เกิน 25MB' : null,
      }
    })
    setUploadComplete(false)
    setFiles(prev => {
      const seen = new Set(prev.map(f => f.id))
      return [...prev, ...incoming.filter(f => !seen.has(f.id))]
    })
  }, [])

  const handleBrowse = () => inputRef.current?.click()
  const handleInputChange = (e) => { if (e.target.files?.length) addFiles(e.target.files); e.target.value = '' }
  const handleDrop = (e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files) }
  const handleDragOver = (e) => { e.preventDefault(); setDragActive(true) }
  const handleDragLeave = (e) => { e.preventDefault(); setDragActive(false) }
  const removeFile = (id) => setFiles(prev => prev.filter(f => f.id !== id))
  const clearAll = () => { setFiles([]); setUploadComplete(false) }

  const isUploading = files.some(f => f.status === 'uploading')
  const hasPending = files.some(f => f.status === 'pending')

  const pickFolder = (id) => { setSelectedFolder(id); setUploadComplete(false); setPickerOpen(false); setQuery('') }

  const startUpload = async () => {
    if (!selectedFolder) {
      setShake(true)
      folderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => setShake(false), 550)
      return
    }
    if (isUploading || files.length === 0 || !hasPending) return

    const pending = files.filter(f => f.status === 'pending')
    setFiles(prev => prev.map(f => f.status === 'pending' ? { ...f, status: 'uploading', progress: 0 } : f))

    // อัปโหลดทีละไฟล์ไปยัง backend ซึ่งเก็บไฟล์ลง Neon Postgres จริง
    for (const item of pending) {
      try {
        await api.uploadFileWithProgress(selectedFolder, item.file, (progress) => {
          setFiles(prev => prev.map(f => f.id === item.id ? { ...f, progress } : f))
        })
        setFiles(prev => prev.map(f => f.id === item.id ? { ...f, progress: 100, status: 'done' } : f))
      } catch (err) {
        setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'error', error: err.message } : f))
      }
    }
    setUploadComplete(true)
  }

  const uploadForm = (
    <>
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-tint text-blue-600">
            <i className="ti ti-upload text-[16px]" />
          </span>
          <div>
            <h4 className="text-xs font-bold text-navy-900">Upload เอกสารเข้าระบบ</h4>
            <p className="text-[10px] text-ink-soft">เลือกโฟลเดอร์ปลายทาง แล้วแนบไฟล์ที่ต้องการอัปโหลด</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="ปิด"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-slate-100"
        >
          <i className="ti ti-x text-[15px]" />
        </button>
      </div>

      <div className="px-5 py-4">
        {/* folder select */}
        <div ref={folderRef} className={shake ? 'animate-[shake_0.5s]' : ''}>
          <label className="mb-1 flex items-center gap-1 text-[10.5px] font-semibold text-navy-900">
            โฟลเดอร์ปลายทาง <span className="text-coral">*</span>
          </label>
          <div className="relative" ref={pickerRef}>
            <button
              type="button"
              onClick={() => setPickerOpen(o => !o)}
              className={`flex w-full items-center gap-2.5 rounded-md border bg-white px-2.5 py-2 text-left transition-colors ${
                pickerOpen ? 'border-blue-600 ring-1 ring-blue-600' : 'border-line hover:border-blue-600'
              }`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-ink-soft">
                <i className={`ti ${folder ? folder.icon : 'ti-folder'} text-[15px]`} />
              </span>
              <span className="min-w-0 flex-1">
                {folder ? (
                  <>
                    <span className="block text-[11.5px] font-semibold text-navy-900">{folder.label}</span>
                    <span className="block truncate text-[10px] text-ink-soft">{folder.desc}</span>
                  </>
                ) : (
                  <span className="text-[11.5px] text-ink-soft">— เลือกโฟลเดอร์ที่ต้องการเก็บไฟล์ —</span>
                )}
              </span>
              <i className={`ti ti-chevron-down text-[14px] text-ink-soft transition-transform ${pickerOpen ? 'rotate-180' : ''}`} />
            </button>

            {pickerOpen && (
              <div className="absolute z-10 mt-1.5 w-full overflow-hidden rounded-md border border-line bg-white shadow-lg">
                <div className="flex items-center gap-2 border-b border-line px-2.5 py-2">
                  <i className="ti ti-search text-[13px] text-ink-soft" />
                  <input
                    autoFocus
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="ค้นหาโฟลเดอร์..."
                    className="w-full text-[11.5px] text-navy-900 placeholder:text-ink-soft focus:outline-none"
                  />
                </div>
                <div className="max-h-60 overflow-y-auto py-1">
                  {filtered.length === 0 && (
                    <p className="px-3 py-3 text-center text-[11px] text-ink-soft">ไม่พบโฟลเดอร์ที่ค้นหา</p>
                  )}
                  {filtered.map(f => {
                    const active = selectedFolder === f.id
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => pickFolder(f.id)}
                        className={`flex w-full items-center gap-2.5 px-2.5 py-2 text-left transition-colors ${active ? 'bg-blue-tint' : 'hover:bg-slate-50'}`}
                      >
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${active ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-ink-soft'}`}>
                          <i className={`ti ${f.icon} text-[15px]`} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block text-[11px] font-semibold ${active ? 'text-blue-700' : 'text-navy-900'}`}>{f.label}</span>
                          <span className="block truncate text-[10px] text-ink-soft">{f.desc}</span>
                        </span>
                        {active && <i className="ti ti-check text-[14px] text-blue-600" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* dropzone */}
        <div className="mt-3.5">
          <label className="mb-1 block text-[10.5px] font-semibold text-navy-900">ไฟล์เอกสาร</label>
          <div
            role="button"
            tabIndex={0}
            onClick={handleBrowse}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleBrowse() }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`flex cursor-pointer items-center gap-3.5 rounded-md border-2 border-dashed p-4 transition-colors duration-150 ease-in-out hover:border-blue-600 hover:bg-blue-tint ${
              dragActive ? 'border-blue-600 bg-blue-tint' : 'border-line'
            }`}
          >
            <i className="ti ti-cloud-upload text-2xl text-blue-600" />
            <div className="text-left">
              <h4 className="text-xs font-bold text-navy-900">ลากไฟล์มาวางที่นี่ หรือคลิกเลือกไฟล์</h4>
              <p className="text-[10px] text-ink-soft">PDF, Word, Excel, รูปภาพ — ไม่เกิน 25MB ต่อไฟล์</p>
            </div>
            <input ref={inputRef} type="file" multiple onChange={handleInputChange} className="hidden" />
          </div>
        </div>

        {/* file list */}
        {files.length > 0 && (
          <div className="mt-3 flex flex-col gap-2">
            {files.map(({ id, file, status, progress, error }) => (
              <div className="flex items-center gap-2.5 rounded-sm border border-line bg-white px-2.5 py-2" key={id}>
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-slate-100 text-ink-soft">
                  <i className={`ti ${fileIcon(file.name)} text-base`} />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <span className="overflow-hidden text-[11.5px] font-semibold text-ellipsis whitespace-nowrap text-navy-900">{file.name}</span>
                    <span className="shrink-0 text-[10px] text-ink-soft">{formatSize(file.size)}</span>
                  </div>
                  {status === 'uploading' && (
                    <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                  )}
                  {status === 'error' && <p className="mt-0.5 flex items-center gap-1 text-[10px] font-medium text-coral"><i className="ti ti-alert-circle text-[11px]" />{error}</p>}
                  {status === 'done' && <p className="mt-0.5 flex items-center gap-1 text-[10px] font-medium" style={{ color: 'var(--color-teal)' }}><i className="ti ti-circle-check text-[11px]" />อัปโหลดสำเร็จ</p>}
                  {status === 'pending' && <p className="mt-0.5 text-[10px] text-ink-soft">รอการอัปโหลด</p>}
                </div>
                {status === 'uploading' ? (
                  <i className="ti ti-loader-2 flex-shrink-0 animate-spin text-base text-blue-600" />
                ) : (
                  <button
                    type="button"
                    className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-coral-tint hover:text-coral"
                    aria-label={`ลบ ${file.name}`}
                    onClick={(e) => { e.stopPropagation(); removeFile(id) }}
                  >
                    <i className="ti ti-x" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* footer */}
        <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
          <span className="text-[10.5px] text-ink-soft">
            {files.length > 0 ? `${files.length} ไฟล์ที่เลือก` : 'ยังไม่มีไฟล์ที่เลือก'}
          </span>
          <div className="flex items-center gap-3">
            {files.length > 0 && (
              <button type="button" className="border-none bg-transparent text-[10.5px] font-bold text-ink-soft hover:text-coral" onClick={clearAll}>
                ล้างทั้งหมด
              </button>
            )}
            <button
              type="button"
              onClick={startUpload}
              disabled={isUploading || files.length === 0}
              className={`flex items-center gap-1.5 rounded-md px-3.5 py-2 text-[11px] font-bold text-white transition-colors ${
                isUploading || files.length === 0 ? 'cursor-not-allowed bg-slate-300' : 'bg-blue-600 hover:bg-navy-900'
              }`}
            >
              <i className={`ti ${isUploading ? 'ti-loader-2 animate-spin' : 'ti-cloud-upload'} text-[13px]`} />
              {isUploading ? 'กำลังอัปโหลด...' : 'อัปโหลดไฟล์'}
            </button>
          </div>
        </div>

        {uploadComplete && (
          <div
            className="mt-2.5 flex items-center gap-2 rounded-md border px-2.5 py-2 text-[10.5px] font-semibold"
            style={{ color: 'var(--color-teal)', borderColor: 'var(--color-teal)', backgroundColor: 'color-mix(in srgb, var(--color-teal) 8%, white)' }}
          >
            <i className="ti ti-circle-check text-[13px]" />
            อัปโหลดไฟล์ทั้งหมดไปยังโฟลเดอร์ {folder?.label} เรียบร้อยแล้ว
          </div>
        )}
      </div>

      <style>{`
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
      `}</style>
    </>
  )

  return (
    <>
      <button
        type="button"
        id="sec-upload"
        data-card
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center gap-3 rounded-lg border border-line bg-white px-[18px] py-3.5 text-left transition-colors hover:border-blue-600 hover:bg-blue-tint"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-tint text-blue-600">
          <i className="ti ti-upload text-[17px]" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-bold text-navy-900">Upload เอกสารเข้าระบบ</span>
          <span className="block text-[10px] text-ink-soft">
            {files.length > 0 ? `${files.length} ไฟล์ที่เลือก` : 'เลือกโฟลเดอร์ปลายทาง แล้วแนบไฟล์ที่ต้องการอัปโหลด'}
          </span>
        </span>
        <i className="ti ti-chevron-right shrink-0 text-[15px] text-ink-soft" />
      </button>

      {isOpen && <Modal onClose={() => setIsOpen(false)}>{uploadForm}</Modal>}
    </>
  )
}
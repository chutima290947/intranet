import { useRef, useState } from 'react'

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function UploadBox() {
  const inputRef = useRef(null)
  const [files, setFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList).map(file => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      file,
    }))
    setFiles(prev => {
      const existingIds = new Set(prev.map(f => f.id))
      const merged = [...prev, ...incoming.filter(f => !existingIds.has(f.id))]
      return merged
    })
  }

  const handleBrowse = () => inputRef.current?.click()

  const handleInputChange = (e) => {
    if (e.target.files?.length) addFiles(e.target.files)
    e.target.value = ''
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragActive(false)
  }

  const removeFile = (id) => setFiles(prev => prev.filter(f => f.id !== id))
  const clearAll = () => setFiles([])

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white" id="sec-upload" data-card>
      <div className="px-[18px] py-3.5">
        <div
          className={`flex cursor-pointer items-center gap-3.5 rounded-md border-2 border-dashed p-4 transition-colors duration-150 ease-in-out hover:border-blue-600 hover:bg-blue-tint ${
            dragActive ? 'border-blue-600 bg-blue-tint' : 'border-line'
          }`}
          role="button"
          tabIndex={0}
          onClick={handleBrowse}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleBrowse() }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <i className="ti ti-cloud-upload text-2xl text-blue-600" />
          <div className="text-left">
            <h4 className="text-xs font-bold text-navy-900">Upload เอกสารเข้าระบบ</h4>
            <p className="text-[10px] text-ink-soft">ลากไฟล์มาวางที่นี่ หรือคลิกเลือกไฟล์</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            multiple
            onChange={handleInputChange}
            className="hidden"
          />
        </div>

        {files.length > 0 && (
          <div className="mt-3 flex flex-col gap-2">
            {files.map(({ id, file }) => (
              <div className="flex items-center gap-2.5 rounded-sm border border-line bg-white px-2.5 py-2" key={id}>
                <i className="ti ti-file flex-shrink-0 text-base text-blue-600" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="overflow-hidden text-[11.5px] font-semibold text-ellipsis whitespace-nowrap text-navy-900">{file.name}</span>
                  <span className="text-[10px] text-ink-soft">{formatSize(file.size)}</span>
                </div>
                <button
                  type="button"
                  className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-coral-tint hover:text-coral"
                  aria-label={`ลบ ${file.name}`}
                  onClick={(e) => { e.stopPropagation(); removeFile(id) }}
                >
                  <i className="ti ti-x" />
                </button>
              </div>
            ))}
            <div className="mt-0.5 flex items-center justify-between">
              <span className="text-[10.5px] text-ink-soft">{files.length} ไฟล์ที่เลือก</span>
              <button type="button" className="border-none bg-transparent text-[10.5px] font-bold text-coral" onClick={clearAll}>
                ล้างทั้งหมด
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

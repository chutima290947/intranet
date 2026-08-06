import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { DEFAULT_CONTENT } from '../data/defaultContent'
import { api } from '../lib/api'

const ContentContext = createContext(null)

// deep merge: เอา DEFAULT_CONTENT เป็นฐาน แล้วทับด้วย saved
// ถ้า saved ไม่มี key ไหน (เช่น qrImage ที่เพิ่งเพิ่มใหม่) จะยังคงค่าจาก DEFAULT_CONTENT ไว้
function deepMerge(base, override) {
  if (Array.isArray(base) && Array.isArray(override)) {
    const length = Math.max(base.length, override.length)
    const result = []
    for (let i = 0; i < length; i++) {
      result[i] = deepMerge(base[i], override[i])
    }
    return result
  }
  if (
    base && override &&
    typeof base === 'object' && typeof override === 'object' &&
    !Array.isArray(base) && !Array.isArray(override)
  ) {
    const result = { ...base }
    for (const key of Object.keys(override)) {
      result[key] = deepMerge(base[key], override[key])
    }
    return result
  }
  return override !== undefined ? override : base
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [saveError, setSaveError] = useState(null)

  useEffect(() => {
    let cancelled = false
    api
      .getContent()
      .then((saved) => {
        if (cancelled) return
        setContent(deepMerge(DEFAULT_CONTENT, saved))   // 👈 เปลี่ยนจาก { ...DEFAULT_CONTENT, ...saved }
        setLoadError(null)
      })
      .catch((err) => {
        console.error('โหลด content จากเซิร์ฟเวอร์ไม่สำเร็จ ใช้ค่าเริ่มต้นแทน', err)
        if (!cancelled) setLoadError(err.message)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const updateCollection = useCallback((key, value) => {
    setContent((prev) => ({ ...prev, [key]: value }))
    setSaveError(null)
    api.setContentKey(key, value).catch((err) => {
      console.error('บันทึกข้อมูลไปเซิร์ฟเวอร์ไม่สำเร็จ', err)
      setSaveError(err.message)
    })
  }, [])

  return (
    <ContentContext.Provider value={{ content, updateCollection }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent ต้องถูกเรียกใช้ภายใน <ContentProvider>')
  return ctx
}
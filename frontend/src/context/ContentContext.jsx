import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { DEFAULT_CONTENT } from '../data/defaultContent'
import { api } from '../lib/api'

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  // เริ่มด้วยค่าเริ่มต้นในโค้ดไปก่อน (โหลดหน้าเว็บได้ทันทีไม่ต้องรอ API)
  // แล้วค่อย "ทับ" ด้วยข้อมูลจาก Neon Postgres (ผ่าน backend) เมื่อโหลดเสร็จ
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
        setContent({ ...DEFAULT_CONTENT, ...saved })
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
    <ContentContext.Provider
      value={{ content, updateCollection }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent ต้องถูกเรียกใช้ภายใน <ContentProvider>')
  return ctx
}

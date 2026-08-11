import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { api } from '../lib/api'
import { DEFAULT_CONTENT } from '../data/defaultContent'

// custom sections เก็บรวมเป็น array เดียวใน content_store ภายใต้ key พิเศษนี้
// (ไม่ merge ปนกับ DEFAULT_CONTENT เพราะไม่ใช่ key ที่มีอยู่ในโค้ด)
const CUSTOM_SECTIONS_KEY = '__custom_sections__'

const ContentContext = createContext(null)

function genId() {
  return 'cs-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT)
  const [customSections, setCustomSections] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  // โหลดข้อมูลทั้งหมดจากเซิร์ฟเวอร์ (Neon) ตอนแอปเริ่มทำงาน
  useEffect(() => {
    let cancelled = false

    api
      .getContent()
      .then((serverContent) => {
        if (cancelled) return

        const { [CUSTOM_SECTIONS_KEY]: sections, ...rest } = serverContent || {}

        setContent({ ...DEFAULT_CONTENT, ...rest })
        setCustomSections(Array.isArray(sections) ? sections : [])
        setLoadError('')
      })
      .catch((err) => {
        if (cancelled) return

        console.error('โหลดข้อมูลจากเซิร์ฟเวอร์ไม่สำเร็จ', err)
        setLoadError(err.message || 'โหลดข้อมูลจากเซิร์ฟเวอร์ไม่สำเร็จ')

        // เซิร์ฟเวอร์เข้าไม่ได้ ใช้ค่าเริ่มต้นไปก่อน อย่างน้อยหน้าเว็บยังแสดงผลได้
        setContent(DEFAULT_CONTENT)
        setCustomSections([])
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  // บันทึก collection ปกติ (ตาม schema.key ต่างๆ) — ต้อง login ฝั่ง backend ถึงจะผ่าน
  // โยน error ออกไปให้ตัวเรียกจัดการเอง (เช่น CollectionEditor แสดงข้อความ error)
  const updateCollection = useCallback(async (key, value) => {
    await api.setContentKey(key, value)
    setContent((prev) => ({ ...prev, [key]: value }))
  }, [])

  // ---------- Custom Sections API ----------
  // เก็บเป็น array เดียวทั้งก้อนภายใต้ CUSTOM_SECTIONS_KEY แต่ละครั้งที่แก้ไข
  // จะอัปเดตหน้าจอทันที (optimistic) แล้วยิงไปเซฟที่เซิร์ฟเวอร์เบื้องหลัง
  // ถ้าเซฟไม่สำเร็จ (เช่น token หมดอายุ) จะย้อนสถานะกลับและแจ้งเตือน

  const addCustomSection = useCallback(({ label, icon, color, column, template, sub }) => {
    const id = genId()
    const newSection = {
      id,
      label: label || 'Section ใหม่',
      icon: icon || 'ti-list',
      color: color || 'var(--color-blue-600)',
      column: column === 'right' ? 'right' : 'left',
      template: ['list', 'grid', 'expandable'].includes(template) ? template : 'list',
      sub: sub || '',
      items: [],
    }

    setCustomSections((prev) => {
      const next = [...prev, newSection]

      api.setContentKey(CUSTOM_SECTIONS_KEY, next).catch((err) => {
        console.error('บันทึก custom section ไม่สำเร็จ', err)
        alert(err.message || 'บันทึก section ไม่สำเร็จ กรุณาลองใหม่')
        setCustomSections((cur) => cur.filter((s) => s.id !== id))
      })

      return next
    })

    return id
  }, [])

  const updateCustomSectionMeta = useCallback((id, patch) => {
    setCustomSections((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, ...patch } : s))

      api.setContentKey(CUSTOM_SECTIONS_KEY, next).catch((err) => {
        console.error('บันทึกการแก้ไข section ไม่สำเร็จ', err)
        alert(err.message || 'บันทึกไม่สำเร็จ กรุณาลองใหม่')
      })

      return next
    })
  }, [])

  const updateCustomSectionItems = useCallback((id, items) => {
    setCustomSections((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, items } : s))

      api.setContentKey(CUSTOM_SECTIONS_KEY, next).catch((err) => {
        console.error('บันทึกรายการใน section ไม่สำเร็จ', err)
        alert(err.message || 'บันทึกไม่สำเร็จ กรุณาลองใหม่')
      })

      return next
    })
  }, [])

  const removeCustomSection = useCallback((id) => {
    setCustomSections((prev) => {
      const next = prev.filter((s) => s.id !== id)

      api.setContentKey(CUSTOM_SECTIONS_KEY, next).catch((err) => {
        console.error('ลบ section ไม่สำเร็จ', err)
        alert(err.message || 'ลบไม่สำเร็จ กรุณาลองใหม่')
      })

      return next
    })
  }, [])

  const moveCustomSection = useCallback((id, dir) => {
    setCustomSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id)
      const target = idx + dir
      if (idx < 0 || target < 0 || target >= prev.length) return prev

      const next = [...prev]
      ;[next[idx], next[target]] = [next[target], next[idx]]

      api.setContentKey(CUSTOM_SECTIONS_KEY, next).catch((err) => {
        console.error('จัดเรียง section ไม่สำเร็จ', err)
      })

      return next
    })
  }, [])

  return (
    <ContentContext.Provider
      value={{
        content,
        updateCollection,
        customSections,
        addCustomSection,
        updateCustomSectionMeta,
        updateCustomSectionItems,
        removeCustomSection,
        moveCustomSection,
        isLoading,
        loadError,
      }}
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
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { DEFAULT_CONTENT } from '../data/defaultContent'

const STORAGE_KEY = 'intranet_content_v1'
// custom sections (สร้างเองผ่านแอดมิน ไม่มีอยู่ในไฟล์โค้ด) เก็บแยก key ต่างหาก
// เพื่อไม่ให้ merge ปนกับ content หลัก และจัดการแยกอิสระจากกัน
const CUSTOM_SECTIONS_KEY = 'intranet_custom_sections_v1'

const ContentContext = createContext(null)

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_CONTENT
    const saved = JSON.parse(raw)
    return { ...DEFAULT_CONTENT, ...saved }
  } catch (err) {
    console.error('โหลดข้อมูลที่บันทึกไว้ไม่สำเร็จ ใช้ค่าเริ่มต้นแทน', err)
    return DEFAULT_CONTENT
  }
}

// custom sections: array ของ { id, label, icon, color, template: 'list', items: [] }
function loadCustomSections() {
  try {
    const raw = localStorage.getItem(CUSTOM_SECTIONS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.error('โหลด custom sections ไม่สำเร็จ', err)
    return []
  }
}

function genId() {
  return 'cs-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(loadInitial)
  const [customSections, setCustomSections] = useState(loadCustomSections)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    } catch (err) {
      console.error('บันทึกข้อมูลไม่สำเร็จ (พื้นที่จัดเก็บอาจเต็ม)', err)
    }
  }, [content])

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_SECTIONS_KEY, JSON.stringify(customSections))
    } catch (err) {
      console.error('บันทึก custom sections ไม่สำเร็จ (พื้นที่จัดเก็บอาจเต็ม)', err)
    }
  }, [customSections])

  const updateCollection = useCallback((key, value) => {
    setContent((prev) => ({ ...prev, [key]: value }))
  }, [])

  // ---------- Custom Sections API ----------
  const addCustomSection = useCallback(({ label, icon, color, column, template, sub }) => {
    const id = genId()
    setCustomSections((prev) => [
      ...prev,
      {
        id,
        label: label || 'Section ใหม่',
        icon: icon || 'ti-list',
        color: color || 'var(--color-blue-600)',
        column: column === 'right' ? 'right' : 'left', // default ซ้าย
        // 'list' = รายการยาว, 'grid' = แบบไอคอนตาราง, 'expandable' = การ์ดพับ/กางเดียว
        template: ['list', 'grid', 'expandable'].includes(template) ? template : 'list',
        sub: sub || '', // ใช้เฉพาะ template แบบ 'expandable' (คำอธิบายรองใต้ชื่อ section)
        items: [],
      },
    ])
    return id
  }, [])

  const updateCustomSectionMeta = useCallback((id, patch) => {
    setCustomSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }, [])

  const updateCustomSectionItems = useCallback((id, items) => {
    setCustomSections((prev) => prev.map((s) => (s.id === id ? { ...s, items } : s)))
  }, [])

  const removeCustomSection = useCallback((id) => {
    setCustomSections((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const moveCustomSection = useCallback((id, dir) => {
    setCustomSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id)
      const target = idx + dir
      if (idx < 0 || target < 0 || target >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[target]] = [next[target], next[idx]]
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
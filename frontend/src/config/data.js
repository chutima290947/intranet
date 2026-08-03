/* ------------------------------------------------------------------
   ไฟล์นี้คงไว้เพื่อความเข้ากันได้ย้อนหลัง (backward compatibility) เท่านั้น
   ค่าเริ่มต้นจริงของข้อมูลทั้งหมดย้ายไปอยู่ที่ src/data/defaultContent.js แล้ว

   คอมโพเนนต์ในเว็บไซต์ตอนนี้ไม่ได้ import จากไฟล์นี้โดยตรงอีกต่อไป —
   ทุกที่เปลี่ยนไปใช้ useContent() จาก src/context/ContentContext.jsx แทน
   เพื่อให้ข้อมูลที่ผู้ดูแลระบบแก้ไขในแผงควบคุมมีผลจริงบนหน้าเว็บ

   ถ้ามีโค้ดส่วนอื่นที่ยัง import ค่าคงที่ (เช่น SECTIONS, DIVISIONS) จากไฟล์นี้
   ตรงๆ อยู่ ค่าที่ได้จะเป็น "ค่าเริ่มต้น" เท่านั้น ไม่ใช่ค่าที่แก้ไขล่าสุด
   แนะนำให้เปลี่ยนไปใช้ useContent() แทนโดยเร็ว
------------------------------------------------------------------ */
import { DEFAULT_CONTENT } from '../data/defaultContent'

export const SITE = DEFAULT_CONTENT.SITE
export const SECTIONS = DEFAULT_CONTENT.SECTIONS
export const ANN_NEWS = DEFAULT_CONTENT.ANN_NEWS
export const DIGITAL_SERVICES = DEFAULT_CONTENT.DIGITAL_SERVICES
export const N_SYSTEMS = DEFAULT_CONTENT.N_SYSTEMS
export const ONCALL = DEFAULT_CONTENT.ONCALL
export const NEWS = DEFAULT_CONTENT.NEWS
export const PROMOS = DEFAULT_CONTENT.PROMOS
export const QUALITY = DEFAULT_CONTENT.QUALITY
export const PARTNERS = DEFAULT_CONTENT.PARTNERS
export const FINANCE_DOCS = DEFAULT_CONTENT.FINANCE_DOCS
export const TEMPLATE_OPTIONS = DEFAULT_CONTENT.TEMPLATE_OPTIONS
export const DOCTOR_LINKS = DEFAULT_CONTENT.DOCTOR_LINKS
export const DIVISIONS = DEFAULT_CONTENT.DIVISIONS
export const REPORTS = DEFAULT_CONTENT.REPORTS
export const REQUEST_CATEGORIES = DEFAULT_CONTENT.REQUEST_CATEGORIES

import { useEffect, useRef, useState } from 'react'
import { useContent } from '../../context/ContentContext'
import { getFileUrl } from '../Admin/editors/FieldInputs'

// key ที่ใช้เก็บใน sessionStorage ว่า "ชุด" โฆษณาที่เปิดใช้งานอยู่ตอนนี้เคยแสดงไปแล้วหรือยัง
// เก็บเป็นรายชื่อ (label) ของทุกรายการที่เปิดใช้งาน เรียงตามลำดับ ต่อกันด้วย "|"
// ถ้าแอดมินเพิ่ม/ลบ/เปลี่ยนชื่อรายการใดๆ ในชุด -> key จะเปลี่ยน -> ผู้ใช้จะเห็นป๊อปอัพใหม่อีกครั้ง
const SESSION_KEY = 'intranet:popup-ad-shown'

// ระยะเวลาเลื่อนสไลด์อัตโนมัติ (มิลลิวินาที)
const AUTO_SLIDE_INTERVAL = 5000

// ความกว้างกรอบป๊อปอัพ: สูงสุด / ต่ำสุด (px) — กันไม่ให้กว้างเกินไปตอนรูป landscape มากๆ
// และกันไม่ให้แคบเกินไปจนอ่านข้อความ/กดปุ่มลำบากตอนรูปเป็นไอคอนเล็กๆ
const MAX_CARD_WIDTH = 560
const MIN_CARD_WIDTH = 300
// ความสูงของรูปสูงสุด (คิดเป็น % ของความสูงจอ) — ใช้คำนวณย่อขนาดรูปแนวตั้งที่สูงมากๆ
const MAX_IMG_HEIGHT_RATIO = 0.7
// ระยะขอบจอที่กันไว้ไม่ให้กรอบชนขอบซ้ายขวา (px, รวม 2 ฝั่ง)
const VIEWPORT_PADDING = 32

// ============================================================
// PopupAd
// แสดงทับหน้าเว็บก่อนเข้าสู่หน้า Home จริง — ปิดได้ (ปุ่ม X หรือกดพื้นหลัง)
// รองรับหลายรายการพร้อมกัน แสดงเป็นสไลด์เลื่อนดูได้ (ลูกศร / จุดบอกตำแหน่ง / ปัดนิ้ว)
// เลื่อนสไลด์อัตโนมัติทุก 5 วินาที และพักออโต้เลื่อนเมื่อเมาส์ชี้อยู่ที่ป๊อปอัพ
//
// ความกว้างของกรอบป๊อปอัพคำนวณจากขนาดจริงของรูปภาพแต่ละสไลด์เสมอ (ไม่ใช่ค่าตายตัว)
// เพื่อไม่ให้เกิดขอบขาวข้างรูปเวลารูปเป็นแนวตั้ง/สัดส่วนแปลกๆ — ดูฟังก์ชัน computeCardWidth
// ดีไซน์แต่ละสไลด์: รูปภาพด้านบน -> ป้ายหมวดหมู่ + เวลา -> หัวข้อ -> เนื้อหา -> ปุ่ม CTA (ถ้าเปิดใช้งาน)
// เนื้อหาทั้งหมดแก้ไขได้จาก Admin > ป๊อปอัพโฆษณา (schema key: POPUP_ADS)
// ============================================================
export function PopupAd() {
  const { content } = useContent()
  const ads = (content.POPUP_ADS || []).filter((a) => a.enabled && a.img)

  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [imgDims, setImgDims] = useState({}) // { [index]: { w, h } } ขนาดจริงของรูปแต่ละสไลด์ (px)
  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1024,
    h: typeof window !== 'undefined' ? window.innerHeight : 768,
  }))
  const touchStartX = useRef(null)

  // key เฉพาะของ "ชุด" โฆษณาที่เปิดใช้งานอยู่ตอนนี้ + เช็คว่ามีรายการไหนติ๊ก "แสดงทุกครั้ง" บ้าง
  // ถ้ามีอย่างน้อย 1 รายการติ๊กไว้ -> ป๊อปอัพทั้งชุดจะแสดงทุกครั้งที่เข้าเว็บ (ข้ามการเช็ค session)
  const setKey = ads.map((a) => a.label || '').join('|')
  const alwaysShow = ads.some((a) => a.showEveryTime)

  useEffect(() => {
    setIndex(0)
    setImgDims({})

    if (ads.length === 0) {
      setVisible(false)
      return
    }

    if (alwaysShow) {
      setVisible(true)
      return
    }

    try {
      const shownKey = sessionStorage.getItem(SESSION_KEY)
      setVisible(shownKey !== setKey)
    } catch {
      // เข้าถึง sessionStorage ไม่ได้ (เช่น private mode บางเบราว์เซอร์) -> แสดงไปก่อน
      setVisible(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setKey, alwaysShow, ads.length])

  // อัปเดตขนาดจอเมื่อ resize เพื่อคำนวณความกว้างกรอบป๊อปอัพใหม่ให้ถูกต้องเสมอ
  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // โหลดรูปทุกสไลด์ล่วงหน้าตั้งแต่ป๊อปอัพเปิด พร้อมจับขนาดจริง (naturalWidth/Height) ของแต่ละรูป
  // เก็บไว้ใน imgDims เพื่อใช้คำนวณความกว้างกรอบป๊อปอัพให้พอดีกับรูปเสมอ ไม่มีขอบขาวเกิน
  useEffect(() => {
    if (!visible || ads.length === 0) return

    ads.forEach((a, i) => {
      const img = new Image()
      img.onload = () => {
        setImgDims((prev) =>
          prev[i] ? prev : { ...prev, [i]: { w: img.naturalWidth, h: img.naturalHeight } }
        )
      }
      img.src = getFileUrl(a.img)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, ads])

  // ออโต้เลื่อนสไลด์ทุก AUTO_SLIDE_INTERVAL — หยุดเมื่อ: ป๊อปอัพไม่แสดง, มีรายการเดียว,
  // หรือเมาส์กำลังชี้อยู่ที่ป๊อปอัพ (isHovering) — ตัวจับเวลาจะถูกสร้างใหม่ทุกครั้งที่ index เปลี่ยน
  useEffect(() => {
    if (!visible || ads.length <= 1 || isHovering) return

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % ads.length)
    }, AUTO_SLIDE_INTERVAL)

    return () => clearInterval(timer)
  }, [visible, ads.length, isHovering, index])

  if (ads.length === 0 || !visible) return null

  const ad = ads[index]

  // คำนวณความกว้างกรอบป๊อปอัพจากขนาดจริงของรูปสไลด์ปัจจุบัน (ถ้ายังโหลดไม่เสร็จ ใช้ค่าสูงสุดไปก่อน
  // แล้วจะปรับให้พอดีทันทีที่รู้ขนาดจริง) — ผลลัพธ์คือกรอบจะพอดีตัวกับรูปเสมอ ไม่ว่ารูปจะสัดส่วนอะไร
  const maxWidthPx = Math.min(MAX_CARD_WIDTH, viewport.w - VIEWPORT_PADDING)
  const maxHeightPx = viewport.h * MAX_IMG_HEIGHT_RATIO
  const dims = imgDims[index]

  let cardWidth = maxWidthPx
  if (dims && dims.w > 0 && dims.h > 0) {
    let renderW = dims.w
    let renderH = dims.h

    // ถ้ารูปสูงเกิน maxHeightPx (เช่น โปสเตอร์แนวตั้งยาวๆ) -> ย่อลงตามสัดส่วน
    if (renderH > maxHeightPx) {
      renderW = renderW * (maxHeightPx / renderH)
      renderH = maxHeightPx
    }

    cardWidth = Math.min(renderW, maxWidthPx)
    cardWidth = Math.max(cardWidth, Math.min(MIN_CARD_WIDTH, maxWidthPx))
  }

  const close = () => {
    setVisible(false)

    if (!alwaysShow) {
      try {
        sessionStorage.setItem(SESSION_KEY, setKey)
      } catch {
        // ignore storage errors
      }
    }
  }

  const goNext = () => setIndex((i) => (i + 1) % ads.length)
  const goPrev = () => setIndex((i) => (i - 1 + ads.length) % ads.length)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || ads.length <= 1) return

    const diff = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(diff) > 40) {
      if (diff < 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
  }

  // ปุ่ม CTA แสดงก็ต่อเมื่อแอดมินติ๊ก "เปิดใช้งานปุ่ม" ไว้ในรายการนี้ (ctaEnabled)
  // และมีปลายทางให้กด (href หรือไฟล์แนบ) — ใช้ href ก่อนถ้ามีทั้งคู่
  const ctaFileUrl = ad.file && typeof ad.file === 'object' ? ad.file.url : null
  const ctaTarget = ad.href || ctaFileUrl
  const hasCta = Boolean(ad.ctaEnabled && ctaTarget)

  const handleCtaClick = () => {
    if (!ctaTarget) return
    window.open(getFileUrl(ctaTarget), '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-[2px]"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={ad.title || ad.label || 'ป๊อปอัพประกาศ'}
    >
      <div
        className="relative flex max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-[width] duration-150"
        style={{ width: cardWidth }}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* รูปภาพด้านบน + ปุ่มปิด + ลูกศรเลื่อนสไลด์ + จุดบอกตำแหน่ง */}
        <div
          className="relative flex-shrink-0"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={getFileUrl(ad.img)}
            alt={ad.title || ad.label || ''}
            className="block max-h-[70vh] w-full select-none object-contain"
            draggable={false}
          />

          <button
            type="button"
            onClick={close}
            aria-label="ปิดหน้าต่างประกาศ"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border-none bg-white/90 text-navy-900 shadow-md transition-colors hover:bg-white"
          >
            <i className="ti ti-x text-[18px]" />
          </button>

          {ads.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="โฆษณาก่อนหน้า"
                className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-none bg-white/80 text-navy-900 shadow-md transition-colors hover:bg-white"
              >
                <i className="ti ti-chevron-left text-[16px]" />
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="โฆษณาถัดไป"
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-none bg-white/80 text-navy-900 shadow-md transition-colors hover:bg-white"
              >
                <i className="ti ti-chevron-right text-[16px]" />
              </button>

              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
                {ads.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`ไปยังโฆษณาลำดับที่ ${i + 1}`}
                    className={`h-1.5 rounded-full border-none transition-all ${
                      i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* เนื้อหา: ป้ายหมวดหมู่ + เวลา / หัวข้อ / เนื้อหา / ปุ่ม CTA
            แสดงส่วนนี้ก็ต่อเมื่อมีอย่างน้อย 1 อย่างจริงๆ (badge/timeLabel/title/description/CTA)
            ถ้าแอดมินเว้นว่างทุกช่อง (ใช้แต่รูปภาพเต็มใบ) ส่วนนี้จะไม่แสดงเลย ไม่มีที่ว่างเกินมา */}
        {(ad.badge || ad.timeLabel || ad.title || ad.description || hasCta) && (
          <div className="overflow-y-auto px-6 py-5">
            {(ad.badge || ad.timeLabel) && (
              <div className="mb-2 flex flex-wrap items-center gap-2 text-[12px] font-semibold">
                {ad.badge && (
                  <span className="flex items-center gap-1.5 uppercase tracking-wide text-blue-600">
                    <i className="ti ti-speakerphone text-[14px]" />
                    {ad.badge}
                  </span>
                )}
                {ad.badge && ad.timeLabel && (
                  <span className="text-ink-soft/40">•</span>
                )}
                {ad.timeLabel && (
                  <span className="font-medium text-ink-soft">{ad.timeLabel}</span>
                )}
              </div>
            )}

            {ad.title && (
              <h3 className="mb-2 text-[19px] font-bold leading-snug text-navy-900">
                {ad.title}
              </h3>
            )}

            {ad.description && (
              <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-ink-soft">
                {ad.description}
              </p>
            )}

            {hasCta && (
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={handleCtaClick}
                  className="flex items-center gap-1.5 rounded-lg border-none bg-navy-900 px-4 py-2.5 text-[13px] font-bold text-white hover:bg-navy-800"
                >
                  {ad.ctaLabel || 'ดูรายละเอียดเพิ่มเติม'}
                  <i className="ti ti-arrow-right text-[15px]" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

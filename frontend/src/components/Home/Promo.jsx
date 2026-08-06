import { useState } from 'react'
import { useContent } from '../../context/ContentContext'
import { PromoModal } from './PromoModal'

// สร้างตัวอักษรย่อจากชื่อแพ็กเกจ: คำแรก+คำสุดท้าย เอาตัวแรกของแต่ละคำ
// ถ้ามีคำเดียว ใช้ 2 ตัวอักษรแรกของคำนั้นแทน
function getInitials(name) {
  const words = (name || '').trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

export function Promo() {
  const { content } = useContent()
  const PROMOS = content.PROMOS
  const [selected, setSelected] = useState(null)

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white" id="sec-promo" data-card>
      <div className="flex items-center gap-2 border-b border-line px-[18px] py-[13px]">
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-coral-tint">
          <i className="ti ti-star text-coral" />
        </div>
        <h3 className="text-[13px] font-bold text-navy-900">โปรโมชันและแพ็กเกจสุขภาพ</h3>
      </div>
      <div className="px-[18px] py-4">
        <div className="grid grid-cols-4 gap-[11px] max-[1100px]:grid-cols-3 max-[560px]:grid-cols-2">
          {PROMOS.map(p => (
            <button
              type="button"
              className="overflow-hidden rounded-md border border-line text-left"
              key={p.name}
              onClick={() => setSelected(p)}
            >
              <div
                className="flex h-[92px] w-full items-center justify-center"
                style={
                  p.img
                    ? { backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : { background: `linear-gradient(135deg, ${p.color || '#1B3A6B'}, var(--color-blue-500))` }
                }
              >
                {!p.img && (
                  p.icon ? (
                    <i className={`ti ${p.icon} text-[34px] text-white/85`} />
                  ) : (
                    <span className="text-[22px] font-bold tracking-wide text-white/90">{getInitials(p.name)}</span>
                  )
                )}
              </div>
              <span className="relative top-0 left-0 m-1.5 inline-block rounded-[20px] px-2.5 py-[3px] text-[8px] font-bold text-white" style={{ background: p.color }}>{p.tag}</span>
              <div className="bg-white px-[9px] py-2 text-[10.5px] leading-[1.35] font-bold text-navy-900">{p.name}</div>
            </button>
          ))}
        </div>
      </div>

      <PromoModal promo={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
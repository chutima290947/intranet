export function PromoModal({ promo, onClose }) {
  if (!promo) return null

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[82vh] w-full max-w-[400px] overflow-y-auto rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 border-none"
        >
          <i className="ti ti-x text-[15px] text-ink" />
        </button>

        <div
          className="flex h-[110px] items-center justify-center"
          style={
            promo.img
              ? { backgroundImage: `url(${promo.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : { background: `linear-gradient(135deg, ${promo.color}, var(--color-blue-500))` }
          }
        >
          {!promo.img && <i className={`ti ${promo.icon} text-4xl text-white/85`} />}
        </div>

        <div className="p-[18px]">
          <span
            className="mb-2 inline-block rounded-[20px] px-2.5 py-[3px] text-[9px] font-bold text-white"
            style={{ background: promo.color }}
          >
            {promo.tag}
          </span>
          <h3 className="mb-3 text-[15px] font-bold text-ink">{promo.name}</h3>

          {promo.items?.length > 0 && (
            <div className="flex flex-col gap-1.5">
              {promo.items.map((it) => (
                <a
                  key={it.label}
                  href="#"
                  className="flex items-center gap-2.5 rounded-lg border border-line bg-paper px-3 py-2.5 no-underline transition-colors hover:border-blue-500/40 hover:bg-blue-tint"
                >
                  <i className={`ti ${it.icon} text-sm text-blue-600 shrink-0`} />
                  <span className="text-[12px] leading-tight text-ink">{it.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

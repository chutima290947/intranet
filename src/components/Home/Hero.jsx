import { ORG_NAME } from '../../config/site'
import heroImg from '../../assets/hero-building1.jpg'

/* หมายเหตุ: ฟอร์มนี้เป็น UI เปล่า ๆ ยังไม่เชื่อมต่อ backend ใด ๆ
   เมื่อคุณต่อระบบ auth จริง ให้ทำ submit ไปยัง endpoint ของคุณเอง */
export function Hero() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('ฟอร์มนี้ยังไม่ได้เชื่อมต่อระบบ authentication ใด ๆ (frontend only)')
  }
  return (
    <div
      className="relative min-h-[272px] overflow-hidden bg-gradient-to-tr from-navy-950 to-navy-800"
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(4,10,30,.82) 15%, rgba(9, 49, 124, 0.55) 100%), url(${heroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-[1] mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-6 px-[34px] py-9 max-[900px]:flex-col max-[900px]:items-start">
        <div>
          <div className="mb-3.5 flex items-center gap-2.5 text-[11px] font-bold tracking-[3px] text-white/50 uppercase">
            <span className="h-0.5 w-[26px] flex-shrink-0 rounded-sm bg-coral" />
            {ORG_NAME}
          </div>
          <div className="font-display text-[38px] leading-[1.08] font-semibold text-white">
            Intranet <em className="font-medium text-coral not-italic italic">System</em>
          </div>
          <div className="mt-3.5 max-w-[380px] text-[13px] leading-[1.65] text-white/60">
            ระบบสารสนเทศภายในสำหรับบุคลากรโรงพยาบาลกรุงเทพสิริโรจน์
          </div>
        </div>
        <form className="flex min-w-[250px] flex-col gap-2.5 rounded-lg bg-white/98 px-5 pt-5 pb-[18px] shadow-[0_20px_44px_rgba(4,16,36,.35)]" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between text-[10.5px] font-bold tracking-wide text-ink-soft uppercase">
            Login form<i className="ti ti-lock text-sm text-coral" />
          </div>
          <input type="text" name="username" placeholder="User Name" autoComplete="off" className="w-full rounded-xs border border-line bg-paper px-[11px] py-[9px] text-[12.5px] focus:bg-white focus:outline-2 focus:outline-offset-1 focus:outline-blue-500" />
          <input type="password" name="password" placeholder="Password" autoComplete="off" className="w-full rounded-xs border border-line bg-paper px-[11px] py-[9px] text-[12.5px] focus:bg-white focus:outline-2 focus:outline-offset-1 focus:outline-blue-500" />
          <button type="submit" className="w-full rounded-xs border-none bg-coral p-[11px] text-[13px] font-bold text-white hover:bg-[#C13E27]">Login</button>
          <div className="mt-0.5 flex justify-between">
            <a href="#" className="text-[10px] font-medium text-blue-600 no-underline">Forgot password?</a>
            <a href="#" className="text-[10px] font-medium text-blue-600 no-underline">Forgot username?</a>
          </div>
          <div className="mt-2.5 border-t border-line pt-2.5 text-center text-[10.5px] text-ink-soft">
            Don't have an account? <a href="#" className="ml-1 font-bold text-coral no-underline">Create one</a>
          </div>
          <div className="mt-2 text-[9.5px] text-white/40">* ตัวอย่าง UI เท่านั้น ยังไม่ส่งข้อมูลไปที่ใด</div>
        </form>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useClock } from '../../hooks/useClock'

export function StatsBar() {
  const time = useClock()
  const [ip, setIp] = useState('—')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(ip).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(() => setIp('ไม่สามารถดึง IP ได้'))
  }, [])
  return (
    <div className="flex flex-wrap items-center justify-center gap-0 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 px-8 py-3.5">
      <div className="flex items-center gap-3 border-r border-white/[0.12] px-[34px] py-1">
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-coral/[0.18]">
          <i className="ti ti-router text-lg text-coral" />
        </div>
          <div className="flex flex-col gap-0.5">
          <span className="text-[9.5px] font-bold tracking-wide text-white/45 uppercase">Your IP Address</span>
          <span className="flex items-center gap-2 font-mono text-[17px] font-bold text-white">
            {ip}
            <button
              onClick={handleCopy}
              className="flex items-center justify-center rounded border-none bg-white/10 p-1 text-white/60 hover:bg-white/20 hover:text-white"
              aria-label="Copy IP address"
            >
              <i className={`ti ${copied ? 'ti-check' : 'ti-copy'} text-sm`} />
            </button>
          </span>
        </div>
        </div>
      <div className="flex items-center gap-3 border-r border-white/[0.12] px-[34px] py-1">
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-coral/[0.18]">
          <i className="ti ti-clock text-lg text-coral" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[9.5px] font-bold tracking-wide text-white/45 uppercase">Server Time</span>
          <span className="font-mono text-[17px] font-bold text-white">{time}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 px-[34px] py-1">
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-coral/[0.18]">
          <i className="ti ti-plug-connected text-lg text-coral" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[9.5px] font-bold tracking-wide text-white/45 uppercase">Connection Status</span>
          <span className="flex items-center gap-1.5 font-body text-sm text-[#4ade80]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]" />
            Online
          </span>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { ADMIN_SCHEMAS } from '../../data/adminSchemas'
import { CollectionEditor } from './editors/CollectionEditor'
import { JsonEditor } from './editors/JsonEditor'
import { SiteSettingsEditor } from './editors/SiteSettingsEditor'
import { useAuth } from '../../context/AuthContext'

export function AdminLayout({ onExit }) {
  const { logout } = useAuth()
  const [activeKey, setActiveKey] = useState(ADMIN_SCHEMAS[0].items[0].key)

  const activeSchema = ADMIN_SCHEMAS.flatMap((g) => g.items).find((s) => s.key === activeKey)

  const handleLogout = () => {
    logout()
    onExit()
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="flex w-[270px] flex-shrink-0 flex-col border-r border-line bg-white">
        <div className="border-b border-line px-5 py-4">
          <div className="text-[13px] font-bold text-navy-900">แผงควบคุมเนื้อหา</div>
          <div className="text-[10.5px] text-ink-soft">แก้ไขข้อมูลต่างๆ บนเว็บไซต์</div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {ADMIN_SCHEMAS.map((group) => (
            <div key={group.group} className="mb-4">
              <div className="mb-1.5 px-2 text-[10px] font-bold tracking-wide text-ink-soft/70 uppercase">
                {group.group}
              </div>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveKey(item.key)}
                    className={`rounded-md border-none px-2.5 py-2 text-left text-[12px] font-semibold ${
                      activeKey === item.key ? 'bg-blue-tint text-blue-600' : 'bg-transparent text-ink hover:bg-paper'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-line p-3">
          <button
            type="button"
            onClick={onExit}
            className="mb-2 flex w-full items-center justify-center gap-1.5 rounded-md border border-line bg-white px-3 py-2 text-[12px] font-semibold text-ink"
          >
            <i className="ti ti-arrow-left text-sm" />กลับหน้าเว็บ
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-1.5 rounded-md border-none bg-coral px-3 py-2 text-[12px] font-bold text-white"
          >
            <i className="ti ti-logout text-sm" />ออกจากระบบ
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto px-8 py-7">
        {activeSchema?.type === 'json' && <JsonEditor schema={activeSchema} />}
        {activeSchema?.type === 'list' && <CollectionEditor schema={activeSchema} />}
        {activeSchema?.type === 'site' && <SiteSettingsEditor />}
      </main>
    </div>
  )
}

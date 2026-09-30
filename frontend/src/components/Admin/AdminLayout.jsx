import { useState, useEffect } from 'react'
import { ADMIN_SCHEMAS } from '../../data/adminSchemas'
import { CollectionEditor } from './editors/CollectionEditor'
import { JsonEditor } from './editors/JsonEditor'
import { SiteSettingsEditor } from './editors/SiteSettingsEditor'
import { CustomSectionsPanel } from './CustomSectionsPanel'
import { UserRolePanel } from './UserRolePanel'
import { useAuth } from '../../context/AuthContext'
import { ChangePasswordModal } from './ChangePasswordModal'

const CUSTOM_SECTIONS_KEY = '__custom_sections__'
const USER_ROLE_KEY = '__user_role_panel__'
const ADMIN_TAB_STORAGE_KEY = 'intranet:admin-active-key'

function loadStoredAdminKey() {
  try {
    return sessionStorage.getItem(ADMIN_TAB_STORAGE_KEY)
  } catch {
    return null
  }
}

export function AdminLayout({ onExit }) {
  const { logout, can, username, roleLabel } = useAuth()
  const [showChangePassword, setShowChangePassword] = useState(false)


  const firstVisibleKey = ADMIN_SCHEMAS.flatMap((g) => g.items).find((s) => can(s.key, 'view'))?.key || null
  // จำเมนูที่เปิดอยู่ไว้ Refresh แล้วจะอยู่เมนูเดิม (ถ้าเมนูนั้นยังมีสิทธิ์ดูอยู่)
  const allKeys = ADMIN_SCHEMAS.flatMap((g) => g.items).filter((s) => can(s.key, 'view')).map((s) => s.key)
  const storedKey = loadStoredAdminKey()
  const storedKeyValid =
    storedKey &&
    (allKeys.includes(storedKey) ||
      storedKey === CUSTOM_SECTIONS_KEY ||
      (storedKey === USER_ROLE_KEY && can('USERS', 'view')))
  const [activeKey, setActiveKey] = useState(storedKeyValid ? storedKey : firstVisibleKey)

  useEffect(() => {
    try {
      if (activeKey) sessionStorage.setItem(ADMIN_TAB_STORAGE_KEY, activeKey)
    } catch {
      // ignore
    }
  }, [activeKey])

  const activeSchema = ADMIN_SCHEMAS.flatMap((g) => g.items).find((s) => s.key === activeKey)
  const isCustomSectionsPage = activeKey === CUSTOM_SECTIONS_KEY
  const isUserRolePage = activeKey === USER_ROLE_KEY

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(ADMIN_TAB_STORAGE_KEY)
    } catch {
      // ignore
    }
    logout()
    onExit()
  }

  return (
    <div className="flex h-screen overflow-hidden bg-paper">
      <aside className="flex h-full w-[270px] flex-shrink-0 flex-col border-r border-line bg-white">
        <div className="border-b border-line px-5 py-4">
          <div className="text-[13px] font-bold text-navy-900">แผงควบคุมเนื้อหา</div>
          <div className="text-[10.5px] text-ink-soft">แก้ไขข้อมูลต่างๆ บนเว็บไซต์</div>

          {username && (
            <div className="mt-2 flex items-center gap-1.5 text-[11.5px] font-semibold text-blue-600">
              <i className="ti ti-user-circle text-[14px]" />
              <span className="truncate">{username}</span>
              {roleLabel && (
                <span className="flex-shrink-0 rounded-full bg-blue-tint px-2 py-0.5 text-[10px] font-bold text-blue-600">
                  {roleLabel}
                </span>
              )}
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {ADMIN_SCHEMAS.map((group) => {
            // ซ่อนรายการที่ user ไม่มีสิทธิ์ "ดู" resource นั้นๆ
            const visibleItems = group.items.filter((item) => can(item.key, 'view'))
            if (visibleItems.length === 0) return null // ซ่อนทั้งกลุ่มถ้าไม่มีเมนูไหนในกลุ่มมองเห็นได้เลย

            return (
              <div key={group.group} className="mb-4">
                <div className="mb-1.5 px-2 text-[10px] font-bold tracking-wide text-ink-soft/70 uppercase">
                  {group.group}
                </div>
                <div className="flex flex-col gap-0.5">
                  {visibleItems.map((item) => (
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
            )
          })}

          {/* เมนูพิเศษ: Section ที่สร้างเองในหน้า Home — เพิ่ม/ลบได้ไม่จำกัด ไม่ต้องแก้โค้ด */}
          <div className="mb-4">
            <div className="mb-1.5 px-2 text-[10px] font-bold tracking-wide text-ink-soft/70 uppercase">
              กำหนดเอง
            </div>
            <div className="flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() => setActiveKey(CUSTOM_SECTIONS_KEY)}
                className={`flex items-center gap-1.5 rounded-md border-none px-2.5 py-2 text-left text-[12px] font-semibold ${
                  isCustomSectionsPage ? 'bg-blue-tint text-blue-600' : 'bg-transparent text-ink hover:bg-paper'
                }`}
              >
                <i className="ti ti-layout-grid-add text-[13px]" />
                Section ที่สร้างเอง (หน้า Home)
              </button>
              {can('USERS', 'view') && (
                <button
                  type="button"
                  onClick={() => setActiveKey(USER_ROLE_KEY)}
                  className={`flex items-center gap-1.5 rounded-md border-none px-2.5 py-2 text-left text-[12px] font-semibold ${
                    isUserRolePage ? 'bg-blue-tint text-blue-600' : 'bg-transparent text-ink hover:bg-paper'
                  }`}
                >
                  <i className="ti ti-users-group text-[13px]" />
                  จัดการผู้ใช้และสิทธิ์
                </button>
              )}
            </div>
          </div>
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
            className="mb-2 flex w-full items-center justify-center gap-1.5 rounded-md border-none bg-coral px-3 py-2 text-[12px] font-bold text-white"
          >
            <i className="ti ti-logout text-sm" />ออกจากระบบ
          </button>
          
          <button
            type="button"
            onClick={() => setShowChangePassword(true)}
            className="flex w-full items-center justify-center gap-1.5 rounded-md border border-line bg-white px-3 py-2 text-[12px] font-semibold text-ink"
          >
            <i className="ti ti-key text-sm" />เปลี่ยนรหัสผ่าน
          </button>
        </div>
      </aside>

      <main className="h-full flex-1 overflow-y-auto px-8 py-7">
        {isCustomSectionsPage && <CustomSectionsPanel />}
        {isUserRolePage && <UserRolePanel />}
        {!isCustomSectionsPage && !isUserRolePage && activeSchema && !can(activeSchema.key, 'view') && (
          <p className="py-10 text-center text-[13px] text-ink-soft">คุณไม่มีสิทธิ์เข้าถึงส่วนนี้</p>
        )}
        {!isCustomSectionsPage && !isUserRolePage && activeSchema && can(activeSchema.key, 'view') && (
          <>
            {activeSchema.type === 'json' && <JsonEditor schema={activeSchema} />}
            {activeSchema.type === 'list' && <CollectionEditor schema={activeSchema} />}
            {activeSchema.type === 'site' && <SiteSettingsEditor />}
          </>
        )}
        {!isCustomSectionsPage && !isUserRolePage && !activeSchema && (
          <p className="py-10 text-center text-[13px] text-ink-soft">ไม่มีเมนูที่คุณมีสิทธิ์เข้าถึง</p>
        )}
      </main>
           {showChangePassword && (
       <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
     )}
    </div>
  )
}
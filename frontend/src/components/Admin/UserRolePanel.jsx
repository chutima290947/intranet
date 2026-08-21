import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'

// โดเมนจริงของเว็บที่ deploy ไว้ (เช่น https://intranet-front.onrender.com)
// ต้องใช้ค่าคงที่นี้แทน window.location.origin เพราะลิงก์ตั้งรหัสผ่านต้องส่งให้คนอื่นเปิด
// ถ้าใช้ window.location.origin ตรงๆ แล้วแอดมินเผลอสร้างบัญชีจากเครื่อง dev (localhost)
// ลิงก์ที่ได้จะกลายเป็น localhost ซึ่งเปิดจากเครื่องอื่นไม่ได้ (not found)
// ตั้งค่า VITE_SITE_URL ใน Render > frontend > Environment ให้เป็นโดเมนจริงเสมอ
// ถ้าไม่ได้ตั้งไว้ (เช่นตอน dev ในเครื่อง) จะ fallback ไปใช้ window.location.origin ตามเดิม
function getSiteUrl() {
  return import.meta.env.VITE_SITE_URL || window.location.origin
}

function CreateUserForm({ roles, onCreated }) {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [roleId, setRoleId] = useState(roles[0]?.id || '')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [createdLink, setCreatedLink] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const res = await api.createUser(username, displayName, roleId)
      const fullLink = `${getSiteUrl()}${import.meta.env.BASE_URL}setup-password/${res.setupToken}`
      setCreatedLink(fullLink)
      setUsername('')
      setDisplayName('')
      onCreated()
    } catch (err) {
      setError(err.message || 'สร้างบัญชีไม่สำเร็จ')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <h3 className="mb-3 text-[13px] font-bold text-navy-900">+ สร้างบัญชีผู้ใช้ใหม่</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-2.5">
        <div>
          <label className="mb-1 block text-[10px] font-bold text-ink-soft">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]"
          />
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-bold text-ink-soft">ชื่อที่แสดง (ไม่บังคับ)</label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]"
          />
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-bold text-ink-soft">Role</label>
          <select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]"
          >
            {roles.map((r) => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </div>
        <div className="col-span-3">
          <button
            type="submit"
            disabled={busy || !roleId}
            className="rounded-lg border-none bg-navy-900 px-3.5 py-2 text-[11.5px] font-bold text-white disabled:opacity-50"
          >
            {busy ? 'กำลังสร้าง...' : 'สร้างบัญชี'}
          </button>
        </div>
      </form>
      {error && <p className="mt-2 text-[11px] font-semibold text-coral">{error}</p>}
      {createdLink && (
        <div className="mt-3 rounded-lg border border-teal bg-teal/5 p-3">
          <p className="mb-1.5 text-[11.5px] font-semibold text-ink">
            สร้างบัญชีสำเร็จ — ส่งลิงก์นี้ให้พนักงานเพื่อตั้งรหัสผ่านครั้งแรก (ใช้ได้ 7 วัน):
          </p>
          <div className="flex items-center gap-2">
            <input readOnly value={createdLink} className="flex-1 rounded-md border border-line bg-white px-2.5 py-1.5 text-[11px]" />
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(createdLink)}
              className="rounded-md border-none bg-blue-600 px-2.5 py-1.5 text-[10.5px] font-bold text-white"
            >
              คัดลอก
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ResetPasswordButton({ user }) {
  const [link, setLink] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  // ข้อความปุ่มเปลี่ยนตามสถานะ: ถ้ายังไม่เคยตั้งรหัสผ่านเลย = ลิงก์เดิมหมดอายุ (item 3)
  // ถ้าเคยตั้งแล้ว = ลืมรหัสผ่าน อยากตั้งใหม่ (item 2) — แต่ backend endpoint ทำงานเหมือนกันทั้งคู่
  const label = user.has_password ? 'รีเซ็ตรหัสผ่าน (ลืมรหัสผ่าน)' : 'ส่งลิงก์ตั้งรหัสผ่านใหม่'

  const handleClick = async () => {
    if (!window.confirm(`${label} สำหรับ "${user.username}"? รหัสผ่านเดิม (ถ้ามี) จะใช้ไม่ได้ทันที`)) return
    setBusy(true)
    setError('')
    try {
      const res = await api.resetUserPassword(user.id)
      const fullLink = `${getSiteUrl()}${import.meta.env.BASE_URL}setup-password/${res.setupToken}`
      setLink(fullLink)
    } catch (err) {
      setError(err.message || 'ทำรายการไม่สำเร็จ')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={busy}
        className="text-[10.5px] font-semibold text-blue-600 disabled:opacity-50"
      >
        {busy ? 'กำลังสร้างลิงก์...' : label}
      </button>
      {error && <p className="mt-1 text-[10px] font-semibold text-coral">{error}</p>}
      {link && (
        <div className="mt-1.5 flex items-center gap-1.5">
          <input readOnly value={link} className="w-52 rounded-md border border-line bg-white px-2 py-1 text-[10px]" />
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(link)}
            className="rounded-md border-none bg-blue-600 px-2 py-1 text-[10px] font-bold text-white"
          >
            คัดลอก
          </button>
        </div>
      )}
    </div>
  )
}

function UsersTable({ users, roles, onChanged }) {
  const handleRoleChange = async (id, roleId) => {
    await api.updateUserRole(id, roleId)
    onChanged()
  }
  const handleDelete = async (id, username) => {
    if (!window.confirm(`ลบบัญชี "${username}"?`)) return
    try {
      await api.deleteUser(id)
      onChanged()
    } catch (err) {
      alert(err.message || 'ลบไม่สำเร็จ')
    }
  }

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-line bg-white">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="border-b border-line bg-paper/50 text-left text-[10.5px] font-bold text-ink-soft">
            <th className="px-3.5 py-2.5">Username</th>
            <th className="px-3.5 py-2.5">ชื่อที่แสดง</th>
            <th className="px-3.5 py-2.5">Role</th>
            <th className="px-3.5 py-2.5">สถานะ</th>
            <th className="px-3.5 py-2.5">รหัสผ่าน</th>
            <th className="px-3.5 py-2.5"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-line last:border-b-0">
              <td className="px-3.5 py-2.5 font-semibold text-navy-900">{u.username}</td>
              <td className="px-3.5 py-2.5 text-ink-soft">{u.display_name || '—'}</td>
              <td className="px-3.5 py-2.5">
                {u.role_name === 'super_admin' ? (
                  <span className="rounded-full bg-navy-900/10 px-2.5 py-1 text-[11.5px] font-semibold text-navy-900">
                    {u.role_label}
                  </span>
                ) : (
                  <select
                    value={u.role_id || ''}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="rounded-md border border-line px-2 py-1 text-[11.5px]"
                  >
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                  </select>
                )}
              </td>
              <td className="px-3.5 py-2.5">
                {u.has_password ? (
                  <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10.5px] font-semibold text-teal">ใช้งานแล้ว</span>
                ) : (
                  <span className="rounded-full bg-amber/10 px-2 py-0.5 text-[10.5px] font-semibold text-amber">รอตั้งรหัสผ่าน</span>
                )}
              </td>
              <td className="px-3.5 py-2.5">
                <ResetPasswordButton user={u} />
              </td>
              <td className="px-3.5 py-2.5 text-right">
                <button
                  type="button"
                  onClick={() => handleDelete(u.id, u.username)}
                  className="text-coral"
                  aria-label={`ลบ ${u.username}`}
                >
                  <i className="ti ti-trash text-[13px]" />
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={6} className="py-6 text-center text-ink-soft">ยังไม่มีผู้ใช้</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

function CreateRoleForm({ onCreated }) {
  const [name, setName] = useState('')
  const [label, setLabel] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await api.createRole(name.trim().toLowerCase().replace(/\s+/g, '_'), label.trim())
      setName('')
      setLabel('')
      onCreated()
    } catch (err) {
      setError(err.message || 'สร้าง role ไม่สำเร็จ')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <div className="flex-1">
        <label className="mb-1 block text-[10px] font-bold text-ink-soft">ชื่อ Role ใหม่ (เช่น Finance, HR)</label>
        <input
          value={label}
          onChange={(e) => { setLabel(e.target.value); setName(e.target.value) }}
          required
          placeholder="Finance"
          className="w-full rounded-md border border-line px-2.5 py-1.5 text-[12px]"
        />
      </div>
      <button
        type="submit"
        disabled={busy}
        className="rounded-lg border-none bg-blue-600 px-3.5 py-2 text-[11.5px] font-bold text-white disabled:opacity-50"
      >
        + เพิ่ม Role
      </button>
      {error && <p className="text-[11px] font-semibold text-coral">{error}</p>}
    </form>
  )
}

function RolePermissionEditor({ role, catalog, onSaved }) {
  const [checked, setChecked] = useState(new Set(role.permissions))
  const [saving, setSaving] = useState(false)
  const [savedFlash, setSavedFlash] = useState(false)

  useEffect(() => {
    setChecked(new Set(role.permissions))
  }, [role.id])

  const toggle = (key) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const toggleRow = (resource, allKeys, allChecked) => {
    setChecked((prev) => {
      const next = new Set(prev)
      allKeys.forEach((k) => (allChecked ? next.delete(k) : next.add(k)))
      return next
    })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.setRolePermissions(role.id, Array.from(checked))
      setSavedFlash(true)
      setTimeout(() => setSavedFlash(false), 1500)
      onSaved()
    } finally {
      setSaving(false)
    }
  }

  const actionLabels = { view: 'ดู', create: 'เพิ่ม', update: 'แก้ไข', delete: 'ลบ' }

  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[14px] font-bold text-navy-900">สิทธิ์การใช้งาน — {role.label}</h3>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg border-none bg-navy-900 px-3.5 py-2 text-[11.5px] font-bold text-white disabled:opacity-50"
        >
          {savedFlash ? 'บันทึกแล้ว ✓' : saving ? 'กำลังบันทึก...' : 'บันทึกสิทธิ์'}
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        {catalog.resources.map((res) => {
          const allKeys = catalog.actions.map((a) => `${res.resource}:${a}`)
          const allChecked = allKeys.every((k) => checked.has(k))
          return (
            <div key={res.resource} className="rounded-lg border border-line px-3.5 py-2.5">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[12.5px] font-semibold text-navy-900">{res.label}</span>
                <button
                  type="button"
                  onClick={() => toggleRow(res.resource, allKeys, allChecked)}
                  className="text-[10.5px] font-semibold text-blue-600"
                >
                  {allChecked ? 'ยกเลิกทั้งหมด' : 'เลือกทั้งหมด'}
                </button>
              </div>
              <div className="flex flex-wrap gap-4">
                {catalog.actions.map((action) => {
                  const key = `${res.resource}:${action}`
                  return (
                    <label key={action} className="flex cursor-pointer items-center gap-1.5">
                      <input
                        type="checkbox"
                        checked={checked.has(key)}
                        onChange={() => toggle(key)}
                        className="h-4 w-4 cursor-pointer accent-navy-900"
                      />
                      <span className="text-[11.5px] text-ink-soft">{actionLabels[action]}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function UserRolePanel() {
  const { role: myRole } = useAuth()
  const isSuperAdmin = myRole === 'super_admin'

  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [assignableRoles, setAssignableRoles] = useState([])
  const [catalog, setCatalog] = useState(null)
  const [activeRoleId, setActiveRoleId] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadAll = async () => {
    if (isSuperAdmin) {
      const [u, r, c] = await Promise.all([api.listUsers(), api.listRoles(), api.getPermissionCatalog()])
      setUsers(u)
      setRoles(r)
      setAssignableRoles(r)
      setCatalog(c)
      setActiveRoleId((prev) => (prev && r.some((x) => x.id === prev) ? prev : r[0]?.id ?? null))
    } else {
      const [u, ar] = await Promise.all([api.listUsers(), api.getAssignableRoles()])
      setUsers(u)
      setAssignableRoles(ar)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadAll()
  }, [])

  const handleDeleteRole = async (role) => {
    if (role.name === 'super_admin') return
    const usersWithRole = users.filter((u) => u.role_id === role.id).length
    const warn = usersWithRole > 0
      ? `มีผู้ใช้ ${usersWithRole} คนใช้ Role นี้อยู่ — ลบแล้วบัญชีเหล่านั้นจะไม่มี Role จนกว่าจะกำหนดใหม่\n\n`
      : ''
    if (!window.confirm(`${warn}ยืนยันลบ Role "${role.label}"?`)) return
    try {
      await api.deleteRole(role.id)
      if (activeRoleId === role.id) setActiveRoleId(null)
      loadAll()
    } catch (err) {
      alert(err.message || 'ลบ Role ไม่สำเร็จ')
    }
  }

  if (loading) {
    return <p className="py-10 text-center text-[12px] text-ink-soft">กำลังโหลด...</p>
  }

  const activeRole = roles.find((r) => r.id === activeRoleId)

  return (
    <div>
      <div className="mb-5 border-b border-line pb-4">
        <h2 className="text-[18px] font-bold text-navy-900">จัดการผู้ใช้และสิทธิ์</h2>
        <p className="mt-1 text-[12.5px] text-ink-soft">
          {isSuperAdmin
            ? 'สร้าง Role แล้วติ๊กสิทธิ์ที่ต้องการ จากนั้นสร้างบัญชีผู้ใช้และกำหนด Role ให้'
            : 'สร้างบัญชีผู้ใช้และกำหนด Role ที่มีอยู่ให้ — การกำหนดสิทธิ์ของแต่ละ Role ทำได้โดยผู้ดูแลระบบสูงสุดเท่านั้น'}
        </p>
      </div>

      {isSuperAdmin && (
        <>
          <div className="mb-6">
            <h3 className="mb-2.5 text-[13.5px] font-bold text-navy-900">Role ทั้งหมด</h3>
            <div className="mb-3 flex flex-wrap gap-2">
              {roles.map((r) => (
                <div
                  key={r.id}
                  className={`flex items-center gap-1.5 rounded-lg border pl-3 pr-1.5 py-1.5 text-[12px] font-semibold ${
                    activeRoleId === r.id ? 'border-navy-900 bg-navy-900 text-white' : 'border-line bg-white text-ink'
                  }`}
                >
                  <button type="button" onClick={() => setActiveRoleId(r.id)} className="border-none bg-transparent">
                    {r.label}
                  </button>
                  {r.name !== 'super_admin' && (
                    <button
                      type="button"
                      onClick={() => handleDeleteRole(r)}
                      className={`flex h-5 w-5 items-center justify-center rounded ${
                        activeRoleId === r.id ? 'text-white/70 hover:bg-white/20 hover:text-white' : 'text-ink-soft hover:bg-coral-tint hover:text-coral'
                      }`}
                      aria-label={`ลบ role ${r.label}`}
                      title={`ลบ role ${r.label}`}
                    >
                      <i className="ti ti-x text-[11px]" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <CreateRoleForm onCreated={loadAll} />
          </div>

          {activeRole && catalog && (
            <div className="mb-6">
              <RolePermissionEditor role={activeRole} catalog={catalog} onSaved={loadAll} />
            </div>
          )}
        </>
      )}

      <div className="mb-3">
        <h3 className="text-[13.5px] font-bold text-navy-900">ผู้ใช้ทั้งหมด</h3>
      </div>
      <CreateUserForm roles={assignableRoles} onCreated={loadAll} />
      <UsersTable users={users} roles={assignableRoles} onChanged={loadAll} />
    </div>
  )
}
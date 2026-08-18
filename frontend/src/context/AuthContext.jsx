import { createContext, useContext, useEffect, useState } from 'react'
import { api, getToken, setToken } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState(null)
  const [role, setRole] = useState(null)
  const [roleLabel, setRoleLabel] = useState(null)
  const [permissions, setPermissions] = useState([])
  const [checkingSession, setCheckingSession] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = getToken()
    if (!token) {
      setCheckingSession(false)
      return
    }
    api
      .me()
      .then((res) => {
        setIsAuthenticated(true)
        setUsername(res.username)
        setRole(res.role)
        setRoleLabel(res.roleLabel)
        setPermissions(res.permissions || [])
      })
      .catch(() => {
        setToken(null)
        setIsAuthenticated(false)
      })
      .finally(() => setCheckingSession(false))
  }, [])

  const login = async (usernameInput, password) => {
    try {
      const res = await api.login(usernameInput, password)
      setToken(res.token)
      setIsAuthenticated(true)
      setUsername(res.username)
      setRole(res.role)
      setRoleLabel(res.roleLabel)
      // token มี permissions ฝังอยู่ แต่ response login ไม่ได้ส่งกลับมาตรงๆ
      // เรียก /me อีกทีเพื่อความชัวร์ว่า permissions ตรงกับใน token เป๊ะ
      const me = await api.me()
      setPermissions(me.permissions || [])
      setError('')
      return true
    } catch (err) {
      setError(err.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
      return false
    }
  }

  const logout = () => {
    setToken(null)
    setIsAuthenticated(false)
    setUsername(null)
    setRole(null)
    setRoleLabel(null)
    setPermissions([])
  }

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await api.changePassword(currentPassword, newPassword)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message || 'เปลี่ยนรหัสผ่านไม่สำเร็จ' }
    }
  }

  // เช็คสิทธิ์แบบสั้นๆ ใช้ในหน้าแอดมิน เช่น can('ANN_NEWS', 'update')
  // super_admin (role name เท่ากับ 'super_admin') ผ่านทุกอย่างเสมอ กันเคส seed data ไม่ครบ
  const can = (resource, action) => {
    if (role === 'super_admin') return true
    return permissions.includes(`${resource}:${action}`)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        role,
        roleLabel,
        permissions,
        checkingSession,
        login,
        logout,
        changePassword,
        error,
        can,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth ต้องถูกเรียกใช้ภายใน <AuthProvider>')
  return ctx
}
import { createContext, useContext, useEffect, useState } from 'react'
import { api, getToken, setToken } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState(null)
  const [checkingSession, setCheckingSession] = useState(true)
  const [error, setError] = useState('')

  // ตอนโหลดหน้าเว็บใหม่ เช็คว่า token ที่เก็บไว้ใน sessionStorage ยังใช้ได้อยู่ไหม
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
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, checkingSession, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth ต้องถูกเรียกใช้ภายใน <AuthProvider>')
  return ctx
}

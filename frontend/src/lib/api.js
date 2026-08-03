// ตัวกลางเรียก backend API (ต่อกับ Neon Postgres ผ่าน backend/)
// ตั้งค่า URL ของ backend ผ่าน .env: VITE_API_URL=https://your-backend.example.com
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const TOKEN_KEY = 'intranet_admin_token'

export function getToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(token) {
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token)
    else sessionStorage.removeItem(TOKEN_KEY)
  } catch {
    // ไม่เป็นไรถ้าเซฟไม่ได้ (private mode) — ยัง login ได้ในแท็บนี้
  }
}

async function request(path, options = {}) {
  const token = getToken()
  const headers = { ...(options.headers || {}) }
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  if (!res.ok) {
    let message = `เกิดข้อผิดพลาด (${res.status})`
    try {
      const body = await res.json()
      if (body?.error) message = body.error
    } catch {
      // ignore parse error
    }
    throw new Error(message)
  }
  if (res.status === 204) return null
  return res.json()
}

export const api = {
  // ---- content ----
  getContent: () => request('/api/content'),
  setContentKey: (key, value) =>
    request(`/api/content/${encodeURIComponent(key)}`, {
      method: 'PUT',
      body: JSON.stringify({ value }),
    }),
  resetContentKey: (key) =>
    request(`/api/content/${encodeURIComponent(key)}`, { method: 'DELETE' }),

  // ---- auth ----
  login: (username, password) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  me: () => request('/api/auth/me'),

  // ---- uploads ----
  listUploads: (folder) =>
    request(`/api/uploads${folder ? `?folder=${encodeURIComponent(folder)}` : ''}`),
  uploadFile: (folder, file) => {
    const form = new FormData()
    form.append('folder', folder)
    form.append('file', file)
    return request('/api/uploads', { method: 'POST', body: form })
  },
  // ใช้ XMLHttpRequest แทน fetch เพราะต้องการ progress event จริงระหว่างอัปโหลด
  uploadFileWithProgress: (folder, file, onProgress) =>
    new Promise((resolve, reject) => {
      const form = new FormData()
      form.append('folder', folder)
      form.append('file', file)

      const xhr = new XMLHttpRequest()
      xhr.open('POST', `${API_URL}/api/uploads`)
      const token = getToken()
      if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`)

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText))
          } catch {
            resolve(null)
          }
        } else {
          let message = `อัปโหลดไม่สำเร็จ (${xhr.status})`
          try {
            const body = JSON.parse(xhr.responseText)
            if (body?.error) message = body.error
          } catch {
            // ignore
          }
          reject(new Error(message))
        }
      }
      xhr.onerror = () => reject(new Error('เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ'))
      xhr.send(form)
    }),
  deleteUpload: (id) => request(`/api/uploads/${id}`, { method: 'DELETE' }),
  downloadUrl: (id) => `${API_URL}/api/uploads/${id}/download`,
}

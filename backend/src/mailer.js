import nodemailer from 'nodemailer'

let transporter = null

function getTransporter() {
  if (transporter) return transporter
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST) return null
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465, // 465 = SSL, 587 = STARTTLS
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  })
  return transporter
}

// ส่งอีเมลรหัสผ่านชั่วคราว
// ถ้ายังไม่ได้ตั้งค่า SMTP (ตอน dev) จะพิมพ์รหัสลง console ของ backend แทน จะได้ทดสอบ flow ได้โดยไม่ต้องมีเมลเซิร์ฟเวอร์
export async function sendTempPasswordEmail({ to, username, displayName, tempPassword, expiresMinutes, siteUrl }) {
  const t = getTransporter()
  const name = displayName || username || 'ผู้ใช้งาน'

  if (!t) {
    console.log(`[mailer] ยังไม่ได้ตั้งค่า SMTP — รหัสผ่านชั่วคราวของ ${username} (${to}): ${tempPassword}`)
    return
  }

  await t.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to,
    subject: 'รหัสผ่านชั่วคราวสำหรับเข้าสู่ระบบ — Intranet',
    text:
      `สวัสดีคุณ ${name}\n\n` +
      `เราได้รับคำขอลืมรหัสผ่านสำหรับบัญชี "${username}"\n` +
      `รหัสผ่านชั่วคราวของคุณคือ:\n\n    ${tempPassword}\n\n` +
      `ใช้ได้ ${expiresMinutes} นาที ให้เข้าสู่ระบบด้วยรหัสนี้ ระบบจะให้คุณตั้งรหัสผ่านใหม่ด้วยตัวเองทันที\n` +
      `เว็บไซต์: ${siteUrl}\n\n` +
      `หากคุณไม่ได้เป็นผู้ขอ ให้ละเว้นอีเมลนี้ รหัสผ่านเดิมของคุณยังใช้งานได้ตามปกติ`,
    html:
      `<p>สวัสดีคุณ ${escapeHtml(name)}</p>` +
      `<p>เราได้รับคำขอลืมรหัสผ่านสำหรับบัญชี <b>${escapeHtml(username)}</b><br>รหัสผ่านชั่วคราวของคุณคือ:</p>` +
      `<p style="font-size:22px;font-family:Consolas,monospace;letter-spacing:2px;background:#f3f5f8;padding:12px 16px;border-radius:6px;display:inline-block">${escapeHtml(tempPassword)}</p>` +
      `<p>ใช้ได้ ${expiresMinutes} นาที ให้เข้าสู่ระบบด้วยรหัสนี้ ระบบจะให้คุณ<b>ตั้งรหัสผ่านใหม่ด้วยตัวเอง</b>ทันที<br>` +
      `เว็บไซต์: <a href="${siteUrl}">${siteUrl}</a></p>` +
      `<p style="color:#666;font-size:12px">หากคุณไม่ได้เป็นผู้ขอ ให้ละเว้นอีเมลนี้ รหัสผ่านเดิมของคุณยังใช้งานได้ตามปกติ</p>`,
  })
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}
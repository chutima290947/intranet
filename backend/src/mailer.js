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

// แยก "ชื่อ <email>" จาก MAIL_FROM เช่น "Intranet <a@gmail.com>" -> { name: 'Intranet', email: 'a@gmail.com' }
function parseFrom() {
  const raw = (process.env.MAIL_FROM || process.env.SMTP_USER || '').trim()
  const m = raw.match(/^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/)
  if (m) return { name: m[1].trim() || 'Intranet', email: m[2].trim() }
  return { name: 'Intranet', email: raw }
}

// ส่งผ่าน Brevo HTTP API (พอร์ต 443) ใช้บน Render แพ็กเกจฟรีได้ เพราะไม่ใช่พอร์ต SMTP ที่ถูกบล็อก
async function sendViaBrevoApi({ to, subject, text, html }) {
  const sender = parseFrom()
  if (!sender.email) throw new Error('ยังไม่ได้ตั้ง MAIL_FROM (อีเมลผู้ส่งที่ยืนยันกับ Brevo แล้ว)')

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender,
      to: [{ email: to }],
      subject,
      textContent: text,
      htmlContent: html,
    }),
  })

  if (!res.ok) {
    let detail = ''
    try {
      detail = JSON.stringify(await res.json())
    } catch {
      // ignore
    }
    throw new Error(`Brevo API ตอบกลับ ${res.status} ${detail}`)
  }
}

// ส่งอีเมลรหัสผ่านชั่วคราว ลำดับการเลือกวิธีส่ง:
//  1) มี BREVO_API_KEY -> ส่งผ่าน Brevo HTTP API (เหมาะกับ Render แพ็กเกจฟรี ที่บล็อกพอร์ต SMTP)
//  2) มี SMTP_HOST      -> ส่งผ่าน SMTP (nodemailer)
//  3) ไม่มีทั้งสอง      -> พิมพ์รหัสลง console/log ของ backend แทน (ใช้ทดสอบ flow ได้โดยไม่ต้องมีเมล)
export async function sendTempPasswordEmail({ to, username, displayName, tempPassword, expiresMinutes, siteUrl }) {
  const name = displayName || username || 'ผู้ใช้งาน'
  const subject = 'รหัสผ่านชั่วคราวสำหรับเข้าสู่ระบบ — Intranet'
  const text =
    `สวัสดีคุณ ${name}\n\n` +
    `เราได้รับคำขอลืมรหัสผ่านสำหรับบัญชี "${username}"\n` +
    `รหัสผ่านชั่วคราวของคุณคือ:\n\n    ${tempPassword}\n\n` +
    `ใช้ได้ ${expiresMinutes} นาที ให้เข้าสู่ระบบด้วยรหัสนี้ ระบบจะให้คุณตั้งรหัสผ่านใหม่ด้วยตัวเองทันที\n` +
    `เว็บไซต์: ${siteUrl}\n\n` +
    `หากคุณไม่ได้เป็นผู้ขอ ให้ละเว้นอีเมลนี้ รหัสผ่านเดิมของคุณยังใช้งานได้ตามปกติ`
  const html =
    `<p>สวัสดีคุณ ${escapeHtml(name)}</p>` +
    `<p>เราได้รับคำขอลืมรหัสผ่านสำหรับบัญชี <b>${escapeHtml(username)}</b><br>รหัสผ่านชั่วคราวของคุณคือ:</p>` +
    `<p style="font-size:22px;font-family:Consolas,monospace;letter-spacing:2px;background:#f3f5f8;padding:12px 16px;border-radius:6px;display:inline-block">${escapeHtml(tempPassword)}</p>` +
    `<p>ใช้ได้ ${expiresMinutes} นาที ให้เข้าสู่ระบบด้วยรหัสนี้ ระบบจะให้คุณ<b>ตั้งรหัสผ่านใหม่ด้วยตัวเอง</b>ทันที<br>` +
    `เว็บไซต์: <a href="${siteUrl}">${siteUrl}</a></p>` +
    `<p style="color:#666;font-size:12px">หากคุณไม่ได้เป็นผู้ขอ ให้ละเว้นอีเมลนี้ รหัสผ่านเดิมของคุณยังใช้งานได้ตามปกติ</p>`

  if (process.env.BREVO_API_KEY) {
    await sendViaBrevoApi({ to, subject, text, html })
    return
  }

  const t = getTransporter()
  if (!t) {
    console.log(`[mailer] ยังไม่ได้ตั้งค่าอีเมล — รหัสผ่านชั่วคราวของ ${username} (${to}): ${tempPassword}`)
    return
  }

  await t.sendMail({ from: process.env.MAIL_FROM || process.env.SMTP_USER, to, subject, text, html })
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}
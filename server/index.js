/* global process */

import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

dotenv.config()

const app = express()
const port = Number(process.env.INQUIRY_API_PORT || 8787)

function getEnv(...names) {
  for (const name of names) {
    const value = process.env[name]

    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }

  return ''
}

function parseBoolean(value, fallback = false) {
  if (!value) {
    return fallback
  }

  return !['0', 'false', 'no', 'off'].includes(value.toLowerCase())
}

const smtpHost = getEnv('Email_Smtp_Host', 'EMAIL_SMTP_HOST', 'MAIL_OUTGOING_HOST', 'MAIL_INCOMING_HOST')
const smtpPort = Number(getEnv('Email_Smtp_Port', 'EMAIL_SMTP_PORT', 'MAIL_SMTP_PORT') || 587)
const smtpWantsTls = parseBoolean(
  getEnv('Email_Smtp_UseSsl', 'EMAIL_SMTP_USE_SSL', 'MAIL_SMTP_SECURE'),
  smtpPort === 465,
)
const smtpSecure = smtpPort === 465 && smtpWantsTls
const smtpUser = getEnv('Email__Smtp__UserName', 'Email_Smtp_UserName', 'EMAIL_SMTP_USERNAME', 'MAIL_USERNAME')
const smtpPassword = getEnv('Email_Smtp_Password', 'EMAIL_SMTP_PASSWORD', 'MAIL_PASSWORD')
const smtpRequireAuth = parseBoolean(getEnv('MAIL_SMTP_REQUIRE_AUTH'), Boolean(smtpUser || smtpPassword))
const smtpEnabled = Boolean(smtpHost)

if (!smtpEnabled) {
  console.warn('SMTP host not configured. Inquiry emails will be written to the console transport.')
}

const requiredEnvVars = smtpEnabled
  ? ['smtp host', 'smtp username', 'smtp password'].filter((name) => {
      if (name === 'smtp host') {
        return !smtpHost
      }

      if (name === 'smtp username') {
        return smtpRequireAuth && !smtpUser
      }

      return smtpRequireAuth && !smtpPassword
    })
  : []

if (requiredEnvVars.length > 0) {
  console.warn(`Missing email config: ${requiredEnvVars.join(', ')}`)
}

const transporter = smtpEnabled
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      requireTLS: smtpWantsTls && !smtpSecure,
      auth: smtpRequireAuth
        ? {
            user: smtpUser,
            pass: smtpPassword,
          }
        : undefined,
      tls: {
        rejectUnauthorized: parseBoolean(getEnv('MAIL_TLS_REJECT_UNAUTHORIZED'), true),
      },
    })
  : nodemailer.createTransport({
      jsonTransport: true,
    })

const allowedOrigins = (process.env.INQUIRY_ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const defaultLogoPath = path.join(rootDir, 'public', 'amc1.png')

app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '1mb' }))

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function validateEmail(email = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function buildEmailHtml({
  badge,
  label,
  title,
  intro,
  summary,
  highlightTitle,
  highlightText,
  rows,
  messageLabel,
  message,
  closing,
  footerNote,
}) {
  const palette = {
    canvas: '#04112a',
    frame: '#0a1e45',
    frameSoft: '#10295d',
    glow: '#1d4e9f',
    accent: '#d7b47a',
    accentSoft: '#f0debe',
    card: '#f7f8fc',
    surface: '#ffffff',
    line: '#d8dfeb',
    ink: '#0f1c38',
    body: '#435271',
    muted: '#72809b',
    white: '#ffffff',
  }

  const tableRows = rows
    .map(([rowLabel, value]) => `
      <tr>
        <td style="padding: 14px 16px; border-bottom: 1px solid ${palette.line}; color: ${palette.ink}; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; width: 180px;">${escapeHtml(rowLabel)}</td>
        <td style="padding: 14px 16px; border-bottom: 1px solid ${palette.line}; color: ${palette.body}; font-size: 15px; line-height: 1.6;">${escapeHtml(value)}</td>
      </tr>`)
    .join('')

  const sanitizedMessage = escapeHtml(message).replace(/\n/g, '<br />')

  return `
  <div style="margin:0; padding:32px 14px; background:${palette.canvas}; background-image: radial-gradient(circle at top right, rgba(215,180,122,0.16), transparent 24%), radial-gradient(circle at bottom left, rgba(255,255,255,0.08), transparent 18%), linear-gradient(180deg, ${palette.canvas} 0%, ${palette.frame} 100%); font-family: 'Segoe UI', Tahoma, Arial, sans-serif; color:${palette.ink};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px; margin:0 auto; border-spacing:0;">
      <tr>
        <td style="padding:0 0 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-spacing:0;">
            <tr>
              <td style="text-align:left; color:${palette.white}; font-size:11px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; opacity:0.76;">AMC Operational Excellence</td>
              <td style="text-align:right; color:${palette.white}; font-size:11px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; opacity:0.56;">${escapeHtml(badge)}</td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="border-radius:28px; overflow:hidden; background:${palette.card}; box-shadow:0 28px 90px rgba(2, 9, 22, 0.38);">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding:28px 28px 22px; background:${palette.frame}; background-image: radial-gradient(circle at top right, rgba(240,222,190,0.18), transparent 24%), linear-gradient(135deg, ${palette.frame} 0%, ${palette.frameSoft} 100%);">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-spacing:0;">
                  <tr>
                    <td style="vertical-align:top; padding-right:18px;">
                      <div style="display:inline-block; border-radius:22px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); padding:12px; box-shadow:0 18px 40px rgba(0,0,0,0.22);">
                        <img src="cid:amcLogo" alt="AMC logo" width="46" style="display:block; width:46px; height:auto; border:0;" />
                      </div>
                    </td>
                    <td style="vertical-align:top; text-align:right;">
                      <div style="display:inline-block; border-radius:999px; padding:8px 14px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.1); color:${palette.white}; font-size:11px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase;">${escapeHtml(label)}</div>
                    </td>
                  </tr>
                </table>

                <div style="padding-top:26px;">
                  <h1 style="margin:0; max-width:460px; color:${palette.white}; font-size:38px; line-height:1.04; letter-spacing:-0.03em; font-weight:800;">${escapeHtml(title)}</h1>
                  <p style="margin:14px 0 0; max-width:560px; color:rgba(255,255,255,0.8); font-size:15px; line-height:1.8;">${escapeHtml(intro)}</p>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="height:18px;"></td>
      </tr>

      <tr>
        <td style="border-radius:28px; overflow:hidden; background:${palette.card}; box-shadow:0 24px 80px rgba(2, 9, 22, 0.22);">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding:28px 28px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-spacing:0;">
                  <tr>
                    <td style="padding:0 0 18px;">
                      <div style="display:inline-block; border-radius:999px; background:${palette.accentSoft}; color:${palette.frame}; padding:8px 14px; font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase;">AMC Website Workflow</div>
                      <p style="margin:18px 0 0; color:${palette.body}; font-size:15px; line-height:1.8;">${escapeHtml(summary)}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 28px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-spacing:0;">
                  <tr>
                    <td style="padding-right:8px; vertical-align:top;">
                      <div style="border-radius:22px; background:${palette.surface}; border:1px solid ${palette.line}; padding:22px;">
                        <div style="color:${palette.muted}; font-size:11px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase;">${escapeHtml(highlightTitle)}</div>
                        <div style="margin-top:10px; color:${palette.ink}; font-size:24px; line-height:1.25; font-weight:800;">${escapeHtml(highlightText)}</div>
                      </div>
                    </td>
                    <td style="padding-left:8px; vertical-align:top;">
                      <div style="border-radius:22px; background:${palette.surface}; border:1px solid ${palette.line}; padding:22px;">
                        <div style="color:${palette.muted}; font-size:11px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase;">Response Direction</div>
                        <div style="margin-top:10px; color:${palette.ink}; font-size:20px; line-height:1.35; font-weight:800;">Structured, branded, and ready for follow-up</div>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 28px 0;">
                <div style="border-radius:24px; overflow:hidden; background:${palette.surface}; border:1px solid ${palette.line};">
                  <div style="padding:16px 18px; background:linear-gradient(90deg, rgba(16,41,93,0.04) 0%, rgba(215,180,122,0.12) 100%); color:${palette.ink}; font-size:12px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase;">Inquiry Snapshot</div>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">${tableRows}</table>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:22px 28px 0;">
                <div style="border-radius:24px; overflow:hidden; background:${palette.surface}; border:1px solid ${palette.line};">
                  <div style="padding:16px 18px; background:${palette.frame}; color:${palette.white}; font-size:12px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase;">${escapeHtml(messageLabel)}</div>
                  <div style="padding:20px 18px; color:${palette.body}; font-size:15px; line-height:1.85; white-space:normal;">${sanitizedMessage}</div>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:22px 28px 0; color:${palette.body}; font-size:15px; line-height:1.8;">${escapeHtml(closing)}</td>
            </tr>

            <tr>
              <td style="padding:24px 28px 28px; text-align:center; color:${palette.muted}; font-size:12px; line-height:1.7;">${escapeHtml(footerNote)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`
}

function buildInquiryHtml(inquiry) {
  return buildEmailHtml({
    badge: 'Inquiry Notification',
    label: 'New Website Inquiry',
    title: 'New inquiry received',
    intro: 'A new message has been sent from the AMC portfolio inquiry form and is ready for your review.',
    summary: `Language: ${inquiry.locale || 'en'}`,
    highlightTitle: 'Priority Focus',
    highlightText: `${inquiry.company} · ${inquiry.service}`,
    rows: [
      ['Full Name', inquiry.name],
      ['Business Email', inquiry.email],
      ['Company', inquiry.company],
      ['Role', inquiry.role || 'Not provided'],
      ['Service', inquiry.service],
    ],
    messageLabel: 'Inquiry Message',
    message: inquiry.message,
    closing: 'Review the inquiry details above and reply directly to the sender if you want to continue the conversation from your inbox.',
    footerNote: 'Sent by AMC website automated inquiry handler.',
  })
}

function buildAcknowledgementHtml(inquiry) {
  const firstName = inquiry.name.split(' ').filter(Boolean)[0] || inquiry.name

  return buildEmailHtml({
    badge: 'AMC Confirmation',
    label: 'Thank You For Contacting AMC',
    title: 'Thank you for your inquiry',
    intro: `Hi ${firstName}, thank you for reaching out to AMC. We have received your inquiry and our team will review it shortly.`,
    summary: 'Below is a copy of the information you submitted so you have it for reference.',
    highlightTitle: 'Submission Status',
    highlightText: 'Received and queued for review',
    rows: [
      ['Full Name', inquiry.name],
      ['Business Email', inquiry.email],
      ['Company', inquiry.company],
      ['Role', inquiry.role || 'Not provided'],
      ['Service', inquiry.service],
    ],
    messageLabel: 'Your Inquiry',
    message: inquiry.message,
    closing: 'Our team will follow up using the contact details you submitted. If you need to add anything else, simply reply to this email.',
    footerNote: 'This is an automated confirmation from AMC. You can reply to this email if you need to add more context.',
  })
}

function buildInquiryText(inquiry) {
  return [
    'New inquiry from AMC website',
    '',
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Company: ${inquiry.company}`,
    `Role: ${inquiry.role || 'Not provided'}`,
    `Service: ${inquiry.service}`,
    `Language: ${inquiry.locale}`,
    '',
    'Message:',
    inquiry.message,
  ].join('\n')
}

function buildAcknowledgementText(inquiry) {
  return [
    `Hi ${inquiry.name},`,
    '',
    'Thank you for contacting AMC. We received your inquiry and our team will review it shortly.',
    '',
    'Your submitted details:',
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Company: ${inquiry.company}`,
    `Role: ${inquiry.role || 'Not provided'}`,
    `Service: ${inquiry.service}`,
    '',
    'Your message:',
    inquiry.message,
  ].join('\n')
}

async function deliverMail(mailOptions) {
  const info = await transporter.sendMail(mailOptions)

  if (!smtpEnabled) {
    const messagePayload = typeof info.message === 'string'
      ? info.message
      : JSON.stringify(info.message, null, 2)

    console.log(`Console mail output for ${mailOptions.to}:\n${messagePayload}`)
  }

  return info
}

app.post('/api/inquiry', async (req, res) => {
  const payload = req.body || {}
  const inquiry = {
    name: String(payload.name || '').trim(),
    email: String(payload.email || '').trim(),
    company: String(payload.company || '').trim(),
    role: String(payload.role || '').trim(),
    service: String(payload.service || '').trim(),
    message: String(payload.message || '').trim(),
    locale: String(payload.locale || 'en').trim(),
  }

  if (!inquiry.name || !inquiry.email || !inquiry.company || !inquiry.service || !inquiry.message) {
    return res.status(400).json({ error: 'Please complete all required fields.' })
  }

  if (!validateEmail(inquiry.email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' })
  }

  const toAddress = getEnv('INQUIRY_MAIL_TO') || smtpUser
  const fromAddress = getEnv('INQUIRY_MAIL_FROM') || smtpUser
  const fromName = process.env.INQUIRY_MAIL_FROM_NAME || 'AMC Website Inquiry'

  if (!toAddress || !fromAddress) {
    return res.status(500).json({ error: 'Email server is not configured.' })
  }

  const attachments = [
    {
      filename: 'amc-logo-silver.svg',
      path: process.env.INQUIRY_EMAIL_LOGO_PATH || defaultLogoPath,
      cid: 'amcLogo',
    },
  ]

  const inquiryMailOptions = {
    from: `${fromName} <${fromAddress}>`,
    to: toAddress,
    replyTo: inquiry.email,
    subject: `AMC Inquiry - ${inquiry.company} - ${inquiry.service}`,
    text: buildInquiryText(inquiry),
    html: buildInquiryHtml(inquiry),
    attachments,
  }

  const acknowledgementMailOptions = {
    from: `${fromName} <${fromAddress}>`,
    to: inquiry.email,
    replyTo: fromAddress,
    subject: 'Thank you for contacting AMC',
    text: buildAcknowledgementText(inquiry),
    html: buildAcknowledgementHtml(inquiry),
    attachments,
  }

  try {
    await Promise.all([
      deliverMail(inquiryMailOptions),
      deliverMail(acknowledgementMailOptions),
    ])
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Failed to send inquiry email:', error)
    return res.status(500).json({ error: 'Unable to send inquiry right now. Please try again shortly.' })
  }
})

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true })
})

app.listen(port, () => {
  console.log(`Inquiry API listening on port ${port}`)
})

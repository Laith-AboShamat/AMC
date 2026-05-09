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

const requiredEnvVars = [
  'MAIL_OUTGOING_HOST',
  'MAIL_SMTP_PORT',
  'MAIL_USERNAME',
  'MAIL_PASSWORD',
]

const missingEnv = requiredEnvVars.filter((name) => !process.env[name])
if (missingEnv.length > 0) {
  console.warn(`Missing env vars: ${missingEnv.join(', ')}`)
}

const smtpHost = process.env.MAIL_OUTGOING_HOST || process.env.MAIL_INCOMING_HOST || ''
const smtpPort = Number(process.env.MAIL_SMTP_PORT || 465)
const smtpSecure = `${process.env.MAIL_SMTP_SECURE || 'true'}`.toLowerCase() !== 'false'
const smtpRequireAuth = `${process.env.MAIL_SMTP_REQUIRE_AUTH || 'true'}`.toLowerCase() !== 'false'

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: smtpRequireAuth
    ? {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      }
    : undefined,
  tls: {
    rejectUnauthorized: `${process.env.MAIL_TLS_REJECT_UNAUTHORIZED || 'true'}`.toLowerCase() !== 'false',
  },
})

const allowedOrigins = (process.env.INQUIRY_ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const defaultLogoPath = path.join(rootDir, 'src', 'assets', 'brand', 'logo-silver.svg')

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

function buildInquiryHtml(inquiry) {
  const palette = {
    navyDeep: '#061633',
    navy: '#0d2248',
    navySoft: '#1f325a',
    accentStart: '#f4b146',
    accentEnd: '#f2c18e',
    card: '#f8f9fc',
    line: '#d8dfeb',
    ink: '#101a32',
    body: '#3a4968',
    muted: '#6c7a96',
  }

  const firstName = inquiry.name.split(' ').filter(Boolean)[0] || inquiry.name

  const rows = [
    ['Full Name', inquiry.name],
    ['Business Email', inquiry.email],
    ['Company', inquiry.company],
    ['Role', inquiry.role || 'Not provided'],
    ['Service', inquiry.service],
    ['Language', inquiry.locale || 'en'],
  ]

  const tableRows = rows
    .map(([label, value]) => `
      <tr>
        <td style="padding: 12px 14px; border-bottom: 1px solid ${palette.line}; color: ${palette.ink}; font-weight: 600; width: 180px;">${escapeHtml(label)}</td>
        <td style="padding: 12px 14px; border-bottom: 1px solid ${palette.line}; color: ${palette.body};">${escapeHtml(value)}</td>
      </tr>`)
    .join('')

  return `
  <div style="margin:0; padding:26px 12px; background:${palette.navyDeep}; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; color:${palette.ink};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:700px; margin:0 auto; border-radius:22px; overflow:hidden; background:${palette.card};">
      <tr>
        <td style="padding:22px 24px; background: linear-gradient(90deg, ${palette.accentStart} 0%, ${palette.accentEnd} 100%);">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="vertical-align:middle;">
                <div style="display:inline-block; border-radius:14px; background:${palette.navy}; padding:10px; box-shadow:0 8px 20px rgba(7,17,38,0.18);">
                  <img src="cid:amcLogo" alt="AMC logo" width="62" height="62" style="display:block; width:62px; height:62px; object-fit:contain;" />
                </div>
              </td>
              <td style="vertical-align:middle; text-align:right;">
                <p style="margin:0; font-size:12px; letter-spacing:0.2em; font-weight:700; text-transform:uppercase; color:${palette.navyDeep};">Inquiry Notification</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:28px 24px 14px;">
          <p style="margin:0; font-size:36px; line-height:1; color:${palette.ink}; font-weight:800;">Hi ${escapeHtml(firstName)},</p>
          <h1 style="margin:10px 0 0; font-size:40px; line-height:1.05; letter-spacing:-0.02em; color:${palette.ink}; font-weight:800;">New inquiry received</h1>
          <p style="margin:12px 0 0; font-size:15px; line-height:1.7; color:${palette.body};">A new message has been sent from the portfolio inquiry form and is ready for your review.</p>
        </td>
      </tr>

      <tr>
        <td style="padding:6px 24px 0;">
          <span style="display:inline-block; background:${palette.navyDeep}; border-radius:999px; padding:8px 14px; color:#ffffff; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; font-weight:700;">AMC Website</span>
        </td>
      </tr>

      <tr>
        <td style="padding:16px 24px 0;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse; background:#ffffff; border:1px solid ${palette.line}; border-radius:14px; overflow:hidden;">${tableRows}
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:20px 24px 0;">
          <p style="margin:0 0 10px; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:${palette.muted}; font-weight:700;">Message</p>
          <div style="border:1px solid ${palette.line}; border-radius:14px; background:#ffffff; padding:14px; font-size:15px; line-height:1.7; color:${palette.body}; white-space:pre-wrap;">${escapeHtml(inquiry.message)}</div>
        </td>
      </tr>

      <tr>
        <td style="padding:18px 24px 24px; text-align:center; color:${palette.muted}; font-size:12px;">
          Sent by AMC website automated inquiry handler.
        </td>
      </tr>
    </table>
  </div>`
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
    source: String(payload.source || 'website').trim(),
  }

  if (!inquiry.name || !inquiry.email || !inquiry.company || !inquiry.service || !inquiry.message) {
    return res.status(400).json({ error: 'Please complete all required fields.' })
  }

  if (!validateEmail(inquiry.email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' })
  }

  const toAddress = process.env.INQUIRY_MAIL_TO || process.env.MAIL_USERNAME
  const fromAddress = process.env.INQUIRY_MAIL_FROM || process.env.MAIL_USERNAME
  const fromName = process.env.INQUIRY_MAIL_FROM_NAME || 'AMC Website Inquiry'

  if (!toAddress || !fromAddress) {
    return res.status(500).json({ error: 'Email server is not configured.' })
  }

  const mailOptions = {
    from: `${fromName} <${fromAddress}>`,
    to: toAddress,
    replyTo: inquiry.email,
    subject: `AMC Inquiry - ${inquiry.company} - ${inquiry.service}`,
    text: [
      `New inquiry from AMC website`,
      ``,
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Company: ${inquiry.company}`,
      `Role: ${inquiry.role || 'Not provided'}`,
      `Service: ${inquiry.service}`,
      `Language: ${inquiry.locale}`,
      ``,
      `Message:`,
      inquiry.message,
    ].join('\n'),
    html: buildInquiryHtml(inquiry),
    attachments: [
      {
        filename: 'amc-logo-silver.svg',
        path: process.env.INQUIRY_EMAIL_LOGO_PATH || defaultLogoPath,
        cid: 'amcLogo',
      },
    ],
  }

  try {
    await transporter.sendMail(mailOptions)
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

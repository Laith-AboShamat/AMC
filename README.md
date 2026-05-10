# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Inquiry Email (SMTP) Setup

The newest inquiry form sends messages through a backend SMTP API.

1. Copy `.env.example` to `.env` (already created in local workspace) and fill in the SMTP settings.
2. Start both frontend and SMTP API together:

```bash
npm run dev:all
```

Or start them separately:

```bash
npm run server
```

```bash
npm run dev
```
3. Submit the inquiry form from `/design/sixth` (or `/design/fifth`). The server sends the inquiry to `INQUIRY_MAIL_TO` and also sends a branded confirmation email back to the sender.

### Relevant Environment Variables

- `Email_Smtp_Host`, `Email_Smtp_Port`, `Email_Smtp_UseSsl`
- `Email__Smtp__UserName`, `Email_Smtp_Password`
- `INQUIRY_MAIL_TO`, `INQUIRY_MAIL_FROM`, `INQUIRY_MAIL_FROM_NAME`
- `VITE_INQUIRY_API_URL` (optional if using local Vite `/api` proxy)

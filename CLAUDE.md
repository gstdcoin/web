# GSTD Landing Page — Development Guide

## Stack
- **Framework**: Next.js (App Router), TypeScript, Tailwind CSS
- **Hosting**: Vercel (static export compatible)
- **No backend** — pure static site

## Local Dev
```bash
npm install
npm run dev   # → http://localhost:3000
```

## Deploy
Push to main → Vercel auto-deploys.

## DO NOT
- Do not add API routes here — all API lives in gstdcoin/ai
- Do not hardcode contract addresses — use env vars

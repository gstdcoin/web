# GSTD Landing Page — Development Guide

## Stack
- **Framework**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Hosting**: Cloudflare Workers, via `@opennextjs/cloudflare` (see [docs/CLOUDFLARE_DEPLOY.md](docs/CLOUDFLARE_DEPLOY.md))
- Has 2 server API routes (`/api/health`, `/api/stonfi-pool`) that proxy external APIs — despite the "no backend" rule below, they exist and run as Worker functions

## Local Dev
```bash
npm install
npm run dev   # → http://localhost:3000
```

## Deploy
Push to main → Cloudflare's Git integration auto-builds and deploys.
Manual: `npm run cf:deploy` (requires `npx wrangler login` once).

## DO NOT
- Do not add API routes here — all API lives in gstdcoin/ai (pre-existing rule; note it's currently violated by the 2 routes above)
- Do not hardcode contract addresses — use env vars
- Do not reintroduce a custom `webpack.optimization.splitChunks` override in next.config.mjs — it broke the OpenNext/Cloudflare Worker bundler ("Unknown chunk" errors)

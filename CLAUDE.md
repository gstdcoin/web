# GSTD Landing Page — Development Guide

## Stack
- **Framework**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Hosting**: Cloudflare Workers, via `@opennextjs/cloudflare` (see [docs/CLOUDFLARE_DEPLOY.md](docs/CLOUDFLARE_DEPLOY.md))
- Has 3 server API routes (`/api/health`, `/api/stonfi-pool`, `/api/chat`) that proxy external APIs — despite the "no backend" rule below, they exist and run as Worker functions. `/api/chat` is deliberate, not scope creep: it proxies straight to a live node (via the same GitHub-raw seed-peer list gstdbot's own peers.ts bootstraps from), never touching platform.gstdtoken.com — the point is that gstdtoken.com, on Cloudflare, keeps serving live chat independently of any platform outage.
- **Platform API**: `platform.gstdtoken.com` (Cloudflare Worker + KV) — replaced old `app.gstdtoken.com` (Vercel). Node registry and task queue live there. `/api/stonfi-pool` fetches `/api/v1/nodes` for live node count.

## Local Dev
```bash
npm install
npm run dev   # → http://localhost:3000
```

## Deploy
Push to main → Cloudflare's Git integration auto-builds and deploys.
Manual: `npm run cf:deploy` (requires `npx wrangler login` once).

## DO NOT
- Do not add API routes here for anything that's genuinely platform-specific (billing, credits, wallet state) — that still lives in gstdcoin/ai. Proxying straight to the node network (like `/api/chat`) is fine and intentional: the whole point of gstdtoken.com being on Cloudflare instead of Vercel is that it shouldn't share the platform's failure modes.
- Do not hardcode contract addresses — use env vars
- Do not reintroduce a custom `webpack.optimization.splitChunks` override in next.config.mjs — it broke the OpenNext/Cloudflare Worker bundler ("Unknown chunk" errors)

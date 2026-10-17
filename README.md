# GSTD Web

The public website for [gstdtoken.com](https://gstdtoken.com), built with Next.js 16 and Tailwind CSS and deployed on Cloudflare Workers.

> **Current network status:** the production API reported 0 registered/online nodes, 0 tasks, and 0 payouts on 2026-10-17. The existence of UI pages or API integrations does not mean compute jobs, earnings, model training, or cross-chain transfers are currently available.

---

## What is GSTD?

This repository contains the GSTD marketing website and its frontend integrations. Node software, platform APIs, and smart contracts are maintained in separate repositories. Check current availability and contract status before relying on any network feature.

---

## Why GSTD is Unique

### 1. Model training
The codebase includes model-training interfaces and experimental workflows. This README does not claim that a distributed training service is currently available in production.

### 2. Protocol economics
Revenue splits and buyback mechanisms are design goals documented in the contracts repository; they are not evidence of current user payments or node payouts.

### 3. Node software
Node requirements and supported hardware are documented in [gstdcoin/gstdbot](https://github.com/gstdcoin/gstdbot). A node's presence in the codebase does not guarantee a task assignment or reward.

### 4. Cross-chain bridge
The Solana/XRPL bridge is deferred, unaudited, and has never moved funds in production. Do not send funds to bridge addresses; see [gstdcoin/gstd-bridge](https://github.com/gstdcoin/gstd-bridge).

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), TypeScript |
| Styling | Tailwind CSS, shadcn/ui, Framer Motion |
| i18n | English + Russian |
| Hosting | Cloudflare Workers (free tier) |
| Network stats | Live from `app.gstdtoken.com/api/v1/stats/public` |

---

## Development

```bash
git clone https://github.com/gstdcoin/web
cd web
npm install
npm run dev
# → http://localhost:3000
```

---

## Deploy (Cloudflare Workers)

Push to `main` → GitHub Actions builds with OpenNext and deploys to Cloudflare Workers (see [docs/CLOUDFLARE_DEPLOY.md](docs/CLOUDFLARE_DEPLOY.md)).

Manual deploy:

```bash
npx wrangler login   # once, opens browser auth
npm run cf:deploy
```

Local preview of the production Worker build:

```bash
npm run cf:preview
```

---

## Ecosystem

| Repo | Description |
|---|---|
| **gstdcoin/web** | **This repo — landing page** |
| [gstdcoin/ai](https://github.com/gstdcoin/ai) | AI dashboard + Cloudflare Workers API |
| [gstdcoin/gstdbot](https://github.com/gstdcoin/gstdbot) | Node OS software |
| [gstdcoin/contracts](https://github.com/gstdcoin/contracts) | TON smart contracts |
| [gstdcoin/gstd-bridge](https://github.com/gstdcoin/gstd-bridge) | Cross-chain bridge |

---

## License

MIT

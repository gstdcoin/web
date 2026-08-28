# GSTD — Decentralized AI Compute & Fine-Tuning Network

> The landing page for [gstdtoken.com](https://gstdtoken.com)  
> Built with Next.js 15, Tailwind CSS, deployed on Cloudflare Workers.

---

## What is GSTD?

GSTD is a DePIN (Decentralized Physical Infrastructure Network) where anyone can:

- **Run a node** — earn GSTD by serving AI inference requests and hosting blockchain RPC nodes
- **Fine-tune models** — submit a dataset, a distributed node trains a LoRA adapter on it (real adapters have been produced end-to-end; base-model availability is limited)
- **Use AI** — pay with GSTD for inference routed to available nodes on the network
- **Bridge tokens** between TON, Solana, and XRPL — TON is live today; the Solana/XRPL bridge is early-stage, unaudited, open-source code that has never moved funds in production

---

## Why GSTD is Unique

### 1. Federated Fine-Tuning
Submit a dataset → a distributed node trains a LoRA adapter using QLoRA → download your adapter. The pipeline has produced real, verified adapters end-to-end.

### 2. Real Revenue Split
- **85%** of every fee goes directly to node operators, verified on-chain
- **10%** flows to the protocol treasury
- **5%** funds buyback & burn

### 3. Any Hardware
Raspberry Pi, laptop, desktop, server — any device can participate. The node scores your hardware into a tier (Spark through Sovereign) that sets a rewards multiplier. No GPU required — CPU fallback is supported for inference.

### 4. Multi-Chain by Design (TON live, bridge in progress)
TON is live today. A bridge to Solana and XRPL exists as open-source code but is early-stage, unaudited, and has never moved funds in production — treat it as not yet live.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), TypeScript |
| Styling | Tailwind CSS, shadcn/ui, Framer Motion |
| i18n | English + Russian |
| Hosting | Cloudflare Workers (free tier) |
| Network stats | Live from `platform.gstdtoken.com/api/v1/nodes` |

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

Push to `main` → Cloudflare's Git integration auto-builds and deploys (see [docs/CLOUDFLARE_DEPLOY.md](docs/CLOUDFLARE_DEPLOY.md)).

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
| [gstdcoin/ai](https://github.com/gstdcoin/ai) | Dashboard + Vercel API |
| [gstdcoin/gstdbot](https://github.com/gstdcoin/gstdbot) | Node OS software |
| [gstdcoin/contracts](https://github.com/gstdcoin/contracts) | TON smart contracts |
| [gstdcoin/gstd-bridge](https://github.com/gstdcoin/gstd-bridge) | Cross-chain bridge |

---

## License

MIT

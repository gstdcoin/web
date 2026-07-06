# GSTD — Decentralized AI Compute & Fine-Tuning Network

> The landing page for [gstdtoken.com](https://gstdtoken.com)  
> Built with Next.js 15, Tailwind CSS, deployed on Vercel.

---

## What is GSTD?

GSTD is a DePIN (Decentralized Physical Infrastructure Network) where anyone can:

- **Run a node** — earn GSTD by serving AI inference requests and hosting blockchain RPC nodes
- **Fine-tune models** — submit a dataset, distributed nodes train a LoRA adapter 10–30× cheaper than cloud
- **Use AI** — pay with GSTD for inference routed via ThermalRouter to the optimal node
- **Bridge tokens** between TON, Solana, and XRPL with no custodians

---

## Why GSTD is Unique

### 1. ThermalRouter — Entropy-Based AI Routing
Every inference request is dispatched using information entropy to the statistically optimal node. Not round-robin, not random — pure math. No other DePIN network does this.

### 2. Federated Fine-Tuning Marketplace
Submit a JSONL dataset → distributed nodes train a LoRA adapter using QLoRA → quality-gated by MetaCognitive scoring → download your adapter. 10–30× cheaper than OpenAI fine-tuning.

### 3. Real Revenue Split
- **90%** of every fee goes directly to node operators
- **10%** flows to the protocol treasury (used for buybacks and development)

### 4. Any Hardware
Raspberry Pi, laptop, desktop, server — any device can participate. The node detects hardware and activates modules automatically. No GPU required for inference tier.

### 5. Multi-Chain by Design
Bridge validators run on TON, Solana, and XRPL. The bridge uses MPC threshold signatures — no single party can control or steal funds.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), TypeScript |
| Styling | Tailwind CSS, shadcn/ui, Framer Motion |
| i18n | English + Russian |
| Hosting | Vercel (free tier) |
| Network stats | Live from `app.gstdtoken.com/api/v1/stats` |

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

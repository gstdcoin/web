# GSTD — Decentralized AI & Blockchain Infrastructure

> The landing page for [gstdtoken.com](https://gstdtoken.com)  
> Built with Next.js 15, Tailwind CSS, deployed on Vercel.

---

## What is GSTD?

GSTD is an open-source, community-owned network where anyone can:

- **Run a node** and earn GSTD tokens by serving AI requests and hosting blockchain nodes
- **Use AI** for free or at cost — powered by the node network, not centralized servers
- **Bridge tokens** between TON, Solana, and XRPL with no custodians
- **Govern the protocol** — every parameter is controlled by GSTD holders via on-chain DAO

The network is unstoppable by design. There are no admin keys, no central servers, no kill switch. Smart contracts on TON handle all economics. Nodes are run by independent operators worldwide. The platform (Vercel) is just a thin coordination layer — the nodes are the actual backend.

---

## Why GSTD is Unique

### 1. GSTD as the Base Settlement Asset
Every service payment in the network is routed through the `SettlementRouter` contract, which converts any token (TON, USDT, SOL, XRP) into GSTD before settling. This means every service use creates structural buy pressure on GSTD — automatically, on-chain, with no human intervention.

### 2. Real Revenue, Real Backing
- **85%** of every payment goes directly to node operators
- **10%** flows to the TreasuryGold contract, accumulating real assets that back GSTD
- **5%** buys GSTD on the open market and burns it permanently

### 3. Run a Node, Own the Network
The node software (gstdbot) is open-source and runs on any machine. Operators are incentivized by real earnings, not promises. The more nodes run, the more decentralized and resilient the network becomes.

### 4. Multi-Chain by Design
Bridge validators run on TON, Solana, and XRPL simultaneously. Users can hold and use GSTD on any chain. The bridge uses MPC threshold signatures — no single party can control or steal funds.

### 5. Fully On-Chain Governance
All protocol parameters — revenue splits, staking tiers, slash conditions, base rates — are controlled by DAOVoting on TON. A proposal needs 10% quorum and passes only after a 48-hour timelock. Not even the original developers can make unilateral changes.

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

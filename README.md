# GSTD Token — Website

Marketing website for **GSTD Token** — a decentralized node network backed by tokenized gold.

Live: [gstdtoken.com](https://gstdtoken.com)

## About the Project

GSTD is a decentralized network of nodes that:
- Processes AI requests and shares computing resources
- Supports blockchain validator nodes (TON · Solana · XRPL)
- Automatically converts 70% of network fees into tokenized gold (XAUT)
- Enables near-zero interest loans (1.5% APY) backed by the gold reserve
- Replaces traditional banking for payments and credit

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** + shadcn/ui components
- **Framer Motion** for animations
- **Custom i18n** — English and Russian (client-side via LanguageProvider)
- **Vercel** for deployment

## Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run type-check
```

## Environment Variables

Copy `.env.production` values into Vercel → Settings → Environment Variables.

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Site URL |
| `NEXT_PUBLIC_TELEGRAM` | Telegram community link |
| `NEXT_PUBLIC_TWITTER` | Twitter/X link |
| `NEXT_PUBLIC_GITHUB` | GitHub org link |
| `NEXT_PUBLIC_STONFI` | STON.fi swap link |
| `NEXT_PUBLIC_TON_CONTRACT` | GSTD contract address on TON |

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, ecosystem, node install, features, tokenomics, FAQ |
| `/about` | Project mission, architecture, bank-replacement vision |
| `/token` | Token details, contract address, proof of reserve |
| `/buy` | How to buy GSTD on STON.fi |
| `/roadmap` | Development phases |
| `/legal` | Terms, privacy, disclaimers |

## Run a Node

To join the GSTD network as a node operator:

```bash
curl -fsSL https://raw.githubusercontent.com/gstdcoin/gstdbot/main/install.sh | bash
```

See [gstdcoin/gstdbot](https://github.com/gstdcoin/gstdbot) for full documentation.

## License

MIT

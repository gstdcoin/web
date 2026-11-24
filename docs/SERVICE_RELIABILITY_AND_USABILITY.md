# GSTD: service reliability and a usable first experience

Scope: gstdcoin repositories and the gstdtoken.xyz ecosystem. Review date: 2026-11-24. This report separates observations from proposed or locally implemented changes. A successful health request does not prove that inference, billing or Telegram delivery works.

## Observed production baseline

| Service / journey | Evidence | Finding |
| --- | --- | --- |
| Website health | `/api/health`: HTTP 200, ready true | Web and platform binding respond |
| Platform storage | `app.gstdtoken.xyz/api/v1/health`: HTTP 200, Redis | Storage reachable; this does not exercise escrow |
| Node | Registry heartbeat; version 3.7.3; three installed Ollama models | One CPU node, no redundancy or verified GPU claim |
| Direct node inference | One synthetic request, eight-token maximum, nonempty SSE answer and DONE | CPU inference works; not a latency percentile or model quality evaluation |
| Main application free chat | `/api/chat`: HTTP 200, delta with real answer, done event, zero-cost free tier | One successful free journey |
| Website free chat | `/api/chat`: HTTP 503 node_unavailable despite reachable trusted node | Runtime discovery configuration bug |
| Telegram | HTTP 503; token/API/identity valid, webhook false | Not operational for message delivery |
| Node host capacity | Termalin: disk 84.6%, memory about 18%, low load, no OOM | Track disk growth; do not delete models or backups automatically |
| Node process / local model access | PM2 online with zero restarts; Ollama listens on 127.0.0.1:11434 | Model server is local, public traffic uses the node gateway |
| Escrow RPC configuration | Read-only catalog action: HTTP 200, rpc_configured true | Configuration confirmed; no mainnet transaction or payout was tested |
| Release execution | GitHub Actions account billing lock previously prevented runner startup; local Wrangler login expired | New release must obtain real successful deployment evidence |
| Optional GSTD connector | Status/model tools returned service_unavailable | Connector availability is separate from public platform health |

## Implemented changes in this patch

1. Website discovery reads `GSTD_TRUSTED_NODE_IDS` and `GSTD_SEED_HOSTS` from the request's Cloudflare environment. It preserves identity/host allowlists and redirect rejection. The pinned 2024 compatibility date does not populate process.env automatically. No global compatibility upgrade or broader node trust is necessary.
2. The trial chat accepts both JSON and SSE responses. It validates completion, preserves genuine partial text on failure, bounds response size, stops idle reads after 30 seconds and applies a 90-second total browser deadline. Stop cancels the current request; it is not a claim that already-started remote compute is instantly undone.
3. Failed attempts and error notices do not enter model history. Retry is explicit and sends the original question once against completed history. A ref prevents duplicate concurrent submissions. There are no automatic inference retries or paid requests.
4. A beginner can start on `/ai` without installing software, selecting a model or connecting a wallet. Three editable example prompts, visible labels, keyboard controls, copy feedback, progress, Stop and actionable errors explain the process.
5. A plain-language service panel distinguishes platform health, online computers and Telegram. Unknown/stale status stays unknown; node presence never becomes proof of a successful answer. A Telegram link appears only when its fresh status is healthy.
6. Cloud fallback remains off by default, requires explicit permission, and discloses that the current question and completed history go to Cloudflare AI. A requested exact model is never silently substituted.

## Verification

Changes are tracked in [web PR #17](https://github.com/gstdcoin/web/pull/17). Local functional tests, TypeScript, ESLint (no errors) and the Next.js production build have passed. The browser verified editable examples, retained questions and actionable failure notices, both languages, and no horizontal overflow at 390 px. These observations do not replace a successful Cloudflare adapter build or live preview. GitHub refused to start this PR's validation and preview jobs because the account is locked due to a billing issue; no runner steps executed. The main branch and production site have not been updated by this PR.

Use Node 22 and the locked npm version. From the repository root:

```sh
npm ci
npm test
npx tsc --noEmit
npm run lint
npm run build
node scripts/check-service-journey.mjs https://gstdtoken.xyz
# Explicitly runs ONE synthetic free request; no cloud fallback or payment:
node scripts/check-service-journey.mjs https://gstdtoken.xyz --inference
```

The smoke command exits nonzero for a failed core check or requested inference. Its report preserves Telegram degradation independently. A single response time is one sample, never p95, reliability history or a price benchmark. Prefer running inference smoke after a deployment, not on every monitoring poll.

Browser verification: desktop and narrow layout; Russian/English; keyboard navigation; choose an example and edit it; send; Stop; retry; copy; start a new conversation. Use a disconnected local test to verify question retention and failure notices. Do not send private user material as a test prompt. Verify partial response, malformed response, JSON and fragmented SSE in the deterministic reader tests.

## Remaining release and reliability work

- Repair and verify canonical Telegram webhook/menu with the already deployed authenticated operation. Quick Edit private-preview initialization failed during the earlier attempt; its draft was discarded and production remained 1a82d842. A fresh operator credential must not be copied out of Cloudflare into chat or a node.
- Obtain successful CI and a separate Cloudflare preview; exercise the website free journey against an actual trusted node before production. Passing local tests is not a deployment record.
- One available CPU node is a single point of inference failure. Keep an honest unavailable state and opt-in fallback until a second independently operated node is verified. Do not advertise high availability from a heartbeat count.
- Enable/inspect built-in Cloudflare metrics and bounded error logging under existing free allowances. Do not log prompts, wallet identifiers, tokens or response bodies. Account request/CPU/error and storage utilization separately. Browser polling pauses in hidden tabs and uses the existing cached report.
- Define operator objectives before promising an SLA: completed free requests / eligible attempts; time to first visible text; completed-answer latency; dispatch rejection rate. Segment by exact model and compute profile. Publish a sample size and time window. GPU/VRAM verification, full task prices, escrow settlements and bridge withdrawals need their own evidence.
- Keep customer funds and financial features behind existing verification gates. This patch does not activate a bridge, liquidity execution, automatic payouts or mainnet transactions.

## Design references

- [Cloudflare process.env behavior](https://developers.cloudflare.com/changelog/post/2025-03-11-process-env-support/)
- [Cloudflare metrics](https://developers.cloudflare.com/workers/observability/metrics-and-analytics/)
- [Cloudflare free and platform limits](https://developers.cloudflare.com/workers/platform/limits/)
- [W3C status messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages)
- [W3C error suggestions](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion)

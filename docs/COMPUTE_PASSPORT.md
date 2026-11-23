# GSTD Compute Passport

The `/network` page and same-origin `/api/network/passport` publish a bounded snapshot of real registry data, service diagnostics and the approved node software. This is GSTD's evidence-oriented product entry point: inspect the node/model/software before trusting a workload.

The server verifies the fresh release manifest with the pinned Ed25519 root; the response's advertised public key cannot change that root. Software approval is separate from mutable branch HEAD. Node CPU/GPU/model capabilities are explicitly reported data, not independent hardware or model-quality verification. Wallets, payout amounts, node endpoint URLs, prompts and generated text are not included in the passport.

Cost per successful task, p95 time to first token and per-model success rate are not inferred from cumulative task counts. The API marks that task-level telemetry as unpublished. The page explains the missing evidence instead of displaying invented zero values or benchmarks.

Five fixed public GET calls use the existing platform Worker binding, each with a five-second timeout and a 512 KiB response limit. Independent source failure degrades only that section. The edge cache shares a snapshot for up to 60 seconds; browser polling pauses while hidden and runs once a minute. Actual request usage depends on cache locations and traffic; there is no new scheduled job or paid service.

Run `npm test`, `npm run type-check`, `npm run lint` and the normal Cloudflare preview/production build. Inspect `/network`, `/api/network/passport`, zero/offline states, a bad signature and a missing service binding. The homepage and Network navigation link to the passport. All links use the canonical domain.

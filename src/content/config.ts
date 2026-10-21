export const GSTD_TON_CONTRACT =
  process.env.NEXT_PUBLIC_TON_CONTRACT || "EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO";

export const SITE = {
  name: "GSTD Token",
  url: "https://gstdtoken.com",
  localeDefault: "ru",
  locales: ["en", "ru"],
};

export const LINKS = {
  telegram: "https://t.me/gstdtoken",
  // The actual functional bot (chat, node earning, wallet) --
  // distinct from `telegram` above, which is the announcements/discussion
  // channel. Runs against the node network directly; stays usable even if
  // platform.gstdtoken.com is down, unlike aiChat/platform/app below.
  telegramBot: "https://t.me/gstdaibot",
  twitter: "https://x.com/gstdtoken",
  github: "https://github.com/gstdcoin",
  docs: "/advantages",
  platform: "https://app.gstdtoken.com",
  aiChat: "https://t.me/gstdaibot",
  app: "https://app.gstdtoken.com",
  monitor: "https://app.gstdtoken.com/api/v1/nodes/list",
  chat: "https://t.me/gstdtoken",
  stonfiSwap:
    `https://app.ston.fi/swap?ft=TON&tt=${GSTD_TON_CONTRACT}&amount=1`,
  tonContract: GSTD_TON_CONTRACT,
  getGSDT:
    `https://app.ston.fi/swap?ft=TON&tt=${GSTD_TON_CONTRACT}&amount=1`,
  buyGSDT:
    `https://app.ston.fi/swap?ft=TON&tt=${GSTD_TON_CONTRACT}&amount=1`,
  launchNodes: "https://github.com/gstdcoin/gstdbot",
};

export const TOKEN_INFO = {
  symbol: "GSTD",
  network: "TON",
  decimals: "9",
  totalSupply: "1,000,000,000",
  contractAddress: GSTD_TON_CONTRACT
};


export const SOCIAL_LINKS = {
  telegram: "https://t.me/gstdtoken",
  twitter: "https://x.com/gstdtoken",
  github: "https://github.com/gstdcoin",
  docs: "/advantages"
};

// Verified against source (gstdcoin/gstdbot README + src/naas/hardware_profiler.ts).
// Do not rename these tiers or invent hardware minimums — only what the repo documents.
export const NODE_TIERS = [
  { name: "Spark", modules: 2 },
  { name: "Flame", modules: 4 },
  { name: "Storm", modules: 6 },
  { name: "Titan", modules: 8 },
  { name: "Sovereign", modules: "Unlimited" },
];

// Verified: gstdcoin/gstdbot README "Supported AI Models" table (inference, via node network).
export const INFERENCE_MODELS = [
  "llama-3.3-70b", "llama-3.1-8b", "llama-4-scout", "qwen3-32b",
  "kimi-k2", "gpt-oss-120b", "gpt-oss-20b", "mixtral-8x7b",
];

export const GITHUB_ORG = "gstdcoin";
export const GITHUB_REPOS = ["ai", "web", "gstdbot", "A2A", "gstd-bridge", "contracts"];

export const GSTD_TON_CONTRACT =
  process.env.NEXT_PUBLIC_TON_CONTRACT || "EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO";

export const SITE = {
  name: "GSTD Token",
  url: "https://gstdtoken.com",
  localeDefault: "ru",
  locales: ["en", "ru"],
};

export const LINKS = {
  telegram: "https://t.me/gstdcoin",
  twitter: "https://x.com/gstdtoken",
  github: "https://github.com/gstdcoin",
  docs: "/advantages",
  platform: "https://app.gstdtoken.com",
  aiChat: "https://app.gstdtoken.com",
  app: "https://app.gstdtoken.com/nodes",
  monitor: "https://app.gstdtoken.com/nodes",
  chat: "https://t.me/gstdcoin",
  stonfiSwap:
    `https://app.ston.fi/swap?ft=TON&tt=${GSTD_TON_CONTRACT}&amount=1`,
  tonContract: GSTD_TON_CONTRACT,
  getGSDT:
    `https://app.ston.fi/swap?ft=TON&tt=${GSTD_TON_CONTRACT}&amount=1`,
  buyGSDT:
    `https://app.ston.fi/swap?ft=TON&tt=${GSTD_TON_CONTRACT}&amount=1`,
  launchNodes: "https://app.gstdtoken.com/nodes",
};

export const TOKEN_INFO = {
  symbol: "GSTD",
  network: "TON",
  decimals: "9",
  totalSupply: "1,000,000,000",
  contractAddress: GSTD_TON_CONTRACT
};


export const SOCIAL_LINKS = {
  telegram: "https://t.me/gstdcoin",
  twitter: "https://x.com/gstdtoken",
  github: "https://github.com/gstdcoin",
  docs: "/advantages"
};

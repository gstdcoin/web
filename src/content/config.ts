export const SITE = {
  name: "GSTD Token",
  url: "https://gstdtoken.com",
  localeDefault: "ru",
  locales: ["en", "ru"],
};

export const LINKS = {
  telegram: "https://t.me/goldstandardcoin",
  twitter: "https://x.com/gstdtoken",
  github: "https://github.com/gstdcoin",
  docs: "/advantages",
  stonfiSwap:
    "https://app.ston.fi/swap?ft=TON&tt=EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO&amount=1",
  tonContract: "EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO",
  // CTA Links - легко заменяемые на внутренний dApp
  getGSDT: "https://app.ston.fi/swap?ft=TON&tt=EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO&amount=1", // StonFi swap для обмена
  buyGSDT: "https://app.ston.fi/swap?ft=TON&tt=EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO&amount=1", // StonFi swap для покупки
  launchNodes: "https://t.me/goldstandardcoin", // Telegram сообщество
};

export const TOKEN_INFO = {
  symbol: "GSTD",
  network: "TON",
  decimals: "9",
  totalSupply: "1,000,000,000",
  contractAddress: "EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO"
};

// Proof of Reserve metrics - будут подвязаны к API
export const PROOF_OF_RESERVE = {
  goldBackingRatio: 2.85, // процент
  physicalGoldReserveOz: 1247.5, // унций
  reserveValueUSD: 2850000, // USD
  // В будущем эти значения будут загружаться из API
  // goldBackingRatio: await fetchReserveRatio(),
  // physicalGoldReserveOz: await fetchGoldReserve(),
  // reserveValueUSD: await fetchReserveValue(),
};

export const SOCIAL_LINKS = {
  telegram: "https://t.me/goldstandardcoin",
  twitter: "https://x.com/gstdtoken",
  github: "https://github.com/gstdcoin",
  docs: "/advantages"
};

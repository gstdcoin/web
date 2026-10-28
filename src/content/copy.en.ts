export default {
  // Navigation
  nav: {
    home: 'Home',
    app: 'Platform',
    chat: 'AI Chat',
    monitor: 'Network',
    network: 'Network',
    nodes: 'Nodes',
    ai: 'AI demo',
    about: 'About',
    token: 'Token',
    treasury: 'Treasury',
    developers: 'Developers',
    buy: 'Buy GSTD',
    roadmap: 'Roadmap',
    docs: 'Docs',
    legal: 'Legal',
    runNode: 'Run a Node',
    useGstd: 'Use GSTD',
  },

  ecosystem: {
    title: 'The GSTD Ecosystem',
    subtitle: 'Deploy nodes, process AI requests, earn GSTD — all from public source repositories',
    launchApp: 'Open',
    app: {
      title: 'GSTD Node',
      description: 'Deploy your own node from the public repository. Share computing resources, process AI requests — earn GSTD only for funded, accepted work.',
      cta: 'Deploy Node',
    },
    monitor: {
      title: 'Source-Available',
            description: 'Platform source code is public on GitHub and free for noncommercial use and network participation; commercial use needs a separate license. Nodes can serve local compute; the platform and custody wallet remain central dependencies today.',
      cta: 'GitHub',
    },
    chat: {
      title: 'Community',
      description: 'Join the GSTD community on Telegram. Get support, follow network updates, and coordinate with other node operators.',
      cta: 'Join Telegram',
    },
  },

  // Hero Section
  hero: {
    badge: 'Open AI Compute Network · TON Blockchain',
    kicker: 'GSTD',
    title: 'Open AI Compute Network',
    quote: 'AI infrastructure should not belong to a single provider.',
    subtitle: 'Connect your hardware. Contribute compute. Process AI workloads. Earn GSTD.',
    longDescription: 'GSTD is an open protocol for decentralized AI inference and distributed computing. Anyone can run a node, contribute compute and earn GSTD for funded, accepted work.',
    deployNode: 'Run a Node',
    useNetwork: 'Use the Network',
    tryBot: 'Try it in Telegram',
    viewGithub: 'View GitHub',
    tags: ['Open', 'Distributed', 'AI Compute', 'Node Rewards', 'Source-Available'],
    statusTitle: 'Status',
    statusNote: 'Early stage: the node network is only starting up. Current figures are in the "Network status" block below.',
    stage: 'Early stage',
  },

  // Features
  features: {
    lightningFast: 'Node Network',
    secure: 'Utility Token',
    communityDriven: 'Source-Available',
    scalable: 'Multichain',
  },

  // Feature Cards (Bento Grid)
  featureCards: {
    infrastructure: {
      title: 'Decentralized Node Network',
      description: 'Users deploy nodes with their own hardware to process AI requests and share computing power — earning GSTD only for funded, accepted work.',
    },
    goldLiquidity: {
      title: 'Pay-for-Compute Model',
      description: 'Users pay GSTD for AI inference and node operators receive a share of the fee for the requests they process. Income depends on real usage and is not guaranteed.',
    },
    lowInterest: {
      title: 'Listed on STON.fi',
      description: 'GSTD is a live utility token on the TON blockchain. Trade it on STON.fi DEX. Use it to pay for AI compute on the network.',
    },
  },

  // CTA
  ctaPrimary: 'Get GSTD',
  ctaSecondary: 'Community',
  backToHome: 'Back to Home',
  ctaTitle: 'Ready to Get Started?',
  ctaDescription: 'Join the GSTD node network. Launch a node with Ollama and earn from AI compute requests, or pay GSTD to access AI models on the network.',

  // What We Build
  whatWeBuildTitle: 'What we are building',
  whatWeBuildBullets: [
    'Decentralized AI Inference',
    'Node Operator Earnings',
    'Ecosystem Treasury',
  ],
  whatWeBuildDescriptions: [
    'The protocol routes each inference request to an available node according to capability, availability and load. Routing logic is still evolving — see Documentation for the current implementation.',
    'Node operators receive a share of each GSTD fee for the requests they process. The more requests a node handles, the more it earns; income is not guaranteed.',
    'Part of the fees is earmarked for the treasury; the actual balance is published on the Treasury page.',
  ],

  // Token Section
  tokenSectionTitle: 'Token',
  tokenBullets: [
    'Utility: payment for AI inference on the network',
  ],
  tokenInfo: {
    network: 'Network',
    decimals: 'Decimals',
    totalSupply: 'Total Supply',
    utility: 'Utility',
    utilityValue: 'AI Compute Payment',
    contractAddress: 'Contract Address',
    buyGSTD: 'Buy GSTD',
    advantages: 'Advantages',
    tokenEconomics: 'Token Economics',
    supplyDistribution: 'Supply Distribution',
    useCases: 'Use Cases',
    keyMetrics: 'Key Metrics',
    proofOfReserve: 'Network Stats',
    proofOfReserveTitle: 'Live Network Metrics',
    proofOfReserveDescription: 'Real-time stats from the GSTD node network.',
    proofOfReserveNote: 'Data from the platform API',
    proofOfReserveAuditor: 'Data source',
    proofOfReserveUpdate: 'Data from the GSTD platform node registry; there is no independent on-chain verification of it.',
    verifiedViaOracle: 'Live Network Data',
    goldBackingRatio: 'Nodes Online',
    physicalGoldReserve: 'Active Nodes',
    reserveValue: 'Requests Served',
    liveSource: 'Live data',
    sourceUnavailable: 'Source unavailable',
    logoAlt: 'GSTD Token Logo',
    liquidity: 'Liquidity',
    community: 'Community',
    team: 'Team',
    reserve: 'Treasury',
    computePayment: 'AI Compute Payment',
    governanceVoting: 'Governance voting',
    feeDiscounts: 'Payment for available models',
    stakingRewards: 'Node operator rewards',
    maxSupply: 'Max Supply',
    maxSupplyValue: '1B (TON)',
    useCaseInference: 'Pay for AI inference (GSTD)',
    useCaseNodeShare: 'Node operators receive a share of the fee for requests they process',
    useCaseTreasuryShare: 'Part of the fees is earmarked for the treasury',
    whyLowRate: 'How does the treasury work?',
    whyLowRateAnswer: 'See the Treasury page for the balance and distribution. We do not promise token buybacks or yield.',
  },
  token: {
    featuresTitle: 'Token Features',
    features: [
      'Pay for AI Compute',
      'Node Rewards',
      'Separate Promotional Quotas',
      'Access to Models',
    ],
    featureDescriptions: [
      'GSTD is used to pay for AI inference on the node network.',
      'Node operators receive GSTD for processed requests. Income depends on usage and is not guaranteed.',
      'Promotional quotas are separate from paid balances and cannot be withdrawn as GSTD.',
      'GSTD pays for available models on the platform. Check live model availability and prices before requesting.',
    ],
  },

  // About Page
  about: {
    title: 'About GSTD',
    subtitle: 'Open AI compute network on TON',
    description: 'GSTD is an open protocol for decentralized AI inference. Anyone can run node software on their own hardware, register on the network, and receive GSTD for funded, accepted work. The network is at an early stage.',
    featuresTitle: 'Key Features',
    features: [
      'Open Node Network',
      'Utility Token — Not Investment',
      'Multichain Roadmap: TON Live, Bridge in Development',
      'Source-Available',
    ],
    featureDescriptions: [
      'Anyone can run node software on their own hardware to process AI inference requests — earning GSTD for funded, accepted work.',
      'GSTD is a payment token for AI compute. Node income depends on real usage — no staking, no yield promises.',
      'GSTD runs on TON today. A cross-chain bridge to Solana and XRPL is early-stage, unaudited, and has never moved funds in production — treat it as not live.',
      'Platform source code is public on GitHub (noncommercial license). Read it and run it.',
    ],
    buildBullets: [
      'Node Network: Anyone can run node software that processes AI inference requests, generating protocol fees',
      'Fee Distribution: a node operator receives a share of the fee for processed requests; rewards are tracked in the platform ledger and withdrawn on request',
      'Treasury: part of the fees is earmarked for the treasury; see the Treasury page for the balance',
      'Open Access: Linux x86-64/ARM64 and WSL2; model support depends on RAM, disk and the inference runtime',
    ],
    missionTitle: 'Our Mission',
    missionDescription: 'Build an open AI compute network where anyone can run a node and earn GSTD by serving AI requests. The goal is an open compute market; today the platform and custody remain central dependencies.',
  },

  // Buy Page
  buyTitle: 'How to Buy GSTD',
  buyPage: {
    whyChooseGSTD: 'Why Choose GSTD?',
    additionalResources: 'Additional Resources',
    advantages: 'Advantages',
    advantagesDescription: 'Learn more about GSTD token, its utility, and how to use it effectively.',
    readDetails: 'Read Details',
    community: 'Community',
    communityDescription: 'Join our community to stay updated and get support from other users.',
    joinTelegram: 'Join Telegram',
  },
  buy: {
    subtitle: 'Get your GSTD tokens today',
    featuresTitle: 'Why Choose GSTD?',
    features: [
      'Jetton on the TON blockchain',
      'Low TON transaction fees',
      'Open source platform code',
      'Utility token for AI compute',
    ],
    benefits: [
      {
        title: 'On TON',
        description: 'GSTD is a Jetton on the TON blockchain; check the contract in the explorer.',
      },
      {
        title: 'Swap on STON.fi',
        description: 'Swap TON for GSTD through the STON.fi DEX. Liquidity is limited and the price can move sharply.',
      },
      {
        title: 'Early stage',
        description: 'The network is at an early stage. This is not investment advice; buy only what you are ready to lose.',
      },
    ],
    quickBuyTitle: 'Buy GSTD',
    quickBuyDescription: 'Swap TON for GSTD on the STON.fi DEX',
    buyButtonText: 'Buy GSTD on STON.fi',
    poweredBy: 'Swap runs on the third-party STON.fi DEX',
  },
  buySteps: [
    'Get a TON Wallet',
    'Acquire TON Tokens',
    'Swap TON for GSTD',
    'Add to Favorites',
  ],
  buyStepsDescriptions: [
    'Choose from Telegram Wallet, Tonkeeper or other TON-compatible wallets.',
    'Get TON tokens through exchanges, on-ramps or peer-to-peer transfers.',
    'Use our pre-filled STON.fi link for seamless TON to GSTD swapping.',
    'Add GSTD to your wallet favorites for easy access and tracking.',
  ],

  // Roadmap
  roadmap: {
    title: 'Roadmap',
    subtitle: 'GSTD Protocol Evolution',
    description: 'No fixed dates — phases reflect what is actually built and verifiable in the public repositories, not a marketing timeline.',
    phases: [
      'Open Node Network',
      'Decentralized AI Inference',
      'Verification & Reputation',
      'Treasury & Payouts',
      'Cross-chain Access',
      'Open AI Agent Infrastructure',
    ],
    phaseDescriptions: [
      'Token, node registry, and the public node client',
      'Requests routed to nodes; fees tracked in the platform ledger',
      'Proving that a completed workload was done correctly',
      'Treasury reporting and payouts to node operators; on-chain settlement is still being designed',
      'Cross-chain bridge — public code, unaudited, not live',
      'Agent-to-agent task execution built on the same network',
    ],
    keyMilestones: 'Key Milestones',
    securityFirst: 'Security First',
    securityFirstDescription: 'Contracts are public and verifiable; independent audits are a prerequisite before any bridge or reserve contract handles real funds.',
    communityDriven: 'Community Driven',
    communityDrivenDescription: 'Decentralized governance and community decision making',
    scalableGrowth: 'Scalable Growth',
    scalableGrowthDescription: 'Sustainable growth with innovative features and partnerships',
    developmentProgress: 'Development Progress',
    developmentProgressDescription: 'Status is sourced from the public repositories — not projected',
    phaseComplete: 'Live',
    phaseProgress: 'Live, Limited',
    phasePlanning: 'In Progress',
    phaseResearch: 'Early / Unaudited',
    completed: 'Live',
    inProgress: 'In Progress',
    upcoming: 'Early / Unaudited',
    future: 'Design Only',
    phaseFeatures: [
      [
        'Jetton deployed on TON, supply fixed, admin key burned',
        'Source-available node client (gstdcoin/gstdbot) with a one-line installer',
        'Local inference, PIN-protected operator dashboard and model management',
      ],
      [
        'AI inference requests routed to available nodes',
        'Fees and rewards are tracked in the platform ledger; there is no on-chain settlement yet',
        'The node client supports a catalog of open models — the current list is in the Documentation',
      ],
      [
        'Result submissions are signed (Ed25519) so the network knows who submitted a result',
        'No cryptographic proof of correct computation yet — in design',
        'Node reputation and capability-based routing — in design',
      ],
      [
        'The treasury is currently an internal platform ledger (see the Treasury page)',
        'Contract code is public in gstdcoin/contracts; it has not been independently audited',
        'No buyback or yield is promised',
      ],
      [
        'Cross-chain bridge to Solana and XRPL exists as public code',
        'No live vault on either chain, unaudited, has never processed a real transfer',
        'Independent audit required before any bridge functionality should be relied upon',
      ],
      [
        'Agent SDK (gstdcoin/A2A); the Python monitor registers and sends heartbeats, while execution requires an integration',
        'Federated learning and a shared knowledge store are proposed designs, not implemented',
        'SDKs provide integration building blocks; deployment and workload execution must be validated',
      ],
    ],
  },

  // Legal
  legal: {
    title: 'Legal',
    subtitle: 'Legal information and compliance',
    description: 'Important legal information, terms of service, privacy policy, and compliance details for GSTD platform users.',
    sections: [
      'Terms of Service',
      'Privacy Policy',
      'Risk Disclaimers',
      'Risk Warnings',
    ],
    sectionDescriptions: [
      'Terms and conditions for using the GSTD platform and services.',
      'How we collect, use, and protect your personal information.',
      'Legal disclaimers and risk warnings for cryptocurrency usage.',
      'Important risk factors and considerations for users.',
    ],
    importantNotice: 'Important Notice',
    riskWarning: 'Risk Warning:',
    riskWarningText: 'GSTD is a utility token for paying for AI compute — not an investment. Cryptocurrency carries significant risk. Nothing on this site is financial or investment advice.',
    regulatoryNotice: 'Regulatory Notice:',
    regulatoryNoticeText: 'The regulatory status of digital assets and related services is uncertain in many jurisdictions. Users should ensure compliance with local laws and regulations.',
    noFinancialAdvice: 'No Financial Advice:',
    noFinancialAdviceText: 'The information provided on this platform is for informational purposes only and should not be considered as financial, investment, or legal advice.',
    noWarrantyNotice: 'No Warranty:',
    noWarrantyNoticeText: 'The Platform, including its website, node software, and smart contracts, is provided "as is" and "as available" with no warranty of any kind. We do not guarantee uninterrupted, secure, or error-free operation.',
    userResponsibilityNotice: 'Your Responsibility:',
    userResponsibilityNoticeText: 'You are solely responsible for the security of your wallet and private keys, for verifying transactions before submitting them, and for complying with the laws that apply to you. We cannot reverse blockchain transactions or recover lost keys.',
    complianceSecurity: 'Compliance & Security',
    securityAudits: 'Security Audits',
    securityAuditsDescription: 'Smart contracts are reviewed for security before deployment. All contract code is public and verifiable.',
    legalCompliance: 'Legal Compliance',
    legalComplianceDescription: 'We work with legal experts to ensure compliance with applicable laws and regulations.',
    transparency: 'Transparency',
    transparencyDescription: 'All legal documents and policies are publicly available and regularly updated.',
    supportContact: 'Support Contact',
    supportContactDescription: 'For project inquiries and support',
    supportProjectInquiries: 'Support for project inquiries',
    telegramCommunity: 'Telegram community',
    responseTime: 'Response time: 24–48 hours',
    developmentTeam: 'Development and Integration Team',
    fullDocsTitle: 'Full Legal Documents',
    fullDocsSubtitle: 'The summaries above are an index. The full text of each document is below — please read it before using the Platform.',
    lastUpdated: 'Last updated: July 23, 2026',
    termsOfService: {
      title: 'Terms of Service',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          body: 'By accessing or using the GSTD website, node software, Telegram bot, or any related service (collectively, the "Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Platform. You confirm that you have the legal capacity and authority to enter into this agreement under the laws of your jurisdiction.',
        },
        {
          heading: '2. Description of Service',
          body: 'The Platform is source-available, permissionless software that connects node operators (who provide compute resources for AI inference) with users who pay for that compute using GSTD, a utility token on the TON blockchain. The Platform does not operate, own, or control the compute hardware, the TON blockchain, or any third-party exchange. Paid platform balances are recorded in a central ledger and backed by a custody wallet; withdrawals require its owner to sign. A real deposit-to-withdrawal mainnet cycle has not yet been confirmed. Self-hosted local inference does not require a paid platform balance.',
        },
        {
          heading: '3. Nature of GSTD — Not a Security, Not an Investment',
          body: 'GSTD is a utility token designed solely to pay for AI compute on the network, comparable to how gas tokens pay for computation on other blockchains. GSTD is not a security, share, bond, deposit, or any other form of regulated financial instrument in any jurisdiction. Purchasing, holding, earning, or using GSTD carries no expectation of profit derived from the efforts of others, no dividend, no interest, and no guarantee of value, liquidity, or future price. Nothing on the Platform is an offer or solicitation to buy or sell any security in any jurisdiction where such an offer would be unlawful.',
        },
        {
          heading: '4. Eligibility and Compliance',
          body: 'You are solely responsible for determining whether your use of the Platform, holding of GSTD, or operation of a node is lawful in your jurisdiction. You represent that you are not located in, and are not a citizen or resident of, any jurisdiction where use of the Platform or GSTD would violate applicable law, and that you are not on any sanctions or restricted-party list. We reserve the right to restrict access to the Platform for any user or jurisdiction at our discretion, without notice.',
        },
        {
          heading: '5. Your Responsibilities',
          body: 'You are solely responsible for: (a) the security of your wallet, private keys, seed phrases, and any device used to access the Platform; (b) all activity that occurs through your wallet address, node, or account; (c) verifying the accuracy of any transaction before submitting it, as blockchain transactions cannot be reversed; and (d) complying with all tax, reporting, and regulatory obligations that apply to you. We have no ability to recover lost private keys, reverse confirmed transactions, or restore access to a wallet you no longer control.',
        },
        {
          heading: '6. Running a Node',
          body: 'Operating a node is entirely voluntary and undertaken at your own risk and expense. We do not guarantee any level of earnings, uptime, task volume, or compensation for running a node. Node rewards depend on network demand, your hardware, your connectivity, and factors entirely outside our control, and may be zero. You are responsible for the electricity, hardware, bandwidth, and any other costs of node operation, and for ensuring your use of your own hardware to run a node complies with any applicable terms from your hardware or connectivity providers.',
        },
        {
          heading: '7. No Warranties',
          body: 'THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, OR THAT THE PLATFORM WILL BE UNINTERRUPTED, SECURE, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS. Public source code, including smart contracts and node software, may contain bugs or vulnerabilities despite reasonable review, and we do not warrant otherwise.',
        },
        {
          heading: '8. Limitation of Liability',
          body: 'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL THE GSTD PROJECT, ITS CONTRIBUTORS, OR ANY AFFILIATED INDIVIDUAL OR ENTITY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR DIGITAL ASSETS, ARISING FROM OR RELATED TO YOUR USE OF THE PLATFORM, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. TO THE EXTENT ANY LIABILITY CANNOT BE EXCLUDED UNDER APPLICABLE LAW, OUR TOTAL AGGREGATE LIABILITY IS LIMITED TO THE GREATER OF (A) THE FEES YOU PAID TO USE THE PLATFORM IN THE 3 MONTHS PRECEDING THE CLAIM, OR (B) 100 USD EQUIVALENT IN GSTD. Nothing in these Terms excludes liability that cannot be excluded under applicable law (for example, liability for fraud).',
        },
        {
          heading: '9. Assumption of Risk',
          body: 'You acknowledge and accept, on your own behalf, the full range of risks described in the Risk Disclaimers and Risk Warnings sections below, including but not limited to price volatility, smart contract risk, node hardware and software risk, regulatory risk, and the irreversibility of blockchain transactions. You use the Platform entirely at your own risk.',
        },
        {
          heading: '10. Indemnification',
          body: 'You agree to indemnify, defend, and hold harmless the GSTD project, its contributors, and any affiliated individual or entity from and against any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising out of or related to: your use of the Platform; your violation of these Terms; your violation of any applicable law; or your violation of any right of a third party.',
        },
        {
          heading: '11. Termination',
          body: 'Because the Platform is decentralized and permissionless, we cannot "terminate" your ability to run node software or hold a self-custodied wallet. We may, however, restrict, suspend, or discontinue any centrally-operated service (such as the website, the Telegram bot, or a particular API endpoint) at any time, for any reason, without liability to you.',
        },
        {
          heading: '12. Governing Law and Dispute Resolution',
          body: 'These Terms are governed by the laws applicable in the jurisdiction of the operating entity, without regard to conflict-of-law principles, except where mandatory local consumer-protection law provides otherwise. Any dispute arising from these Terms or your use of the Platform shall first be attempted to be resolved informally by contacting us; unresolved disputes shall be subject to binding arbitration or the courts of competent jurisdiction, to the extent permitted by applicable law.',
        },
        {
          heading: '13. Changes to These Terms',
          body: 'We may update these Terms at any time by posting a revised version on this page. Continued use of the Platform after a change is posted constitutes acceptance of the revised Terms. We encourage you to review this page periodically.',
        },
        {
          heading: '14. Force Majeure',
          body: 'We are not liable for any failure or delay in performance resulting from causes beyond our reasonable control, including but not limited to blockchain network congestion or failure, internet or infrastructure outages, acts of government, natural disasters, or force majeure events.',
        },
      ],
    },
    privacyPolicy: {
      title: 'Privacy Policy',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'Depending on how you use the Platform, we may process: your public TON wallet address; node metadata (name, capabilities, uptime, IP-derived approximate location for routing); Telegram user ID and username if you use the Telegram bot; and standard technical data such as browser type, device type, and pages visited. We do not require or collect government ID, name, or physical address to use the core Platform.',
        },
        {
          heading: '2. Blockchain Data Is Public and Permanent',
          body: 'Transactions you make using GSTD or any TON-based wallet are recorded on a public, immutable blockchain. Wallet addresses and transaction amounts are visible to anyone and cannot be deleted, altered, or made private by us or by you, at any time, for any reason. Do not treat any on-chain transaction as private.',
        },
        {
          heading: '3. How We Use Information',
          body: 'We use the information described above to operate the Platform (route tasks to nodes, calculate rewards, display balances), to prevent fraud and abuse, to improve the Platform, and to communicate with you (for example, Telegram bot replies or security notices). We do not use your data to make automated decisions with legal effect on you.',
        },
        {
          heading: '4. Data Sharing and Disclosure',
          body: 'We do not sell your personal data. We may disclose information we hold if required by law, subpoena, or governmental request, or where necessary to protect the rights, property, or safety of the Platform, its users, or the public. Because node operation and inference routing are inherently distributed, technical metadata (such as node IP addresses) is necessarily visible to the peers your node or request interacts with.',
        },
        {
          heading: '5. Data Security',
          body: 'We use reasonable technical and organizational measures to protect information under our control, but no method of transmission or storage is completely secure. We cannot guarantee absolute security and are not liable for unauthorized access resulting from circumstances outside our reasonable control, including compromise of your own device, wallet, or credentials.',
        },
        {
          heading: '6. Cookies and Analytics',
          body: 'The website may use minimal, privacy-respecting analytics to understand aggregate usage (such as page views). You can control cookies through your browser settings; disabling them may limit some website functionality but will not prevent you from using node software directly.',
        },
        {
          heading: '7. Your Rights',
          body: 'Depending on your jurisdiction, you may have rights to request access to, correction of, or deletion of personal data we hold off-chain (such as a linked Telegram username). Submit such requests via the contact details below. We cannot alter, delete, or restrict access to data that is recorded on a public blockchain, as we do not control it.',
        },
        {
          heading: '8. Children\'s Privacy',
          body: 'The Platform is not directed at, and should not be used by, anyone under the age of 18 or the age of legal majority in their jurisdiction, whichever is higher. We do not knowingly collect data from children.',
        },
        {
          heading: '9. International Users',
          body: 'The Platform is accessed globally and information may be processed in jurisdictions other than your own, which may have different data-protection standards than your home jurisdiction. By using the Platform, you consent to this processing.',
        },
        {
          heading: '10. Changes to This Policy',
          body: 'We may update this Privacy Policy at any time by posting a revised version on this page. Continued use of the Platform after a change is posted constitutes acceptance of the revised Policy.',
        },
      ],
    },
    riskDisclaimers: {
      title: 'Risk Disclaimers',
      sections: [
        {
          heading: '1. Not Investment Advice, Not a Security',
          body: 'Nothing published on the Platform — including this website, documentation, or any statement by a contributor — is financial, investment, tax, or legal advice, or a recommendation to buy, hold, or sell GSTD or any other asset. GSTD is not registered as a security in any jurisdiction and no regulator has reviewed or approved it.',
        },
        {
          heading: '2. Extreme Price Volatility',
          body: 'The price of GSTD, like all cryptocurrencies, can be extremely volatile and may decline to zero. Past performance, network growth, or any historical price is not indicative of future results. You should never acquire, hold, or use more GSTD than you can afford to lose entirely.',
        },
        {
          heading: '3. Smart Contract and Technology Risk',
          body: 'The Platform relies on public smart contracts and software that, despite reasonable review, may contain undiscovered bugs, vulnerabilities, or exploits. A successful exploit, network attack, or software failure could result in the partial or total loss of funds, tokens, or data, with no guarantee of recovery or compensation.',
        },
        {
          heading: '4. Node Operation Risk',
          body: 'Running a node exposes your hardware and network to interaction with unknown third parties and workloads. We do not vet, sandbox-guarantee, or take responsibility for the content of tasks routed to your node. Node earnings are not guaranteed and may be zero or negative after accounting for your costs.',
        },
        {
          heading: '5. Regulatory Risk',
          body: 'The legal and regulatory treatment of cryptocurrencies, DePIN networks, and utility tokens is unsettled and varies by jurisdiction, and may change — potentially retroactively — in ways that restrict or prohibit your use of the Platform or GSTD. You are solely responsible for monitoring and complying with the law that applies to you.',
        },
        {
          heading: '6. No Insurance or Guarantee',
          body: 'GSTD and any balance shown on the Platform is not a bank deposit, is not insured by any government deposit insurance scheme, and carries no guarantee of value from us or any third party.',
        },
        {
          heading: '7. Third-Party and Bridge Risk',
          body: 'The Platform may reference or interoperate with third-party services (decentralized exchanges, liquidity pools, cross-chain bridges) that we do not control and are not responsible for. Any cross-chain bridge functionality referenced by the Platform that is not yet live carries additional, unaudited experimental risk once deployed, and should not be relied upon for any transfer of value until independently verified as production-ready.',
        },
        {
          heading: '8. Irreversibility of Transactions',
          body: 'Blockchain transactions, once confirmed, cannot be reversed, cancelled, or refunded by us under any circumstances, including transactions sent to an incorrect address or made in error.',
        },
      ],
    },
    riskWarnings: {
      title: 'Risk Warnings — Read Before Using the Platform',
      sections: [
        { heading: '', body: 'You may lose the entire value of any GSTD you acquire, hold, or earn.' },
        { heading: '', body: 'GSTD is not a bank deposit and is not insured by any deposit protection scheme.' },
        { heading: '', body: 'Running a node earns no guaranteed income and may cost you more in electricity and hardware than you earn.' },
        { heading: '', body: 'Blockchain transactions cannot be reversed once confirmed, even if sent by mistake.' },
        { heading: '', body: 'You alone are responsible for the security of your wallet, private keys, and seed phrase — if lost, they cannot be recovered by us.' },
        { heading: '', body: 'The legal status of cryptocurrency varies by country and can change; compliance with local law is entirely your responsibility.' },
        { heading: '', body: 'The Platform is provided "as is," with no guarantee of uptime, availability, or that it is free of bugs or security vulnerabilities.' },
        { heading: '', body: 'By using the Platform, you confirm you have read, understood, and accept all risks described in these Risk Disclaimers and Risk Warnings.' },
      ],
    },
  },

  // Core Protocol / formerly Investors
  investors: {
    title: 'Core Protocol',
    subtitle: 'GSTD Protocol Core Components',
    description: 'GSTD is an open AI compute network at an early stage. Node operators run node software on their own hardware and receive a share of the fee paid in GSTD by users requesting AI compute.',
    summary: 'GSTD is an open AI compute network: users pay GSTD for AI inference and node operators receive a share of the fee. No yield promises. Income depends on real usage; check the live status for current capacity and usage.',
    advantagesTitle: 'Key Features',
    advantages: {
      reliability: {
        title: 'Pay for Compute',
        description: 'Node operators receive GSTD for the AI requests they process. Income depends on network usage and is not guaranteed.',
      },
      interest: {
        title: 'Low Barrier to Entry',
        description: 'Use supported 64-bit Linux or WSL2 hardware. Choose models for available RAM and disk; GPU support depends on drivers. No minimum stake is required.',
      },
      transparency: {
        title: 'Open Source',
        description: 'The platform source code is public on GitHub (noncommercial license). Network metrics are published from the API with no simulation.',
      },
      antiwhale: {
        title: 'Open Access',
        description: 'Supported Linux x86-64/ARM64 and WSL2 machines can run node software. Available models depend on the machine.',
      },
      income: {
        title: 'Node Operator Rewards',
        description: 'Rewards are accrued in the platform ledger in proportion to completed compute and withdrawn to a wallet on request.',
      },
    },
    cta: {
      title: 'Join the GSTD Network',
      description: 'Run a node or pay GSTD for AI chat access. The network is at an early stage.',
      badge: 'Get GSTD',
    },
  },

  // Footer
  footer: {
    description: 'Open AI compute network on TON. Pay GSTD for inference or run a node.',
    followUs: 'Follow us',
    quickLinks: 'Quick Links',
    contact: 'Contact',
    allRightsReserved: 'All rights reserved',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },

  // Network Status
  networkStatus: {
    title: 'Network Status',
    subtitle: 'Live metrics from the GSTD node registry — no simulated numbers',
    liveUpdate: 'Real-time update',
    lastUpdate: 'Last update: just now',
    unavailable: 'Data unavailable',
    unavailableNote: 'The live API is temporarily unreachable. This panel never shows simulated numbers — it shows nothing instead.',
    metrics: {
      nodesOnline: { label: 'Nodes Online' },
      totalRegistered: { label: 'Total Registered Nodes' },
      tasksCompleted: { label: 'Workloads Completed' },
      queueDepth: { label: 'Queue Depth' },
      gstdPaid: { label: 'GSTD Paid to Nodes' },
      treasuryBalance: { label: 'Treasury (GSTD)' },
      bridge: { label: 'Bridge Status' },
    },
    lastTx: 'Last TX',
    uptime: 'uptime',
    countries: 'countries',
    perToken: 'per token',
    active: 'Active',
    operational: 'Operational',
  },

  // Node Install Section
  nodeInstall: {
    badge: 'One-line install · source-available',
    title: 'Run a Node',
    subtitle: 'Install on Linux or in a WSL2 Linux shell. Setup includes Node.js and a local model; download time depends on your connection. macOS needs separate validation.',
    requirements: 'Installer handles Node.js 20+ setup itself · Linux / WSL2 · 64-bit ARM Raspberry Pi',
    ctaGithub: 'View on GitHub',
    ctaTelegram: 'Node Operators Chat',
    modes: [
      { title: 'Local AI', desc: 'Run an installed model. Requests stay on this device by default.', badge: 'Default' },
      { title: 'Network requests', desc: 'Choose network mode explicitly to use another available node.', badge: 'Optional' },
      { title: 'Paid work', desc: 'Earn 85% of funded accepted work. Availability and income are not guaranteed.', badge: 'GSTD' },
    ],
  },

  featureSection: {
    title: 'Key Features',
    subtitle: 'An open compute network where nodes receive a share of the fee for AI inference',
  },

  // FAQ Section
  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Answers to key questions about GSTD',
    items: [
      {
        question: 'What is GSTD?',
        answer: 'GSTD is a utility token for paying for AI inference on an open node network. It is NOT an investment product. Income comes from real usage — no staking, no yield promises.',
      },
      {
        question: 'How do node operators earn?',
        answer: 'Node operators run the open node software on their hardware, register on the network, and receive a share of the GSTD fee for the requests they process. Funded accepted work allocates 85% to executors, 10% to the protocol and 5% to the reserve. Earned credits can pay for other nodes or request a withdrawal signed by the custody owner. The network is at an early stage: income is not guaranteed and depends on real usage.',
      },
      {
        question: 'How does the treasury work?',
        answer: 'Part of the fees is earmarked for the ecosystem treasury. See the Treasury page for the actual balance and how it is used; we do not promise yield or token buybacks.',
      },
      {
        question: 'Why is GSTD a utility token?',
        answer: 'GSTD is the payment currency for AI compute on the network — similar to how ETH pays for Ethereum gas. There are no promises of returns, no guaranteed backing per token, and no lending products.',
      },
      {
        question: 'Is the cross-chain bridge live?',
        answer: 'No. TON is the only live network today. Bridge code for Solana and XRPL exists in a public repository but is unaudited, has no deployed vault on either chain, and has never processed a real transfer. Do not rely on it for moving funds.',
      },
      {
        question: 'What AI models can I use?',
        answer: 'Live node availability is shown in network status. Corporate AI fallback requires explicit user consent. The node software runs on top of Ollama and can serve whichever models are installed on that node; once nodes appear, a request is routed to an available node that has the model.',
      },
      {
        question: 'Is task execution cryptographically guaranteed?',
        answer: 'No. There is currently no cryptographic proof that a computation was performed correctly — we do not claim a "mathematical guarantee," and you should not rely on one.',
      },
      {
        question: 'What hardware do I need to run a node?',
        answer: 'The installer targets Linux x86-64/ARM64 and WSL2. CPU inference is available; each model needs sufficient RAM and free disk. GPU acceleration depends on runtime and driver support. Linux clusters run one node per machine; pooled model execution across machines is not implemented.',
      },
    ],
  },

  // Core Message — "The network is the infrastructure"
  coreMessage: {
    title: 'The Network Is the Infrastructure',
    body: [
      'Traditional AI infrastructure is concentrated in a small number of cloud providers.',
      'GSTD takes a different approach: computing resources are supplied by independent node operators.',
      'No single machine is the network. No single provider is the network. The network is the collection of participating nodes.',
    ],
    pillars: [
      { title: 'Open', description: 'Anyone can participate — run a node, build an app, or read the source.' },
      { title: 'Distributed', description: 'The node software supports independent operators; the current pilot has one physical compute node.' },
      { title: 'Incentivized', description: 'Nodes receive GSTD for accepted paid work; blockchain withdrawals require the custody owner signature.' },
    ],
  },

  // Node Economy section
  nodeEconomy: {
    hardwareTitle: 'Hardware',
    resourcesTitle: 'Resources',
    badge: 'Node software · source-available',
    title: 'Your Hardware Can Become Part of the Network',
    subtitle: 'Instead of leaving computing resources idle, contribute them to the network.',
    devices: ['Laptop', 'Desktop', 'Gaming PC', 'Workstation', 'Server', 'GPU Server'],
    resources: ['CPU', 'GPU', 'RAM'],
    workflow: [
      'Install the node',
      'Connect your wallet',
      'Receive workloads',
      'Complete workloads',
      'Earn GSTD',
    ],
    cta: 'Run a Node',
  },

  // Node Requirements
  nodeRequirements: {
    title: 'Node Requirements',
    subtitle: 'Choose a model that fits your RAM. Useful paid work earns 85%; hardware classes do not create rewards.',
    basicTitle: 'Basic',
    basic: ['CPU', 'RAM', 'Internet connection', 'Storage'],
    inferenceTitle: 'For AI Inference',
    inference: ['NVIDIA GPU', 'AMD GPU', 'Apple Silicon', 'CPU fallback supported'],
    tiersTitle: 'Hardware Tiers',
    hardwareTitle: 'Hardware',
    resourcesTitle: 'Resources',
    tiersNote: "Model requirements vary. Check RAM, disk space and runtime compatibility before downloading.",
    tierColumn: 'Tier',
    modulesColumn: 'Modules',
  },

  // How AI Requests Work
  requestFlow: {
    title: 'How AI Requests Work',
    steps: ['User', 'Request', 'Router', 'Node Selection', 'Compute', 'Verification', 'Result', 'Settlement'],
    description: 'The protocol routes workloads to available nodes. Result submissions are cryptographically signed so the network knows who submitted them. There is currently no cryptographic proof that a computation was performed correctly — that is active, unfinished work, not a shipped guarantee.',
  },

  // Open Source / Developers section
  openSource: {
    title: 'The Protocol Is Open',
    subtitle: 'Anyone should be able to inspect the code, run a node, contribute improvements and build applications on top of the network.',
    ctaGithub: 'View GitHub',
    ctaRunNode: 'Run a Node',
    ctaDocs: 'Read Documentation',
    ctaBuild: 'Build on GSTD',
    repoLabels: { language: 'Language', updated: 'Updated', stars: 'Stars' },
  },

  // AI Marketplace
  aiMarketplace: {
    title: 'Models',
    subtitle: 'Demo chat and the node client. The list below shows API model names, not a guarantee of availability.',
    categories: ['Chat', 'Coding'],
    inferenceTitle: 'API model names',
    inferenceNote: 'Use the exact model name from the live registry. If it is unavailable, the request fails; choosing a different model requires your consent.',
    supportedByClient: 'Supported by the node client',
    columns: { model: 'Model', provider: 'Provider / Node', availability: 'Status' },
  },

  // Documentation hub
  docs: {
    title: 'Documentation',
    subtitle: 'What the protocol actually does, sourced from the same public repositories that run it.',
    sections: [
      { title: 'Overview', description: 'What GSTD is, and what it is not.' },
      { title: 'Architecture', description: 'Node client, backend API, and how they talk to each other.' },
      { title: 'Node', description: 'Installing, configuring, and running node software.' },
      { title: 'Compute', description: 'How workloads are picked up and processed.' },
      { title: 'Inference', description: 'Supported models and how requests are routed.' },
      { title: 'Payments', description: 'How AI inference is paid for in GSTD.' },
      { title: 'Rewards', description: 'How node operators receive rewards.' },
      { title: 'Verification', description: 'What is cryptographically proven today, and what is not yet.' },
      { title: 'Treasury', description: 'What the treasury publishes and how it is funded.' },
      { title: 'Token', description: 'GSTD as a utility token — supply, contract, use cases.' },
      { title: 'Security', description: 'Known risks and what has not been independently audited.' },
      { title: 'API', description: 'Public endpoints and their real response fields.' },
      { title: 'Developers', description: 'SDKs, repositories, and how to build on the network.' },
      { title: 'FAQ', description: 'Common questions, answered honestly.' },
    ],
  },

  // Transparency page
  transparency: {
    title: 'Transparency',
    subtitle: 'Nothing on this page is a promise — it is a set of links you can verify yourself.',
    items: [
      { label: 'Token Contract (TON)', description: 'The deployed jetton — supply, holders, and admin status, live on-chain.' },
      { label: 'GitHub', description: 'All six repositories that make up the protocol — node client, backend, contracts, bridge, agent SDK, and this website.' },
      { label: 'Protocol Documentation', description: 'How the network actually works, sourced from the code.' },
      { label: 'On-Chain Transactions', description: 'GSTD transfers are verifiable on a TON explorer.' },
      { label: 'Network Metrics', description: 'Live node and task data, when the API is reachable.' },
      { label: 'Node Software', description: 'The exact code that runs on every node.' },
      { label: 'Smart Contracts', description: 'Public code in the contracts repository; not independently audited.' },
    ],
    disclaimer: 'Nothing on this website constitutes an offer of securities, investment advice, or a guarantee of future value.',
  },
};

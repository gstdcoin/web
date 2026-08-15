export default {
  // Navigation
  nav: {
    home: 'Home',
    app: 'Platform',
    chat: 'AI Chat',
    monitor: 'Network',
    network: 'Network',
    nodes: 'Nodes',
    ai: 'AI',
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
    subtitle: 'Deploy nodes, process AI requests, earn GSTD — all from open-source repositories',
    launchApp: 'Open',
    app: {
      title: 'GSTD Node',
      description: 'Deploy your own node from the open-source repository. Share computing resources, process AI requests — earn GSTD fees for every completed task.',
      cta: 'Deploy Node',
    },
    monitor: {
      title: 'Open Source',
      description: 'All platform components are open-source and deployable from GitHub. No central servers — the network is the nodes.',
      cta: 'GitHub',
    },
    chat: {
      title: 'Community',
      description: 'Join the GSTD community on Telegram. Get support, follow network updates, and coordinate with other node operators.',
      cta: 'Join Telegram',
    },
    finetune: {
      title: 'Fine-Tuning Marketplace',
      description: 'Submit your dataset. A distributed node trains a LoRA adapter on it — real adapters have been produced end-to-end. Base-model availability is limited; check Documentation before relying on a specific model.',
      cta: 'Start fine-tuning',
    },
  },

  // Hero Section
  hero: {
    badge: 'Open AI Compute Network · TON Blockchain',
    kicker: 'GSTD',
    title: 'Open AI Compute Network',
    quote: 'AI infrastructure should not belong to a single provider.',
    subtitle: 'Connect your hardware. Contribute compute. Process AI workloads. Earn GSTD.',
    longDescription: 'GSTD is an open protocol for decentralized AI inference and distributed computing. Anyone can run a node, contribute compute and earn GSTD for completed workloads.',
    deployNode: 'Run a Node',
    useNetwork: 'Use the Network',
    tryBot: 'Try it in Telegram',
    viewGithub: 'View GitHub',
    fineTuneModels: 'Fine-Tune Models',
    tags: ['Open', 'Distributed', 'AI Compute', 'Node Rewards', 'Open Source'],
  },

  // Features
  features: {
    lightningFast: 'Node Network',
    secure: 'Utility Token',
    communityDriven: 'Open Source',
    scalable: 'Multichain',
  },

  // Feature Cards (Bento Grid)
  featureCards: {
    infrastructure: {
      title: 'Decentralized Node Network',
      description: 'Users deploy nodes with their own hardware to process AI requests and share computing power — earning GSTD fees for every task completed.',
    },
    goldLiquidity: {
      title: 'Pay-for-Compute Model',
      description: 'Users pay GSTD for AI inference. Node operators earn the large majority of every fee (85% on-chain); the remainder funds the treasury and a buyback & burn.',
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
    'Fine-Tuning Marketplace',
    'Node Operator Earnings',
    'Ecosystem Treasury',
  ],
  whatWeBuildDescriptions: [
    'The protocol routes each inference request to an available node according to capability, availability and load. Routing logic is still evolving — see Documentation for the current implementation.',
    'Submit your dataset. A distributed node trains a LoRA adapter on it. The pipeline has produced real, verified adapters end to end — availability currently depends on which base model is wired up for training.',
    'Node operators earn 85% of every fee paid in GSTD, settled on-chain. The more requests your node handles, the more you earn.',
    '10% of all fees go to the ecosystem treasury; 5% is used for GSTD buyback & burn.',
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
    proofOfReserveNote: 'Data sourced from the live node registry',
    proofOfReserveAuditor: 'On-chain verifiable',
    proofOfReserveUpdate: 'Updated every heartbeat. All nodes verified on TON network.',
    verifiedViaOracle: 'Live Network Data',
    goldBackingRatio: 'Nodes Online',
    physicalGoldReserve: 'Active Nodes',
    reserveValue: 'Requests Served',
    logoAlt: 'GSTD Token Logo',
    liquidity: 'Liquidity',
    community: 'Community',
    team: 'Team',
    reserve: 'Treasury',
    computePayment: 'AI Compute Payment',
    governanceVoting: 'Governance voting',
    feeDiscounts: 'Task Launch',
    stakingRewards: 'Node Earnings',
    maxSupply: 'Max Supply',
    maxSupplyValue: '1B (TON)',
    useCaseInference: 'Pay for AI inference (GSTD)',
    useCaseNodeShare: 'Node operators earn 85% of every fee, settled on-chain',
    useCaseTreasuryShare: '10% to treasury, 5% to buyback & burn',
    whyLowRate: 'How does the treasury work?',
    whyLowRateAnswer: 'A portion of protocol fees may be allocated to the ecosystem treasury according to the protocol’s published rules — currently 10% of settled fees, with a further 5% used for GSTD buyback & burn.',
  },
  token: {
    featuresTitle: 'Token Features',
    features: [
      'Pay for AI Compute',
      'Protocol Access',
      'Fee Discounts',
      'Node Earnings',
    ],
    featureDescriptions: [
      'Use GSTD to pay for AI inference on the decentralized node network.',
      'Access premium models and priority routing on the network.',
      'Benefit from reduced fees and priority access to new features.',
      'Run a node and earn GSTD for every AI request you process.',
    ],
  },

  // About Page
  about: {
    title: 'About GSTD',
    subtitle: 'Open AI compute network on TON',
    description: 'GSTD is an open protocol for decentralized AI inference. Anyone can run node software on their own hardware, register on the network, and earn GSTD for completed workloads — 85% of every fee, settled on-chain.',
    featuresTitle: 'Key Features',
    features: [
      'Open Node Network',
      'Utility Token — Not Investment',
      'Multichain Roadmap: TON Live, Bridge in Development',
      'Open Source',
    ],
    featureDescriptions: [
      'Anyone can run node software on their own hardware to process AI inference requests — earning GSTD for every completed workload.',
      'GSTD is a payment token for AI compute. Earnings come from real usage — not staking, not gold, not promises.',
      'GSTD runs on TON today. A cross-chain bridge to Solana and XRPL is early-stage, unaudited, and has never moved funds in production — treat it as not live.',
      'All platform components are open-source. Deploy from GitHub, verify on-chain.',
    ],
    buildBullets: [
      'Node Network: Anyone can run node software that processes AI inference requests, generating protocol fees',
      'Fee Distribution: Node operators earn 85% of every inference fee, settled on-chain by the SettlementMaster contract',
      'Treasury: 10% of fees fund the treasury; a further 5% is used for GSTD buyback & burn',
      'Open Access: Any device (laptop, Pi, server) can join and start earning',
    ],
    missionTitle: 'Our Mission',
    missionDescription: 'Build an open AI compute network where anyone can run a node and earn GSTD by serving AI requests. No gatekeepers, no single provider — just an open compute market.',
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
      'Built on secure TON blockchain',
      'Low transaction fees',
      'Fast settlement times',
      'Community-driven development',
      'Transparent governance',
      'Regular security audits',
    ],
    benefits: [
      {
        title: 'Secure & Trusted',
        description: 'Built on TON blockchain with proven security and reliability.',
      },
      {
        title: 'Fast Transactions',
        description: 'Lightning-fast swaps with minimal fees and instant settlement.',
      },
      {
        title: 'Community Driven',
        description: 'Join thousands of users in the growing GSTD ecosystem.',
      },
    ],
    quickBuyTitle: 'Buy GSTD Now',
    quickBuyDescription: 'Get your GSTD tokens instantly through our secure swap interface',
    buyButtonText: 'Buy GSTD on STON.fi',
    poweredBy: 'Powered by STON.fi • Secure • Fast • Low Fees',
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
    description: 'No fixed dates — phases reflect what is actually built and verifiable in the open-source repositories, not a marketing timeline.',
    phases: [
      'Open Node Network',
      'Decentralized AI Inference',
      'Distributed Fine-Tuning',
      'Verification & Reputation',
      'Treasury & Reserve Infrastructure',
      'Permissionless AI Compute Marketplace',
      'Open AI Agent Infrastructure',
    ],
    phaseDescriptions: [
      'Token, node registry, and the open-source node client',
      'Requests routed to nodes, fees settled on-chain',
      'Dataset submission and distributed LoRA training',
      'Proving that a completed workload was done correctly',
      'On-chain treasury, escrow, and reserve-asset infrastructure',
      'Cross-chain access and an open marketplace for compute',
      'Agent-to-agent task execution built on the same network',
    ],
    keyMilestones: 'Key Milestones',
    securityFirst: 'Security First',
    securityFirstDescription: 'Contracts are open-source and publicly verifiable; independent audits are a prerequisite before any bridge or reserve contract handles real funds.',
    communityDriven: 'Community Driven',
    communityDrivenDescription: 'Decentralized governance and community decision making',
    scalableGrowth: 'Scalable Growth',
    scalableGrowthDescription: 'Sustainable growth with innovative features and partnerships',
    developmentProgress: 'Development Progress',
    developmentProgressDescription: 'Status is sourced from the open-source repositories — not projected',
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
        'Open-source node client (gstdcoin/gstdbot) with a one-line installer',
        'Hardware scored into tiers — Spark, Flame, Storm, Titan, Sovereign',
      ],
      [
        'AI inference requests routed to available nodes',
        'On-chain fee settlement live on TON mainnet (SettlementMaster.tact) — 85% node / 10% treasury / 5% buyback & burn',
        '8 inference models shipped in the node client',
      ],
      [
        'Dataset submission and distributed training pipeline live at app.gstdtoken.com/training',
        'Real LoRA adapters trained end-to-end and verified',
        'Base-model coverage is still limited — check Documentation for what is wired up today',
      ],
      [
        'Result submissions are signed (Ed25519) so the network knows who submitted a result',
        'No cryptographic proof of correct computation yet — in design',
        'Node reputation and capability-based routing — in design',
      ],
      [
        'Escrow and ecosystem treasury contracts deployed on TON mainnet',
        'A gold-reserve treasury contract (potential XAUt allocation) is written but not yet deployed or audited',
        'Today’s live treasury holds TON only',
      ],
      [
        'Cross-chain bridge to Solana and XRPL exists as open-source code',
        'No live vault on either chain, unaudited, has never processed a real transfer',
        'Independent audit required before any bridge functionality should be relied upon',
      ],
      [
        'Agent SDK (gstdcoin/A2A) with a working task poll/compute/submit loop and MCP server',
        'Federated learning and a shared knowledge store are proposed designs, not implemented',
        'Open for anyone to build agents on top of the network today',
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
    securityAuditsDescription: 'Smart contracts are reviewed for security before deployment. All contract code is open-source and publicly verifiable.',
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
          body: 'The Platform is open-source, permissionless software that connects node operators (who provide compute resources for AI inference) with users who pay for that compute using GSTD, a utility token on the TON blockchain. The Platform does not operate, own, or control the compute hardware, the TON blockchain, or any third-party exchange. We provide software and infrastructure only; we do not act as a custodian, broker, exchange, or financial intermediary.',
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
          body: 'THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, OR THAT THE PLATFORM WILL BE UNINTERRUPTED, SECURE, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS. Open-source code, including smart contracts and node software, may contain bugs or vulnerabilities despite reasonable review, and we do not warrant otherwise.',
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
          body: 'Because the Platform is decentralized and permissionless, we cannot "terminate" your ability to run open-source node software or hold a self-custodied wallet. We may, however, restrict, suspend, or discontinue any centrally-operated service (such as the website, the Telegram bot, or a particular API endpoint) at any time, for any reason, without liability to you.',
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
          body: 'The Platform relies on open-source smart contracts and software that, despite reasonable review, may contain undiscovered bugs, vulnerabilities, or exploits. A successful exploit, network attack, or software failure could result in the partial or total loss of funds, tokens, or data, with no guarantee of recovery or compensation.',
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
    description: 'GSTD is an open AI compute network. Node operators run node software on their own hardware and earn 85% of every fee paid in GSTD by users requesting AI compute, settled on-chain.',
    summary: '⚡️ GSTD is an open AI compute network: users pay GSTD for AI inference, node operators earn 85% of fees on-chain, 10% funds the treasury, 5% funds buyback & burn. No gold promises. No APY. Earnings come from real compute usage.',
    advantagesTitle: 'Key Advantages',
    advantages: {
      reliability: {
        title: 'Real Earnings from Compute',
        description: 'Node operators earn GSTD for every AI request they process. Earnings scale directly with network usage — the more requests, the more earned.',
      },
      interest: {
        title: 'Low Barrier to Entry',
        description: 'Any hardware can join — Raspberry Pi, laptop, or server. Install Ollama, register your node, start earning. No minimum stake required.',
      },
      transparency: {
        title: 'Web3 Transparency',
        description: 'All operations are on-chain. Node registry, fee distribution, and treasury balance are publicly verifiable.',
      },
      dca: {
        title: 'Treasury & Buyback Loop',
        description: '10% of settled inference fees flow to the ecosystem treasury; a further 5% funds GSTD buyback & burn — tied directly to real network usage, on-chain.',
      },
      antiwhale: {
        title: 'Open Access',
        description: 'No gatekeepers for participation. Any wallet can pay for AI compute. Any device can run node software and serve requests.',
      },
      income: {
        title: 'Node Operator Rewards',
        description: 'Node operators earn 85% of every inference fee routed to their node, settled on-chain. Income is proportional to compute served — not inflationary token emissions.',
      },
      growth: {
        title: 'Utility-Driven Growth',
        description: 'Network value grows with real usage. More AI requests = more fees = more treasury buybacks = stronger GSTD utility.',
      },
    },
    sectionsTitle: 'Documentation & Resources',
    sections: {
      documentation: {
        title: 'Documentation',
        description: 'Comprehensive guides and technical documentation',
        items: [
          'Whitepaper',
          'Technical Docs',
          'API Reference',
          'Security Audit',
        ],
      },
      developers: {
        title: 'For Developers',
        description: 'Resources for developers and integrators',
        items: [
          'SDK & Libraries',
          'Integration Guide',
          'Code Examples',
          'Developer Support',
        ],
      },
      partners: {
        title: 'Partners',
        description: 'Partnership opportunities and programs',
        items: [
          'Partnership Program',
          'Requirements',
          'Benefits',
          'Contact Info',
        ],
      },
    },
    cta: {
      title: 'Join the GSTD Network',
      description: 'Run a node and earn from real AI compute demand — or pay GSTD to access models on the network.',
      badge: 'Get GSTD',
    },
  },

  // Footer
  footer: {
    description: 'Open AI compute network on TON. Pay GSTD for inference. Run a node, earn 85% of fees on-chain.',
    followUs: 'Follow us',
    quickLinks: 'Quick Links',
    contact: 'Contact',
    allRightsReserved: 'All rights reserved',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },

  // Utility Cycle
  utilityCycle: {
    title: 'Protocol Utility',
    subtitle: 'How GSTD flows through the network',
    steps: [
      {
        number: 1,
        title: 'Pay for AI Compute',
        description: 'Users pay GSTD to request AI inference from models like Llama, Mistral, and others running on decentralized nodes.',
        metric: 'Pay per inference',
        icon: 'Coins',
      },
      {
        number: 2,
        title: 'Node Operators Earn',
        description: 'Node operators running node software receive 85% of every fee, settled on-chain. The more requests routed to your node, the more GSTD you earn.',
        metric: '85% of every fee',
        icon: 'CreditCard',
      },
      {
        number: 3,
        title: 'Treasury & Buyback Loop',
        description: '10% of settled inference fees flow to the ecosystem treasury; 5% funds GSTD buyback & burn. This ties protocol revenue directly to real usage.',
        metric: '10% Treasury · 5% Buyback & Burn',
        icon: 'Network',
      },
    ],
    protocolIndicator: 'Utility Protocol • Pay-for-Compute Model',
  },

  // Multichain
  multichain: {
    title: 'Multichain Roadmap',
    subtitle: 'TON is live today. A bridge to Solana and XRPL is early-stage and not yet functional.',
    networks: [
      {
        name: 'TON',
        title: 'Live network',
        description: 'GSTD is deployed and trading on TON today. Node rewards, treasury settlement, and the jetton itself all run here.',
        features: [
          'Jetton deployed, supply fixed',
          'SettlementMaster live on mainnet',
          'Telegram-native wallets',
        ],
        status: 'active',
      },
      {
        name: 'Solana',
        title: 'Bridge in development',
        description: 'A bridge validator exists in source code but has never processed a real transfer — no vault has been deployed on Solana.',
        features: [
          'Watcher/detection logic exists',
          'No live vault',
          'Not audited',
        ],
        status: 'building',
      },
      {
        name: 'XRPL',
        title: 'Bridge in development',
        description: 'Same status as Solana: bridge code exists but is unaudited and has never moved funds on XRPL.',
        features: [
          'Watcher/detection logic exists',
          'No live vault',
          'Not audited',
        ],
        status: 'building',
      },
    ],
    bridge: {
      status: 'In Development — Not Live',
      networks: 'TON ↔ Solana ↔ XRPL',
      time: 'Not yet available',
      title: 'Cross-Chain Bridge',
      unifiedLiquidity: 'Planned: a shared liquidity layer across chains. Do not send funds expecting bridge functionality until this is independently verified as production-ready.',
    },
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
    badge: 'One-line install · open source',
    title: 'Run a Node',
    subtitle: 'One install script sets up the node on Linux, macOS, or Windows (WSL) — installs its own Node.js runtime, registers your device, and starts polling for work.',
    requirements: 'Installer handles Node.js 20+ setup itself · Linux / macOS / Windows WSL · Raspberry Pi 4 and up',
    ctaGithub: 'View on GitHub',
    ctaTelegram: 'Node Operators Chat',
    modes: [
      { title: 'Spark → Flame', desc: 'Entry hardware — Raspberry Pi class devices. Lower hardware multiplier, still earns.', badge: 'Entry' },
      { title: 'Storm → Titan', desc: 'Multi-core desktops and workstations with more RAM/disk.', badge: 'Mid-tier' },
      { title: 'Sovereign', desc: '32-core+ or GPU-equipped machines. Highest hardware multiplier.', badge: 'Top-tier' },
    ],
  },

  featureSection: {
    title: 'Key Features',
    subtitle: 'A permissionless compute network where nodes earn fees for AI inference and model fine-tuning',
  },

  // FAQ Section
  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Answers to key questions about GSTD',
    items: [
      {
        question: 'What is GSTD?',
        answer: 'GSTD is a utility token for paying for AI inference on an open node network. It is NOT an investment product. Earnings come from real compute usage — no staking rewards, no APY promises.',
      },
      {
        question: 'How do node operators earn?',
        answer: 'Node operators run the open-source node software on their hardware, register on the network, and receive 85% of every GSTD fee for requests routed to their node, settled on-chain by the SettlementMaster contract. Earnings scale with usage and are never guaranteed.',
      },
      {
        question: 'How does the treasury work?',
        answer: '10% of settled inference fees accumulate in the ecosystem treasury, and a further 5% is used for GSTD buyback & burn. Treasury allocation follows the protocol’s published rules — see the Treasury page for what it currently holds.',
      },
      {
        question: 'Why is GSTD a utility token?',
        answer: 'GSTD is the payment currency for AI compute on the network — similar to how ETH pays for Ethereum gas. There are no promises of returns, no guaranteed backing per token, and no lending products.',
      },
      {
        question: 'Is the cross-chain bridge live?',
        answer: 'No. TON is the only live network today. Bridge code for Solana and XRPL exists in an open-source repository but is unaudited, has no deployed vault on either chain, and has never processed a real transfer. Do not rely on it for moving funds.',
      },
      {
        question: 'What AI models can I use?',
        answer: 'Inference runs on the models the node software actually ships with — currently Llama 3.3 70B, Llama 3.1 8B, Llama 4 Scout, Qwen3 32B, Kimi K2, GPT-OSS 120B, GPT-OSS 20B, and Mixtral 8x7B. The network routes your request to an available node that has the model loaded; not every model is available on every node.',
      },
      {
        question: 'Is task execution cryptographically guaranteed?',
        answer: 'A deployed on-chain Escrow contract holds task budgets. Result submission is signed (Ed25519) so the network knows who submitted a result. There is currently no cryptographic proof that a computation was performed correctly — we do not claim a "mathematical guarantee," and you should not rely on one.',
      },
      {
        question: 'How does the fine-tuning marketplace work?',
        answer: 'Submit your dataset. A distributed node trains a LoRA adapter on it — the pipeline has produced real, verified adapters end to end. Availability currently depends on which base model is wired up for training; check Documentation for the current list before relying on a specific model.',
      },
      {
        question: 'What hardware do I need to run a node?',
        answer: 'Any device the node software supports: Raspberry Pi 4 and up, laptop, desktop, or server. Hardware is scored into tiers (Spark through Sovereign) based on CPU/RAM/disk/GPU — more capable hardware earns a higher multiplier. There is no single hard minimum beyond what a Raspberry Pi 4 provides.',
      },
    ],
  },

  // Cloud Comparison
  cloudComparison: {
    title: 'A Different Model',
    subtitle: 'Pay for infrastructure time, or pay for AI results',
    description: 'GSTD offers a distributed alternative to centralized cloud AI providers, with payment tied to completed inference rather than reserved capacity.',
    cloud: {
      title: 'Cloud Providers',
      expensive: 'Centralized',
      features: [
        'Pay for reserved usage time',
        'Pricing set by the provider',
        'Centralized infrastructure',
        'No independent execution guarantee',
      ],
      price: 'Provider-set pricing',
    },
    gstd: {
      title: 'GSTD Network',
      features: [
        'Pay only for results',
        'Competitive pricing',
        'Open node network',
        'On-chain escrow for task budgets',
      ],
      price: 'Varies by task and model',
      savings: 'Competitive vs. centralized cloud',
    },
  },

  // Wallet as Node
  walletAsNode: {
    title: 'Your Wallet Is Your Node Identity',
    subtitle: 'One wallet, one node',
    description: 'Node rewards settle directly to your TON wallet via TonConnect. Running node software is still required to actually process work — your wallet is how you get paid, not a substitute for the node.',
    benefits: [
      'TonConnect wallet integration',
      'Rewards settle on-chain',
      'No custodial balance to trust',
      'Earn GSTD per completed workload',
    ],
    flow: {
      title: 'How it works',
      steps: [
        {
          title: 'Install the Node',
          description: 'Run the one-line install script on your hardware (see Run a Node below)',
        },
        {
          title: 'Connect Wallet',
          description: 'Link your TON wallet via TonConnect so rewards have somewhere to go',
        },
        {
          title: 'Process Workloads',
          description: 'Your node polls for available tasks and processes AI inference requests',
        },
        {
          title: 'Earn GSTD',
          description: 'Earn 85% of every inference fee routed to your node, settled on-chain to your wallet.',
        },
      ],
    },
    cta: 'Connect Wallet',
  },

  // Escrow & Treasury
  escrowTreasury: {
    title: 'Escrow & Protocol Treasury',
    subtitle: 'Built from network activity, not token promises',
    escrow: {
      title: 'Escrow: Task Budgets On-Chain',
      description: 'A deployed on-chain Escrow contract holds task budgets and releases them according to protocol rules. This protects against a task simply not running — it is not a cryptographic guarantee that the compute result itself is correct.',
      features: [
        'Deployed, on-chain contract',
        'Budgets held, not pre-paid to a party',
        'Open-source, publicly verifiable',
        'No claim of correctness verification',
      ],
    },
    treasury: {
      title: 'Treasury: Protocol Fund',
      description: 'A portion of protocol fees is allocated to the ecosystem treasury according to the protocol’s published rules — currently 10% of settled fees, with a further 5% used for GSTD buyback & burn.',
      features: [
        '10% of settled fees → Treasury',
        '5% → GSTD buyback & burn',
        'Network development funding',
        'On-chain balance, publicly verifiable',
      ],
    },
    reserveAssets: {
      title: 'Reserve Assets',
      description: 'The treasury may hold digital reserve assets such as XAUt as part of its reserve strategy. This is a treasury allocation choice, not a promise made to GSTD holders.',
      disclaimer: 'Reserve assets are treasury holdings and do not by themselves constitute a redemption right or guarantee of GSTD value. GSTD is not backed by, redeemable for, or pegged to any reserve asset.',
      status: 'A gold-reserve treasury contract has been written but is not yet deployed. The live treasury today holds TON only.',
    },
    nightAudit: {
      title: 'Daily Stats',
      description: 'Public stats on network activity, sourced from the live node registry. All settlement transactions are verifiable on-chain.',
      time: 'Updated continuously when the API is reachable',
    },
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
      { title: 'Distributed', description: 'Compute is supplied by independent operators, not one data center.' },
      { title: 'Incentivized', description: 'Nodes receive GSTD for completed workloads, settled on-chain.' },
    ],
  },

  // Node Economy section
  nodeEconomy: {
    badge: 'Node software · open source',
    title: 'Your Hardware Can Become Part of the Network',
    subtitle: 'Instead of leaving computing resources idle, contribute them to the network.',
    devices: ['Laptop', 'Desktop', 'Gaming PC', 'Workstation', 'Server', 'GPU Server'],
    resources: ['CPU', 'GPU', 'RAM', 'Storage', 'Bandwidth'],
    workflow: [
      'Install the node',
      'Connect your wallet',
      'Node is scored into a hardware tier',
      'Receive workloads',
      'Complete workloads',
      'Earn GSTD',
    ],
    cta: 'Run a Node',
  },

  // Node Requirements
  nodeRequirements: {
    title: 'Node Requirements',
    subtitle: 'Verified against the node software’s own hardware scoring — not invented minimums.',
    basicTitle: 'Basic',
    basic: ['CPU', 'RAM', 'Internet connection', 'Storage'],
    inferenceTitle: 'For AI Inference',
    inference: ['NVIDIA GPU', 'AMD GPU', 'Apple Silicon', 'CPU fallback supported'],
    tiersTitle: 'Hardware Tiers',
    tiersNote: 'The node software scores your hardware into a multiplier tier — higher tiers earn more per completed workload. There is no single hard minimum beyond what a Raspberry Pi 4 provides.',
  },

  // How AI Requests Work
  requestFlow: {
    title: 'How AI Requests Work',
    steps: ['User', 'Request', 'Router', 'Node Selection', 'Compute', 'Verification', 'Result', 'Settlement'],
    description: 'The protocol routes workloads to available nodes. Result submissions are cryptographically signed so the network knows who submitted them. There is currently no cryptographic proof that a computation was performed correctly — that is active, unfinished work, not a shipped guarantee.',
  },

  // Economic Flow diagram
  economicFlow: {
    title: 'Economic Flow',
    subtitle: 'How GSTD moves through the network',
    userLoop: ['Users', 'Pay GSTD', 'AI Compute', 'Node Operators', 'Node Rewards'],
    feeLoop: {
      label: 'Protocol Fee',
      target: 'Treasury',
      allocations: ['Infrastructure', 'Security', 'Development', 'Ecosystem', 'Reserve Assets'],
    },
    split: 'Verified on-chain: 85% node · 10% treasury · 5% buyback & burn',
  },

  // Why This Model
  whyThisModel: {
    title: 'From Speculation to Network Utility',
    traditionalTitle: 'Traditional Token',
    traditional: ['Price', 'Speculation', 'Centralized services'],
    protocolTitle: 'GSTD Protocol',
    protocol: ['Compute', 'AI services', 'Node participation', 'Network fees', 'Treasury', 'Open infrastructure'],
  },

  // Decentralization section
  decentralization: {
    title: 'No Single Computer Is the Network',
    body: 'Network resilience comes from participation by independent operators. This is a design goal the protocol is still building toward — routing, verification, and node diversity are all active work, not a finished guarantee of resilience or independence.',
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
    title: 'Decentralized AI Marketplace',
    subtitle: 'Models the node network actually serves today',
    categories: ['Chat', 'Coding', 'Vision', 'Embeddings', 'Fine-Tuning', 'Agents'],
    inferenceTitle: 'Inference Models',
    inferenceNote: 'Shipped in the open-source node client — availability depends on which nodes have a model loaded.',
    finetuneTitle: 'Fine-Tuning Models',
    finetuneNote: 'Accepted by the training pipeline. Only a subset is confirmed live end-to-end — check Documentation for current status before submitting a job.',
    columns: { model: 'Model', provider: 'Provider / Node', availability: 'Availability' },
  },

  // Fine-tuning explainer
  fineTuning: {
    title: 'Distributed Fine-Tuning',
    steps: [
      'Upload a dataset.',
      'Select a model.',
      'A distributed node performs the training workload.',
      'Receive your trained adapter.',
    ],
    loraTitle: 'What is LoRA?',
    loraExplainer: 'LoRA (Low-Rank Adaptation) trains a small set of additional weights instead of the full model — cheaper to train and easy to swap in and out. QLoRA does the same thing on a quantized (compressed) base model, further reducing hardware requirements.',
    note: 'Result quality and training time depend on your dataset and the base model selected. We do not publish a fixed cost-savings multiplier — see Documentation for what has actually been measured.',
  },

  // Documentation hub
  docs: {
    title: 'Documentation',
    subtitle: 'What the protocol actually does, sourced from the same open-source repositories that run it.',
    sections: [
      { title: 'Overview', description: 'What GSTD is, and what it is not.' },
      { title: 'Architecture', description: 'Node client, backend API, and how they talk to each other.' },
      { title: 'Node', description: 'Installing, configuring, and running node software.' },
      { title: 'Compute', description: 'How workloads are picked up and processed.' },
      { title: 'Inference', description: 'Supported models and how requests are routed.' },
      { title: 'Payments', description: 'How GSTD is paid, held in escrow, and settled.' },
      { title: 'Rewards', description: 'How node operators earn, on-chain.' },
      { title: 'Verification', description: 'What is cryptographically proven today, and what is not yet.' },
      { title: 'Treasury', description: 'What the treasury holds and how it is funded.' },
      { title: 'Token', description: 'GSTD as a utility token — supply, contract, use cases.' },
      { title: 'Security', description: 'What is audited, what is unaudited, and current known risk.' },
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
      { label: 'On-Chain Transactions', description: 'Settlement, treasury, and escrow activity — verifiable on a TON explorer.' },
      { label: 'Network Metrics', description: 'Live node and task data, when the API is reachable.' },
      { label: 'Node Software', description: 'The exact code that runs on every node.' },
      { label: 'Smart Contracts', description: 'SettlementMaster, Escrow, and Treasury — open-source and deployed on TON mainnet.' },
    ],
    disclaimer: 'Nothing on this website constitutes an offer of securities, investment advice, or a guarantee of future value.',
  },
};

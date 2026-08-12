import { Hero } from '@/components/Hero';
import { CoreMessage } from '@/components/CoreMessage';
import { LiveNetworkStatus } from '@/components/LiveNetworkStatus';
import { NodeEconomy } from '@/components/NodeEconomy';
import { NodeInstall } from '@/components/NodeInstall';
import { RequestFlow } from '@/components/RequestFlow';
import { FeatureCards } from '@/components/FeatureCards';
import { EconomicFlow } from '@/components/EconomicFlow';
import { UtilityCycle } from '@/components/UtilityCycle';
import { CloudComparison } from '@/components/CloudComparison';
import { Ecosystem } from '@/components/Ecosystem';
import { WalletAsNode } from '@/components/WalletAsNode';
import { EscrowTreasury } from '@/components/EscrowTreasury';
import { MultichainBridge } from '@/components/MultichainBridge';
import { WhyThisModel } from '@/components/WhyThisModel';
import { Decentralization } from '@/components/Decentralization';
import { OpenSource } from '@/components/OpenSource';
import { TokenCard } from '@/components/TokenCard';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';

export default function HomePage() {
  return (
    <>
        {/* 1. Hero — Open AI Compute Network positioning */}
        <Hero />
        {/* 2. Core message — the network is the infrastructure */}
        <CoreMessage />
        {/* 3. Live Network Status — only real data, honest "unavailable" state */}
        <LiveNetworkStatus />
        {/* 4. Node economy — hardware → tiers → workflow */}
        <NodeEconomy />
        {/* 5. Run a node — real install command */}
        <NodeInstall />
        {/* 6. How AI requests work */}
        <RequestFlow />
        {/* 7. Why it works — 3 pillars */}
        <FeatureCards />
        {/* 8. Economic flow diagram */}
        <EconomicFlow />
        {/* 9. Protocol utility: 3-tier model */}
        <UtilityCycle />
        {/* 10. Cloud comparison */}
        <CloudComparison />
        {/* 11. Ecosystem overview */}
        <Ecosystem />
        {/* 12. Wallet as node identity */}
        <WalletAsNode />
        {/* 13. Escrow & Treasury (incl. Reserve Assets / XAUt disclaimer) */}
        <EscrowTreasury />
        {/* 14. Multichain — honest bridge status */}
        <MultichainBridge />
        {/* 15. Why this model — traditional token vs GSTD protocol */}
        <WhyThisModel />
        {/* 16. Decentralization */}
        <Decentralization />
        {/* 17. Open source — live GitHub repos */}
        <OpenSource />
        {/* 18. Token card with contract */}
        <div className="py-12 md:py-16 container mx-auto px-4 max-w-2xl">
          <TokenCard />
        </div>
        {/* 19. FAQ */}
        <FAQ />
        {/* 20. Final CTA */}
        <CTA />
    </>
  );
}

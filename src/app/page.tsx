import { Hero } from '@/components/Hero';
import { LiveNetworkStatus } from '@/components/LiveNetworkStatus';
import { FeatureCards } from '@/components/FeatureCards';
import { Ecosystem } from '@/components/Ecosystem';
import { NodeInstall } from '@/components/NodeInstall';
import { CloudComparison } from '@/components/CloudComparison';
import { WalletAsNode } from '@/components/WalletAsNode';
import { EscrowTreasury } from '@/components/EscrowTreasury';
import { UtilityCycle } from '@/components/UtilityCycle';
import { MultichainBridge } from '@/components/MultichainBridge';
import { TokenCard } from '@/components/TokenCard';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* 1. Hero — first impression, with Token Overview card */}
        <Hero />
        {/* 2. Live Network Status — only real data, honest phase labeling */}
        <LiveNetworkStatus />
        {/* 3. Why it works — 3 pillars */}
        <FeatureCards />
        {/* 4. Protocol utility: 3-tier model */}
        <UtilityCycle />
        {/* 5. Cloud comparison — cost advantage */}
        <CloudComparison />
        {/* 6. Ecosystem overview */}
        <Ecosystem />
        {/* 7. Node install — one command */}
        <NodeInstall />
        {/* 8. Wallet-as-node */}
        <WalletAsNode />
        {/* 9. Escrow & Treasury */}
        <EscrowTreasury />
        {/* 10. Multichain architecture */}
        <MultichainBridge />
        {/* 11. Token card with contract */}
        <div className="py-12 md:py-16 container mx-auto px-4 max-w-2xl">
          <TokenCard />
        </div>
        {/* 12. FAQ */}
        <FAQ />
        {/* 13. Final CTA */}
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

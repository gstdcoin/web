import { Hero } from '@/components/Hero';
import { UtilityCycle } from '@/components/UtilityCycle';
import { CloudComparison } from '@/components/CloudComparison';
import { WalletAsNode } from '@/components/WalletAsNode';
import { EscrowTreasury } from '@/components/EscrowTreasury';
import { MultichainBridge } from '@/components/MultichainBridge';
import { LiveNetworkStatus } from '@/components/LiveNetworkStatus';
import { FeatureCards } from '@/components/FeatureCards';
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
        <Hero />
        <CloudComparison />
        <WalletAsNode />
        <EscrowTreasury />
        <UtilityCycle />
        <MultichainBridge />
        <LiveNetworkStatus />
        <FeatureCards />
        <TokenCard />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

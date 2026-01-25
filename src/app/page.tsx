import { Hero } from '@/components/Hero';
import { UtilityCycle } from '@/components/UtilityCycle';
import { MultichainBridge } from '@/components/MultichainBridge';
import { LiveNetworkStatus } from '@/components/LiveNetworkStatus';
import { FeatureCards } from '@/components/FeatureCards';
import { TokenCard } from '@/components/TokenCard';
import { CTA } from '@/components/CTA';
import { FAQ } from '@/components/FAQ';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
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

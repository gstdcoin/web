import { Hero } from '@/components/Hero';
import { FeatureCards } from '@/components/FeatureCards';
import { TokenCard } from '@/components/TokenCard';
import Tokenomics from '@/components/sections/Tokenomics';
import { CTA } from '@/components/CTA';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeatureCards />
        <TokenCard />
        <Tokenomics />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

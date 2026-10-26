import { Hero } from '@/components/Hero';
import { LiveNetworkStatus } from '@/components/LiveNetworkStatus';
import { NodeInstall } from '@/components/NodeInstall';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <LiveNetworkStatus />
      <NodeInstall />
      <FAQ />
      <CTA />
    </>
  );
}

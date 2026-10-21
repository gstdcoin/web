import { Hero } from '@/components/Hero';
import { CoreMessage } from '@/components/CoreMessage';
import { LiveNetworkStatus } from '@/components/LiveNetworkStatus';
import { NodeInstall } from '@/components/NodeInstall';
import { RequestFlow } from '@/components/RequestFlow';
import { OpenSource } from '@/components/OpenSource';
import { TokenCard } from '@/components/TokenCard';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CoreMessage />
      <LiveNetworkStatus />
      <NodeInstall />
      <RequestFlow />
      <OpenSource />
      <div className="py-12 md:py-16 container mx-auto px-4 max-w-2xl">
        <TokenCard />
      </div>
      <FAQ />
      <CTA />
    </>
  );
}

import { Hero } from '@/components/Hero';
import { ServiceAvailability } from '@/components/ServiceAvailability';
import { LiveNetworkStatus } from '@/components/LiveNetworkStatus';
import { NodeInstall } from '@/components/NodeInstall';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceAvailability id="services" />
      <LiveNetworkStatus />
      <NodeInstall />
      <FAQ />
      <CTA />
    </>
  );
}

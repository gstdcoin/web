import { AiMarketplace } from '@/components/AiMarketplace';
import { RequestFlow } from '@/components/RequestFlow';
import { FineTuning } from '@/components/FineTuning';
import { LiveChat } from '@/components/LiveChat';

export default function AiPage() {
  return (
    <div className="bg-[#0A0A0A] pt-8">
      <LiveChat />
      <AiMarketplace />
      <RequestFlow />
      <FineTuning />
    </div>
  );
}

import { AiMarketplace } from '@/components/AiMarketplace';
import { RequestFlow } from '@/components/RequestFlow';
import { FineTuning } from '@/components/FineTuning';

export default function AiPage() {
  return (
    <div className="bg-[#0A0A0A] pt-8">
      <AiMarketplace />
      <RequestFlow />
      <FineTuning />
    </div>
  );
}

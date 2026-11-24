import { RequestFlow } from '@/components/RequestFlow';
import { LiveChat } from '@/components/LiveChat';
import { ServiceAvailability } from '@/components/ServiceAvailability';

export default function AiPage() {
  return (
    <div className="bg-[#0A0A0A] pt-8">
      <LiveChat />
      <ServiceAvailability />
      <RequestFlow />
    </div>
  );
}

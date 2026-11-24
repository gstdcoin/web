import type {Metadata} from 'next';
import { LiveChat } from '@/components/LiveChat';
import { ServiceAvailability } from '@/components/ServiceAvailability';

export const metadata: Metadata = {
  title: 'GSTD — AI chat',
  description: 'Ask a question, write an email or plan your day. Try GSTD AI without a wallet or installation.',
};

export default function AiPage() {
  return (
    <div className="bg-[#0A0A0A] pt-8">
      <LiveChat />
      <ServiceAvailability />
    </div>
  );
}

import { DocsHub } from '@/components/DocsHub';
import { RequestFlow } from '@/components/RequestFlow';

export default function DocsPage() {
  return (
    <div className="bg-[#0A0A0A] pt-8">
      <DocsHub />
      <RequestFlow />
    </div>
  );
}

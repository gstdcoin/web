import { NodeHardwareEntry } from '@/components/NodeHardwareEntry';
import { NodeEconomy } from '@/components/NodeEconomy';
import { NodeInstall } from '@/components/NodeInstall';
import { FAQ } from '@/components/FAQ';

export default function NodesPage() {
  return (
    <div className="bg-[#0A0A0A] pt-8">
      <NodeHardwareEntry />
      <NodeEconomy />
      <NodeInstall />
      <FAQ />
    </div>
  );
}

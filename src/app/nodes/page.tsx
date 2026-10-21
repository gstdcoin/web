import { NodeEconomy } from '@/components/NodeEconomy';
import { NodeInstall } from '@/components/NodeInstall';
import { NodeRequirements } from '@/components/NodeRequirements';
import { FAQ } from '@/components/FAQ';

export default function NodesPage() {
  return (
    <div className="bg-[#0A0A0A] pt-8">
      <NodeEconomy />
      <NodeInstall />
      <NodeRequirements />
      <FAQ />
    </div>
  );
}

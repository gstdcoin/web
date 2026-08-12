import { EconomicFlow } from '@/components/EconomicFlow';
import { EscrowTreasury } from '@/components/EscrowTreasury';

export default function TreasuryPage() {
  return (
    <div className="bg-[#0A0A0A] pt-8">
      <EconomicFlow />
      <EscrowTreasury />
    </div>
  );
}

export interface PublicFinance {treasury_gstd:number;reserve_gstd:number;ledger_version:2}
export function publicFinanceView(value:unknown):PublicFinance|null{
 if(!value||typeof value!=='object')return null;
 const data=value as Record<string,unknown>;
 if(data.ledger_version!==2||typeof data.treasury_gstd!=='number'||typeof data.reserve_gstd!=='number'
  ||!Number.isFinite(data.treasury_gstd)||!Number.isFinite(data.reserve_gstd)||data.treasury_gstd<0||data.reserve_gstd<0)return null;
 return {treasury_gstd:data.treasury_gstd,reserve_gstd:data.reserve_gstd,ledger_version:2};
}

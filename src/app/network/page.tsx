import type {Metadata} from 'next';
import {ComputePassport} from '@/components/ComputePassport';
export const metadata:Metadata={title:'GSTD Compute Passport',description:'Live network facts, signed node software and service health. Inspect what is measured before using AI compute.',alternates:{canonical:'/network'}};
export default function NetworkPage(){return <ComputePassport/>;}

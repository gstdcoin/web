import {collectComputePassport} from '@/lib/compute-passport';
import {platformFetch} from '@/lib/platform-fetch';

export async function GET(){
 const cache=(globalThis as unknown as {caches?:{default?:Cache}}).caches?.default;
 const key=new Request('https://gstdtoken.xyz/api/network/passport');
 try{const hit=await cache?.match(key);if(hit)return hit;}catch{/* Cache failures do not replace real diagnostics. */}
 const data=await collectComputePassport(platformFetch);
 const response=Response.json(data,{headers:{'Cache-Control':'public, max-age=30, s-maxage=60'}});
 try{await cache?.put(key,response.clone());}catch{/* The report remains usable without an edge cache. */}
 return response;
}

export interface ModelImport {repository:string;file?:string}
export function parseModelImport(search:string):ModelImport {
 const q=new URLSearchParams(search),repository=q.get('hf_repo')||'',file=q.get('hf_file')||'';
 const part='[A-Za-z0-9](?:[A-Za-z0-9_.-]{0,94}[A-Za-z0-9])?';
 if(q.getAll('hf_repo').length!==1||q.getAll('hf_file').length>1||!new RegExp('^'+part+'/'+part+'$').test(repository)||repository.includes('..'))throw Error('invalid_model');
 if(file&&(!/^[A-Za-z0-9][A-Za-z0-9_.-]*\.gguf$/i.test(file)||file.length>160||file.includes('..')||/mmproj|imatrix|[-.]\d{5}-of-\d{5}/i.test(file)))throw Error('invalid_model');
 return {repository,...(file?{file}:{})};
}
export function nodeImportLink(address:string,model:ModelImport):string {
 const u=new URL(address);
 if(!['http:','https:'].includes(u.protocol)||u.username||u.password||u.search||u.hash||u.pathname!=='/')throw Error('invalid_node');
 const h=u.hostname,parts=h.split('.').map(Number),ipv4=parts.length===4&&parts.every((n,i)=>Number.isInteger(n)&&n>=0&&n<=255&&String(n)===h.split('.')[i]);
 const local=['localhost','127.0.0.1','[::1]'].includes(h)||ipv4&&(parts[0]===10||parts[0]===127||parts[0]===192&&parts[1]===168||parts[0]===172&&parts[1]>=16&&parts[1]<=31||parts[0]===100&&parts[1]>=64&&parts[1]<=127);
 if(u.protocol==='http:'&&!local)throw Error('invalid_node');
 const validated=parseModelImport('?'+new URLSearchParams({hf_repo:model.repository,...(model.file?{hf_file:model.file}:{})}));
 u.searchParams.set('hf_repo',validated.repository);if(validated.file)u.searchParams.set('hf_file',validated.file);return u.toString();
}

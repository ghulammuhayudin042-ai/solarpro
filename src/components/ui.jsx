import {useState,useEffect,useMemo} from 'react';import {X,Search,ChevronUp,ChevronDown,Inbox,Eye,Pencil,Trash2,Plus} from 'lucide-react';import {useApp} from '../store.jsx';
const tone={Paid:'ok',Active:'ok','In Stock':'ok',Completed:'ok',Received:'ok',Approved:'ok',Partial:'warn','Low Stock':'warn',Pending:'warn',Unpaid:'bad','Out of Stock':'bad',Inactive:'bad',Rejected:'bad'};
export const CAT={'Solar Panels':'#f5a524','Inverters':'#1b64b7','Batteries':'#4f8fd6','Solar Accessories':'#8bb5e6','Mounting Structures':'#0d2238','Cables':'#64788c','Protection Equipment':'#b7c9dc','Other Products':'#c98400'};
export const catColor=n=>CAT[n]||'#64748b';
export const CatChip=({c})=><span className="chip" style={{'--c':catColor(c)}}>{c}</span>;
export const Badge=({s})=><span className={'badge '+(tone[s]||'')}>{s}</span>;
export const Modal=({title,onClose,children,wide})=><div className="ov" onClick={onClose}><div className={'modal'+(wide?' wide':'')} onClick={e=>e.stopPropagation()}><div className="mh"><b>{title}</b><button className="ib" onClick={onClose}><X size={18}/></button></div>{children}</div></div>;
export const Kpi=({l,v,sub,i:I,c='var(--pri)'})=><div className="card kpi">{I&&<span className="ic" style={{background:`color-mix(in srgb,${c} 14%,transparent)`,color:c}}><I size={20}/></span>}<div><span>{l}</span><b>{v}</b>{sub&&<small>{sub}</small>}</div></div>;
export const Empty=({t='Nothing here yet. Add your first record to get started.'})=><div className="empty"><Inbox size={28}/><span>{t}</span></div>;
export const Head=({title,sub,children})=><div className="ph"><div><h1>{title}</h1>{sub&&<p>{sub}</p>}</div><div className="row">{children}</div></div>;
export function Form({fields,init,onSubmit,onCancel,label='Save changes'}){
 const [v,setV]=useState(init||{});const [er,setEr]=useState({});
 const go=e=>{e.preventDefault();const x={};fields.forEach(f=>{if(f.req&&!String(v[f.n]??'').trim())x[f.n]=f.l+' is required';if(f.t==='email'&&v[f.n]&&!/^\S+@\S+\.\S+$/.test(v[f.n]))x[f.n]='Enter a valid email'});setEr(x);
  if(Object.keys(x).length)return;const o={...v};fields.forEach(f=>{if(f.t==='number')o[f.n]=Number(o[f.n]||0)});onSubmit(o)};
 const img=(n,f)=>{if(!f)return;const r=new FileReader();r.onload=()=>setV(s=>({...s,[n]:r.result}));r.readAsDataURL(f)};
 return <form onSubmit={go} className="form">{fields.map(f=><label key={f.n} className={f.t==='textarea'||f.t==='file'?'full':''}><span>{f.l}{f.req&&' *'}</span>
  {f.t==='select'?<select value={v[f.n]??''} onChange={e=>setV({...v,[f.n]:e.target.value})}><option value="">Select…</option>{f.o.map(o=><option key={o}>{o}</option>)}</select>
  :f.t==='textarea'?<textarea rows={3} value={v[f.n]??''} onChange={e=>setV({...v,[f.n]:e.target.value})}/>
  :f.t==='file'?<input type="file" accept="image/*" onChange={e=>img(f.n,e.target.files[0])}/>
  :<input type={f.t||'text'} min={f.t==='number'?0:undefined} value={v[f.n]??''} onChange={e=>setV({...v,[f.n]:e.target.value})}/>}
  {er[f.n]&&<em>{er[f.n]}</em>}</label>)}
  <div className="fa full"><button type="button" className="btn ghost" onClick={onCancel}>Cancel</button><button className="btn">{label}</button></div></form>}
export function Table({rows,cols,filters=[],pageSize=8,actions}){
 const [q,setQ]=useState('');const [fl,setFl]=useState({});const [sort,setSort]=useState(null);const [pg,setPg]=useState(0);const [ld,setLd]=useState(true);
 useEffect(()=>{const t=setTimeout(()=>setLd(false),300);return()=>clearTimeout(t)},[]);
 const data=useMemo(()=>{let r=rows.filter(x=>JSON.stringify(Object.values(x)).toLowerCase().includes(q.toLowerCase())&&filters.every(f=>!fl[f.n]||String(x[f.n])===fl[f.n]));
  if(sort)r=[...r].sort((a,b)=>(a[sort.f]>b[sort.f]?1:-1)*sort.d);return r},[rows,q,fl,sort]);
 const pages=Math.ceil(data.length/pageSize)||1,cur=data.slice(pg*pageSize,(pg+1)*pageSize);
 return <div className="card"><div className="tools"><div className="search"><Search size={16}/><input placeholder="Search…" value={q} onChange={e=>{setQ(e.target.value);setPg(0)}}/></div>
  {filters.map(f=><select key={f.n} value={fl[f.n]||''} onChange={e=>{setFl({...fl,[f.n]:e.target.value});setPg(0)}}><option value="">All {f.l}</option>{f.o.map(o=><option key={o}>{o}</option>)}</select>)}</div>
  <div className="tw"><table><thead><tr>{cols.map(c=><th key={c.h} onClick={()=>c.f&&setSort(s=>({f:c.f,d:s?.f===c.f?-s.d:1}))}>{c.h}{sort?.f===c.f&&(sort.d>0?<ChevronUp size={12}/>:<ChevronDown size={12}/>)}</th>)}{actions&&<th>Actions</th>}</tr></thead>
  <tbody>{ld?[...Array(4)].map((_,i)=><tr key={i}><td colSpan={cols.length+1}><div className="sk"/></td></tr>):cur.map(r=><tr key={r.id}>{cols.map(c=><td key={c.h}>{c.r?c.r(r):r[c.f]}</td>)}{actions&&<td><div className="row">{actions(r)}</div></td>}</tr>)}</tbody></table>
  {!ld&&!cur.length&&<Empty t="No records match your search or filters."/>}</div>
  <div className="pager"><span>{data.length} records</span><div className="row"><button className="btn ghost sm" disabled={pg===0} onClick={()=>setPg(pg-1)}>Previous</button><span>{pg+1} / {pages}</span><button className="btn ghost sm" disabled={pg+1>=pages} onClick={()=>setPg(pg+1)}>Next</button></div></div></div>}
export function Crud({k,title,sub,rows,cols,fields,filters,prefix,noAdd,after,addLabel,extraActions,viewFn}){
 const {db,save,del,toast,uid}=useApp();const [m,setM]=useState(null);const list=rows||db[k];
 const submit=v=>{const isNew=!v.id;const it={...v,id:v.id||uid(prefix)};save(k,it);after?.(it,isNew);setM(null);toast(isNew?'Added successfully':'Changes saved')};
 return <><Head title={title} sub={sub}>{!noAdd&&<button className="btn" onClick={()=>setM({t:'form',d:{}})}><Plus size={16}/>{addLabel||'Add new'}</button>}</Head>
  <Table rows={list} cols={cols} filters={filters} actions={r=><>{extraActions?.(r)}<button className="ib" title="View" onClick={()=>setM({t:'view',d:r})}><Eye size={16}/></button><button className="ib" title="Edit" onClick={()=>setM({t:'form',d:r})}><Pencil size={16}/></button><button className="ib red" title="Delete" onClick={()=>setM({t:'del',d:r})}><Trash2 size={16}/></button></>}/>
  {m?.t==='form'&&<Modal title={m.d.id?'Edit record':'Add record'} onClose={()=>setM(null)}><Form fields={fields} init={m.d} onSubmit={submit} onCancel={()=>setM(null)}/></Modal>}
  {m?.t==='view'&&<Modal title="Details" onClose={()=>setM(null)}>{viewFn?viewFn(m.d):<dl className="dl">{Object.entries(m.d).filter(([a,b])=>typeof b!=='object'&&a!=='image').map(([a,b])=><div key={a}><dt>{a.charAt(0).toUpperCase()+a.slice(1)}</dt><dd>{String(b)}</dd></div>)}</dl>}</Modal>}
  {m?.t==='del'&&<Modal title="Delete record?" onClose={()=>setM(null)}><p>This action cannot be undone.</p><div className="fa"><button className="btn ghost" onClick={()=>setM(null)}>Cancel</button><button className="btn danger" onClick={()=>{del(k,m.d.id);setM(null);toast('Deleted','bad')}}>Delete</button></div></Modal>}</>}

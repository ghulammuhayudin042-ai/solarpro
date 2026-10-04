import {createContext,useContext,useEffect,useState} from 'react';import seed from './data';
const C=createContext();export const useApp=()=>useContext(C);
export const today=()=>new Date().toISOString().slice(0,10);
export const ACCENTS={blue:'#1b64b7',teal:'#0f9d8a',violet:'#7c4dff',rose:'#e0457b',emerald:'#14a44d',orange:'#f08a00'};
let CUR='PKR';export const money=n=>CUR+' '+Math.round(Number(n)||0).toLocaleString();
export const invStatus=i=>i.paid>=i.total?'Paid':i.paid>0?'Partial':'Unpaid';
export const stockStatus=p=>p.qty<=0?'Out of Stock':p.qty<=p.min?'Low Stock':'In Stock';
export function AppProvider({children}){
 const [db,setDb]=useState(()=>{try{return JSON.parse(localStorage.getItem('solar_db'))||seed}catch{return seed}});
 const [auth,setAuth]=useState(()=>!!(localStorage.getItem('solar_auth')||sessionStorage.getItem('solar_auth')));
 const [dark,setDark]=useState(()=>localStorage.getItem('solar_dark')==='1');
 const [accent,setAccent]=useState(()=>localStorage.getItem('solar_accent')||'blue');
 const [toasts,setToasts]=useState([]);
 useEffect(()=>localStorage.setItem('solar_db',JSON.stringify(db)),[db]);
 useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light';localStorage.setItem('solar_dark',dark?'1':'0')},[dark]);
 useEffect(()=>{document.documentElement.dataset.accent=accent;localStorage.setItem('solar_accent',accent)},[accent]);
 const toast=(m,t='ok')=>{const id=Math.random();setToasts(x=>[...x,{id,m,t}]);setTimeout(()=>setToasts(x=>x.filter(i=>i.id!==id)),3200)};
 const uid=p=>p+Math.random().toString(36).slice(2,7).toUpperCase();
 const set=(k,v)=>setDb(d=>({...d,[k]:typeof v==='function'?v(d[k]):v}));
 const save=(k,it)=>set(k,l=>l.some(i=>i.id===it.id)?l.map(i=>i.id===it.id?it:i):[it,...l]);
 const del=(k,id)=>set(k,l=>l.filter(i=>i.id!==id));
 const notify=(type,text)=>set('notifications',l=>[{id:uid('N'),type,text,read:false,date:today()},...l]);
 const moveStock=(pid,delta,type,ref)=>setDb(d=>{const p=d.products.find(x=>x.id===pid);if(!p)return d;const next=Math.max(0,p.qty+delta);
  const al=next<=0?['Product out of stock',p.name+' is out of stock']:next<=p.min&&p.qty>p.min?['Low stock',p.name+' is below minimum stock ('+next+' left)']:null;
  return {...d,notifications:al?[{id:uid('N'),type:al[0],text:al[1],read:false,date:today()},...d.notifications]:d.notifications,products:d.products.map(x=>x.id===pid?{...x,qty:next}:x),movements:[{id:uid('M'),product:p.name,type,qty:Math.abs(delta),prev:p.qty,next,ref,date:today()},...d.movements]}});
 const login=(remember)=>{(remember?localStorage:sessionStorage).setItem('solar_auth','1');setAuth(true)};
 const logout=()=>{localStorage.removeItem('solar_auth');sessionStorage.removeItem('solar_auth');setAuth(false)};
 CUR=db.settings.currency||'PKR';
 return <C.Provider value={{accent,setAccent,db,set,save,del,auth,login,logout,dark,setDark,toast,toasts,uid,notify,moveStock}}>{children}</C.Provider>}

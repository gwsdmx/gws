'use client'
import { useState } from 'react'

const PRODUCTS = [
  { name:'Café',     emoji:'☕', price:45  },
  { name:'Sandwich', emoji:'🥪', price:89  },
  { name:'Jugo',     emoji:'🥤', price:55  },
  { name:'Pastel',   emoji:'🍰', price:120 },
]
const INVENTORY = [
  { name:'Laptop Dell XPS',  sku:'LAP-001', qty:12, price:'$18,500', status:'ok'  },
  { name:'Mouse Logitech',   sku:'MOU-034', qty:3,  price:'$1,200',  status:'low' },
  { name:'Teclado Mecánico', sku:'TEC-012', qty:0,  price:'$2,800',  status:'out' },
  { name:'Monitor 27"',      sku:'MON-007', qty:8,  price:'$6,400',  status:'ok'  },
  { name:'Webcam C920',      sku:'WEB-019', qty:1,  price:'$1,800',  status:'low' },
]
const GUESTS = [
  { name:'Ana García',  cat:'VIP',     time:'20:14' },
  { name:'Luis Mendez', cat:'General', time:'20:11' },
  { name:'María López', cat:'VIP',     time:'20:08' },
  { name:'Carlos Vega', cat:'Staff',   time:'19:58' },
]
const QR = [1,1,1,0,1,1,0,1,1,1,0,1,1,0,0,0,1,0,0,1,1,0,1,0,1]
const STATUS_STYLES = {
  ok:  'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  low: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
  out: 'bg-red-500/15 text-red-400 border border-red-500/25',
}
const STATUS_LABEL = { ok:'En stock', low:'Stock bajo', out:'Sin stock' }
const CAT_STYLES = {
  VIP:     'bg-violet-500/15 text-violet-300 border border-violet-500/25',
  General: 'bg-blue-500/15 text-blue-300 border border-blue-500/25',
  Staff:   'bg-orange-500/15 text-orange-300 border border-orange-500/25',
}
const TABS = [
  { id:'pos', label:'POS & Ventas',  emoji:'🛒', dot:'bg-indigo-400', url:'gws.app/pos'         },
  { id:'inv', label:'Inventario',    emoji:'📦', dot:'bg-cyan-400',   url:'gws.app/inventario'  },
  { id:'evt', label:'Eventos',       emoji:'🎫', dot:'bg-violet-400', url:'gws.app/eventos'     },
]

function POSDemo() {
  const [cart, setCart] = useState({})
  const [done, setDone] = useState(false)
  const total = Object.entries(cart).reduce((s,[n,q])=>s+(PRODUCTS.find(p=>p.name===n)?.price||0)*q,0)
  const add = (p) => setCart(c=>({...c,[p.name]:(c[p.name]||0)+1}))
  const pay = () => {
    if(!Object.keys(cart).length) return
    setDone(true); setTimeout(()=>{ setCart({}); setDone(false) },2000)
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-3">Productos</div>
        <div className="grid grid-cols-2 gap-2.5">
          {PRODUCTS.map(p=>(
            <button key={p.name} onClick={()=>add(p)}
              className="bg-white/5 border-2 border-white/10 rounded-2xl p-3.5 text-center hover:bg-indigo-500/20 hover:border-indigo-400/50 active:scale-95 transition-all">
              <div className="text-3xl mb-1.5">{p.emoji}</div>
              <div className="text-white text-xs font-bold">{p.name}</div>
              <div className="text-indigo-300 text-sm font-black mt-0.5">${p.price}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-3">Carrito</div>
        <div className="flex-1 bg-black/20 border border-white/8 rounded-2xl p-4 flex flex-col">
          <div className="flex-1 min-h-[60px]">
            {!Object.keys(cart).length
              ? <p className="text-white/20 text-xs text-center pt-4">Toca un producto</p>
              : Object.entries(cart).map(([n,q])=>{
                  const p=PRODUCTS.find(x=>x.name===n)
                  return(
                    <div key={n} className="flex justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
                      <span className="text-white/70">{p.emoji} {n} ×{q}</span>
                      <span className="text-indigo-300 font-bold">${p.price*q}</span>
                    </div>
                  )
                })
            }
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-white/10 mt-2">
            <span className="text-white/60 text-xs font-semibold">Total</span>
            <span className="font-display font-black text-white text-xl">${total}</span>
          </div>
          <button onClick={pay}
            className={`w-full mt-3 py-2.5 rounded-xl text-xs font-bold text-white transition-all ${done?'bg-gradient-to-r from-emerald-500 to-green-500':'bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 hover:-translate-y-0.5'}`}>
            {done?'✓ Venta registrada':'Cobrar →'}
          </button>
        </div>
      </div>
    </div>
  )
}

function InvDemo() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="font-display font-black text-white text-sm">Inventario General</div>
        <button className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-[10px] font-bold">+ Agregar</button>
      </div>
      <div className="space-y-1">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-3 px-3 py-1.5 text-[9px] font-bold text-white/30 uppercase tracking-widest">
          <div>Producto</div><div className="text-center">Stock</div><div>Precio</div><div>Estado</div>
        </div>
        {INVENTORY.map(r=>(
          <div key={r.sku} className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-3 px-3 py-2.5 rounded-xl bg-white/4 hover:bg-white/8 transition-colors items-center">
            <div><div className="text-white text-xs font-semibold">{r.name}</div><div className="text-white/30 text-[10px] font-mono">{r.sku}</div></div>
            <div className="text-white text-sm font-black text-center">{r.qty}</div>
            <div className="text-indigo-300 text-xs font-bold">{r.price}</div>
            <div><span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${STATUS_STYLES[r.status]}`}>{STATUS_LABEL[r.status]}</span></div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EvtDemo() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="font-display font-black text-white text-sm">Gala Anual 2025</div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/><span className="text-emerald-400 text-[10px] font-bold">En vivo</span></div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[{v:544,l:'Confirmados',bg:'bg-emerald-500/12',bc:'border-emerald-500/20',c:'text-emerald-400'},{v:256,l:'Pendientes',bg:'bg-amber-500/12',bc:'border-amber-500/20',c:'text-amber-400'},{v:800,l:'Total invitados',bg:'bg-indigo-500/12',bc:'border-indigo-500/20',c:'text-indigo-300'}].map(s=>(
          <div key={s.l} className={`rounded-2xl p-3.5 text-center border ${s.bg} ${s.bc}`}>
            <div className={`font-display font-black text-2xl ${s.c}`}>{s.v}</div>
            <div className={`text-[9px] font-bold mt-1 ${s.c} opacity-70`}>{s.l}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <div>
          <div className="w-14 h-14 bg-white rounded-xl p-1.5 grid grid-cols-5 gap-0.5 mb-2">
            {QR.map((v,i)=><div key={i} className={`rounded-[1px] ${v?'bg-slate-900':'bg-white'}`} style={{aspectRatio:'1'}}/>)}
          </div>
          <div className="text-white text-xs font-bold">Walter Torres</div>
          <div className="text-white/40 text-[10px]">Mesa VIP 4</div>
          <div className="flex items-center gap-1.5 mt-2 bg-emerald-500/15 border border-emerald-500/25 px-2.5 py-1 rounded-full">
            <svg width="8" height="8" fill="none" stroke="#4ade80" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            <span className="text-emerald-400 text-[9px] font-bold">Confirmado</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-[9px] font-bold text-white/25 uppercase tracking-widest mb-2.5">Últimos accesos</div>
          {GUESTS.map(g=>(
            <div key={g.name} className="flex items-center gap-2 py-2 border-b border-white/5 last:border-0">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"/>
              <span className="flex-1 text-white text-xs font-semibold">{g.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${CAT_STYLES[g.cat]}`}>{g.cat}</span>
              <span className="text-white/25 text-[10px]">{g.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SCREENS = { pos:<POSDemo/>, inv:<InvDemo/>, evt:<EvtDemo/> }

export default function DemoInteractiva() {
  const [active, setActive] = useState('pos')
  const cur = TABS.find(t=>t.id===active)
  return (
    <section id="demo" className="py-20 sm:py-24 px-5 sm:px-8 relative overflow-hidden" style={{background:'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)'}}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10" style={{background:'radial-gradient(circle,#6366f1,transparent)'}}/>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-8" style={{background:'radial-gradient(circle,#06b6d4,transparent)'}}/>
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-bold tracking-widest uppercase" style={{background:'rgba(99,102,241,0.2)',border:'1px solid rgba(99,102,241,0.4)',color:'#a5b4fc'}}>
            ✦ Demo interactiva — pruébalo ahora
          </div>
          <h2 className="font-display font-black text-white mb-3 tracking-tight" style={{fontSize:'clamp(28px,4vw,44px)'}}>Explora los sistemas en vivo</h2>
          <p className="text-white/40 text-base max-w-md mx-auto">Sin registro. Sin esperas. Así se ven por dentro.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 mb-6">
          {TABS.map(tab=>(
            <button key={tab.id} onClick={()=>setActive(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border-2 ${active===tab.id?'bg-white/12 border-white/30 text-white':'border-white/8 bg-white/3 text-white/40 hover:text-white/70 hover:border-white/15'}`}>
              <span className={`w-2 h-2 rounded-full ${tab.dot}`}/>
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden" style={{border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.04)',backdropFilter:'blur(20px)'}}>
          <div className="flex items-center gap-2 px-4 py-3" style={{background:'rgba(0,0,0,0.2)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
            <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{background:'rgba(248,113,113,.5)'}}/><div className="w-2.5 h-2.5 rounded-full" style={{background:'rgba(251,191,36,.5)'}}/><div className="w-2.5 h-2.5 rounded-full" style={{background:'rgba(74,222,128,.5)'}}/>  </div>
            <div className="flex-1 text-center text-[10px] font-mono px-3 py-1 rounded" style={{background:'rgba(0,0,0,0.2)',color:'rgba(255,255,255,0.3)',border:'1px solid rgba(255,255,255,0.06)'}}>{cur?.url}</div>
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/><span className="text-[9px] text-emerald-400 font-semibold">En vivo</span></div>
          </div>
          <div className="p-5">{SCREENS[active]}</div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/30 text-sm mb-4">¿Quieres ver una demo personalizada para tu negocio?</p>
          <a href="#contacto" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-1" style={{background:'linear-gradient(135deg,#6366f1,#3b82f6)',boxShadow:'0 8px 24px rgba(99,102,241,0.4)'}}>
            Solicitar demo personalizada →
          </a>
        </div>
      </div>
    </section>
  )
}

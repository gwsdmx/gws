'use client'
import { useState } from 'react'

const PRODUCTS = [
  { name:'Café',     emoji:'☕', price:45  },
  { name:'Sandwich', emoji:'🥪', price:89  },
  { name:'Jugo',     emoji:'🥤', price:55  },
  { name:'Pastel',   emoji:'🍰', price:120 },
]

const INITIAL_INV = [
  { name:'Laptop Dell XPS',  sku:'LAP-001', qty:12, price:'$18,500', status:'ok'  },
  { name:'Mouse Logitech',   sku:'MOU-034', qty:3,  price:'$1,200',  status:'low' },
  { name:'Teclado Mecánico', sku:'TEC-012', qty:0,  price:'$2,800',  status:'out' },
  { name:'Monitor 27"',      sku:'MON-007', qty:8,  price:'$6,400',  status:'ok'  },
  { name:'Webcam C920',      sku:'WEB-019', qty:1,  price:'$1,800',  status:'low' },
]

const INITIAL_GUESTS = [
  { name:'Ana García',  cat:'VIP',     time:'20:14', checked:true  },
  { name:'Luis Mendez', cat:'General', time:'20:11', checked:true  },
  { name:'María López', cat:'VIP',     time:'20:08', checked:true  },
  { name:'Carlos Vega', cat:'Staff',   time:'19:58', checked:false },
]

const QR = [1,1,1,0,1,1,0,1,1,1,0,1,1,0,0,0,1,0,0,1,1,0,1,0,1]

const STATUS_STYLE = {
  ok:  'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  low: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
  out: 'bg-red-500/15 text-red-400 border border-red-500/25',
}
const STATUS_LABEL = { ok:'En stock', low:'Stock bajo', out:'Sin stock' }
const CAT_STYLE = {
  VIP:     'bg-violet-500/15 text-violet-300 border border-violet-500/25',
  General: 'bg-blue-500/15 text-blue-300 border border-blue-500/25',
  Staff:   'bg-amber-500/15 text-amber-300 border border-amber-500/25',
}

const TABS = [
  { id:'pos', label:'POS & Ventas',  emoji:'🛒', dot:'bg-indigo-400', url:'gws.app/pos'        },
  { id:'inv', label:'Inventario',    emoji:'📦', dot:'bg-cyan-400',   url:'gws.app/inventario' },
  { id:'evt', label:'Eventos',       emoji:'🎫', dot:'bg-violet-400', url:'gws.app/eventos'    },
]

/* ── POS ── */
function POSDemo() {
  const [cart, setCart] = useState({})
  const [done, setDone] = useState(false)
  const total = Object.entries(cart).reduce((s,[n,q])=>s+(PRODUCTS.find(p=>p.name===n)?.price||0)*q,0)
  const add = (p) => setCart(c=>({...c,[p.name]:(c[p.name]||0)+1}))
  const pay = () => {
    if(!Object.keys(cart).length) return
    setDone(true); setTimeout(()=>{ setCart({}); setDone(false) }, 2200)
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-3">Productos</div>
        <div className="grid grid-cols-2 gap-2">
          {PRODUCTS.map(p=>(
            <button key={p.name} onClick={()=>add(p)}
              className="bg-white/5 border-2 border-white/8 rounded-2xl p-3.5 text-center hover:bg-indigo-500/20 hover:border-indigo-400/50 active:scale-95 transition-all">
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
            <span className="text-white/50 text-xs font-semibold">Total</span>
            <span className="font-display font-black text-white text-xl">${total}</span>
          </div>
          <button onClick={pay}
            className={`w-full mt-3 py-2.5 rounded-xl text-xs font-bold text-white transition-all ${done?'bg-gradient-to-r from-emerald-500 to-green-500':'bg-gradient-to-r from-indigo-500 to-violet-500 hover:opacity-90 hover:-translate-y-0.5'}`}>
            {done?'✓ Cobro registrado':'Cobrar →'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── INVENTARIO — interactivo ── */
function InvDemo() {
  const [items, setItems] = useState(INITIAL_INV)
  const [adding, setAdding] = useState(false)
  const [newItem, setNewItem] = useState({ name:'', qty:'', price:'' })
  const [editing, setEditing] = useState(null) // index

  const bump = (i, delta) => {
    setItems(prev => prev.map((item, idx) => {
      if (idx !== i) return item
      const qty = Math.max(0, item.qty + delta)
      const status = qty === 0 ? 'out' : qty <= 3 ? 'low' : 'ok'
      return { ...item, qty, status }
    }))
  }

  const addItem = () => {
    if (!newItem.name.trim()) return
    const qty = parseInt(newItem.qty) || 0
    setItems(prev => [...prev, {
      name: newItem.name,
      sku: 'NEW-' + String(Date.now()).slice(-3),
      qty,
      price: newItem.price ? `$${newItem.price}` : '$0',
      status: qty === 0 ? 'out' : qty <= 3 ? 'low' : 'ok',
    }])
    setNewItem({ name:'', qty:'', price:'' })
    setAdding(false)
  }

  const remove = (i) => setItems(prev => prev.filter((_,idx)=>idx!==i))

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-white text-sm font-black">Inventario General</div>
        <button onClick={()=>setAdding(true)}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[11px] font-bold hover:-translate-y-0.5 transition-all">
          + Agregar
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="mb-4 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex flex-wrap gap-2 items-center">
          <input autoFocus value={newItem.name} onChange={e=>setNewItem(p=>({...p,name:e.target.value}))}
            placeholder="Nombre del producto" className="flex-1 min-w-[120px] bg-white/10 border border-white/15 rounded-lg px-3 py-1.5 text-white text-xs placeholder-white/30 outline-none focus:border-indigo-400"/>
          <input value={newItem.qty} onChange={e=>setNewItem(p=>({...p,qty:e.target.value}))}
            placeholder="Cant." type="number" className="w-16 bg-white/10 border border-white/15 rounded-lg px-3 py-1.5 text-white text-xs placeholder-white/30 outline-none focus:border-indigo-400"/>
          <input value={newItem.price} onChange={e=>setNewItem(p=>({...p,price:e.target.value}))}
            placeholder="Precio" className="w-24 bg-white/10 border border-white/15 rounded-lg px-3 py-1.5 text-white text-xs placeholder-white/30 outline-none focus:border-indigo-400"/>
          <button onClick={addItem} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white text-xs font-bold transition-colors">✓ Guardar</button>
          <button onClick={()=>setAdding(false)} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs transition-colors">✕</button>
        </div>
      )}

      <div>
        <div className="grid grid-cols-[2fr_80px_1fr_90px_32px] gap-2 px-2 py-1.5 text-[9px] font-bold text-white/25 uppercase tracking-widest">
          <div>Producto</div><div className="text-center">Stock</div><div>Precio</div><div>Estado</div><div></div>
        </div>
        <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
          {items.map((r,i)=>(
            <div key={i} className="grid grid-cols-[2fr_80px_1fr_90px_32px] gap-2 px-2 py-2.5 rounded-xl bg-white/4 hover:bg-white/7 transition-colors items-center group">
              <div>
                <div className="text-white text-xs font-semibold">{r.name}</div>
                <div className="text-white/30 text-[10px] font-mono">{r.sku}</div>
              </div>
              <div className="flex items-center justify-center gap-1">
                <button onClick={()=>bump(i,-1)} className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors leading-none">−</button>
                <span className="text-white text-sm font-black w-5 text-center">{r.qty}</span>
                <button onClick={()=>bump(i,1)} className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors leading-none">+</button>
              </div>
              <div className="text-indigo-300 text-xs font-semibold">{r.price}</div>
              <div><span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${STATUS_STYLE[r.status]}`}>{STATUS_LABEL[r.status]}</span></div>
              <button onClick={()=>remove(i)} className="w-6 h-6 rounded-lg bg-white/0 hover:bg-red-500/20 text-white/20 hover:text-red-400 text-xs transition-all opacity-0 group-hover:opacity-100">✕</button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-2 text-[10px] text-white/30">
        <span>💡 Toca +/− para cambiar stock</span>
        <span>·</span>
        <span>Clic en + Agregar para crear uno nuevo</span>
      </div>
    </div>
  )
}

/* ── EVENTOS — interactivo ── */
function EvtDemo() {
  const [guests, setGuests] = useState(INITIAL_GUESTS)
  const [newName, setNewName] = useState('')
  const [newCat,  setNewCat]  = useState('General')
  const [adding, setAdding]   = useState(false)

  const toggle = (i) => setGuests(prev=>prev.map((g,idx)=>idx===i?{...g,checked:!g.checked}:g))
  const remove = (i) => setGuests(prev=>prev.filter((_,idx)=>idx!==i))
  const addGuest = () => {
    if (!newName.trim()) return
    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`
    setGuests(prev=>[{name:newName,cat:newCat,time,checked:false},...prev])
    setNewName(''); setAdding(false)
  }

  const confirmed = guests.filter(g=>g.checked).length
  const total     = guests.length

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-white text-sm font-black">Gala Anual 2025</div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
            <span className="text-emerald-400 text-[10px] font-bold">En vivo</span>
          </div>
          <button onClick={()=>setAdding(v=>!v)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white text-[11px] font-bold hover:-translate-y-0.5 transition-all">
            + Invitado
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[{v:confirmed,l:'Confirmados',bg:'bg-emerald-500/12',bc:'border-emerald-500/20',c:'text-emerald-400'},
          {v:total-confirmed,l:'Pendientes',bg:'bg-amber-500/12',bc:'border-amber-500/20',c:'text-amber-400'},
          {v:total,l:'Total',bg:'bg-indigo-500/12',bc:'border-indigo-500/20',c:'text-indigo-300'}].map(s=>(
          <div key={s.l} className={`rounded-2xl p-3 text-center border ${s.bg} ${s.bc}`}>
            <div className={`font-display font-black text-2xl ${s.c}`}>{s.v}</div>
            <div className={`text-[9px] font-bold mt-1 ${s.c} opacity-70`}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Add guest form */}
      {adding && (
        <div className="mb-3 p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl flex flex-wrap gap-2 items-center">
          <input autoFocus value={newName} onChange={e=>setNewName(e.target.value)}
            placeholder="Nombre del invitado" className="flex-1 min-w-[140px] bg-white/10 border border-white/15 rounded-lg px-3 py-1.5 text-white text-xs placeholder-white/30 outline-none focus:border-violet-400"/>
          <select value={newCat} onChange={e=>setNewCat(e.target.value)}
            className="bg-white/10 border border-white/15 rounded-lg px-2 py-1.5 text-white text-xs outline-none focus:border-violet-400">
            <option value="VIP">VIP</option>
            <option value="General">General</option>
            <option value="Staff">Staff</option>
          </select>
          <button onClick={addGuest} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white text-xs font-bold transition-colors">✓</button>
          <button onClick={()=>setAdding(false)} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs transition-colors">✕</button>
        </div>
      )}

      {/* Guest list */}
      <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
        {guests.map((g,i)=>(
          <div key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/4 hover:bg-white/7 transition-colors group cursor-pointer" onClick={()=>toggle(i)}>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${g.checked?'bg-emerald-500 border-emerald-500':'border-white/20'}`}>
              {g.checked && <svg width="8" height="8" fill="none" stroke="#fff" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
            <div className="flex-1">
              <div className={`text-xs font-semibold transition-colors ${g.checked?'text-white':'text-white/60'}`}>{g.name}</div>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${CAT_STYLE[g.cat]}`}>{g.cat}</span>
            <span className="text-white/25 text-[10px]">{g.time}</span>
            <button onClick={e=>{e.stopPropagation();remove(i)}}
              className="w-5 h-5 rounded bg-white/0 hover:bg-red-500/20 text-white/0 hover:text-red-400 text-xs transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center">✕</button>
          </div>
        ))}
      </div>
      <div className="mt-3 text-[10px] text-white/30">
        💡 Toca un invitado para marcar/desmarcar · + Invitado para agregar
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
      <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 60% 50% at 15% 50%,rgba(124,58,237,.15),transparent 55%),radial-gradient(ellipse 40% 40% at 85% 50%,rgba(6,182,212,.08),transparent 55%)'}}/>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-bold tracking-widest uppercase" style={{background:'rgba(99,102,241,.2)',border:'1px solid rgba(99,102,241,.4)',color:'#a5b4fc'}}>
            ✦ Demo interactiva — Pruébalo ahora
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

        <div className="rounded-2xl overflow-hidden" style={{border:'1px solid rgba(255,255,255,.1)',background:'rgba(255,255,255,.04)',backdropFilter:'blur(20px)'}}>
          <div className="flex items-center gap-2 px-4 py-3" style={{background:'rgba(0,0,0,.2)',borderBottom:'1px solid rgba(255,255,255,.06)'}}>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{background:'rgba(248,113,113,.5)'}}/>
              <div className="w-2.5 h-2.5 rounded-full" style={{background:'rgba(251,191,36,.5)'}}/>
              <div className="w-2.5 h-2.5 rounded-full" style={{background:'rgba(74,222,128,.5)'}}/>
            </div>
            <div className="flex-1 text-center text-[10px] font-mono px-3 py-1 rounded" style={{background:'rgba(0,0,0,.2)',color:'rgba(255,255,255,.3)',border:'1px solid rgba(255,255,255,.06)'}}>{cur?.url}</div>
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/><span className="text-[9px] text-emerald-400 font-semibold">En vivo</span></div>
          </div>
          <div className="p-5">{SCREENS[active]}</div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/30 text-sm mb-4">¿Quieres ver una demo personalizada para tu negocio?</p>
          <a href="#contacto" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-1" style={{background:'linear-gradient(135deg,#7c3aed,#4f46e5)',boxShadow:'0 8px 24px rgba(124,58,237,.4)'}}>
            Solicitar demo personalizada →
          </a>
        </div>
      </div>
    </section>
  )
}

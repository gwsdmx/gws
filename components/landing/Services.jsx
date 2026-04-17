'use client'
const SVCS = [
  { icon:'🖥️', title:'POS & Inventario',     desc:'Punto de venta, stock en tiempo real y reportes para tiendas y cadenas.',     bg:'bg-gradient-to-br from-blue-50 to-indigo-50',   border:'border-blue-200',   ico:'bg-gradient-to-br from-blue-500 to-indigo-600',   t:'text-blue-900',   d:'text-blue-600'   },
  { icon:'🩺', title:'Sistemas Médicos',       desc:'Expediente digital, citas, historial y facturación para clínicas.',            bg:'bg-gradient-to-br from-teal-50 to-cyan-50',     border:'border-teal-200',   ico:'bg-gradient-to-br from-teal-500 to-cyan-600',     t:'text-teal-900',   d:'text-teal-600'   },
  { icon:'🎫', title:'Eventos & Check-in',     desc:'QR únicos, control de acceso y estadísticas en vivo para cualquier evento.',   bg:'bg-gradient-to-br from-violet-50 to-purple-50', border:'border-violet-200', ico:'bg-gradient-to-br from-violet-500 to-purple-600', t:'text-violet-900', d:'text-violet-600' },
  { icon:'🔧', title:'Talleres & Servicios',   desc:'Órdenes de servicio, refacciones e historial por vehículo o equipo.',          bg:'bg-gradient-to-br from-orange-50 to-amber-50',  border:'border-orange-200', ico:'bg-gradient-to-br from-orange-500 to-amber-500',  t:'text-orange-900', d:'text-orange-600' },
  { icon:'🛒', title:'E-Commerce',             desc:'Tiendas en línea integradas con inventario y múltiples pasarelas de pago.',     bg:'bg-gradient-to-br from-emerald-50 to-green-50', border:'border-emerald-200',ico:'bg-gradient-to-br from-emerald-500 to-green-600', t:'text-emerald-900',d:'text-emerald-600'},
  { icon:'🏛️', title:'Gobierno & Empresas',   desc:'Flujos de aprobación, auditoría y control de acceso por rol.',                  bg:'bg-gradient-to-br from-slate-50 to-zinc-50',    border:'border-slate-200',  ico:'bg-gradient-to-br from-slate-600 to-zinc-700',    t:'text-slate-900',  d:'text-slate-500'  },
]
export default function Services() {
  return (
    <section id="servicios" className="py-20 sm:py-24 px-5 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-widest uppercase mb-4">Servicios</span>
          <h2 className="font-display font-black text-slate-900 mb-3 tracking-tight" style={{fontSize:'clamp(28px,4vw,44px)'}}>Una solución para cada industria</h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">Construimos exactamente lo que necesitas, sin importar el sector.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SVCS.map((s,i)=>(
            <div key={s.title} className={`group rounded-2xl border-2 ${s.border} ${s.bg} p-7 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer animate-fade-up opacity-0`}
              style={{animationDelay:`${i*70}ms`,animationFillMode:'forwards'}}>
              <div className={`w-14 h-14 rounded-2xl ${s.ico} flex items-center justify-center text-2xl mb-5 shadow-lg`}>{s.icon}</div>
              <h3 className={`font-display font-black text-base mb-2 ${s.t}`}>{s.title}</h3>
              <p className={`text-sm leading-relaxed ${s.d}`}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

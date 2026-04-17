'use client'
const SERVICES = [
  { icon:'🖥️', title:'POS & Inventario',       desc:'Punto de venta, control de stock y reportes en tiempo real para tiendas y distribuidoras.',          gradient:'from-blue-500 to-blue-600',   bg:'bg-blue-50',   border:'border-blue-100'   },
  { icon:'🩺', title:'Sistemas Médicos',         desc:'Expediente clínico digital, agenda de citas e historial de pacientes para clínicas.',                gradient:'from-cyan-500 to-teal-600',   bg:'bg-cyan-50',   border:'border-cyan-100'   },
  { icon:'⚡', title:'Automatización',            desc:'Elimina procesos manuales con flujos inteligentes. Más eficiencia, menos errores humanos.',           gradient:'from-amber-500 to-orange-500',bg:'bg-amber-50',  border:'border-amber-100'  },
  { icon:'🛒', title:'E-Commerce & Retail',       desc:'Tiendas en línea integradas con tu inventario, pagos y gestión completa de pedidos.',                gradient:'from-green-500 to-emerald-600',bg:'bg-green-50', border:'border-green-100'  },
  { icon:'🎫', title:'Eventos & Check-in',        desc:'Invitaciones QR únicas, control de acceso y estadísticas en vivo para cualquier evento.',            gradient:'from-violet-500 to-purple-600',bg:'bg-violet-50',border:'border-violet-100' },
  { icon:'🏛️', title:'Gobierno & Empresas',       desc:'Flujos de aprobación, auditoría y control de acceso por rol para instituciones.',                    gradient:'from-slate-600 to-slate-700', bg:'bg-slate-50',  border:'border-slate-200'  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-20 sm:py-24 px-5 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Servicios</span>
          <h2 className="font-display font-bold text-slate-900 mb-3" style={{fontSize:'clamp(26px,3.5vw,42px)'}}>Una solución para cada industria</h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">No importa el tamaño ni el sector. Construimos exactamente lo que necesitas.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <div key={s.title} className={`group rounded-2xl border ${s.border} ${s.bg} p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-up opacity-0`}
              style={{animationDelay:`${i*70}ms`,animationFillMode:'forwards'}}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-2xl mb-4 shadow-lg`}>{s.icon}</div>
              <h3 className="font-display font-bold text-slate-900 text-base mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

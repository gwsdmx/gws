'use client'
const SERVICES = [
  { icon:'🖥️', title:'Desarrollo a Medida',     desc:'Sistemas construidos desde cero para tu flujo real. Sin plantillas ni soluciones genéricas.', color:'blue'   },
  { icon:'🏢', title:'Sistemas Empresariales',   desc:'ERP, CRM, control de inventario y flujos de aprobación para empresas de cualquier tamaño.',   color:'violet' },
  { icon:'⚡', title:'Automatización',            desc:'Elimina procesos manuales con flujos inteligentes. Más eficiencia, menos errores.',             color:'orange' },
  { icon:'🩺', title:'Sector Médico',             desc:'Expediente clínico digital, agenda de citas, historial y facturación integrada.',               color:'cyan'   },
  { icon:'🛒', title:'E-Commerce & Retail',       desc:'Tiendas en línea integradas con tu inventario, pasarelas de pago y gestión de pedidos.',        color:'green'  },
  { icon:'🏛️', title:'Gobierno & Instituciones',  desc:'Plataformas seguras para flujos de trabajo institucionales, auditoría y control de acceso.',    color:'slate'  },
]
const COLORS = {
  blue:   { bg:'bg-blue-50',   border:'border-blue-100',   icon:'bg-blue-100',   tag:'text-blue-600'   },
  violet: { bg:'bg-violet-50', border:'border-violet-100', icon:'bg-violet-100', tag:'text-violet-600' },
  orange: { bg:'bg-orange-50', border:'border-orange-100', icon:'bg-orange-100', tag:'text-orange-600' },
  cyan:   { bg:'bg-cyan-50',   border:'border-cyan-100',   icon:'bg-cyan-100',   tag:'text-cyan-600'   },
  green:  { bg:'bg-green-50',  border:'border-green-100',  icon:'bg-green-100',  tag:'text-green-600'  },
  slate:  { bg:'bg-slate-50',  border:'border-slate-200',  icon:'bg-slate-200',  tag:'text-slate-600'  },
}

export default function Services() {
  return (
    <section id="servicios" className="py-20 sm:py-24 px-5 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Servicios</span>
          <h2 className="font-display font-bold text-slate-900 mb-3" style={{fontSize:'clamp(26px,3.5vw,40px)'}}>Una solución para cada industria</h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">No importa el tamaño ni el sector. Construimos exactamente lo que necesitas.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => {
            const c = COLORS[s.color]
            return (
              <div key={s.title} className={`group rounded-2xl border ${c.border} ${c.bg} p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer animate-fade-up opacity-0`}
                style={{animationDelay:`${i*70}ms`, animationFillMode:'forwards'}}>
                <div className={`w-12 h-12 rounded-xl ${c.icon} flex items-center justify-center text-2xl mb-4`}>{s.icon}</div>
                <h3 className="font-display font-bold text-slate-900 text-base mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

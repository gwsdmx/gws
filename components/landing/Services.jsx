'use client'
const SVCS = [
  {
    icon:'🖥️', title:'Sistema POS e Inventario',
    tagline:'Para tiendas, cafeterías y negocios con productos físicos',
    desc:'Cobra rápido, controla tu stock en tiempo real y genera reportes de ventas sin enredarte en hojas de cálculo.',
    includes:['Caja registradora digital','Control de inventario','Reportes de ventas','Multi-sucursal'],
    bg:'bg-gradient-to-br from-blue-50 to-indigo-50', border:'border-blue-200', ico:'bg-gradient-to-br from-blue-500 to-indigo-600', t:'text-blue-900', d:'text-blue-600', tag:'bg-blue-100 text-blue-700',
  },
  {
    icon:'🩺', title:'Sistema para Clínicas',
    tagline:'Para médicos, consultorios y clínicas',
    desc:'Gestiona expedientes digitales, agenda citas en línea y olvídate del papeleo. Todo organizado y seguro.',
    includes:['Expediente clínico digital','Agenda de citas','Historial de pacientes','Facturación'],
    bg:'bg-gradient-to-br from-teal-50 to-cyan-50', border:'border-teal-200', ico:'bg-gradient-to-br from-teal-500 to-cyan-600', t:'text-teal-900', d:'text-teal-600', tag:'bg-teal-100 text-teal-700',
  },
  {
    icon:'🎫', title:'Control de Eventos',
    tagline:'Para organizadores de eventos y conciertos',
    desc:'Invitaciones con QR únicos por asistente, registro de entrada en segundos y estadísticas en tiempo real.',
    includes:['QR por invitado','Check-in en segundos','Listas VIP y Staff','Estadísticas en vivo'],
    bg:'bg-gradient-to-br from-violet-50 to-purple-50', border:'border-violet-200', ico:'bg-gradient-to-br from-violet-500 to-purple-600', t:'text-violet-900', d:'text-violet-600', tag:'bg-violet-100 text-violet-700',
  },
  {
    icon:'🔧', title:'App para Talleres',
    tagline:'Para talleres mecánicos y de servicios',
    desc:'Ordena servicios, lleva el historial de cada vehículo y controla el inventario de refacciones sin perder nada.',
    includes:['Órdenes de servicio','Historial por vehículo','Control de refacciones','Facturación'],
    bg:'bg-gradient-to-br from-orange-50 to-amber-50', border:'border-orange-200', ico:'bg-gradient-to-br from-orange-500 to-amber-500', t:'text-orange-900', d:'text-orange-600', tag:'bg-orange-100 text-orange-700',
  },
  {
    icon:'🛒', title:'Tienda en Línea',
    tagline:'Para negocios que quieren vender por internet',
    desc:'Tu propia tienda en línea conectada a tu inventario real, con pagos seguros y gestión completa de pedidos.',
    includes:['Catálogo de productos','Pagos en línea','Gestión de pedidos','Panel de vendedor'],
    bg:'bg-gradient-to-br from-emerald-50 to-green-50', border:'border-emerald-200', ico:'bg-gradient-to-br from-emerald-500 to-green-600', t:'text-emerald-900', d:'text-emerald-600', tag:'bg-emerald-100 text-emerald-700',
  },
  {
    icon:'🏢', title:'Sistema Empresarial / Gobierno',
    tagline:'Para empresas medianas y grandes',
    desc:'Flujos de aprobación, control de acceso por roles, auditoría y reportes para equipos de cualquier tamaño.',
    includes:['Flujos de aprobación','Roles y permisos','Auditoría completa','Reportes gerenciales'],
    bg:'bg-gradient-to-br from-slate-50 to-zinc-50', border:'border-slate-200', ico:'bg-gradient-to-br from-slate-600 to-zinc-700', t:'text-slate-900', d:'text-slate-500', tag:'bg-slate-100 text-slate-600',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-20 sm:py-24 px-5 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-black tracking-widest uppercase mb-4">¿Para quién es?</span>
          <h2 className="font-display font-black text-slate-900 mb-3 tracking-tight" style={{fontSize:'clamp(28px,4vw,44px)'}}>
            Tenemos un sistema para tu tipo de negocio
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
            No importa si eres pequeño o grande, si tienes tienda física o en línea, si atiendes pacientes o asistentes. <strong className="text-slate-700">Hacemos el sistema exacto que necesitas.</strong>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SVCS.map((s,i)=>(
            <div key={s.title} className={`group rounded-2xl border-2 ${s.border} ${s.bg} p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer animate-fade-up opacity-0`}
              style={{animationDelay:`${i*70}ms`,animationFillMode:'forwards'}}>
              <div className={`w-14 h-14 rounded-2xl ${s.ico} flex items-center justify-center text-2xl mb-4 shadow-lg`}>{s.icon}</div>
              <h3 className={`font-display font-black text-base mb-1 ${s.t}`}>{s.title}</h3>
              <p className={`text-xs font-bold mb-3 ${s.d} opacity-70`}>{s.tagline}</p>
              <p className={`text-sm leading-relaxed mb-4 ${s.d}`}>{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.includes.map(inc => (
                  <span key={inc} className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${s.tag}`}>✓ {inc}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm mb-4">¿Tu negocio no está en la lista? No importa — lo construimos igualmente.</p>
          <a href="#contacto" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black text-sm hover:-translate-y-0.5 transition-all shadow-lg shadow-violet-500/25">
            Cuéntanos tu caso →
          </a>
        </div>
      </div>
    </section>
  )
}

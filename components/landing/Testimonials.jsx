const TESTS = [
  {
    name:'Carlos Mendez', role:'Dueño · Tienda La Colmena (3 sucursales)',
    text:'Antes controlaba el inventario en hojas de Excel y perdía horas conciliando. Ahora tengo todo en tiempo real desde el celular. El sistema se pagó solo en el primer mes.',
    result:'Ahorra 15 hrs/semana en inventario', av:'CM', g:'from-blue-500 to-indigo-600',
  },
  {
    name:'Dra. Ana Torres', role:'Directora · Clínica Salud Plus',
    text:'Tenía expedientes en papel y agenda en cuaderno. Hoy mis pacientes reservan citas en línea y todo el historial está digitalizado. No podría regresar al método anterior.',
    result:'0 expedientes perdidos desde el lanzamiento', av:'AT', g:'from-teal-500 to-cyan-600',
  },
  {
    name:'Roberto Silva', role:'CEO · Grupo Eventos Premium',
    text:'En nuestros eventos de 800+ personas el check-in tardaba 45 minutos. Con el sistema de QR son menos de 10 minutos. Los clientes lo notan y nos contratan más.',
    result:'De 45 min a 10 min en check-in', av:'RS', g:'from-violet-500 to-purple-600',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-24 px-5 sm:px-8 bg-[#f9f7ff]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-black tracking-widest uppercase mb-4">Resultados reales</span>
          <h2 className="font-display font-black text-slate-900 tracking-tight" style={{fontSize:'clamp(28px,4vw,44px)'}}>Lo que cambió para nuestros clientes</h2>
          <p className="text-slate-500 text-base mt-3 max-w-lg mx-auto">No solo entregamos software — entregamos resultados concretos.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTS.map((t,i)=>(
            <div key={t.name} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all animate-fade-up opacity-0 border border-slate-100"
              style={{animationDelay:`${i*100}ms`,animationFillMode:'forwards'}}>
              <div className={`h-1.5 bg-gradient-to-r ${t.g}`}/>
              <div className="p-7">
                {/* Resultado destacado */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r ${t.g} mb-5`}>
                  <span className="text-white font-black text-[10px] tracking-wide">📈 {t.result}</span>
                </div>
                <div className="text-amber-400 text-sm mb-3 tracking-widest">★★★★★</div>
                <p className="text-slate-600 text-sm leading-relaxed italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.g} flex items-center justify-center text-xs font-black text-white shrink-0`}>{t.av}</div>
                  <div>
                    <div className="font-display font-black text-slate-900 text-sm">{t.name}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

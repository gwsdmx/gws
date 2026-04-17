const TESTS = [
  { name:'Carlos Mendez',   role:'Director, Tienda La Colmena',         text:'El sistema de inventario transformó cómo manejamos nuestras 3 sucursales. Antes perdíamos horas; ahora el control es inmediato.', av:'CM', g:'from-blue-500 to-indigo-600',  acc:'from-blue-500 to-indigo-500'    },
  { name:'Dra. Ana Torres', role:'Directora Médica, Clínica Salud Plus', text:'El expediente digital eliminó el papel y redujo errores. Los pacientes están más satisfechos y trabajamos con más tranquilidad.', av:'AT', g:'from-violet-500 to-purple-600',acc:'from-violet-500 to-purple-500'  },
  { name:'Roberto Silva',   role:'CEO, Grupo Eventos Premium',           text:'El check-in digitalizado nos ahorró 4 horas de trabajo por evento. El sistema es exactamente lo que necesitábamos.',              av:'RS', g:'from-cyan-500 to-blue-600',    acc:'from-cyan-500 to-blue-500'      },
]
export default function Testimonials() {
  return (
    <section className="py-20 sm:py-24 px-5 sm:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold tracking-widest uppercase mb-4">Testimonios</span>
          <h2 className="font-display font-black text-slate-900 tracking-tight" style={{fontSize:'clamp(28px,4vw,44px)'}}>Lo que dicen nuestros clientes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTS.map((t,i)=>(
            <div key={t.name} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all animate-fade-up opacity-0 border border-slate-100"
              style={{animationDelay:`${i*100}ms`,animationFillMode:'forwards'}}>
              <div className={`h-1.5 bg-gradient-to-r ${t.acc}`}/>
              <div className="p-7">
                <div className="text-amber-400 text-base mb-4">★★★★★</div>
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

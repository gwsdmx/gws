const TESTS = [
  { name:'Carlos Mendez',   role:'Director, Tienda La Colmena',         text:'El sistema de inventario transformó cómo manejamos nuestras 3 sucursales. Antes perdíamos horas; ahora el control es inmediato.', avatar:'CM', color:'bg-blue-500'   },
  { name:'Dra. Ana Torres', role:'Directora Médica, Clínica Salud Plus', text:'El expediente digital eliminó el papel y redujo errores. Los pacientes están más satisfechos y trabajamos con más tranquilidad.', avatar:'AT', color:'bg-violet-500' },
  { name:'Roberto Silva',   role:'CEO, Grupo Eventos Premium',           text:'El check-in digitalizado nos ahorró 4 horas de trabajo por evento. El sistema es exactamente lo que necesitábamos.',              avatar:'RS', color:'bg-cyan-500'   },
]

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-24 px-5 sm:px-8 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-blue-200 text-xs font-semibold uppercase tracking-widest mb-3">Testimonios</span>
          <h2 className="font-display font-bold text-white mb-2" style={{fontSize:'clamp(26px,3.5vw,42px)'}}>Lo que dicen nuestros clientes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTS.map((t, i) => (
            <div key={t.name} className="bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all animate-fade-up opacity-0 backdrop-blur-sm"
              style={{animationDelay:`${i*100}ms`,animationFillMode:'forwards'}}>
              <div className="flex mb-3">
                {[...Array(5)].map((_,j) => <svg key={j} className="w-4 h-4 text-yellow-300 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="text-white/85 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-xs font-bold text-white`}>{t.avatar}</div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-blue-200 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

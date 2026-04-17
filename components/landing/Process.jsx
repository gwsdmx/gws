import { Search, Layers, Code2, Zap } from 'lucide-react'

const STEPS = [
  { n:1, icon:Search, title:'Análisis',       desc:'Entendemos tu negocio a fondo. Sin supuestos ni plantillas previas.',           color:'bg-blue-500',   light:'bg-blue-50',   text:'text-blue-600',   border:'border-blue-200'   },
  { n:2, icon:Layers, title:'Diseño',         desc:'Prototipamos contigo. Tu equipo valida cada pantalla antes de escribir código.', color:'bg-violet-500', light:'bg-violet-50', text:'text-violet-600', border:'border-violet-200' },
  { n:3, icon:Code2,  title:'Desarrollo',     desc:'Entregas parciales para que siempre veas el avance. Código limpio.',            color:'bg-cyan-500',   light:'bg-cyan-50',   text:'text-cyan-600',   border:'border-cyan-200'   },
  { n:4, icon:Zap,    title:'Implementación', desc:'Capacitamos a tu equipo y permanecemos contigo después del lanzamiento.',       color:'bg-green-500',  light:'bg-green-50',  text:'text-green-600',  border:'border-green-200'  },
]

export default function Process() {
  return (
    <section id="proceso" className="py-20 sm:py-24 px-5 sm:px-8 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">Proceso</span>
          <h2 className="font-display font-bold text-white mb-3" style={{fontSize:'clamp(26px,3.5vw,42px)'}}>De la idea al sistema funcional</h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto leading-relaxed">Un proceso claro y predecible. Siempre sabes en qué etapa estás.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.n} className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all animate-fade-up opacity-0"
                style={{animationDelay:`${i*100}ms`,animationFillMode:'forwards'}}>
                <div className={`absolute -top-3 -right-3 w-7 h-7 rounded-full ${step.color} flex items-center justify-center text-white font-bold text-xs shadow-lg`}>{step.n}</div>
                <div className={`w-12 h-12 rounded-xl ${step.light} ${step.border} border flex items-center justify-center mb-5`}>
                  <Icon className={`w-5 h-5 ${step.text}`}/>
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

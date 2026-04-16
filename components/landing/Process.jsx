import { Search, Layers, Code2, Zap } from 'lucide-react'

const STEPS = [
  { n:1, icon:Search, title:'Análisis',       desc:'Entendemos tu negocio y los problemas reales. Sin supuestos ni plantillas. Levantamiento detallado de requerimientos.' },
  { n:2, icon:Layers, title:'Diseño',         desc:'Prototipamos las interfaces contigo. Tu equipo valida cada pantalla antes de que escribamos una sola línea de código.' },
  { n:3, icon:Code2,  title:'Desarrollo',     desc:'Entregas parciales para que siempre veas el avance. Código limpio, documentado y escalable.' },
  { n:4, icon:Zap,    title:'Implementación', desc:'Capacitamos a tu equipo, migramos datos y permanecemos contigo después del lanzamiento. No desaparecemos.' },
]

export default function Process() {
  return (
    <section id="proceso" className="py-20 sm:py-24 px-5 sm:px-8 bg-slate-50 border-y border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Proceso</span>
          <h2 className="font-display font-bold text-slate-900 mb-3" style={{fontSize:'clamp(26px,3.5vw,40px)'}}>De la idea al sistema funcional</h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">Un proceso claro y predecible. Siempre sabes en qué etapa estás.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.n} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all animate-fade-up opacity-0"
                style={{animationDelay:`${i*100}ms`,animationFillMode:'forwards'}}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-blue-600"/>
                  </div>
                  <span className="font-display font-bold text-slate-200 text-3xl select-none">0{step.n}</span>
                </div>
                <h3 className="font-display font-bold text-slate-900 text-base mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

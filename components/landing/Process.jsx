import { Search, Layers, Code2, Zap } from 'lucide-react'
const STEPS = [
  { n:1, icon:Search, title:'Análisis',       desc:'Entendemos tu negocio a fondo. Sin supuestos ni plantillas previas.',                     ico:'bg-gradient-to-br from-indigo-500 to-indigo-700',   light:'bg-indigo-500/15 border-indigo-400/20',  c:'text-indigo-300' },
  { n:2, icon:Layers, title:'Diseño',         desc:'Prototipamos contigo. Validas cada pantalla antes de escribir una sola línea de código.',  ico:'bg-gradient-to-br from-violet-500 to-purple-700',   light:'bg-violet-500/15 border-violet-400/20',  c:'text-violet-300' },
  { n:3, icon:Code2,  title:'Desarrollo',     desc:'Entregas parciales para que siempre veas el avance real. Código limpio y documentado.',    ico:'bg-gradient-to-br from-cyan-500 to-blue-600',       light:'bg-cyan-500/15 border-cyan-400/20',      c:'text-cyan-300'   },
  { n:4, icon:Zap,    title:'Implementación', desc:'Capacitamos a tu equipo y permanecemos contigo después del lanzamiento. Siempre.',         ico:'bg-gradient-to-br from-emerald-500 to-green-600',   light:'bg-emerald-500/15 border-emerald-400/20',c:'text-emerald-300' },
]
export default function Process() {
  return (
    <section id="proceso" className="py-20 sm:py-24 px-5 sm:px-8 relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"/>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-5" style={{background:'radial-gradient(circle,#6366f1,transparent)'}}/>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{background:'rgba(99,102,241,0.15)',border:'1px solid rgba(99,102,241,0.3)',color:'#a5b4fc'}}>Proceso</span>
          <h2 className="font-display font-black text-white mb-3 tracking-tight" style={{fontSize:'clamp(28px,4vw,44px)'}}>De la idea al sistema funcional</h2>
          <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">Un proceso claro y predecible. Siempre sabes en qué etapa estás.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step,i)=>{
            const Icon=step.icon
            return(
              <div key={step.n} className="relative rounded-2xl p-6 hover:bg-white/5 transition-all animate-fade-up opacity-0" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',animationDelay:`${i*100}ms`,animationFillMode:'forwards'}}>
                <div className="absolute top-4 right-4 font-display font-black text-5xl leading-none" style={{color:'rgba(255,255,255,0.04)'}}>{String(step.n).padStart(2,'0')}</div>
                <div className={`w-12 h-12 rounded-2xl ${step.ico} flex items-center justify-center mb-5 shadow-lg`}>
                  <Icon className="w-5 h-5 text-white"/>
                </div>
                <h3 className="font-display font-black text-white text-base mb-2">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { MessageSquare, Layout, Code2, Rocket } from 'lucide-react'
const STEPS = [
  { n:'01', icon:MessageSquare, title:'Nos cuentas tu negocio',  desc:'En una llamada de 30 min te escuchamos y entendemos qué necesitas. Sin tecnicismos — solo hablamos de tu problema.', label:'Gratis · Sin compromiso', c:'from-violet-500 to-indigo-600' },
  { n:'02', icon:Layout,        title:'Te mostramos cómo queda', desc:'Antes de escribir código te mostramos el diseño. Ves exactamente cómo va a funcionar tu sistema y dices si está bien.', label:'Tú apruebas cada pantalla', c:'from-indigo-500 to-blue-600'  },
  { n:'03', icon:Code2,         title:'Lo construimos para ti',  desc:'Desarrollamos tu sistema con entregas parciales. Siempre ves el avance — no hay sorpresas al final del proyecto.',        label:'Avances cada semana',     c:'from-blue-500 to-cyan-500'   },
  { n:'04', icon:Rocket,        title:'Lo lanzamos juntos',       desc:'Capacitamos a tu equipo, migramos tus datos y te acompañamos los primeros días. No desaparecemos al entregar.',             label:'Soporte post-lanzamiento', c:'from-cyan-500 to-teal-500'   },
]

export default function Process() {
  return (
    <section id="proceso" className="py-20 sm:py-24 px-5 sm:px-8 bg-[#0f0a1e] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 60% 50% at 15% 50%,rgba(124,58,237,.15),transparent 55%),radial-gradient(ellipse 40% 40% at 85% 50%,rgba(14,165,233,.1),transparent 55%)'}}/>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-4" style={{background:'rgba(124,58,237,.15)',border:'1px solid rgba(124,58,237,.3)',color:'#c4b5fd'}}>¿Cómo funciona?</span>
          <h2 className="font-display font-black text-white mb-3 tracking-tight" style={{fontSize:'clamp(28px,4vw,44px)'}}>De la idea a tu sistema en 4 pasos</h2>
          <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">Simple y predecible. Siempre sabes en qué etapa está tu proyecto.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step,i)=>{
            const Icon = step.icon
            return (
              <div key={step.n} className="relative rounded-2xl p-6 hover:bg-white/5 transition-all animate-fade-up opacity-0"
                style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',animationDelay:`${i*100}ms`,animationFillMode:'forwards'}}>
                <div className="absolute top-4 right-4 font-display font-black text-5xl leading-none" style={{color:'rgba(255,255,255,0.04)'}}>{step.n}</div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.c} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-5 h-5 text-white"/>
                </div>
                <h3 className="font-display font-black text-white text-base mb-2">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-3">{step.desc}</p>
                <span className="inline-flex px-2.5 py-1 rounded-full text-[9px] font-black" style={{background:'rgba(124,58,237,.15)',border:'1px solid rgba(196,181,253,.2)',color:'#c4b5fd'}}>{step.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

'use client'
import { useEffect, useRef, useState } from 'react'
const STATS = [
  { v:50,  pre:'+', suf:'',  l:'sistemas entregados', emoji:'🚀', detail:'a negocios reales en operación' },
  { v:4,   pre:'',  suf:'+', l:'tipos de industria',  emoji:'🏢', detail:'retail, médico, eventos, empresas' },
  { v:100, pre:'',  suf:'%', l:'código es tuyo',       emoji:'💎', detail:'sin licencias ni dependencias' },
  { v:24,  pre:'<', suf:'h', l:'tiempo de respuesta',  emoji:'⚡', detail:'primera consulta gratis' },
]
export default function Stats() {
  const [started,setStarted]=useState(false)
  const [vals,setVals]=useState(STATS.map(()=>0))
  const ref=useRef(null)
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!started){setStarted(true);STATS.forEach((s,i)=>{let c=0;const step=s.v/40;const t=setInterval(()=>{c=Math.min(c+step,s.v);setVals(p=>{const n=[...p];n[i]=Math.round(c);return n});if(c>=s.v)clearInterval(t)},35)})}
    },{threshold:0.3})
    if(ref.current)obs.observe(ref.current);return()=>obs.disconnect()
  },[started])
  return (
    <section id="nosotros" ref={ref} className="py-16 sm:py-20 px-5 sm:px-8" style={{background:'linear-gradient(135deg,#7c3aed,#4f46e5 50%,#0ea5e9)'}}>
      <div className="max-w-5xl mx-auto">
        <p className="text-white/50 text-xs font-black uppercase tracking-widest text-center mb-8">Por qué nos eligen</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s,i)=>(
            <div key={s.l} className="text-center rounded-2xl py-7 px-4 hover:-translate-y-1 transition-all" style={{background:'rgba(255,255,255,.12)',border:'1px solid rgba(255,255,255,.2)',backdropFilter:'blur(10px)'}}>
              <div className="text-3xl mb-3">{s.emoji}</div>
              <div className="font-display font-black text-white mb-1" style={{fontSize:'clamp(28px,4vw,48px)',letterSpacing:'-2px'}}>
                {s.pre}{vals[i]}{s.suf}
              </div>
              <div className="text-white/80 text-xs font-bold mb-1">{s.l}</div>
              <div className="text-white/40 text-[10px]">{s.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

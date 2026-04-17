'use client'
import { useEffect, useRef, useState } from 'react'
const STATS = [
  { v:50,  pre:'+', suf:'',  l:'Proyectos entregados', emoji:'🚀' },
  { v:4,   pre:'',  suf:'+', l:'Industrias atendidas',  emoji:'🏢' },
  { v:100, pre:'',  suf:'%', l:'Código a medida',       emoji:'💎' },
  { v:24,  pre:'<', suf:'h', l:'Tiempo de respuesta',   emoji:'⚡' },
]
export default function Stats() {
  const [started,setStarted]=useState(false)
  const [vals,setVals]=useState(STATS.map(()=>0))
  const ref=useRef(null)
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!started){
        setStarted(true)
        STATS.forEach((s,i)=>{
          let cur=0;const step=s.v/40
          const t=setInterval(()=>{cur=Math.min(cur+step,s.v);setVals(p=>{const n=[...p];n[i]=Math.round(cur);return n});if(cur>=s.v)clearInterval(t)},35)
        })
      }
    },{threshold:0.3})
    if(ref.current)obs.observe(ref.current)
    return()=>obs.disconnect()
  },[started])
  return (
    <section id="nosotros" ref={ref} className="py-16 sm:py-20 px-5 sm:px-8" style={{background:'linear-gradient(135deg,#6366f1 0%,#3b82f6 50%,#06b6d4 100%)'}}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s,i)=>(
          <div key={s.l} className="text-center rounded-2xl py-8 px-4 hover:-translate-y-1 transition-all" style={{background:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.2)',backdropFilter:'blur(10px)'}}>
            <div className="text-3xl mb-3">{s.emoji}</div>
            <div className="font-display font-black text-white mb-1" style={{fontSize:'clamp(28px,4vw,48px)',letterSpacing:'-2px'}}>
              {s.pre}{vals[i]}{s.suf}
            </div>
            <div className="text-white/60 text-xs sm:text-sm">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

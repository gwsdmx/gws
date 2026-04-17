'use client'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  { v:50,  pre:'+', suf:'',  l:'Proyectos entregados', icon:'🚀' },
  { v:4,   pre:'',  suf:'+', l:'Industrias atendidas',  icon:'🏢' },
  { v:100, pre:'',  suf:'%', l:'Código a medida',       icon:'💎' },
  { v:24,  pre:'<', suf:'h', l:'Tiempo de respuesta',   icon:'⚡' },
]

export default function Stats() {
  const [started, setStarted] = useState(false)
  const [vals, setVals] = useState(STATS.map(() => 0))
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true)
        STATS.forEach((s, i) => {
          let cur = 0; const step = s.v / 40
          const t = setInterval(() => {
            cur = Math.min(cur + step, s.v)
            setVals(prev => { const next=[...prev]; next[i]=Math.round(cur); return next })
            if (cur >= s.v) clearInterval(t)
          }, 35)
        })
      }
    }, { threshold:0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  return (
    <section id="nosotros" ref={ref} className="py-16 sm:py-20 px-5 sm:px-8 bg-white border-y border-slate-100">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
        {STATS.map((s, i) => (
          <div key={s.l} className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-100 hover:shadow-md transition-all">
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="font-display font-bold text-slate-900 mb-1" style={{fontSize:'clamp(28px,4vw,44px)'}}>
              {s.pre}{vals[i]}{s.suf}
            </div>
            <div className="text-slate-500 text-xs sm:text-sm">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

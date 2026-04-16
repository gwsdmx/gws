'use client'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  {v:50,pre:'+',suf:'',l:'Proyectos entregados'},
  {v:4, pre:'',suf:'+',l:'Industrias atendidas'},
  {v:100,pre:'',suf:'%',l:'Código a medida'},
  {v:24,pre:'<',suf:'h',l:'Tiempo de respuesta'},
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
          let cur = 0
          const step = s.v / 40
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
    <section id="nosotros" ref={ref} className="bg-blue-600 py-14 sm:py-16">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-5">
        {STATS.map((s, i) => (
          <div key={s.l} className="text-center bg-white/10 border border-white/20 rounded-2xl py-7 px-4">
            <div className="font-display font-bold text-white mb-2" style={{fontSize:'clamp(28px,4vw,44px)'}}>
              {s.pre}{vals[i]}{s.suf}
            </div>
            <div className="text-blue-200 text-xs sm:text-sm">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

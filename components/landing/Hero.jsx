'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { getClient } from '@/lib/supabase'

const DEFAULT = {
  title: 'Sistemas que hacen crecer tu negocio',
  subtitle: 'Construimos software a medida para clínicas, talleres, retail, e-commerce y gobierno. No plantillas — exactamente lo que necesitas.',
  image_url: null,
}

export default function Hero({ data: initialData }) {
  const [hero, setHero]       = useState(initialData || DEFAULT)
  const [counters, setCounters] = useState({ p:0, i:0, c:0 })

  // Always refetch fresh data client-side so admin changes show immediately
  useEffect(() => {
    const sb = getClient()
    sb.from('hero').select('*').single().then(({ data }) => {
      if (data) setHero(data)
    })
  }, [])

  useEffect(() => {
    const targets = [{ key:'p', val:50 }, { key:'i', val:4 }, { key:'c', val:100 }]
    targets.forEach(({ key, val }) => {
      let start = 0
      const step = val / 40
      const timer = setInterval(() => {
        start = Math.min(start + step, val)
        setCounters(prev => ({ ...prev, [key]: Math.round(start) }))
        if (start >= val) clearInterval(timer)
      }, 35)
    })
  }, [])

  const titleHasCrecer = hero.title?.toLowerCase().includes('crecer')

  return (
    <section className="relative pt-20 overflow-hidden bg-white">
      <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/60 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse-dot" />
              Software 100% personalizado
            </div>

            <h1 className="font-display font-bold text-slate-900 leading-tight mb-5"
              style={{fontSize:'clamp(30px,4.5vw,52px)'}}>
              {titleHasCrecer ? (
                <>Sistemas que hacen{' '}
                  <span className="relative inline-block text-blue-600">
                    crecer
                    <span className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-200 rounded-full" />
                  </span>
                  {' '}tu negocio
                </>
              ) : hero.title}
            </h1>

            <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-lg mb-8 opacity-0 animate-fade-up animate-delay-100"
              style={{animationFillMode:'forwards'}}>
              {hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10 opacity-0 animate-fade-up animate-delay-200"
              style={{animationFillMode:'forwards'}}>
              <a href="#contacto"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/25 hover:-translate-y-0.5">
                Agenda una demo <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"/>
              </a>
              <a href="#servicios"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50 hover:text-slate-900 transition-all">
                Ver servicios <ChevronRight className="w-4 h-4"/>
              </a>
            </div>

            <div className="flex flex-wrap gap-8 opacity-0 animate-fade-up animate-delay-300"
              style={{animationFillMode:'forwards'}}>
              {[{v:counters.p,pre:'+',suf:'',l:'Proyectos'},{v:counters.i,pre:'',suf:'+',l:'Industrias'},{v:counters.c,pre:'',suf:'%',l:'Código a medida'}].map(s => (
                <div key={s.l}>
                  <div className="font-display font-bold text-slate-900 text-3xl">{s.pre}{s.v}{s.suf}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative hidden md:block opacity-0 animate-fade-up animate-delay-200"
            style={{animationFillMode:'forwards'}}>
            <div className="absolute -top-4 -right-2 z-20 bg-white rounded-xl border border-slate-200 shadow-lg px-3 py-2.5 flex items-center gap-2.5 opacity-0 animate-fade-in animate-delay-500"
              style={{animationFillMode:'forwards'}}>
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-base">✅</div>
              <div>
                <div className="text-green-600 font-semibold text-[10px]">Nuevo proyecto lanzado</div>
                <div className="text-slate-400 text-[10px]">Sistema de inventario · Hoy</div>
              </div>
            </div>
            <div className="absolute -bottom-3 -left-4 z-20 bg-white rounded-xl border border-slate-200 shadow-lg px-3 py-2.5 flex items-center gap-2.5 opacity-0 animate-fade-in animate-delay-400"
              style={{animationFillMode:'forwards'}}>
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-base">🚀</div>
              <div>
                <div className="text-blue-600 font-semibold text-[10px]">Deploy exitoso</div>
                <div className="text-slate-400 text-[10px]">Sistema médico v2.1</div>
              </div>
            </div>

            {hero.image_url ? (
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                <img src={hero.image_url} alt="GWS Dashboard" className="w-full h-auto object-cover"/>
              </div>
            ) : (
              /* Default animated dashboard mockup */
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"/>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"/>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"/>
                  </div>
                  <div className="flex-1 text-center bg-white border border-slate-200 rounded px-2 py-0.5 text-[10px] text-slate-400 font-mono">
                    gws.app/dashboard
                  </div>
                </div>
                <div className="p-4 grid grid-cols-[140px_1fr] gap-3 bg-slate-50/60">
                  <div className="bg-white rounded-xl p-3 border border-slate-100">
                    <div className="text-[7px] font-semibold text-slate-400 uppercase tracking-widest mb-2.5">Módulos</div>
                    {[{l:'Dashboard',a:true},{l:'Inventario',a:false},{l:'Ventas',a:false},{l:'Clientes',a:false}].map(item => (
                      <div key={item.l} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs mb-0.5 ${item.a?'bg-blue-50 text-blue-600 font-semibold':'text-slate-400'}`}>
                        <div className={`w-1 h-1 rounded-full ${item.a?'bg-blue-500':'bg-slate-300'}`}/>{item.l}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <div className="grid grid-cols-3 gap-2">
                      {[{l:'Ventas',v:'$24,350',s:'↑ 12%',sc:'text-green-600'},{l:'Productos',v:'4,821',s:'3 alertas',sc:'text-blue-600'},{l:'Órdenes',v:'147',s:'hoy',sc:'text-violet-600'}].map(k => (
                        <div key={k.l} className="bg-white rounded-xl p-3 border border-slate-100">
                          <div className="text-[8px] text-slate-400 mb-1">{k.l}</div>
                          <div className="font-display font-bold text-slate-900 text-sm">{k.v}</div>
                          <div className={`text-[8px] font-semibold mt-0.5 ${k.sc}`}>{k.s}</div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-100">
                      <div className="text-[8px] text-slate-400 font-semibold uppercase tracking-wider mb-2">Ventas últimos 7 días</div>
                      <div className="flex items-end gap-1 h-10">
                        {[[40,'#2563eb'],[65,'#60a5fa'],[45,'#2563eb'],[80,'#0ea5e9'],[55,'#2563eb'],[90,'#0ea5e9'],[70,'#6366f1']].map(([h,c],i) => (
                          <div key={i} className="flex-1 rounded-t" style={{height:h+'%',background:c,opacity:0.75}}/>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-8 bg-gradient-to-b from-white to-slate-50" />
    </section>
  )
}

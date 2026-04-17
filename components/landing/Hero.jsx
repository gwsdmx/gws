'use client'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { getClient } from '@/lib/supabase'

export default function Hero() {
  const [hero, setHero] = useState({ title:'Sistemas que hacen crecer tu negocio', subtitle:'Construimos software a medida para clínicas, talleres, retail, e-commerce y gobierno. No plantillas — exactamente lo que necesitas.', image_url:null })
  const [counters, setCounters] = useState({ p:0, i:0, c:0 })

  useEffect(() => {
    getClient().from('hero').select('*').single().then(({ data }) => { if (data) setHero(data) })
    const targets = [{ key:'p', val:50 },{ key:'i', val:4 },{ key:'c', val:100 }]
    targets.forEach(({ key, val }) => {
      let s = 0; const step = val / 40
      const t = setInterval(() => { s = Math.min(s+step,val); setCounters(p=>({...p,[key]:Math.round(s)})); if(s>=val) clearInterval(t) }, 35)
    })
  }, [])

  return (
    <section className="relative pt-20 overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-blue-500 via-cyan-400 to-emerald-400" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[500px] bg-gradient-to-bl from-indigo-100/70 via-blue-50/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-50/80 rounded-full blur-3xl" />
        <div className="absolute top-40 right-60 w-48 h-48 bg-violet-100/60 rounded-full blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-violet-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-6 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 animate-pulse" />
              Software 100% personalizado
            </div>
            <h1 className="font-display font-black text-slate-900 leading-[1.05] mb-5 tracking-tight" style={{fontSize:'clamp(32px,5vw,58px)'}}>
              Sistemas que hacen{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">crecer</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full" />
              </span>
              {' '}tu negocio
            </h1>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-lg mb-8 opacity-0 animate-fade-up animate-delay-100" style={{animationFillMode:'forwards'}}>
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-10 opacity-0 animate-fade-up animate-delay-200" style={{animationFillMode:'forwards'}}>
              <a href="#contacto" className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm transition-all shadow-xl shadow-indigo-500/30 hover:-translate-y-1 hover:shadow-indigo-500/40">
                Agenda una demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
              </a>
              <a href="#demo" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 transition-all">
                Ver demo en vivo <ChevronRight className="w-4 h-4"/>
              </a>
            </div>
            <div className="flex flex-wrap gap-10 opacity-0 animate-fade-up animate-delay-300" style={{animationFillMode:'forwards'}}>
              {[{v:counters.p,pre:'+',suf:'',l:'Proyectos'},{v:counters.i,pre:'',suf:'+',l:'Industrias'},{v:counters.c,pre:'',suf:'%',l:'A medida'}].map(s=>(
                <div key={s.l}>
                  <div className="font-display font-black text-slate-900 text-3xl tracking-tight">{s.pre}{s.v}{s.suf}</div>
                  <div className="text-slate-400 text-xs mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden md:block z-10 opacity-0 animate-fade-up animate-delay-200" style={{animationFillMode:'forwards'}}>
            <div className="absolute -top-4 -right-2 z-20 bg-white rounded-2xl border border-slate-200 shadow-xl px-3 py-2.5 flex items-center gap-2.5 opacity-0 animate-fade-in animate-delay-500" style={{animationFillMode:'forwards'}}>
              <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center text-sm">✅</div>
              <div><div className="text-green-700 font-bold text-[10px]">Nuevo proyecto lanzado</div><div className="text-slate-400 text-[10px]">Sistema de inventario</div></div>
            </div>
            <div className="absolute -bottom-2 -left-4 z-20 bg-white rounded-2xl border border-slate-200 shadow-xl px-3 py-2.5 flex items-center gap-2.5 opacity-0 animate-fade-in animate-delay-400" style={{animationFillMode:'forwards'}}>
              <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-sm">🚀</div>
              <div><div className="text-blue-700 font-bold text-[10px]">Deploy exitoso</div><div className="text-slate-400 text-[10px]">Sistema médico v2.1</div></div>
            </div>
            {hero.image_url ? (
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xl"><img src={hero.image_url} alt="GWS" className="w-full h-auto object-cover"/></div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400"/><div className="w-2.5 h-2.5 rounded-full bg-yellow-400"/><div className="w-2.5 h-2.5 rounded-full bg-green-400"/></div>
                  <div className="flex-1 text-center bg-white border border-slate-200 rounded px-2 py-0.5 text-[10px] text-slate-400 font-mono">gws.app/dashboard</div>
                </div>
                <div className="p-4 grid grid-cols-[148px_1fr] gap-3 bg-slate-50/60">
                  <div className="bg-white rounded-xl p-3 border border-slate-100">
                    <div className="text-[7px] font-bold text-slate-300 uppercase tracking-widest mb-2.5">Módulos</div>
                    {[{l:'Dashboard',a:true},{l:'Inventario',a:false},{l:'Ventas',a:false},{l:'Clientes',a:false}].map(item=>(
                      <div key={item.l} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs mb-0.5 ${item.a?'bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-600 font-bold':'text-slate-400'}`}>
                        <div className={`w-1 h-1 rounded-full ${item.a?'bg-indigo-500':'bg-slate-300'}`}/>{item.l}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <div className="grid grid-cols-3 gap-2">
                      {[{l:'Ventas',v:'$24k',s:'↑ 12%',g:'from-green-50 to-emerald-50',c:'text-green-700'},{l:'Productos',v:'4,821',s:'activo',g:'from-blue-50 to-indigo-50',c:'text-blue-700'},{l:'Órdenes',v:'147',s:'hoy',g:'from-violet-50 to-purple-50',c:'text-violet-700'}].map(k=>(
                        <div key={k.l} className={`bg-gradient-to-br ${k.g} rounded-xl p-3 border border-slate-100`}>
                          <div className="text-[8px] text-slate-500 mb-1">{k.l}</div>
                          <div className="font-display font-black text-slate-900 text-sm">{k.v}</div>
                          <div className={`text-[8px] font-bold mt-0.5 ${k.c}`}>{k.s}</div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-100">
                      <div className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mb-2">Ventas 7 días</div>
                      <div className="flex items-end gap-1 h-10">
                        {[[40,'from-indigo-400 to-indigo-600'],[65,'from-blue-400 to-blue-600'],[45,'from-indigo-400 to-indigo-600'],[80,'from-emerald-400 to-emerald-600'],[55,'from-blue-400 to-blue-600'],[90,'from-emerald-400 to-emerald-600'],[70,'from-violet-400 to-violet-600']].map(([h,g],i)=>(
                          <div key={i} className={`flex-1 rounded-t bg-gradient-to-t ${g}`} style={{height:h+'%'}}/>
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
      <div className="h-10 bg-gradient-to-b from-white to-slate-50" />
    </section>
  )
}

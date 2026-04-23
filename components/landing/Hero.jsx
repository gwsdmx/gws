'use client'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronRight, CheckCircle } from 'lucide-react'
import { getClient } from '@/lib/supabase'

export default function Hero() {
  const [hero, setHero] = useState({
    title:    'Tu negocio necesita un sistema. Nosotros lo construimos.',
    subtitle: 'Desarrollamos software a la medida de tu negocio: punto de venta, control de inventario, sistemas médicos, eventos, e-commerce y más. Sin plantillas. Sin límites. 100% tuyo.',
    image_url: null,
  })
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
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[500px] rounded-full blur-3xl opacity-60" style={{background:'radial-gradient(ellipse,#e9d5ff,transparent 60%)'}}/>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-50" style={{background:'radial-gradient(ellipse,#dbeafe,transparent 60%)'}}/>
        <div className="absolute top-48 right-56 w-48 h-48 rounded-full blur-2xl opacity-40" style={{background:'radial-gradient(ellipse,#fce7f3,transparent 60%)'}}/>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Copy de ventas */}
          <div className="relative z-10 animate-fade-up">

            {/* Social proof */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {['CM','AT','RS','JL'].map((i,idx) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[8px] font-black text-white" style={{marginLeft: idx===0?0:-8}}>{i}</div>
                ))}
              </div>
              <div className="text-xs text-slate-500">
                <span className="font-bold text-slate-900">+50 negocios</span> ya usan nuestros sistemas
              </div>
              <div className="text-amber-400 text-xs tracking-widest">★★★★★</div>
            </div>

            {/* Headline directo */}
            <h1 className="font-display font-black text-slate-900 leading-[1.05] mb-4 tracking-tight" style={{fontSize:'clamp(30px,4.5vw,52px)'}}>
              Tu negocio necesita<br/>
              un sistema.{' '}
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                Nosotros lo construimos.
              </span>
            </h1>

            {/* Sub — qué hacemos exactamente */}
            <p className="text-slate-600 font-semibold text-base sm:text-lg leading-relaxed mb-3" style={{fontSize:'clamp(14px,2vw,17px)'}}>
              Desarrollamos software a la medida de tu negocio.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-7 max-w-lg">
              POS, inventario, sistemas médicos, check-in para eventos, e-commerce y más. Sin plantillas genéricas — cada sistema es construido exactamente para tu caso.
            </p>

            {/* Lo que incluye — bullet points cortos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {[
                '✅ Sistema listo y funcionando',
                '✅ Capacitación incluida',
                '✅ Licencia perpetua del sistema',
                '✅ Soporte después de la entrega',
                '✅ Presupuesto flexible por etapas',
                '✅ Respuesta en menos de 24 hrs',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-slate-700 text-xs sm:text-sm font-medium">
                  {item}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href="#contacto" className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-black text-sm transition-all shadow-xl shadow-violet-500/30 hover:-translate-y-1">
                Quiero mi sistema →
              </a>
              <a href="#demo" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-all">
                Ver demo en vivo
              </a>
            </div>

            <p className="text-slate-400 text-xs">Sin compromiso · Sin contrato forzoso · Primera consulta gratis</p>
          </div>

          {/* RIGHT — Dashboard preview */}
          <div className="relative hidden md:block z-10 opacity-0 animate-fade-up animate-delay-200" style={{animationFillMode:'forwards'}}>
            <div className="absolute -top-4 -right-2 z-20 bg-white rounded-2xl border border-slate-200 shadow-xl px-3 py-2.5 flex items-center gap-2.5 opacity-0 animate-fade-in animate-delay-500" style={{animationFillMode:'forwards'}}>
              <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center text-sm">✅</div>
              <div><div className="text-green-700 font-bold text-[10px]">Sistema entregado</div><div className="text-slate-400 text-[10px]">Tienda La Colmena · hoy</div></div>
            </div>
            <div className="absolute -bottom-2 -left-4 z-20 bg-white rounded-2xl border border-slate-200 shadow-xl px-3 py-2.5 flex items-center gap-2.5 opacity-0 animate-fade-in animate-delay-400" style={{animationFillMode:'forwards'}}>
              <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center text-sm">🚀</div>
              <div><div className="text-violet-700 font-bold text-[10px]">En producción</div><div className="text-slate-400 text-[10px]">Clínica Salud Plus · v2.1</div></div>
            </div>

            {hero.image_url ? (
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xl">
                <img src={hero.image_url} alt="GWS" className="w-full h-auto object-cover"/>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400"/><div className="w-2.5 h-2.5 rounded-full bg-yellow-400"/><div className="w-2.5 h-2.5 rounded-full bg-green-400"/></div>
                  <div className="flex-1 text-center bg-white border border-slate-200 rounded px-2 py-0.5 text-[10px] text-slate-400 font-mono">gws.app/dashboard</div>
                </div>
                <div className="p-4 grid grid-cols-[140px_1fr] gap-3 bg-slate-50/50">
                  <div className="bg-white rounded-xl p-3 border border-slate-100">
                    <div className="text-[7px] font-black text-slate-300 uppercase tracking-widest mb-2.5">Tu sistema</div>
                    {[{l:'Dashboard',a:true},{l:'Inventario',a:false},{l:'Ventas',a:false},{l:'Clientes',a:false}].map(item=>(
                      <div key={item.l} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs mb-0.5 ${item.a?'bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 font-bold':'text-slate-400'}`}>
                        <div className={`w-1 h-1 rounded-full ${item.a?'bg-violet-500':'bg-slate-300'}`}/>{item.l}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <div className="grid grid-cols-3 gap-2">
                      {[{l:'Ventas',v:'$24k',s:'↑ 12%',bg:'bg-gradient-to-br from-green-50 to-emerald-50',c:'text-green-700'},{l:'Productos',v:'4,821',s:'activo',bg:'bg-gradient-to-br from-blue-50 to-indigo-50',c:'text-blue-700'},{l:'Órdenes',v:'147',s:'hoy',bg:'bg-gradient-to-br from-violet-50 to-purple-50',c:'text-violet-700'}].map(k=>(
                        <div key={k.l} className={`${k.bg} rounded-xl p-3 border border-slate-100`}>
                          <div className="text-[8px] text-slate-500 mb-1">{k.l}</div>
                          <div className="font-display font-black text-slate-900 text-sm">{k.v}</div>
                          <div className={`text-[8px] font-black mt-0.5 ${k.c}`}>{k.s}</div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-100">
                      <div className="text-[8px] text-slate-400 font-black uppercase tracking-wider mb-2">Ventas 7 días</div>
                      <div className="flex items-end gap-1 h-10">
                        {[[40,'#7c3aed'],[65,'#6366f1'],[45,'#7c3aed'],[80,'#059669'],[55,'#6366f1'],[90,'#059669'],[70,'#8b5cf6']].map(([h,c],i)=>(
                          <div key={i} className="flex-1 rounded-t" style={{height:h+'%',background:c,opacity:.75}}/>
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
      <div className="h-10 bg-gradient-to-b from-white to-[#0f0a1e]" />
    </section>
  )
}

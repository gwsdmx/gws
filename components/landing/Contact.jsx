'use client'
import { useState } from 'react'
import { ArrowRight, CheckCircle2, MessageCircle, Mail, Clock, Check } from 'lucide-react'
import { getClient } from '@/lib/supabase'

const INPUT = 'w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all'

export default function Contact() {
  const [form, setForm]     = useState({ nombre:'', email:'', empresa:'', mensaje:'' })
  const [status, setStatus] = useState('idle')
  const [err, setErr]       = useState('')
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '521XXXXXXXXXX'

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault(); setStatus('loading'); setErr('')
    try {
      const sb = getClient()
      const { error } = await sb.from('leads').insert([{
        nombre: form.nombre, email: form.email,
        mensaje: `${form.empresa ? '['+form.empresa+'] ' : ''}${form.mensaje}`,
        source: 'landing', created_at: new Date().toISOString()
      }])
      if (error) throw error
      setStatus('success'); setForm({ nombre:'', email:'', empresa:'', mensaje:'' })
    } catch(e) {
      setErr(e?.message || 'Error al enviar. Escríbenos directamente.')
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="py-20 sm:py-24 px-5 sm:px-8 bg-slate-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* LEFT */}
        <div>
          <span className="inline-block text-blue-400 text-xs font-semibold uppercase tracking-widest mb-5">Contacto</span>
          <h2 className="font-display font-bold text-white mb-4 leading-tight" style={{fontSize:'clamp(26px,3.5vw,40px)'}}>
            Cuéntanos tu proyecto
          </h2>
          <p className="text-slate-400 text-base leading-relaxed mb-8">
            No necesitas tener todo claro. Con una descripción general ya podemos orientarte sin ningún costo.
          </p>

          <div className="space-y-4 mb-8">
            {[{icon:Mail,label:'Correo',val:process.env.NEXT_PUBLIC_CONTACT_EMAIL||'gws.dmx@gmail.com'},{icon:Clock,label:'Respuesta',val:'Menos de 24 horas hábiles'}].map(({icon:Icon,label,val}) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-blue-400"/></div>
                <div><p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">{label}</p><p className="text-white text-sm font-medium">{val}</p></div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 mb-6">
            <p className="font-display font-bold text-white text-sm mb-3">¿Por qué elegirnos?</p>
            <div className="space-y-2">
              {['Sin contratos a largo plazo','Presupuesto adaptable en etapas','El código fuente es 100% tuyo','Soporte técnico continuo'].map(b => (
                <div key={b} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-green-400"/></div>
                  <span className="text-slate-300 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <a href={`https://wa.me/${wa}?text=Hola, me interesa una demo de GWS.`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors shadow-lg shadow-green-500/20">
            <MessageCircle className="w-5 h-5"/>
            WhatsApp directo
          </a>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-green-600"/></div>
              <h3 className="font-display font-bold text-slate-900 text-xl mb-2">¡Mensaje enviado!</h3>
              <p className="text-slate-500">Te contactaremos en menos de 24 horas hábiles.</p>
              <button onClick={() => setStatus('idle')} className="mt-5 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors">Enviar otro →</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-slate-600 text-sm font-medium mb-1.5">Nombre completo *</label><input name="nombre" type="text" required value={form.nombre} onChange={onChange} placeholder="Tu nombre" className={INPUT}/></div>
                <div><label className="block text-slate-600 text-sm font-medium mb-1.5">Correo electrónico *</label><input name="email" type="email" required value={form.email} onChange={onChange} placeholder="correo@empresa.com" className={INPUT}/></div>
              </div>
              <div><label className="block text-slate-600 text-sm font-medium mb-1.5">Empresa / Negocio</label><input name="empresa" type="text" value={form.empresa} onChange={onChange} placeholder="Nombre de tu empresa (opcional)" className={INPUT}/></div>
              <div><label className="block text-slate-600 text-sm font-medium mb-1.5">¿Qué necesitas? *</label><textarea name="mensaje" required rows={4} value={form.mensaje} onChange={onChange} placeholder="Describe brevemente tu negocio y lo que quieres mejorar o construir..." className={`${INPUT} resize-none`}/></div>
              {status === 'error' && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{err}</p>}
              <button type="submit" disabled={status === 'loading'} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all">
                {status === 'loading' ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>Enviando...</> : <>Enviar mensaje <ArrowRight className="w-4 h-4"/></>}
              </button>
              <p className="text-slate-400 text-xs text-center">Tu información es privada y confidencial.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

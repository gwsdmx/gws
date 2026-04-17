'use client'
import { useState } from 'react'
import { ArrowRight, CheckCircle2, Mail, Clock, Check } from 'lucide-react'
import { getClient } from '@/lib/supabase'

const INPUT = 'w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all'

const WA_NUMBERS = [
  { number:'527731387203',  display:'771 138 7203' },
  { number:'5217714140422', display:'771 414 0422' },
]

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function Contact() {
  const [form,   setForm]   = useState({ nombre:'', email:'', empresa:'', mensaje:'' })
  const [status, setStatus] = useState('idle')
  const [err,    setErr]    = useState('')

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault(); setStatus('loading'); setErr('')
    try {
      const sb = getClient()
      const { error } = await sb.from('leads').insert([{
        nombre:  form.nombre,
        email:   form.email,
        mensaje: `${form.empresa ? '[' + form.empresa + '] ' : ''}${form.mensaje}`,
        source:  'landing',
        created_at: new Date().toISOString(),
      }])
      if (error) throw error
      setStatus('success')
      setForm({ nombre:'', email:'', empresa:'', mensaje:'' })
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
            {[
              { icon:Mail,  label:'Correo',    val:'gws.dmx@gmail.com'         },
              { icon:Clock, label:'Respuesta', val:'Menos de 24 horas hábiles' },
            ].map(({ icon:Icon, label, val }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-blue-400"/>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">{label}</p>
                  <p className="text-white text-sm font-medium">{val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 mb-7">
            <p className="font-display font-bold text-white text-sm mb-3">¿Por qué elegirnos?</p>
            <div className="space-y-2">
              {['Sin contratos a largo plazo','Presupuesto adaptable en etapas','El código fuente es 100% tuyo','Soporte técnico continuo'].map(b => (
                <div key={b} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-green-400"/>
                  </div>
                  <span className="text-slate-300 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp buttons */}
          <div className="space-y-3">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Contáctanos por WhatsApp</p>
            {WA_NUMBERS.map(wa => (
              <a key={wa.number}
                href={`https://wa.me/${wa.number}?text=Hola, me interesa una demo de GWS.`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bc5a] text-white font-semibold text-sm transition-colors shadow-lg shadow-green-500/20 w-full sm:w-auto">
                <WhatsAppIcon />
                <span>{wa.display}</span>
              </a>
            ))}
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600"/>
              </div>
              <h3 className="font-display font-bold text-slate-900 text-xl mb-2">¡Mensaje enviado!</h3>
              <p className="text-slate-500">Te contactaremos en menos de 24 horas hábiles.</p>
              <button onClick={() => setStatus('idle')} className="mt-5 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors">
                Enviar otro →
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 text-sm font-medium mb-1.5">Nombre completo *</label>
                  <input name="nombre" type="text" required value={form.nombre} onChange={onChange} placeholder="Tu nombre" className={INPUT}/>
                </div>
                <div>
                  <label className="block text-slate-600 text-sm font-medium mb-1.5">Correo electrónico *</label>
                  <input name="email" type="email" required value={form.email} onChange={onChange} placeholder="correo@empresa.com" className={INPUT}/>
                </div>
              </div>
              <div>
                <label className="block text-slate-600 text-sm font-medium mb-1.5">Empresa / Negocio</label>
                <input name="empresa" type="text" value={form.empresa} onChange={onChange} placeholder="Nombre de tu empresa (opcional)" className={INPUT}/>
              </div>
              <div>
                <label className="block text-slate-600 text-sm font-medium mb-1.5">¿Qué necesitas? *</label>
                <textarea name="mensaje" required rows={4} value={form.mensaje} onChange={onChange}
                  placeholder="Describe brevemente tu negocio y lo que quieres mejorar o construir..."
                  className={`${INPUT} resize-none`}/>
              </div>
              {status === 'error' && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{err}</p>}
              <button type="submit" disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all">
                {status === 'loading'
                  ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>Enviando...</>
                  : <>Enviar mensaje <ArrowRight className="w-4 h-4"/></>}
              </button>
              <p className="text-slate-400 text-xs text-center">Tu información es privada y confidencial.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

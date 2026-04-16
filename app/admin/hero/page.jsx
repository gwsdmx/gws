'use client'
import { useState, useEffect } from 'react'
import { Save, Upload } from 'lucide-react'
import { getClient } from '@/lib/supabase'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function HeroPage() {
  const [form,    setForm]    = useState({ title:'', subtitle:'', image_url:'' })
  const [file,    setFile]    = useState(null)
  const [saving,  setSaving]  = useState(false)
  const [loading, setLoading] = useState(true)
  const [msg,     setMsg]     = useState('')
  const [ok,      setOk]      = useState(false)
  const sb = getClient()

  useEffect(() => {
    async function load() {
      const { data } = await sb.from('hero').select('*').single()
      if (data) setForm({ title: data.title||'', subtitle: data.subtitle||'', image_url: data.image_url||'' })
      setLoading(false)
    }
    load()
  }, [])

  const save = async () => {
    setSaving(true); setMsg(''); setOk(false)
    try {
      let imageUrl = form.image_url
      if (file) {
        const path = `hero-${Date.now()}.${file.name.split('.').pop()}`
        const { error: upErr } = await sb.storage.from('media').upload(path, file, { upsert:true })
        if (upErr) throw upErr
        const { data } = sb.storage.from('media').getPublicUrl(path)
        imageUrl = data.publicUrl
      }
      const { data: existing } = await sb.from('hero').select('id').single()
      if (existing?.id) {
        const { error } = await sb.from('hero').update({ title:form.title, subtitle:form.subtitle, image_url:imageUrl }).eq('id', existing.id)
        if (error) throw error
      } else {
        const { error } = await sb.from('hero').insert([{ title:form.title, subtitle:form.subtitle, image_url:imageUrl }])
        if (error) throw error
      }
      setForm(f => ({ ...f, image_url: imageUrl })); setFile(null); setOk(true)
    } catch(e) { setMsg(e.message || 'Error al guardar.') }
    finally { setSaving(false) }
  }

  if (loading) return <div className="space-y-4">{[...Array(3)].map((_,i) => <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse"/>)}</div>

  return (
    <div>
      <div className="mb-7"><h1 className="font-display font-bold text-slate-900 text-2xl mb-0.5">Hero</h1><p className="text-slate-500 text-sm">Edita el texto e imagen principal del sitio.</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="font-display font-bold text-slate-900 text-base mb-5">Contenido del Hero</h2>
          <div className="space-y-4">
            <Input label="Título principal" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Sistemas que hacen crecer tu negocio"/>
            <Textarea label="Subtítulo" rows={3} value={form.subtitle} onChange={e=>setForm(f=>({...f,subtitle:e.target.value}))} placeholder="Descripción breve del servicio..."/>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Imagen principal</label>
              <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 file:text-xs file:font-semibold"/>
              <Input className="mt-2" value={form.image_url} onChange={e=>setForm(f=>({...f,image_url:e.target.value}))} placeholder="O pega una URL de imagen"/>
            </div>
            {msg && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{msg}</p>}
            {ok  && <p className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-xl px-4 py-3">✓ Guardado correctamente</p>}
            <Button onClick={save} disabled={saving} className="w-full">
              {saving ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>Guardando...</> : <><Save className="w-4 h-4"/>Guardar cambios</>}
            </Button>
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="font-display font-bold text-slate-900 text-base mb-4">Vista previa</h2>
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
            {form.image_url ? (
              <img src={form.image_url} alt="Hero preview" className="w-full aspect-video object-cover"/>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                <div className="text-center text-slate-400 px-6">
                  <Upload className="w-8 h-8 mx-auto mb-2 opacity-50"/>
                  <p className="text-sm">Sin imagen — se mostrará el dashboard por defecto</p>
                </div>
              </div>
            )}
            <div className="p-4">
              <h3 className="font-display font-bold text-slate-900 text-base mb-1">{form.title || 'Título del hero'}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{form.subtitle || 'Subtítulo del hero...'}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

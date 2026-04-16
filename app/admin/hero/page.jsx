'use client'
import { useState, useEffect } from 'react'
import { Save, Upload, X } from 'lucide-react'
import { getClient } from '@/lib/supabase'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function HeroPage() {
  const [form,    setForm]    = useState({ title:'', subtitle:'', image_url:'' })
  const [heroId,  setHeroId]  = useState(null)
  const [file,    setFile]    = useState(null)
  const [preview, setPreview] = useState(null)
  const [saving,  setSaving]  = useState(false)
  const [loading, setLoading] = useState(true)
  const [msg,     setMsg]     = useState('')
  const [ok,      setOk]      = useState(false)
  const sb = getClient()

  useEffect(() => {
    async function load() {
      const { data } = await sb.from('hero').select('*').single()
      if (data) {
        setForm({ title: data.title||'', subtitle: data.subtitle||'', image_url: data.image_url||'' })
        setHeroId(data.id)
      }
      setLoading(false)
    }
    load()
  }, [])

  // Preview local al seleccionar archivo
  const onFileChange = e => {
    const f = e.target.files?.[0] || null
    setFile(f)
    if (f) {
      const url = URL.createObjectURL(f)
      setPreview(url)
    }
  }

  const removeImage = () => {
    setFile(null)
    setPreview(null)
    setForm(f => ({ ...f, image_url: '' }))
  }

  const save = async () => {
    setSaving(true); setMsg(''); setOk(false)
    try {
      let imageUrl = form.image_url

      if (file) {
        const ext  = file.name.split('.').pop()
        const path = `hero-${Date.now()}.${ext}`
        const { error: upErr } = await sb.storage.from('media').upload(path, file, { upsert: true })
        if (upErr) throw upErr
        const { data } = sb.storage.from('media').getPublicUrl(path)
        imageUrl = data.publicUrl
      }

      const payload = {
        title:     form.title,
        subtitle:  form.subtitle,
        image_url: imageUrl,
      }

      if (heroId) {
        const { error } = await sb.from('hero').update(payload).eq('id', heroId)
        if (error) throw error
      } else {
        const { data, error } = await sb.from('hero').insert([payload]).select().single()
        if (error) throw error
        setHeroId(data.id)
      }

      setForm(f => ({ ...f, image_url: imageUrl }))
      setFile(null)
      setPreview(null)
      setOk(true)
      setTimeout(() => setOk(false), 3000)
    } catch(e) {
      setMsg(e.message || 'Error al guardar.')
    } finally {
      setSaving(false)
    }
  }

  const currentImage = preview || form.image_url || null

  if (loading) return (
    <div className="space-y-4">
      {[...Array(3)].map((_,i) => <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse"/>)}
    </div>
  )

  return (
    <div>
      <div className="mb-7">
        <h1 className="font-display font-bold text-slate-900 text-2xl mb-0.5">Hero</h1>
        <p className="text-slate-500 text-sm">Edita el texto e imagen principal del sitio.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <Card className="p-6">
          <h2 className="font-display font-bold text-slate-900 text-base mb-5">Contenido del Hero</h2>
          <div className="space-y-4">
            <Input
              label="Título principal"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Sistemas que hacen crecer tu negocio"
            />
            <Textarea
              label="Subtítulo"
              rows={3}
              value={form.subtitle}
              onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
              placeholder="Descripción breve del servicio..."
            />

            {/* Image upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Imagen principal</label>

              {currentImage ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 mb-3">
                  <img src={currentImage} alt="Hero" className="w-full h-40 object-cover"/>
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-colors"
                    title="Quitar imagen"
                  >
                    <X className="w-4 h-4"/>
                  </button>
                  {file && (
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">
                      Nueva imagen — sin guardar
                    </div>
                  )}
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-200 rounded-xl h-32 flex flex-col items-center justify-center text-slate-400 mb-3">
                  <Upload className="w-6 h-6 mb-1.5 opacity-50"/>
                  <span className="text-sm">Sin imagen seleccionada</span>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm
                  file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0
                  file:bg-blue-50 file:text-blue-600 file:text-xs file:font-semibold cursor-pointer"
              />
              <p className="text-slate-400 text-xs mt-1.5">O pega una URL directamente:</p>
              <Input
                className="mt-1.5"
                value={form.image_url}
                onChange={e => { setForm(f => ({ ...f, image_url: e.target.value })); setPreview(null); setFile(null) }}
                placeholder="https://..."
              />
            </div>

            {msg && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{msg}</p>}
            {ok  && <p className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-xl px-4 py-3">✓ Guardado — los cambios ya se ven en el sitio</p>}

            <Button onClick={save} disabled={saving} className="w-full">
              {saving
                ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>Guardando...</>
                : <><Save className="w-4 h-4"/>Guardar cambios</>
              }
            </Button>
          </div>
        </Card>

        {/* Preview */}
        <Card className="p-6">
          <h2 className="font-display font-bold text-slate-900 text-base mb-4">Vista previa</h2>
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
            {currentImage ? (
              <img src={currentImage} alt="Hero preview" className="w-full aspect-video object-cover"/>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                <div className="text-center text-slate-400 px-6">
                  <Upload className="w-8 h-8 mx-auto mb-2 opacity-50"/>
                  <p className="text-sm">Sin imagen — se mostrará el dashboard animado</p>
                </div>
              </div>
            )}
            <div className="p-4 border-t border-slate-100">
              <h3 className="font-display font-bold text-slate-900 text-base mb-1">
                {form.title || 'Título del hero'}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {form.subtitle || 'Subtítulo del hero...'}
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-blue-700 text-xs font-medium">
              💡 Los cambios se reflejan en el sitio inmediatamente después de guardar.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

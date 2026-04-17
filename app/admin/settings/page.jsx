'use client'
import { useState, useEffect } from 'react'
import { Save, Video, Share2, Check } from 'lucide-react'
import { getClient } from '@/lib/supabase'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const SOCIALS = [
  { key:'linkedin',  label:'LinkedIn',   placeholder:'https://linkedin.com/company/gws', color:'text-blue-600',  bg:'bg-blue-50',  border:'border-blue-200'  },
  { key:'instagram', label:'Instagram',  placeholder:'https://instagram.com/gwsmx',      color:'text-pink-600',  bg:'bg-pink-50',  border:'border-pink-200'  },
  { key:'facebook',  label:'Facebook',   placeholder:'https://facebook.com/gwsmx',       color:'text-blue-700',  bg:'bg-blue-50',  border:'border-blue-200'  },
  { key:'twitter',   label:'X / Twitter',placeholder:'https://x.com/gwsmx',              color:'text-zinc-800',  bg:'bg-zinc-50',  border:'border-zinc-200'  },
  { key:'tiktok',    label:'TikTok',     placeholder:'https://tiktok.com/@gwsmx',        color:'text-zinc-700',  bg:'bg-zinc-50',  border:'border-zinc-200'  },
  { key:'whatsapp',  label:'WhatsApp',   placeholder:'https://wa.me/527731387203',        color:'text-green-600', bg:'bg-green-50', border:'border-green-200' },
]

export default function SettingsPage() {
  const [videoUrl,  setVideoUrl]  = useState('')
  const [socials,   setSocials]   = useState({})
  const [videoFile, setVideoFile] = useState(null)
  const [saving,    setSaving]    = useState(false)
  const [ok,        setOk]        = useState('')
  const [msg,       setMsg]       = useState('')
  const sb = getClient()

  useEffect(() => {
    sb.from('settings').select('*').then(({ data }) => {
      const s = {}
      data?.forEach(r => { s[r.key] = r.value })
      setVideoUrl(s.video_url || '')
      const sc = {}
      SOCIALS.forEach(({ key }) => { sc[key] = s[`social_${key}`] || '' })
      setSocials(sc)
    })
  }, [])

  const upsert = async (key, value) => {
    const { data } = await sb.from('settings').select('key').eq('key', key).single()
    if (data) await sb.from('settings').update({ value }).eq('key', key)
    else       await sb.from('settings').insert([{ key, value }])
  }

  const saveVideo = async () => {
    setSaving(true); setMsg(''); setOk('')
    try {
      let url = videoUrl
      if (videoFile) {
        const path = `video-${Date.now()}.${videoFile.name.split('.').pop()}`
        const { error: upErr } = await sb.storage.from('media').upload(path, videoFile, { upsert:true })
        if (upErr) throw upErr
        const { data } = sb.storage.from('media').getPublicUrl(path)
        url = data.publicUrl
      }
      await upsert('video_url', url)
      setVideoUrl(url); setVideoFile(null); setOk('video')
      setTimeout(() => setOk(''), 3000)
    } catch(e) { setMsg(e.message||'Error al guardar.') }
    finally { setSaving(false) }
  }

  const saveSocials = async () => {
    setSaving(true); setMsg(''); setOk('')
    try {
      for (const [key, value] of Object.entries(socials)) {
        await upsert(`social_${key}`, value)
      }
      setOk('social'); setTimeout(() => setOk(''), 3000)
    } catch(e) { setMsg(e.message||'Error al guardar.') }
    finally { setSaving(false) }
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="font-display font-bold text-slate-900 text-2xl mb-0.5">Ajustes</h1>
        <p className="text-slate-500 text-sm">Video principal y redes sociales del sitio.</p>
      </div>

      <div className="space-y-6">

        {/* Video */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
              <Video className="w-5 h-5 text-violet-600"/>
            </div>
            <div>
              <h2 className="font-display font-bold text-slate-900 text-base">Video principal</h2>
              <p className="text-slate-400 text-xs">Sección "En acción" del sitio</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Subir video</label>
              <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files?.[0]||null)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-violet-50 file:text-violet-600 file:text-xs file:font-semibold"/>
            </div>
            <Input label="O pega una URL (YouTube, MP4...)" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..."/>
            {msg     && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{msg}</p>}
            {ok==='video' && <p className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-xl px-4 py-3">✓ Video guardado</p>}
            <Button onClick={saveVideo} disabled={saving} className="w-full sm:w-auto">
              {saving ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>Guardando...</> : <><Save className="w-4 h-4"/>Guardar video</>}
            </Button>
          </div>
        </Card>

        {/* Redes sociales */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center shrink-0">
              <Share2 className="w-5 h-5 text-pink-600"/>
            </div>
            <div>
              <h2 className="font-display font-bold text-slate-900 text-base">Redes sociales</h2>
              <p className="text-slate-400 text-xs">Aparecen en el footer del sitio. Deja vacío para ocultar.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {SOCIALS.map(({ key, label, placeholder, color, bg, border }) => (
              <div key={key}>
                <label className={`flex items-center gap-2 text-sm font-semibold mb-1.5 ${color}`}>
                  <span className={`w-5 h-5 rounded ${bg} ${border} border flex items-center justify-center text-[10px] font-black`}>
                    {label[0]}
                  </span>
                  {label}
                </label>
                <Input
                  value={socials[key] || ''}
                  onChange={e => setSocials(p => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
          {ok==='social' && <p className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-4">✓ Redes sociales guardadas</p>}
          <Button onClick={saveSocials} disabled={saving} className="w-full sm:w-auto">
            {saving ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>Guardando...</> : <><Save className="w-4 h-4"/>Guardar redes</>}
          </Button>
        </Card>

      </div>
    </div>
  )
}

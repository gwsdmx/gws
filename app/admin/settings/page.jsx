'use client'
import { useState, useEffect } from 'react'
import { Save, Video } from 'lucide-react'
import { getClient } from '@/lib/supabase'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function SettingsPage() {
  const [videoUrl, setVideoUrl] = useState('')
  const [file, setFile]         = useState(null)
  const [saving, setSaving]     = useState(false)
  const [ok, setOk]             = useState(false)
  const [msg, setMsg]           = useState('')
  const sb = getClient()

  useEffect(() => {
    async function load() {
      const { data } = await sb.from('settings').select('value').eq('key','video_url').single()
      if (data) setVideoUrl(data.value || '')
    }
    load()
  }, [])

  const save = async () => {
    setSaving(true); setMsg(''); setOk(false)
    try {
      let url = videoUrl
      if (file) {
        const path = `video-${Date.now()}.${file.name.split('.').pop()}`
        const { error: upErr } = await sb.storage.from('media').upload(path, file, { upsert:true })
        if (upErr) throw upErr
        const { data } = sb.storage.from('media').getPublicUrl(path)
        url = data.publicUrl
      }
      const { data: existing } = await sb.from('settings').select('key').eq('key','video_url').single()
      if (existing) {
        await sb.from('settings').update({ value: url }).eq('key','video_url')
      } else {
        await sb.from('settings').insert([{ key:'video_url', value:url }])
      }
      setVideoUrl(url); setFile(null); setOk(true)
    } catch(e) { setMsg(e.message || 'Error al guardar.') }
    finally { setSaving(false) }
  }

  return (
    <div>
      <div className="mb-7"><h1 className="font-display font-bold text-slate-900 text-2xl mb-0.5">Ajustes</h1><p className="text-slate-500 text-sm">Configura el video principal y otros ajustes globales.</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center"><Video className="w-5 h-5 text-violet-600"/></div>
            <div><h2 className="font-display font-bold text-slate-900 text-base">Video principal</h2><p className="text-slate-400 text-xs">Sección "En acción" del sitio</p></div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Subir video</label>
              <input type="file" accept="video/*" onChange={e=>setFile(e.target.files?.[0]||null)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-violet-50 file:text-violet-600 file:text-xs file:font-semibold"/>
            </div>
            <Input label="O pega una URL (YouTube, MP4, etc.)" value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..."/>
            {msg && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{msg}</p>}
            {ok  && <p className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-xl px-4 py-3">✓ Guardado correctamente</p>}
            <Button onClick={save} disabled={saving} className="w-full">
              {saving ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>Guardando...</> : <><Save className="w-4 h-4"/>Guardar</>}
            </Button>
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="font-display font-bold text-slate-900 text-base mb-4">Vista previa</h2>
          {videoUrl ? (
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video flex items-center justify-center">
              <div className="text-center text-slate-400"><Video className="w-10 h-10 mx-auto mb-2 opacity-50"/><p className="text-sm">Video configurado</p><p className="text-xs mt-1 opacity-60 break-all px-4">{videoUrl.slice(0,50)}{videoUrl.length>50?'...':''}</p></div>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-slate-200 aspect-video flex items-center justify-center text-slate-400">
              <div className="text-center"><Video className="w-8 h-8 mx-auto mb-2 opacity-40"/><p className="text-sm">Sin video</p></div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Image, Video, X, Check } from 'lucide-react'
import { getClient } from '@/lib/supabase'
import { getStorageUrl } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

const CATS = ['Retail','Médico','Eventos','Corporativo','E-Commerce','Gobierno','Otro']
const EMPTY = { title:'', description:'', category:'Retail', media_type:'image', media_url:'' }

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading]   = useState(true)
  const [form, setForm]         = useState(null) // null=closed, object=open
  const [saving, setSaving]     = useState(false)
  const [file, setFile]         = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [msg, setMsg]           = useState('')

  const sb = getClient()

  const load = async () => {
    const { data } = await sb.from('projects').select('*').order('created_at',{ascending:false})
    setProjects(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openNew  = ()  => { setForm({ ...EMPTY }); setFile(null); setMsg('') }
  const openEdit = (p) => { setForm({ ...p });    setFile(null); setMsg('') }
  const closeForm= ()  => { setForm(null); setFile(null); setMsg('') }

  const save = async () => {
    if (!form.title.trim() || !form.description.trim()) { setMsg('Completa los campos requeridos.'); return }
    setSaving(true); setMsg('')
    try {
      let mediaUrl = form.media_url

      // Upload file if selected
      if (file) {
        const ext  = file.name.split('.').pop()
        const path = `${Date.now()}.${ext}`
        const { error: upErr } = await sb.storage.from('media').upload(path, file)
        if (upErr) throw upErr
        const { data: urlData } = sb.storage.from('media').getPublicUrl(path)
        mediaUrl = urlData.publicUrl
      }

      const payload = { title: form.title, description: form.description, category: form.category, media_type: file?.type?.startsWith('video') ? 'video' : form.media_type, media_url: mediaUrl }

      if (form.id) {
        const { error } = await sb.from('projects').update(payload).eq('id', form.id)
        if (error) throw error
      } else {
        const { error } = await sb.from('projects').insert([payload])
        if (error) throw error
      }
      await load(); closeForm()
    } catch(e) { setMsg(e.message || 'Error al guardar.') }
    finally { setSaving(false) }
  }

  const del = async (id) => {
    if (!confirm('¿Eliminar este proyecto?')) return
    setDeleting(id)
    await sb.from('projects').delete().eq('id', id)
    await load(); setDeleting(null)
  }

  const CAT_COLOR = { Retail:'blue', Médico:'cyan', Eventos:'violet', Corporativo:'slate', 'E-Commerce':'green', Gobierno:'orange', Otro:'slate' }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div><h1 className="font-display font-bold text-slate-900 text-2xl mb-0.5">Proyectos</h1><p className="text-slate-500 text-sm">Gestiona los proyectos visibles en el sitio.</p></div>
        <Button onClick={openNew}><Plus className="w-4 h-4"/>Nuevo proyecto</Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_,i) => <div key={i} className="h-48 bg-slate-100 rounded-2xl animate-pulse"/>)}
        </div>
      ) : projects.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><Briefcase className="w-7 h-7 text-slate-400"/></div>
          <p className="font-display font-bold text-slate-700 text-base mb-1">Sin proyectos</p>
          <p className="text-slate-400 text-sm mb-4">Agrega el primer proyecto.</p>
          <Button onClick={openNew} size="sm"><Plus className="w-4 h-4"/>Crear proyecto</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => (
            <Card key={p.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-slate-50 relative">
                {p.media_url ? (
                  p.media_type === 'video' ? (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400"><Video className="w-8 h-8"/></div>
                  ) : (
                    <img src={p.media_url} alt={p.title} className="w-full h-full object-cover"/>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300"><Image className="w-8 h-8"/></div>
                )}
                <div className="absolute top-2 left-2"><Badge color={CAT_COLOR[p.category]||'blue'}>{p.category}</Badge></div>
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-slate-900 text-sm mb-1 line-clamp-1">{p.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3">{p.description}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(p)} className="flex-1"><Pencil className="w-3.5 h-3.5"/>Editar</Button>
                  <Button variant="danger" size="sm" onClick={() => del(p.id)} disabled={deleting===p.id}><Trash2 className="w-3.5 h-3.5"/></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal form */}
      {form && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl my-4">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="font-display font-bold text-slate-900">{form.id ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
              <button onClick={closeForm} className="text-slate-400 hover:text-slate-600 p-1"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-5 space-y-4">
              <Input label="Título *" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Nombre del proyecto"/>
              <Textarea label="Descripción *" rows={3} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} placeholder="Describe el proyecto brevemente"/>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Categoría</label>
                <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all">
                  {CATS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Archivo (imagen o video)</label>
                <input type="file" accept="image/*,video/*" onChange={e=>setFile(e.target.files?.[0]||null)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 file:text-xs file:font-semibold"/>
                {form.media_url && !file && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <Check className="w-3.5 h-3.5 text-green-500"/><span>Archivo actual: {form.media_url.split('/').pop()}</span>
                  </div>
                )}
              </div>
              <Input label="O pega una URL" value={form.media_url} onChange={e=>setForm(f=>({...f,media_url:e.target.value}))} placeholder="https://..."/>
              {msg && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{msg}</p>}
            </div>
            <div className="flex gap-3 p-5 border-t border-slate-100">
              <Button variant="secondary" className="flex-1" onClick={closeForm}>Cancelar</Button>
              <Button className="flex-1" onClick={save} disabled={saving}>
                {saving ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>Guardando...</> : <><Check className="w-4 h-4"/>Guardar</>}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

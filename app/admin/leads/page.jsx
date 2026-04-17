'use client'
import { useState, useEffect } from 'react'
import { Trash2, Mail, Search, RefreshCw, Download } from 'lucide-react'
import { getClient } from '@/lib/supabase'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function LeadsPage() {
  const [leads,    setLeads]    = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [deleting, setDeleting] = useState(null)
  const [selected, setSelected] = useState(null)
  const sb = getClient()

  const load = async () => {
    setLoading(true)
    const { data } = await sb.from('leads').select('*').order('created_at', { ascending:false })
    setLeads(data || [])
    setFiltered(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  useEffect(() => {
    if (!search.trim()) { setFiltered(leads); return }
    const q = search.toLowerCase()
    setFiltered(leads.filter(l =>
      l.nombre?.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q)  ||
      l.mensaje?.toLowerCase().includes(q)
    ))
  }, [search, leads])

  const del = async (id) => {
    if (!confirm('¿Eliminar este lead?')) return
    setDeleting(id)
    await sb.from('leads').delete().eq('id', id)
    if (selected?.id === id) setSelected(null)
    await load()
    setDeleting(null)
  }

  const exportCSV = () => {
    const rows = [['Nombre','Email','Mensaje','Fecha'],
      ...leads.map(l => [l.nombre, l.email, l.mensaje||'', new Date(l.created_at).toLocaleDateString('es-MX')])]
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const a = document.createElement('a')
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
    a.download = `leads-gws-${new Date().toISOString().slice(0,10)}.csv`
    a.click()
  }

  const fmt = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('es-MX', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="font-display font-bold text-slate-900 text-2xl mb-0.5">Leads</h1>
          <p className="text-slate-500 text-sm">{leads.length} solicitudes recibidas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading?'animate-spin':''}`}/>
            Actualizar
          </Button>
          <Button variant="secondary" size="sm" onClick={exportCSV} disabled={!leads.length}>
            <Download className="w-4 h-4"/>
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
        <input type="text" placeholder="Buscar por nombre, email o mensaje..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 items-start">

        {/* List */}
        <Card className="overflow-hidden">
          {loading ? (
            <div className="p-5 space-y-3">
              {[...Array(4)].map((_,i) => <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse"/>)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <Mail className="w-10 h-10 text-slate-300 mx-auto mb-3"/>
              <p className="font-display font-bold text-slate-500 text-base mb-1">
                {search ? 'Sin resultados' : 'Sin leads aún'}
              </p>
              <p className="text-slate-400 text-sm">
                {search ? 'Intenta con otros términos' : 'Los formularios completados aparecerán aquí'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtered.map(l => (
                <div key={l.id}
                  onClick={() => setSelected(l)}
                  className={`flex items-start gap-3 p-4 cursor-pointer transition-colors hover:bg-slate-50 ${selected?.id===l.id?'bg-blue-50 border-l-2 border-l-blue-500':''}`}>
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shrink-0 mt-0.5">
                    {l.nombre?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="font-semibold text-slate-900 text-sm truncate">{l.nombre}</span>
                      <span className="text-slate-400 text-[10px] shrink-0">{fmt(l.created_at)}</span>
                    </div>
                    <div className="text-slate-400 text-xs mb-1">{l.email}</div>
                    {l.mensaje && <p className="text-slate-500 text-xs line-clamp-1">{l.mensaje}</p>}
                  </div>
                  <button onClick={e => { e.stopPropagation(); del(l.id) }} disabled={deleting===l.id}
                    className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                    <Trash2 className="w-3.5 h-3.5"/>
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Detail panel */}
        {selected ? (
          <Card className="p-5 sticky top-6">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
                  {selected.nombre?.[0]?.toUpperCase() || '?'}
                </div>
                <div>
                  <div className="font-display font-bold text-slate-900 text-base">{selected.nombre}</div>
                  <div className="text-slate-400 text-xs">{fmt(selected.created_at)}</div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-300 hover:text-slate-500 text-lg leading-none">✕</button>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</div>
                <a href={`mailto:${selected.email}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                  {selected.email}
                </a>
              </div>

              {selected.mensaje && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Mensaje</div>
                  <p className="text-slate-700 text-sm leading-relaxed">{selected.mensaje}</p>
                </div>
              )}

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Fuente</div>
                <span className="text-slate-600 text-sm">{selected.source || 'landing'}</span>
              </div>

              <div className="flex gap-2 pt-1">
                <a href={`mailto:${selected.email}?subject=Re: Tu solicitud a GWS`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors">
                  <Mail className="w-4 h-4"/> Responder
                </a>
                <button onClick={() => del(selected.id)} disabled={deleting===selected.id}
                  className="px-3 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm rounded-xl border border-red-200 transition-colors">
                  <Trash2 className="w-4 h-4"/>
                </button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-8 text-center text-slate-400 sticky top-6">
            <Mail className="w-8 h-8 mx-auto mb-2 opacity-30"/>
            <p className="text-sm">Selecciona un lead para ver el detalle</p>
          </Card>
        )}
      </div>
    </div>
  )
}

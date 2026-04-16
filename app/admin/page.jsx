'use client'
import { useEffect, useState } from 'react'
import { Briefcase, Users, TrendingUp, Clock } from 'lucide-react'
import { getClient } from '@/lib/supabase'
import Card from '@/components/ui/Card'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects:0, leads:0 })
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const sb = getClient()
      const [projRes, leadsRes] = await Promise.all([
        sb.from('projects').select('id', { count:'exact' }),
        sb.from('leads').select('*').order('created_at', { ascending:false }).limit(5)
      ])
      setStats({ projects: projRes.count || 0, leads: leadsRes.data?.length || 0 })
      setLeads(leadsRes.data || [])
      setLoading(false)
    }
    load()
  }, [])

  const KPIS = [
    { label:'Proyectos activos', value: stats.projects, icon:Briefcase, color:'blue'  },
    { label:'Leads recientes',   value: stats.leads,    icon:Users,     color:'green' },
    { label:'Uptime',            value: '99.9%',        icon:TrendingUp,color:'violet'},
    { label:'Respuesta prom.',   value: '<24h',         icon:Clock,     color:'orange'},
  ]
  const CLR = { blue:'bg-blue-50 text-blue-600', green:'bg-green-50 text-green-600', violet:'bg-violet-50 text-violet-600', orange:'bg-orange-50 text-orange-600' }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-slate-900 text-2xl mb-1">Dashboard</h1>
        <p className="text-slate-500 text-sm">Bienvenido al panel de administración de GWS.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {KPIS.map(k => {
          const Icon = k.icon
          return (
            <Card key={k.label} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${CLR[k.color]}`}><Icon className="w-4 h-4"/></div>
              </div>
              <div className="font-display font-bold text-slate-900 text-2xl mb-0.5">{loading ? '–' : k.value}</div>
              <div className="text-slate-500 text-xs">{k.label}</div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-slate-900 text-base">Leads recientes</h2>
            <span className="text-xs text-slate-400">Últimos 5</span>
          </div>
          <div className="space-y-3">
            {leads.length === 0 && <p className="text-slate-400 text-sm">Sin leads aún.</p>}
            {leads.map(l => (
              <div key={l.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shrink-0">
                  {l.nombre?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 text-sm truncate">{l.nombre}</div>
                  <div className="text-slate-400 text-xs truncate">{l.email}</div>
                  {l.mensaje && <div className="text-slate-500 text-xs mt-1 line-clamp-1">{l.mensaje}</div>}
                </div>
                <div className="text-slate-300 text-[10px] shrink-0">{new Date(l.created_at).toLocaleDateString('es-MX')}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-display font-bold text-slate-900 text-base mb-4">Accesos rápidos</h2>
          <div className="space-y-2">
            {[
              { href:'/admin/projects', label:'Gestionar proyectos',     desc:'Crear, editar o eliminar proyectos', icon:Briefcase },
              { href:'/admin/hero',     label:'Editar Hero',             desc:'Cambiar título e imagen principal',  icon:TrendingUp},
              { href:'/admin/settings', label:'Ajustes del sitio',       desc:'Video principal y configuración',   icon:Clock     },
            ].map(item => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50 hover:border-blue-200 transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-200 transition-all">
                    <Icon className="w-4 h-4 text-slate-500 group-hover:text-blue-600"/>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm group-hover:text-blue-700">{item.label}</div>
                    <div className="text-slate-400 text-xs">{item.desc}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}

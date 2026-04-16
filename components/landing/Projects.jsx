'use client'
import { useState } from 'react'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import { Play, ExternalLink } from 'lucide-react'

const CATS = ['Todos','Retail','Médico','Eventos','Corporativo','E-Commerce']
const CAT_COLOR = { Retail:'blue', Médico:'cyan', Eventos:'violet', Corporativo:'slate', 'E-Commerce':'green' }

const DEFAULTS = [
  { id:1, title:'Sistema POS Multi-Sucursal',     description:'Punto de venta completo con inventario en tiempo real, reportes avanzados y gestión de múltiples sucursales para cadena de tiendas.',         category:'Retail',      media_type:'image', media_url:null },
  { id:2, title:'Plataforma Médica Integral',      description:'Expediente clínico digital, agenda de citas online, historial de pacientes y módulo de facturación para clínica especializada.',            category:'Médico',      media_type:'image', media_url:null },
  { id:3, title:'Sistema de Eventos & Check-in',   description:'Gestión completa de eventos corporativos con invitaciones QR, control de acceso en tiempo real y analítica de asistencia.',                category:'Eventos',     media_type:'image', media_url:null },
  { id:4, title:'ERP Corporativo',                 description:'Sistema de gestión empresarial con módulos de RRHH, contabilidad básica, proyectos y flujos de aprobación para empresa de 200+ empleados.', category:'Corporativo',  media_type:'image', media_url:null },
  { id:5, title:'Tienda en Línea Integrada',       description:'E-commerce conectado con inventario físico, múltiples métodos de pago, gestión de pedidos y panel de vendedor en tiempo real.',              category:'E-Commerce',  media_type:'image', media_url:null },
  { id:6, title:'App de Talleres Automotrices',    description:'Control de órdenes de servicio, catálogo de refacciones, historial por vehículo y reportes de productividad para red de talleres.',         category:'Corporativo',  media_type:'image', media_url:null },
]

function ProjectCard({ project }) {
  const color = CAT_COLOR[project.category] || 'blue'
  const isVideo = project.media_type === 'video'

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <div className="aspect-video bg-slate-50 relative overflow-hidden">
        {project.media_url ? (
          isVideo ? (
            <div className="relative w-full h-full">
              <video src={project.media_url} className="w-full h-full object-cover" muted loop poster=""/>
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-5 h-5 text-blue-600 ml-0.5"/>
                </div>
              </div>
            </div>
          ) : (
            <Image src={project.media_url} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
          )
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-2">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            </div>
            <span className="text-xs">Sin imagen</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge color={color}>{project.category}</Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{project.description}</p>
      </div>
    </div>
  )
}

export default function Projects({ projects }) {
  const [activeTab, setActiveTab] = useState('Todos')
  const data = projects?.length ? projects : DEFAULTS
  const filtered = activeTab === 'Todos' ? data : data.filter(p => p.category === activeTab)
  const usedCats = ['Todos', ...new Set(data.map(p => p.category))]

  return (
    <section id="proyectos" className="py-20 sm:py-24 px-5 sm:px-8 bg-slate-50 border-y border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Proyectos</span>
          <h2 className="font-display font-bold text-slate-900 mb-3" style={{fontSize:'clamp(26px,3.5vw,40px)'}}>Sistemas que ya están funcionando</h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">Cada proyecto es diferente. Aquí algunos ejemplos reales.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {usedCats.map(cat => (
            <button key={cat} onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab===cat ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-600'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <div key={p.id} className="animate-fade-up opacity-0" style={{animationDelay:`${i*80}ms`,animationFillMode:'forwards'}}>
              <ProjectCard project={p}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

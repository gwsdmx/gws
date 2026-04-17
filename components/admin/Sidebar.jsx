'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Briefcase, Layout, Settings, LogOut, Globe, Inbox } from 'lucide-react'
import { getClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const LINKS = [
  { href:'/admin',         label:'Dashboard', icon:LayoutDashboard },
  { href:'/admin/leads',   label:'Leads',     icon:Inbox           },
  { href:'/admin/projects',label:'Proyectos', icon:Briefcase       },
  { href:'/admin/hero',    label:'Hero',      icon:Layout          },
  { href:'/admin/settings',label:'Ajustes',   icon:Settings        },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router   = useRouter()

  const logout = async () => {
    const sb = getClient()
    await sb.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="w-60 bg-white border-r border-slate-200 flex flex-col min-h-screen shrink-0">
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center">
            <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/>
            </svg>
          </div>
          <div>
            <div className="font-display font-bold text-slate-900 text-sm">GWS</div>
            <div className="text-slate-400 text-xs">Panel Admin</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {LINKS.map(({ href, label, icon:Icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href}
              className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-blue-50 text-blue-700 border border-blue-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}>
              <Icon className="w-4 h-4 shrink-0"/>{label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-slate-100 space-y-1">
        <Link href="/" target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all">
          <Globe className="w-4 h-4"/><span>Ver sitio</span>
        </Link>
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
          <LogOut className="w-4 h-4"/><span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  )
}

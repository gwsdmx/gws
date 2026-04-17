'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Briefcase, Layout, Settings, LogOut, Globe, Inbox } from 'lucide-react'
import { getClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const LINKS = [
  { href:'/admin',          label:'Dashboard', icon:LayoutDashboard },
  { href:'/admin/leads',    label:'Leads',     icon:Inbox           },
  { href:'/admin/projects', label:'Proyectos', icon:Briefcase       },
  { href:'/admin/hero',     label:'Hero',      icon:Layout          },
  { href:'/admin/settings', label:'Ajustes',   icon:Settings        },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router   = useRouter()
  const logout = async () => {
    await getClient().auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="w-60 bg-white border-r border-slate-200 flex flex-col min-h-screen shrink-0">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-slate-100">
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-full">
            <Image
              src="/logo-light.png"
              alt="GWS"
              fill
              className="object-contain object-left"
            />
          </div>
        </Link>
        <p className="text-slate-400 text-[10px] font-semibold ml-0.5 mt-1">Panel Admin</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {LINKS.map(({ href, label, icon:Icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href}
              className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 border border-violet-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}>
              <Icon className="w-4 h-4 shrink-0"/>{label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-slate-100 space-y-1">
        <Link href="/" target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
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

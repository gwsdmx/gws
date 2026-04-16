'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const LINKS = [
  { href:'#servicios', label:'Servicios' },
  { href:'#proyectos', label:'Proyectos' },
  { href:'#proceso',   label:'Proceso'   },
  { href:'#nosotros',  label:'Nosotros'  },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm' : 'bg-white/80 backdrop-blur'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center">
            <svg width="15" height="15" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/>
            </svg>
          </div>
          <span className="font-display font-bold text-slate-900 text-lg tracking-tight">GWS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">{l.label}</a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="#contacto" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">Contacto</a>
          <a href="#contacto" className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-lg shadow-blue-600/20">
            Agenda una demo
          </a>
        </div>

        <button className="md:hidden text-slate-500 p-1" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-5 py-4 flex flex-col gap-2 shadow-lg">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className="text-slate-600 text-sm font-medium py-2.5 border-b border-slate-50" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="#contacto" className="mt-2 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl text-center" onClick={() => setOpen(false)}>
            Agenda una demo
          </a>
        </div>
      )}
    </header>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const LINKS = [
  { href:'#servicios', label:'Servicios'  },
  { href:'#demo',      label:'Demo'       },
  { href:'#proyectos', label:'Proyectos'  },
  { href:'#proceso',   label:'Proceso'    },
  { href:'#nosotros',  label:'Nosotros'   },
]

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm' : 'bg-white/90 backdrop-blur'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-44">
            <Image
              src="/logo-light.png"
              alt="GWS Global Web Solutions"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map(l => (
            <a key={l.href} href={l.href}
              className="px-3.5 py-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 text-sm font-medium transition-all">
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#contacto"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-sm font-black transition-all shadow-lg shadow-violet-500/25 hover:-translate-y-0.5">
            Quiero mi sistema →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-slate-500 p-1" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-5 py-4 flex flex-col gap-1 shadow-lg">
          {LINKS.map(l => (
            <a key={l.href} href={l.href}
              className="text-slate-600 text-sm font-medium py-3 border-b border-slate-50 hover:text-violet-700 transition-colors"
              onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contacto"
            className="mt-2 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-black rounded-xl text-center"
            onClick={() => setOpen(false)}>
            Quiero mi sistema →
          </a>
        </div>
      )}
    </header>
  )
}

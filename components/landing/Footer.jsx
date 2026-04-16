import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-950 px-5 sm:px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 pb-8 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center">
              <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/></svg>
            </div>
            <div>
              <div className="font-display font-bold text-white text-sm">GWS</div>
              <div className="text-slate-600 text-xs">Global Web Solutions</div>
            </div>
          </div>
          <nav className="flex flex-wrap gap-5">
            {['Servicios','Proyectos','Proceso','Nosotros','Contacto'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-slate-500 hover:text-white text-sm transition-colors">{l}</a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} GWS Global Web Solutions. Todos los derechos reservados.</span>
          <div className="flex items-center gap-4">
            <a href="mailto:gws.dmx@gmail.com" className="hover:text-slate-400 transition-colors">gws.dmx@gmail.com</a>
            <Link href="/admin" className="hover:text-slate-400 transition-colors">Admin ↗</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

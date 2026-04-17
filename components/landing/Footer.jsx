'use client'
import { useEffect, useState } from 'react'
import { getClient } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

function LinkedInIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> }
function InstagramIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> }
function FacebookIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> }
function TwitterIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> }
function TikTokIcon()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg> }
function WhatsAppIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg> }

const ICON_MAP = {
  linkedin:  { icon: LinkedInIcon,  label: 'LinkedIn',   base:'bg-blue-600  hover:bg-blue-700'   },
  instagram: { icon: InstagramIcon, label: 'Instagram',  base:'bg-gradient-to-br from-purple-600 to-pink-500 hover:opacity-90' },
  facebook:  { icon: FacebookIcon,  label: 'Facebook',   base:'bg-blue-700  hover:bg-blue-800'   },
  twitter:   { icon: TwitterIcon,   label: 'X / Twitter',base:'bg-zinc-800  hover:bg-zinc-700'   },
  tiktok:    { icon: TikTokIcon,    label: 'TikTok',     base:'bg-zinc-900  hover:bg-zinc-700'   },
  whatsapp:  { icon: WhatsAppIcon,  label: 'WhatsApp',   base:'bg-[#25D366] hover:bg-[#20bc5a]'  },
}

const NAV = ['Servicios','Demo','Proyectos','Proceso','Nosotros','Contacto']

export default function Footer() {
  const [socials, setSocials] = useState({})
  useEffect(() => {
    getClient().from('settings').select('*').then(({ data }) => {
      const s = {}; data?.forEach(r => { s[r.key] = r.value }); setSocials(s)
    })
  }, [])
  const activeSocials = Object.entries(ICON_MAP).filter(([k]) => socials[`social_${k}`])

  return (
    <footer className="bg-[#0f0a1e]">

      {/* Social band */}
      {activeSocials.length > 0 && (
        <div className="border-b border-white/8 py-12 px-5 sm:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-6">Síguenos</p>
            <div className="flex flex-wrap justify-center gap-3">
              {activeSocials.map(([key, { icon: Icon, label, base }]) => (
                <a key={key} href={socials[`social_${key}`]} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg ${base}`}>
                  <Icon />{label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 pb-8 border-b border-white/8">

          {/* Logo versión oscura */}
          <Link href="/" className="flex items-center">
            <div className="relative h-14 w-52">
              <Image
                src="/logo-dark.png"
                alt="GWS Global Web Solutions"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>

          <nav className="flex flex-wrap gap-5">
            {NAV.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-white/40 hover:text-white text-sm transition-colors">{l}</a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/25">
          <span>© {new Date().getFullYear()} GWS Global Web Solutions. Todos los derechos reservados.</span>
          <a href="mailto:gws.dmx@gmail.com" className="hover:text-white/50 transition-colors">gws.dmx@gmail.com</a>
        </div>
      </div>
    </footer>
  )
}

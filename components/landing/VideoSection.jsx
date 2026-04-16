'use client'
import { useState } from 'react'
import { Play, X } from 'lucide-react'

export default function VideoSection({ videoUrl }) {
  const [playing, setPlaying] = useState(false)
  const url = videoUrl || null
  const isYoutube = url?.includes('youtube.com') || url?.includes('youtu.be')

  return (
    <section className="py-20 sm:py-24 px-5 sm:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">En acción</span>
          <h2 className="font-display font-bold text-slate-900 mb-3" style={{fontSize:'clamp(26px,3.5vw,40px)'}}>Ve cómo funciona por dentro</h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">Un recorrido rápido por nuestros sistemas más utilizados.</p>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 aspect-video group cursor-pointer" onClick={() => setPlaying(true)}>
          {playing && url ? (
            isYoutube ? (
              <iframe src={url.replace('watch?v=','embed/')+'?autoplay=1'} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen/>
            ) : (
              <video src={url} className="w-full h-full object-cover" autoPlay controls/>
            )
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900/60"/>
              <div className="relative z-10 w-20 h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform mb-4">
                <Play className="w-8 h-8 text-blue-600 ml-1"/>
              </div>
              <p className="relative z-10 text-white/80 text-sm font-medium">
                {url ? 'Reproducir demo' : 'Video disponible próximamente'}
              </p>
              {/* Fake dashboard preview */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="w-3/4 h-3/4 bg-white/5 rounded-xl border border-white/10"/>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

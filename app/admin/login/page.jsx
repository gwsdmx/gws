'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getClient } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async e => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const sb = getClient()
      const { error } = await sb.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push('/admin')
    } catch(e) {
      setError(e.message || 'Credenciales incorrectas')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center px-5">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
        <div className="flex items-center gap-2.5 mb-7">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center">
            <svg width="15" height="15" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/></svg>
          </div>
          <div>
            <div className="font-display font-bold text-slate-900">GWS Admin</div>
            <div className="text-slate-400 text-xs">Panel de administración</div>
          </div>
        </div>
        <h1 className="font-display font-bold text-slate-900 text-xl mb-6">Iniciar sesión</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-600 text-sm font-medium mb-1.5">Correo electrónico</label>
            <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@gws.mx"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"/>
          </div>
          <div>
            <label className="block text-slate-600 text-sm font-medium mb-1.5">Contraseña</label>
            <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"/>
          </div>
          {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-600/20">
            {loading ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>Entrando...</> : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

import Navbar       from '@/components/landing/Navbar'
import Hero         from '@/components/landing/Hero'
import Services     from '@/components/landing/Services'
import Projects     from '@/components/landing/Projects'
import VideoSection from '@/components/landing/VideoSection'
import Process      from '@/components/landing/Process'
import Stats        from '@/components/landing/Stats'
import Testimonials from '@/components/landing/Testimonials'
import Contact      from '@/components/landing/Contact'
import Footer       from '@/components/landing/Footer'
import { createServerSupabase } from '@/lib/supabase-server'

async function getData() {
  try {
    const sb = createServerSupabase()
    const [heroRes, projectsRes, settingsRes] = await Promise.all([
      sb.from('hero').select('*').single(),
      sb.from('projects').select('*').order('created_at', { ascending:false }),
      sb.from('settings').select('*'),
    ])
    const settings = {}
    settingsRes.data?.forEach(s => { settings[s.key] = s.value })
    return { hero: heroRes.data, projects: projectsRes.data, settings }
  } catch { return { hero: null, projects: null, settings: {} } }
}

export default async function HomePage() {
  const { hero, projects, settings } = await getData()
  return (
    <main className="min-h-screen bg-white antialiased">
      <Navbar />
      <Hero data={hero} />
      <div className="h-px bg-slate-100" />
      <Services />
      <Projects projects={projects} />
      <VideoSection videoUrl={settings?.video_url} />
      <Process />
      <Stats />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}

export const revalidate = 0

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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white antialiased">
      <Navbar />
      <Hero />
      <div className="h-px bg-slate-100" />
      <Services />
      <Projects />
      <VideoSection />
      <Process />
      <Stats />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}

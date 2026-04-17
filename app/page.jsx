export const revalidate = 0
import Navbar          from '@/components/landing/Navbar'
import Hero            from '@/components/landing/Hero'
import Marquee         from '@/components/landing/Marquee'
import Services        from '@/components/landing/Services'
import DemoInteractiva from '@/components/landing/DemoInteractiva'
import Process         from '@/components/landing/Process'
import Stats           from '@/components/landing/Stats'
import Testimonials    from '@/components/landing/Testimonials'
import Contact         from '@/components/landing/Contact'
import Footer          from '@/components/landing/Footer'
import Projects        from '@/components/landing/Projects'
import VideoSection    from '@/components/landing/VideoSection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white antialiased">
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <DemoInteractiva />
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

import './globals.css'
export const metadata = {
  title: 'GWS — Global Web Solutions',
  description: 'Software a medida para negocios, clínicas, talleres, e-commerce y gobierno.',
  keywords: 'software a medida, desarrollo web, sistemas empresariales, México',
  openGraph: {
    title: 'GWS — Global Web Solutions',
    description: 'Sistemas que hacen crecer tu negocio.',
    type: 'website',
  },
}
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

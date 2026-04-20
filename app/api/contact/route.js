import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { nombre, email, telefono, mensaje } = await request.json()

    const body = `
Nuevo lead desde GWS Landing Page
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nombre:   ${nombre}
Correo:   ${email}
Teléfono: ${telefono || 'No proporcionado'}

Mensaje:
${mensaje}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Enviado desde gws-landing
    `.trim()

    // Using Resend API (free tier: 100 emails/day)
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from:    'GWS Leads <onboarding@resend.dev>',
        to:      ['gws.dmx@gmail.com'],
        subject: `Nuevo lead: ${nombre}`,
        text:    body,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return NextResponse.json({ ok: false }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Contact API error:', e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

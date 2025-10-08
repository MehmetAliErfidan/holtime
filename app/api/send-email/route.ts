// app/api/send-email/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      businessName,
      businessEmail,
      customerName,
      customerEmail,
      customerPhone,
      appointmentDate,
      appointmentTime,
      notes,
    } = body

    // Format tanggal
    const dateObj = new Date(appointmentDate)
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu']
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ]
    const formattedDate = `${days[dateObj.getDay()]}, ${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`

    // Email ke customer
    await resend.emails.send({
      from: 'HolTime <onboarding@resend.dev>',
      to: customerEmail,
      subject: `Janji Temu Dikonfirmasi - ${businessName}`,
      text: `
Halo ${customerName},

Janji temu Anda telah dikonfirmasi:

📅 Tanggal: ${formattedDate}
🕐 Jam: ${appointmentTime}
📍 Lokasi: ${businessName}

${notes ? `📝 Catatan Anda:\n${notes}\n\n` : ''}
Kami tunggu kedatangan Anda!

Terima kasih,
${businessName}
      `.trim(),
    })

    // Email ke business
    await resend.emails.send({
      from: 'HolTime <onboarding@resend.dev>',
      to: businessEmail,
      subject: `Janji Temu Baru - ${customerName}`,
      text: `
Janji temu baru diterima:

👤 Nama: ${customerName}
📧 Email: ${customerEmail}
📱 HP: ${customerPhone}
📅 Tanggal: ${formattedDate}
🕐 Jam: ${appointmentTime}

${notes ? `📝 Catatan pelanggan:\n${notes}\n\n` : ''}
Lihat di dashboard: https://holtime.com/dashboard/appointments
      `.trim(),
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
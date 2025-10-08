import { createClient } from '../../../../lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Cron secret key kontrolü (güvenlik)
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = await createClient()

    // Yarının tarihi
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().split('T')[0]

    console.log('Checking reminders for:', tomorrowStr)

    // Yarınki tüm confirmed randevuları bul (reminder_sent = false)
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select(`
        id,
        customer_name,
        customer_email,
        customer_phone,
        appointment_date,
        appointment_time,
        notes,
        business_id,
        businesses (
          name,
          phone,
          slug
        )
      `)
      .eq('appointment_date', tomorrowStr)
      .eq('status', 'confirmed')
      .eq('reminder_sent', false) as any

    if (error) {
      console.error('Query error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!appointments || appointments.length === 0) {
      console.log('No reminders to send')
      return NextResponse.json({ 
        success: true, 
        message: 'No reminders to send',
        count: 0 
      })
    }

    console.log(`Found ${appointments.length} appointments to remind`)

    // Her randevu için reminder gönder
    let successCount = 0
    let failCount = 0

    for (const apt of appointments) {
      try {
            const business = Array.isArray(apt.businesses) 
      ? apt.businesses[0] 
      : apt.businesses

        await sendReminderEmail({
          customerName: apt.customer_name,
          customerEmail: apt.customer_email,
          appointmentDate: apt.appointment_date,
          appointmentTime: apt.appointment_time,
          businessName: business.name,     // ← business (tekil)
      businessPhone: business.phone,   // ← business (tekil)
      businessSlug: business.slug,
          notes: apt.notes,
        })

        // reminder_sent = true yap
        await supabase
          .from('appointments')
          .update({ reminder_sent: true })
          .eq('id', apt.id)

        successCount++
        console.log(`Reminder sent: ${apt.customer_email}`)
      } catch (error) {
        console.error(`Failed to send reminder for ${apt.id}:`, error)
        failCount++
      }
    }

    return NextResponse.json({
      success: true,
      message: `Reminders processed`,
      total: appointments.length,
      sent: successCount,
      failed: failCount,
    })
  } catch (error: any) {
    console.error('Cron error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Reminder email gönderme
async function sendReminderEmail({
  customerName,
  customerEmail,
  appointmentDate,
  appointmentTime,
  businessName,
  businessPhone,
  businessSlug,
  notes,
}: {
  customerName: string
  customerEmail: string
  appointmentDate: string
  appointmentTime: string
  businessName: string
  businessPhone: string | null
  businessSlug: string
  notes: string | null
}) {
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    throw new Error('RESEND_API_KEY not found')
  }

  // Tarih formatla
  const formattedDate = new Date(appointmentDate + 'T00:00:00').toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const emailBody = `
Halo ${customerName},

Ini adalah pengingat untuk janji temu Anda besok:

📅 Tanggal: ${formattedDate}
🕐 Jam: ${appointmentTime}
📍 Lokasi: ${businessName}
${businessPhone ? `📞 Kontak: ${businessPhone}` : ''}

${notes ? `📝 Catatan Anda:\n${notes}\n\n` : ''}
Kami tunggu kedatangan Anda!

Jika ada perubahan, silakan hubungi kami.

Terima kasih,
${businessName}

---
Powered by HolTime
holtime.com/${businessSlug}
  `.trim()

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'HolTime <onboarding@resend.dev>',
      to: [customerEmail],
      subject: `Pengingat: Janji Temu Besok di ${businessName}`,
      text: emailBody,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Email failed: ${error}`)
  }
}
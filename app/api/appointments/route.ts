import { createClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      businessId,
      customerName,
      customerEmail,
      customerPhone,
      appointmentDate,
      appointmentTime,
      notes
    } = body

    // Validasyon
    if (!businessId || !customerName || !customerEmail || !customerPhone || 
        !appointmentDate || !appointmentTime) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // 1. Business bilgilerini çek (email gönderimi için)
    const { data: business } = await supabase
      .from('businesses')
      .select('name, email')
      .eq('id', businessId)
      .single()

    if (!business) {
      return NextResponse.json(
        { error: 'Business tidak ditemukan' },
        { status: 404 }
      )
    }

    // 2. Çift booking kontrolü (aynı saat dolu mu?)
    const { data: existingAppointment } = await supabase
      .from('appointments')
      .select('id')
      .eq('business_id', businessId)
      .eq('appointment_date', appointmentDate)
      .eq('appointment_time', appointmentTime)
      .eq('status', 'confirmed')
      .single()

    if (existingAppointment) {
      return NextResponse.json(
        { error: 'Maaf, jam ini sudah terisi. Pilih jam lain.' },
        { status: 409 }
      )
    }

    // 3. Appointment kaydet
    const { data: appointment, error: insertError } = await supabase
      .from('appointments')
      .insert({
        business_id: businessId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
        notes: notes || null,
        status: 'confirmed'
      })
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json(
        { error: 'Gagal membuat janji temu' },
        { status: 500 }
      )
    }

    // 4. Email gönder (async, hata olsa bile randevu kaydedilir)
    try {
      await sendBookingEmails({
        businessName: business.name,
        businessEmail: business.email,
        customerName,
        customerEmail,
        customerPhone,
        appointmentDate,
        appointmentTime,
        notes
      })
    } catch (emailError) {
      console.error('Email error (non-blocking):', emailError)
      // Email hatası randevu kaydını engellemesin
    }

    return NextResponse.json({
      success: true,
      message: 'Janji temu berhasil dibuat!',
      appointment
    })

  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

// Email gönderme fonksiyonu
async function sendBookingEmails({
  businessName,
  businessEmail,
  customerName,
  customerEmail,
  customerPhone,
  appointmentDate,
  appointmentTime,
  notes
}: {
  businessName: string
  businessEmail: string
  customerName: string
  customerEmail: string
  customerPhone: string
  appointmentDate: string
  appointmentTime: string
  notes?: string | null
}) {
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not found, skipping email')
    return
  }

  // Tarihi formatla (contoh: Kamis, 10 Oktober 2025)
  const formattedDate = new Date(appointmentDate + 'T00:00:00').toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  // 1. Email ke customer
  const customerEmailBody = `
Halo ${customerName},

Janji temu Anda telah dikonfirmasi:

📅 Tanggal: ${formattedDate}
🕐 Jam: ${appointmentTime}
📍 Lokasi: ${businessName}

${notes ? `📝 Catatan Anda:\n${notes}\n\n` : ''}
Kami tunggu kedatangan Anda!

Terima kasih,
${businessName}
  `.trim()

  // 2. Email ke business
  const businessEmailBody = `
Janji temu baru diterima:

👤 Nama: ${customerName}
📧 Email: ${customerEmail}
📱 HP/WhatsApp: ${customerPhone}
📅 Tanggal: ${formattedDate}
🕐 Jam: ${appointmentTime}

${notes ? `📝 Catatan pelanggan:\n${notes}\n\n` : ''}
Lihat di dashboard: ${process.env.NEXT_PUBLIC_APP_URL || 'https://holtime.com'}/dashboard/appointments
  `.trim()

  // Resend API call
  const responses = await Promise.allSettled([
    // Customer email
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Holtime <onboarding@resend.dev>',
        to: [customerEmail],
        subject: `Janji Temu Dikonfirmasi - ${businessName}`,
        text: customerEmailBody
      })
    }),
    // Business email
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Holtime <onboarding@resend.dev>',
        to: [businessEmail],
        subject: `Janji Temu Baru - ${customerName}`,
        text: businessEmailBody
      })
    })
  ])

  // Log hasil
  responses.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Email ${index + 1} sent successfully`)
    } else {
      console.error(`Email ${index + 1} failed:`, result.reason)
    }
  })
}
import { createClient } from '../../../../lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    // Verify current password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email!,
      password: currentPassword,
    })

    if (signInError) {
      return NextResponse.json(
        { error: 'Password saat ini salah' },
        { status: 400 }
      )
    }

    // Update password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json(
        { error: 'Gagal mengubah password' },
        { status: 500 }
      )
    }

    // Send confirmation email
    try {
      await sendPasswordChangeEmail(user.email!)
    } catch (emailError) {
      console.error('Email error (non-blocking):', emailError)
      // Email gagal tidak menghalangi password change
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Email gönderme fonksiyonu
async function sendPasswordChangeEmail(email: string) {
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not found, skipping email')
    return
  }

  const emailBody = `
Halo,

Password akun HolTime Anda baru saja diubah pada ${new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}.

Jika Anda tidak melakukan perubahan ini, segera hubungi kami atau ubah password Anda kembali.

Salam,
Tim HolTime
  `.trim()

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'HolTime <onboarding@resend.dev>',
      to: [email],
      subject: 'Password Anda Telah Diubah - HolTime',
      text: emailBody
    })
  })
}
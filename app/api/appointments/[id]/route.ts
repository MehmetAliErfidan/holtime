import { createClient } from '../../../../lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { id } = await params
    
    // Auth kontrolü
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { status } = body

    // Appointment'ı güncelle
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id)
      .eq('business_id', user.id) // Sadece kendi randevusunu iptal edebilir

    if (error) {
      console.error('Update error:', error)
      return NextResponse.json({ error: 'Gagal memperbarui' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
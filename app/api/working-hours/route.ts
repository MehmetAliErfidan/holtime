import { createClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Kullanıcı kontrolü
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { workingHours, slotDuration } = body

    // Business ID'yi al
    const { data: business } = await supabase
      .from('businesses')
      .select('id')
      .eq('email', user.email)
      .single()

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    // 1. Önce mevcut working hours'ları sil
    await supabase
      .from('working_hours')
      .delete()
      .eq('business_id', business.id)

    // 2. Yeni working hours'ları ekle (sadece aktif olanlar)
    const activeHours = workingHours
      .filter((wh: any) => wh.is_active)
      .map((wh: any) => ({
        business_id: business.id,
        day_of_week: wh.day_of_week,
        start_time: wh.start_time,
        end_time: wh.end_time,
        is_active: true
      }))

    if (activeHours.length > 0) {
      const { error: insertError } = await supabase
        .from('working_hours')
        .insert(activeHours)

      if (insertError) {
        console.error('Insert error:', insertError)
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }
    }

    // 3. Slot duration güncelle (businesses tablosunda)
    if (slotDuration) {
      await supabase
        .from('businesses')
        .update({ slot_duration: slotDuration })
        .eq('id', business.id)
    }

    return NextResponse.json({ success: true, message: 'Jam kerja berhasil disimpan!' })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Business bilgilerini al
    const { data: business } = await supabase
      .from('businesses')
      .select('id, slot_duration')
      .eq('email', user.email)
      .single()

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    // Working hours'ları çek
    const { data: workingHours } = await supabase
      .from('working_hours')
      .select('*')
      .eq('business_id', business.id)
      .order('day_of_week', { ascending: true })

    return NextResponse.json({ 
      workingHours: workingHours || [],
      slotDuration: business.slot_duration || 30
    })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
import { createClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const businessId = searchParams.get('businessId')
    const date = searchParams.get('date')

    if (!businessId || !date) {
      return NextResponse.json(
        { error: 'Missing parameters' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // O tarihteki tüm randevuları çek
    const { data: appointments } = await supabase
      .from('appointments')
      .select('appointment_time')
      .eq('business_id', businessId)
      .eq('appointment_date', date)
      .eq('status', 'confirmed') // Sadece confirmed olanlar

    const bookedTimes = appointments?.map(apt => apt.appointment_time) || []

    return NextResponse.json({ bookedTimes })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
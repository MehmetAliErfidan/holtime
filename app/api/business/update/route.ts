// app/api/business/update/route.ts (düzeltilmiş)
import { NextResponse } from 'next/server'
import { createClient } from '../../../../lib/supabase-server'

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, phone, description, slug } = body

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Nama dan slug harus diisi' },
        { status: 400 }
      )
    }

    // Önce mevcut business'i bul
    const { data: currentBusiness } = await supabase
      .from('businesses')
      .select('id, slug')
      .eq('email', user.email)
      .single()

    if (!currentBusiness) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      )
    }

    // Slug unique check (kendi slug'ı hariç)
    const { data: existingBusiness } = await supabase
      .from('businesses')
      .select('id')
      .eq('slug', slug)
      .neq('id', currentBusiness.id)
      .single()

    if (existingBusiness) {
      return NextResponse.json(
        { error: 'Link booking ini sudah digunakan, pilih yang lain' },
        { status: 400 }
      )
    }

    // Update business
    const { error: updateError } = await supabase
      .from('businesses')
      .update({ name, phone, description, slug })
      .eq('id', currentBusiness.id)

    if (updateError) {
      console.error('Update error:', updateError)
      throw new Error('Gagal menyimpan ke database')
    }

    return NextResponse.json({
      success: true,
      message: 'Perubahan berhasil disimpan',
    })
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
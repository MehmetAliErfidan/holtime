import { createClient } from '../../../../lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, phone, description, slug } = body

    // Slug validation
    if (slug) {
      const slugRegex = /^[a-z0-9-]+$/
      if (!slugRegex.test(slug)) {
        return NextResponse.json(
          { error: 'Slug tidak valid' },
          { status: 400 }
        )
      }

      // Check slug uniqueness
      const { data: existingBusiness } = await supabase
        .from('businesses')
        .select('id')
        .eq('slug', slug)
        .neq('id', user.id)
        .single()

      if (existingBusiness) {
        return NextResponse.json(
          { error: 'Slug sudah digunakan' },
          { status: 409 }
        )
      }
    }

    // Update business
    const { error: updateError } = await supabase
      .from('businesses')
      .update({
        name,
        phone,
        description,
        slug,
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json(
        { error: 'Gagal menyimpan perubahan' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
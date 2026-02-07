import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getSupabaseAdmin } from '@/lib/supabase-server'

const BUCKET = 'catalog-images'
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return NextResponse.json(
      { error: 'Upload not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.' },
      { status: 503 }
    )
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    if (!file || !file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
    }

    const ext = file.name.split('.').pop() || 'jpg'
    const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const buffer = Buffer.from(await file.arrayBuffer())

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(name, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error('[upload]', error)
      return NextResponse.json(
        { error: error.message || 'Upload failed' },
        { status: 500 }
      )
    }

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path)
    return NextResponse.json({ url: urlData.publicUrl })
  } catch (e) {
    console.error('[upload]', e)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

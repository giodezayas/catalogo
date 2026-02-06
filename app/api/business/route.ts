import { NextRequest, NextResponse } from 'next/server'
import { readBusiness, writeBusiness } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

// Forzar que esta ruta sea dinámica (no estática)
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const business = await readBusiness()
    return NextResponse.json(business)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[API business GET]', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: process.env.VERCEL || process.env.NODE_ENV === 'development' ? message : undefined,
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const business = await request.json()
    await writeBusiness(business)
    return NextResponse.json({ success: true, business })
  } catch (error: any) {
    console.error('Error writing business:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error?.message || 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    )
  }
}

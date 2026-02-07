import { NextRequest, NextResponse } from 'next/server'
import { readProducts, writeProducts } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { Product } from '@/types'

const DEFAULT_LIMIT = 24
const MAX_LIMIT = 100

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // ?id=xxx → un solo producto (para edición, incluye imágenes)
    const singleId = searchParams.get('id')
    if (singleId) {
      const products = await readProducts()
      const p = products.find((x) => x.id === singleId)
      if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      return NextResponse.json(p)
    }

    // ?all=1 → array completo. ?lite=1 elimina imágenes (admin listado/estadísticas)
    if (searchParams.get('all') === '1') {
      let products = await readProducts()
      if (searchParams.get('lite') === '1') {
        products = products.map(({ images, ...rest }) => ({ ...rest, images: [] }))
      }
      return NextResponse.json(products)
    }

    const categoryId = searchParams.get('categoryId') ?? undefined
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
    const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(searchParams.get('limit') ?? String(DEFAULT_LIMIT), 10)))
    const offset = (page - 1) * limit

    let products = await readProducts()
    products = products.filter((p) => p.status === 'active')

    if (categoryId && categoryId !== 'all') {
      products = products.filter((p) => p.categoryId === categoryId)
    }

    const total = products.length
    const items = products.slice(offset, offset + limit)

    const res = NextResponse.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
    // Cache en CDN 60s para reducir carga en DB
    res.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120')
    return res
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[API products GET]', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: process.env.VERCEL || process.env.NODE_ENV === 'development' ? message : undefined,
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const product: Product = await request.json()
    const products = await readProducts()

    // Generate ID if not provided
    if (!product.id) {
      product.id = Date.now().toString()
    }

    products.push(product)
    await writeProducts(products)
    return NextResponse.json({ success: true, product })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[API products POST]', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { message }),
        ...(process.env.VERCEL && { message }),
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
    const updatedProduct: Product = await request.json()
    const products = await readProducts()
    const index = products.findIndex((p) => p.id === updatedProduct.id)

    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    products[index] = updatedProduct
    await writeProducts(products)
    return NextResponse.json({ success: true, product: updatedProduct })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[API products PUT]', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { message }),
        ...(process.env.VERCEL && { message }),
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const products = await readProducts()
    const filtered = products.filter((p) => p.id !== id)
    await writeProducts(filtered)
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[API products DELETE]', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { message }),
        ...(process.env.VERCEL && { message }),
      },
      { status: 500 }
    )
  }
}

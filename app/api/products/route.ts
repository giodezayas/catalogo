import { NextRequest, NextResponse } from 'next/server'
import { readProducts, writeProducts } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { Product } from '@/types'

export async function GET() {
  const products = await readProducts()
  return NextResponse.json(products)
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
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
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
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
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
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

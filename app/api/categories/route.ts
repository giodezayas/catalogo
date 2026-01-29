import { NextRequest, NextResponse } from 'next/server'
import { readCategories, writeCategories } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { Category } from '@/types'

export async function GET() {
  const categories = readCategories()
  return NextResponse.json(categories)
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const category: Category = await request.json()
    const categories = readCategories()
    
    // Generate ID if not provided
    if (!category.id) {
      category.id = Date.now().toString()
    }

    categories.push(category)
    writeCategories(categories)
    return NextResponse.json({ success: true, category })
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
    const updatedCategory: Category = await request.json()
    const categories = readCategories()
    const index = categories.findIndex((c) => c.id === updatedCategory.id)

    if (index === -1) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    categories[index] = updatedCategory
    writeCategories(categories)
    return NextResponse.json({ success: true, category: updatedCategory })
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

    const categories = readCategories()
    const filtered = categories.filter((c) => c.id !== id)
    writeCategories(filtered)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

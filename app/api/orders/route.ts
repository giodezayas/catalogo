import { NextRequest, NextResponse } from 'next/server'
import { readOrders, writeOrders } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { Order } from '@/types'

export async function GET() {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const orders = await readOrders()
  return NextResponse.json(orders)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const order: Order = {
      ...body,
      id: body.id || Date.now().toString(),
      createdAt: body.createdAt ? new Date(body.createdAt) : new Date(),
    }

    const orders = await readOrders()
    orders.push(order)
    await writeOrders(orders)
    return NextResponse.json({ success: true, order })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[API orders POST]', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        ...(process.env.VERCEL || process.env.NODE_ENV === 'development' ? { message } : {}),
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
    const updatedOrder: Order = await request.json()
    const orders = await readOrders()
    const index = orders.findIndex((o) => o.id === updatedOrder.id)

    if (index === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    orders[index] = updatedOrder
    await writeOrders(orders)
    return NextResponse.json({ success: true, order: updatedOrder })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { readOrders, writeOrders } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { Order } from '@/types'

export async function GET() {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const orders = readOrders()
  return NextResponse.json(orders)
}

export async function POST(request: NextRequest) {
  try {
    const order: Order = await request.json()
    const orders = readOrders()

    // Generate ID if not provided
    if (!order.id) {
      order.id = Date.now().toString()
    }

    order.createdAt = new Date()
    orders.push(order)
    writeOrders(orders)
    return NextResponse.json({ success: true, order })
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
    const updatedOrder: Order = await request.json()
    const orders = readOrders()
    const index = orders.findIndex((o) => o.id === updatedOrder.id)

    if (index === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    orders[index] = updatedOrder
    writeOrders(orders)
    return NextResponse.json({ success: true, order: updatedOrder })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

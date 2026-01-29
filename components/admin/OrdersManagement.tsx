'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Order } from '@/types'
import toast from 'react-hot-toast'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    try {
      const data = await api.getOrders()
      // Sort by date, newest first
      const sorted = data.sort(
        (a: Order, b: Order) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      setOrders(sorted)
    } catch (error) {
      toast.error('Error al cargar pedidos')
    } finally {
      setLoading(false)
    }
  }

  async function updateOrderStatus(orderId: string, status: Order['status']) {
    try {
      const order = orders.find((o) => o.id === orderId)
      if (!order) return

      await api.updateOrder({ ...order, status })
      toast.success('Estado actualizado')
      loadOrders()
    } catch (error) {
      toast.error('Error al actualizar')
    }
  }

  function getStatusColor(status: Order['status']) {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  function getStatusIcon(status: Order['status']) {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Cargando...</div>
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Pedidos</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No hay pedidos aún
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">
                      Pedido #{order.id.slice(-6)}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status === 'pending' && 'Pendiente'}
                      {order.status === 'confirmed' && 'Confirmado'}
                      {order.status === 'completed' && 'Completado'}
                      {order.status === 'cancelled' && 'Cancelado'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString('es-MX')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Cliente</p>
                  <p className="font-medium text-gray-900">{order.customerName}</p>
                  <p className="text-gray-600">{order.customerPhone}</p>
                </div>
                <div>
                  <p className="text-gray-500">Entrega</p>
                  <p className="font-medium text-gray-900">
                    {order.deliveryType === 'pickup'
                      ? 'Recoger en tienda'
                      : `Envío a domicilio${order.deliveryZone ? ` - ${order.deliveryZone}` : ''}`}
                  </p>
                  {order.deliveryAddress && (
                    <p className="text-gray-600">{order.deliveryAddress}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500">Pago</p>
                  <p className="font-medium text-gray-900">{order.paymentMethod}</p>
                  {order.cashAmount && (
                    <p className="text-gray-600">Con: ${order.cashAmount.toFixed(2)}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Productos:</p>
                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.quantity}x {item.productName}
                        {item.variantName && ` (${item.variantName})`}
                      </span>
                      <span className="text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                {order.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'confirmed')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                    >
                      Cancelar
                    </button>
                  </>
                )}
                {order.status === 'confirmed' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'completed')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    Marcar como Completado
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

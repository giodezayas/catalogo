import { Order, Business } from '@/types'

export function generateWhatsAppMessage(order: Order, business: Business): string {
  const itemsText = order.items
    .map(
      (item) =>
        `• ${item.quantity}x ${item.productName}${item.variantName ? ` (${item.variantName})` : ''} - $${item.price.toFixed(2)}`
    )
    .join('\n')

  const deliveryText =
    order.deliveryType === 'pickup'
      ? 'Recoger en tienda'
      : `Envío a domicilio${order.deliveryZone ? ` - ${order.deliveryZone}` : ''}${order.deliveryPrice ? ` (+$${order.deliveryPrice.toFixed(2)})` : ''}`

  const addressText = order.deliveryAddress ? `\n📍 Dirección: ${order.deliveryAddress}` : ''

  const cashText =
    order.paymentMethod === 'Efectivo' && order.cashAmount
      ? `\n💰 Monto con el que pagará: $${order.cashAmount.toFixed(2)}`
      : ''

  const message = `🛒 *Nuevo Pedido*

👤 *Cliente:*
${order.customerName}
📞 Teléfono: ${order.customerPhone}

📦 *Productos:*
${itemsText}

${deliveryText}${addressText}

💳 *Pago:*
${order.paymentMethod}${cashText}

💰 *Subtotal:* $${order.subtotal.toFixed(2)}
💰 *Total:* $${order.total.toFixed(2)}

_Generado el ${new Date(order.createdAt).toLocaleString('es-MX')}_`

  return message
}

export function openWhatsApp(phone: string, message: string) {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`
  window.open(whatsappUrl, '_blank')
}

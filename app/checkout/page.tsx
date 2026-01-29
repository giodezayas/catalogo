'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { api } from '@/lib/api'
import { generateWhatsAppMessage, openWhatsApp } from '@/lib/whatsapp'
import { Order } from '@/types'
import toast from 'react-hot-toast'

type Step = 'customer' | 'delivery' | 'payment' | 'confirm'

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const getSubtotal = useCartStore((state) => state.getSubtotal)
  const clearCart = useCartStore((state) => state.clearCart)
  const [business, setBusiness] = useState<any>(null)

  useEffect(() => {
    api.getBusiness().then(setBusiness).catch(console.error)
  }, [])

  const [step, setStep] = useState<Step>('customer')
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    deliveryType: 'pickup' as 'pickup' | 'delivery',
    deliveryZone: '',
    deliveryAddress: '',
    deliveryReferences: '',
    paymentMethod: 'Efectivo',
    cashAmount: '',
  })

  const subtotal = getSubtotal()
  const deliveryPrice =
    formData.deliveryType === 'delivery' && formData.deliveryZone
      ? business?.deliveryZones?.find((z: any) => z.id === formData.deliveryZone)?.price || 0
      : 0
  const total = subtotal + deliveryPrice

  const handleNext = () => {
    if (step === 'customer') {
      if (!formData.customerName || !formData.customerPhone) {
        toast.error('Por favor completa todos los campos')
        return
      }
      setStep('delivery')
    } else if (step === 'delivery') {
      if (formData.deliveryType === 'delivery' && !formData.deliveryAddress) {
        toast.error('Por favor ingresa la dirección de entrega')
        return
      }
      setStep('payment')
    } else if (step === 'payment') {
      if (formData.paymentMethod === 'Efectivo' && !formData.cashAmount) {
        toast.error('Por favor ingresa el monto con el que pagarás')
        return
      }
      setStep('confirm')
    }
  }

  const handleBack = () => {
    if (step === 'delivery') {
      setStep('customer')
    } else if (step === 'payment') {
      setStep('delivery')
    } else if (step === 'confirm') {
      setStep('payment')
    }
  }

  const handleSubmit = async () => {
    const order: Order = {
      id: Date.now().toString(),
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      deliveryType: formData.deliveryType,
      deliveryAddress: formData.deliveryType === 'delivery' ? formData.deliveryAddress : undefined,
      deliveryZone:
        formData.deliveryType === 'delivery' && formData.deliveryZone
          ? business?.deliveryZones?.find((z: any) => z.id === formData.deliveryZone)?.name
          : undefined,
      deliveryPrice: formData.deliveryType === 'delivery' ? deliveryPrice : undefined,
      paymentMethod: formData.paymentMethod,
      cashAmount: formData.paymentMethod === 'Efectivo' ? parseFloat(formData.cashAmount) : undefined,
      items,
      subtotal,
      total,
      createdAt: new Date(),
      status: 'pending',
    }

    if (!business) return
    
    try {
      // Save order to backend
      await api.createOrder(order)
      
      const message = generateWhatsAppMessage(order, business)
      openWhatsApp(business.whatsapp, message)
      clearCart()
      toast.success('Pedido enviado a WhatsApp')
      router.push('/')
    } catch (error) {
      console.error('Error creating order:', error)
      toast.error('Error al guardar el pedido. Intenta de nuevo.')
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Tu carrito está vacío</p>
          <button
            onClick={() => router.push('/')}
            className="text-gray-900 font-medium hover:underline"
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {step !== 'customer' && (
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}
              <h1 className="text-xl font-semibold text-gray-900">
                {step === 'customer' && 'Tus datos'}
                {step === 'delivery' && 'Entrega'}
                {step === 'payment' && 'Pago'}
                {step === 'confirm' && 'Confirmar pedido'}
              </h1>
            </div>
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 'customer' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="10 dígitos"
                    maxLength={10}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {step === 'delivery' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label
                    onClick={() => setFormData({ ...formData, deliveryType: 'pickup' })}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.deliveryType === 'pickup'
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      checked={formData.deliveryType === 'pickup'}
                      onChange={() => setFormData({ ...formData, deliveryType: 'pickup' })}
                      className="w-4 h-4 text-gray-900"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Recoger en tienda</div>
                      <div className="text-sm text-gray-500">Gratis</div>
                    </div>
                  </label>

                  <label
                    onClick={() => setFormData({ ...formData, deliveryType: 'delivery' })}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.deliveryType === 'delivery'
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      checked={formData.deliveryType === 'delivery'}
                      onChange={() => setFormData({ ...formData, deliveryType: 'delivery' })}
                      className="w-4 h-4 text-gray-900"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Envío a domicilio</div>
                      <div className="text-sm text-gray-500">Desde $50.00</div>
                    </div>
                  </label>
                </div>

                {formData.deliveryType === 'delivery' && (
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Zona
                      </label>
                      <select
                        value={formData.deliveryZone}
                        onChange={(e) => setFormData({ ...formData, deliveryZone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      >
                        <option value="">Selecciona una zona</option>
                        {business?.deliveryZones?.map((zone: any) => (
                          <option key={zone.id} value={zone.id}>
                            {zone.name} - ${zone.price.toFixed(2)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección
                      </label>
                      <textarea
                        value={formData.deliveryAddress}
                        onChange={(e) =>
                          setFormData({ ...formData, deliveryAddress: e.target.value })
                        }
                        placeholder="Calle, número, colonia"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Referencias
                      </label>
                      <textarea
                        value={formData.deliveryReferences}
                        onChange={(e) =>
                          setFormData({ ...formData, deliveryReferences: e.target.value })
                        }
                        placeholder="Puntos de referencia (opcional)"
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-4">
                {business?.paymentMethods
                  ?.filter((method: any) => method.enabled)
                  .map((method: any) => (
                    <label
                      key={method.id}
                      onClick={() => setFormData({ ...formData, paymentMethod: method.name })}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.paymentMethod === method.name
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        checked={formData.paymentMethod === method.name}
                        onChange={() => setFormData({ ...formData, paymentMethod: method.name })}
                        className="w-4 h-4 text-gray-900"
                      />
                      <span className="font-medium text-gray-900">{method.name}</span>
                    </label>
                  ))}

                {formData.paymentMethod === 'Efectivo' && (
                  <div className="pt-4 border-t border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ¿Con cuánto pagas? (para darte cambio)
                    </label>
                    <input
                      type="number"
                      value={formData.cashAmount}
                      onChange={(e) => setFormData({ ...formData, cashAmount: e.target.value })}
                      placeholder="Monto"
                      min={total}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            )}

            {step === 'confirm' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Cliente</span>
                    <p className="font-medium text-gray-900">{formData.customerName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Teléfono</span>
                    <p className="font-medium text-gray-900">{formData.customerPhone}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Entrega</span>
                    <p className="font-medium text-gray-900">
                      {formData.deliveryType === 'pickup'
                        ? 'Recoger en tienda'
                        : `Envío a domicilio${formData.deliveryZone ? ` - ${business?.deliveryZones?.find((z: any) => z.id === formData.deliveryZone)?.name}` : ''}`}
                    </p>
                  </div>
                  {formData.deliveryType === 'delivery' && formData.deliveryAddress && (
                    <div>
                      <span className="text-sm text-gray-500">Dirección</span>
                      <p className="font-medium text-gray-900">{formData.deliveryAddress}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-gray-500">Pago</span>
                    <p className="font-medium text-gray-900">{formData.paymentMethod}</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h3 className="font-medium text-gray-900 mb-3">Productos</h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={`${item.productId}-${item.variantId}`} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.quantity}x {item.productName}
                          {item.variantName && ` (${item.variantName})`}
                        </span>
                        <span className="font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  {deliveryPrice > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Envío</span>
                      <span className="font-medium text-gray-900">${deliveryPrice.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-100">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            {step !== 'confirm' ? (
              <button
                onClick={handleNext}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Continuar
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>Enviar pedido por WhatsApp</span>
                <span>✈️</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { Product } from '@/types'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'
import VariantSelector from './VariantSelector'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    if (product.hasVariants && !selectedVariant) {
      toast.error('Por favor selecciona una variante')
      return
    }

    const variant = product.variants?.find((v) => v.id === selectedVariant)
    const price = variant?.price || product.discountedPrice || product.basePrice
    const variantName = variant?.name

    if (variant && variant.stock <= 0) {
      toast.error('Esta variante está agotada')
      return
    }

    if (!variant && product.stock <= 0) {
      toast.error('Este producto está agotado')
      return
    }

    addItem({
      productId: product.id,
      productName: product.name,
      variantId: variant?.id,
      variantName: variantName,
      price,
      quantity: 1,
      image: product.images[0] || '',
    })

    toast.success('Producto añadido al carrito')
    setSelectedVariant(null)
  }

  const displayPrice = product.discountedPrice || product.basePrice
  const hasDiscount = product.discount && product.discount > 0

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
            Oferta
          </div>
        )}
        {product.images && product.images.length > 0 && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm">Sin imagen</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>

        {product.hasVariants && product.variants && (
          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onSelectVariant={setSelectedVariant}
          />
        )}

        <div className="flex items-center justify-between mt-4">
          <div>
            {hasDiscount ? (
              <div>
                <span className="text-lg font-semibold text-gray-900">
                  ${displayPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${product.basePrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-semibold text-gray-900">
                Desde ${displayPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Añadir
          </button>
        </div>
      </div>
    </div>
  )
}

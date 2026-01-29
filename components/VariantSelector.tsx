'use client'

import { ProductVariant } from '@/types'

interface VariantSelectorProps {
  variants: ProductVariant[]
  selectedVariant: string | null
  onSelectVariant: (variantId: string) => void
}

export default function VariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => {
        const isOutOfStock = variant.stock <= 0
        const isSelected = selectedVariant === variant.id

        return (
          <button
            key={variant.id}
            onClick={() => !isOutOfStock && onSelectVariant(variant.id)}
            disabled={isOutOfStock}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isSelected
                ? 'bg-gray-900 text-white'
                : isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {variant.name}
            {isOutOfStock && ' (Agotado)'}
          </button>
        )
      })}
    </div>
  )
}

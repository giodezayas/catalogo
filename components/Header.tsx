'use client'

import { ShoppingBag, User } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useState } from 'react'
import CartSidebar from './CartSidebar'

export default function Header() {
  const itemCount = useCartStore((state) => state.getItemCount())
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Esencia Parfums</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Carrito de compras"
              >
                <ShoppingBag className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Perfil"
              >
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

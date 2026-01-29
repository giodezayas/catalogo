import { create } from 'zustand'
import { CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getSubtotal: () => number
  getItemCount: () => number
}

// Load from localStorage
const loadCart = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem('cart-storage')
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.state?.items || []
    }
  } catch (e) {
    console.error('Error loading cart from localStorage', e)
  }
  return []
}

// Save to localStorage
const saveCart = (items: CartItem[]) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('cart-storage', JSON.stringify({ state: { items } }))
  } catch (e) {
    console.error('Error saving cart to localStorage', e)
  }
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: loadCart(),
  addItem: (item) => {
    const items = get().items
    const existingIndex = items.findIndex(
      (i) => i.productId === item.productId && i.variantId === item.variantId
    )

    let updated: CartItem[]
    if (existingIndex >= 0) {
      updated = [...items]
      updated[existingIndex].quantity += item.quantity
    } else {
      updated = [...items, item]
    }
    set({ items: updated })
    saveCart(updated)
  },
  removeItem: (productId, variantId) => {
    const updated = get().items.filter(
      (i) => !(i.productId === productId && i.variantId === variantId)
    )
    set({ items: updated })
    saveCart(updated)
  },
  updateQuantity: (productId, variantId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, variantId)
      return
    }

    const updated = get().items.map((item) =>
      item.productId === productId && item.variantId === variantId
        ? { ...item, quantity }
        : item
    )
    set({ items: updated })
    saveCart(updated)
  },
  clearCart: () => {
    set({ items: [] })
    saveCart([])
  },
  getTotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0)
  },
}))

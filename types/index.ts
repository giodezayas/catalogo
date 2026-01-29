export interface Business {
  id: string
  name: string
  description: string
  logo?: string
  banner?: string
  image?: string // Imagen principal del negocio
  address: string
  municipality: string
  phone: string
  whatsapp: string
  schedule: string
  status: 'open' | 'closed'
  socialMedia?: {
    instagram?: string
    facebook?: string
  }
  deliveryZones?: DeliveryZone[]
  paymentMethods?: PaymentMethod[]
}

export interface DeliveryZone {
  id: string
  name: string
  price: number
}

export interface PaymentMethod {
  id: string
  name: string
  enabled: boolean
}

export interface Category {
  id: string
  name: string
  description?: string
  image?: string
  order: number
  visible: boolean
}

export interface ProductVariant {
  id: string
  name: string
  price: number
  stock: number
  sku?: string
}

export interface Product {
  id: string
  name: string
  description: string
  images: string[]
  basePrice: number
  purchasePrice?: number // Precio de compra (costo) para calcular ganancias
  discount?: number
  discountedPrice?: number
  stock: number
  status: 'active' | 'out_of_stock'
  categoryId: string
  variants?: ProductVariant[]
  hasVariants: boolean
  order: number
}

export interface CartItem {
  productId: string
  productName: string
  variantId?: string
  variantName?: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  customerName: string
  customerPhone: string
  deliveryType: 'pickup' | 'delivery'
  deliveryAddress?: string
  deliveryZone?: string
  deliveryPrice?: number
  paymentMethod: string
  cashAmount?: number
  items: CartItem[]
  subtotal: number
  total: number
  createdAt: Date
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

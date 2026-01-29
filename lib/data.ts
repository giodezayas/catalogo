import { Business, Category, Product } from '@/types'

// Mock data - En producción esto vendría de una base de datos
export const mockBusiness: Business = {
  id: '1',
  name: 'Esencia Parfums',
  description: 'Fragancias exclusivas para cada momento. Perfumes de alta calidad importados de las mejores casas del mundo.',
  logo: '/logo.png',
  banner: '/banner.jpg',
  address: 'Calle Principal #123, Centro',
  municipality: 'Ciudad de México',
  phone: '+52 555 123 4567',
  whatsapp: '5215551234567',
  schedule: '09:00 - 20:00',
  status: 'open',
  socialMedia: {
    instagram: 'https://instagram.com/esenciaparfums',
    facebook: 'https://facebook.com/esenciaparfums',
  },
  deliveryZones: [
    { id: '1', name: 'Centro', price: 50 },
    { id: '2', name: 'Norte', price: 80 },
    { id: '3', name: 'Sur', price: 70 },
  ],
  paymentMethods: [
    { id: 'cash', name: 'Efectivo', enabled: true },
    { id: 'transfer', name: 'Transferencia', enabled: true },
    { id: 'card_delivery', name: 'Tarjeta en entrega', enabled: true },
  ],
}

export const mockCategories: Category[] = [
  { id: '1', name: 'Todos', description: 'Todos los productos', order: 0, visible: true },
  { id: '2', name: 'Para Ella', description: 'Fragancias femeninas', order: 1, visible: true },
  { id: '3', name: 'Para Él', description: 'Fragancias masculinas', order: 2, visible: true },
  { id: '4', name: 'Unisex', description: 'Fragancias unisex', order: 3, visible: true },
  { id: '5', name: 'Sets Regalo', description: 'Sets de regalo', order: 4, visible: true },
]

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Lumière Doré',
    description: 'Una fragancia luminosa y elegante con notas de jazmín, rosa de mayo y un fondo de ámbar y vainilla.',
    images: ['/products/lumiere-dore.jpg'],
    basePrice: 890,
    discount: 0,
    stock: 50,
    status: 'active',
    categoryId: '2',
    hasVariants: true,
    variants: [
      { id: '1-30', name: '30ml', price: 890, stock: 20 },
      { id: '1-50', name: '50ml', price: 1290, stock: 15 },
      { id: '1-100', name: '100ml', price: 1890, stock: 15 },
    ],
    order: 1,
  },
  {
    id: '2',
    name: 'Noir Intense',
    description: 'Masculinidad refinada con notas de cuero, tabaco y especias orientales. Un aroma sofisticado y duradero.',
    images: ['/products/noir-intense.jpg'],
    basePrice: 1190,
    discount: 0,
    stock: 30,
    status: 'active',
    categoryId: '3',
    hasVariants: true,
    variants: [
      { id: '2-50', name: '50ml', price: 1190, stock: 15 },
      { id: '2-100', name: '100ml', price: 1790, stock: 15 },
    ],
    order: 2,
  },
  {
    id: '3',
    name: 'Rose Blush',
    description: 'Delicadeza floral con pétalos de rosa, peonía y un toque de almizcle blanco. Una fragancia romántica y femenina.',
    images: ['/products/rose-blush.jpg'],
    basePrice: 790,
    discount: 0,
    stock: 40,
    status: 'active',
    categoryId: '2',
    hasVariants: true,
    variants: [
      { id: '3-30', name: '30ml', price: 790, stock: 20 },
      { id: '3-50', name: '50ml', price: 1190, stock: 20 },
      { id: '3-100', name: '100ml', price: 1690, stock: 0 },
    ],
    order: 3,
  },
  {
    id: '4',
    name: 'Fresh Paris',
    description: 'Frescura cítrica unisex con notas de bergamota, limón y vetiver. Ideal para el día a día.',
    images: ['/products/fresh-paris.jpg'],
    basePrice: 990,
    discount: 10,
    discountedPrice: 891,
    stock: 35,
    status: 'active',
    categoryId: '4',
    hasVariants: true,
    variants: [
      { id: '4-50', name: '50ml', price: 891, stock: 20 },
      { id: '4-100', name: '100ml', price: 1490, stock: 15 },
    ],
    order: 4,
  },
]

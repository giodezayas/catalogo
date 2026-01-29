import fs from 'fs'
import path from 'path'
import { Business, Category, Product, Order } from '@/types'

const DATA_DIR = path.join(process.cwd(), 'data')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

const BUSINESS_FILE = path.join(DATA_DIR, 'business.json')
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json')
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json')
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json')

// Initialize default data if files don't exist
function initDefaultData() {
  if (!fs.existsSync(BUSINESS_FILE)) {
    const defaultBusiness: Business = {
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
    fs.writeFileSync(BUSINESS_FILE, JSON.stringify(defaultBusiness, null, 2))
  }

  if (!fs.existsSync(CATEGORIES_FILE)) {
    const defaultCategories: Category[] = [
      { id: '1', name: 'Todos', description: 'Todos los productos', order: 0, visible: true },
      { id: '2', name: 'Para Ella', description: 'Fragancias femeninas', order: 1, visible: true },
      { id: '3', name: 'Para Él', description: 'Fragancias masculinas', order: 2, visible: true },
      { id: '4', name: 'Unisex', description: 'Fragancias unisex', order: 3, visible: true },
      { id: '5', name: 'Sets Regalo', description: 'Sets de regalo', order: 4, visible: true },
    ]
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(defaultCategories, null, 2))
  }

  if (!fs.existsSync(PRODUCTS_FILE)) {
    const defaultProducts: Product[] = [
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
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(defaultProducts, null, 2))
  }

  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2))
  }
}

// Initialize on module load
initDefaultData()

// Read functions
export function readBusiness(): Business {
  const data = fs.readFileSync(BUSINESS_FILE, 'utf-8')
  return JSON.parse(data)
}

export function readCategories(): Category[] {
  const data = fs.readFileSync(CATEGORIES_FILE, 'utf-8')
  return JSON.parse(data)
}

export function readProducts(): Product[] {
  const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8')
  return JSON.parse(data)
}

export function readOrders(): Order[] {
  const data = fs.readFileSync(ORDERS_FILE, 'utf-8')
  return JSON.parse(data)
}

// Write functions
export function writeBusiness(business: Business): void {
  fs.writeFileSync(BUSINESS_FILE, JSON.stringify(business, null, 2))
}

export function writeCategories(categories: Category[]): void {
  fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2))
}

export function writeProducts(products: Product[]): void {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2))
}

export function writeOrders(orders: Order[]): void {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2))
}

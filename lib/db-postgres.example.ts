// Ejemplo de implementación con PostgreSQL
// Renombra este archivo a db-postgres.ts y configura tu DATABASE_URL

import { Pool } from 'pg'
import { Business, Category, Product, Order } from '@/types'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

// Inicializar tablas (ejecutar una vez)
export async function initDatabase() {
  const client = await pool.connect()
  try {
    // Tabla de negocio
    await client.query(`
      CREATE TABLE IF NOT EXISTS business (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL
      )
    `)

    // Tabla de categorías
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL
      )
    `)

    // Tabla de productos
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL
      )
    `)

    // Tabla de pedidos
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Insertar datos iniciales si no existen
    const businessExists = await client.query('SELECT 1 FROM business LIMIT 1')
    if (businessExists.rows.length === 0) {
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
      await client.query('INSERT INTO business (id, data) VALUES ($1, $2)', [
        '1',
        JSON.stringify(defaultBusiness),
      ])
    }
  } finally {
    client.release()
  }
}

// Funciones de lectura
export async function readBusiness(): Promise<Business> {
  const result = await pool.query('SELECT data FROM business WHERE id = $1', ['1'])
  if (result.rows.length === 0) {
    throw new Error('Business not found')
  }
  return result.rows[0].data as Business
}

export async function readCategories(): Promise<Category[]> {
  const result = await pool.query(
    "SELECT data FROM categories ORDER BY (data->>'order')::int"
  )
  return result.rows.map((row) => row.data as Category)
}

export async function readProducts(): Promise<Product[]> {
  const result = await pool.query(
    "SELECT data FROM products ORDER BY (data->>'order')::int"
  )
  return result.rows.map((row) => row.data as Product)
}

export async function readOrders(): Promise<Order[]> {
  const result = await pool.query('SELECT data FROM orders ORDER BY created_at DESC')
  return result.rows.map((row) => {
    const order = row.data as Order
    order.createdAt = new Date(row.created_at || order.createdAt)
    return order
  })
}

// Funciones de escritura
export async function writeBusiness(business: Business): Promise<void> {
  await pool.query(
    'INSERT INTO business (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = $2',
    [business.id, JSON.stringify(business)]
  )
}

export async function writeCategories(categories: Category[]): Promise<void> {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query('DELETE FROM categories')
    for (const category of categories) {
      await client.query('INSERT INTO categories (id, data) VALUES ($1, $2)', [
        category.id,
        JSON.stringify(category),
      ])
    }
    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

export async function writeProducts(products: Product[]): Promise<void> {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query('DELETE FROM products')
    for (const product of products) {
      await client.query('INSERT INTO products (id, data) VALUES ($1, $2)', [
        product.id,
        JSON.stringify(product),
      ])
    }
    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

export async function writeOrders(orders: Order[]): Promise<void> {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    for (const order of orders) {
      await client.query(
        'INSERT INTO orders (id, data, created_at) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET data = $2, created_at = $3',
        [order.id, JSON.stringify(order), new Date(order.createdAt)]
      )
    }
    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

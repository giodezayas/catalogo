// lib/db.ts
// Este archivo decide qué sistema de almacenamiento usar:
// - PostgreSQL si DATABASE_URL está configurada (producción)
// - JSON files si no (desarrollo local)

import * as dbJson from './db-json'

// Determinar qué módulo usar basado en DATABASE_URL
// Usamos una función para evaluar en runtime, no en build time
function shouldUsePostgres(): boolean {
  if (typeof process === 'undefined') return false
  return !!process.env.DATABASE_URL
}

// Cache para la importación de PostgreSQL
let dbPostgresCache: typeof import('./db-postgres') | null | undefined = undefined

// Importar PostgreSQL dinámicamente solo cuando sea necesario
// Esto evita problemas durante el build si DATABASE_URL no está disponible
async function getDbPostgres() {
  // Si ya tenemos el cache, retornarlo
  if (dbPostgresCache !== undefined) return dbPostgresCache
  
  if (!shouldUsePostgres()) {
    dbPostgresCache = null
    return null
  }
  
  try {
    dbPostgresCache = await import('./db-postgres')
    return dbPostgresCache
  } catch (error) {
    console.warn('PostgreSQL module not available, falling back to JSON storage')
    dbPostgresCache = null
    return null
  }
}

// Funciones wrapper que deciden qué implementación usar en runtime
export async function initDatabase() {
  const dbPostgres = await getDbPostgres()
  if (dbPostgres) {
    return dbPostgres.initDatabase()
  }
  return dbJson.initDatabase()
}

export async function readBusiness() {
  const dbPostgres = await getDbPostgres()
  if (dbPostgres) {
    return dbPostgres.readBusiness()
  }
  return dbJson.readBusiness()
}

export async function readCategories() {
  const dbPostgres = await getDbPostgres()
  if (dbPostgres) {
    return dbPostgres.readCategories()
  }
  return dbJson.readCategories()
}

export async function readProducts() {
  const dbPostgres = await getDbPostgres()
  if (dbPostgres) {
    return dbPostgres.readProducts()
  }
  return dbJson.readProducts()
}

export async function readOrders() {
  const dbPostgres = await getDbPostgres()
  if (dbPostgres) {
    return dbPostgres.readOrders()
  }
  return dbJson.readOrders()
}

export async function writeBusiness(business: Parameters<typeof dbJson.writeBusiness>[0]) {
  const dbPostgres = await getDbPostgres()
  if (dbPostgres) {
    return dbPostgres.writeBusiness(business)
  }
  return dbJson.writeBusiness(business)
}

export async function writeCategories(categories: Parameters<typeof dbJson.writeCategories>[0]) {
  const dbPostgres = await getDbPostgres()
  if (dbPostgres) {
    return dbPostgres.writeCategories(categories)
  }
  return dbJson.writeCategories(categories)
}

export async function writeProducts(products: Parameters<typeof dbJson.writeProducts>[0]) {
  const dbPostgres = await getDbPostgres()
  if (dbPostgres) {
    return dbPostgres.writeProducts(products)
  }
  return dbJson.writeProducts(products)
}

export async function writeOrders(orders: Parameters<typeof dbJson.writeOrders>[0]) {
  const dbPostgres = await getDbPostgres()
  if (dbPostgres) {
    return dbPostgres.writeOrders(orders)
  }
  return dbJson.writeOrders(orders)
}

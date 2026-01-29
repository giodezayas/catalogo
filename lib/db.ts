// lib/db.ts
// Este archivo decide qué sistema de almacenamiento usar:
// - PostgreSQL si DATABASE_URL está configurada (producción)
// - JSON files si no (desarrollo local)

import * as dbJson from './db-json'

// Importar PostgreSQL estáticamente
// Next.js tree-shaking eliminará esto si no se usa en producción sin DATABASE_URL
import * as dbPostgresModule from './db-postgres'

// Determinar qué módulo usar basado en DATABASE_URL
function shouldUsePostgres(): boolean {
  if (typeof process === 'undefined') return false
  const hasDatabaseUrl = !!process.env.DATABASE_URL
  // Solo usar PostgreSQL si DATABASE_URL está disponible
  return hasDatabaseUrl
}

// Funciones wrapper que deciden qué implementación usar en runtime
export async function initDatabase() {
  if (shouldUsePostgres()) {
    return dbPostgresModule.initDatabase()
  }
  return dbJson.initDatabase()
}

export async function readBusiness() {
  if (shouldUsePostgres()) {
    return dbPostgresModule.readBusiness()
  }
  return dbJson.readBusiness()
}

export async function readCategories() {
  if (shouldUsePostgres()) {
    return dbPostgresModule.readCategories()
  }
  return dbJson.readCategories()
}

export async function readProducts() {
  if (shouldUsePostgres()) {
    return dbPostgresModule.readProducts()
  }
  return dbJson.readProducts()
}

export async function readOrders() {
  if (shouldUsePostgres()) {
    return dbPostgresModule.readOrders()
  }
  return dbJson.readOrders()
}

export async function writeBusiness(business: Parameters<typeof dbJson.writeBusiness>[0]) {
  if (shouldUsePostgres()) {
    return dbPostgresModule.writeBusiness(business)
  }
  return dbJson.writeBusiness(business)
}

export async function writeCategories(categories: Parameters<typeof dbJson.writeCategories>[0]) {
  if (shouldUsePostgres()) {
    return dbPostgresModule.writeCategories(categories)
  }
  return dbJson.writeCategories(categories)
}

export async function writeProducts(products: Parameters<typeof dbJson.writeProducts>[0]) {
  if (shouldUsePostgres()) {
    return dbPostgresModule.writeProducts(products)
  }
  return dbJson.writeProducts(products)
}

export async function writeOrders(orders: Parameters<typeof dbJson.writeOrders>[0]) {
  if (shouldUsePostgres()) {
    return dbPostgresModule.writeOrders(orders)
  }
  return dbJson.writeOrders(orders)
}

// lib/db.ts
// Este archivo decide qué sistema de almacenamiento usar:
// - PostgreSQL si DATABASE_URL está configurada (producción)
// - JSON files si no (desarrollo local)

import * as dbPostgres from './db-postgres'
import * as dbJson from './db-json'

// Determinar qué módulo usar basado en DATABASE_URL
const usePostgres = !!process.env.DATABASE_URL

// Re-exportar funciones del módulo apropiado
export const initDatabase = usePostgres ? dbPostgres.initDatabase : dbJson.initDatabase
export const readBusiness = usePostgres ? dbPostgres.readBusiness : dbJson.readBusiness
export const readCategories = usePostgres ? dbPostgres.readCategories : dbJson.readCategories
export const readProducts = usePostgres ? dbPostgres.readProducts : dbJson.readProducts
export const readOrders = usePostgres ? dbPostgres.readOrders : dbJson.readOrders
export const writeBusiness = usePostgres ? dbPostgres.writeBusiness : dbJson.writeBusiness
export const writeCategories = usePostgres ? dbPostgres.writeCategories : dbJson.writeCategories
export const writeProducts = usePostgres ? dbPostgres.writeProducts : dbJson.writeProducts
export const writeOrders = usePostgres ? dbPostgres.writeOrders : dbJson.writeOrders

// lib/db.ts
// Este archivo decide qué sistema de almacenamiento usar:
// - PostgreSQL si DATABASE_URL está configurada (producción)
// - JSON files si no (desarrollo local)

if (process.env.DATABASE_URL) {
  // Usar PostgreSQL en producción
  export * from './db-postgres'
} else {
  // Usar JSON files en desarrollo local
  export * from './db-json'
}

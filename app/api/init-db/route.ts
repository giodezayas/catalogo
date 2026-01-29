// Ruta para inicializar la base de datos automáticamente
// Visita: https://tu-dominio.vercel.app/api/init-db después del primer deploy

import { NextResponse } from 'next/server'

export async function GET() {
  // Solo ejecutar si DATABASE_URL está configurada
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        error: 'DATABASE_URL not configured',
        message: 'Using JSON files for storage. Configure DATABASE_URL for PostgreSQL.',
      },
      { status: 400 }
    )
  }

  try {
    // Importar desde el módulo db que decide automáticamente qué usar
    const { initDatabase } = await import('@/lib/db')
    await initDatabase()
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      tables: ['business', 'categories', 'products', 'orders'],
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Failed to initialize database',
        message: error.message,
        hint: 'Make sure DATABASE_URL is correct and pg package is installed',
      },
      { status: 500 }
    )
  }
}

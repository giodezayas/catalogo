# 🚀 Guía de Despliegue

## ⚠️ Problema Actual: Almacenamiento en Archivos JSON

Actualmente el proyecto usa archivos JSON en `/data/` para almacenar datos. **Esto NO funciona en producción** porque:

- Los archivos se pierden en cada deploy
- No hay persistencia entre reinicios
- No es seguro para múltiples usuarios

## ✅ Soluciones Recomendadas

### Opción 1: Vercel + Base de Datos (Recomendado)

**Ventajas:**
- Despliegue automático desde GitHub
- Base de datos persistente
- Escalable y seguro
- Gratis para proyectos pequeños

**Pasos:**

1. **Crear cuenta en Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub

2. **Elegir Base de Datos:**
   
   **A) Supabase (Recomendado - Gratis)**
   - Ve a [supabase.com](https://supabase.com)
   - Crea un proyecto nuevo
   - Obtén la connection string
   - Es PostgreSQL, muy fácil de usar

   **B) PlanetScale (MySQL)**
   - Ve a [planetscale.com](https://planetscale.com)
   - Crea una base de datos
   - Obtén la connection string

   **C) MongoDB Atlas (NoSQL)**
   - Ve a [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Crea un cluster gratuito
   - Obtén la connection string

3. **Configurar Variables de Entorno:**
   - En Vercel, ve a Settings → Environment Variables
   - Agrega:
     ```
     DATABASE_URL=tu_connection_string
     JWT_SECRET=tu_secret_key_segura
     ADMIN_USERNAME=tu_usuario
     ADMIN_PASSWORD=tu_contraseña_segura
     ```

4. **Desplegar:**
   - Conecta tu repositorio de GitHub a Vercel
   - Vercel detectará Next.js automáticamente
   - Haz clic en "Deploy"

### Opción 2: Vercel + Vercel Postgres (Más Simple)

Vercel tiene su propia base de datos PostgreSQL integrada:

1. En tu proyecto de Vercel, ve a "Storage"
2. Crea una nueva base de datos Postgres
3. Obtén la connection string automáticamente
4. Se configura automáticamente como variable de entorno

### Opción 3: Railway (Todo en Uno)

Railway es excelente porque incluye base de datos:

1. Ve a [railway.app](https://railway.app)
2. Conecta GitHub
3. Crea un nuevo proyecto desde GitHub
4. Agrega un servicio PostgreSQL
5. Railway configura todo automáticamente

## 📝 Migración a Base de Datos

Una vez que tengas tu base de datos, necesitas migrar el código. Te muestro cómo hacerlo con PostgreSQL (Supabase/Vercel Postgres):

### 1. Instalar Dependencias

```bash
npm install pg @types/pg
```

### 2. Crear Archivo de Migración

Crea `lib/db-postgres.ts`:

```typescript
import { Pool } from 'pg'
import { Business, Category, Product, Order } from '@/types'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

// Inicializar tablas
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
      const defaultBusiness = {
        id: '1',
        name: 'Esencia Parfums',
        description: 'Fragancias exclusivas para cada momento.',
        // ... resto de datos
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
  return result.rows[0]?.data || null
}

export async function readCategories(): Promise<Category[]> {
  const result = await pool.query('SELECT data FROM categories ORDER BY (data->>\'order\')::int')
  return result.rows.map((row) => row.data)
}

export async function readProducts(): Promise<Product[]> {
  const result = await pool.query('SELECT data FROM products ORDER BY (data->>\'order\')::int')
  return result.rows.map((row) => row.data)
}

export async function readOrders(): Promise<Order[]> {
  const result = await pool.query('SELECT data FROM orders ORDER BY created_at DESC')
  return result.rows.map((row) => row.data)
}

// Funciones de escritura
export async function writeBusiness(business: Business): Promise<void> {
  await pool.query('INSERT INTO business (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = $2', [
    business.id,
    JSON.stringify(business),
  ])
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
        'INSERT INTO orders (id, data, created_at) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET data = $2',
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
```

### 3. Actualizar `lib/db.ts`

Reemplaza el contenido para usar PostgreSQL en producción:

```typescript
// lib/db.ts
if (process.env.DATABASE_URL) {
  // Usar PostgreSQL en producción
  export * from './db-postgres'
} else {
  // Usar JSON files en desarrollo
  export * from './db-json'
}
```

Y renombra el archivo actual a `lib/db-json.ts`.

## 🚀 Pasos Rápidos para Desplegar (Vercel + Supabase)

### 1. Preparar el Repositorio

```bash
# Asegúrate de tener todo en GitHub
git add .
git commit -m "Preparado para despliegue"
git push origin main
```

### 2. Crear Base de Datos en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea cuenta (gratis)
3. Crea nuevo proyecto
4. Ve a Settings → Database
5. Copia la "Connection string" (URI)

### 3. Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. "Add New Project"
3. Importa tu repositorio de GitHub
4. En "Environment Variables", agrega:
   - `DATABASE_URL` = tu connection string de Supabase
   - `JWT_SECRET` = genera una clave segura (puedes usar: `openssl rand -base64 32`)
   - `ADMIN_USERNAME` = tu usuario admin
   - `ADMIN_PASSWORD` = tu contraseña segura
5. Click "Deploy"

### 4. Ejecutar Migración Inicial

Después del primer deploy, necesitas inicializar las tablas. Puedes:

**Opción A: Crear una ruta de migración**

Crea `app/api/migrate/route.ts`:

```typescript
import { initDatabase } from '@/lib/db-postgres'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await initDatabase()
    return NextResponse.json({ success: true, message: 'Database initialized' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

Luego visita: `https://tu-dominio.vercel.app/api/migrate` una vez.

**Opción B: Ejecutar migración automáticamente**

Modifica `lib/db-postgres.ts` para ejecutar `initDatabase()` automáticamente en el primer uso.

## 🔒 Seguridad en Producción

### Variables de Entorno Importantes

```env
# Base de datos
DATABASE_URL=postgresql://...

# Autenticación
JWT_SECRET=tu_clave_super_segura_minimo_32_caracteres
ADMIN_USERNAME=admin
ADMIN_PASSWORD=contraseña_super_segura

# Opcional: Para analytics, etc.
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
```

### Generar JWT_SECRET Seguro

```bash
# En tu terminal
openssl rand -base64 32
```

## 📊 Monitoreo Post-Despliegue

1. **Vercel Dashboard**: Monitorea errores y performance
2. **Supabase Dashboard**: Monitorea queries y uso de base de datos
3. **Logs**: Revisa logs en Vercel si hay problemas

## 🆘 Troubleshooting

### Error: "Cannot connect to database"
- Verifica que `DATABASE_URL` esté configurada en Vercel
- Verifica que la base de datos permita conexiones externas
- En Supabase, ve a Settings → Database → Connection Pooling

### Error: "Table does not exist"
- Ejecuta la migración inicial visitando `/api/migrate`
- O verifica que `initDatabase()` se ejecute

### Los datos no persisten
- Asegúrate de estar usando PostgreSQL, no JSON files
- Verifica que `DATABASE_URL` esté configurada

## 💡 Alternativa Rápida (Sin Base de Datos)

Si quieres algo rápido para probar (NO recomendado para producción):

Puedes usar **Vercel KV** (Redis) o **Upstash** para almacenamiento simple, pero PostgreSQL es mucho mejor para este caso.

---

¿Necesitas ayuda con algún paso específico? Puedo ayudarte a configurar la migración a PostgreSQL.

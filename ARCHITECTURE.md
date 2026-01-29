# Arquitectura del Proyecto

## 📐 Visión General

Este proyecto usa **Next.js 14 con App Router**, combinando frontend y backend en un solo proyecto.

## 🏗️ Estructura Backend/Frontend

### Backend (API Routes)

El backend está en `app/api/` usando Next.js API Routes:

```
app/api/
├── auth/
│   ├── login/route.ts    # POST - Iniciar sesión
│   ├── logout/route.ts   # POST - Cerrar sesión
│   └── me/route.ts       # GET - Usuario actual
├── business/route.ts     # GET, PUT - Información del negocio
├── categories/route.ts   # GET, POST, PUT, DELETE - CRUD categorías
├── products/route.ts     # GET, POST, PUT, DELETE - CRUD productos
└── orders/route.ts       # GET, POST, PUT - CRUD pedidos
```

### Frontend

El frontend está en `app/` y `components/`:

- **Páginas públicas**: `app/page.tsx`, `app/checkout/page.tsx`
- **Panel admin**: `app/admin/page.tsx`
- **Componentes**: `components/` (reutilizables)

## 🔄 Flujo de Datos

```
┌─────────────┐
│  Frontend   │
│  (React)    │
└──────┬──────┘
       │
       │ llama a
       ▼
┌─────────────┐
│  lib/api.ts │  ← Cliente API (fetch)
└──────┬──────┘
       │
       │ HTTP Request
       ▼
┌─────────────┐
│ app/api/*   │  ← Next.js API Routes
└──────┬───────┘
       │
       │ usa
       ▼
┌─────────────┐
│  lib/db.ts  │  ← Capa de datos
└──────┬──────┘
       │
       │ lee/escribe
       ▼
┌─────────────┐
│  /data/*.json│  ← Almacenamiento (JSON)
└─────────────┘
```

## 🔐 Autenticación

### Sistema JWT

- **Librería**: `jose` (JWT)
- **Almacenamiento**: Cookies httpOnly
- **Rutas protegidas**: Verifican token en cada request

### Flujo de Login

1. Usuario envía credenciales → `POST /api/auth/login`
2. Backend valida → Genera JWT
3. JWT se guarda en cookie httpOnly
4. Requests siguientes incluyen cookie automáticamente

## 💾 Almacenamiento

### Actual: Archivos JSON

- **Ubicación**: `/data/*.json`
- **Ventajas**: Simple, sin dependencias
- **Desventajas**: No escalable, no concurrente

### Migración Futura: PostgreSQL

Para migrar:

1. Instalar `pg`
2. Reemplazar funciones en `lib/db.ts`
3. Las API Routes no cambian
4. El frontend no cambia

## 📡 API Endpoints

### Públicos (sin autenticación)

- `GET /api/business` - Información del negocio
- `GET /api/categories` - Lista de categorías
- `GET /api/products` - Lista de productos
- `POST /api/orders` - Crear pedido

### Protegidos (requieren autenticación)

- `PUT /api/business` - Actualizar negocio
- `POST /api/categories` - Crear categoría
- `PUT /api/categories` - Actualizar categoría
- `DELETE /api/categories` - Eliminar categoría
- `POST /api/products` - Crear producto
- `PUT /api/products` - Actualizar producto
- `DELETE /api/products` - Eliminar producto
- `GET /api/orders` - Lista de pedidos
- `PUT /api/orders` - Actualizar pedido

## 🎯 Ventajas de esta Arquitectura

1. **Todo en un proyecto**: Fácil de desplegar
2. **TypeScript end-to-end**: Tipado compartido
3. **API Routes**: Backend integrado, sin servidor separado
4. **Fácil migración**: Cambiar solo `lib/db.ts` para usar DB
5. **Desarrollo simple**: Un solo `npm run dev`

## 🚀 Despliegue

### Vercel (Recomendado)

Next.js está optimizado para Vercel:
- API Routes funcionan automáticamente
- Variables de entorno en dashboard
- Escalado automático

### Otros Proveedores

Cualquier proveedor que soporte Node.js:
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify

**Nota**: Los archivos JSON en `/data/` se perderán en cada deploy. Para producción, usa una base de datos.

## 🔄 Separar Backend y Frontend (Opcional)

Si necesitas separarlos:

1. **Backend separado**:
   - Crear proyecto Node.js/Express
   - Mover `app/api/` a rutas Express
   - Mover `lib/db.ts` al backend

2. **Frontend separado**:
   - Mantener solo `app/page.tsx`, `components/`
   - Actualizar `lib/api.ts` para apuntar a backend externo
   - Deploy frontend en Vercel/Netlify

Pero para este proyecto, **no es necesario separarlos**.

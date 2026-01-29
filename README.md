# Catálogo Online Genérico

Sistema de catálogo online con checkout vía WhatsApp, diseñado para ser reutilizable para cualquier tipo de negocio.

## 🎯 Características

- **Home del Negocio**: Información completa del negocio (logo, banner, dirección, horarios, etc.)
- **Catálogo de Productos**: Productos organizados por categorías dinámicas
- **Variantes de Producto**: Soporte para variantes complejas (tamaños, tallas, etc.)
- **Carrito de Compras**: Carrito persistente con localStorage
- **Checkout Multi-paso**: Proceso guiado (datos, entrega, pago, confirmación)
- **Integración WhatsApp**: Envío automático de pedidos a WhatsApp del negocio
- **Diseño Responsive**: Mobile-first, optimizado para web y móviles
- **UI Moderna**: Diseño minimalista inspirado en Apple

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo Local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

**Nota**: En desarrollo local usa archivos JSON. Para producción necesitas PostgreSQL.

### Despliegue MVP (100% Gratuito)

📖 **Guía completa**: [DEPLOY_MVP.md](./DEPLOY_MVP.md)  
⚡ **Guía rápida**: [DEPLOY_QUICK_START.md](./DEPLOY_QUICK_START.md)

**Resumen rápido:**
1. Crea base de datos en [Supabase](https://supabase.com) (gratis)
2. Ejecuta `supabase-init.sql` en Supabase SQL Editor
3. Sube código a GitHub
4. Despliega en [Vercel](https://vercel.com) (gratis)
5. Configura variables de entorno en Vercel
6. Visita `/api/init-db` para inicializar

**Servicios gratuitos:**
- ✅ Frontend + Backend: Vercel (gratis)
- ✅ Base de Datos: Supabase (500MB gratis)
- ✅ Dominio: `.vercel.app` gratis incluido

### Verificar Preparación

```bash
npm run check-deploy
```

Este comando verifica que todo esté listo para desplegar.

## 📁 Estructura del Proyecto

```
catalogo/
├── app/                    # Next.js App Router
│   ├── api/               # Backend API Routes
│   │   ├── auth/         # Autenticación
│   │   ├── business/     # Información del negocio
│   │   ├── categories/   # Categorías CRUD
│   │   ├── products/    # Productos CRUD
│   │   └── orders/       # Pedidos CRUD
│   ├── admin/            # Panel de administración
│   ├── checkout/         # Página de checkout
│   ├── page.tsx          # Página principal
│   ├── layout.tsx        # Layout principal
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── admin/            # Componentes del panel admin
│   │   ├── BusinessSettings.tsx
│   │   ├── CategoriesManagement.tsx
│   │   ├── ProductsManagement.tsx
│   │   └── OrdersManagement.tsx
│   ├── Header.tsx         # Header con carrito
│   ├── CartSidebar.tsx    # Sidebar del carrito
│   ├── Hero.tsx           # Sección hero del negocio
│   ├── CategoryFilter.tsx # Filtro de categorías
│   ├── ProductCard.tsx    # Tarjeta de producto
│   ├── ProductGrid.tsx    # Grid de productos
│   └── VariantSelector.tsx # Selector de variantes
├── lib/                   # Utilidades
│   ├── api.ts            # Cliente API (frontend)
│   ├── auth.ts           # Autenticación JWT
│   ├── db.ts              # Capa de datos (JSON files)
│   └── whatsapp.ts       # Funciones de WhatsApp
├── store/                 # Estado global (Zustand)
│   └── cartStore.ts      # Store del carrito
├── types/                 # TypeScript types
│   └── index.ts          # Definiciones de tipos
└── data/                  # Almacenamiento de datos (JSON)
    ├── business.json
    ├── categories.json
    ├── products.json
    └── orders.json
```

## 🏗️ Arquitectura

Este proyecto usa **Next.js con API Routes**, lo que significa que el backend y frontend están en el mismo proyecto:

- **Frontend**: React + Next.js (App Router)
- **Backend**: Next.js API Routes (`app/api/`)
- **Almacenamiento**: Archivos JSON (fácil migración a PostgreSQL después)
- **Autenticación**: JWT con cookies httpOnly

### Flujo de Datos

1. **Frontend** → Llama a `lib/api.ts` (cliente API)
2. **Cliente API** → Hace requests a `/api/*` (Next.js API Routes)
3. **API Routes** → Usan `lib/db.ts` para leer/escribir datos
4. **DB Layer** → Lee/escribe archivos JSON en `/data/`

## 🔧 Configuración

### Datos del Negocio

Los datos se almacenan en archivos JSON en la carpeta `/data/`:
- `business.json` - Información del negocio
- `categories.json` - Categorías
- `products.json` - Productos
- `orders.json` - Pedidos

**Nota**: La primera vez que ejecutes la app, se crearán estos archivos con datos de ejemplo.

Para personalizar, puedes:
1. Editar directamente los archivos JSON
2. Usar el panel de administración en `/admin`

### WhatsApp

El número de WhatsApp debe estar en formato internacional sin el signo `+`:
- Ejemplo: `5215551234567` (México)

## 📱 Características del Checkout

1. **Datos del Cliente**: Nombre y teléfono
2. **Entrega**: Recoger en tienda o envío a domicilio
3. **Pago**: Métodos configurables (Efectivo, Transferencia, etc.)
4. **Confirmación**: Resumen del pedido antes de enviar

## 🎨 Personalización

### Colores y Estilos

Los estilos están en `app/globals.css` y usan Tailwind CSS. Puedes personalizar:
- Colores en `tailwind.config.ts`
- Fuentes (actualmente Inter)
- Espaciado y tamaños

### Componentes

Todos los componentes están en `components/` y son fácilmente personalizables.

## 🔐 Panel de Administración

Accede a `/admin` para gestionar tu catálogo:

### Funcionalidades:
- ✅ **Configuración del Negocio**: Editar información, horarios, zonas de envío
- ✅ **Gestión de Categorías**: Crear, editar, eliminar categorías
- ✅ **Gestión de Productos**: CRUD completo con variantes
- ✅ **Gestión de Pedidos**: Ver y actualizar estado de pedidos

### Credenciales por defecto:
- Usuario: `admin`
- Contraseña: `admin`

**⚠️ Importante**: Cambia estas credenciales en producción usando variables de entorno:
```env
ADMIN_USERNAME=tu_usuario
ADMIN_PASSWORD=tu_contraseña_segura
JWT_SECRET=tu_secret_key_segura
```

## 📦 Tecnologías

- **Next.js 14**: Framework React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos utility-first
- **Zustand**: Gestión de estado
- **Framer Motion**: Animaciones
- **React Hot Toast**: Notificaciones
- **Lucide React**: Iconos

## 🚀 Despliegue en Producción

**⚠️ IMPORTANTE**: Los archivos JSON NO funcionan en producción (Vercel, etc.). Necesitas una base de datos.

📖 **Lee la guía completa de despliegue**: [DEPLOY.md](./DEPLOY.md)

### Opción Rápida (Recomendada):

1. **Vercel** (hosting) + **Supabase** (base de datos PostgreSQL gratuita)
2. Configura `DATABASE_URL` en Vercel
3. Usa el archivo `lib/db-postgres.example.ts` como base
4. Despliega desde GitHub

Ver [DEPLOY.md](./DEPLOY.md) para instrucciones detalladas paso a paso.

## 🚧 Mejoras Futuras

- [ ] Subida de imágenes para productos
- [ ] Búsqueda de productos
- [ ] Filtros avanzados
- [ ] Exportar pedidos a Excel/PDF
- [ ] Notificaciones por email/SMS
- [ ] Dashboard con estadísticas
- [ ] Multi-idioma

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

# 🚀 Guía Completa de Despliegue MVP (100% Gratuito)

Esta guía te llevará paso a paso para desplegar tu catálogo completo en servicios gratuitos, perfecto para presentar un MVP al cliente.

## 📋 Resumen de Servicios Gratuitos

- **Frontend + Backend**: Vercel (gratis, ilimitado)
- **Base de Datos**: Supabase (gratis, 500MB, suficiente para MVP)
- **Dominio**: Vercel proporciona dominio `.vercel.app` gratis
- **Total Costo**: $0 USD

## ✅ Verificación Pre-Deploy

Antes de empezar, verifica que todo esté listo:

```bash
# Ejecuta el script de verificación
node scripts/check-deploy.js
```

Este script verificará que todos los archivos necesarios estén en su lugar.

## 🎯 Paso 1: Preparar el Código para Producción

### 1.1 Verificar Dependencias

```bash
# Asegúrate de tener las dependencias instaladas
npm install
```

### 1.2 Estado del Código

✅ **Ya está listo**: El archivo `lib/db-postgres.ts` ya existe y está configurado.
✅ **Sistema automático**: El código detecta automáticamente si usar PostgreSQL (producción) o JSON (desarrollo local).

**No necesitas hacer nada más en este paso.** El código ya está preparado para producción.

## 🗄️ Paso 2: Crear Base de Datos en Supabase (GRATIS)

### 2.1 Crear cuenta en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Haz clic en "Start your project"
3. Inicia sesión con GitHub (recomendado) o crea cuenta con email
4. Haz clic en "New Project"

### 2.2 Configurar el proyecto

1. **Nombre del proyecto**: `catalogo-mvp` (o el que prefieras)
2. **Database Password**: Genera una contraseña segura (guárdala)
3. **Region**: Elige la más cercana a tu cliente
4. **Pricing Plan**: Free (gratis)
5. Haz clic en "Create new project"

### 2.3 Obtener Connection String

1. Espera 2-3 minutos a que se cree el proyecto
2. Ve a **Settings** → **Database**
3. Busca la sección **Connection string**
4. Selecciona **URI** en el dropdown
5. Copia la connection string (se ve así: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)
6. **Reemplaza `[YOUR-PASSWORD]`** con la contraseña que creaste

### 2.4 Crear las tablas

Ve a **SQL Editor** en Supabase y ejecuta este script:

```sql
-- Tabla de negocio
CREATE TABLE IF NOT EXISTS business (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL
);

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insertar datos iniciales del negocio
INSERT INTO business (id, data) VALUES ('1', '{
  "id": "1",
  "name": "Esencia Parfums",
  "description": "Fragancias exclusivas para cada momento. Perfumes de alta calidad importados de las mejores casas del mundo.",
  "address": "Calle Principal #123, Centro",
  "municipality": "Ciudad de México",
  "phone": "+52 555 123 4567",
  "whatsapp": "5215551234567",
  "schedule": "09:00 - 20:00",
  "status": "open",
  "socialMedia": {
    "instagram": "https://instagram.com/esenciaparfums",
    "facebook": "https://facebook.com/esenciaparfums"
  },
  "deliveryZones": [
    {"id": "1", "name": "Centro", "price": 50},
    {"id": "2", "name": "Norte", "price": 80},
    {"id": "3", "name": "Sur", "price": 70}
  ],
  "paymentMethods": [
    {"id": "cash", "name": "Efectivo", "enabled": true},
    {"id": "transfer", "name": "Transferencia", "enabled": true},
    {"id": "card_delivery", "name": "Tarjeta en entrega", "enabled": true}
  ]
}') ON CONFLICT (id) DO NOTHING;

-- Insertar categorías iniciales
INSERT INTO categories (id, data) VALUES 
('1', '{"id": "1", "name": "Todos", "description": "Todos los productos", "order": 0, "visible": true}'),
('2', '{"id": "2", "name": "Para Ella", "description": "Fragancias femeninas", "order": 1, "visible": true}'),
('3', '{"id": "3", "name": "Para Él", "description": "Fragancias masculinas", "order": 2, "visible": true}'),
('4', '{"id": "4", "name": "Unisex", "description": "Fragancias unisex", "order": 3, "visible": true}'),
('5', '{"id": "5", "name": "Sets Regalo", "description": "Sets de regalo", "order": 4, "visible": true}')
ON CONFLICT (id) DO NOTHING;
```

## 🔧 Paso 3: Verificar Configuración del Código

✅ **Todo está configurado automáticamente:**

- `lib/db.ts` ya detecta automáticamente si usar PostgreSQL o JSON
- `lib/db-postgres.ts` ya existe y está listo
- `lib/db-json.ts` ya existe para desarrollo local

**No necesitas hacer cambios en el código.** Solo necesitas configurar las variables de entorno en Vercel.

## 📦 Paso 4: Subir Código a GitHub

### 4.1 Inicializar Git (si no lo has hecho)

```bash
git init
git add .
git commit -m "Initial commit - MVP ready"
```

### 4.2 Crear repositorio en GitHub

1. Ve a [github.com](https://github.com)
2. Haz clic en "New repository"
3. Nombre: `catalogo-online-mvp`
4. Descripción: "Catálogo online con checkout vía WhatsApp"
5. **NO marques** "Initialize with README"
6. Haz clic en "Create repository"

### 4.3 Subir código

```bash
git remote add origin https://github.com/TU-USUARIO/catalogo-online-mvp.git
git branch -M main
git push -u origin main
```

## 🚀 Paso 5: Desplegar en Vercel (GRATIS)

### 5.1 Crear cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Sign Up"
3. Inicia sesión con GitHub (recomendado)
4. Autoriza Vercel para acceder a tus repositorios

### 5.2 Importar proyecto

1. En el dashboard de Vercel, haz clic en "Add New Project"
2. Selecciona tu repositorio `catalogo-online-mvp`
3. Vercel detectará automáticamente que es Next.js

### 5.3 Configurar Variables de Entorno

**⚠️ IMPORTANTE**: Configura estas variables ANTES de hacer deploy:

1. En el dashboard de Vercel, haz clic en **"Environment Variables"** (o **Settings** → **Environment Variables**)
2. Agrega las siguientes variables (una por una):

   **a) DATABASE_URL:**
   ```
   DATABASE_URL=postgresql://postgres:TU_PASSWORD@db.xxxxx.supabase.co:5432/postgres
   ```
   - Reemplaza `TU_PASSWORD` con la contraseña que creaste en Supabase
   - Reemplaza `xxxxx` con tu ID de proyecto de Supabase

   **b) JWT_SECRET:**
   ```bash
   # Genera una clave segura en tu terminal:
   openssl rand -base64 32
   ```
   Luego agrega en Vercel:
   ```
   JWT_SECRET=la_clave_generada_aqui
   ```

   **c) ADMIN_USERNAME:**
   ```
   ADMIN_USERNAME=admin
   ```
   (O el usuario que prefieras)

   **d) ADMIN_PASSWORD:**
   ```
   ADMIN_PASSWORD=tu_contraseña_super_segura
   ```
   (Usa una contraseña fuerte, no la de ejemplo)

3. **Asegúrate de seleccionar todos los ambientes** (Production, Preview, Development) para cada variable
4. Haz clic en **"Save"** para cada variable

### 5.4 Hacer Deploy

1. Haz clic en "Deploy"
2. Espera 2-3 minutos
3. ¡Listo! Tu sitio estará en `https://tu-proyecto.vercel.app`

## ✅ Paso 6: Verificar que Todo Funcione

### 6.1 Verificar Frontend

1. Visita tu URL de Vercel
2. Deberías ver el catálogo funcionando

### 6.2 Verificar Panel Admin

1. Ve a `https://tu-proyecto.vercel.app/admin`
2. Inicia sesión con las credenciales que configuraste
3. Verifica que puedas:
   - Editar información del negocio
   - Crear productos
   - Ver pedidos
   - Ver estadísticas

### 6.3 Verificar Base de Datos

1. En Supabase, ve a **Table Editor**
2. Deberías ver las tablas: `business`, `categories`, `products`, `orders`
3. Verifica que `business` tenga datos

## 🎨 Paso 7: Personalizar para el Cliente

### 7.1 Actualizar información del negocio

1. Inicia sesión en `/admin`
2. Ve a "Negocio"
3. Actualiza:
   - Nombre del negocio
   - Descripción
   - Dirección
   - Teléfono/WhatsApp
   - Horarios
   - Zonas de envío

### 7.2 Agregar productos

1. Ve a "Productos"
2. Crea los productos del cliente
3. Agrega imágenes
4. Configura precios y variantes

### 7.3 Probar checkout completo

1. Agrega productos al carrito
2. Completa el checkout
3. Verifica que se envíe a WhatsApp correctamente

## 🌐 Paso 8: Dominio Personalizado (Opcional)

### 8.1 Dominio Gratuito con Vercel

Vercel ya te da un dominio `.vercel.app` gratis. Si quieres un dominio personalizado:

**Opción 1: Freenom (gratis)**
1. Ve a [freenom.com](https://freenom.com)
2. Busca un dominio `.tk`, `.ml`, `.ga`, `.cf` gratis
3. Configúralo en Vercel → Settings → Domains

**Opción 2: Cloudflare (muy barato)**
1. Compra un dominio en Cloudflare (desde $8/año)
2. Configúralo en Vercel

### 8.2 Configurar dominio en Vercel

1. En Vercel, ve a tu proyecto → Settings → Domains
2. Agrega tu dominio
3. Sigue las instrucciones para configurar DNS

## 📊 Paso 9: Monitoreo y Mantenimiento

### 9.1 Dashboard de Vercel

- Monitorea errores en tiempo real
- Ve analytics de tráfico
- Revisa logs si hay problemas

### 9.2 Dashboard de Supabase

- Monitorea uso de base de datos
- Ve queries lentas
- Revisa logs de autenticación

## 🔒 Paso 10: Seguridad para MVP

### 10.1 Cambiar credenciales por defecto

✅ Ya configurado en variables de entorno

### 10.2 Verificar HTTPS

✅ Vercel proporciona HTTPS automáticamente

### 10.3 Backup de base de datos

En Supabase:
1. Ve a **Settings** → **Database**
2. Haz clic en "Backups"
3. Los backups automáticos están incluidos en el plan gratuito

## 🆘 Troubleshooting

### Error: "Cannot connect to database"

- Verifica que `DATABASE_URL` esté correcta en Vercel
- Asegúrate de reemplazar `[YOUR-PASSWORD]` en la URL
- Verifica que Supabase esté activo

### Error: "Table does not exist"

- Ejecuta el script SQL en Supabase SQL Editor
- Verifica que las tablas se crearon correctamente

### Las imágenes no se muestran

- Las imágenes en base64 funcionan, pero son grandes
- Para producción, considera usar Cloudinary (gratis hasta 25GB)

### El sitio se ve lento

- Vercel tiene CDN global, debería ser rápido
- Si es lento, verifica la región de Supabase (debe estar cerca)

## 📝 Checklist Final

Antes de presentar al cliente:

- [ ] Frontend funcionando en Vercel
- [ ] Panel admin accesible
- [ ] Base de datos conectada
- [ ] Información del negocio actualizada
- [ ] Productos agregados
- [ ] Checkout funcionando
- [ ] WhatsApp funcionando
- [ ] Estadísticas funcionando
- [ ] Dominio configurado (opcional)
- [ ] Credenciales cambiadas
- [ ] Pruebas completas realizadas

## 🎉 ¡Listo para Presentar!

Tu MVP está completamente funcional y desplegado. Puedes compartir el link de Vercel con tu cliente.

**URL del sitio**: `https://tu-proyecto.vercel.app`
**URL del admin**: `https://tu-proyecto.vercel.app/admin`

---

¿Necesitas ayuda con algún paso específico? Puedo ayudarte a configurar cualquier parte.

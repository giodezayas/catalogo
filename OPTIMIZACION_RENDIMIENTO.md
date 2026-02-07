# Optimización de rendimiento

## Cambios aplicados

1. **Cache CDN** en API products y categories (`Cache-Control: s-maxage=60`)
2. **Menos consultas DB** eliminando `CREATE TABLE` redundantes en cada request
3. **Supabase Storage** para imágenes (opcional): reemplaza base64 por URLs CDN

## Configurar Supabase Storage (recomendado)

Las imágenes en base64 dentro de la base de datos hacen el sitio lento. Migrar a Storage mejora mucho el rendimiento.

### 1. Crear el bucket en Supabase

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard) → tu proyecto
2. **Storage** → **New bucket**
3. Nombre: `catalog-images`
4. Marca **Public bucket** (para que las URLs sean accesibles sin auth)
5. Crea el bucket

### 2. Variables de entorno en Vercel

En Vercel → Project → Settings → Environment Variables añade:

- `NEXT_PUBLIC_SUPABASE_URL` = `https://TU_PROJECT_REF.supabase.co`  
  (lo ves en Supabase → Settings → API → Project URL)

- `SUPABASE_SERVICE_ROLE_KEY` = la clave "service_role"  
  (Supabase → Settings → API → Project API keys → service_role)

### 3. Productos existentes

Los productos que ya tienen imágenes en base64 seguirán funcionando. Las **nuevas** imágenes subidas desde el admin usarán Storage automáticamente.

Para migrar imágenes antiguas: edita cada producto en el admin y vuelve a subir la imagen.

## Usar Connection Pooler de Supabase

En Vercel, usa la URL del **pooler** (puerto 6543) para evitar "too many connections":

- En Supabase → Settings → Database → Connection string
- Elige **Transaction** (puerto 6543)
- Ejemplo: `postgresql://postgres.XXX:PASSWORD@aws-0-xx.pooler.supabase.com:6543/postgres`

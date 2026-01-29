# 🚀 Despliegue Rápido - MVP en 15 Minutos

Guía rápida para desplegar tu catálogo online completamente funcional.

## ⚡ Pasos Rápidos

### 1️⃣ Crear Base de Datos (5 min)

1. Ve a [supabase.com](https://supabase.com) → Sign Up (con GitHub)
2. **New Project** → Nombre: `catalogo-mvp`
3. Crea contraseña segura (guárdala)
4. Espera 2-3 min a que se cree
5. Ve a **Settings** → **Database** → Copia la **Connection string (URI)**
6. Reemplaza `[YOUR-PASSWORD]` con tu contraseña

### 2️⃣ Inicializar Base de Datos (2 min)

1. En Supabase, ve a **SQL Editor**
2. Copia y pega el contenido de `supabase-init.sql`
3. Haz clic en **Run**
4. Deberías ver "Tablas creadas correctamente"

### 3️⃣ Subir Código a GitHub (3 min)

```bash
# Si no tienes git inicializado
git init
git add .
git commit -m "MVP ready for deployment"

# Crea repositorio en github.com y luego:
git remote add origin https://github.com/TU-USUARIO/catalogo-mvp.git
git branch -M main
git push -u origin main
```

### 4️⃣ Desplegar en Vercel (5 min)

1. Ve a [vercel.com](https://vercel.com) → Sign Up (con GitHub)
2. **Add New Project** → Selecciona tu repositorio
3. **Environment Variables** → Agrega:

```
DATABASE_URL=postgresql://postgres:TU_PASSWORD@db.xxxxx.supabase.co:5432/postgres
JWT_SECRET=tu_clave_generada_con_openssl_rand_base64_32
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu_contraseña_segura
```

4. **Deploy** → Espera 2-3 minutos
5. ✅ Tu sitio está en `https://tu-proyecto.vercel.app`

### 5️⃣ Inicializar Base de Datos (1 min)

Visita: `https://tu-proyecto.vercel.app/api/init-db`

Deberías ver: `{"success": true, "message": "Database initialized successfully"}`

## ✅ Verificación Final

1. **Frontend**: `https://tu-proyecto.vercel.app` → Debe mostrar el catálogo
2. **Admin**: `https://tu-proyecto.vercel.app/admin` → Login con tus credenciales
3. **Base de Datos**: Supabase → Table Editor → Debe tener datos

## 🎯 Listo para Presentar

Tu MVP está completamente funcional:
- ✅ Frontend desplegado
- ✅ Backend funcionando
- ✅ Base de datos conectada
- ✅ Panel admin operativo
- ✅ Checkout vía WhatsApp funcionando

**Comparte el link con tu cliente**: `https://tu-proyecto.vercel.app`

---

## 🔧 Si Algo Sale Mal

### Error: "Cannot connect to database"
- Verifica que `DATABASE_URL` tenga la contraseña correcta
- Verifica que Supabase esté activo

### Error: "Table does not exist"
- Ejecuta `supabase-init.sql` en Supabase SQL Editor
- O visita `/api/init-db` después del deploy

### Las imágenes no se cargan
- Las imágenes en base64 funcionan pero son grandes
- Para producción, considera Cloudinary (gratis hasta 25GB)

---

¿Necesitas ayuda? Revisa `DEPLOY_MVP.md` para la guía completa.

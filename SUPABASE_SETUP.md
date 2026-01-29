# 🔧 Guía de Configuración de Supabase

Esta guía te ayudará paso a paso a configurar Supabase y obtener toda la información necesaria.

## 📋 Información que Necesitamos de Supabase

Para configurar tu proyecto, necesitamos:

1. **Connection String (DATABASE_URL)** - Para conectar la aplicación a la base de datos
2. **Verificar que las tablas estén creadas** - Para que la aplicación funcione

---

## 🚀 Paso 1: Crear Cuenta y Proyecto en Supabase

### 1.1 Crear Cuenta

1. Ve a [supabase.com](https://supabase.com)
2. Haz clic en **"Start your project"** o **"Sign Up"**
3. Elige una opción:
   - **Recomendado**: Inicia sesión con GitHub (más rápido)
   - O crea cuenta con email

### 1.2 Crear Nuevo Proyecto

1. Una vez dentro del dashboard, haz clic en **"New Project"**
2. Completa el formulario:
   - **Name**: `catalogo-mvp` (o el nombre que prefieras)
   - **Database Password**: 
     - Genera una contraseña segura
     - **⚠️ IMPORTANTE**: Guárdala en un lugar seguro, la necesitarás
     - Ejemplo: `MiPasswordSegura123!@#`
   - **Region**: Elige la región más cercana a tu cliente
     - Para México: `West US (N. California)` o `South America (São Paulo)`
   - **Pricing Plan**: Selecciona **Free** (gratis)
3. Haz clic en **"Create new project"**
4. ⏳ Espera 2-3 minutos mientras se crea el proyecto

---

## 🔑 Paso 2: Obtener Connection String (DATABASE_URL)

### 2.1 Acceder a la Configuración de Base de Datos

1. Una vez que el proyecto esté listo, en el menú lateral izquierdo:
   - Haz clic en **Settings** (⚙️ icono de engranaje)
   - Luego haz clic en **Database**

### 2.2 Encontrar Connection String

En la página de Database, busca la sección **"Connection string"** o **"Connection pooling"**

Verás algo como esto:

```
Connection string
┌─────────────────────────────────────────────────────────┐
│ URI                                                      │
│ postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase │
│ .co:5432/postgres                                        │
└─────────────────────────────────────────────────────────┘
```

### 2.3 Copiar y Modificar Connection String

1. Haz clic en el dropdown y selecciona **"URI"** (no "Session mode" ni "Transaction")
2. Copia la connection string completa
3. **⚠️ IMPORTANTE**: Reemplaza `[YOUR-PASSWORD]` con la contraseña que creaste

**Ejemplo:**

**Antes (lo que copias):**
```
postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijklmnop.supabase.co:5432/postgres
```

**Después (lo que usarás):**
```
postgresql://postgres:MiPasswordSegura123!@#@db.abcdefghijklmnop.supabase.co:5432/postgres
```

### 2.4 Guardar Connection String

Guarda esta connection string completa (con la contraseña reemplazada) - la necesitarás para Vercel.

---

## 🗄️ Paso 3: Crear las Tablas en Supabase

### 3.1 Abrir SQL Editor

1. En el menú lateral izquierdo, haz clic en **SQL Editor** (📝 icono)
2. Haz clic en **"New query"** o simplemente usa el editor que aparece

### 3.2 Ejecutar Script de Inicialización

1. Abre el archivo `supabase-init.sql` de tu proyecto
2. Copia **TODO** el contenido del archivo
3. Pégalo en el SQL Editor de Supabase
4. Haz clic en **"Run"** (botón verde) o presiona `Ctrl+Enter` / `Cmd+Enter`

### 3.3 Verificar que Funcionó

Deberías ver un mensaje de éxito:
```
Success. No rows returned
```

O si ejecutaste la última línea del script:
```
status
-------------------
Tablas creadas correctamente
```

### 3.4 Verificar Tablas Creadas

1. En el menú lateral, haz clic en **Table Editor** (📊 icono)
2. Deberías ver 4 tablas:
   - ✅ `business`
   - ✅ `categories`
   - ✅ `products`
   - ✅ `orders`

---

## ✅ Paso 4: Verificar Datos Iniciales

### 4.1 Verificar Datos del Negocio

1. En **Table Editor**, haz clic en la tabla `business`
2. Deberías ver una fila con `id = '1'`
3. Haz clic en esa fila para ver los datos JSON

### 4.2 Verificar Categorías

1. Haz clic en la tabla `categories`
2. Deberías ver 5 categorías (Todos, Para Ella, Para Él, Unisex, Sets Regalo)

---

## 📝 Resumen: Información que Necesitas Pasarme

Para ayudarte a configurar todo, necesito que me pases:

### ✅ Información Requerida:

1. **Connection String completa** (con contraseña reemplazada):
   ```
   postgresql://postgres:TU_PASSWORD@db.xxxxx.supabase.co:5432/postgres
   ```

2. **Confirmación de que ejecutaste el script SQL**:
   - ✅ Sí, ejecuté `supabase-init.sql`
   - ❌ No, aún no lo he hecho

3. **Verificación de tablas**:
   - ✅ Veo las 4 tablas en Table Editor
   - ❌ No veo las tablas

### ⚠️ Información que NO debes compartir:

- ❌ Tu contraseña de Supabase (solo la connection string con la contraseña)
- ❌ Tu contraseña de cuenta de Supabase

---

## 🆘 Problemas Comunes

### No encuentro "Connection string"

1. Ve a **Settings** → **Database**
2. Busca la sección **"Connection string"** o **"Connection info"**
3. Si no la ves, intenta hacer scroll hacia abajo
4. Asegúrate de estar en la pestaña correcta del proyecto

### El script SQL da error

- Verifica que copiaste TODO el contenido de `supabase-init.sql`
- Asegúrate de ejecutarlo completo, no línea por línea
- Si hay error, cópiame el mensaje de error exacto

### No veo las tablas después de ejecutar el script

1. Refresca la página de Table Editor
2. Verifica que el script se ejecutó sin errores
3. Intenta ejecutar el script nuevamente

---

## 🎯 Siguiente Paso

Una vez que tengas la connection string y hayas ejecutado el script SQL:

1. **Pásame la connection string** (con la contraseña incluida)
2. **Confirma que las tablas están creadas**
3. Te ayudaré a configurar las variables de entorno en Vercel

---

**¿Listo?** Sigue estos pasos y cuando tengas la información, compártela conmigo y te ayudo a configurar todo. 🚀

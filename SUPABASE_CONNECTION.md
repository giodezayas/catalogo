# 🔍 Cómo Encontrar la Connection String en Supabase

Veo que estás en la página de **API Settings**. Necesitamos ir a **Database Settings** para obtener la Connection String.

## 📍 Pasos para Encontrar la Connection String

### Paso 1: Ir a Database Settings

1. En el menú lateral izquierdo de Supabase, busca:
   - **Settings** (⚙️ icono de engranaje) - está en la parte inferior del menú
2. Haz clic en **Settings**
3. En el submenú que aparece, haz clic en **Database**

### Paso 2: Encontrar Connection String

En la página de Database, busca una sección que diga:

**"Connection string"** o **"Connection info"** o **"Connection pooling"**

Verás algo como esto:

```
Connection string
┌─────────────────────────────────────────────────────────────┐
│ [Dropdown] URI                                              │
│                                                              │
│ postgresql://postgres:[YOUR-PASSWORD]@db.zrrukrcmsqofhwnxjk │
│ ep.supabase.co:5432/postgres                                │
│                                                              │
│ [Copy] button                                               │
└─────────────────────────────────────────────────────────────┘
```

### Paso 3: Copiar Connection String

1. Asegúrate de que el dropdown muestre **"URI"** (no "Session mode" ni "Transaction")
2. Haz clic en el botón **"Copy"** para copiar la connection string
3. **⚠️ IMPORTANTE**: La connection string tendrá `[YOUR-PASSWORD]` - necesitas reemplazarlo

### Paso 4: Reemplazar la Contraseña

La connection string que copiaste se verá así:
```
postgresql://postgres:[YOUR-PASSWORD]@db.zrrukrcmsqofhwnxjkep.supabase.co:5432/postgres
```

**Reemplaza `[YOUR-PASSWORD]`** con la contraseña que creaste cuando creaste el proyecto.

**Ejemplo:**
Si tu contraseña es `MiPassword123!`, la connection string final sería:
```
postgresql://postgres:MiPassword123!@db.zrrukrcmsqofhwnxjkep.supabase.co:5432/postgres
```

---

## 🆘 Si No Encuentras "Connection string"

A veces está en una sección diferente. Busca:

1. **"Connection info"** - Puede estar en esta sección
2. **"Connection pooling"** - También puede estar aquí
3. **Scroll hacia abajo** - A veces está más abajo en la página
4. **Busca "Host"** - Puede estar listado como Host, Database, User, Port

Si encuentras estos campos por separado:
- **Host**: `db.zrrukrcmsqofhwnxjkep.supabase.co`
- **Database**: `postgres`
- **User**: `postgres`
- **Port**: `5432`
- **Password**: Tu contraseña

Puedes construir la connection string así:
```
postgresql://postgres:TU_PASSWORD@db.zrrukrcmsqofhwnxjkep.supabase.co:5432/postgres
```

---

## ✅ Información que Ya Tienes (Útil para Referencia)

De la imagen que compartiste, ya tienes:
- **Project URL**: `https://zrrukrcmsqofhwnxjkep.supabase.co`
- **Project ID**: `zrrukrcmsqofhwnxjkep`

Esto confirma que tu proyecto está activo. Solo necesitamos la Connection String de Database.

---

## 📝 Una Vez que Tengas la Connection String

Pásame:
1. La connection string completa (con la contraseña reemplazada)
2. Confirma que ejecutaste el script SQL (`supabase-init.sql`)

Y te ayudo a configurar todo en Vercel. 🚀

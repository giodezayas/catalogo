# 🔍 Cómo Encontrar la Connection String en Supabase

Estás viendo las **API Keys**, pero necesitamos la **Connection String** de PostgreSQL.

## 📍 Dónde Está la Connection String

La Connection String está en una sección diferente:

### Paso 1: Ir a Database Settings

1. En el menú lateral izquierdo de Supabase, busca:
   - **Settings** (⚙️ icono de engranaje)
   - Está en la parte inferior del menú lateral

2. Haz clic en **Settings**

3. En el submenú que aparece, busca y haz clic en:
   - **Database** (no "API" ni "API Keys")

### Paso 2: Encontrar Connection String

En la página de **Database**, busca una sección que diga:

- **"Connection string"** 
- **"Connection info"**
- **"Connection pooling"**
- O simplemente busca campos como: **Host**, **Database**, **User**, **Port**

---

## 🎯 Alternativa: Construir la Connection String Manualmente

Si encuentras estos campos en Database Settings:

- **Host**: `db.zrrukrcmsqofhwnxjkep.supabase.co` (o similar)
- **Database name**: `postgres`
- **User**: `postgres`
- **Port**: `5432` o `6543`
- **Password**: La contraseña que creaste al crear el proyecto

Puedes construir la connection string así:

```
postgresql://postgres:TU_PASSWORD@db.zrrukrcmsqofhwnxjkep.supabase.co:5432/postgres
```

**Ejemplo completo:**
Si tu contraseña es `MiPassword123!`, sería:
```
postgresql://postgres:MiPassword123!@db.zrrukrcmsqofhwnxjkep.supabase.co:5432/postgres
```

---

## 📸 Qué Buscar en Database Settings

Cuando estés en **Settings → Database**, deberías ver algo como:

```
Connection string
┌─────────────────────────────────────────────────────────────┐
│ [Dropdown: URI]                                            │
│                                                              │
│ postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co │
│ :5432/postgres                                              │
│                                                              │
│ [Copy] button                                               │
└─────────────────────────────────────────────────────────────┘
```

O puede estar en formato de campos individuales:

```
Host: db.zrrukrcmsqofhwnxjkep.supabase.co
Database name: postgres
Port: 5432
User: postgres
Password: [hidden]
```

---

## ⚠️ Nota Importante

- **NO necesitamos** las API Keys (`anon` o `service_role`)
- **SÍ necesitamos** la Connection String de PostgreSQL
- La Connection String tiene formato: `postgresql://user:password@host:port/database`

---

## 🆘 Si No Encuentras Database Settings

1. Asegúrate de estar en el proyecto correcto (debería decir "main" arriba)
2. Busca en el menú lateral: **Settings** → **Database**
3. Si no lo ves, intenta hacer scroll en el menú lateral
4. También puede estar en: **Project Settings** → **Database**

---

## ✅ Una Vez que Tengas la Connection String

Pásame:
1. La connection string completa (con la contraseña reemplazada)
2. O los campos individuales (Host, Database, User, Port, Password)

Y te ayudo a configurarla en Vercel. 🚀

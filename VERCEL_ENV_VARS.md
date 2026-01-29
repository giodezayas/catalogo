# 🔧 Variables de Entorno para Vercel

Copia estas variables exactamente como están en Vercel → Settings → Environment Variables

## Variables Requeridas

### 1. DATABASE_URL
```
postgresql://postgres:https://legionadminpanel.vercel.app@db.zrrukrcmsqofhwnxjkep.supabase.co:5432/postgres
```

**Nota**: Si el puerto es `6543` en lugar de `5432`, usa:
```
postgresql://postgres:https://legionadminpanel.vercel.app@db.zrrukrcmsqofhwnxjkep.supabase.co:6543/postgres
```

### 2. JWT_SECRET
Genera una clave segura. En tu terminal ejecuta:
```bash
openssl rand -base64 32
```

O usa esta (cámbiala por una única):
```
tu_clave_secreta_super_segura_minimo_32_caracteres_123456789
```

### 3. ADMIN_USERNAME
```
admin
```

### 4. ADMIN_PASSWORD
Elige una contraseña segura para el panel admin:
```
TuContraseñaSegura123!
```

---

## 📋 Pasos para Configurar en Vercel

1. Ve a tu proyecto en Vercel
2. Haz clic en **Settings**
3. Haz clic en **Environment Variables**
4. Agrega cada variable una por una:
   - **Name**: `DATABASE_URL`
   - **Value**: La connection string completa
   - **Environment**: Selecciona todas (Production, Preview, Development)
   - Haz clic en **Save**

Repite para cada variable.

---

## ✅ Verificación

Después de configurar las variables y hacer deploy:

1. Visita: `https://tu-proyecto.vercel.app/api/init-db`
2. Deberías ver: `{"success": true, "message": "Database initialized successfully"}`
3. Verifica en Supabase → Table Editor que las tablas existan

---

## 🆘 Si Hay Problemas

### Error: "Connection refused" o "Cannot connect"
- Verifica que la contraseña esté correcta en la connection string
- Verifica que el puerto sea correcto (5432 o 6543)
- Verifica que Supabase esté activo

### Error: "Table does not exist"
- Ejecuta `supabase-init.sql` en Supabase SQL Editor
- O visita `/api/init-db` después del deploy

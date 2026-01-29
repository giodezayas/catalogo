# ✅ Configuración Completa para Vercel

## 🔑 Variables de Entorno para Vercel

Copia estas variables **exactamente** en Vercel → Settings → Environment Variables:

### 1. DATABASE_URL
```
postgresql://postgres:https%3A%2F%2Flegionadminpanel.vercel.app@db.zrrukrcmsqofhwnxjkep.supabase.co:5432/postgres
```

### 2. JWT_SECRET
```
9Xq74DZKzXXQA3K2SuMUkqJBI9HYzMxfWPrWo6N7WEU=
```

### 3. ADMIN_USERNAME
```
admin
```

### 4. ADMIN_PASSWORD
```
Admin123!Segura
```
**⚠️ Cambia esta contraseña por una que prefieras** (mínimo 8 caracteres, con mayúsculas, números y símbolos)

---

## 📋 Pasos para Configurar en Vercel

### Paso 1: Ir a Environment Variables

1. Ve a [vercel.com](https://vercel.com) y entra a tu proyecto
2. Haz clic en **Settings** (arriba)
3. En el menú lateral, haz clic en **Environment Variables**

### Paso 2: Agregar Cada Variable

Para cada variable:

1. Haz clic en **"Add New"** o **"Add"**
2. **Key**: El nombre de la variable (ej: `DATABASE_URL`)
3. **Value**: El valor correspondiente (copia de arriba)
4. **Environment**: Selecciona todas las opciones:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
5. Haz clic en **Save**

Repite para las 4 variables.

---

## ✅ Verificación Post-Deploy

Después de hacer deploy en Vercel:

### 1. Inicializar Base de Datos

Visita esta URL (reemplaza `tu-proyecto` con tu nombre de proyecto):
```
https://tu-proyecto.vercel.app/api/init-db
```

Deberías ver:
```json
{
  "success": true,
  "message": "Database initialized successfully",
  "tables": ["business", "categories", "products", "orders"]
}
```

### 2. Verificar Frontend

Visita:
```
https://tu-proyecto.vercel.app
```

Deberías ver el catálogo funcionando.

### 3. Verificar Panel Admin

Visita:
```
https://tu-proyecto.vercel.app/admin
```

Inicia sesión con:
- Usuario: `admin`
- Contraseña: La que configuraste en `ADMIN_PASSWORD`

---

## 🎯 Resumen de Configuración

| Variable | Valor |
|----------|-------|
| DATABASE_URL | `postgresql://postgres:https%3A%2F%2Flegionadminpanel.vercel.app@db.zrrukrcmsqofhwnxjkep.supabase.co:5432/postgres` |
| JWT_SECRET | `9Xq74DZKzXXQA3K2SuMUkqJBI9HYzMxfWPrWo6N7WEU=` |
| ADMIN_USERNAME | `admin` |
| ADMIN_PASSWORD | `Admin123!Segura` (cámbiala) |

---

## 🆘 Si Algo Sale Mal

### Error: "Cannot connect to database"
- Verifica que `DATABASE_URL` esté correcta (con la contraseña codificada)
- Verifica que Supabase esté activo
- Prueba la connection string directamente

### Error: "Table does not exist"
- Visita `/api/init-db` después del deploy
- O ejecuta `supabase-init.sql` manualmente en Supabase

### Error de autenticación
- Verifica que `JWT_SECRET` esté configurado
- Verifica que `ADMIN_USERNAME` y `ADMIN_PASSWORD` sean correctos

---

## 🚀 Siguiente Paso

1. **Configura las variables en Vercel** (usando los valores de arriba)
2. **Haz deploy** (si es la primera vez, Vercel lo hará automáticamente)
3. **Visita** `/api/init-db` para inicializar
4. **¡Listo!** Tu MVP está funcionando

---

¿Necesitas ayuda con algún paso específico del despliegue en Vercel?

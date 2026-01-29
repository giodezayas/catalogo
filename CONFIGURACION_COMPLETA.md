# ✅ Configuración Completa - Lista para Vercel

## 🔑 Connection String (DATABASE_URL)

**⚠️ IMPORTANTE**: La contraseña tiene caracteres especiales que deben codificarse.

Tu contraseña: `https://legionadminpanel.vercel.app`

**Connection String completa:**
```
postgresql://postgres:https%3A%2F%2Flegionadminpanel.vercel.app@db.zrrukrcmsqofhwnxjkep.supabase.co:5432/postgres
```

**Nota sobre el puerto:**
- Si el puerto es `5432` (estándar): usa la connection string de arriba
- Si el puerto es `6543` (connection pooling): usa:
```
postgresql://postgres:https%3A%2F%2Flegionadminpanel.vercel.app@db.zrrukrcmsqofhwnxjkep.supabase.co:6543/postgres
```

---

## 📋 Variables de Entorno para Vercel

Copia estas variables en Vercel → Settings → Environment Variables:

### 1. DATABASE_URL
```
postgresql://postgres:https%3A%2F%2Flegionadminpanel.vercel.app@db.zrrukrcmsqofhwnxjkep.supabase.co:5432/postgres
```

### 2. JWT_SECRET
Genera una clave segura. Ejecuta en tu terminal:
```bash
openssl rand -base64 32
```

O usa esta (cámbiala por seguridad):
```
catalogo_mvp_jwt_secret_2024_super_segura_abc123xyz789
```

### 3. ADMIN_USERNAME
```
admin
```

### 4. ADMIN_PASSWORD
Elige una contraseña segura para acceder al panel:
```
Admin123!Segura
```

---

## ✅ Checklist Antes de Desplegar

### En Supabase:
- [ ] ¿Ejecutaste el script `supabase-init.sql` en SQL Editor?
- [ ] ¿Ves las 4 tablas en Table Editor? (business, categories, products, orders)
- [ ] ¿Hay datos en la tabla `business`?

### En Vercel:
- [ ] ¿Tienes cuenta en Vercel?
- [ ] ¿Código subido a GitHub?
- [ ] ¿Variables de entorno configuradas?

---

## 🚀 Pasos Finales

1. **Configura variables en Vercel** (usando los valores de arriba)
2. **Haz deploy** en Vercel
3. **Visita** `https://tu-proyecto.vercel.app/api/init-db` para inicializar
4. **Verifica** que todo funcione

---

## 🆘 Si Algo Sale Mal

### La connection string no funciona
- Verifica que la contraseña esté codificada correctamente
- Prueba con el puerto `6543` si `5432` no funciona
- Verifica en Supabase → Database que el proyecto esté activo

### Error al inicializar
- Ejecuta `supabase-init.sql` manualmente en Supabase SQL Editor
- Verifica que las tablas se crearon correctamente

---

¿Necesitas ayuda con algún paso específico?

# 🔐 Cómo Generar JWT_SECRET

El `JWT_SECRET` NO está en Supabase. Es una clave secreta que **TÚ generas** para firmar los tokens de autenticación de tu aplicación.

## 🎯 Método 1: Generar con OpenSSL (Recomendado)

### En Mac/Linux:
```bash
openssl rand -base64 32
```

### En Windows (PowerShell):
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### En Windows (CMD):
```cmd
powershell -Command "[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))"
```

Esto generará algo como:
```
aBc123XyZ789DeF456GhI012JkL345MnO678PqR901StU234VwX567YzA890
```

---

## 🎯 Método 2: Generador Online

1. Ve a [randomkeygen.com](https://randomkeygen.com/)
2. Busca "CodeIgniter Encryption Keys" o "Fort Knox Password"
3. Copia una clave de 64 caracteres

---

## 🎯 Método 3: Usar una Clave Manual (Menos Seguro)

Puedes crear una clave manualmente, pero debe ser:
- Mínimo 32 caracteres
- Mezcla de letras, números y símbolos
- Única para tu proyecto

Ejemplo:
```
catalogo_mvp_jwt_secret_2024_super_segura_abc123xyz789
```

---

## ✅ Una Vez que Tengas el JWT_SECRET

Guárdalo de forma segura. Lo necesitarás para:
- Configurar en Vercel (Environment Variables)
- Usar en producción

**⚠️ IMPORTANTE**: 
- No lo compartas públicamente
- No lo subas a GitHub
- Úsalo solo en variables de entorno

---

## 📋 Resumen de lo que Necesitas para Vercel

1. ✅ **DATABASE_URL**: Ya la tenemos
   ```
   postgresql://postgres:https%3A%2F%2Flegionadminpanel.vercel.app@db.zrrukrcmsqofhwnxjkep.supabase.co:5432/postgres
   ```

2. ⏳ **JWT_SECRET**: Genera uno ahora (usa uno de los métodos de arriba)

3. **ADMIN_USERNAME**: `admin` (o el que prefieras)

4. **ADMIN_PASSWORD**: Elige una contraseña segura para el panel admin

---

¿Ya generaste el JWT_SECRET? Pásamelo y te doy la configuración completa para Vercel.

# 🖥️ Comandos para Ejecutar en tu Terminal

Copia y pega estos comandos en tu terminal (uno por uno):

## 📤 Paso 1: Subir Código a GitHub

```bash
cd /Users/danelis/Documents/Personal/catalogo
git push -u origin main
```

**Si te pide credenciales:**
- **Usuario**: Tu usuario de GitHub (`giodezayas`)
- **Contraseña**: Necesitas un **Personal Access Token** (no tu contraseña normal)

### Crear Personal Access Token:

1. Ve a: https://github.com/settings/tokens
2. Haz clic en **"Generate new token"** → **"Generate new token (classic)"**
3. Nombre: `catalogo-deploy`
4. Marca: ✅ **repo** (todos los permisos)
5. Haz clic en **"Generate token"**
6. **Copia el token** (solo se muestra una vez)
7. Úsalo como contraseña cuando hagas `git push`

---

## 🚀 Paso 2: Instalar Vercel CLI

```bash
npm install -g vercel
```

---

## 🔐 Paso 3: Login en Vercel

```bash
vercel login
```

Esto abrirá tu navegador para autenticarte.

---

## ⚙️ Paso 4: Configurar Variables de Entorno

```bash
# Ir al directorio del proyecto
cd /Users/danelis/Documents/Personal/catalogo

# Agregar DATABASE_URL
vercel env add DATABASE_URL production
# Cuando te pida el valor, pega:
# postgresql://postgres:https%3A%2F%2Flegionadminpanel.vercel.app@db.zrrukrcmsqofhwnxjkep.supabase.co:5432/postgres
# Cuando pregunte "Add to Preview and Development?" → Y

# Agregar JWT_SECRET
vercel env add JWT_SECRET production
# Valor: 9Xq74DZKzXXQA3K2SuMUkqJBI9HYzMxfWPrWo6N7WEU=
# Add to Preview and Development? → Y

# Agregar ADMIN_USERNAME
vercel env add ADMIN_USERNAME production
# Valor: admin
# Add to Preview and Development? → Y

# Agregar ADMIN_PASSWORD
vercel env add ADMIN_PASSWORD production
# Valor: Admin123!Segura (o la que prefieras)
# Add to Preview and Development? → Y
```

---

## 🚀 Paso 5: Hacer Deploy

```bash
# Deploy a producción
vercel --prod
```

Vercel te mostrará la URL de tu sitio, algo como:
```
🔗  Production: https://catalogo-xxxxx.vercel.app
```

---

## ✅ Paso 6: Inicializar Base de Datos

Después del deploy, visita esta URL en tu navegador (reemplaza con tu URL):
```
https://tu-proyecto.vercel.app/api/init-db
```

O desde terminal:
```bash
curl https://tu-proyecto.vercel.app/api/init-db
```

Deberías ver:
```json
{"success":true,"message":"Database initialized successfully"}
```

---

## 🎯 Resumen Rápido

```bash
# 1. Push a GitHub (necesitarás token)
git push -u origin main

# 2. Instalar Vercel CLI
npm install -g vercel

# 3. Login
vercel login

# 4. Configurar variables (ejecuta cada comando y pega el valor cuando te lo pida)
vercel env add DATABASE_URL production
vercel env add JWT_SECRET production
vercel env add ADMIN_USERNAME production
vercel env add ADMIN_PASSWORD production

# 5. Deploy
vercel --prod

# 6. Inicializar BD (reemplaza URL)
curl https://tu-proyecto.vercel.app/api/init-db
```

---

## 🆘 Si Algo Sale Mal

### Error al hacer push:
- Crea un Personal Access Token en GitHub
- Úsalo como contraseña

### Error "vercel: command not found":
```bash
npm install -g vercel
```

### Error de autenticación en Vercel:
```bash
vercel login
```

---

¿Necesitas ayuda con algún comando específico?

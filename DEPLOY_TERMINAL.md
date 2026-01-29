# 🖥️ Despliegue desde Terminal

Guía completa para desplegar todo desde la terminal.

## 📋 Paso 1: Subir Código a GitHub

### 1.1 Crear Repositorio en GitHub (desde el navegador)

1. Ve a [github.com](https://github.com)
2. Haz clic en **"New repository"** (botón verde)
3. Nombre: `catalogo-mvp` (o el que prefieras)
4. Descripción: "Catálogo online con checkout vía WhatsApp"
5. **NO marques** "Initialize with README"
6. Haz clic en **"Create repository"**

### 1.2 Conectar y Subir desde Terminal

```bash
# Desde la raíz de tu proyecto
cd /Users/danelis/Documents/Personal/catalogo

# Agregar repositorio remoto (reemplaza TU-USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU-USUARIO/catalogo-mvp.git

# O si prefieres SSH:
# git remote add origin git@github.com:TU-USUARIO/catalogo-mvp.git

# Subir código
git branch -M main
git push -u origin main
```

---

## 🚀 Paso 2: Desplegar en Vercel desde Terminal

### 2.1 Instalar Vercel CLI

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# O con yarn:
# yarn global add vercel
```

### 2.2 Iniciar Sesión en Vercel

```bash
vercel login
```

Esto abrirá tu navegador para autenticarte.

### 2.3 Desplegar el Proyecto

```bash
# Desde la raíz del proyecto
cd /Users/danelis/Documents/Personal/catalogo

# Desplegar (primera vez)
vercel

# Sigue las preguntas:
# - Set up and deploy? Y
# - Which scope? (selecciona tu cuenta)
# - Link to existing project? N
# - What's your project's name? catalogo-mvp
# - In which directory is your code located? ./
# - Want to override settings? N
```

### 2.4 Configurar Variables de Entorno

```bash
# Agregar variables de entorno una por una
vercel env add DATABASE_URL production
# Pega: postgresql://postgres:https%3A%2F%2Flegionadminpanel.vercel.app@db.zrrukrcmsqofhwnxjkep.supabase.co:5432/postgres

vercel env add JWT_SECRET production
# Pega: 9Xq74DZKzXXQA3K2SuMUkqJBI9HYzMxfWPrWo6N7WEU=

vercel env add ADMIN_USERNAME production
# Pega: admin

vercel env add ADMIN_PASSWORD production
# Pega: Admin123!Segura (o la que prefieras)
```

**Para agregar a todos los ambientes:**
```bash
# Después de agregar cada variable, se te preguntará:
# Add to Preview and Development? Y
```

### 2.5 Hacer Deploy con Variables

```bash
# Hacer deploy a producción
vercel --prod
```

---

## ✅ Paso 3: Inicializar Base de Datos

Después del deploy, Vercel te dará una URL. Úsala para inicializar:

```bash
# Vercel te mostrará algo como:
# 🔗  Production: https://catalogo-mvp.vercel.app

# Inicializar base de datos (reemplaza con tu URL)
curl https://tu-proyecto.vercel.app/api/init-db
```

O simplemente visita la URL en tu navegador:
```
https://tu-proyecto.vercel.app/api/init-db
```

---

## 🔄 Comandos Útiles de Vercel CLI

```bash
# Ver información del proyecto
vercel ls

# Ver logs en tiempo real
vercel logs

# Ver variables de entorno
vercel env ls

# Eliminar variable de entorno
vercel env rm NOMBRE_VARIABLE production

# Hacer deploy a preview
vercel

# Hacer deploy a producción
vercel --prod

# Ver detalles del proyecto
vercel inspect
```

---

## 🆘 Troubleshooting

### Error: "vercel: command not found"
```bash
# Reinstala Vercel CLI
npm install -g vercel
```

### Error: "Not logged in"
```bash
vercel login
```

### Error al hacer push a GitHub
```bash
# Verificar remoto
git remote -v

# Si no está configurado:
git remote add origin https://github.com/TU-USUARIO/catalogo-mvp.git

# Si ya existe pero es incorrecto:
git remote set-url origin https://github.com/TU-USUARIO/catalogo-mvp.git
```

---

## 📝 Resumen de Comandos

```bash
# 1. Subir a GitHub
git remote add origin https://github.com/TU-USUARIO/catalogo-mvp.git
git push -u origin main

# 2. Instalar Vercel CLI
npm install -g vercel

# 3. Login en Vercel
vercel login

# 4. Configurar variables de entorno
vercel env add DATABASE_URL production
vercel env add JWT_SECRET production
vercel env add ADMIN_USERNAME production
vercel env add ADMIN_PASSWORD production

# 5. Deploy
vercel --prod

# 6. Inicializar BD
curl https://tu-proyecto.vercel.app/api/init-db
```

---

¿Quieres que ejecute estos comandos contigo paso a paso?

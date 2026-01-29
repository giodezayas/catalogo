# ✅ Continuar Despliegue - El Proyecto Ya Está Linkeado

El proyecto ya está linkeado a Vercel. El error de GitHub no es crítico, puedes continuar.

## 🔑 Paso 1: Agregar Variables de Entorno

Ejecuta estos comandos uno por uno. Cuando te pida el valor, pégalo:

### Variable 1: DATABASE_URL
```bash
vercel env add DATABASE_URL production
```
**Cuando te pida el valor, pega:**
```
postgresql://postgres:https%3A%2F%2Flegionadminpanel.vercel.app@db.zrrukrcmsqofhwnxjkep.supabase.co:5432/postgres
```
**Cuando pregunte "Add to Preview and Development?" → Presiona `Y` y Enter**

### Variable 2: JWT_SECRET
```bash
vercel env add JWT_SECRET production
```
**Valor:**
```
9Xq74DZKzXXQA3K2SuMUkqJBI9HYzMxfWPrWo6N7WEU=
```
**Add to Preview and Development? → `Y`**

### Variable 3: ADMIN_USERNAME
```bash
vercel env add ADMIN_USERNAME production
```
**Valor:**
```
admin
```
**Add to Preview and Development? → `Y`**

### Variable 4: ADMIN_PASSWORD
```bash
vercel env add ADMIN_PASSWORD production
```
**Valor:**
```
Admin123!Segura
```
**Add to Preview and Development? → `Y`**

---

## 🚀 Paso 2: Hacer Deploy

```bash
vercel --prod
```

Esto desplegará tu proyecto a producción.

---

## ✅ Paso 3: Inicializar Base de Datos

Después del deploy, Vercel te mostrará una URL como:
```
🔗  Production: https://catalogo-xxxxx.vercel.app
```

Visita esta URL en tu navegador (reemplaza con tu URL real):
```
https://catalogo-xxxxx.vercel.app/api/init-db
```

O desde terminal:
```bash
curl https://catalogo-xxxxx.vercel.app/api/init-db
```

Deberías ver:
```json
{"success":true,"message":"Database initialized successfully"}
```

---

## 🔗 Opcional: Conectar GitHub (desde la Web)

Si quieres conectar GitHub después:

1. Ve a [vercel.com](https://vercel.com)
2. Ve a tu proyecto `catalogo`
3. Settings → Git
4. Conecta tu repositorio de GitHub

Pero **no es necesario** para que funcione el deploy.

---

## 📋 Resumen de Comandos

```bash
# 1. Agregar variables (ejecuta cada uno y pega el valor cuando te lo pida)
vercel env add DATABASE_URL production
vercel env add JWT_SECRET production
vercel env add ADMIN_USERNAME production
vercel env add ADMIN_PASSWORD production

# 2. Deploy a producción
vercel --prod

# 3. Inicializar BD (reemplaza URL con la que te dé Vercel)
curl https://tu-proyecto.vercel.app/api/init-db
```

---

¡Continúa con agregar las variables de entorno! 🚀

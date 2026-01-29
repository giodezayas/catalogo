# ✅ Checklist de Despliegue MVP

Usa esta lista para asegurarte de que todo esté listo antes de presentar al cliente.

## 📋 Pre-Despliegue

### Código
- [ ] Ejecutar `npm run check-deploy` sin errores
- [ ] Todas las dependencias instaladas (`npm install`)
- [ ] Código subido a GitHub
- [ ] `.env.example` actualizado con todas las variables necesarias

### Base de Datos
- [ ] Cuenta creada en Supabase
- [ ] Proyecto creado en Supabase
- [ ] Script `supabase-init.sql` ejecutado
- [ ] Tablas verificadas en Supabase Table Editor
- [ ] Connection string copiada y guardada

### Variables de Entorno Preparadas
- [ ] `DATABASE_URL` lista (con contraseña reemplazada)
- [ ] `JWT_SECRET` generada (`openssl rand -base64 32`)
- [ ] `ADMIN_USERNAME` definida
- [ ] `ADMIN_PASSWORD` definida (segura)

## 🚀 Despliegue

### Vercel
- [ ] Cuenta creada en Vercel
- [ ] Repositorio conectado
- [ ] Variables de entorno configuradas
- [ ] Deploy completado sin errores
- [ ] URL del sitio funcionando

### Inicialización
- [ ] Visitado `/api/init-db` y respuesta exitosa
- [ ] Base de datos verificada en Supabase
- [ ] Datos iniciales presentes

## ✅ Post-Despliegue

### Funcionalidades Básicas
- [ ] Frontend carga correctamente
- [ ] Catálogo muestra productos
- [ ] Panel admin accesible (`/admin`)
- [ ] Login funciona con credenciales configuradas
- [ ] Puedo editar información del negocio
- [ ] Puedo crear productos
- [ ] Puedo crear categorías

### Checkout y Pedidos
- [ ] Agregar productos al carrito funciona
- [ ] Checkout completo funciona
- [ ] WhatsApp se abre con mensaje correcto
- [ ] Pedidos se guardan en base de datos
- [ ] Puedo ver pedidos en panel admin

### Estadísticas
- [ ] Panel de estadísticas carga
- [ ] Gráficos se muestran correctamente
- [ ] Tablas muestran datos

### Personalización para Cliente
- [ ] Información del negocio actualizada
- [ ] Logo/imagen del negocio agregada
- [ ] Productos del cliente agregados
- [ ] Categorías personalizadas
- [ ] WhatsApp del cliente configurado
- [ ] Zonas de envío configuradas
- [ ] Precios y variantes configurados

## 🔒 Seguridad

- [ ] Credenciales por defecto cambiadas
- [ ] `JWT_SECRET` es única y segura
- [ ] `ADMIN_PASSWORD` es segura
- [ ] HTTPS activo (automático en Vercel)

## 📱 Testing Final

### Desktop
- [ ] Navegación funciona
- [ ] Catálogo se ve bien
- [ ] Checkout funciona
- [ ] Panel admin funciona

### Mobile
- [ ] Diseño responsive funciona
- [ ] Navegación móvil funciona
- [ ] Checkout móvil funciona
- [ ] Panel admin móvil funciona

### Flujo Completo
- [ ] Cliente puede navegar productos
- [ ] Cliente puede agregar al carrito
- [ ] Cliente puede completar checkout
- [ ] Pedido llega a WhatsApp
- [ ] Admin puede ver pedido
- [ ] Admin puede actualizar estado

## 📊 Monitoreo

- [ ] Dashboard de Vercel configurado
- [ ] Dashboard de Supabase accesible
- [ ] Logs verificables si hay problemas

## 🎯 Presentación al Cliente

- [ ] URL del sitio lista para compartir
- [ ] Credenciales de admin preparadas para cliente
- [ ] Documentación básica preparada
- [ ] Demo preparada (si es necesario)

---

## 🆘 Si Algo Falla

1. **Revisa logs en Vercel**: Dashboard → Tu proyecto → Logs
2. **Revisa logs en Supabase**: Logs → Postgres Logs
3. **Verifica variables de entorno**: Vercel → Settings → Environment Variables
4. **Verifica conexión a BD**: Ejecuta `/api/init-db` nuevamente
5. **Consulta guías**: `DEPLOY_MVP.md` o `DEPLOY_QUICK_START.md`

---

**✅ Todo listo?** Comparte el link con tu cliente y ¡éxito con el MVP!

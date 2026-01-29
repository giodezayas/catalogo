# Guía de Inicio Rápido

## 🚀 Pasos para comenzar

### 1. Instalar dependencias

```bash
npm install
```

### 2. Personalizar datos del negocio

Edita el archivo `lib/data.ts` para personalizar:

- **Información del negocio**: nombre, descripción, dirección, teléfono, WhatsApp
- **Categorías**: agrega o modifica las categorías de productos
- **Productos**: agrega tus productos con sus variantes
- **Zonas de envío**: configura las zonas y precios de envío
- **Métodos de pago**: configura los métodos de pago disponibles

### 3. Configurar WhatsApp

En `lib/data.ts`, actualiza el campo `whatsapp` del objeto `mockBusiness`:

```typescript
whatsapp: '5215551234567', // Formato internacional sin el signo +
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📝 Personalización Rápida

### Cambiar el nombre del negocio

En `lib/data.ts`, línea ~8:
```typescript
name: 'Tu Nombre de Negocio',
```

### Agregar un producto

En `lib/data.ts`, agrega un objeto al array `mockProducts`:

```typescript
{
  id: '5',
  name: 'Mi Producto',
  description: 'Descripción del producto',
  images: ['/products/mi-producto.jpg'],
  basePrice: 500,
  discount: 0,
  stock: 10,
  status: 'active',
  categoryId: '2', // ID de la categoría
  hasVariants: true,
  variants: [
    { id: '5-30', name: '30ml', price: 500, stock: 5 },
    { id: '5-50', name: '50ml', price: 750, stock: 5 },
  ],
  order: 5,
}
```

### Agregar una categoría

En `lib/data.ts`, agrega un objeto al array `mockCategories`:

```typescript
{
  id: '6',
  name: 'Nueva Categoría',
  description: 'Descripción de la categoría',
  order: 5,
  visible: true,
}
```

## 🎨 Personalizar Colores

Edita `tailwind.config.ts` para cambiar los colores del tema.

## 📱 Probar el Checkout

1. Agrega productos al carrito
2. Haz clic en el icono del carrito
3. Haz clic en "Continuar al Checkout"
4. Completa el formulario
5. Al finalizar, se abrirá WhatsApp con el mensaje del pedido

## 🔐 Panel de Administración

Accede a `/admin` para ver el panel (demo: usuario `admin`, contraseña `admin`).

## 📦 Producción

```bash
npm run build
npm start
```

## 🆘 Problemas Comunes

### El carrito no persiste
- Verifica que el navegador permita localStorage
- Revisa la consola del navegador para errores

### WhatsApp no se abre
- Verifica que el número esté en formato correcto (sin +)
- Asegúrate de tener WhatsApp instalado o acceso web

### Los productos no se muestran
- Verifica que los productos tengan `status: 'active'`
- Revisa que la categoría seleccionada coincida con `categoryId`

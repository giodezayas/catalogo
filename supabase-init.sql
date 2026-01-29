-- Script SQL para inicializar la base de datos en Supabase
-- Ejecuta este script en Supabase SQL Editor después de crear el proyecto

-- Tabla de negocio
CREATE TABLE IF NOT EXISTS business (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL
);

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insertar datos iniciales del negocio
INSERT INTO business (id, data) VALUES ('1', '{
  "id": "1",
  "name": "Esencia Parfums",
  "description": "Fragancias exclusivas para cada momento. Perfumes de alta calidad importados de las mejores casas del mundo.",
  "address": "Calle Principal #123, Centro",
  "municipality": "Ciudad de México",
  "phone": "+52 555 123 4567",
  "whatsapp": "5215551234567",
  "schedule": "09:00 - 20:00",
  "status": "open",
  "socialMedia": {
    "instagram": "https://instagram.com/esenciaparfums",
    "facebook": "https://facebook.com/esenciaparfums"
  },
  "deliveryZones": [
    {"id": "1", "name": "Centro", "price": 50},
    {"id": "2", "name": "Norte", "price": 80},
    {"id": "3", "name": "Sur", "price": 70}
  ],
  "paymentMethods": [
    {"id": "cash", "name": "Efectivo", "enabled": true},
    {"id": "transfer", "name": "Transferencia", "enabled": true},
    {"id": "card_delivery", "name": "Tarjeta en entrega", "enabled": true}
  ]
}') ON CONFLICT (id) DO NOTHING;

-- Insertar categorías iniciales
INSERT INTO categories (id, data) VALUES 
('1', '{"id": "1", "name": "Todos", "description": "Todos los productos", "order": 0, "visible": true}'),
('2', '{"id": "2", "name": "Para Ella", "description": "Fragancias femeninas", "order": 1, "visible": true}'),
('3', '{"id": "3", "name": "Para Él", "description": "Fragancias masculinas", "order": 2, "visible": true}'),
('4', '{"id": "4", "name": "Unisex", "description": "Fragancias unisex", "order": 3, "visible": true}'),
('5', '{"id": "5", "name": "Sets Regalo", "description": "Sets de regalo", "order": 4, "visible": true}')
ON CONFLICT (id) DO NOTHING;

-- Verificar que las tablas se crearon correctamente
SELECT 'Tablas creadas correctamente' as status;

'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Order, Product } from '@/types'
import {
  calculateMonthlyStats,
  calculateProductSales,
  calculateMunicipalityStats,
  findLowStockProducts,
  getCurrentMonthStats,
} from '@/lib/stats'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { TrendingUp, Package, DollarSign, AlertTriangle } from 'lucide-react'

export default function Statistics() {
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const [ordersData, productsData] = await Promise.all([
        api.getOrders(),
        api.getProducts(),
      ])
      setOrders(ordersData)
      setProducts(productsData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Cargando estadísticas...</div>
  }

  const monthlyStats = calculateMonthlyStats(orders, products)
  const productSales = calculateProductSales(orders, products)
  const municipalityStats = calculateMunicipalityStats(orders)
  const lowStockProducts = findLowStockProducts(products, 10)
  const currentMonth = getCurrentMonthStats(orders, products)

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Estadísticas</h2>
        <p className="text-gray-600">Resumen de ventas y rendimiento del negocio</p>
      </div>

      {/* Resumen del Mes Actual */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">Órdenes del Mes</CardTitle>
            <Package className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{currentMonth.orders}</div>
            <p className="text-xs text-gray-600">Pedidos completados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">Ventas del Mes</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${currentMonth.sales.toFixed(2)}</div>
            <p className="text-xs text-gray-600">Ingresos totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">Ganancia del Mes</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${currentMonth.profit.toFixed(2)}
            </div>
            <p className="text-xs text-gray-600">Beneficio neto</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Órdenes por Mes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Órdenes por Mes</CardTitle>
            <CardDescription className="text-gray-600">Número de pedidos completados por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ventas por Mes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Ventas por Mes</CardTitle>
            <CardDescription className="text-gray-600">Ingresos totales por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Ganancia por Mes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Ganancia por Mes</CardTitle>
          <CardDescription className="text-gray-600">Beneficio neto por mes</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                strokeWidth={2}
                name="Ganancia"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Productos Más Vendidos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Productos Más Vendidos</CardTitle>
          <CardDescription className="text-gray-600">Top 10 productos por ingresos</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead className="text-right">Ingresos</TableHead>
                <TableHead className="text-right">Ganancia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productSales.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    No hay datos de ventas
                  </TableCell>
                </TableRow>
              ) : (
                productSales.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell className="font-medium text-gray-900">{item.productName}</TableCell>
                    <TableCell className="text-right text-gray-900">{item.quantity}</TableCell>
                    <TableCell className="text-right text-gray-900">${item.revenue.toFixed(2)}</TableCell>
                    <TableCell className="text-right text-green-600">
                      ${item.profit.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Municipios con Más Envíos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Municipios con Más Envíos</CardTitle>
          <CardDescription className="text-gray-600">Top 10 zonas de entrega</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Municipio/Zona</TableHead>
                <TableHead className="text-right">Órdenes</TableHead>
                <TableHead className="text-right">Ingresos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {municipalityStats.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500">
                    No hay datos de envíos
                  </TableCell>
                </TableRow>
              ) : (
                municipalityStats.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-gray-900">{item.municipality}</TableCell>
                    <TableCell className="text-right text-gray-900">{item.orders}</TableCell>
                    <TableCell className="text-right text-gray-900">${item.revenue.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Productos con Poco Stock */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Productos con Poco Stock
          </CardTitle>
          <CardDescription className="text-gray-600">Productos con stock menor o igual a 10 unidades</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Variante</TableHead>
                <TableHead className="text-right">Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStockProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500">
                    Todos los productos tienen stock suficiente
                  </TableCell>
                </TableRow>
              ) : (
                lowStockProducts.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-gray-900">{item.productName}</TableCell>
                    <TableCell className="text-gray-900">{item.variantName || 'Sin variante'}</TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`font-medium ${
                          item.stock === 0
                            ? 'text-red-600'
                            : item.stock <= 5
                            ? 'text-amber-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {item.stock}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

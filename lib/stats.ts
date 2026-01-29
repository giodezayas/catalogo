import { Order, Product } from '@/types'

export interface MonthlyStats {
  month: string
  orders: number
  sales: number
  profit: number
}

export interface ProductSales {
  productId: string
  productName: string
  quantity: number
  revenue: number
  profit: number
}

export interface MunicipalityStats {
  municipality: string
  orders: number
  revenue: number
}

export interface LowStockProduct {
  productId: string
  productName: string
  stock: number
  variantName?: string
}

export function calculateMonthlyStats(orders: Order[], products: Product[]): MonthlyStats[] {
  const monthlyData: Record<string, { orders: number; sales: number; profit: number }> = {}

  orders.forEach((order) => {
    if (order.status === 'cancelled') return

    const date = new Date(order.createdAt)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { orders: 0, sales: 0, profit: 0 }
    }

    monthlyData[monthKey].orders += 1
    monthlyData[monthKey].sales += order.total

    // Calcular ganancia
    order.items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId)
      if (product) {
        const purchasePrice = product.purchasePrice || 0
        const profitPerUnit = item.price - purchasePrice
        monthlyData[monthKey].profit += profitPerUnit * item.quantity
      }
    })
  })

  return Object.entries(monthlyData)
    .map(([key, data]) => ({
      month: new Date(key + '-01').toLocaleDateString('es-MX', {
        month: 'short',
        year: 'numeric',
      }),
      orders: data.orders,
      sales: data.sales,
      profit: data.profit,
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

export function calculateProductSales(
  orders: Order[],
  products: Product[]
): ProductSales[] {
  const productSales: Record<string, ProductSales> = {}

  orders.forEach((order) => {
    if (order.status === 'cancelled') return

    order.items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId)
      if (!product) return

      if (!productSales[item.productId]) {
        productSales[item.productId] = {
          productId: item.productId,
          productName: item.productName,
          quantity: 0,
          revenue: 0,
          profit: 0,
        }
      }

      productSales[item.productId].quantity += item.quantity
      productSales[item.productId].revenue += item.price * item.quantity

      // Calcular ganancia
      const purchasePrice = product.purchasePrice || 0
      const profitPerUnit = item.price - purchasePrice
      productSales[item.productId].profit += profitPerUnit * item.quantity
    })
  })

  return Object.values(productSales)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10) // Top 10
}

export function calculateMunicipalityStats(orders: Order[]): MunicipalityStats[] {
  const municipalityData: Record<string, MunicipalityStats> = {}

  orders.forEach((order) => {
    if (order.status === 'cancelled') return
    if (order.deliveryType !== 'delivery') return

    const municipality = order.deliveryZone || 'Sin especificar'

    if (!municipalityData[municipality]) {
      municipalityData[municipality] = {
        municipality,
        orders: 0,
        revenue: 0,
      }
    }

    municipalityData[municipality].orders += 1
    municipalityData[municipality].revenue += order.total
  })

  return Object.values(municipalityData)
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 10) // Top 10
}

export function findLowStockProducts(products: Product[], threshold: number = 10): LowStockProduct[] {
  const lowStock: LowStockProduct[] = []

  products.forEach((product) => {
    if (product.hasVariants && product.variants) {
      product.variants.forEach((variant) => {
        if (variant.stock <= threshold) {
          lowStock.push({
            productId: product.id,
            productName: product.name,
            stock: variant.stock,
            variantName: variant.name,
          })
        }
      })
    } else {
      if (product.stock <= threshold) {
        lowStock.push({
          productId: product.id,
          productName: product.name,
          stock: product.stock,
        })
      }
    }
  })

  return lowStock.sort((a, b) => a.stock - b.stock)
}

export function calculateMonthlyProfit(
  orders: Order[],
  products: Product[]
): number {
  let totalProfit = 0

  orders.forEach((order) => {
    if (order.status === 'cancelled') return

    order.items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId)
      if (!product) return

      const purchasePrice = product.purchasePrice || 0
      const profitPerUnit = item.price - purchasePrice
      totalProfit += profitPerUnit * item.quantity
    })
  })

  return totalProfit
}

export function getCurrentMonthStats(orders: Order[], products: Product[]) {
  const now = new Date()
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const monthOrders = orders.filter((order) => {
    if (order.status === 'cancelled') return false
    const date = new Date(order.createdAt)
    const orderMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    return orderMonth === currentMonth
  })

  const sales = monthOrders.reduce((sum, order) => sum + order.total, 0)
  const profit = calculateMonthlyProfit(monthOrders, products)

  return {
    orders: monthOrders.length,
    sales,
    profit,
  }
}

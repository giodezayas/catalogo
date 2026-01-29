'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, LogOut, Store, Package, Folder, ShoppingBag, Settings, BarChart3 } from 'lucide-react'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'
import BusinessSettings from '@/components/admin/BusinessSettings'
import ProductsManagement from '@/components/admin/ProductsManagement'
import CategoriesManagement from '@/components/admin/CategoriesManagement'
import OrdersManagement from '@/components/admin/OrdersManagement'
import Statistics from '@/components/admin/Statistics'

type Tab = 'business' | 'products' | 'categories' | 'orders' | 'statistics'

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('business')

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const { user } = await api.getCurrentUser()
      if (user) {
        setIsAuthenticated(true)
      }
    } catch {
      // Not authenticated
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { user } = await api.login(username, password)
      if (user) {
        setIsAuthenticated(true)
        toast.success('Sesión iniciada')
      }
    } catch (error: any) {
      toast.error(error.message || 'Credenciales incorrectas')
    }
  }

  const handleLogout = async () => {
    try {
      await api.logout()
      setIsAuthenticated(false)
      toast.success('Sesión cerrada')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Cargando...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gray-100 rounded-full">
              <Lock className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Ingresa tus credenciales para continuar
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Usuario"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Contraseña"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>
          <p className="text-xs text-gray-500 text-center mt-6">
            Demo: usuario: admin, contraseña: admin
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Panel de Administración</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab('business')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'business'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            Negocio
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'categories'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Folder className="w-4 h-4" />
            Categorías
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'products'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Package className="w-4 h-4" />
            Productos
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'orders'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Pedidos
          </button>
          <button
            onClick={() => setActiveTab('statistics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'statistics'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Estadísticas
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          {activeTab === 'business' && <BusinessSettings />}
          {activeTab === 'categories' && <CategoriesManagement />}
          {activeTab === 'products' && <ProductsManagement />}
          {activeTab === 'orders' && <OrdersManagement />}
          {activeTab === 'statistics' && <Statistics />}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Product, Category, ProductVariant } from '@/types'
import toast from 'react-hot-toast'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'
import ImageUpload from './ImageUpload'

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const [productsData, categoriesData] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
      ])
      setProducts(productsData)
      setCategories(categoriesData.filter((c: Category) => c.id !== '1'))
    } catch (error) {
      toast.error('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(product: Product) {
    try {
      if (product.id && products.find((p) => p.id === product.id)) {
        await api.updateProduct(product)
        toast.success('Producto actualizado')
      } else {
        await api.createProduct(product)
        toast.success('Producto creado')
      }
      setShowForm(false)
      setEditingProduct(null)
      loadData()
    } catch (error) {
      toast.error('Error al guardar')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return

    try {
      await api.deleteProduct(id)
      toast.success('Producto eliminado')
      loadData()
    } catch (error) {
      toast.error('Error al eliminar')
    }
  }

  function addVariant() {
    if (!editingProduct) return
    const variants = editingProduct.variants || []
    variants.push({
      id: `${Date.now()}`,
      name: '',
      price: 0,
      stock: 0,
    })
    setEditingProduct({ ...editingProduct, variants })
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Cargando...</div>
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Productos</h2>
        <button
          onClick={() => {
            setEditingProduct({
              id: '',
              name: '',
              description: '',
              images: [],
              basePrice: 0,
              purchasePrice: undefined,
              stock: 0,
              status: 'active',
              categoryId: categories[0]?.id || '',
              hasVariants: false,
              variants: [],
              order: products.length,
            })
            setShowForm(true)
          }}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Producto
        </button>
      </div>

      {showForm && editingProduct && (
        <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select
                value={editingProduct.categoryId}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, categoryId: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
            <textarea
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del Producto</label>
            <ImageUpload
              value={editingProduct.images?.[0] || ''}
              onChange={(url) => {
                setEditingProduct({
                  ...editingProduct,
                  images: url ? [url] : [],
                })
              }}
              label=""
              aspectRatio="aspect-square"
            />
            <p className="text-xs text-gray-500 mt-1">
              Imagen principal del producto (se puede agregar más imágenes después)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio Base (Venta)</label>
              <input
                type="number"
                step="0.01"
                value={editingProduct.basePrice}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, basePrice: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio de Compra (Costo)</label>
              <input
                type="number"
                step="0.01"
                value={editingProduct.purchasePrice || ''}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    purchasePrice: parseFloat(e.target.value) || undefined,
                  })
                }
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900"
              />
              {editingProduct.purchasePrice && editingProduct.basePrice && (
                <p className="text-xs text-gray-600 mt-1">
                  Ganancia: ${(editingProduct.basePrice - editingProduct.purchasePrice).toFixed(2)} (
                  {(
                    ((editingProduct.basePrice - editingProduct.purchasePrice) /
                      editingProduct.purchasePrice) *
                    100
                  ).toFixed(1)}
                  %)
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descuento (%)</label>
              <input
                type="number"
                value={editingProduct.discount || 0}
                onChange={(e) => {
                  const discount = parseFloat(e.target.value) || 0
                  const discountedPrice =
                    discount > 0
                      ? editingProduct.basePrice * (1 - discount / 100)
                      : undefined
                  setEditingProduct({
                    ...editingProduct,
                    discount,
                    discountedPrice,
                  })
                }}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <input
                type="number"
                value={editingProduct.stock}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editingProduct.hasVariants}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, hasVariants: e.target.checked })
                }
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700">Tiene variantes</span>
            </label>
          </div>

          {editingProduct.hasVariants && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Variantes</label>
                <button
                  onClick={addVariant}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  + Agregar variante
                </button>
              </div>
              {editingProduct.variants?.map((variant, index) => (
                <div key={variant.id} className="grid grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={variant.name}
                    onChange={(e) => {
                      const variants = [...(editingProduct.variants || [])]
                      variants[index].name = e.target.value
                      setEditingProduct({ ...editingProduct, variants })
                    }}
                    placeholder="Nombre (ej: 30ml)"
                    className="px-3 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900"
                  />
                  <input
                    type="number"
                    value={variant.price}
                    onChange={(e) => {
                      const variants = [...(editingProduct.variants || [])]
                      variants[index].price = parseFloat(e.target.value) || 0
                      setEditingProduct({ ...editingProduct, variants })
                    }}
                    placeholder="Precio"
                    className="px-3 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900"
                  />
                  <input
                    type="number"
                    value={variant.stock}
                    onChange={(e) => {
                      const variants = [...(editingProduct.variants || [])]
                      variants[index].stock = parseInt(e.target.value) || 0
                      setEditingProduct({ ...editingProduct, variants })
                    }}
                    placeholder="Stock"
                    className="px-3 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900"
                  />
                  <button
                    onClick={() => {
                      const variants = editingProduct.variants?.filter((_, i) => i !== index) || []
                      setEditingProduct({ ...editingProduct, variants })
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <button
              onClick={() => handleSave(editingProduct)}
              className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              <Save className="w-4 h-4" />
              Guardar
            </button>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingProduct(null)
              }}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
              <p className="text-sm text-gray-700 mt-1">
                ${product.basePrice.toFixed(2)} • Stock: {product.stock}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingProduct({ ...product })
                  setShowForm(true)
                }}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="p-2 text-red-600 hover:text-red-900"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

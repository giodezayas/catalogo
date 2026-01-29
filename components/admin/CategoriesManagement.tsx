'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Category } from '@/types'
import toast from 'react-hot-toast'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const data = await api.getCategories()
      setCategories(data.filter((c: Category) => c.id !== '1')) // Exclude "Todos"
    } catch (error) {
      toast.error('Error al cargar categorías')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(category: Category) {
    try {
      if (category.id && categories.find((c) => c.id === category.id)) {
        await api.updateCategory(category)
        toast.success('Categoría actualizada')
      } else {
        await api.createCategory(category)
        toast.success('Categoría creada')
      }
      setEditingId(null)
      setEditingCategory(null)
      setShowAddForm(false)
      loadCategories()
    } catch (error) {
      toast.error('Error al guardar')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return

    try {
      await api.deleteCategory(id)
      toast.success('Categoría eliminada')
      loadCategories()
    } catch (error) {
      toast.error('Error al eliminar')
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Cargando...</div>
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Categorías</h2>
        <button
          onClick={() => {
            setShowAddForm(true)
            setEditingCategory({
              id: '',
              name: '',
              description: '',
              order: categories.length,
              visible: true,
            })
          }}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Categoría
        </button>
      </div>

      {showAddForm && editingCategory && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                value={editingCategory.name}
                onChange={(e) =>
                  setEditingCategory({ ...editingCategory, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <input
                type="text"
                value={editingCategory.description || ''}
                onChange={(e) =>
                  setEditingCategory({ ...editingCategory, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSave(editingCategory)}
                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                <Save className="w-4 h-4" />
                Guardar
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setEditingCategory(null)
                }}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            {editingId === category.id ? (
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={editingCategory?.name || ''}
                  onChange={(e) =>
                    setEditingCategory({ ...(editingCategory || category), name: e.target.value })
                  }
                  className="w-full px-3 py-1 border border-gray-200 rounded text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => editingCategory && handleSave(editingCategory)}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null)
                      setEditingCategory(null)
                    }}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  {category.description && (
                    <p className="text-sm text-gray-500">{category.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(category.id)
                      setEditingCategory({ ...category })
                    }}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

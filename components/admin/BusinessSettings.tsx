'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Business } from '@/types'
import toast from 'react-hot-toast'
import { Save } from 'lucide-react'
import ImageUpload from './ImageUpload'

export default function BusinessSettings() {
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadBusiness()
  }, [])

  async function loadBusiness() {
    try {
      const data = await api.getBusiness()
      setBusiness(data)
    } catch (error) {
      toast.error('Error al cargar información del negocio')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!business) return

    setSaving(true)
    try {
      await api.updateBusiness(business)
      toast.success('Información actualizada')
    } catch (error) {
      toast.error('Error al actualizar')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !business) {
    return <div className="p-8 text-center text-gray-500">Cargando...</div>
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Configuración del Negocio</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del Negocio</label>
          <ImageUpload
            value={business.image}
            onChange={(url) => setBusiness({ ...business, image: url })}
            label=""
            aspectRatio="aspect-video"
          />
          <p className="text-xs text-gray-500 mt-1">
            Esta imagen se mostrará en la página principal del negocio
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Negocio</label>
          <input
            type="text"
            value={business.name}
            onChange={(e) => setBusiness({ ...business, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
          <textarea
            value={business.description}
            onChange={(e) => setBusiness({ ...business, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
            <input
              type="text"
              value={business.address}
              onChange={(e) => setBusiness({ ...business, address: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Municipio/Zona</label>
            <input
              type="text"
              value={business.municipality}
              onChange={(e) => setBusiness({ ...business, municipality: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
            <input
              type="text"
              value={business.phone}
              onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp (sin +)</label>
            <input
              type="text"
              value={business.whatsapp}
              onChange={(e) => setBusiness({ ...business, whatsapp: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Horario</label>
          <input
            type="text"
            value={business.schedule}
            onChange={(e) => setBusiness({ ...business, schedule: e.target.value })}
            placeholder="09:00 - 20:00"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select
            value={business.status}
            onChange={(e) => setBusiness({ ...business, status: e.target.value as 'open' | 'closed' })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            <option value="open">Abierto</option>
            <option value="closed">Cerrado</option>
          </select>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Zonas de Envío</h3>
          <div className="space-y-3">
            {business.deliveryZones?.map((zone, index) => (
              <div key={zone.id} className="flex gap-3">
                <input
                  type="text"
                  value={zone.name}
                  onChange={(e) => {
                    const zones = [...(business.deliveryZones || [])]
                    zones[index].name = e.target.value
                    setBusiness({ ...business, deliveryZones: zones })
                  }}
                  placeholder="Nombre de zona"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <input
                  type="number"
                  value={zone.price}
                  onChange={(e) => {
                    const zones = [...(business.deliveryZones || [])]
                    zones[index].price = parseFloat(e.target.value) || 0
                    setBusiness({ ...business, deliveryZones: zones })
                  }}
                  placeholder="Precio"
                  className="w-32 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            ))}
            <button
              onClick={() => {
                const zones = [...(business.deliveryZones || [])]
                zones.push({ id: Date.now().toString(), name: '', price: 0 })
                setBusiness({ ...business, deliveryZones: zones })
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              + Agregar zona
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}

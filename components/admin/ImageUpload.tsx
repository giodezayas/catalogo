'use client'

import { useState, useRef } from 'react'
import { X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  label?: string
  aspectRatio?: string
}

export default function ImageUpload({
  value,
  onChange,
  label = 'Imagen',
  aspectRatio = 'aspect-square',
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe ser menor a 5MB')
      return
    }

    // Preview local inmediato
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok && data.url) {
        onChange(data.url)
        setPreview(data.url)
      } else {
        // Fallback a base64 si Storage no está configurado
        const reader2 = new FileReader()
        reader2.onloadend = () => {
          const result = reader2.result as string
          onChange(result)
        }
        reader2.readAsDataURL(file)
      }
    } catch {
      const reader2 = new FileReader()
      reader2.onloadend = () => {
        onChange(reader2.result as string)
      }
      reader2.readAsDataURL(file)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      )}
      <div className="space-y-2 max-w-[200px]">
        {preview ? (
          <div className="relative group">
            <div className={`${aspectRatio} rounded-lg overflow-hidden border border-gray-200 bg-gray-100`}>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`${aspectRatio} min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors bg-gray-50 p-4`}
          >
            <ImageIcon className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-xs text-gray-600 text-center">
              {uploading ? 'Subiendo...' : 'Haz clic para subir'}
            </span>
            <span className="text-xs text-gray-400">PNG, JPG hasta 5MB</span>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        {preview && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cambiar imagen
          </button>
        )}
      </div>
    </div>
  )
}

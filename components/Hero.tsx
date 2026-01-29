'use client'

import { MapPin, Clock, Phone } from 'lucide-react'
import { Business } from '@/types'

interface HeroProps {
  business: Business
}

export default function Hero({ business }: HeroProps) {
  const isOpen = business.status === 'open'

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {business.image ? (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${business.image})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-[url('/banner.jpg')] bg-cover bg-center opacity-10" />
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full mb-4">
            <div
              className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <span className="text-sm font-medium text-amber-900">
              {isOpen ? 'Abierto' : 'Cerrado'}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {business.name}
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {business.description}
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>{business.address}, {business.municipality}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>{business.schedule}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-gray-400" />
              <span>{business.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

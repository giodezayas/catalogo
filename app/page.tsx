import { unstable_cache } from 'next/cache'
import { readBusiness, readCategories } from '@/lib/db'
import HomeClient from '@/components/HomeClient'
import { Business, Category } from '@/types'

// Solo business + categories en el payload (pequeño). Productos se cargan client-side vía API.
async function getCachedData() {
  try {
    const [business, categories] = await Promise.all([
      unstable_cache(async () => readBusiness(), ['catalog-business'], {
        revalidate: 60,
        tags: ['business'],
      })(),
      unstable_cache(async () => readCategories(), ['catalog-categories'], {
        revalidate: 60,
        tags: ['categories'],
      })(),
    ])
    return { business, categories }
  } catch (e) {
    console.error('Error loading catalog data:', e)
    return null
  }
}

export default async function Home() {
  const data = await getCachedData()

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Error al cargar el catálogo. Intenta recargar.</p>
      </div>
    )
  }

  const { business, categories } = data

  if (!business) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">No se pudo cargar la información del negocio.</p>
      </div>
    )
  }

  return (
    <HomeClient
      initialBusiness={business as Business}
      initialCategories={(categories || []) as Category[]}
    />
  )
}

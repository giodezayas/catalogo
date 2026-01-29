// Client-side API utilities

const API_BASE = '/api'

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || 'Request failed')
  }

  return response.json()
}

export const api = {
  // Auth
  login: (username: string, password: string) =>
    apiRequest<{ user: any; success: boolean }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  logout: () =>
    apiRequest<{ success: boolean }>('/auth/logout', {
      method: 'POST',
    }),

  getCurrentUser: () =>
    apiRequest<{ user: any }>('/auth/me'),

  // Business
  getBusiness: () =>
    apiRequest<any>('/business'),

  updateBusiness: (business: any) =>
    apiRequest<{ success: boolean; business: any }>('/business', {
      method: 'PUT',
      body: JSON.stringify(business),
    }),

  // Categories
  getCategories: () =>
    apiRequest<any[]>('/categories'),

  createCategory: (category: any) =>
    apiRequest<{ success: boolean; category: any }>('/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    }),

  updateCategory: (category: any) =>
    apiRequest<{ success: boolean; category: any }>('/categories', {
      method: 'PUT',
      body: JSON.stringify(category),
    }),

  deleteCategory: (id: string) =>
    apiRequest<{ success: boolean }>(`/categories?id=${id}`, {
      method: 'DELETE',
    }),

  // Products
  getProducts: () =>
    apiRequest<any[]>('/products'),

  createProduct: (product: any) =>
    apiRequest<{ success: boolean; product: any }>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),

  updateProduct: (product: any) =>
    apiRequest<{ success: boolean; product: any }>('/products', {
      method: 'PUT',
      body: JSON.stringify(product),
    }),

  deleteProduct: (id: string) =>
    apiRequest<{ success: boolean }>(`/products?id=${id}`, {
      method: 'DELETE',
    }),

  // Orders
  getOrders: () =>
    apiRequest<any[]>('/orders'),

  createOrder: (order: any) =>
    apiRequest<{ success: boolean; order: any }>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    }),

  updateOrder: (order: any) =>
    apiRequest<{ success: boolean; order: any }>('/orders', {
      method: 'PUT',
      body: JSON.stringify(order),
    }),
}

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const ALGORITHM = 'HS256'

export interface User {
  id: string
  username: string
  role: 'admin' | 'operator'
}

// Default admin user (in production, use environment variables)
const DEFAULT_ADMIN = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin',
}

export async function signToken(user: User): Promise<string> {
  const secret = new TextEncoder().encode(SECRET_KEY)
  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)

  return token
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const secret = new TextEncoder().encode(SECRET_KEY)
    const { payload } = await jwtVerify(token, secret)
    // Extraer solo las propiedades de User del payload
    if (payload && typeof payload === 'object' && 'id' in payload && 'username' in payload && 'role' in payload) {
      return {
        id: payload.id as string,
        username: payload.username as string,
        role: payload.role as 'admin' | 'operator',
      }
    }
    return null
  } catch {
    return null
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    return null
  }

  return verifyToken(token)
}

export async function login(username: string, password: string): Promise<User | null> {
  // Simple authentication (in production, use proper password hashing)
  if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
    return {
      id: '1',
      username,
      role: 'admin',
    }
  }
  return null
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
}

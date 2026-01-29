#!/usr/bin/env node

// Script para verificar que todo esté listo para el despliegue

const fs = require('fs')
const path = require('path')

console.log('🔍 Verificando preparación para despliegue...\n')

let errors = []
let warnings = []

// Verificar archivos necesarios
const requiredFiles = [
  'lib/db.ts',
  'lib/db-postgres.ts',
  'lib/db-json.ts',
  'lib/api.ts',
  'lib/auth.ts',
  'app/api/business/route.ts',
  'app/api/products/route.ts',
  'app/api/orders/route.ts',
  'app/api/auth/login/route.ts',
  'package.json',
]

requiredFiles.forEach((file) => {
  if (!fs.existsSync(path.join(process.cwd(), file))) {
    errors.push(`❌ Falta archivo: ${file}`)
  } else {
    console.log(`✅ ${file}`)
  }
})

// Verificar dependencias en package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
const requiredDeps = ['next', 'react', 'pg', 'jose', 'recharts']
requiredDeps.forEach((dep) => {
  if (!packageJson.dependencies[dep]) {
    errors.push(`❌ Falta dependencia: ${dep}`)
  }
})

// Verificar que db.ts tenga la lógica correcta
const dbContent = fs.readFileSync('lib/db.ts', 'utf-8')
if (!dbContent.includes('DATABASE_URL')) {
  warnings.push('⚠️  lib/db.ts podría no estar configurado para producción')
}

// Verificar archivo .env.example
if (!fs.existsSync('.env.example')) {
  warnings.push('⚠️  No existe .env.example')
}

console.log('\n📋 Resumen:')
if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ Todo está listo para desplegar!\n')
  console.log('📖 Siguiente paso: Lee DEPLOY_QUICK_START.md')
  process.exit(0)
} else {
  if (errors.length > 0) {
    console.log('\n❌ Errores encontrados:')
    errors.forEach((e) => console.log(e))
  }
  if (warnings.length > 0) {
    console.log('\n⚠️  Advertencias:')
    warnings.forEach((w) => console.log(w))
  }
  process.exit(1)
}

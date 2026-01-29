#!/bin/bash

# Script para subir código a GitHub
# Ejecuta: bash PUSH_TO_GITHUB.sh

echo "🚀 Subiendo código a GitHub..."

# Verificar que estás en el directorio correcto
cd /Users/danelis/Documents/Personal/catalogo

# Verificar estado
echo "📋 Estado actual:"
git status

# Hacer push
echo ""
echo "⬆️  Subiendo a GitHub..."
git push -u origin main

echo ""
echo "✅ Si te pide credenciales:"
echo "   - Usuario: tu usuario de GitHub"
echo "   - Contraseña: usa un Personal Access Token (no tu contraseña de GitHub)"
echo ""
echo "   Para crear un token:"
echo "   https://github.com/settings/tokens"
echo "   → Generate new token → repo (marca todos los permisos)"

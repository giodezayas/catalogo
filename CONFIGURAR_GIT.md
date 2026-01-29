# 🔧 Configurar Git con tu Información Correcta

Ejecuta estos comandos en tu terminal:

## 📋 Configurar Git (una sola vez)

```bash
cd /Users/danelis/Documents/Personal/catalogo

# Configurar nombre y email
git config user.name "giodezayas-7048"
git config user.email "giodezayas@gmail.com"

# Verificar que se configuró correctamente
git config user.name
git config user.email
```

## 🔄 Corregir el Último Commit (opcional)

Si quieres corregir el autor del último commit:

```bash
git commit --amend --reset-author --no-edit
```

## 📤 Push a GitHub

Después de configurar git, haz push:

```bash
git push origin main
```

Si pide autenticación:
- **Usuario:** `giodezayas-7048`
- **Contraseña:** Usa un Personal Access Token de GitHub (no tu contraseña)

## 🔑 Crear Personal Access Token (si no tienes uno)

1. Ve a: https://github.com/settings/tokens
2. Click en "Generate new token (classic)"
3. Dale un nombre (ej: "catalogo-deploy")
4. Selecciona el scope `repo`
5. Copia el token y úsalo como contraseña cuando hagas `git push`

---

Una vez configurado, los commits futuros usarán tu información correcta.

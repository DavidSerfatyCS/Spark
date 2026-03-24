# 📋 TAREAS SPARK - SEMANA 1

**Objetivo:** Setup completo + Captura funcional + Inbox básico

---

## 🔴 EN PROGRESO

### **Día 1: Setup del Proyecto**

**Prioridad:** Crítica
**Estimado:** 4 horas
**Iniciado:** 2026-03-24

**Tareas:**
- [x] Crear proyecto Next.js con TypeScript + Tailwind ✅ (2026-03-24)
- [x] Instalar dependencias core ✅ (2026-03-24)
- [ ] Configurar Git + GitHub (local ✅ | GitHub remote pendiente)
- [ ] Configurar Vercel (pendiente)
- [x] Configurar variables de entorno (.env.local + .env.example) ✅ (2026-03-24)

**Verificación:**
- [x] npm run build compila sin errores ✅
- [x] TypeScript compila sin errores (npx tsc --noEmit) ✅
- [x] Git repo tiene al menos 1 commit ✅
- [ ] Vercel está conectado (pendiente - requiere acción del usuario)

**Criterio de completado:**
Proyecto base funciona localmente y en Vercel.

**Notas:**
- `create-next-app` no acepta directorios con archivos existentes → scaffoldeamos en subdir y movimos archivos
- `tsconfig.tsbuildinfo` añadido al .gitignore (archivo de caché de TypeScript)
- `npm run dev` → http://localhost:3000 ✅

---

## 🟡 PENDIENTE - SEMANA 1

### **Día 2: Supabase Setup**

**Prioridad:** Crítica
**Estimado:** 3 horas

**Tareas:**
- [ ] Crear proyecto en Supabase
- [ ] Crear schema de base de datos
- [ ] Configurar RLS
- [ ] Crear cliente de Supabase

**Verificación:**
- [ ] Tablas creadas en Supabase
- [ ] RLS policies funcionan
- [ ] Cliente conecta sin errores

**Criterio de completado:**
Base de datos lista y accesible desde Next.js.

---

### **Día 3: Autenticación**

**Prioridad:** Alta
**Estimado:** 4 horas

**Tareas:**
- [ ] Crear página de login
- [ ] Implementar magic link
- [ ] Middleware de auth
- [ ] Layout con logout
- [ ] Tests de auth

**Verificación:**
- [ ] Magic link funciona
- [ ] Rutas protegidas redirigen
- [ ] Logout funciona

**Criterio de completado:**
Sistema de auth funcional end-to-end.

---

### **Día 4: Captura de Ideas**

**Prioridad:** Crítica
**Estimado:** 5 horas

**Tareas:**
- [ ] Componente CaptureForm
- [ ] API route POST /api/ideas
- [ ] Página HOME
- [ ] Tests

**Verificación:**
- [ ] Captura guarda en DB
- [ ] Redirect funciona
- [ ] Validación funciona

**Criterio de completado:**
Usuario puede capturar idea en < 5 segundos.

---

### **Día 5: Inbox de Ideas**

**Prioridad:** Alta
**Estimado:** 5 horas

**Tareas:**
- [ ] Componente IdeaCard
- [ ] API route GET /api/ideas
- [ ] Página Inbox
- [ ] Archivar idea
- [ ] Tests

**Verificación:**
- [ ] Ideas se muestran
- [ ] Archivar funciona
- [ ] Empty state funciona

**Criterio de completado:**
Usuario puede ver todas sus ideas.

---

## 🟢 COMPLETADO

### ✅ Setup inicial del proyecto (parcial)
**Iniciado:** 2026-03-24
**Stack:** Next.js 14.2.35 | TypeScript 5 | Tailwind 3.4

- [x] Crear proyecto Next.js con TypeScript + Tailwind
- [x] Instalar dependencias core (react 18, next 14.2.35)
- [x] Configurar variables de entorno (.env.local + .env.example)
- [x] Build compila ✅ | TypeScript sin errores ✅
- [x] Commit inicial en rama `claude/vigorous-dubinsky`

**Pendiente de usuario:**
- [ ] Conectar GitHub remote: `git remote add origin https://github.com/tu-usuario/spark.git`
- [ ] Conectar Vercel al repo de GitHub

---

## 📊 PROGRESO SEMANA 1

**Total:** 5 bloques
**En progreso:** 1 (Día 1 - parcial)
**Pendientes:** 4
**Completadas:** 0

---

*Actualizado: 2026-03-24*

# 📋 TAREAS SPARK - SEMANA 1

**Objetivo:** Setup completo + Captura funcional + Inbox básico

---

## 🔴 EN PROGRESO

### **Día 4: Captura de Ideas**

**Prioridad:** Crítica
**Estimado:** 5 horas

**Tareas:**
- [ ] Componente CaptureForm
- [ ] API route POST /api/ideas
- [ ] Página HOME con CaptureForm
- [ ] Tests

**Verificación:**
- [ ] Captura guarda en Supabase
- [ ] Validación funciona (no guarda vacío)
- [ ] Redirect a /ideas después de guardar

**Criterio de completado:**
Usuario puede capturar idea en < 5 segundos.

---

## 🟡 PENDIENTE - SEMANA 1

### **Día 5: Inbox de Ideas**

**Prioridad:** Alta
**Estimado:** 5 horas

**Tareas:**
- [ ] Componente IdeaCard
- [ ] API route GET /api/ideas
- [ ] Página Inbox
- [ ] Archivar idea
- [ ] Tests

**Criterio de completado:**
Usuario puede ver todas sus ideas.

---

## 🟢 COMPLETADO

### ✅ Día 1: Setup del Proyecto
**Completado:** 2026-03-24

- [x] Next.js 14 + TypeScript strict + Tailwind
- [x] Estructura de carpetas
- [x] .env.local + .env.example
- [x] Build y TypeScript sin errores
- [x] Commit inicial + push a GitHub

---

### ✅ Día 2: Supabase Setup
**Completado:** 2026-03-24

- [x] @supabase/supabase-js + @supabase/ssr instalados
- [x] lib/supabase.ts (cliente browser)
- [x] lib/supabase-server.ts (cliente servidor)
- [x] supabase/schema.sql ejecutado en dashboard
  - Tabla ideas con RLS ✅
  - Tabla prompts con RLS ✅
  - Triggers updated_at ✅

---

### ✅ Día 3: Autenticación
**Completado:** 2026-03-24

- [x] app/login/page.tsx — formulario magic link
- [x] app/actions/auth.ts — sendMagicLink() + signOut()
- [x] app/auth/callback/route.ts — intercambia code por sesión
- [x] middleware.ts — protege rutas privadas
- [x] Probado manualmente: magic link funciona end-to-end ✅

---

## 📊 PROGRESO SEMANA 1

**Total:** 5 bloques
**Completadas:** 3
**En progreso:** 1
**Pendientes:** 1

---

*Actualizado: 2026-03-24*

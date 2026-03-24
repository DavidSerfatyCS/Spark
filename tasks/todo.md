# 📋 TAREAS SPARK

---

## 🔴 EN PROGRESO

### Ninguna — Semana 1 completada ✅

---

## 🟡 PENDIENTE - SEMANA 2

### **Generación de Prompts con OpenAI**

**Prioridad:** Crítica
**Estimado:** 1 día

**Tareas:**
- [ ] Configurar cliente OpenAI (lib/openai.ts)
- [ ] Crear templates de prompts (lib/prompt-templates.ts)
- [ ] API route POST /api/prompts/generate
- [ ] Componente GeneratePromptsButton
- [ ] Componente PromptCard (muestra prompt + campo para pegar respuesta)
- [ ] Página /ideas/[id] (vista detalle de idea con prompts)

**Criterio de completado:**
Usuario puede generar 3-5 prompts para su idea y copiarlos al clipboard.

---

### **Guardar respuestas de IA**

**Prioridad:** Alta
**Estimado:** 1 día

**Tareas:**
- [ ] API route PUT /api/prompts/[id]/answer
- [ ] Campo de texto en PromptCard para pegar respuesta
- [ ] Marcar prompt como respondido

**Criterio de completado:**
Usuario puede pegar la respuesta de ChatGPT y Spark la guarda.

---

## 🟢 COMPLETADO - SEMANA 1

### ✅ Día 1: Setup del Proyecto
**Completado:** 2026-03-24
- [x] Next.js 14 + TypeScript strict + Tailwind
- [x] Estructura de carpetas y variables de entorno
- [x] Build limpio ✅

### ✅ Día 2: Supabase Setup
**Completado:** 2026-03-24
- [x] Clientes browser + servidor configurados
- [x] Schema SQL ejecutado (ideas + prompts + RLS + triggers)

### ✅ Día 3: Autenticación
**Completado:** 2026-03-24
- [x] Magic link end-to-end funcionando
- [x] Middleware protege todas las rutas privadas
- [x] Login + logout funcionales

### ✅ Día 4: Captura de Ideas
**Completado:** 2026-03-24
- [x] CaptureForm con auto-focus, Ctrl+Enter, contador de caracteres
- [x] POST /api/ideas con validación Zod
- [x] Ideas guardadas en Supabase ✅

### ✅ Día 5: Inbox de Ideas
**Completado:** 2026-03-24
- [x] Inbox con toggle Activas / Archivadas
- [x] Archivar y restaurar ideas
- [x] Empty states para ambas vistas

---

## 📊 PROGRESO GENERAL

**Semana 1:** 5/5 completada ✅
**Semana 2:** 0/2 completada

---

*Actualizado: 2026-03-24*

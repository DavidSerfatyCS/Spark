# 🎯 WORKFLOW DE ORQUESTACIÓN - PROYECTO SPARK

**Versión:** 1.0  
**Fecha:** Marzo 2026  
**Basado en:** Workflow de orquestación del usuario + adaptaciones para Spark

---

## 🧠 FILOSOFÍA CORE

> **"Planificar primero, codear después. Verificar siempre, iterar constantemente."**

Este workflow define **CÓMO** trabajamos en Spark. El Brief define QUÉ construimos, este documento define CÓMO lo construimos.

---

## 📋 ORQUESTACIÓN DEL FLUJO DE TRABAJO

### **REGLA #1: Modo Planificación por Defecto**

**Entra en modo planificación para CUALQUIER tarea no trivial** (más de 3 pasos o decisiones arquitectónicas)

#### Cuándo planificar:
- ✅ Crear nueva feature
- ✅ Modificar schema de base de datos
- ✅ Integrar servicio externo (OpenAI, Supabase)
- ✅ Cambiar arquitectura de componentes
- ✅ Implementar testing de feature compleja

#### Cuándo NO planificar (codear directo):
- ❌ Fix de typo
- ❌ Cambio de color/estilos CSS
- ❌ Añadir console.log para debug
- ❌ Actualizar README con info nueva

#### Proceso de planificación:

```markdown
## 🏗️ PLAN: [Nombre de la feature]

### 1. OBJETIVO
¿Qué queremos lograr exactamente?

### 2. ARCHIVOS AFECTADOS
- [ ] app/components/X.tsx (crear)
- [ ] app/api/Y/route.ts (modificar)
- [ ] lib/Z.ts (crear)

### 3. DECISIONES ARQUITECTÓNICAS
- ¿Por qué este enfoque?
- ¿Qué alternativas descartamos?
- ¿Qué tradeoffs aceptamos?

### 4. PASOS DE IMPLEMENTACIÓN
1. Paso 1: [descripción]
2. Paso 2: [descripción]
3. Paso 3: [descripción]

### 5. VERIFICACIÓN
- [ ] Tests pasan
- [ ] TypeScript compila sin errores
- [ ] Funciona en mobile
- [ ] Probado manualmente

### 6. SIGUIENTE PASO
¿Qué sigue después de esto?
```

**Si algo sale mal, PARA y vuelve a planificar de inmediato; no sigas forzando.**

---

### **REGLA #2: Estrategia de Sesiones Focalizadas**

**Adaptación para Claude.ai** (no tenemos subagentes como en Claude Code)

#### Uso de sesiones focalizadas:

**En lugar de subagentes, usamos sesiones temáticas:**

- 🎨 **Sesión Frontend:** Solo componentes React, UI, Tailwind
- 🔧 **Sesión Backend:** Solo API routes, lógica de servidor
- 🗄️ **Sesión Database:** Solo schema, queries, migraciones
- 🧪 **Sesión Testing:** Solo tests, no código de producción
- 📱 **Sesión PWA:** Solo configuración de PWA, Service Worker

#### Reglas de sesión:

1. **Una sesión = un foco temático**
   - No mezclar frontend con backend en misma sesión
   - Mantiene contexto limpio

2. **Delega exploración y análisis paralelo** (cuando sea posible)
   - "Primero analiza todas las opciones de autenticación"
   - "Luego implementamos la elegida"

3. **Para problemas complejos, dedica más capacidad mediante sesiones separadas**
   - Problema: "Sistema de prompts complicado"
   - Solución: Sesión 1 para diseño, Sesión 2 para implementación

4. **Una tarea por sesión** = una ejecución focalizada
   - Cada sesión debe tener 1 objetivo claro
   - Si se desvía, crear nueva sesión

---

### **REGLA #3: Bucle de Automejora**

**Tras CUALQUIER corrección del usuario:** actualiza `tasks/lessons.md` con el patrón

#### Estructura de lessons.md:

```markdown
# 📚 LECCIONES APRENDIDAS - SPARK

## Semana 1

### [2026-03-16] Error: TypeScript types incorrectos en Supabase client

**Problema:**
El tipo `Database` de Supabase no coincidía con el schema real.

**Causa raíz:**
No regeneramos tipos después de modificar schema en Supabase.

**Solución:**
Ejecutar `npx supabase gen types typescript` después de cada cambio de schema.

**Regla nueva:**
Siempre regenerar tipos de Supabase antes de usar en código.

---

### [2026-03-17] Error: Componente re-renderiza infinitamente

**Problema:**
`useEffect` sin array de dependencias causaba loop infinito.

**Causa raíz:**
No entendíamos bien cómo funcionan las dependencias de useEffect.

**Solución:**
Añadir array de dependencias vacío `[]` para ejecutar solo en mount.

**Regla nueva:**
SIEMPRE especificar dependencias en useEffect. Nunca dejarlo vacío.

---
```

#### Proceso de automejora:

1. **Escribe reglas para ti mismo** que eviten el mismo error
2. **Itera implacablemente** sobre estas lecciones hasta que la tasa de errores disminuya
3. **Revisa lessons.md al inicio de cada sesión** para el proyecto correspondiente

#### Checklist de inicio de sesión:

```bash
# Antes de empezar CUALQUIER sesión de código:
1. Leer tasks/lessons.md
2. Revisar tasks/todo.md (tareas pendientes)
3. Verificar que no haya errores conocidos sin resolver
```

---

### **REGLA #4: Verificación antes de Finalizar**

**Nunca marques una tarea como completa sin demostrar que funciona**

#### Checklist OBLIGATORIO antes de marcar como completo:

- [ ] **Compila sin errores**
  ```bash
  npm run build
  # Debe terminar con: "Compiled successfully"
  ```

- [ ] **TypeScript sin errores**
  ```bash
  npx tsc --noEmit
  # Debe terminar sin output
  ```

- [ ] **Tests pasan**
  ```bash
  npm test
  # Todos los tests en verde
  ```

- [ ] **Funciona manualmente**
  - Abrir app en navegador
  - Probar el flujo completo
  - Verificar en mobile (DevTools responsive mode)

- [ ] **Comparación con rama principal** (cuando sea relevante)
  ```bash
  git diff main..feature-branch
  # Revisar que los cambios tienen sentido
  ```

- [ ] **Pregunta crítica:** *"¿Aprobaría esto un Staff Engineer?"*
  - ¿El código es claro?
  - ¿Está bien documentado?
  - ¿Maneja errores correctamente?
  - ¿Sigue las convenciones del proyecto?

- [ ] **Ejecuta tests, comprueba logs, demuestra la corrección del código**

#### Si alguno de estos falla:
1. **NO marcar como completo**
2. **Arreglar el problema**
3. **Volver a verificar**

---

### **REGLA #5: Exige Elegancia (Equilibrado)**

**Para cambios no triviales:** haz una pausa y pregunta *"¿hay una forma más elegante?"*

#### Cuándo pausar y buscar elegancia:

- ✅ Implementación que requiere > 50 líneas
- ✅ Código que se repite en 3+ lugares
- ✅ Lógica que es difícil de explicar
- ✅ Solución que parece "hacky"

#### Proceso:

1. **Si un arreglo parece un parche (hacky):**
   - Pausa
   - Pregunta: *"Sabiendo todo lo que sé ahora, ¿cuál es la solución elegante?"*
   - Implementa la solución elegante

2. **Omite elegancia para arreglos simples y obvios**
   - Fix de typo
   - Ajuste de margin/padding
   - Cambio de texto

3. **NO hagas sobreingeniería**
   - La solución más simple que funciona > solución "perfecta" compleja
   - 10 líneas claras > 3 líneas "inteligentes" pero confusas

#### Cuándo NO buscar elegancia:

- ❌ Cuando la solución simple funciona bien
- ❌ Cuando el deadline es crítico
- ❌ Cuando es código temporal/experimental

#### Filosofía:

> **"Código elegante es código que el tú del futuro entenderá sin esfuerzo."**

---

### **REGLA #6: Corrección de Errores Autónoma**

**Cuando recibes un informe de error:** simplemente arréglalo. No pidas que te lleven de la mano.

#### Proceso de corrección:

1. **Identifica logs, errores o tests que fallan**
   ```bash
   # Ver errores en consola del navegador
   # Ver logs de servidor (npm run dev)
   # Ver output de tests
   ```

2. **Cero necesidad de cambio de contexto** por parte del usuario
   - Usuario reporta: "El botón de guardar no funciona"
   - Claude: ✅ Investiga → Encuentra el bug → Lo arregla → Verifica
   - Claude: ❌ NO pide "¿puedes darme más detalles?" a menos que sea absolutamente necesario

3. **Ve a arreglar los tests de CI** que fallan sin que te digan cómo
   - Si GitHub Actions falla: lee el log, identifica el problema, arréglalo
   - Si Vercel deploy falla: lee el error, arréglalo

#### Limitación importante:

- **Máximo 3 intentos de arreglo autónomo**
- Si después de 3 intentos no funciona:
  ```markdown
  He intentado 3 soluciones diferentes:
  1. [Intento 1] - Falló porque X
  2. [Intento 2] - Falló porque Y  
  3. [Intento 3] - Falló porque Z
  
  Necesito más contexto sobre: [pregunta específica]
  ```

#### Errores que requieren pregunta inmediata:

- ❌ Error relacionado con credenciales/API keys
- ❌ Error de configuración del entorno del usuario
- ❌ Ambigüedad en los requerimientos del negocio

---

## 📊 GESTIÓN DE TAREAS

### **Sistema de archivos de tareas**

```
spark/
├── tasks/
│   ├── todo.md           ← Lista maestra de tareas
│   ├── lessons.md        ← Lecciones aprendidas
│   └── decisions.md      ← Log de decisiones arquitectónicas
```

---

### **1. Planificar Primero**

**Escribe el plan en `tasks/todo.md` con elementos verificables**

#### Estructura de todo.md:

```markdown
# 📋 TAREAS SPARK

## 🔴 EN PROGRESO

### Feature: Sistema de captura de ideas
**Prioridad:** Alta  
**Estimado:** 2 días  
**Asignado:** Semana 1

**Elementos verificables:**
- [ ] Componente CaptureForm.tsx creado
  - Debe tener input de texto
  - Debe validar que no esté vacío
  - Debe mostrar loading state
- [ ] API route POST /api/ideas funcional
  - Debe guardar en Supabase
  - Debe retornar 201 con la idea creada
  - Debe manejar errores (400, 500)
- [ ] Tests de CaptureForm escritos
  - Test: renderiza correctamente
  - Test: muestra error si input vacío
  - Test: llama a API al submit
- [ ] Probado manualmente en Chrome mobile

**Criterio de completado:**
Usuario puede escribir idea, presionar Enter, y verla guardada en Supabase.

---

## 🟡 PENDIENTE (Backlog)

### Feature: Inbox de ideas
**Prioridad:** Alta  
**Estimado:** 1 día  
**Depende de:** Sistema de captura

- [ ] Componente IdeaCard.tsx
- [ ] Página /ideas con lista
- [ ] Loading states
- [ ] Empty state

---

## 🟢 COMPLETADO

### ✅ Setup inicial del proyecto
**Completado:** 2026-03-16

- [x] Crear proyecto Next.js
- [x] Configurar TypeScript
- [x] Configurar Tailwind
- [x] Setup de Git + GitHub
```

---

### **2. Verificar Plan**

**Confirma antes de comenzar la implementación**

#### Proceso de verificación:

```markdown
## ✅ VERIFICACIÓN DE PLAN

Antes de empezar a codear, responde:

1. ¿Están claros los archivos que voy a crear/modificar?
   - [ ] Sí, tengo la lista completa
   
2. ¿Entiendo las decisiones arquitectónicas?
   - [ ] Sí, sé por qué elegimos este enfoque
   
3. ¿Tengo todos los elementos verificables definidos?
   - [ ] Sí, sé cómo probar que funciona
   
4. ¿Hay alguna dependencia bloqueante?
   - [ ] No, puedo empezar ahora
   
5. ¿El usuario aprobó este plan?
   - [ ] Sí, confirmado

Si todas las respuestas son "Sí", ADELANTE.
Si alguna es "No", PAUSAR y aclarar.
```

---

### **3. Seguir el Progreso**

**Marca los elementos como completados a medida que avances**

#### Formato de actualización:

```markdown
### Feature: Sistema de captura de ideas

- [x] Componente CaptureForm.tsx creado ✅ (2026-03-16 14:30)
- [x] API route POST /api/ideas funcional ✅ (2026-03-16 15:45)
- [ ] Tests de CaptureForm escritos 🔄 (en progreso)
- [ ] Probado manualmente en Chrome mobile

**Progreso:** 50% (2/4 completado)
**Bloqueadores:** Ninguno
**Notas:** Tests toman más tiempo de lo esperado, necesito entender Vitest mejor
```

---

### **4. Explicar Cambios**

**Resume de alto nivel en cada paso**

#### Formato de resumen:

```markdown
## 📝 RESUMEN DE CAMBIOS

### [2026-03-16 15:45] API route POST /api/ideas

**Qué hice:**
Creé el endpoint para guardar ideas en Supabase.

**Archivos modificados:**
- app/api/ideas/route.ts (creado)
- lib/supabase.ts (actualizado con tipo Idea)

**Decisiones importantes:**
- Usamos Server Actions en lugar de API route tradicional
- Validación de input con Zod
- Manejo de errores con try/catch y mensajes descriptivos

**Cómo verificar:**
```bash
curl -X POST http://localhost:3000/api/ideas \
  -H "Content-Type: application/json" \
  -d '{"content": "Test idea"}'
```

**Siguiente paso:**
Crear tests para este endpoint.
```

---

### **5. Documentar Resultados**

**Añade una sección de revisión a `tasks/todo.md`**

#### Formato de revisión post-feature:

```markdown
## 📊 REVISIÓN: Sistema de captura de ideas

**Completado:** 2026-03-16  
**Tiempo real:** 2.5 días (vs 2 días estimado)

### ✅ Logros
- Captura funciona perfectamente en mobile
- API maneja errores correctamente
- Tests coverage: 85%

### ⚠️ Desafíos
- Tests de React tomaron más tiempo del esperado
- Tuve que refactorear el componente 2 veces
- Problema con tipos de Supabase (ver lessons.md)

### 📚 Aprendizajes
- Agregados a tasks/lessons.md:
  - Cómo configurar Vitest con Next.js 14
  - Patrón de Server Actions vs API routes
  - Manejo de loading states en React

### 🔮 Próximos pasos
- Feature siguiente: Inbox de ideas
- Refactor posible: Extraer validación a lib/validators.ts
```

---

### **6. Capturar Lecciones**

**Actualiza `tasks/lessons.md` después de las correcciones**

**Ver REGLA #3: Bucle de Automejora** para formato completo.

---

## 🎯 PRINCIPIOS FUNDAMENTALES

### **Simplicidad Primero**

> **"Haz que cada cambio sea lo más simple posible. Afecta al mínimo código necesario."**

#### Checklist de simplicidad:

- [ ] ¿Puedo resolver esto en < 50 líneas?
- [ ] ¿Estoy modificando solo los archivos necesarios?
- [ ] ¿Un junior developer entendería este código?
- [ ] ¿Evité abstracciones innecesarias?

#### Anti-patrones a evitar:

❌ **Sobreingeniería:**
```typescript
// MAL: Demasiado genérico
interface GenericDataFetcher<T, K extends keyof T> {
  fetch(key: K): Promise<T[K]>;
  cache: Map<K, T[K]>;
}

// BIEN: Específico y simple
async function getIdeas(userId: string): Promise<Idea[]> {
  return supabase.from('ideas').select('*').eq('user_id', userId);
}
```

❌ **Premature optimization:**
```typescript
// MAL: Optimizando antes de necesitarlo
const memoizedIdeas = useMemo(() => 
  ideas.filter(i => i.status === 'active')
    .sort((a, b) => b.created_at - a.created_at),
  [ideas]
);

// BIEN: Simple, optimiza solo si es lento
const activeIdeas = ideas
  .filter(i => i.status === 'active')
  .sort((a, b) => b.created_at - a.created_at);
```

---

### **Sin Pereza**

> **"Encuentra las causas raíz. Nada de arreglos temporales. Estándares de desarrollador senior."**

#### Estándar de código senior:

**SIEMPRE pregúntate:**
1. ¿Por qué falló esto realmente?
2. ¿Mi fix ataca la causa o solo el síntoma?
3. ¿Esto podría romper otra cosa?
4. ¿Hay un test que prevenga esto en el futuro?

#### Ejemplos de causa raíz:

❌ **Arreglo temporal:**
```typescript
// Síntoma: El componente no muestra datos
// Fix temporal: Forzar re-render
useEffect(() => {
  forceUpdate();
}, []);
```

✅ **Causa raíz:**
```typescript
// Causa raíz: useEffect no tenía las dependencias correctas
useEffect(() => {
  loadIdeas();
}, [userId]); // ← Faltaba esta dependencia
```

---

### **Impacto Mínimo**

> **"Los cambios solo deben tocar lo necesario. Evita introducir errores."**

#### Checklist de impacto:

Antes de hacer un cambio, pregunta:

- [ ] ¿Cuántos archivos voy a modificar?
  - **1-2 archivos:** ✅ Buen impacto
  - **3-5 archivos:** ⚠️ Revisar si es necesario
  - **6+ archivos:** 🚨 Probablemente estás haciendo demasiado de golpe

- [ ] ¿Este cambio afecta código que ya funciona?
  - **No:** ✅ Seguro
  - **Sí:** ⚠️ Asegurar que no rompe nada (tests)

- [ ] ¿Puedo hacer esto en pasos más pequeños?
  - **Sí:** ✅ Hazlo en pasos
  - **No:** ⚠️ Revisar si realmente no se puede

#### Estrategia de cambios incrementales:

```markdown
## Feature grande: Sistema completo de prompts

### ❌ MAL ENFOQUE (todo de golpe):
1. Crear schema de prompts
2. Crear API routes
3. Crear componentes UI
4. Crear lógica de generación
5. Integrar todo
→ 15 archivos modificados, alto riesgo

### ✅ BUEN ENFOQUE (incremental):

**Paso 1:** Schema + migración
- 1 archivo: migrations/001_add_prompts.sql
- Deploy, verificar que no rompe nada

**Paso 2:** API route básico
- 1 archivo: app/api/prompts/route.ts
- Testear endpoint aislado

**Paso 3:** Componente UI simple
- 1 archivo: components/PromptCard.tsx
- Testear componente aislado

**Paso 4:** Integración
- 2 archivos: modificar idea page + conectar API
- Testear flujo completo

→ 4 pasos, cada uno verificable, bajo riesgo
```

---

## 🔄 WORKFLOW COMPLETO (RESUMEN)

### Para cada feature nueva:

```
1. PLANIFICAR (tasks/todo.md)
   ├─ Definir objetivo
   ├─ Listar archivos afectados
   ├─ Decisiones arquitectónicas
   ├─ Elementos verificables
   └─ Criterio de completado
   
2. VERIFICAR PLAN
   └─ Usuario aprueba? → SÍ: continuar | NO: refinar
   
3. IMPLEMENTAR
   ├─ Leer tasks/lessons.md (evitar errores pasados)
   ├─ Codear siguiendo principios fundamentales
   ├─ Marcar progreso en tasks/todo.md
   └─ Documentar decisiones importantes
   
4. VERIFICAR FUNCIONAMIENTO
   ├─ TypeScript compila
   ├─ Tests pasan
   ├─ Funciona manualmente
   └─ Pregunta: ¿Aprobaría esto un Staff Engineer?
   
5. DOCUMENTAR RESULTADOS
   ├─ Resumen de cambios
   ├─ Lecciones aprendidas → tasks/lessons.md
   └─ Marcar como completo en tasks/todo.md
   
6. SIGUIENTE PASO
   └─ Definir qué sigue
```

---

## 📚 ESTRUCTURA DE ARCHIVOS DE TAREAS

```
spark/
├── tasks/
│   ├── todo.md           ← Lista maestra de tareas
│   │                        - En progreso
│   │                        - Pendiente
│   │                        - Completado
│   │
│   ├── lessons.md        ← Lecciones aprendidas
│   │                        - Errores cometidos
│   │                        - Soluciones aplicadas
│   │                        - Reglas nuevas
│   │
│   └── decisions.md      ← Log de decisiones arquitectónicas
│                            - Por qué elegimos X
│                            - Alternativas descartadas
│                            - Tradeoffs aceptados
```

---

## 🎯 ADAPTACIONES PARA SPARK ESPECÍFICAMENTE

### **1. Testing progresivo (no todo desde día 1)**

**Semana 1-2:** Unit tests de funciones puras solamente
- Validadores
- Utilidades
- Helpers

**Semana 3:** Component tests básicos
- Componentes principales (CaptureForm, IdeaCard)
- Casos felices primero

**Semana 4:** Si hay tiempo, integration tests
- Flujos críticos
- Happy path principal

**Post-MVP:** E2E tests con Playwright

---

### **2. Presupuesto ultra-limitado = Decisiones conscientes**

**Antes de añadir CUALQUIER dependencia:**

```markdown
## ¿Necesito esta librería?

1. ¿Puedo hacerlo con código nativo? (30 líneas o menos)
   - SÍ: No instalar librería
   - NO: Continuar

2. ¿Esta librería añade mucho bundle size? (> 50KB)
   - SÍ: Buscar alternativa más ligera
   - NO: Continuar

3. ¿Esta librería está bien mantenida? (commit en último mes)
   - NO: Buscar alternativa
   - SÍ: OK para instalar

Ejemplos:
- Moment.js (❌ 67KB) → date-fns (✅ 12KB)
- Lodash completo (❌ 71KB) → lodash-es con tree-shaking (✅ solo lo que uses)
- React Hook Form (✅ 9KB) → OK
```

---

### **3. Mobile-first obligatorio**

**Antes de marcar cualquier UI como completa:**

- [ ] Probado en Chrome DevTools responsive mode (iPhone 12/13)
- [ ] Touch targets > 44px (thumb-friendly)
- [ ] Textos legibles sin zoom (min 16px)
- [ ] No scroll horizontal
- [ ] Loading states visibles

---

### **4. Contexto limitado en Claude.ai**

**Estrategia de sesiones:**

Cuando el contexto se sature (>100K tokens):
1. Exportar tasks/todo.md actualizado
2. Exportar tasks/lessons.md actualizado
3. Cerrar sesión
4. Nueva sesión: cargar archivos exportados
5. Continuar desde donde quedamos

**Señales de contexto saturado:**
- Respuestas se vuelven más lentas
- Claude repite información
- Claude olvida decisiones pasadas

---

## ✅ CHECKLIST DE INICIO DE CADA SESIÓN

```markdown
Antes de empezar a codear HOY:

- [ ] Leí tasks/todo.md (tareas pendientes)
- [ ] Leí tasks/lessons.md (errores a evitar)
- [ ] Leí INSTRUCCIONES_SPARK.md (convenciones del proyecto)
- [ ] Sé cuál es mi objetivo de hoy
- [ ] Tengo un plan claro con elementos verificables
- [ ] Usuario aprobó el plan (si es feature nueva)

✅ TODO LISTO → Empezar a codear
❌ FALTA ALGO → Completar antes de codear
```

---

## 🎯 CHECKLIST DE CIERRE DE CADA SESIÓN

```markdown
Antes de cerrar la sesión de HOY:

- [ ] Actualicé tasks/todo.md con progreso
- [ ] Si cometí errores, los documenté en tasks/lessons.md
- [ ] Si tomé decisiones arquitectónicas, las documenté en tasks/decisions.md
- [ ] Hice commit de los cambios con mensaje descriptivo
- [ ] Definí qué sigue para la próxima sesión
- [ ] Tests pasan (o marqué como WIP en todo.md)

✅ TODO COMPLETO → Cerrar sesión
❌ FALTA ALGO → Completar antes de cerrar
```

---

## 🔥 ANTI-PATRONES A EVITAR

### ❌ **1. Codear antes de planificar**
```
Usuario: "Necesito el sistema de prompts"
Claude: *Empieza a escribir código inmediatamente*
```
**Correcto:** Primero escribir plan en tasks/todo.md, luego codear

---

### ❌ **2. No verificar antes de marcar completo**
```
Claude: "✅ Feature de captura completada"
Usuario: *Prueba y no funciona*
```
**Correcto:** Verificar manualmente + tests antes de marcar ✅

---

### ❌ **3. Arreglos temporales sin investigar causa raíz**
```
// "Funciona con este setTimeout, no sé por qué"
setTimeout(() => {
  loadData();
}, 1000);
```
**Correcto:** Investigar POR QUÉ falla, arreglar causa raíz

---

### ❌ **4. No documentar lecciones aprendidas**
```
Usuario: "Esto está mal"
Claude: *Arregla*
Usuario: *Mismo error 2 semanas después*
```
**Correcto:** Documentar en tasks/lessons.md + crear regla

---

### ❌ **5. Cambios masivos sin pasos incrementales**
```
*Modifica 15 archivos de golpe*
*Algo falla*
*No se sabe qué lo causó*
```
**Correcto:** Cambios pequeños, verificables, incrementales

---

## 📖 RECURSOS DE REFERENCIA

Durante el desarrollo de Spark, estos son los documentos maestros:

1. **Spark_Project_Brief_v2.1.md** - QUÉ construimos
2. **WORKFLOW_SPARK.md** (este archivo) - CÓMO lo construimos
3. **INSTRUCCIONES_SPARK.md** - REGLAS de código y colaboración
4. **tasks/todo.md** - ESTADO actual del proyecto
5. **tasks/lessons.md** - ERRORES pasados a evitar

**Orden de lectura al empezar:**
1. Brief (entender el producto)
2. Workflow (entender el proceso)
3. Instrucciones (entender las reglas)
4. Tasks (saber qué hacer ahora)

---

## 🎯 FILOSOFÍA FINAL

> **"No se trata de codear rápido. Se trata de codear bien."**

- ✅ Mejor 1 feature bien hecha que 5 a medias
- ✅ Mejor código simple que funciona que código "inteligente" que confunde
- ✅ Mejor prevenir bugs con planificación que arreglarlos después
- ✅ Mejor aprender de errores que repetirlos

**Spark será exitoso no porque tenga muchas features, sino porque las que tiene funcionan impecablemente.**

---

*Workflow vivo — se actualiza con cada lección aprendida*

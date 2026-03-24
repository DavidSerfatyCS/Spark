# ⚡ SPARK
*Tu sistema personal de ideas — nunca pierdas una chispa*

**Project Brief v2.1 FINAL** | Marzo 2026

---

## 📌 CAMBIOS vs v2.0

**v2.1 simplifica el MVP basado en:**
- ✅ Presupuesto mínimo (< $10/mes)
- ✅ Modelo copy/paste (usuario usa su propia IA)
- ✅ Eliminación de background AI jobs
- ✅ Eliminación de web search automático
- ✅ Límite de 10 ideas (free tier)
- ✅ Email notifications (no push)
- ✅ 2 estados de idea (no 4)
- ✅ Generación manual de prompts (no automática)

---

## 1. Visión del Producto

Spark es una **PWA instalable** dedicada exclusivamente a capturar y desarrollar ideas espontáneas. Diseñada para el momento del día en que las ideas aparecen — la ducha, antes de dormir, caminando.

### El Problema

| Aspecto | Descripción |
|---------|-------------|
| **El dolor** | Las ideas aparecen en momentos random y quedan como notas muertas en WhatsApp o Notes. El usuario vuelve días después, lee "app para X" y **no sabe por dónde empezar**. La idea muere por fricción, no por falta de potencial. |
| **La solución** | App ultra-rápida de captura + **generador de prompts inteligentes** que el usuario copia y pega en ChatGPT/Claude. Spark organiza todo. El usuario paga su propia IA. |
| **Diferenciador CORE** | **No competimos con AI, somos el copilot**. Spark genera los prompts perfectos, el usuario los ejecuta en su IA favorita, Spark organiza las respuestas en un sistema visual de desarrollo de ideas. |

---

## 2. El Modelo: "Spark como Copilot de IA"

### 🎯 Concepto Central

**Spark NO hace llamadas costosas a IA. Spark GENERA prompts que el usuario ejecuta.**

### Flujo Completo

```
PASO 1: CAPTURA
Usuario escribe: "App para rentar cámaras entre fotógrafos"
  ↓
Spark guarda la idea
  ↓
Usuario ve botón: "✨ Generar prompts para desarrollar"

PASO 2: GENERACIÓN DE PROMPTS (cuando usuario pide)
Usuario hace click
  ↓
Spark genera 3-5 prompts optimizados:
  
  📋 Prompt 1: "Analiza competencia de apps de rental..."
  📋 Prompt 2: "Identifica riesgos de plataformas P2P..."
  📋 Prompt 3: "Genera plan de validación en 2 semanas..."
  📋 Prompt 4: "Lista features esenciales del MVP..."

PASO 3: USUARIO EJECUTA (en su IA favorita)
Usuario copia "Prompt 1"
  ↓
Pega en ChatGPT/Claude/Gemini
  ↓
ChatGPT responde con análisis completo
  ↓
Usuario copia la respuesta

PASO 4: ORGANIZACIÓN
Usuario vuelve a Spark
  ↓
Pega respuesta en el campo del Prompt 1
  ↓
Spark guarda y marca como "respondido" ✅
  ↓
Spark organiza visualmente el desarrollo de la idea

RESULTADO:
Usuario tiene su idea desarrollada
Spark organizó todo el conocimiento
Costo de IA: $0 para Spark, pagado por usuario
```

---

## 3. Por qué este Modelo es Brillante

### 💰 **Ventaja #1: Costos ultra-bajos**

| Concepto | Costo anterior (v2.0) | Costo nuevo (v2.1) |
|----------|----------------------|-------------------|
| Web search automático | $100/mes | $0 (eliminado) |
| AI calls para desarrollar ideas | $30-50/mes | $0 (usuario paga) |
| Background jobs | Requiere Vercel Pro | $0 (eliminado) |
| Generación de prompts | N/A | ~$2-5/mes (súper barato) |
| **TOTAL** | **~$130-150/mes** | **< $10/mes** ✅ |

### 🎯 **Ventaja #2: Usuario tiene control**

- ✅ Usa su IA favorita (ChatGPT, Claude, Gemini, Llama local)
- ✅ Puede ver y modificar el prompt antes de ejecutarlo
- ✅ Puede ejecutar el prompt múltiples veces con variaciones
- ✅ No está atado a un proveedor de IA

### 🚀 **Ventaja #3: Más rápido de construir**

- ❌ No necesitamos background jobs (Vercel Cron)
- ❌ No necesitamos manejar timeouts de OpenAI
- ❌ No necesitamos cola de tareas
- ❌ No necesitamos webhooks
- ✅ Todo es client-side o API routes simples

### 💎 **Ventaja #4: Path claro a Premium**

**Free Tier:**
- Genera prompts ilimitados
- Copy/paste workflow
- 10 ideas activas

**Premium ($7/mes):**
- Ideas ilimitadas
- **AI calls directos** (sin copy/paste) ← Único valor real
- Web search automático
- Export a Notion/PDF

---

## 4. Objetivos del Proyecto

### Objetivos técnicos

- ✅ **Aprender Next.js 14** con App Router y API routes
- ✅ **Integrar IA de forma inteligente** (generación de prompts)
- ✅ **Construir PWA** instalable con offline mode
- ✅ **Conectar Supabase** para auth y base de datos
- ✅ **Deployar en Vercel** con CI/CD automático
- ✅ **Testing progresivo** (unit → component → integration)
- ✅ **Presupuesto < $10/mes** para 100 usuarios

### Objetivos de producto

- ✅ Capturar idea en **< 5 segundos**
- ✅ Generar prompts en **< 2 segundos** (client-side)
- ✅ Workflow copy/paste **sin fricción**
- ✅ Sistema visual de **desarrollo de ideas**
- ✅ **Email notifications** de ideas sin actividad
- ✅ Funcionar **perfectamente en móvil** (primera prioridad)

### Métricas de éxito (MVP)

| Métrica | Target |
|---------|--------|
| Tiempo de captura | < 5 segundos |
| Ideas capturadas por usuario (primera semana) | 5+ |
| Usuarios que generan prompts | 60%+ |
| Usuarios que pegan respuestas | 40%+ |
| Retención D7 | 30%+ |
| Ideas archivadas vs activas | < 20% archivadas |

---

## 5. Stack Tecnológico

| Tecnología | Rol | Costo |
|------------|-----|-------|
| **Next.js 14** | Framework principal (frontend + backend) | $0 |
| **TypeScript** | Tipado estático | $0 |
| **Tailwind CSS** | Estilos utility-first, mobile-first | $0 |
| **Supabase** | PostgreSQL + Auth | $0 (free tier) |
| **OpenAI API** | Solo generación de prompts (GPT-4o mini) | ~$2-5/mes |
| **Vercel** | Hosting + CI/CD | $0 (hobby plan) |
| **Vitest** | Testing framework | $0 |
| **React Testing Library** | Component testing | $0 |
| **Posthog** | Analytics | $0 (plan free hasta 1M events/mes) |
| **Resend** | Email notifications | $0 (100 emails/día gratis) |

**Total:** **< $10/mes** para 100 usuarios activos ✅

---

## 6. Arquitectura Simplificada

### Estructura de carpetas

```
spark/
├── app/
│   ├── page.tsx                      # HOME: Captura de ideas
│   ├── ideas/
│   │   ├── page.tsx                  # Inbox: lista de ideas
│   │   └── [id]/
│   │       └── page.tsx              # Vista de idea + prompts
│   ├── api/
│   │   ├── ideas/
│   │   │   ├── route.ts              # GET lista / POST nueva idea
│   │   │   └── [id]/
│   │   │       ├── route.ts          # GET / PUT / DELETE idea
│   │   │       └── archive/route.ts  # POST archivar idea
│   │   ├── prompts/
│   │   │   ├── generate/route.ts     # POST generar prompts para idea
│   │   │   └── [id]/
│   │   │       └── answer/route.ts   # PUT guardar respuesta de usuario
│   │   └── emails/
│   │       └── inactive-ideas/route.ts # Enviar emails de recordatorio
│   └── layout.tsx
├── components/
│   ├── CaptureForm.tsx               # Campo de captura principal
│   ├── IdeaCard.tsx                  # Tarjeta en inbox
│   ├── IdeaDetail/
│   │   ├── IdeaHeader.tsx            # Header con info de idea
│   │   ├── PromptCard.tsx            # Card de prompt individual
│   │   ├── PromptList.tsx            # Lista de prompts
│   │   └── GeneratePromptsButton.tsx # Botón para generar
│   └── EmptyState.tsx                # Estado vacío
├── lib/
│   ├── supabase.ts                   # Cliente de Supabase
│   ├── openai.ts                     # Cliente OpenAI (solo prompts)
│   ├── prompt-templates.ts           # Templates de prompts
│   ├── validators.ts                 # Validación con Zod
│   └── analytics.ts                  # Posthog wrapper
├── tasks/
│   ├── todo.md                       # Lista de tareas
│   ├── lessons.md                    # Lecciones aprendidas
│   └── decisions.md                  # Log de decisiones
└── __tests__/
    ├── components/
    │   ├── CaptureForm.test.tsx
    │   └── PromptCard.test.tsx
    └── lib/
        └── prompt-templates.test.ts
```

---

## 7. Base de Datos (Ultra-Simplificada)

### Schema SQL

```sql
-- ============================================
-- TABLA: ideas
-- ============================================
CREATE TABLE ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active', -- 'active' | 'archived'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_ideas_user_id ON ideas(user_id);
CREATE INDEX idx_ideas_status ON ideas(status);
CREATE INDEX idx_ideas_updated_at ON ideas(updated_at DESC);

-- ============================================
-- TABLA: prompts
-- ============================================
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'competition' | 'validation' | 'risks' | 'features' | 'business_model'
  prompt_text TEXT NOT NULL, -- El prompt generado para copiar
  user_response TEXT, -- La respuesta que el usuario pegó
  answered BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  answered_at TIMESTAMPTZ -- Cuándo el usuario respondió
);

-- Índices
CREATE INDEX idx_prompts_idea_id ON prompts(idea_id);
CREATE INDEX idx_prompts_answered ON prompts(answered);

-- ============================================
-- TABLA: users_metadata (límites)
-- ============================================
CREATE TABLE users_metadata (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  active_ideas_count INTEGER NOT NULL DEFAULT 0,
  max_active_ideas INTEGER NOT NULL DEFAULT 10, -- Free tier limit
  plan TEXT NOT NULL DEFAULT 'free', -- 'free' | 'premium'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger para contar ideas activas
CREATE OR REPLACE FUNCTION update_active_ideas_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users_metadata
  SET active_ideas_count = (
    SELECT COUNT(*)
    FROM ideas
    WHERE user_id = NEW.user_id AND status = 'active'
  ),
  updated_at = NOW()
  WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_active_ideas_count
AFTER INSERT OR UPDATE OF status ON ideas
FOR EACH ROW
EXECUTE FUNCTION update_active_ideas_count();
```

### Row Level Security (RLS)

```sql
-- Habilitar RLS
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users_metadata ENABLE ROW LEVEL SECURITY;

-- Policy: usuarios solo ven sus propias ideas
CREATE POLICY "Users can view own ideas"
  ON ideas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own ideas"
  ON ideas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ideas"
  ON ideas FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: usuarios solo ven prompts de sus ideas
CREATE POLICY "Users can view prompts of own ideas"
  ON prompts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM ideas
      WHERE ideas.id = prompts.idea_id
      AND ideas.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert prompts for own ideas"
  ON prompts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM ideas
      WHERE ideas.id = prompts.idea_id
      AND ideas.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update prompts of own ideas"
  ON prompts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM ideas
      WHERE ideas.id = prompts.idea_id
      AND ideas.user_id = auth.uid()
    )
  );

-- Policy: usuarios solo ven su metadata
CREATE POLICY "Users can view own metadata"
  ON users_metadata FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own metadata"
  ON users_metadata FOR UPDATE
  USING (auth.uid() = user_id);
```

---

## 8. Features del MVP

### F1 — Captura instantánea

**Descripción:**
Pantalla de inicio = campo de texto gigante. Sin fricción.

**Flow:**
1. Usuario abre app → Ve input de texto
2. Escribe idea: "App para X"
3. Presiona Enter
4. Idea guardada ✅
5. Redirige a página de la idea

**Validaciones:**
- Mínimo 10 caracteres
- Máximo 500 caracteres
- No permite ideas vacías o solo espacios

**Estados:**
- Default: Campo vacío con placeholder
- Typing: Contador de caracteres
- Loading: Spinner + "Guardando..."
- Success: Redirect a /ideas/[id]
- Error: Mensaje de error inline

---

### F2 — Inbox de ideas

**Descripción:**
Lista de todas las ideas del usuario. Filtrable por status.

**Vista de tarjeta:**
```
┌────────────────────────────────────────────┐
│ 💡 App para rentar cámaras                 │
│                                            │
│ 🟢 Activa                                  │
│ 🔔 3 prompts sin responder                 │ ← Badge
│                                            │
│ Hace 2 horas                               │
│                                            │
│ [Abrir] [Archivar]                         │
└────────────────────────────────────────────┘
```

**Filtros:**
- Todas (default)
- Activas
- Archivadas

**Límite visible:**
```
Banner cuando usuario tiene 8+ ideas activas:

┌────────────────────────────────────────────┐
│ ⚠️ Tienes 8/10 ideas activas               │
│                                            │
│ Archiva ideas viejas o upgrade a Premium   │
│ para ideas ilimitadas                      │
└────────────────────────────────────────────┘
```

**Empty states:**
- Sin ideas: "Captura tu primera idea"
- Sin activas: "Todas tus ideas están archivadas"
- Sin archivadas: "No tienes ideas archivadas"

---

### F3 — Vista de idea con prompts

**Descripción:**
Página de idea individual que muestra:
1. La idea original
2. Botón para generar prompts
3. Lista de prompts generados
4. Campo para pegar respuestas

**Layout:**

```
┌─────────────────────────────────────────────────┐
│ ← Volver al inbox                               │
│                                                 │
│ 💡 App para rentar cámaras entre fotógrafos     │
│ 🟢 Activa · Creada hace 2 horas                 │
│                                                 │
│ [Archivar] [Editar]                             │
├─────────────────────────────────────────────────┤
│                                                 │
│ ✨ Desarrolla tu idea                           │
│                                                 │
│ [Generar prompts inteligentes]                  │
│     ↑ Solo si no hay prompts generados          │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ 📋 PROMPTS GENERADOS (4)                        │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ Prompt 1: Análisis de competencia           │ │
│ │ ❌ Sin responder                             │ │
│ │                                             │ │
│ │ "Eres un experto en análisis de mercado..." │ │
│ │                                             │ │
│ │ [📋 Copiar prompt]                           │ │
│ │                                             │ │
│ │ Pega aquí la respuesta de tu IA:            │ │
│ │ ┌─────────────────────────────────────────┐ │ │
│ │ │ [Textarea vacío]                        │ │ │
│ │ └─────────────────────────────────────────┘ │ │
│ │                                             │ │
│ │ [Guardar respuesta]                         │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ Prompt 2: Identificar riesgos               │ │
│ │ ✅ Respondido hace 1 hora                   │ │
│ │                                             │ │
│ │ [Ver prompt] [Ver respuesta]                │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ [...más prompts...]                             │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Interacciones:**

1. **Generar prompts:**
   - Click en botón
   - Loading: "Generando prompts..." (1-2 seg)
   - Genera 4-5 prompts
   - Se expanden automáticamente

2. **Copiar prompt:**
   - Click en "Copiar prompt"
   - Feedback: Botón cambia a "✅ Copiado" por 2 segundos
   - Clipboard contiene el prompt completo

3. **Guardar respuesta:**
   - Usuario pega respuesta en textarea
   - Click en "Guardar"
   - Loading: "Guardando..."
   - Success: Marca como ✅ respondido
   - Card se colapsa, muestra "Ver respuesta"

---

### F4 — Generación inteligente de prompts

**Descripción:**
Sistema que genera prompts optimizados basados en la idea del usuario.

**Tipos de prompts generados:**

1. **Análisis de competencia** (competition)
   ```
   Eres un experto en análisis de mercado.
   
   Analiza la competencia para esta idea:
   "[IDEA DEL USUARIO]"
   
   Lista:
   - Competidores existentes (nombre + URL)
   - Sus fortalezas principales
   - Sus debilidades o gaps
   - Oportunidades no cubiertas
   
   Sé específico y usa datos cuando sea posible.
   ```

2. **Identificar riesgos** (risks)
   ```
   Eres un consultor de startups con 20 años de experiencia.
   
   Para esta idea:
   "[IDEA DEL USUARIO]"
   
   Identifica los 5 riesgos más críticos que podrían hacer fallar
   este proyecto. Para cada riesgo:
   - Descripción del riesgo
   - Probabilidad (alta/media/baja)
   - Impacto si ocurre
   - Cómo mitigarlo
   
   Sé brutalmente honesto.
   ```

3. **Plan de validación** (validation)
   ```
   Eres un experto en Lean Startup y validación de ideas.
   
   Para esta idea:
   "[IDEA DEL USUARIO]"
   
   Crea un plan de validación de 2 semanas con presupuesto $0:
   - Hipótesis más riesgosa a probar
   - 3 formas de validarla sin construir producto
   - Métricas específicas de éxito
   - Red flags que indicarían abandonar la idea
   
   El plan debe ser accionable HOY.
   ```

4. **Features esenciales del MVP** (features)
   ```
   Eres un Product Manager con experiencia en MVPs exitosos.
   
   Para esta idea:
   "[IDEA DEL USUARIO]"
   
   Lista las 5 features ESENCIALES del MVP (no nice-to-have):
   - Solo features SIN las cuales el producto no tiene sentido
   - Prioriza por impacto en el problema core
   - Excluye todo lo que se puede agregar después
   
   Sé despiadado con el scope. Menos es más.
   ```

5. **Modelo de negocio** (business_model)
   ```
   Eres un experto en modelos de negocio y monetización.
   
   Para esta idea:
   "[IDEA DEL USUARIO]"
   
   Propón 3 modelos de monetización viables:
   - Modelo 1: [nombre] - cómo funciona, pros/cons
   - Modelo 2: [nombre] - cómo funciona, pros/cons
   - Modelo 3: [nombre] - cómo funciona, pros/cons
   
   Incluye ejemplos de empresas similares que usan cada modelo.
   ```

**Implementación técnica:**

```typescript
// lib/prompt-templates.ts

export const PROMPT_TEMPLATES = {
  competition: (idea: string) => `Eres un experto en análisis de mercado...`,
  risks: (idea: string) => `Eres un consultor de startups...`,
  validation: (idea: string) => `Eres un experto en Lean Startup...`,
  features: (idea: string) => `Eres un Product Manager...`,
  business_model: (idea: string) => `Eres un experto en modelos de negocio...`
};

export function generatePrompts(idea: string) {
  return [
    {
      type: 'competition',
      prompt_text: PROMPT_TEMPLATES.competition(idea)
    },
    {
      type: 'risks',
      prompt_text: PROMPT_TEMPLATES.risks(idea)
    },
    {
      type: 'validation',
      prompt_text: PROMPT_TEMPLATES.validation(idea)
    },
    {
      type: 'features',
      prompt_text: PROMPT_TEMPLATES.features(idea)
    },
    {
      type: 'business_model',
      prompt_text: PROMPT_TEMPLATES.business_model(idea)
    }
  ];
}
```

**Costo de generación:**
- Generación client-side: **$0**
- Si usamos OpenAI para personalizar prompts: **~$0.001 por generación** (despreciable)

---

### F5 — Email notifications (recordatorios)

**Descripción:**
Sistema de emails para recordar al usuario ideas sin actividad.

**Trigger:**
Idea sin actividad (sin prompts generados o sin respuestas) por 7 días.

**Frecuencia:**
Máximo 1 email por semana por usuario.

**Contenido del email:**

```
Subject: 💡 Tienes 3 ideas esperando ser desarrolladas

Hola [Nombre],

Hace una semana guardaste estas ideas en Spark:

1. "App para rentar cámaras entre fotógrafos" (hace 8 días)
   → [Desarrollar ahora]

2. "Plataforma de clases de cocina online" (hace 10 días)
   → [Desarrollar ahora]

3. "App de networking para developers" (hace 12 días)
   → [Desarrollar ahora]

Las mejores ideas empiezan con una simple pregunta.
Genera prompts y empieza a explorarlas hoy.

[Abrir Spark]

---
¿No quieres estos recordatorios? [Desactivar emails]
```

**Implementación:**
- Resend API (100 emails/día gratis)
- API route: `/api/emails/inactive-ideas`
- Vercel Cron: ejecuta cada 24 horas
- Query: ideas sin actividad > 7 días

---

## 9. Roadmap — 4 Semanas

| Semana | Foco | Features | Hitos |
|--------|------|----------|-------|
| **Semana 1** | **Setup + Captura** | • Proyecto Next.js + TypeScript<br>• Supabase (auth + schema)<br>• Captura de ideas<br>• Inbox básico<br>• Unit tests | ✅ Usuario puede capturar ideas<br>✅ Ver lista de ideas<br>✅ Auth con magic link |
| **Semana 2** | **Prompts** | • Generación de prompts (templates)<br>• Vista de idea con prompts<br>• Copy/paste workflow<br>• Guardar respuestas<br>• Component tests | ✅ Generar prompts funciona<br>✅ Workflow copy/paste completo<br>✅ Prompts se guardan |
| **Semana 3** | **Polish + Límites** | • Sistema de límite (10 ideas)<br>• Estados de prompt (respondido/sin responder)<br>• Filtros en inbox<br>• Archivar ideas<br>• Analytics (Posthog) | ✅ Límite de 10 ideas funciona<br>✅ Analytics trackea eventos<br>✅ UI mobile-first pulida |
| **Semana 4** | **PWA + Launch** | • Configurar PWA (offline mode)<br>• Email notifications (Resend)<br>• Landing page pública<br>• Deploy en Vercel<br>• Tests finales | ✅ PWA instalable<br>✅ Emails funcionan<br>✅ App en producción |

---

## 10. Wireframes (Mobile-First)

### Pantalla 1: Captura (HOME)

```
┌─────────────────────────────┐
│         ⚡ Spark            │
├─────────────────────────────┤
│                             │
│                             │
│                             │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │  Escribe tu idea...   │  │
│  │                       │  │
│  │  [Cursor]             │  │
│  │                       │  │
│  │                       │  │
│  │                       │  │
│  │                       │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  0/500 caracteres           │
│                             │
│  [Guardar idea] ────────────│ ← Disabled si vacío
│                             │
│                             │
│  ──────────────────────     │
│                             │
│  [Ver mis ideas (5)]        │ ← Link al inbox
│                             │
└─────────────────────────────┘
```

---

### Pantalla 2: Inbox

```
┌─────────────────────────────┐
│ ← ⚡ Spark                   │
├─────────────────────────────┤
│ Filtros:                    │
│ [Todas] Activas Archivadas  │
├─────────────────────────────┤
│                             │
│ ┌─────────────────────────┐ │
│ │ 💡 App para rentar      │ │
│ │    cámaras              │ │
│ │                         │ │
│ │ 🟢 Activa               │ │
│ │ 🔔 3 prompts sin        │ │
│ │    responder            │ │
│ │                         │ │
│ │ Hace 2 horas            │ │
│ │                         │ │
│ │ [Abrir]                 │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ 💡 Plataforma de        │ │
│ │    clases online        │ │
│ │                         │ │
│ │ 🟢 Activa               │ │
│ │ ✅ Todos los prompts    │ │
│ │    respondidos          │ │
│ │                         │ │
│ │ Hace 1 día              │ │
│ │                         │ │
│ │ [Abrir]                 │ │
│ └─────────────────────────┘ │
│                             │
│ [+ Nueva idea]              │
│                             │
└─────────────────────────────┘
```

---

### Pantalla 3: Vista de idea (sin prompts aún)

```
┌─────────────────────────────┐
│ ← Volver                    │
├─────────────────────────────┤
│                             │
│ 💡 App para rentar cámaras  │
│    entre fotógrafos         │
│                             │
│ 🟢 Activa                   │
│ Creada hace 2 horas         │
│                             │
│ [Archivar] [Editar]         │
│                             │
├─────────────────────────────┤
│                             │
│  ✨ Desarrolla tu idea      │
│                             │
│  Genera prompts inteligentes│
│  para explorar:             │
│  • Competencia              │
│  • Riesgos                  │
│  • Validación               │
│  • Features MVP             │
│  • Modelo de negocio        │
│                             │
│  [Generar prompts] ─────────│
│                             │
└─────────────────────────────┘
```

---

### Pantalla 4: Vista de idea (con prompts)

```
┌─────────────────────────────┐
│ ← Volver                    │
├─────────────────────────────┤
│ 💡 App para rentar cámaras  │
│ 🟢 Activa · Hace 2 horas    │
│ [Archivar]                  │
├─────────────────────────────┤
│                             │
│ 📋 Prompts (5)              │
│                             │
│ ┌─────────────────────────┐ │
│ │ 1. Análisis competencia │ │
│ │ ❌ Sin responder         │ │
│ │                         │ │
│ │ [Ver prompt ▼]          │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ 2. Identificar riesgos  │ │
│ │ ✅ Respondido · 1h      │ │
│ │                         │ │
│ │ [Ver respuesta ▼]       │ │
│ └─────────────────────────┘ │
│                             │
│ [...más prompts...]         │
│                             │
└─────────────────────────────┘
```

---

### Pantalla 5: Prompt expandido (sin responder)

```
┌─────────────────────────────┐
│ ← Volver                    │
├─────────────────────────────┤
│ 📋 Prompt 1:                │
│    Análisis de competencia  │
│                             │
│ ❌ Sin responder            │
├─────────────────────────────┤
│                             │
│ "Eres un experto en         │
│ análisis de mercado.        │
│                             │
│ Analiza la competencia      │
│ para esta idea:             │
│ [App para rentar cámaras    │
│ entre fotógrafos]           │
│                             │
│ Lista:                      │
│ - Competidores existentes   │
│ - Sus fortalezas            │
│ - Sus debilidades           │
│ - Oportunidades no          │
│   cubiertas"                │
│                             │
│ [📋 Copiar prompt] ─────────│
│                             │
├─────────────────────────────┤
│                             │
│ Pega aquí la respuesta      │
│ de tu IA:                   │
│                             │
│ ┌───────────────────────┐   │
│ │ [Textarea grande]     │   │
│ │                       │   │
│ │                       │   │
│ │                       │   │
│ └───────────────────────┘   │
│                             │
│ [Guardar respuesta] ────────│
│                             │
└─────────────────────────────┘
```

---

## 11. Flujos de Usuario Completos

### Flujo 1: Usuario nuevo (First-time experience)

```
1. Usuario llega a spark.app
   ↓
2. Landing page:
   "Captura ideas. Desarróllalas con IA. Nunca pierdas una chispa."
   [Empezar gratis]
   ↓
3. Signup con magic link (email)
   ↓
4. Email: "Haz click para entrar a Spark"
   ↓
5. Click → Auto-login → Redirige a /
   ↓
6. Onboarding (1 pantalla):
   "¿Cómo funciona Spark?
   1. Escribe tu idea
   2. Genera prompts inteligentes
   3. Cópialos a ChatGPT/Claude
   4. Pega las respuestas aquí
   5. Spark organiza todo
   
   [Entendido, empecemos]"
   ↓
7. Pantalla de captura (vacía)
   "Escribe tu primera idea..."
```

---

### Flujo 2: Capturar y desarrollar idea

```
1. Usuario en pantalla de captura
   ↓
2. Escribe: "App para encontrar roommates compatibles"
   ↓
3. Presiona Enter
   ↓
4. Loading: "Guardando..." (< 1 seg)
   ↓
5. Redirige a /ideas/[id]
   ↓
6. Ve su idea + botón "Generar prompts"
   ↓
7. Click en "Generar prompts"
   ↓
8. Loading: "Generando..." (1-2 seg)
   ↓
9. Ve 5 prompts generados:
   - Análisis competencia
   - Identificar riesgos
   - Plan validación
   - Features MVP
   - Modelo negocio
   ↓
10. Click en "Copiar prompt" (Prompt 1)
    ↓
11. Abre ChatGPT en otra pestaña
    ↓
12. Pega prompt → ChatGPT responde
    ↓
13. Copia respuesta de ChatGPT
    ↓
14. Vuelve a Spark
    ↓
15. Pega respuesta en textarea
    ↓
16. Click "Guardar respuesta"
    ↓
17. Success: Prompt marca como ✅ respondido
    ↓
18. Repite para otros prompts cuando quiera
```

---

### Flujo 3: Alcanzar límite de ideas

```
1. Usuario tiene 9 ideas activas
   ↓
2. Crea idea #10
   ↓
3. Banner aparece:
   "⚠️ Alcanzaste el límite de 10 ideas activas.
   Archiva ideas viejas o upgrade a Premium"
   ↓
4. Usuario intenta crear idea #11
   ↓
5. Modal bloquea:
   "Has alcanzado tu límite de 10 ideas activas.
   
   Opciones:
   • Archivar ideas viejas que ya no necesitas
   • Upgrade a Premium (ideas ilimitadas)
   
   [Archivar ideas] [Ver Premium]"
   ↓
6. Si elige "Archivar":
   → Redirige a inbox con filtro "Activas"
   → Usuario archiva 2-3 ideas
   → Puede crear nuevas
   ↓
7. Si elige "Ver Premium":
   → Landing de Premium con pricing
```

---

## 12. Consideraciones Técnicas

### Autenticación

**Método:** Magic Link (Supabase Auth)

**Por qué:**
- ✅ Sin passwords = sin fricción
- ✅ Más seguro (no hay contraseña que robar)
- ✅ UX superior en mobile
- ✅ Supabase lo maneja todo

**Flow:**
```
1. Usuario entra email
2. Supabase envía magic link
3. Usuario hace click en email
4. Auto-login + redirect a app
```

**Configuración:**
```typescript
// lib/supabase.ts
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Login
await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: {
    emailRedirectTo: 'https://spark.app'
  }
});
```

---

### Performance

**Targets:**
- Time to Interactive: < 2 segundos
- Captura de idea: < 5 segundos
- Generación de prompts: < 2 segundos
- Lighthouse Score: 75+ (MVP), 90+ (post-launch)

**Optimizaciones:**
- Next.js Image optimization
- Lazy loading de componentes
- Code splitting por ruta
- Service Worker para offline
- Supabase connection pooling

---

### Analytics

**Tool:** Posthog (plan free: 1M events/mes)

**Eventos críticos:**
```typescript
// lib/analytics.ts
export const trackEvent = (event: string, properties?: object) => {
  posthog.capture(event, properties);
};

// Eventos a trackear:
- idea_captured
- prompts_generated
- prompt_copied
- prompt_answer_saved
- idea_archived
- limit_reached
- premium_viewed
```

**Dashboards:**
- Funnel: captura → genera prompts → pega respuestas
- Retención: D1, D7, D30
- Engagement: ideas por usuario, prompts por idea

---

### SEO

**Landing page pública** (`/landing`):
- Título: "Spark — Tu sistema personal de ideas"
- Description: "Captura ideas en segundos. Genera prompts inteligentes. Organiza todo."
- OG image: Preview de la app
- Structured data (JSON-LD)

**Blog** (post-MVP):
- `/blog` con artículos SEO
- "Cómo validar ideas de startup"
- "Los mejores prompts para ChatGPT"
- Etc.

---

## 13. Modelo de Monetización

### Free Tier

| Feature | Límite |
|---------|--------|
| Ideas activas | 10 máximo |
| Prompts generados | Ilimitado |
| Prompts respondidos | Ilimitado |
| Email notifications | Sí (1/semana max) |
| Copy/paste workflow | Sí |
| Archivar ideas | Sí |

**Costo para nosotros:** < $0.10/usuario/mes

---

### Premium ($7/mes)

| Feature | Detalle |
|---------|---------|
| Ideas activas | **Ilimitadas** |
| AI calls directos | Sin copy/paste ← ÚNICO VALOR REAL |
| Web search automático | Para análisis de competencia |
| Export | PDF, Markdown, Notion |
| GraphView | Vista visual de grafo |
| Custom prompts | Templates personalizados |
| Email notifications | Frecuencia configurable |
| Priority support | Email support < 24h |

**Costo para nosotros:** ~$2-5/usuario/mes (AI calls)
**Margen:** ~$2-5/usuario/mes

---

### Path a $10K MRR

```
Objetivo: $10,000/mes
Precio Premium: $7/mes

Necesitamos: 1,429 usuarios Premium

Funnel estimado (conservador):
- 10,000 usuarios free
- Conversión a Premium: 15%
- Premium users: 1,500
- MRR: $10,500 ✅

Timeline estimado:
- Mes 1-3: Construir MVP + iterar
- Mes 4-6: Growth (100-500 usuarios free)
- Mes 7-12: Scale (500-2K usuarios free)
- Mes 13-18: 10K usuarios free → 1.5K Premium
```

---

## 14. Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Copy/paste es muy friccionado | Media | Alto | Hacer UI súper clara, onboarding guiado |
| Usuarios no ven valor sin AI directa | Media | Alto | Educar que pueden usar su IA favorita gratis |
| Competencia con Notion AI, etc. | Alta | Medio | Enfocarnos en nicho: captura + desarrollo de ideas |
| Usuarios abusan del límite (10 cuentas) | Baja | Bajo | Rate limiting por IP, device fingerprinting |
| Costos de Supabase explotan | Baja | Alto | Monitorear queries, optimizar índices |
| OpenAI API sube precios | Media | Bajo | Ya no dependemos de ellos (solo prompts) |

---

## 15. Preguntas Abiertas (Para resolver en Semana 1)

1. **¿Onboarding interactivo o skip?**
   - A) Tutorial interactivo (1 idea dummy)
   - B) Video de 30 segundos
   - C) Solo texto explicativo
   - **Decisión:** TBD

2. **¿Editar idea después de crearla?**
   - A) Sí, con botón "Editar"
   - B) No, las ideas son inmutables
   - **Decisión:** TBD

3. **¿Permitir eliminar ideas (hard delete)?**
   - A) Sí, con confirmación
   - B) No, solo archivar (soft delete)
   - **Decisión:** TBD

4. **¿Orden de prompts?**
   - A) Siempre el mismo orden (competencia primero)
   - B) Orden aleatorio
   - C) Usuario puede reordenar
   - **Decisión:** TBD

5. **¿Regenerar prompts?**
   - A) Sí, botón "Regenerar todos"
   - B) No, solo 1 generación por idea
   - **Decisión:** TBD

---

## 16. Primeros Pasos

### Setup (Día 1)

```bash
# 1. Crear proyecto
npx create-next-app@latest spark --typescript --tailwind --app
cd spark

# 2. Instalar dependencias
npm install @supabase/supabase-js
npm install openai
npm install zod
npm install posthog-js
npm install resend

# 3. Dev dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event

# 4. Inicializar Git
git init
git add .
git commit -m "Initial commit: Next.js + TypeScript + Tailwind"

# 5. Crear repo en GitHub
gh repo create spark --public --source=. --push

# 6. Configurar Vercel
vercel link
```

### Variables de entorno

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

OPENAI_API_KEY=your-openai-key

NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

RESEND_API_KEY=your-resend-key
```

---

## 17. Definición de "Completado"

Para marcar el MVP como **LISTO PARA LANZAR:**

### Checklist técnico

- [ ] TypeScript compila sin errores
- [ ] Todos los tests pasan (coverage > 60%)
- [ ] Lighthouse score > 75
- [ ] PWA instalable en iOS y Android
- [ ] Funciona offline (modo básico)
- [ ] No hay console.errors en producción
- [ ] RLS configurado correctamente en Supabase
- [ ] Rate limiting implementado
- [ ] Analytics trackea todos los eventos críticos

### Checklist de producto

- [ ] Usuario puede capturar idea en < 5 segundos
- [ ] Usuario puede generar prompts en < 2 segundos
- [ ] Copy/paste workflow funciona sin fricción
- [ ] Límite de 10 ideas se respeta
- [ ] Emails de recordatorio se envían
- [ ] UI responsive en todos los tamaños
- [ ] Landing page pública está online
- [ ] Onboarding existe y es claro

### Checklist de negocio

- [ ] Pricing page creada
- [ ] Stripe checkout configurado (para Premium futuro)
- [ ] Terms of Service + Privacy Policy escritos
- [ ] Analytics dashboard configurado
- [ ] Funnel de conversión definido
- [ ] Plan de growth en Google Docs

**Cuando TODOS estén ✅ → LAUNCH** 🚀

---

## Conclusión

**"Las mejores apps nacen de un problema propio que no tenía buena solución."**

Spark v2.1 es:
- ✅ **Técnicamente viable** (stack simple, presupuesto bajo)
- ✅ **Diferenciado** (no competimos con AI, somos copilot)
- ✅ **Monetizable** (path claro a $10K MRR)
- ✅ **Construible en 4 semanas** (scope realista)

El modelo copy/paste no es un bug, es una **feature**. Le da control al usuario, reduce nuestros costos, y crea un path natural a Premium.

Vamos a construirlo. 🚀

---

*Documento vivo — v2.1 FINAL — Listo para implementación*

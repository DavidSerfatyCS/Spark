# 🎯 LOG DE DECISIONES ARQUITECTÓNICAS - SPARK

Este archivo documenta TODAS las decisiones técnicas importantes del proyecto.

**Propósito:** Entender por qué elegimos cada enfoque.

---

## Decisiones Pre-Desarrollo

### [2026-03-24] Modelo de producto: Copy/Paste en lugar de AI calls directos

**Decisión:**
Spark genera prompts que el usuario copia y pega en su IA favorita, en lugar de hacer llamadas directas a OpenAI API.

**Por qué:**
- ✅ Costos ultra-bajos (< $10/mes vs $130-150/mes)
- ✅ Usuario controla qué IA usa
- ✅ Path claro a Premium

**Tradeoffs:**
- ⚠️ Más fricción (copy/paste)

---

### [2026-03-24] Auth: Magic Link

**Decisión:**
Magic Link único método de auth.

**Por qué:**
- ✅ Sin passwords = sin fricción
- ✅ Más seguro
- ✅ UX superior en mobile

---

### [2026-03-24] Database: PostgreSQL (Supabase)

**Decisión:**
PostgreSQL via Supabase.

**Por qué:**
- ✅ RLS built-in
- ✅ Relaciones claras
- ✅ Plan free generoso

---

### [2026-03-24] Estados: 2 en lugar de 4

**Decisión:**
Solo `active` | `archived`

**Por qué:**
- ✅ Más simple = menos bugs
- ✅ Sin background AI, no necesitamos más

---

### [2026-03-24] Límite: 10 ideas free

**Decisión:**
10 ideas activas máximo (free tier)

**Por qué:**
- ✅ Balance entre generoso y restrictivo
- ✅ Incentiva Premium

---

### [2026-03-24] Testing: Progresivo

**Decisión:**
Unit → Component → Integration (progresivo)

**Por qué:**
- ✅ Realista para aprendiz
- ✅ Coverage crece orgánicamente

---

### [2026-03-24] Notifications: Email

**Decisión:**
Email (Resend) en lugar de push

**Por qué:**
- ✅ Más simple
- ✅ Funciona en todos los devices
- ✅ Plan free

---

*Actualizado: Decisiones iniciales*

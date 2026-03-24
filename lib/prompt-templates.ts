// ============================================
// ARCHIVO: lib/prompt-templates.ts
// PROPÓSITO: Genera prompts listos para copiar
// y pegar en ChatGPT/Claude/Gemini.
//
// Por ahora usa templates predefinidos.
// Cuando tengamos OpenAI API key, esta función
// se reemplaza por una llamada a GPT-4o mini
// sin cambiar nada más en la app.
// ============================================

export interface GeneratedPrompt {
  title: string;
  content: string;
  order_index: number;
}

// Genera 5 prompts para desarrollar cualquier idea.
// Cada prompt está diseñado para una perspectiva diferente.
export function generatePrompts(ideaContent: string): GeneratedPrompt[] {
  return [
    {
      order_index: 0,
      title: "Analiza la idea en profundidad",
      content: `Tengo esta idea: "${ideaContent}"

Analízala en profundidad respondiendo:
1. ¿Qué problema real resuelve y para quién exactamente?
2. ¿Cuál sería la propuesta de valor principal?
3. ¿Es una idea de producto, servicio, o negocio?
4. ¿Qué la hace diferente de lo que ya existe?
5. En una oración, ¿cómo la describirías a alguien en 10 segundos?`,
    },
    {
      order_index: 1,
      title: "Investiga el mercado y la competencia",
      content: `Idea: "${ideaContent}"

Investiga el mercado para esta idea:
1. ¿Quiénes son los competidores directos e indirectos más relevantes?
2. ¿Qué están haciendo bien y qué les falta?
3. ¿Hay un hueco de mercado claro que esta idea puede ocupar?
4. ¿Cuál es el tamaño aproximado del mercado potencial?
5. ¿Qué tendencias del mercado favorecen o dificultan esta idea?`,
    },
    {
      order_index: 2,
      title: "Diseña un plan de validación rápida",
      content: `Idea: "${ideaContent}"

Quiero validar esta idea lo más rápido y barato posible.
1. ¿Cuál es la hipótesis principal que necesito validar?
2. ¿Cuál sería el experimento más simple para probarla en 2 semanas?
3. ¿Cómo consigo mis primeros 10 usuarios potenciales para entrevistar?
4. ¿Qué métricas me dirían si la idea tiene tracción real?
5. ¿Cuál es el criterio de éxito mínimo para seguir adelante?`,
    },
    {
      order_index: 3,
      title: "Identifica riesgos y obstáculos",
      content: `Idea: "${ideaContent}"

Actúa como un crítico constructivo. Ayúdame a identificar los riesgos reales:
1. ¿Cuáles son los 3 mayores riesgos que podrían hacer fallar esta idea?
2. ¿Qué suposiciones estoy haciendo que podrían ser falsas?
3. ¿Qué obstáculos técnicos, legales o de mercado podría enfrentar?
4. ¿Qué pasaría si el mercado no responde como espero?
5. ¿Cómo mitigarías cada uno de estos riesgos?`,
    },
    {
      order_index: 4,
      title: "Define los próximos pasos concretos",
      content: `Idea: "${ideaContent}"

Quiero pasar de idea a acción esta semana.
1. ¿Cuáles son los 3 pasos más importantes que puedo dar en los próximos 7 días?
2. ¿Qué es lo mínimo que necesito construir para tener algo que mostrar?
3. ¿A quién debería hablar primero (expertos, potenciales usuarios, etc.)?
4. ¿Qué recursos necesito y cuáles ya tengo?
5. ¿Qué haría mañana a primera hora si decidiera seguir con esta idea?`,
    },
  ];
}

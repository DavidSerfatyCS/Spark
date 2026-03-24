// ============================================
// ARCHIVO: lib/validators.ts
// PROPÓSITO: Esquemas de validación con Zod.
//
// ¿Qué es Zod?
// Una librería para definir "shapes" de datos y
// validar que los datos recibidos coincidan.
// Es como un contrato: "este objeto DEBE tener
// estos campos con estos tipos".
//
// ¿Por qué validar en el servidor?
// La validación del browser (required, maxLength)
// es fácil de saltar con DevTools o curl.
// La validación del servidor es la que realmente
// protege la base de datos.
// ============================================

import { z } from "zod";

// ============================================
// SCHEMA: createIdeaSchema
// Valida el body del POST /api/ideas
// ============================================

export const createIdeaSchema = z.object({
  // content: el texto de la idea
  // - string: debe ser texto
  // - min(1): no puede estar vacío
  // - max(500): límite razonable para una "idea" (no es un ensayo)
  // - trim(): elimina espacios al inicio y final antes de validar
  content: z
    .string()
    .min(1, { message: "La idea no puede estar vacía" })
    .max(500, { message: "La idea no puede superar 500 caracteres" })
    .trim(),
});

// TypeScript type inferido del schema.
// En lugar de definir la interfaz manualmente,
// Zod la genera automáticamente desde el schema.
// Así el type y la validación siempre están sincronizados.
export type CreateIdeaInput = z.infer<typeof createIdeaSchema>;

// ============================================
// SCHEMA: updateIdeaSchema
// Para futuros PATCH /api/ideas/[id]
// Todos los campos son opcionales (partial)
// ============================================

export const updateIdeaSchema = createIdeaSchema.partial().extend({
  status: z.enum(["active", "archived"]).optional(),
});

export type UpdateIdeaInput = z.infer<typeof updateIdeaSchema>;

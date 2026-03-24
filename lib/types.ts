// ============================================
// ARCHIVO: lib/types.ts
// PROPÓSITO: Tipos TypeScript compartidos en toda la app.
//
// Centralizamos los tipos aquí para que componentes,
// API routes y páginas usen exactamente la misma
// definición. Si cambia el schema, cambia en un solo lugar.
// ============================================

// Refleja la tabla `ideas` de Supabase
export interface Idea {
  id: string;
  user_id: string;
  content: string;
  status: "active" | "archived";
  created_at: string;
  updated_at: string;
}

// Refleja la tabla `prompts` de Supabase
export interface Prompt {
  id: string;
  idea_id: string;
  title: string;
  content: string;
  answer: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

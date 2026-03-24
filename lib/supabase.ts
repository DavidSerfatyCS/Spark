// ============================================
// ARCHIVO: lib/supabase.ts
// PROPÓSITO: Cliente de Supabase para uso en
// componentes del BROWSER (Client Components).
//
// ¿Por qué dos clientes?
// Next.js App Router ejecuta código en dos lugares:
// 1. El SERVIDOR (Node.js) → usa supabase-server.ts
// 2. El BROWSER (del usuario) → usa este archivo
//
// Este cliente usa las cookies del browser para
// mantener la sesión del usuario autenticado.
// ============================================

import { createBrowserClient } from "@supabase/ssr";

// Variables de entorno públicas (NEXT_PUBLIC_) son
// accesibles en el browser. Las privadas (sin prefijo)
// solo en el servidor.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Creamos el cliente de Supabase para el browser.
// createBrowserClient de @supabase/ssr maneja las
// cookies automáticamente para auth en Next.js.
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// ============================================
// ARCHIVO: lib/supabase-server.ts
// PROPÓSITO: Cliente de Supabase para uso en
// SERVER COMPONENTS y API ROUTES de Next.js.
//
// ¿Por qué no usar el mismo cliente que en browser?
// En el servidor no existe el objeto `window` ni
// el localStorage del browser. Las cookies se
// manejan diferente: hay que leerlas del request
// HTTP y escribirlas en el response HTTP.
//
// @supabase/ssr se encarga de todo eso con
// createServerClient + el adaptador de cookies
// de Next.js.
// ============================================

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

// Este cliente se llama dentro de Server Components
// o API routes donde tenemos acceso a `cookies()`.
export function createClient() {
  // cookies() es una función de Next.js que lee las
  // cookies del request HTTP actual.
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // getAll: lee todas las cookies del request
        getAll() {
          return cookieStore.getAll();
        },
        // setAll: escribe cookies en el response
        // En Server Components esto puede fallar si
        // los headers ya fueron enviados, pero
        // el middleware lo maneja.
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Error esperado en Server Components.
            // El middleware se encarga de refrescar la sesión.
          }
        },
      },
    }
  );
}

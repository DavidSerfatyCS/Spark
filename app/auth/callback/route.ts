// ============================================
// ARCHIVO: app/auth/callback/route.ts
// PROPÓSITO: Ruta que Supabase llama después de
// que el usuario hace clic en el magic link.
//
// Flujo completo del magic link:
// 1. Usuario escribe email en /login
// 2. Supabase envía email con link tipo:
//    https://tu-app.com/auth/callback?code=ABC123
// 3. Usuario hace clic en el link
// 4. ESTA RUTA recibe el ?code=ABC123
// 5. Intercambia el code por una sesión real
// 6. Redirige al usuario a la app (/)
//
// Sin esta ruta, el magic link no funciona.
// ============================================

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  // El code es el token temporal que Supabase incluye en el magic link.
  // Tiene vida corta (5 minutos por defecto).
  const code = searchParams.get("code");

  // next: URL a la que redirigir después del login (opcional).
  // Ej: si el usuario intentó ir a /ideas antes de estar autenticado,
  // el middleware lo envía a /login?next=/ideas para redirigirlo después.
  const next = searchParams.get("next") ?? "/";

  if (!code) {
    // Sin code no podemos crear sesión. Algo salió mal.
    return NextResponse.redirect(`${origin}/login?error=no_code`);
  }

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  // exchangeCodeForSession: intercambia el code temporal
  // por una sesión permanente (access_token + refresh_token).
  // Supabase guarda estos tokens en las cookies automáticamente.
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Auth callback error:", error.message);
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }

  // Sesión creada. Redirigimos al usuario a la app.
  return NextResponse.redirect(`${origin}${next}`);
}

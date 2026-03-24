// ============================================
// ARCHIVO: middleware.ts
// PROPÓSITO: Proteger rutas que requieren auth.
//
// ¿Qué es el middleware de Next.js?
// Es código que se ejecuta ANTES de que Next.js
// procese cualquier request. Es como un guardia
// en la puerta: revisa cada request y decide
// si dejarlo pasar o redirigirlo.
//
// Este middleware hace dos cosas:
// 1. Refresca la sesión de Supabase en cada request
//    (para que los tokens no expiren)
// 2. Protege rutas privadas: si no estás autenticado,
//    te manda a /login
// ============================================

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Creamos una response inicial que "pasa" el request.
  // La modificaremos si necesitamos redirigir o actualizar cookies.
  let response = NextResponse.next({ request });

  // Creamos el cliente de Supabase especial para middleware.
  // Necesita leer cookies del REQUEST y escribirlas en el RESPONSE.
  // (Es diferente al cliente de server components que usa cookies() de next/headers)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          // Primero actualizamos las cookies del request
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // Luego recreamos la response con el request actualizado
          response = NextResponse.next({ request });
          // Y escribimos las cookies en la response (para que el browser las guarde)
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // getUser() refresca el token si está por expirar.
  // IMPORTANTE: usar getUser() en lugar de getSession().
  // getSession() solo lee las cookies locales (puede ser manipulado).
  // getUser() verifica con el servidor de Supabase (seguro).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Rutas públicas que NO requieren autenticación
  const isPublicRoute =
    pathname.startsWith("/login") || pathname.startsWith("/auth");

  // Si el usuario NO está autenticado y está intentando
  // acceder a una ruta privada → redirigir a /login
  if (!user && !isPublicRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    // Guardamos la URL original para redirigir después del login
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si el usuario SÍ está autenticado y va a /login
  // → redirigir a / (ya está logueado, no necesita loguearse)
  if (user && pathname.startsWith("/login")) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/";
    return NextResponse.redirect(homeUrl);
  }

  // Todo OK: dejar pasar el request con la response actualizada
  // (que puede incluir cookies de sesión renovadas)
  return response;
}

// config.matcher: define en qué rutas ejecutar el middleware.
// Esta regex excluye archivos estáticos para no afectar performance.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

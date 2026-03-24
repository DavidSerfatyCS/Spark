// ============================================
// ARCHIVO: app/api/ideas/route.ts
// PROPÓSITO: Endpoint REST para ideas.
//
// En Next.js App Router, cada archivo route.ts
// dentro de app/api/ se convierte en un endpoint.
// Exportas funciones GET, POST, PUT, DELETE
// y Next.js las enruta automáticamente.
//
// Este archivo maneja:
//   POST /api/ideas → crear nueva idea
//   GET  /api/ideas → listar ideas del usuario (Día 5)
// ============================================

import { createClient } from "@/lib/supabase-server";
import { createIdeaSchema } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";

// ============================================
// POST /api/ideas
// Guarda una nueva idea en Supabase.
// ============================================

export async function POST(request: NextRequest) {
  // 1. Verificar autenticación
  // Aunque el middleware ya protege las rutas,
  // siempre verificamos en el API también.
  // Defense in depth: nunca confíes solo en una capa.
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // 2. Parsear el body del request
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "El body debe ser JSON válido" },
      { status: 400 }
    );
  }

  // 3. Validar con Zod
  // safeParse no lanza excepción: retorna { success, data } o { success, error }
  const validation = createIdeaSchema.safeParse(body);

  if (!validation.success) {
    // validation.error.errors tiene los mensajes que definimos en validators.ts
    return NextResponse.json(
      { error: validation.error.errors[0].message },
      { status: 400 }
    );
  }

  // 4. Guardar en Supabase
  // RLS garantiza que user_id solo puede ser el del usuario autenticado.
  const { data: idea, error: dbError } = await supabase
    .from("ideas")
    .insert({
      user_id: user.id,
      content: validation.data.content,
      status: "active",
    })
    .select() // retorna la fila recién insertada
    .single(); // esperamos exactamente 1 resultado

  if (dbError) {
    console.error("Error guardando idea:", dbError.message);
    return NextResponse.json(
      { error: "Error al guardar la idea" },
      { status: 500 }
    );
  }

  // 5. Retornar la idea creada con status 201 (Created)
  return NextResponse.json(idea, { status: 201 });
}

// ============================================
// GET /api/ideas
// Lista las ideas activas del usuario.
// (Usado en Día 5 para el Inbox)
// ============================================

export async function GET() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { data: ideas, error: dbError } = await supabase
    .from("ideas")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("created_at", { ascending: false }); // más recientes primero

  if (dbError) {
    console.error("Error obteniendo ideas:", dbError.message);
    return NextResponse.json(
      { error: "Error al obtener las ideas" },
      { status: 500 }
    );
  }

  return NextResponse.json(ideas);
}

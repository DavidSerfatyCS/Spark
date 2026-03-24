// ============================================
// ARCHIVO: app/api/prompts/[id]/answer/route.ts
// PROPÓSITO: Guarda la respuesta que el usuario
// copió de su IA favorita.
//
// PUT /api/prompts/[id]/answer
// Body: { answer: string }
// ============================================

import { createClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: { id: string };
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON inválido" }, { status: 400 });
  }

  const { answer } = body as { answer?: string };

  if (typeof answer !== "string") {
    return NextResponse.json(
      { error: "answer debe ser un string" },
      { status: 400 }
    );
  }

  // Actualizamos la respuesta.
  // Verificamos autoría vía JOIN con ideas (el prompt pertenece a una idea del usuario).
  const { data: prompt, error } = await supabase
    .from("prompts")
    .update({ answer: answer.trim() || null })
    .eq("id", params.id)
    .select("*, ideas!inner(user_id)")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json(
        { error: "Prompt no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Error al guardar la respuesta" },
      { status: 500 }
    );
  }

  // Verificamos que el prompt pertenece al usuario
  const ideaUserId = (prompt as { ideas: { user_id: string } }).ideas.user_id;
  if (ideaUserId !== user.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  return NextResponse.json(prompt);
}

// ============================================
// ARCHIVO: app/api/prompts/generate/route.ts
// PROPÓSITO: Genera 5 prompts para una idea
// y los guarda en la tabla `prompts`.
//
// POST /api/prompts/generate
// Body: { idea_id: string }
//
// Si la idea ya tiene prompts, los elimina y
// genera nuevos (permite regenerar).
// ============================================

import { createClient } from "@/lib/supabase-server";
import { generatePrompts } from "@/lib/prompt-templates";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Parseamos el body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON inválido" }, { status: 400 });
  }

  const { idea_id } = body as { idea_id?: string };

  if (!idea_id || typeof idea_id !== "string") {
    return NextResponse.json(
      { error: "idea_id es requerido" },
      { status: 400 }
    );
  }

  // Verificamos que la idea existe y pertenece al usuario
  const { data: idea, error: ideaError } = await supabase
    .from("ideas")
    .select("id, content")
    .eq("id", idea_id)
    .eq("user_id", user.id)
    .single();

  if (ideaError || !idea) {
    return NextResponse.json(
      { error: "Idea no encontrada" },
      { status: 404 }
    );
  }

  // Eliminamos prompts anteriores si existen (permite regenerar)
  await supabase.from("prompts").delete().eq("idea_id", idea_id);

  // Generamos los prompts con los templates
  const promptsToInsert = generatePrompts(idea.content).map((p) => ({
    idea_id,
    title: p.title,
    content: p.content,
    order_index: p.order_index,
  }));

  // Insertamos todos los prompts de una vez
  const { data: prompts, error: insertError } = await supabase
    .from("prompts")
    .insert(promptsToInsert)
    .select();

  if (insertError) {
    console.error("Error guardando prompts:", insertError.message);
    return NextResponse.json(
      { error: "Error al generar los prompts" },
      { status: 500 }
    );
  }

  return NextResponse.json(prompts, { status: 201 });
}

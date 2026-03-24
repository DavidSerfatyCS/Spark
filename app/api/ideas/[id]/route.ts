// ============================================
// ARCHIVO: app/api/ideas/[id]/route.ts
// PROPÓSITO: PATCH para actualizar una idea.
// Usado para restaurar ideas archivadas (status: 'active').
// ============================================

import { createClient } from "@/lib/supabase-server";
import { updateIdeaSchema } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
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

  const validation = updateIdeaSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors[0].message },
      { status: 400 }
    );
  }

  const { data: idea, error } = await supabase
    .from("ideas")
    .update(validation.data)
    .eq("id", params.id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Idea no encontrada" }, { status: 404 });
    }
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }

  return NextResponse.json(idea);
}

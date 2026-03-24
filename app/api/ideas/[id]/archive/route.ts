// ============================================
// ARCHIVO: app/api/ideas/[id]/archive/route.ts
// PROPÓSITO: Archivar una idea (cambiar status a 'archived').
//
// La ruta dinámica [id] captura el ID de la idea de la URL.
// Ejemplo: POST /api/ideas/abc-123/archive
//
// ¿Por qué archivar en lugar de borrar?
// Borrar es destructivo e irreversible. Archivando
// podemos recuperar ideas en el futuro (Premium feature).
// ============================================

import { createClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: { id: string };
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const supabase = createClient();

  // Verificar autenticación
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = params;

  // Actualizamos el status a 'archived'.
  // La condición .eq("user_id", user.id) junto con RLS
  // garantiza que solo puedes archivar TUS propias ideas.
  // Si intentas archivar una idea ajena, Supabase retorna 0 filas.
  const { data: idea, error } = await supabase
    .from("ideas")
    .update({ status: "archived" })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    // PGRST116 = no rows found (idea no existe o no es tuya)
    if (error.code === "PGRST116") {
      return NextResponse.json(
        { error: "Idea no encontrada" },
        { status: 404 }
      );
    }
    console.error("Error archivando idea:", error.message);
    return NextResponse.json(
      { error: "Error al archivar la idea" },
      { status: 500 }
    );
  }

  return NextResponse.json(idea);
}

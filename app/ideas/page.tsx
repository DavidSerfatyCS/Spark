// ============================================
// ARCHIVO: app/ideas/page.tsx
// PROPÓSITO: Inbox — lista de ideas activas.
//
// Server Component: carga las ideas directamente
// desde Supabase en el servidor antes de enviar
// el HTML al browser. Sin loading spinner inicial,
// sin fetch en el cliente.
// ============================================

import { createClient } from "@/lib/supabase-server";
import { signOut } from "@/app/actions/auth";
import IdeaCard from "@/components/IdeaCard";
import Link from "next/link";
import type { Idea } from "@/lib/types";

export default async function IdeasPage() {
  const supabase = createClient();

  // Obtenemos las ideas activas del usuario directamente en el servidor.
  // RLS garantiza que solo vemos las nuestras.
  const { data: ideas, error } = await supabase
    .from("ideas")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error cargando ideas:", error.message);
  }

  const activeIdeas = (ideas as Idea[]) ?? [];

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <Link
          href="/"
          className="text-xl font-bold text-violet-600"
        >
          ⚡ Spark
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {activeIdeas.length} idea{activeIdeas.length !== 1 ? "s" : ""}
          </span>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
              Salir
            </button>
          </form>
        </div>
      </header>

      {/* Contenido */}
      <div className="flex-1 px-6 py-8 max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Mis ideas</h2>
          <Link
            href="/"
            className="
              text-sm font-medium text-violet-600
              hover:text-violet-700 transition-colors
            "
          >
            + Nueva
          </Link>
        </div>

        {/* Lista de ideas o empty state */}
        {activeIdeas.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {activeIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// Empty state: se muestra cuando no hay ideas activas
function EmptyState() {
  return (
    <div className="text-center py-20">
      <p className="text-4xl mb-4">💡</p>
      <h3 className="text-lg font-medium text-gray-700 mb-2">
        Sin ideas aún
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        Captura tu primera idea antes de que desaparezca.
      </p>
      <Link
        href="/"
        className="
          inline-block px-6 py-3 rounded-xl
          bg-violet-600 text-white font-medium text-sm
          hover:bg-violet-700 transition-colors
        "
      >
        Capturar idea
      </Link>
    </div>
  );
}

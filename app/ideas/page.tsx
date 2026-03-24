// ============================================
// ARCHIVO: app/ideas/page.tsx
// PROPÓSITO: Inbox — ideas activas y archivadas.
// El searchParam "view" controla qué se muestra:
//   /ideas        → ideas activas (default)
//   /ideas?view=archived → ideas archivadas
// ============================================

import { createClient } from "@/lib/supabase-server";
import { signOut } from "@/app/actions/auth";
import IdeaCard from "@/components/IdeaCard";
import Link from "next/link";
import type { Idea } from "@/lib/types";

interface IdeasPageProps {
  searchParams: { view?: string };
}

export default async function IdeasPage({ searchParams }: IdeasPageProps) {
  const supabase = createClient();
  const showArchived = searchParams.view === "archived";
  const statusFilter = showArchived ? "archived" : "active";

  const { data: ideas, error } = await supabase
    .from("ideas")
    .select("*")
    .eq("status", statusFilter)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error cargando ideas:", error.message);
  }

  const ideaList = (ideas as Idea[]) ?? [];

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <Link href="/" className="text-xl font-bold text-violet-600">
          ⚡ Spark
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {ideaList.length} idea{ideaList.length !== 1 ? "s" : ""}
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

      <div className="flex-1 px-6 py-8 max-w-lg mx-auto w-full">
        {/* Título + botón nueva */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Mis ideas</h2>
          <Link
            href="/"
            className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
          >
            + Nueva
          </Link>
        </div>

        {/* Toggle activas / archivadas */}
        <div className="flex gap-2 mb-6">
          <Link
            href="/ideas"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !showArchived
                ? "bg-violet-600 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            Activas
          </Link>
          <Link
            href="/ideas?view=archived"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              showArchived
                ? "bg-violet-600 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            Archivadas
          </Link>
        </div>

        {/* Lista o empty state */}
        {ideaList.length === 0 ? (
          <EmptyState showArchived={showArchived} />
        ) : (
          <div className="space-y-3">
            {ideaList.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function EmptyState({ showArchived }: { showArchived: boolean }) {
  return (
    <div className="text-center py-20">
      <p className="text-4xl mb-4">{showArchived ? "📦" : "💡"}</p>
      <h3 className="text-lg font-medium text-gray-700 mb-2">
        {showArchived ? "Sin ideas archivadas" : "Sin ideas aún"}
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        {showArchived
          ? "Las ideas que archives aparecerán aquí."
          : "Captura tu primera idea antes de que desaparezca."}
      </p>
      {!showArchived && (
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-violet-600 text-white font-medium text-sm hover:bg-violet-700 transition-colors"
        >
          Capturar idea
        </Link>
      )}
    </div>
  );
}

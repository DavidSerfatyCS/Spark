// ============================================
// ARCHIVO: components/IdeaCard.tsx
// PROPÓSITO: Tarjeta de una idea en el Inbox.
// Muestra el contenido, la fecha, y el botón
// para archivar.
// ============================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Idea } from "@/lib/types";

interface IdeaCardProps {
  idea: Idea;
}

// Formatea "2026-03-24T10:30:00Z" → "24 mar 2026"
function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const [isArchiving, setIsArchiving] = useState<boolean>(false);
  const router = useRouter();

  async function handleArchive() {
    setIsArchiving(true);

    try {
      const response = await fetch(`/api/ideas/${idea.id}/archive`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Error al archivar");
      }

      // Refrescamos la página para que la idea desaparezca del inbox.
      // router.refresh() re-ejecuta los Server Components sin recargar la página.
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsArchiving(false);
    }
  }

  return (
    <article className="
      bg-white border border-gray-100 rounded-2xl p-5
      hover:border-violet-200 hover:shadow-sm
      transition-all duration-150
    ">
      {/* Contenido de la idea */}
      <p className="text-gray-900 text-base leading-relaxed mb-4">
        {idea.content}
      </p>

      {/* Footer: fecha + acciones */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {formatDate(idea.created_at)}
        </span>

        <button
          onClick={handleArchive}
          disabled={isArchiving}
          className="
            text-xs text-gray-400 hover:text-red-400
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-150
          "
        >
          {isArchiving ? "Archivando..." : "Archivar"}
        </button>
      </div>
    </article>
  );
}

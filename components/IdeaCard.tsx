// ============================================
// ARCHIVO: components/IdeaCard.tsx
// PROPÓSITO: Tarjeta de una idea.
// Soporta archivar (activa → archivada)
// y restaurar (archivada → activa).
// ============================================

"use client";

import { useState } from "react";
import type { Idea } from "@/lib/types";

interface IdeaCardProps {
  idea: Idea;
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const isArchived = idea.status === "archived";

  async function handleArchive() {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/ideas/${idea.id}/archive`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Error al archivar");
      // Recarga completa para mostrar datos frescos del servidor
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsUpdating(false);
    }
  }

  async function handleRestore() {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/ideas/${idea.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "active" }),
      });
      if (!response.ok) throw new Error("Error al restaurar");
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsUpdating(false);
    }
  }

  return (
    <article className="
      bg-white border border-gray-100 rounded-2xl p-5
      hover:border-violet-200 hover:shadow-sm
      transition-all duration-150
    ">
      <p className={`text-base leading-relaxed mb-4 ${isArchived ? "text-gray-400" : "text-gray-900"}`}>
        {idea.content}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {formatDate(idea.created_at)}
        </span>

        {isArchived ? (
          <button
            onClick={handleRestore}
            disabled={isUpdating}
            className="text-xs text-violet-500 hover:text-violet-700 disabled:opacity-50 transition-colors"
          >
            {isUpdating ? "Restaurando..." : "Restaurar"}
          </button>
        ) : (
          <button
            onClick={handleArchive}
            disabled={isUpdating}
            className="text-xs text-gray-400 hover:text-red-400 disabled:opacity-50 transition-colors"
          >
            {isUpdating ? "Archivando..." : "Archivar"}
          </button>
        )}
      </div>
    </article>
  );
}

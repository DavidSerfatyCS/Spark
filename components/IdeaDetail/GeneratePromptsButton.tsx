// ============================================
// ARCHIVO: components/IdeaDetail/GeneratePromptsButton.tsx
// PROPÓSITO: Botón que llama a /api/prompts/generate
// y recarga la página para mostrar los prompts nuevos.
// ============================================

"use client";

import { useState } from "react";

interface GeneratePromptsButtonProps {
  ideaId: string;
  hasPrompts: boolean;
}

export default function GeneratePromptsButton({
  ideaId,
  hasPrompts,
}: GeneratePromptsButtonProps) {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/prompts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea_id: ideaId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Error generando prompts");
      }

      // Recarga completa para mostrar los prompts recién generados
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setIsGenerating(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="
          w-full py-4 px-6 rounded-2xl font-semibold text-white text-base
          bg-violet-600 hover:bg-violet-700 active:bg-violet-800
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-150
        "
      >
        {isGenerating
          ? "Generando prompts..."
          : hasPrompts
          ? "Regenerar prompts"
          : "✨ Generar prompts para desarrollar"}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}

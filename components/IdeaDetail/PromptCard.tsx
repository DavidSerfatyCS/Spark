// ============================================
// ARCHIVO: components/IdeaDetail/PromptCard.tsx
// PROPÓSITO: Muestra un prompt con:
// 1. Botón de copiar al clipboard
// 2. Campo para pegar la respuesta de la IA
// 3. Botón para guardar la respuesta
// ============================================

"use client";

import { useState } from "react";
import type { Prompt } from "@/lib/types";

interface PromptCardProps {
  prompt: Prompt;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const [answer, setAnswer] = useState<string>(prompt.answer ?? "");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setIsCopied(true);
      // Volvemos al estado normal después de 2 segundos
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback para browsers que no soportan clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = prompt.content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  }

  async function handleSaveAnswer() {
    if (!answer.trim()) return;

    setIsSaving(true);
    setSaveStatus("idle");

    try {
      const response = await fetch(`/api/prompts/${prompt.id}/answer`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });

      if (!response.ok) throw new Error("Error al guardar");

      setSaveStatus("saved");
      // Volvemos a idle después de 3 segundos
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  }

  const hasAnswer = answer.trim().length > 0;
  const isAnswered = prompt.answer !== null && prompt.answer !== "";

  return (
    <div className={`
      rounded-2xl border-2 p-5 transition-colors duration-150
      ${isAnswered ? "border-green-200 bg-green-50/30" : "border-gray-100 bg-white"}
    `}>
      {/* Header: número + título + badge respondido */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-violet-400 bg-violet-50 px-2 py-0.5 rounded-full">
            {prompt.order_index + 1}
          </span>
          <h3 className="font-semibold text-gray-800 text-sm">
            {prompt.title}
          </h3>
        </div>
        {isAnswered && (
          <span className="text-xs text-green-600 font-medium shrink-0">
            ✓ Respondido
          </span>
        )}
      </div>

      {/* Texto del prompt */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {prompt.content}
        </p>
      </div>

      {/* Botón copiar */}
      <button
        onClick={handleCopy}
        className={`
          w-full py-2.5 px-4 rounded-xl text-sm font-medium mb-4
          transition-all duration-150
          ${isCopied
            ? "bg-green-100 text-green-700"
            : "bg-violet-50 text-violet-700 hover:bg-violet-100"
          }
        `}
      >
        {isCopied ? "✓ Copiado al clipboard" : "📋 Copiar prompt"}
      </button>

      {/* Campo para pegar la respuesta */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5">
          Pega la respuesta de tu IA aquí
        </label>
        <textarea
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setSaveStatus("idle");
          }}
          placeholder="Copia la respuesta de ChatGPT/Claude y pégala aquí..."
          rows={4}
          className="
            w-full px-4 py-3 rounded-xl border border-gray-200 resize-none
            text-sm text-gray-800 placeholder-gray-300 leading-relaxed
            focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent
            transition-colors
          "
        />

        {/* Botón guardar respuesta */}
        {hasAnswer && (
          <button
            onClick={handleSaveAnswer}
            disabled={isSaving}
            className="
              mt-2 w-full py-2.5 px-4 rounded-xl text-sm font-medium
              bg-gray-900 text-white hover:bg-gray-700
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-150
            "
          >
            {isSaving
              ? "Guardando..."
              : saveStatus === "saved"
              ? "✓ Respuesta guardada"
              : saveStatus === "error"
              ? "Error al guardar — reintentar"
              : "Guardar respuesta"}
          </button>
        )}
      </div>
    </div>
  );
}

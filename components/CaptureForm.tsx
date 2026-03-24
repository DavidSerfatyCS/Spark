// ============================================
// ARCHIVO: components/CaptureForm.tsx
// PROPÓSITO: Formulario principal de captura.
// El corazón de Spark: donde el usuario captura
// una idea en menos de 5 segundos.
//
// Diseño: campo de texto grande + Enter para guardar.
// Mobile-first: touch target generoso, teclado no tapa el input.
// ============================================

"use client";

import { useState, useRef, useEffect } from "react";

// Estados posibles del formulario
type FormState = "idle" | "saving" | "error";

export default function CaptureForm() {
  const [content, setContent] = useState<string>("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [charCount, setCharCount] = useState<number>(0);

  // useRef nos da acceso directo al elemento DOM del textarea.
  // Lo usamos para hacer focus automático al cargar la página.
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus automático al montar el componente.
  // En mobile esto abre el teclado de inmediato — ideal para captura rápida.
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Actualiza el contenido Y el contador de caracteres
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    setContent(value);
    setCharCount(value.length);
    // Limpiar error cuando el usuario empieza a escribir
    if (errorMessage) setErrorMessage(null);
  }

  // Ctrl+Enter o Cmd+Enter para guardar (además del botón)
  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  }

  async function handleSubmit() {
    const trimmed = content.trim();

    // Validación client-side (el servidor también valida, pero
    // esto evita un round-trip innecesario para casos obvios)
    if (!trimmed) {
      setErrorMessage("Escribe tu idea primero");
      textareaRef.current?.focus();
      return;
    }

    if (trimmed.length > 500) {
      setErrorMessage("La idea no puede superar 500 caracteres");
      return;
    }

    setFormState("saving");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: trimmed }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Error desconocido");
      }

      // Idea guardada. Redirigimos al inbox.
      // Usamos window.location.href en lugar de router.push porque
      // router.push puede servir una versión cacheada de /ideas
      // que no incluye la idea recién guardada.
      // window.location.href fuerza una carga completa desde el servidor.
      window.location.href = "/ideas";
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error al guardar";
      setErrorMessage(message);
      setFormState("error");
    }
  }

  const isSaving = formState === "saving";
  const isOverLimit = charCount > 500;

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Textarea principal */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="¿Qué idea tienes?"
          disabled={isSaving}
          rows={4}
          className={`
            w-full px-5 py-4 rounded-2xl border-2 resize-none
            text-gray-900 placeholder-gray-300 text-lg leading-relaxed
            focus:outline-none focus:ring-0 transition-colors duration-150
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isOverLimit
              ? "border-red-400 focus:border-red-500"
              : "border-gray-200 focus:border-violet-400"
            }
          `}
        />

        {/* Contador de caracteres — aparece cuando el usuario empieza a escribir */}
        {charCount > 0 && (
          <span
            className={`
              absolute bottom-3 right-4 text-xs font-medium
              ${isOverLimit ? "text-red-500" : "text-gray-300"}
            `}
          >
            {charCount}/500
          </span>
        )}
      </div>

      {/* Mensaje de error */}
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 px-1">{errorMessage}</p>
      )}

      {/* Botón guardar */}
      <button
        onClick={handleSubmit}
        disabled={isSaving || !content.trim() || isOverLimit}
        className="
          mt-3 w-full py-4 px-6 rounded-2xl font-semibold text-white text-lg
          bg-violet-600 hover:bg-violet-700 active:bg-violet-800
          focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-150
        "
      >
        {isSaving ? "Guardando..." : "Guardar idea"}
      </button>

      {/* Hint de teclado — solo desktop */}
      <p className="mt-3 text-center text-xs text-gray-300 hidden sm:block">
        También puedes usar <kbd className="font-mono">Ctrl</kbd> +{" "}
        <kbd className="font-mono">Enter</kbd>
      </p>
    </div>
  );
}

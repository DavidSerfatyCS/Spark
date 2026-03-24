// ============================================
// ARCHIVO: app/ideas/[id]/page.tsx
// PROPÓSITO: Vista de detalle de una idea.
// Muestra la idea + sus prompts generados.
// El usuario puede generar, copiar y responder prompts.
// ============================================

import { createClient } from "@/lib/supabase-server";
import { signOut } from "@/app/actions/auth";
import GeneratePromptsButton from "@/components/IdeaDetail/GeneratePromptsButton";
import PromptCard from "@/components/IdeaDetail/PromptCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Idea, Prompt } from "@/lib/types";

interface IdeaDetailPageProps {
  params: { id: string };
}

export default async function IdeaDetailPage({ params }: IdeaDetailPageProps) {
  const supabase = createClient();

  // Cargamos la idea con sus prompts en una sola query
  const { data: idea, error } = await supabase
    .from("ideas")
    .select("*, prompts(*)")
    .eq("id", params.id)
    .single();

  // Si la idea no existe o no es del usuario (RLS la filtra), mostramos 404
  if (error || !idea) {
    notFound();
  }

  const typedIdea = idea as Idea & { prompts: Prompt[] };
  const prompts = typedIdea.prompts.sort(
    (a, b) => a.order_index - b.order_index
  );
  const hasPrompts = prompts.length > 0;
  const answeredCount = prompts.filter((p) => p.answer).length;

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <Link href="/ideas" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm">
          ← Mis ideas
        </Link>
        <span className="text-xl font-bold text-violet-600">⚡ Spark</span>
        <form action={signOut}>
          <button type="submit" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
            Salir
          </button>
        </form>
      </header>

      <div className="flex-1 px-6 py-8 max-w-lg mx-auto w-full">
        {/* La idea */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
          <p className="text-gray-900 text-lg leading-relaxed">
            {typedIdea.content}
          </p>
        </div>

        {/* Progreso de prompts (si ya hay) */}
        {hasPrompts && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              {answeredCount}/{prompts.length} prompts respondidos
            </p>
            {answeredCount === prompts.length && (
              <span className="text-sm text-green-600 font-medium">
                ✓ Idea desarrollada
              </span>
            )}
          </div>
        )}

        {/* Botón generar / regenerar */}
        <div className="mb-6">
          <GeneratePromptsButton ideaId={params.id} hasPrompts={hasPrompts} />
        </div>

        {/* Lista de prompts */}
        {hasPrompts && (
          <div className="space-y-4">
            {prompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        )}

        {/* Estado vacío: aún no generó prompts */}
        {!hasPrompts && (
          <div className="text-center py-8 text-gray-400 text-sm">
            Genera los prompts para empezar a desarrollar esta idea.
          </div>
        )}
      </div>
    </main>
  );
}

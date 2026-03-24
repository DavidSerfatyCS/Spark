// ============================================
// ARCHIVO: app/page.tsx
// PROPÓSITO: Página HOME — captura de ideas.
//
// Este es un SERVER COMPONENT: obtiene el usuario
// en el servidor y pasa su email al header.
// El CaptureForm es un CLIENT COMPONENT (tiene
// estado interactivo), importado aquí.
// ============================================

import { createClient } from "@/lib/supabase-server";
import { signOut } from "@/app/actions/auth";
import CaptureForm from "@/components/CaptureForm";
import Link from "next/link";

export default async function HomePage() {
  // El middleware ya garantiza que hay sesión activa.
  // Llamamos getUser() para refrescar el token si es necesario.
  const supabase = createClient();
  await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-violet-600">⚡ Spark</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/ideas"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Mis ideas
          </Link>
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

      {/* Contenido principal */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Saludo */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ¿Qué idea tienes?
          </h2>
          <p className="text-gray-400 text-base">
            Captúrala ahora, desarróllala después.
          </p>
        </div>

        {/* Formulario de captura */}
        <CaptureForm />
      </div>
    </main>
  );
}

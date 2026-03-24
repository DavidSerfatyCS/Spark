// ============================================
// ARCHIVO: app/page.tsx
// PROPÓSITO: Página HOME de Spark.
// Por ahora es un placeholder autenticado.
// En Día 4 implementaremos el CaptureForm real.
//
// Este es un SERVER COMPONENT (sin "use client").
// Puede acceder directamente a la sesión del
// usuario en el servidor sin hacer fetch.
// ============================================

import { createClient } from "@/lib/supabase-server";
import { signOut } from "@/app/actions/auth";

export default async function HomePage() {
  // Obtenemos el usuario autenticado en el servidor.
  // El middleware ya garantizó que hay sesión activa,
  // pero igual usamos getUser() para tener los datos.
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-violet-600 mb-3">⚡ Spark</h1>
        <p className="text-gray-500 text-lg mb-2">Tu sistema personal de ideas.</p>

        {/* Mostramos el email del usuario logueado */}
        {user && (
          <p className="text-sm text-gray-400 mb-8">
            Conectado como{" "}
            <span className="font-medium text-gray-600">{user.email}</span>
          </p>
        )}

        <p className="text-gray-400 text-sm mb-8">
          Auth funcionando ✅ — CaptureForm viene en Día 4.
        </p>

        {/* Formulario de logout (usa Server Action) */}
        <form action={signOut}>
          <button
            type="submit"
            className="text-sm text-red-500 hover:text-red-700 hover:underline transition-colors"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </main>
  );
}

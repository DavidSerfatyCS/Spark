// ============================================
// ARCHIVO: app/page.tsx
// PROPÓSITO: Página HOME de Spark.
// Por ahora es un placeholder. En Día 4
// implementaremos el CaptureForm real.
// ============================================

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-violet-600 mb-3">
          ⚡ Spark
        </h1>
        <p className="text-gray-500 text-lg">
          Tu sistema personal de ideas.
        </p>
        <p className="text-gray-400 text-sm mt-4">
          Setup completo. Próximo paso: Supabase.
        </p>
      </div>
    </main>
  );
}

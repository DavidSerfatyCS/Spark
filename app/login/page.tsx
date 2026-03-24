// ============================================
// ARCHIVO: app/login/page.tsx
// PROPÓSITO: Página de login con magic link.
// El usuario ingresa su email y recibe un link
// en su bandeja. Sin password, sin fricción.
// ============================================

"use client";

// ¿Por qué "use client"?
// Este componente maneja estado local (useState)
// para el formulario. El estado solo existe en
// el browser, no en el servidor.

import { useState } from "react";
import { sendMagicLink } from "@/app/actions/auth";

// Los 3 estados posibles de la pantalla de login
type LoginState = "idle" | "loading" | "sent";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [loginState, setLoginState] = useState<LoginState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginState("loading");
    setErrorMessage(null);

    // Construimos un FormData para pasarlo al Server Action.
    // FormData es el formato estándar de HTML para forms.
    const formData = new FormData();
    formData.append("email", email);

    const result = await sendMagicLink(formData);

    if (result.error) {
      setErrorMessage(result.error);
      setLoginState("idle");
      return;
    }

    // Sin error = email enviado correctamente
    setLoginState("sent");
  }

  // Estado: email enviado → mostrar confirmación
  if (loginState === "sent") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white">
        <div className="w-full max-w-sm text-center">
          <div className="text-5xl mb-4">📬</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Revisa tu email
          </h1>
          <p className="text-gray-500 mb-6">
            Enviamos un link de acceso a{" "}
            <span className="font-medium text-gray-800">{email}</span>
          </p>
          <p className="text-sm text-gray-400">
            El link expira en 5 minutos.
          </p>
          <button
            onClick={() => {
              setLoginState("idle");
              setEmail("");
            }}
            className="mt-8 text-sm text-violet-600 hover:underline"
          >
            Usar otro email
          </button>
        </div>
      </main>
    );
  }

  // Estado: idle o loading → mostrar formulario
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-violet-600 mb-2">⚡ Spark</h1>
          <p className="text-gray-500">Nunca pierdas una idea</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tu email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              disabled={loginState === "loading"}
              className="
                w-full px-4 py-3 rounded-xl border border-gray-200
                text-gray-900 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                disabled:opacity-50 disabled:cursor-not-allowed
                text-base
              "
            />
          </div>

          {/* Mensaje de error */}
          {errorMessage && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loginState === "loading" || !email.trim()}
            className="
              w-full py-3 px-4 rounded-xl font-medium text-white
              bg-violet-600 hover:bg-violet-700
              focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-150
              text-base
            "
          >
            {loginState === "loading" ? "Enviando..." : "Enviar link de acceso"}
          </button>
        </form>

        {/* Explicación del magic link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Sin passwords. Te enviamos un link directo a tu email.
        </p>
      </div>
    </main>
  );
}

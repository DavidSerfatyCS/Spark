// ============================================
// ARCHIVO: app/actions/auth.ts
// PROPÓSITO: Server Actions de autenticación.
//
// ¿Qué es un Server Action?
// Es una función que se ejecuta en el SERVIDOR
// pero que puedes llamar desde un componente
// del browser como si fuera una función normal.
// Next.js maneja la comunicación HTTP por ti.
//
// Los marcamos con "use server" para que Next.js
// sepa que deben ejecutarse solo en el servidor.
// Esto es importante porque aquí manejamos auth:
// nunca queremos que este código corra en el browser.
// ============================================

"use server";

import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

// ============================================
// ACTION: sendMagicLink
// Envía el email con el magic link al usuario.
// ============================================

export async function sendMagicLink(formData: FormData): Promise<{ error: string | null }> {
  const email = formData.get("email");

  // Validación básica: el email debe ser un string no vacío.
  // La validación completa con Zod la añadimos en Día 4.
  if (typeof email !== "string" || !email.trim()) {
    return { error: "El email es requerido" };
  }

  // Validación de formato de email (simple, sin librería)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Ingresa un email válido" };
  }

  const supabase = createClient();

  // signInWithOtp: envía el magic link.
  // OTP = One-Time Password (contraseña de un solo uso).
  // Supabase envía el email y el usuario hace clic para autenticarse.
  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim(),
    options: {
      // emailRedirectTo: adónde redirigir después del clic.
      // Debe coincidir con el Redirect URL en Supabase Dashboard.
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error("sendMagicLink error:", error.message);
    return { error: "No pudimos enviar el email. Intenta de nuevo." };
  }

  // Si llegamos aquí, el email fue enviado correctamente.
  // Retornamos null para indicar que no hay error.
  return { error: null };
}

// ============================================
// ACTION: signOut
// Cierra la sesión del usuario y redirige a /login.
// ============================================

export async function signOut(): Promise<void> {
  const supabase = createClient();

  // signOut borra los tokens de sesión de las cookies.
  await supabase.auth.signOut();

  // redirect() de Next.js lanza una excepción interna
  // para interrumpir la ejecución y redirigir.
  // Por eso no necesitamos un return después.
  redirect("/login");
}

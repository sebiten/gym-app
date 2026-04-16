import Link from "next/link";
import { ActionForm } from "@/components/forms";
import { loginAction } from "@/app/login/actions";
import { isSupabaseConfigured } from "@/lib/env";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="surface w-full max-w-lg p-8 shadow-soft">
        <p className="eyebrow">Admin access</p>
        <h1 className="mt-3 font-display text-5xl text-mist">Ingresar</h1>
        <p className="mt-4 text-sm leading-7 text-mist/70">
          Accede al panel para registrar socios, revisar vencimientos y mandar avisos.
        </p>

        {!isSupabaseConfigured ? (
          <div className="mt-6 rounded-3xl border border-amber-400/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
            Falta configurar las variables de entorno de Supabase. La app ya queda lista,
            pero el login real se habilita cuando conectes tu proyecto.
          </div>
        ) : null}

        <ActionForm action={loginAction} buttonLabel="Entrar" className="mt-8 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-mist/70">Email</span>
            <input
              name="email"
              type="email"
              required
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-mist outline-none transition placeholder:text-mist/30 focus:border-gold"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-mist/70">Password</span>
            <input
              name="password"
              type="password"
              required
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-mist outline-none transition placeholder:text-mist/30 focus:border-gold"
            />
          </label>
        </ActionForm>

        <div className="mt-8 flex items-center justify-between text-sm text-mist/60">
          <Link href="/">Volver al inicio</Link>
          <Link href="/admin">Ver dashboard demo</Link>
        </div>
      </div>
    </main>
  );
}

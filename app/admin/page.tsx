import { redirect } from "next/navigation";
import { Dashboard } from "@/components/dashboard";
import { LogoutButton } from "@/components/logout-button";
import { getDashboardData } from "@/lib/dashboard";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

    if (!user) {
      redirect("/login");
    }
  }

  const data = await getDashboardData();

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10">
      <header className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Dashboard admin</p>
          <h1 className="mt-3 font-display text-5xl text-mist md:text-6xl">
            Operacion del gimnasio
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-mist/70">
            Gestiona registros, membresias mensuales, proximos vencimientos y
            renovaciones atrasadas desde un solo panel.
          </p>
        </div>
        <LogoutButton />
      </header>

      {!isSupabaseConfigured ? (
        <div className="mb-8 rounded-3xl border border-amber-400/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
          Estas viendo datos demo. Cuando conectes Supabase, este panel pasa a modo real.
        </div>
      ) : null}

      <Dashboard data={data} />
    </main>
  );
}

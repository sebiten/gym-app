"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

type ActionResult = {
  ok: boolean;
  message: string;
};

export async function loginAction(
  _state: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message:
        "Falta configurar Supabase. Puedes seguir viendo el dashboard demo, pero el login real depende de Auth."
    };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "No se pudo iniciar Supabase." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { ok: false, message: error.message };
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/");
}

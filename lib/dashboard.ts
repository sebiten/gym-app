import { Resend } from "resend";
import { demoDashboardData, demoMemberDetails } from "@/lib/demo-data";
import { env, isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DashboardData, MemberDetail } from "@/lib/types";

function calculateMembershipEndDate(startDate: string, monthsPaid: number) {
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + monthsPaid);
  return endDate.toISOString().slice(0, 10);
}

async function ensureDefaultPlan() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { data: null, error: new Error("Supabase no disponible.") };
  }

  const { data: existingPlan, error: existingError } = await supabase
    .from("plans")
    .select("id, name")
    .eq("slug", "plan-mensual")
    .maybeSingle();

  if (existingError) {
    return { data: null, error: existingError };
  }

  if (existingPlan) {
    return { data: existingPlan, error: null };
  }

  const { data: createdPlan, error: createError } = await supabase
    .from("plans")
    .insert({
      name: "Plan mensual",
      slug: "plan-mensual",
      description: "Plan base configurable para altas manuales.",
      months_duration: 1,
      is_active: true
    })
    .select("id, name")
    .single();

  return { data: createdPlan, error: createError };
}

export async function getDashboardData(): Promise<DashboardData> {
  if (!isSupabaseConfigured) {
    return demoDashboardData;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return demoDashboardData;
  }

  const { data, error } = await supabase
    .from("member_status_view")
    .select("*")
    .order("current_plan_ends_at", { ascending: true });

  const monthStart = new Date();
  monthStart.setDate(1);
  const monthStartIso = monthStart.toISOString().slice(0, 10);

  const { count: renewalsThisMonth } = await supabase
    .from("memberships")
    .select("*", { count: "exact", head: true })
    .gte("start_date", monthStartIso);

  if (error || !data) {
    return demoDashboardData;
  }

  const members = data.map((member) => ({
    id: member.id,
    full_name: member.full_name,
    email: member.email,
    phone: member.phone,
    document_id: member.document_id,
    registered_at: member.registered_at,
    current_plan_started_at: member.current_plan_started_at,
    current_plan_ends_at: member.current_plan_ends_at,
    plan_name: member.plan_name,
    months_paid: member.months_paid,
    status: member.status,
    days_remaining: member.days_remaining,
    notification_sent_at: member.notification_sent_at
  }));

  return {
    totalMembers: members.length,
    activeMembers: members.filter((member) => member.status === "active").length,
    expiringSoon: members.filter((member) => member.status === "expiring").length,
    expiredMembers: members.filter((member) => member.status === "expired").length,
    renewalsThisMonth: renewalsThisMonth ?? 0,
    members
  };
}

export async function getMemberDetail(memberId: string): Promise<MemberDetail | null> {
  if (!isSupabaseConfigured) {
    return demoMemberDetails[memberId] ?? null;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return demoMemberDetails[memberId] ?? null;
  }

  const { data: memberStatus, error: memberStatusError } = await supabase
    .from("member_status_view")
    .select("*")
    .eq("id", memberId)
    .maybeSingle();

  const { data: memberBase, error: memberBaseError } = await supabase
    .from("members")
    .select("id, full_name, email, phone, document_id, notes, registered_at")
    .eq("id", memberId)
    .maybeSingle();

  if (memberStatusError || memberBaseError || !memberBase) {
    return demoMemberDetails[memberId] ?? null;
  }

  const { data: membershipsData } = await supabase
    .from("memberships")
    .select(
      "id, start_date, end_date, months_paid, notification_sent_at, created_at, plans(name)"
    )
    .eq("member_id", memberId)
    .order("start_date", { ascending: false });

  return {
    id: memberBase.id,
    full_name: memberBase.full_name,
    email: memberBase.email,
    phone: memberBase.phone,
    document_id: memberBase.document_id,
    notes: memberBase.notes,
    registered_at: memberBase.registered_at,
    status: memberStatus?.status ?? "expired",
    days_remaining: memberStatus?.days_remaining ?? -1,
    current_plan_started_at: memberStatus?.current_plan_started_at ?? null,
    current_plan_ends_at: memberStatus?.current_plan_ends_at ?? null,
    current_plan_name: memberStatus?.plan_name ?? null,
    memberships: (membershipsData ?? []).map((membership) => {
      const planInfo = Array.isArray(membership.plans)
        ? membership.plans[0]
        : membership.plans;

      return {
        id: membership.id,
        start_date: membership.start_date,
        end_date: membership.end_date,
        months_paid: membership.months_paid,
        notification_sent_at: membership.notification_sent_at,
        created_at: membership.created_at,
        plan_name: planInfo?.name ?? null
      };
    })
  };
}

export async function createMemberWithMembership(formData: FormData) {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message:
        "Configura Supabase para guardar miembros reales. Mientras tanto el dashboard usa datos demo."
    };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "No se pudo inicializar Supabase." };
  }

  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  const documentId = String(formData.get("documentId") ?? "").trim();
  const startDate = String(formData.get("startDate") ?? "");
  const monthsPaid = Number(formData.get("monthsPaid") ?? 1);
  const notes = String(formData.get("notes") ?? "").trim();

  if (!fullName || !email || !startDate || Number.isNaN(monthsPaid)) {
    return { ok: false, message: "Completa nombre, email, fecha y meses." };
  }

  const { data: member, error: memberError } = await supabase
    .from("members")
    .insert({
      full_name: fullName,
      email,
      phone: phone || null,
      document_id: documentId || null,
      notes: notes || null
    })
    .select("id")
    .single();

  if (memberError || !member) {
    return {
      ok: false,
      message: memberError?.message ?? "No se pudo crear el socio."
    };
  }

  const { data: plan, error: planError } = await ensureDefaultPlan();
  if (planError) {
    return { ok: false, message: planError.message };
  }

  const { error: membershipError } = await supabase.from("memberships").insert({
    member_id: member.id,
    plan_id: plan?.id ?? null,
    start_date: startDate,
    end_date: calculateMembershipEndDate(startDate, monthsPaid),
    months_paid: monthsPaid
  });

  if (membershipError) {
    return { ok: false, message: membershipError.message };
  }

  return { ok: true, message: "Socio cargado correctamente." };
}

export async function renewMemberMembership(formData: FormData) {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message:
        "La renovacion real necesita Supabase. En modo demo puedes mostrar el flujo, pero no persiste cambios."
    };
  }

  const memberId = String(formData.get("memberId") ?? "").trim();
  const startDate = String(formData.get("startDate") ?? "").trim();
  const monthsPaid = Number(formData.get("monthsPaid") ?? 1);

  if (!memberId || !startDate || Number.isNaN(monthsPaid)) {
    return {
      ok: false,
      message: "Completa socio, fecha de inicio y meses."
    };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "No se pudo inicializar Supabase." };
  }

  const { data: plan, error: planError } = await ensureDefaultPlan();
  if (planError) {
    return { ok: false, message: planError.message };
  }

  const { error } = await supabase.from("memberships").insert({
    member_id: memberId,
    plan_id: plan?.id ?? null,
    start_date: startDate,
    end_date: calculateMembershipEndDate(startDate, monthsPaid),
    months_paid: monthsPaid
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true, message: "Membresia renovada correctamente." };
}

export async function sendExpiredNotification(formData: FormData) {
  const memberId = String(formData.get("memberId") ?? "");
  const email = String(formData.get("email") ?? "");
  const fullName = String(formData.get("fullName") ?? "");
  const endDate = String(formData.get("endDate") ?? "");

  if (!memberId || !email) {
    return { ok: false, message: "Faltan datos para enviar la notificacion." };
  }

  if (env.resendApiKey && env.resendFromEmail) {
    const resend = new Resend(env.resendApiKey);

    await resend.emails.send({
      from: env.resendFromEmail,
      to: email,
      subject: "Tu suscripcion del gym finalizo",
      html: `
        <div style="font-family: Arial, sans-serif; color: #112119;">
          <h2>Hola ${fullName}</h2>
          <p>Tu suscripcion al gimnasio finalizo el ${endDate}.</p>
          <p>Si queres renovar, responde este correo o acercate a recepcion.</p>
        </div>
      `
    });
  }

  if (!isSupabaseConfigured) {
    return {
      ok: true,
      message:
        "Boton operativo. Para enviar correos reales agrega RESEND_API_KEY y RESEND_FROM_EMAIL."
    };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "No se pudo registrar la notificacion." };
  }

  const { error } = await supabase
    .from("memberships")
    .update({ notification_sent_at: new Date().toISOString() })
    .eq("member_id", memberId)
    .eq("end_date", endDate);

  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true, message: "Correo de vencimiento informado correctamente." };
}

export async function updateMemberProfile(formData: FormData) {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message:
        "La edicion real necesita Supabase. En modo demo la ficha se muestra, pero no persiste cambios."
    };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "No se pudo inicializar Supabase." };
  }

  const memberId = String(formData.get("memberId") ?? "").trim();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  const documentId = String(formData.get("documentId") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!memberId || !fullName || !email) {
    return {
      ok: false,
      message: "Completa al menos id, nombre completo y email."
    };
  }

  const { error } = await supabase
    .from("members")
    .update({
      full_name: fullName,
      email,
      phone: phone || null,
      document_id: documentId || null,
      notes: notes || null
    })
    .eq("id", memberId);

  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true, message: "Ficha del socio actualizada." };
}

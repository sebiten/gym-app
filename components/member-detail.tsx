import Link from "next/link";
import { ActionForm } from "@/components/forms";
import { Card } from "@/components/ui";
import { updateMemberProfileAction } from "@/app/admin/actions";
import { MemberDetail } from "@/lib/types";
import { formatDate, getStatusClasses, getStatusLabel } from "@/lib/utils";

export function MemberDetailView({ member }: { member: MemberDetail }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Ficha del socio</p>
          <h1 className="mt-3 font-display text-5xl text-mist md:text-6xl">
            {member.full_name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(member.status)}`}
            >
              {getStatusLabel(member.status)}
            </span>
            <span className="text-sm text-mist/60">{member.email}</span>
            {member.phone ? <span className="text-sm text-mist/60">{member.phone}</span> : null}
          </div>
        </div>
        <Link
          href="/admin"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-mist transition hover:bg-white/10"
        >
          Volver al dashboard
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-8">
          <Card>
            <p className="eyebrow">Resumen</p>
            <div className="mt-5 grid gap-4">
              <SummaryRow label="Registrado" value={formatDate(member.registered_at)} />
              <SummaryRow label="Documento" value={member.document_id ?? "Sin dato"} />
              <SummaryRow
                label="Plan actual"
                value={member.current_plan_name ?? "Sin membresia activa"}
              />
              <SummaryRow
                label="Vigencia"
                value={
                  member.current_plan_started_at && member.current_plan_ends_at
                    ? `${formatDate(member.current_plan_started_at)} - ${formatDate(member.current_plan_ends_at)}`
                    : "Sin vigencia activa"
                }
              />
              <SummaryRow label="Dias restantes" value={`${member.days_remaining}`} />
            </div>
          </Card>

          <Card>
            <p className="eyebrow">Editar socio</p>
            <h2 className="mt-3 text-3xl font-semibold text-mist">Datos de contacto</h2>
            <ActionForm
              action={updateMemberProfileAction}
              buttonLabel="Guardar cambios"
              className="mt-6 grid gap-4"
            >
              <input type="hidden" name="memberId" value={member.id} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Nombre completo"
                  name="fullName"
                  defaultValue={member.full_name}
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  defaultValue={member.email}
                  required
                />
                <Field label="Telefono" name="phone" defaultValue={member.phone ?? ""} />
                <Field label="Documento" name="documentId" defaultValue={member.document_id ?? ""} />
              </div>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-mist/70">Notas</span>
                <textarea
                  name="notes"
                  rows={4}
                  defaultValue={member.notes ?? ""}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-mist outline-none ring-0 transition placeholder:text-mist/35 focus:border-gold"
                />
              </label>
            </ActionForm>
          </Card>
        </div>

        <div className="grid gap-8">
          <Card>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Historial</p>
                <h2 className="mt-3 text-3xl font-semibold text-mist">Membresias</h2>
              </div>
              <p className="text-sm text-mist/60">{member.memberships.length} periodos</p>
            </div>
            <div className="mt-6 grid gap-4">
              {member.memberships.length === 0 ? (
                <p className="text-sm text-mist/60">Sin membresias registradas.</p>
              ) : (
                member.memberships.map((membership) => (
                  <div
                    key={membership.id}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5"
                  >
                    <p className="text-lg font-semibold text-mist">
                      {membership.plan_name ?? "Plan mensual"}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-mist/70">
                      <span>
                        {formatDate(membership.start_date)} - {formatDate(membership.end_date)}
                      </span>
                      <span>
                        {membership.months_paid} mes{membership.months_paid > 1 ? "es" : ""}
                      </span>
                      {membership.notification_sent_at ? (
                        <span>Avisado {formatDate(membership.notification_sent_at)}</span>
                      ) : null}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
      <p className="text-sm text-mist/60">{label}</p>
      <p className="text-right text-sm font-semibold text-mist">{value}</p>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-mist/70">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-mist outline-none ring-0 transition placeholder:text-mist/35 focus:border-gold"
      />
    </label>
  );
}

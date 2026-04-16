"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ActionForm } from "@/components/forms";
import { Card } from "@/components/ui";
import {
  createMemberAction,
  renewMemberAction,
  sendExpiredNotificationAction
} from "@/app/admin/actions";
import { DashboardData } from "@/lib/types";
import { formatDate, getStatusClasses, getStatusLabel } from "@/lib/utils";

export function Dashboard({ data }: { data: DashboardData }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [copiedMemberId, setCopiedMemberId] = useState<string | null>(null);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredMembers = data.members.filter((member) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      member.full_name.toLowerCase().includes(normalizedSearch) ||
      member.email.toLowerCase().includes(normalizedSearch) ||
      (member.document_id ?? "").toLowerCase().includes(normalizedSearch);

    const matchesStatus = statusFilter === "all" ? true : member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const expiringMembers = filteredMembers.filter((member) => member.status === "expiring");
  const expiredMembers = filteredMembers.filter((member) => member.status === "expired");
  const memberOptions = useMemo(
    () =>
      data.members.map((member) => ({
        value: member.id,
        label: member.full_name,
        description: `${member.email}${member.document_id ? ` · DNI ${member.document_id}` : ""}`
      })),
    [data.members]
  );

  return (
    <div className="grid gap-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          { label: "Socios totales", value: data.totalMembers },
          { label: "Activos", value: data.activeMembers },
          { label: "Por vencer", value: data.expiringSoon },
          { label: "Vencidos", value: data.expiredMembers },
          { label: "Renovaciones del mes", value: data.renewalsThisMonth }
        ].map((item) => (
          <Card key={item.label} className="bg-gradient-to-br from-white/10 to-white/5">
            <p className="text-sm text-mist/55">{item.label}</p>
            <p className="mt-3 text-4xl font-semibold text-mist">{item.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <p className="eyebrow">Nuevo socio</p>
          <h2 className="mt-3 text-3xl font-semibold text-mist">Registrar suscripcion</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-mist/65">
            Carga los datos del socio y define cuantos meses queda activo.
          </p>
          <ActionForm
            action={createMemberAction}
            buttonLabel="Guardar socio"
            className="mt-6 grid gap-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Nombre completo" name="fullName" required />
              <Input label="Email" name="email" type="email" required />
              <Input label="Telefono" name="phone" />
              <Input label="Documento" name="documentId" />
              <Input label="Inicio del plan" name="startDate" type="date" required />
              <Input
                label="Meses"
                name="monthsPaid"
                type="number"
                min={1}
                defaultValue={1}
                required
              />
            </div>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-mist/70">Notas</span>
              <textarea
                name="notes"
                rows={4}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-mist outline-none ring-0 transition placeholder:text-mist/35 focus:border-gold"
                placeholder="Observaciones, restricciones, asistencia, etc."
              />
            </label>
          </ActionForm>
        </Card>

        <Card>
          <p className="eyebrow">Renovaciones</p>
          <h2 className="mt-3 text-3xl font-semibold text-mist">Extender membresia</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-mist/65">
            Renueva a un socio existente definiendo desde cuando corre el nuevo periodo.
          </p>
          <ActionForm
            action={renewMemberAction}
            buttonLabel="Renovar membresia"
            className="mt-6 grid gap-4"
          >
            <MemberSearchField
              label="Socio"
              name="memberId"
              options={memberOptions}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Inicio de renovacion" name="startDate" type="date" required />
              <Input
                label="Meses"
                name="monthsPaid"
                type="number"
                min={1}
                defaultValue={1}
                required
              />
            </div>
          </ActionForm>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Busqueda y filtros</p>
            <h2 className="mt-3 text-3xl font-semibold text-mist">Encontrar rapido</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-mist/65">
            Filtra por nombre, email, documento o estado para trabajar mas rapido.
          </p>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <FilterField label="Buscar">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nombre, email o documento"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-mist outline-none ring-0 transition placeholder:text-mist/35 focus:border-gold"
            />
          </FilterField>
          <FilterField label="Estado">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-mist outline-none ring-0 transition focus:border-gold"
            >
              <option value="all">Todos</option>
              <option value="active">Activos</option>
              <option value="expiring">Por vencer</option>
              <option value="expired">Vencidos</option>
            </select>
          </FilterField>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Base de socios</p>
            <h2 className="mt-3 text-3xl font-semibold text-mist">Registro general</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-mist/65">
            Vista unica con alta y estado actual de cada suscripcion. Resultados:{" "}
            {filteredMembers.length}
          </p>
        </div>
        <MembersTable members={filteredMembers} />
      </Card>

      <div className="grid gap-8 xl:grid-cols-2">
        <Card>
          <p className="eyebrow">Seguimiento</p>
          <h2 className="mt-3 text-3xl font-semibold text-mist">Por vencer</h2>
          <MembersTable members={expiringMembers} compact />
        </Card>

        <Card>
          <p className="eyebrow">Accion</p>
          <h2 className="mt-3 text-3xl font-semibold text-mist">Vencidos</h2>
          <div className="mt-6 grid gap-4">
            {expiredMembers.length === 0 ? (
              <p className="text-sm text-mist/60">No hay socios vencidos en este momento.</p>
            ) : (
              expiredMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xl font-semibold text-mist">{member.full_name}</p>
                      <p className="mt-1 text-sm text-mist/60">{member.email}</p>
                      <p className="mt-3 text-sm text-mist/70">
                        Vencio el {formatDate(member.current_plan_ends_at)}
                      </p>
                    </div>
                    <ActionForm
                      action={sendExpiredNotificationAction}
                      buttonLabel="Informar por correo"
                      className="min-w-full md:min-w-[260px]"
                    >
                      <input type="hidden" name="memberId" value={member.id} />
                      <input type="hidden" name="email" value={member.email} />
                      <input type="hidden" name="fullName" value={member.full_name} />
                      <input type="hidden" name="endDate" value={member.current_plan_ends_at} />
                    </ActionForm>
                    <div className="grid gap-2 md:min-w-[260px]">
                      <button
                        type="button"
                        onClick={async () => {
                          const message = buildWhatsAppMessage(
                            member.full_name,
                            member.current_plan_ends_at
                          );

                          try {
                            await navigator.clipboard.writeText(message);
                            setCopiedMemberId(member.id);
                            setTimeout(() => setCopiedMemberId((current) => (
                              current === member.id ? null : current
                            )), 2500);
                          } catch {
                            setCopiedMemberId(null);
                          }
                        }}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-mist transition hover:bg-white/10"
                      >
                        {copiedMemberId === member.id
                          ? "Mensaje copiado"
                          : "Copiar mensaje WhatsApp"}
                      </button>
                      {member.phone ? (
                        <a
                          href={buildWhatsAppUrl(
                            member.phone,
                            buildWhatsAppMessage(member.full_name, member.current_plan_ends_at)
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-center text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
                        >
                          Abrir WhatsApp
                        </a>
                      ) : (
                        <p className="text-sm text-mist/50">
                          Carga un telefono para abrir WhatsApp directo.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function buildWhatsAppMessage(fullName: string, endDate: string) {
  return `Hola ${fullName}, te escribimos del gimnasio para avisarte que tu membresia vencio el ${formatDate(
    endDate
  )}. Si quieres renovar, puedes acercarte a recepcion o responder este mensaje.`;
}

function buildWhatsAppUrl(phone: string, message: string) {
  const normalizedPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

function FilterField({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-mist/70">{label}</span>
      {children}
    </label>
  );
}

function Input({
  label,
  name,
  type = "text",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-mist/70">{label}</span>
      <input
        name={name}
        type={type}
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-mist outline-none ring-0 transition placeholder:text-mist/35 focus:border-gold"
        {...props}
      />
    </label>
  );
}

function MembersTable({
  members,
  compact = false
}: {
  members: DashboardData["members"];
  compact?: boolean;
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white/5">
          <thead className="border-b border-white/10 bg-white/5 text-left text-xs uppercase tracking-[0.25em] text-mist/65">
            <tr>
              <th className="px-4 py-4 font-medium">Socio</th>
              {!compact ? <th className="px-4 py-4 font-medium">Registro</th> : null}
              <th className="px-4 py-4 font-medium">Plan actual</th>
              <th className="px-4 py-4 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan={compact ? 3 : 4} className="px-4 py-6 text-sm text-mist/60">
                  No hay datos para mostrar.
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.id} className="border-b border-white/5 text-sm last:border-b-0">
                  <td className="px-4 py-4 align-top">
                    <Link
                      href={`/admin/members/${member.id}`}
                      className="font-semibold text-mist transition hover:text-gold"
                    >
                      {member.full_name}
                    </Link>
                    <p className="mt-1 text-mist/60">{member.email}</p>
                  </td>
                  {!compact ? (
                    <td className="px-4 py-4 align-top text-mist/70">
                      {formatDate(member.registered_at)}
                    </td>
                  ) : null}
                  <td className="px-4 py-4 align-top text-mist/70">
                    {formatDate(member.current_plan_started_at)} -{" "}
                    {formatDate(member.current_plan_ends_at)}
                    <div className="mt-1 text-xs uppercase tracking-[0.25em] text-mist/40">
                      {member.plan_name ?? "Plan mensual"} / {member.months_paid} mes
                      {member.months_paid > 1 ? "es" : ""}
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(member.status)}`}
                    >
                      {getStatusLabel(member.status)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MemberSearchField({
  label,
  name,
  options
}: {
  label: string;
  name: string;
  options: Array<{ value: string; label: string; description: string }>;
}) {
  const [query, setQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState(options[0]?.value ?? "");

  const selectedOption = options.find((option) => option.value === selectedValue) ?? options[0];

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return options.slice(0, 8);
    }

    return options
      .filter((option) =>
        `${option.label} ${option.description}`.toLowerCase().includes(normalizedQuery)
      )
      .slice(0, 8);
  }, [options, query]);

  return (
    <div className="grid gap-3">
      <input type="hidden" name={name} value={selectedValue} />
      <label className="grid gap-2">
        <span className="text-sm font-medium text-mist/70">{label}</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por nombre, email o documento"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-mist outline-none ring-0 transition placeholder:text-mist/35 focus:border-gold"
        />
      </label>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-2">
        <div className="mb-2 rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Socio seleccionado</p>
          <p className="mt-1 font-semibold text-mist">
            {selectedOption?.label ?? "Selecciona un socio"}
          </p>
          {selectedOption ? (
            <p className="mt-1 text-sm text-mist/60">{selectedOption.description}</p>
          ) : null}
        </div>

        <div className="grid gap-2">
          {filteredOptions.length === 0 ? (
            <p className="px-3 py-2 text-sm text-mist/60">No se encontraron coincidencias.</p>
          ) : (
            filteredOptions.map((option) => {
              const isActive = option.value === selectedValue;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setSelectedValue(option.value);
                    setQuery(option.label);
                  }}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-gold/30 bg-gold/10"
                      : "border-white/10 bg-white/0 hover:bg-white/5"
                  }`}
                >
                  <p className="font-medium text-mist">{option.label}</p>
                  <p className="mt-1 text-sm text-mist/60">{option.description}</p>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

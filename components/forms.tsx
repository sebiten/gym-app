"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

type ActionResult = {
  ok: boolean;
  message: string;
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-gradient-to-r from-ember to-gold px-5 py-3 text-sm font-semibold text-night transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Procesando..." : label}
    </button>
  );
}

export function ActionForm({
  action,
  children,
  buttonLabel,
  className = ""
}: {
  action: (state: ActionResult, formData: FormData) => Promise<ActionResult>;
  children: React.ReactNode;
  buttonLabel: string;
  className?: string;
}) {
  const [state, formAction] = useActionState(action, { ok: false, message: "" });

  return (
    <form action={formAction} className={className}>
      {children}
      <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton label={buttonLabel} />
        {state.message ? (
          <p className={`text-sm ${state.ok ? "text-emerald-300" : "text-rose-300"}`}>
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

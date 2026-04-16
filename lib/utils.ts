export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

export function getStatusLabel(status: "active" | "expiring" | "expired") {
  if (status === "active") return "Activa";
  if (status === "expiring") return "Por vencer";
  return "Vencida";
}

export function getStatusClasses(status: "active" | "expiring" | "expired") {
  if (status === "active") return "border border-emerald-400/20 bg-emerald-500/15 text-emerald-300";
  if (status === "expiring") return "border border-amber-400/20 bg-amber-500/15 text-amber-300";
  return "border border-rose-400/20 bg-rose-500/15 text-rose-300";
}

import Link from "next/link";
import { ArrowRight, BarChart3, CalendarClock, Mail, Users } from "lucide-react";
import { Card } from "@/components/ui";
import { demoShowcaseData } from "@/lib/demo-showcase-data";

const iconMap = [Users, CalendarClock, BarChart3, Mail];

export function DemoShowcase() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,107,61,0.16),transparent_24%),radial-gradient(circle_at_right,rgba(224,178,93,0.14),transparent_26%),linear-gradient(180deg,#06080f_0%,#0a0d14_48%,#11141d_100%)] text-mist">
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
        <div className="flex flex-col gap-6 rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur-xl lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Demo comercial</p>
            <h1 className="mt-3 font-display text-5xl leading-[0.95] md:text-7xl">
              Asi se veria la operacion digital de un gym real.
            </h1>
            <p className="mt-5 text-lg leading-8 text-mist/72">
              Simulacion lista para mostrarle a un dueño de gimnasio como unifica web,
              socios, renovaciones y seguimiento de vencimientos.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 px-6 py-5 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Caso demo</p>
            <p className="mt-3 text-3xl font-semibold">{demoShowcaseData.gymName}</p>
            <p className="mt-1 text-sm text-white/70">{demoShowcaseData.city}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-8 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6">
          <Card className="bg-gradient-to-br from-white/10 to-white/5 text-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-gold">Snapshot</p>
                <h2 className="mt-3 font-display text-4xl">{demoShowcaseData.gymName}</h2>
              </div>
              <BarChart3 className="h-10 w-10 text-gold" />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Socios", value: demoShowcaseData.members },
                { label: "Activos", value: demoShowcaseData.active },
                { label: "Por vencer", value: demoShowcaseData.expiring },
                { label: "Vencidos", value: demoShowcaseData.expired }
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-white/65">{item.label}</p>
                  <p className="mt-2 text-3xl font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {demoShowcaseData.highlights.map((item, index) => {
              const Icon = iconMap[index] ?? Users;
              return (
                <Card key={item}>
                  <Icon className="h-8 w-8 text-gold" />
                  <p className="mt-4 text-lg font-semibold text-mist">{item}</p>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <p className="eyebrow">Indicadores</p>
            <div className="mt-5 grid gap-4">
              {[
                { label: "Renovaciones del mes", value: demoShowcaseData.renewalsThisMonth },
                { label: "Retencion", value: demoShowcaseData.retention },
                { label: "Clases del dia", value: demoShowcaseData.classesToday }
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-sm text-mist/60">{metric.label}</p>
                  <p className="text-2xl font-semibold text-mist">{metric.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="eyebrow">Relato de venta</p>
            <div className="mt-5 grid gap-4">
              {demoShowcaseData.stories.map((story) => (
                <div key={story.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-lg font-semibold text-mist">{story.title}</p>
                  <p className="mt-2 text-sm leading-7 text-mist/70">{story.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <p className="eyebrow">Dia simulado</p>
            <h2 className="mt-3 text-3xl font-semibold text-mist">Operacion del dia</h2>
            <div className="mt-6 grid gap-4">
              {demoShowcaseData.timeline.map((item) => (
                <div key={item.hour} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold">{item.hour}</p>
                  <p className="mt-2 text-sm leading-7 text-mist/75">{item.event}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1f2c] via-[#11141d] to-[#06080f] text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Demo lista</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Puedes mostrar esta ruta aunque todavia no tengas Supabase configurado.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/75">
              Sirve para vender la idea: control administrativo, renovaciones,
              avisos y organizacion de socios desde una sola plataforma.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/admin"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-ember to-gold px-6 py-3 text-sm font-semibold text-night transition hover:brightness-110"
              >
                Ver dashboard demo
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Volver a la home
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}

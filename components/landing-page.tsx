import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  CalendarClock,
  Dumbbell,
  ShieldCheck,
  UserPlus
} from "lucide-react";
import { Card, Section } from "@/components/ui";

const featureList = [
  {
    icon: UserPlus,
    title: "Alta rapida de socios",
    description: "Registra personas, datos de contacto y meses de membresia desde un unico panel."
  },
  {
    icon: CalendarClock,
    title: "Control de vencimientos",
    description: "Visualiza quienes vencen pronto y quienes ya quedaron fuera de termino."
  },
  {
    icon: BellRing,
    title: "Avisos por correo",
    description: "Marca a los vencidos y dispara una notificacion para recordar la renovacion."
  },
  {
    icon: BarChart3,
    title: "Dashboard operativo",
    description: "Sigue socios activos, renovaciones y el estado general del gimnasio."
  }
];

export function LandingPage() {
  return (
    <main className="overflow-hidden">
      <section className="relative isolate">
        <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="py-10">
            <p className="eyebrow">Gym Management</p>
            <h1 className="font-display text-5xl leading-[0.95] md:text-7xl">
              Web del gym + panel admin en una sola app.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-mist/72">
              Presenta tu gimnasio con una pagina potente y administra miembros,
              membresias, vencimientos y avisos de renovacion desde el mismo lugar.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-ember to-gold px-6 py-3 text-sm font-semibold text-night transition hover:brightness-110"
              >
                Ingresar al panel
              </Link>
              <Link
                href="#funciones"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-mist transition hover:bg-white/10"
              >
                Ver funcionalidades
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="surface grid-pattern grid grid-cols-2 gap-4 bg-grid p-5 shadow-soft">
              <Card className="col-span-2 border-white/5 bg-gradient-to-br from-white/10 to-white/5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-gold">Dashboard</p>
                    <h2 className="mt-2 text-3xl font-semibold">145 socios</h2>
                  </div>
                  <Dumbbell className="h-10 w-10 text-gold" />
                </div>
                <p className="mt-6 text-sm text-white/70">
                  Vista diaria con activos, por vencer, vencidos y renovaciones del mes.
                </p>
              </Card>
              <Card>
                <p className="text-sm text-mist/55">Por vencer</p>
                <p className="mt-3 text-4xl font-semibold text-ember">12</p>
              </Card>
              <Card>
                <p className="text-sm text-mist/55">Renovaciones</p>
                <p className="mt-3 text-4xl font-semibold">34</p>
              </Card>
              <Card className="col-span-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-mist/55">Alertas automatizables</p>
                    <p className="mt-2 text-xl font-semibold">
                      Manda recordatorios a quienes ya vencieron.
                    </p>
                  </div>
                  <ShieldCheck className="h-8 w-8 text-gold" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="funciones"
        eyebrow="Funciones"
        title="Pensada para recepcion, caja y administracion."
        description="La app mezcla marketing y operacion. La web publica vende el gimnasio; el panel privado mantiene al dia socios, membresias y renovaciones."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featureList.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title}>
                <Icon className="h-8 w-8 text-gold" />
                <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-mist/70">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section
        eyebrow="Secciones web"
        title="La landing tambien vende el gimnasio."
        description="Queda preparada con bloques listos para crecer: hero, planes, entrenadores, testimonios, horarios, FAQ y llamada a la accion."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            "Planes y precios",
            "Entrenadores y clases",
            "Horarios y sede",
            "Testimonios",
            "Preguntas frecuentes",
            "CTA de contacto"
          ].map((item) => (
            <Card key={item} className="flex min-h-36 items-end">
              <p className="text-2xl font-semibold">{item}</p>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}

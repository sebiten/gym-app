import Link from "next/link";
import { LandingPage } from "@/components/landing-page";

export default function HomePage() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-white/10 bg-night/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <Link href="/" className="font-display text-2xl tracking-wide text-mist">
            GymApp
          </Link>
          <nav className="hidden gap-6 text-sm font-medium text-mist/70 md:flex">
            <a href="#funciones">Funciones</a>
            <a href="#planes">Planes</a>
            <a href="#contacto">Contacto</a>

          </nav>
          <div className="flex items-center gap-3">

            <Link
              href="/login"
              className="rounded-full bg-gradient-to-r from-ember to-gold px-4 py-2 text-sm font-semibold text-night transition hover:brightness-110"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>
      <LandingPage />
      <footer
        id="contacto"
        className="mx-auto max-w-7xl px-6 pb-14 pt-8 text-sm text-mist/55 md:px-10"
      >
        GymApp combina web comercial, gestion de membresias y operacion diaria para gimnasios.
      </footer>
    </>
  );
}

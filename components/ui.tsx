import { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title mt-4">{title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-mist/70 md:text-lg">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

export function Card({
  className = "",
  children
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`surface p-6 shadow-soft ${className}`}>{children}</div>;
}

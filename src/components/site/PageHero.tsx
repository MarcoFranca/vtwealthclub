import { Reveal } from "./motion/Reveal";

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-16 md:py-24">
      <div className="absolute -right-24 -top-24 size-96 rounded-full bg-brand-blue/15 blur-3xl" />
      <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
        <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-white/70">{subtitle}</p>}
      </Reveal>
    </section>
  );
}

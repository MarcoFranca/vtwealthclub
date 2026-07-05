import { Reveal } from "./motion/Reveal";

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-16 md:py-24">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--brand-blue) 0%, transparent 45%), radial-gradient(circle at 80% 60%, var(--brand-blue) 0%, transparent 40%)",
        }}
      />
      <Reveal className="relative mx-auto max-w-7xl px-6 text-center">
        <h1 className="font-heading text-4xl font-semibold text-white md:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl text-white/80">{subtitle}</p>}
      </Reveal>
    </section>
  );
}

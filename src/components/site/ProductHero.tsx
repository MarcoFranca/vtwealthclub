import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { resolveIcon } from "@/lib/icons";
import { categoriaLabels, type Seguro } from "@/sanity/types";
import { Reveal } from "./motion/Reveal";

export function ProductHero({ seguro }: { seguro: Seguro }) {
  const Icon = resolveIcon(seguro.beneficios?.[0]?.icone);

  return (
    <section className="relative overflow-hidden bg-brand-navy pt-16 pb-20 md:pt-20 md:pb-24">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, var(--brand-blue) 0%, transparent 45%), radial-gradient(circle at 85% 70%, var(--brand-blue) 0%, transparent 40%)",
        }}
      />
      <Reveal className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center justify-center gap-1.5 text-sm text-white/60">
          <Link href="/" className="hover:text-white">Início</Link>
          <ChevronRight className="size-3.5" />
          <Link href="/servicos" className="hover:text-white">Serviços</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-white/90">{seguro.title}</span>
        </nav>

        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
          {/* eslint-disable-next-line react-hooks/static-components -- Icon vem de lookup table estática */}
          <Icon className="size-8 text-white" />
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
          {categoriaLabels[seguro.categoria]}
        </p>
        <h1 className="font-heading text-4xl font-semibold text-white md:text-5xl">{seguro.title}</h1>
        {seguro.resumo && <p className="mx-auto mt-4 max-w-2xl text-white/80">{seguro.resumo}</p>}
      </Reveal>
    </section>
  );
}

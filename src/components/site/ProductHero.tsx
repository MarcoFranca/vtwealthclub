import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { resolveIcon } from "@/lib/icons";
import { categoriaLabels, type Seguro } from "@/sanity/types";
import { Reveal } from "./motion/Reveal";

export function ProductHero({ seguro }: { seguro: Seguro }) {
  const Icon = resolveIcon(seguro.beneficios?.[0]?.icone);

  return (
    <section className="relative overflow-hidden bg-brand-navy pb-16 pt-14 md:pb-20 md:pt-16">
      <div className="absolute -right-24 -top-24 size-96 rounded-full bg-brand-blue/15 blur-3xl" />
      <Reveal className="relative mx-auto max-w-4xl px-6 text-center">
        <nav className="mb-6 flex items-center justify-center gap-1.5 text-sm text-white/50">
          <Link href="/" className="hover:text-white">Início</Link>
          <ChevronRight className="size-3.5" />
          <Link href="/servicos" className="hover:text-white">Serviços</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-white/80">{seguro.title}</span>
        </nav>

        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-white shadow-lg">
          {/* eslint-disable-next-line react-hooks/static-components -- Icon vem de lookup table estática */}
          <Icon className="size-8 text-brand-blue" />
        </div>

        <p className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          <span className="inline-block size-2 rounded-[2px] bg-brand-blue" />
          {categoriaLabels[seguro.categoria]}
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">{seguro.title}</h1>
        {seguro.resumo && <p className="mx-auto mt-4 max-w-2xl text-white/70">{seguro.resumo}</p>}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full bg-brand-blue px-6 hover:bg-brand-blue-dark">
            <Link href="#cotacao">Solicitar análise</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10"
          >
            <Link href="/servicos">Ver outras soluções</Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

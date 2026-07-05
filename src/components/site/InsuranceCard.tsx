import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { resolveIcon } from "@/lib/icons";
import type { Seguro } from "@/sanity/types";

export function InsuranceCard({ seguro }: { seguro: Seguro }) {
  const Icon = resolveIcon(seguro.beneficios?.[0]?.icone);

  return (
    <Link
      href={`/seguros/${seguro.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-brand-blue/30"
    >
      {/* Capa com ícone */}
      <div className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-navy to-brand-blue">
        {/* Padrão decorativo */}
        <svg
          className="absolute inset-0 h-full w-full opacity-20"
          viewBox="0 0 200 140"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <circle key={i} cx={200 - i * 22} cy={i * 18} r={60 - i * 6} stroke="white" strokeWidth="0.7" />
          ))}
        </svg>
        <div className="relative flex size-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          {/* eslint-disable-next-line react-hooks/static-components -- Icon vem de uma lookup table estática (resolveIcon), não é um componente novo por render */}
          <Icon className="size-8 text-white" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-heading text-lg font-semibold text-brand-navy">{seguro.title}</h3>
        {seguro.resumo && <p className="line-clamp-2 text-sm text-muted-foreground">{seguro.resumo}</p>}
        <span className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand-blue">
          Ver detalhes
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

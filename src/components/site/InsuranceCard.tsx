import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { resolveIcon } from "@/lib/icons";
import { urlForImage } from "@/sanity/lib/image";
import type { Seguro } from "@/sanity/types";

/**
 * Card de seguro no estilo clean/domaco: foto grande de estilo de vida como
 * fundo, ícone em círculo branco no topo, nome sobreposto e "Saiba mais".
 * Sem foto (heroImage), usa um fundo em gradiente da marca com o ícone.
 */
export function InsuranceCard({ seguro }: { seguro: Seguro }) {
  const Icon = resolveIcon(seguro.beneficios?.[0]?.icone);
  const foto = urlForImage(seguro.heroImage)?.width(640).height(800).url();

  return (
    <Link
      href={`/seguros/${seguro.slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl bg-brand-navy"
    >
      {foto ? (
        <Image
          src={foto}
          alt={seguro.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-blue" />
      )}
      {/* Overlay para leitura do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

      {/* Ícone em círculo no topo */}
      <div className="absolute left-5 top-5 flex size-12 items-center justify-center rounded-full bg-white shadow-lg">
        <Icon className="size-6 text-brand-blue" />
      </div>

      <div className="relative p-6">
        <h3 className="font-heading text-xl font-bold leading-tight text-white">{seguro.title}</h3>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 group-hover:gap-2.5">
          Saiba mais
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

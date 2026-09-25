import Image from "next/image";

import { cn } from "@/lib/utils";

export type LogoSeguradora = { nome: string; logoUrl?: string };

/**
 * Esteira de seguradoras "passando" (marquee). Recebe a lista de parceiros;
 * se houver logo, mostra a imagem em tom neutro, senão o nome em texto.
 *
 * Observação: a lista abaixo é um PLACEHOLDER para pré-visualização. As
 * seguradoras reais com que a VT Wealth Club trabalha devem ser confirmadas
 * pelo cliente e cadastradas no Sanity (tipo "parceiro", com logo).
 */
const PLACEHOLDER: LogoSeguradora[] = [
  { nome: "Prudential" },
  { nome: "Porto Seguro" },
  { nome: "Bradesco Seguros" },
  { nome: "SulAmérica" },
  { nome: "Allianz" },
  { nome: "MAPFRE" },
  { nome: "Tokio Marine" },
  { nome: "HDI Seguros" },
  { nome: "Azul Seguros" },
  { nome: "Icatu" },
];

export function SeguradorasMarquee({
  logos,
  onDark = true,
  className,
}: {
  logos?: LogoSeguradora[];
  onDark?: boolean;
  className?: string;
}) {
  const items = logos && logos.length > 0 ? logos : PLACEHOLDER;
  // Duplica a lista para o loop contínuo (translateX -50%).
  const loop = [...items, ...items];

  return (
    <div
      className={cn(
        "marquee-pause group relative overflow-hidden py-6",
        onDark ? "bg-brand-navy" : "bg-brand-surface",
        className
      )}
    >
      {/* Fades laterais */}
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent",
          onDark ? "from-brand-navy" : "from-brand-surface"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent",
          onDark ? "from-brand-navy" : "from-brand-surface"
        )}
      />

      <div className="flex w-max animate-marquee items-center gap-14">
        {loop.map((logo, i) => (
          <div key={`${logo.nome}-${i}`} className="flex shrink-0 items-center justify-center">
            {logo.logoUrl ? (
              <Image
                src={logo.logoUrl}
                alt={logo.nome}
                width={140}
                height={40}
                className={cn(
                  "h-8 w-auto object-contain opacity-60 grayscale transition group-hover:opacity-90",
                  onDark && "brightness-0 invert"
                )}
              />
            ) : (
              <span
                className={cn(
                  "whitespace-nowrap text-lg font-semibold tracking-wide transition",
                  onDark ? "text-white/50 group-hover:text-white/80" : "text-brand-navy/40 group-hover:text-brand-navy/70"
                )}
              >
                {logo.nome}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

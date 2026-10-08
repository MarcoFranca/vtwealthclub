import Image from "next/image";

import { cn } from "@/lib/utils";

export type LogoSeguradora = { nome: string; logoUrl?: string };

/**
 * Esteira de seguradoras "passando" (marquee). Recebe a lista de parceiros;
 * se houver logo, mostra a imagem em branco monocromático, senão o nome em texto.
 *
 * Observação: a lista abaixo é um RASCUNHO para pré-visualização, a ser
 * revisado com o cliente. Porto Seguro e SulAmérica aparecem como texto até
 * chegar uma arte de logo limpa com fundo transparente.
 */
const PLACEHOLDER: LogoSeguradora[] = [
  { nome: "Prudential", logoUrl: "/logos/seguradoras/prudential.svg" },
  { nome: "Porto Seguro" },
  { nome: "Bradesco Seguros", logoUrl: "/logos/seguradoras/bradesco-seguros.png" },
  { nome: "SulAmérica" },
  { nome: "Allianz", logoUrl: "/logos/seguradoras/allianz.svg" },
  { nome: "MAPFRE", logoUrl: "/logos/seguradoras/mapfre.svg" },
  { nome: "Tokio Marine", logoUrl: "/logos/seguradoras/tokio-marine.svg" },
  { nome: "HDI Seguros", logoUrl: "/logos/seguradoras/hdi-seguros.svg" },
  { nome: "Azul Seguros", logoUrl: "/logos/seguradoras/azul-seguros.svg" },
  { nome: "Icatu", logoUrl: "/logos/seguradoras/icatu.png" },
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
  const base = logos && logos.length > 0 ? logos : PLACEHOLDER;
  // Repete a base até formar um "bloco" largo o suficiente para cobrir a tela,
  // e duplica o bloco para o loop contínuo (translateX -50%) sem vãos.
  const bloco = [...base, ...base, ...base];
  const loop = [...bloco, ...bloco];

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

      <div className="flex w-max animate-marquee items-center">
        {loop.map((logo, i) => (
          <div
            key={`${logo.nome}-${i}`}
            className="flex h-10 w-[160px] shrink-0 items-center justify-center px-2"
          >
            {logo.logoUrl ? (
              <Image
                src={logo.logoUrl}
                alt={logo.nome}
                width={150}
                height={40}
                className={cn(
                  "max-h-8 w-auto max-w-[130px] object-contain opacity-60 grayscale transition group-hover:opacity-90",
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

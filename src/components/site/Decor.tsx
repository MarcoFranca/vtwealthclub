import { cn } from "@/lib/utils";

/**
 * Linhas topográficas — motivo da marca (herdado do site antigo). Dá profundidade
 * às seções navy sem parecer template chapado. Use com uma cor de texto suave
 * (ex.: text-white/10) via className.
 */
export function TopoLines({ className }: { className?: string }) {
  const lines = Array.from({ length: 16 });
  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      viewBox="0 0 1200 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {lines.map((_, i) => {
        const y = 20 + i * 40;
        const amp = 28 + (i % 4) * 16;
        return (
          <path
            key={i}
            d={`M -80 ${y} C 220 ${y - amp}, 430 ${y + amp}, 660 ${y - amp / 2} S 1080 ${y + amp}, 1280 ${y - amp / 3}`}
            stroke="currentColor"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

/**
 * Grid de pontos sutil para seções claras. `id` deve ser único por página
 * para evitar colisão de <pattern>.
 */
export function DotGrid({ id, className }: { id: string; className?: string }) {
  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * Brilho radial suave posicionável, para dar volume a fundos escuros.
 */
export function RadialGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full blur-3xl", className)}
    />
  );
}

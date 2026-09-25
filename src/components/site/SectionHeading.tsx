import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Cabeçalho de seção no estilo clean/domaco: um selo pequeno (kicker) com
 * quadradinho colorido e o título em dois tons (cor sólida + parte suave).
 */
export function SectionHeading({
  kicker,
  title,
  muted,
  description,
  align = "left",
  onDark = false,
  className,
}: {
  kicker?: string;
  title: ReactNode;
  muted?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
        className
      )}
    >
      {kicker && (
        <p
          className={cn(
            "mb-3 flex items-center gap-2 text-sm font-semibold",
            align === "center" && "justify-center",
            onDark ? "text-white/70" : "text-brand-navy/70"
          )}
        >
          <span className="inline-block size-2 rounded-[2px] bg-brand-blue" />
          {kicker}
        </p>
      )}
      <h2
        className={cn(
          "font-heading text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl",
          onDark ? "text-white" : "text-brand-navy"
        )}
      >
        {title}
        {muted && <span className={onDark ? "text-white/45" : "text-brand-navy/35"}> {muted}</span>}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            onDark ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

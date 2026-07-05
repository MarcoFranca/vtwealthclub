"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Quote, UserRound, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Depoimento } from "@/sanity/types";

export function TestimonialCarousel({ depoimentos }: { depoimentos: Depoimento[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const total = depoimentos.length;

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex((next + total) % total);
    },
    [index, total]
  );

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  }, [total]);

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, total]);

  if (total === 0) return null;

  const atual = depoimentos[index];

  return (
    <div className="w-full max-w-2xl">
      <div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-white p-8 shadow-xl ring-1 ring-foreground/10 md:min-h-[280px]">
        <Quote className="absolute right-6 top-6 size-16 text-brand-soft" aria-hidden="true" />
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={atual._id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="relative text-xl font-medium leading-relaxed text-brand-navy">
              {atual.texto}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-brand-soft text-brand-navy">
                <UserRound className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-blue">{atual.nome}</p>
                {atual.titulo && (
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{atual.titulo}</p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {total > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {depoimentos.map((d, i) => (
              <button
                key={d._id}
                onClick={() => goTo(i)}
                aria-label={`Ir para depoimento ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goTo(index - 1)}
              aria-label="Anterior"
              className="flex size-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Próximo"
              className="flex size-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

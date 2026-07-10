"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Award } from "lucide-react";

export function VictorPhotos() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax contido: a imagem principal desliza dentro do recorte,
  // o cartão da Prudential e o selo flutuam em ritmos diferentes.
  const yMain = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const yCard = useTransform(scrollYProgress, [0, 1], [30, -20]);
  const yBadge = useTransform(scrollYProgress, [0, 1], [-16, 24]);

  return (
    <div ref={ref} className="relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-soft shadow-xl ring-1 ring-foreground/10">
        <motion.div style={{ y: yMain }} className="absolute -inset-y-8 inset-x-0">
          <Image
            src="/photos/victor-placa.jpg"
            alt="Victor Tarouquella, sócio-fundador da VT Wealth Club"
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-transparent" />
      </div>

      {/* Cartão flutuante Prudential */}
      <motion.div
        style={{ y: yCard }}
        className="absolute -bottom-6 -left-6 hidden w-44 overflow-hidden rounded-xl border-4 border-white shadow-lg sm:block"
      >
        <Image
          src="/photos/victor-prudential.jpg"
          alt="Victor Tarouquella na Prudential do Brasil"
          width={240}
          height={158}
          className="h-auto w-full object-cover"
        />
      </motion.div>

      {/* Selo de credencial */}
      <motion.div
        style={{ y: yBadge }}
        className="absolute -right-3 top-6 hidden items-center gap-2 rounded-xl bg-white/95 px-4 py-3 shadow-lg ring-1 ring-foreground/10 backdrop-blur sm:flex"
      >
        <div className="flex size-9 items-center justify-center rounded-lg bg-brand-soft text-brand-navy">
          <Award className="size-5" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-brand-navy">Life Planner®</p>
          <p className="text-xs text-muted-foreground">Prudential do Brasil</p>
        </div>
      </motion.div>
    </div>
  );
}

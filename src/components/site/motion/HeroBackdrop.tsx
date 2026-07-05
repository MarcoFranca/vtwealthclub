"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-20 -top-20 size-[520px] rounded-full bg-brand-blue/30 blur-3xl"
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-10 size-[480px] rounded-full bg-brand-blue/20 blur-3xl"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      {/* Topografia da marca (arte real) */}
      <Image
        src="/photos/10-analog-topographical-objects-XDP7BJd.png"
        alt=""
        width={1920}
        height={1280}
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-auto w-[70%] max-w-none opacity-50 mix-blend-screen"
      />
    </div>
  );
}

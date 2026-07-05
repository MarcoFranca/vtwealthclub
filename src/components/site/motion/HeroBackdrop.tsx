"use client";

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
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.15]"
        viewBox="0 0 800 500"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={i}
            d={`M ${-50 + i * 20} 500 C ${150 + i * 15} ${350 - i * 12}, ${450 + i * 10} ${420 - i * 10}, ${850 + i * 10} ${180 - i * 15}`}
            stroke="white"
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
}

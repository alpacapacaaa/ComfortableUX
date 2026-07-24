"use client";

import { motion } from "framer-motion";

interface IntroBannerProps {
  episodeLabel: string;
  codename: string;
  appName: string;
  marketingCopy: string;
  hook: string;
  ctaLabel?: string;
  onStart: () => void;
}

export function IntroBanner({
  episodeLabel,
  codename,
  appName,
  marketingCopy,
  hook,
  ctaLabel = "앱 시작하기",
  onStart,
}: IntroBannerProps) {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-gradient-to-b from-[#0B1B3B] via-[#0F2557] to-[#132E6B] px-8 py-14 text-white">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-2 text-center"
      >
        <span className="rounded-full border border-white/25 px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-white/70">
          COMFORTABLEUX PRESENTS
        </span>
        <span className="mt-1 text-xs font-semibold tracking-[0.3em] text-sky-300/80">
          {episodeLabel}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <h1 className="text-6xl font-black tracking-tight">{codename}</h1>
        <div className="h-px w-10 bg-white/30" />
        <p className="text-lg font-semibold">{appName}</p>
        <p className="max-w-[240px] text-sm leading-relaxed text-white/70">
          {marketingCopy}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col items-center gap-5"
      >
        <p className="max-w-[260px] text-center text-sm text-white/60">{hook}</p>
        <button
          onClick={onStart}
          className="w-full rounded-full bg-white py-4 text-sm font-semibold text-[#0B1B3B] transition-transform active:scale-[0.98]"
        >
          {ctaLabel}
        </button>
      </motion.div>
    </div>
  );
}

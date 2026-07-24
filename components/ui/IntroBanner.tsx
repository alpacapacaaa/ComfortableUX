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
    <div className="flex h-full w-full flex-col justify-between bg-white px-8 py-14">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-2 text-center"
      >
        <span className="rounded-full bg-[#F2F4F6] px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-[#8B95A1]">
          COMFORTABLEUX PRESENTS
        </span>
        <span className="mt-1 text-xs font-bold tracking-[0.3em] text-[#3182F6]">
          {episodeLabel}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <h1 className="text-6xl font-black tracking-tight text-[#191F28]">{codename}</h1>
        <div className="h-px w-10 bg-[#F2F4F6]" />
        <p className="text-lg font-bold text-[#191F28]">{appName}</p>
        <p className="max-w-[240px] text-sm leading-relaxed text-[#8B95A1]">
          {marketingCopy}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col items-center gap-5"
      >
        <p className="max-w-[260px] text-center text-sm text-[#8B95A1]">{hook}</p>
        <button
          onClick={onStart}
          className="w-full rounded-2xl bg-[#3182F6] py-4 text-sm font-bold text-white transition-transform active:scale-[0.98]"
        >
          {ctaLabel}
        </button>
      </motion.div>
    </div>
  );
}

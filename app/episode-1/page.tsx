"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { IntroBanner } from "@/components/ui/IntroBanner";
import { BankHome } from "./_components/BankHome";
import { ReceiptViewer } from "./_components/ReceiptViewer";
import { ID_MAX, ID_MIN, MY_RECEIPT_IDS } from "./_components/data";

type Screen = "intro" | "home" | "receipt";

const FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25 },
};

export default function Episode1Page() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentId, setCurrentId] = useState<number>(MY_RECEIPT_IDS[0]);
  const [direction, setDirection] = useState(1);
  const [strangerViews, setStrangerViews] = useState(0);
  const [ended, setEnded] = useState(false);

  function openReceipt(id: number) {
    setCurrentId(id);
    setDirection(1);
    setStrangerViews(0);
    setEnded(false);
    setScreen("receipt");
  }

  function step(delta: number) {
    if (ended) return;
    const next = Math.min(ID_MAX, Math.max(ID_MIN, currentId + delta));
    setDirection(delta > 0 ? 1 : -1);
    setCurrentId(next);
    if (!MY_RECEIPT_IDS.includes(next)) {
      setStrangerViews((v) => v + 1);
    }
  }

  function restart() {
    setScreen("intro");
    setCurrentId(MY_RECEIPT_IDS[0]);
    setDirection(1);
    setStrangerViews(0);
    setEnded(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 py-10">
      <PhoneFrame>
        <AnimatePresence mode="wait" initial={false}>
          {screen === "intro" && (
            <motion.div key="intro" className="absolute inset-0" {...FADE}>
              <IntroBanner
                episodeLabel="EPISODE 01"
                codename="NOSY"
                appName="Comfortable Bank"
                marketingCopy="고객님만을 위한, 편안한 금융 생활을 약속드립니다."
                hook="이웃집 계좌도 궁금하지 않으셨나요?"
                onStart={() => setScreen("home")}
              />
            </motion.div>
          )}

          {screen === "home" && (
            <motion.div key="home" className="absolute inset-0" {...FADE}>
              <BankHome onOpenReceipt={openReceipt} />
            </motion.div>
          )}

          {screen === "receipt" && (
            <motion.div key="receipt" className="absolute inset-0" {...FADE}>
              <ReceiptViewer
                id={currentId}
                direction={direction}
                strangerViews={strangerViews}
                ended={ended}
                onBack={() => setScreen("home")}
                onPrev={() => step(-1)}
                onNext={() => step(1)}
                onStop={() => setEnded(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </PhoneFrame>

      <div className="flex flex-col items-center gap-2 text-center text-[11px] text-neutral-500">
        <p>▲ 녹화 시 이 프레임 바깥은 잘라내세요 (390 × 844)</p>
        <button
          onClick={restart}
          className="rounded-full border border-neutral-700 px-4 py-1.5 text-neutral-300 transition-colors hover:border-neutral-500"
        >
          처음부터 다시보기
        </button>
      </div>
    </div>
  );
}

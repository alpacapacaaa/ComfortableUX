"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { SubtitleOverlay } from "@/components/ui/SubtitleOverlay";
import { ME, MY_RECEIPT_IDS, getReceipt } from "./data";

interface ReceiptViewerProps {
  id: number;
  direction: number;
  strangerViews: number;
  ended: boolean;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
  onStop: () => void;
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
};

function Row({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5">
      <span className="shrink-0 text-[12px] text-[#8A94A6]">{label}</span>
      <div className="text-right">
        <p className="text-[13px] font-medium text-[#101828]">{value}</p>
        {sub && <p className="mt-0.5 text-[11px] text-[#8A94A6]">{sub}</p>}
      </div>
    </div>
  );
}

export function ReceiptViewer({
  id,
  direction,
  strangerViews,
  ended,
  onBack,
  onPrev,
  onNext,
  onStop,
}: ReceiptViewerProps) {
  const receipt = getReceipt(id);
  const isMine = MY_RECEIPT_IDS.includes(id);

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (ended) return;
    if (info.offset.x < -60) onNext();
    else if (info.offset.x > 60) onPrev();
  }

  return (
    <div className="flex h-full w-full flex-col bg-[#F4F6FB]">
      <div className="flex items-center justify-between border-b border-black/5 bg-white px-5 pb-3 pt-6">
        <button
          onClick={onBack}
          aria-label="뒤로가기"
          className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-[#0B1B3B]"
        >
          ‹
        </button>
        <span className="text-[15px] font-semibold text-[#101828]">이체확인증</span>
        <div className="flex items-center gap-1.5 rounded-full bg-[#0B1B3B]/5 px-2.5 py-1">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0B1B3B] text-[10px] font-bold text-white">
            {ME.name.slice(-1)}
          </span>
          <span className="text-[11px] font-medium text-[#0B1B3B]">{ME.name}</span>
        </div>
      </div>

      <div className="mx-5 mt-3 flex items-center gap-2 rounded-lg bg-[#E9ECF4] px-3 py-2 text-[11px] text-[#5B6B8C]">
        <span>🔒</span>
        <span className="truncate font-mono">comfortablebank.co.kr/receipts/{id}</span>
      </div>

      <div className="relative flex-1 overflow-hidden px-5 py-4">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.26, ease: "easeOut" }}
            drag={ended ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
            className={`absolute inset-0 flex flex-col rounded-2xl bg-white p-5 shadow-[0_10px_30px_-12px_rgba(11,27,59,0.25)] ${
              ended ? "ring-2 ring-rose-400" : ""
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#0B1B3B]">
                {isMine ? ME.bank : receipt.senderBank}
              </span>
              <span className="text-[11px] text-[#8A94A6]">{receipt.date}</span>
            </div>

            <div className="mb-5 flex flex-col items-center gap-1 border-b border-dashed border-[#E2E6F0] pb-5">
              <span className="text-[12px] text-[#8A94A6]">이체금액</span>
              <span className="text-[26px] font-bold text-[#0B1B3B]">
                ₩{receipt.amount.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-1">
              <Row
                label="보내는 분"
                value={receipt.senderName}
                sub={`${receipt.senderBank} ${receipt.senderAccount}`}
              />
              <div
                className={
                  ended
                    ? "animate-pulse rounded-xl border-2 border-dashed border-rose-400 bg-rose-50/70 p-2"
                    : ""
                }
              >
                <Row
                  label="받는 분"
                  value={receipt.receiverName}
                  sub={`${receipt.receiverBank} ${receipt.receiverAccount}`}
                />
              </div>
              <Row label="메모" value={receipt.memo} />
              <Row label="승인번호" value={receipt.approvalNo} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {!ended && (
        <div className="px-5 pb-6">
          <div className="mb-3 rounded-xl bg-[#EAF1FF] px-4 py-3 text-center text-[12px] font-medium text-[#1D4ED8]">
            이웃 이체 내역도 편하게 확인해보세요
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onPrev}
              className="flex-1 rounded-full border border-[#0B1B3B]/10 py-3 text-sm font-semibold text-[#0B1B3B] active:scale-[0.97]"
            >
              ◀ 이전 확인증
            </button>
            <button
              onClick={onNext}
              className="flex-1 rounded-full bg-[#0B1B3B] py-3 text-sm font-semibold text-white active:scale-[0.97]"
            >
              다음 확인증 ▶
            </button>
          </div>
          {strangerViews >= 2 && (
            <button
              onClick={onStop}
              className="mt-3 w-full text-center text-[12px] font-medium text-rose-500 underline underline-offset-2"
            >
              그만 보기
            </button>
          )}
        </div>
      )}

      {ended && <SubtitleOverlay />}
    </div>
  );
}

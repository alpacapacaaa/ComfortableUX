"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SubtitleOverlay } from "@/components/ui/SubtitleOverlay";

type Stage = "banner" | "settings" | "accepted" | "rejected";

interface ToggleDef {
  key: "necessary" | "analytics" | "marketing";
  label: string;
  desc: string;
  locked?: boolean;
}

const TOGGLES: ToggleDef[] = [
  { key: "necessary", label: "필수 쿠키", desc: "사이트의 기본 기능 제공을 위해 항상 필요합니다.", locked: true },
  { key: "analytics", label: "분석 쿠키", desc: "방문자의 서비스 이용 패턴을 분석하는 데 사용됩니다." },
  { key: "marketing", label: "마케팅 쿠키", desc: "관심사 기반 맞춤형 광고 제공에 사용됩니다." },
];

function Toggle({ on, disabled, onClick }: { on: boolean; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        on ? "bg-blue-600" : "bg-neutral-300"
      } ${disabled ? "opacity-50" : ""}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export function CookieConsent() {
  const [stage, setStage] = useState<Stage>("banner");
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    necessary: true,
    analytics: true,
    marketing: true,
  });

  if (stage === "accepted") return null;

  return (
    <>
      <AnimatePresence>
        {stage === "banner" && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between gap-8 border-t border-neutral-200 bg-white px-10 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
          >
            <p className="max-w-[520px] text-[13px] leading-relaxed text-neutral-600">
              Comfortable Daily는 최고의 서비스 제공을 위해 쿠키를 사용합니다. 자세한 내용은
              개인정보처리방침을 참고하세요.
            </p>
            <div className="flex shrink-0 items-center gap-5">
              <button
                onClick={() => setStage("settings")}
                className="text-[13px] text-neutral-400 underline underline-offset-2"
              >
                쿠키 설정
              </button>
              <button
                onClick={() => setStage("accepted")}
                className="rounded-lg bg-blue-600 px-7 py-3 text-[14px] font-bold text-white shadow-sm active:scale-[0.98]"
              >
                전체 동의
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(stage === "settings" || stage === "rejected") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center bg-black/40"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-[440px] rounded-2xl bg-white p-6 shadow-2xl ${
                stage === "rejected" ? "ring-2 ring-rose-400" : ""
              }`}
            >
              <h3 className="mb-1 text-lg font-bold text-neutral-900">쿠키 설정</h3>
              <p className="mb-5 text-[13px] text-neutral-500">
                항목별로 쿠키 사용 여부를 선택할 수 있습니다.
              </p>

              <div className="flex flex-col divide-y divide-neutral-100">
                {TOGGLES.map((t) => (
                  <div key={t.key} className="flex items-center justify-between gap-4 py-4">
                    <div>
                      <p className="text-[14px] font-semibold text-neutral-900">
                        {t.label}
                        {t.locked && (
                          <span className="ml-2 text-[11px] font-normal text-neutral-400">
                            항상 활성화
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-[12px] text-neutral-400">{t.desc}</p>
                    </div>
                    <Toggle
                      on={toggles[t.key]}
                      disabled={t.locked}
                      onClick={() => setToggles((s) => ({ ...s, [t.key]: !s[t.key] }))}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <button
                  onClick={() => setStage("rejected")}
                  className={`text-[12px] text-neutral-400 underline underline-offset-2 ${
                    stage === "rejected" ? "rounded px-2 py-1 ring-2 ring-rose-400" : ""
                  }`}
                >
                  전체 거부
                </button>
                <button
                  onClick={() => setStage("accepted")}
                  className="rounded-lg bg-blue-600 px-7 py-3 text-[14px] font-bold text-white shadow-sm active:scale-[0.98]"
                >
                  전체 동의
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {stage === "rejected" && (
        <SubtitleOverlay note="자막 영역 · 편집 시 텍스트 삽입 (예: UX 다크패턴 · 비대칭적 선택 설계 / Deceptive Patterns)" />
      )}
    </>
  );
}

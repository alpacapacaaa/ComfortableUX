"use client";

import { useState } from "react";

const FEATURES = ["광고 없이 기사 보기", "프리미엄 기사 무제한 열람", "매거진 전용 콘텐츠 제공"];

export function PaywallPrompt({ onDismiss }: { onDismiss: () => void }) {
  const [attempted, setAttempted] = useState(false);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-neutral-900/55 backdrop-blur-sm">
      <div className="relative w-full max-w-[400px] rounded-2xl bg-white shadow-2xl">
        <button
          onClick={onDismiss}
          aria-label="닫기"
          className="absolute right-4 top-4 text-neutral-300 hover:text-neutral-400"
        >
          ✕
        </button>

        <div className="flex flex-col items-center px-8 pb-8 pt-10 text-center">
          <span className="text-3xl">🎉</span>
          <h1 className="mt-3 text-lg font-bold text-neutral-900">가입이 거의 완료됐어요!</h1>
          <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">
            프리미엄으로 업그레이드하고 아래 혜택을 모두 누려보세요.
          </p>

          <div className="mt-5 flex w-full flex-col gap-2 text-left">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-2 text-[13px] text-neutral-700">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">
                  ✓
                </span>
                {f}
              </div>
            ))}
          </div>

          <div className="mt-5 w-full rounded-xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-blue-700">프리미엄 멤버십</span>
              <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                첫 달 무료
              </span>
            </div>
            <p className="mt-1 text-[26px] font-bold text-neutral-900">
              <span className="mr-1.5 text-[15px] font-medium text-neutral-400 line-through">14,900원</span>
              월 9,900<span className="text-[14px] font-medium text-neutral-500">원</span>
            </p>
          </div>

          {!attempted ? (
            <button
              onClick={() => setAttempted(true)}
              className="mt-5 w-full rounded-lg bg-blue-600 py-3.5 text-[15px] font-bold text-white active:scale-[0.99]"
            >
              결제하고 시작하기
            </button>
          ) : (
            <div className="mt-5 w-full rounded-lg bg-neutral-100 py-3.5 text-[14px] font-semibold text-neutral-400">
              😅 아직 결제할 준비가 안됐어요
            </div>
          )}

          <button onClick={onDismiss} className="mt-4 text-[12px] text-neutral-400 underline underline-offset-2">
            다음에 할게요
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { SubtitleOverlay } from "@/components/ui/SubtitleOverlay";

export function PaywallPrompt({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white px-10">
      <div className="flex w-full max-w-[420px] flex-col items-center rounded-2xl border border-neutral-200 p-8 text-center shadow-xl">
        <span className="text-4xl">🎉</span>
        <h1 className="mt-4 text-xl font-bold text-neutral-900">가입이 거의 완료됐어요!</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
          Comfortable Daily 프리미엄으로 업그레이드하고 모든 기사를 광고 없이 무제한으로
          읽어보세요.
        </p>

        <div className="mt-6 w-full rounded-xl bg-blue-50 p-5">
          <p className="text-[13px] font-semibold text-blue-700">프리미엄 멤버십</p>
          <p className="mt-1 text-[28px] font-bold text-neutral-900">
            월 9,900<span className="text-[15px] font-medium text-neutral-500">원</span>
          </p>
          <p className="mt-1 text-[12px] text-neutral-500">첫 달 무료, 언제든 해지 가능</p>
        </div>

        <button className="mt-6 w-full rounded-lg bg-blue-600 py-3.5 text-[15px] font-bold text-white">
          결제하고 시작하기
        </button>
        <button onClick={onDismiss} className="mt-4 text-[12px] text-neutral-400 underline underline-offset-2">
          다음에 할게요
        </button>
      </div>

      <SubtitleOverlay note="자막 영역 · 편집 시 텍스트 삽입 (예: UX 다크패턴 · 무료인 줄 알았는데 결제 유도 / Bait and Switch)" />
    </div>
  );
}

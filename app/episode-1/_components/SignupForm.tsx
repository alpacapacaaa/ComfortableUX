"use client";

import { useState } from "react";
import { SubtitleOverlay } from "@/components/ui/SubtitleOverlay";

interface Term {
  key: string;
  label: string;
  required: boolean;
}

const TERMS: Term[] = [
  { key: "tos", label: "서비스 이용약관 동의", required: true },
  { key: "privacy", label: "개인정보 수집 및 이용 동의", required: true },
  { key: "marketing", label: "마케팅 정보 수신 동의 (이메일, SMS, 알림)", required: false },
  { key: "thirdparty", label: "제휴사 제공 및 맞춤 광고 활용 동의", required: false },
];

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-2 text-[11px] font-bold ${
        checked ? "border-blue-600 bg-blue-600 text-white" : "border-neutral-300 text-transparent"
      }`}
    >
      ✓
    </span>
  );
}

export function SignupForm() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const allChecked = TERMS.every((t) => checked[t.key]);
  const requiredChecked = TERMS.filter((t) => t.required).every((t) => checked[t.key]);
  const sneakedOptIns = TERMS.filter((t) => !t.required && checked[t.key]);

  function toggleAll() {
    if (submitted) return;
    const next = !allChecked;
    const updated: Record<string, boolean> = {};
    TERMS.forEach((t) => {
      updated[t.key] = next;
    });
    setChecked(updated);
  }

  function toggle(key: string) {
    if (submitted) return;
    setChecked((s) => ({ ...s, [key]: !s[key] }));
  }

  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto bg-white px-10 py-14">
      <div className="w-full max-w-[420px]">
        <h1 className="mb-1 text-2xl font-bold text-neutral-900">Comfortable Daily 회원가입</h1>
        <p className="mb-8 text-sm text-neutral-500">몇 초면 가입이 끝나요.</p>

        <div className="mb-5 flex flex-col gap-3">
          <input
            placeholder="이메일"
            disabled
            className="rounded-lg border border-neutral-200 px-4 py-3 text-sm text-neutral-400"
          />
          <input
            placeholder="비밀번호"
            disabled
            className="rounded-lg border border-neutral-200 px-4 py-3 text-sm text-neutral-400"
          />
        </div>

        <div className="rounded-xl border border-neutral-200 p-4">
          <button
            onClick={toggleAll}
            className="mb-3 flex w-full items-center gap-3 rounded-lg bg-blue-50 px-3 py-3 text-left"
          >
            <Checkbox checked={allChecked} />
            <span className="text-[15px] font-bold text-blue-700">전체 동의합니다</span>
          </button>

          <div className="flex flex-col gap-1 pl-1">
            {TERMS.map((t) => (
              <div
                key={t.key}
                className={`flex items-center gap-3 rounded-lg px-2 py-2 ${
                  submitted && !t.required && checked[t.key] ? "ring-2 ring-rose-400 bg-rose-50" : ""
                }`}
              >
                <button onClick={() => toggle(t.key)} className="flex items-center">
                  <Checkbox checked={!!checked[t.key]} />
                </button>
                <span className="text-[13px] text-neutral-600">
                  <span className="text-neutral-400">{t.required ? "[필수] " : "[선택] "}</span>
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setSubmitted(true)}
          disabled={!requiredChecked || submitted}
          className="mt-6 w-full rounded-lg bg-blue-600 py-3.5 text-[15px] font-bold text-white disabled:opacity-40"
        >
          가입하기
        </button>
      </div>

      {submitted && sneakedOptIns.length > 0 && (
        <SubtitleOverlay note="자막 영역 · 편집 시 텍스트 삽입 (예: UX 다크패턴 · 선택 항목 끼워팔기 / Sneak into Basket)" />
      )}
    </div>
  );
}

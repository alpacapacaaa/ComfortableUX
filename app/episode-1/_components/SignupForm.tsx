"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const CREEPY_ITEMS = [
  "마케팅 정보 수신 동의 (이메일, SMS, 알림)",
  "체중 정보 제공 동의",
  "주민등록번호 수집 동의",
  "학교 성적 정보 제공 동의",
];

function RequiredCheckbox({ checked }: { checked: boolean }) {
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

function DodgingCheckbox() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 8, y: 8 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const zone = zoneRef.current;
    if (!zone) return;
    const rect = zone.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const cx = pos.x + 13;
    const cy = pos.y + 13;
    const dist = Math.hypot(mx - cx, my - cy);

    if (dist < 46) {
      const maxX = Math.max(rect.width - 26, 0);
      const maxY = Math.max(rect.height - 26, 0);
      let nx = Math.random() * maxX;
      let ny = Math.random() * maxY;
      let tries = 0;
      while (Math.hypot(nx - mx, ny - my) < 55 && tries < 8) {
        nx = Math.random() * maxX;
        ny = Math.random() * maxY;
        tries++;
      }
      setPos({ x: nx, y: ny });
    }
  }

  return (
    <div ref={zoneRef} onMouseMove={handleMouseMove} className="relative h-12 w-32 shrink-0">
      <motion.div
        animate={{ left: pos.x, top: pos.y }}
        transition={{ type: "spring", stiffness: 700, damping: 22 }}
        className="absolute flex h-[26px] w-[26px] items-center justify-center rounded-[6px] border-2 border-blue-600 bg-blue-600 text-[12px] font-bold text-white"
      >
        ✓
      </motion.div>
    </div>
  );
}

export function SignupForm({ onSubmit }: { onSubmit: () => void }) {
  const [tosChecked, setTosChecked] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white px-10 py-14">
      <div className="w-full max-w-[440px]">
        <h1 className="mb-1 text-2xl font-bold text-neutral-900">Comfortable Daily 회원가입</h1>
        <p className="mb-8 text-sm text-neutral-500">약관 동의만 하면 가입 끝!</p>

        <div className="rounded-xl border border-neutral-200 p-4">
          <button
            onClick={() => setTosChecked((v) => !v)}
            className="mb-1 flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left"
          >
            <RequiredCheckbox checked={tosChecked} />
            <span className="text-[13px] text-neutral-700">
              <span className="text-neutral-400">[필수] </span>
              서비스 이용약관 동의
            </span>
          </button>

          <div className="my-2 border-t border-neutral-100" />

          <p className="mb-1 px-2 text-[11px] text-neutral-400">
            아래 항목은 선택이며, 끄고 싶으면 체크박스를 눌러 해제하세요.
          </p>

          <div className="flex flex-col">
            {CREEPY_ITEMS.map((label) => (
              <div key={label} className="flex items-center justify-between gap-4 rounded-lg px-2 py-1">
                <span className="text-[13px] text-neutral-600">
                  <span className="text-neutral-400">[선택] </span>
                  {label}
                </span>
                <DodgingCheckbox />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={!tosChecked}
          className="mt-6 w-full rounded-lg bg-blue-600 py-3.5 text-[15px] font-bold text-white disabled:opacity-40"
        >
          가입하기
        </button>
      </div>
    </div>
  );
}

"use client";

import { HOME_TRANSACTIONS, ME } from "./data";

const QUICK_ACTIONS = ["송금", "조회", "카드", "더보기"];

export function BankHome({ onOpenReceipt }: { onOpenReceipt: (id: number) => void }) {
  return (
    <div className="flex h-full w-full flex-col bg-[#F4F6FB]">
      <div className="bg-gradient-to-b from-[#0B1B3B] to-[#132E6B] px-5 pb-8 pt-7 text-white">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-bold tracking-tight">Comfortable Bank</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-[13px] font-semibold">
            {ME.name.slice(-1)}
          </span>
        </div>
        <p className="mt-6 text-[13px] text-white/70">안녕하세요, {ME.name}님</p>
        <p className="mt-1 text-[32px] font-bold tracking-tight">
          ₩{ME.balance.toLocaleString()}
        </p>

        <div className="mt-6 grid grid-cols-4 gap-2 text-center text-[11px] text-white/85">
          {QUICK_ACTIONS.map((label) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-base">
                {label === "송금" ? "↗" : label === "조회" ? "▤" : label === "카드" ? "▭" : "⋯"}
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[14px] font-semibold text-[#101828]">최근 거래내역</span>
          <span className="text-[12px] text-[#8A94A6]">전체보기</span>
        </div>

        <div className="flex flex-col divide-y divide-black/5 rounded-2xl bg-white px-4 shadow-sm">
          {HOME_TRANSACTIONS.map((tx) => (
            <button
              key={tx.id}
              onClick={() => onOpenReceipt(tx.id)}
              className="flex items-center justify-between py-4 text-left active:opacity-60"
            >
              <div>
                <p className="text-[13px] font-medium text-[#101828]">{tx.title}</p>
                <p className="mt-0.5 text-[11px] text-[#8A94A6]">{tx.date}</p>
              </div>
              <div className="text-right">
                <p
                  className={`text-[14px] font-semibold ${
                    tx.direction === "out" ? "text-[#101828]" : "text-[#1D4ED8]"
                  }`}
                >
                  {tx.direction === "out" ? "-" : "+"}₩{tx.amount.toLocaleString()}
                </p>
                <p className="mt-0.5 text-[11px] text-[#8A94A6]">확인증 보기 ›</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

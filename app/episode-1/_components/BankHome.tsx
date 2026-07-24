"use client";

import { HOME_TRANSACTIONS, ME } from "./data";

const QUICK_ACTIONS = ["송금", "조회", "카드", "더보기"];

export function BankHome({ onOpenReceipt }: { onOpenReceipt: (id: number) => void }) {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="px-5 pb-6 pt-7">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-bold tracking-tight text-[#191F28]">Comfortable Bank</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2F4F6] text-[13px] font-semibold text-[#191F28]">
            {ME.name.slice(-1)}
          </span>
        </div>
        <p className="mt-6 text-[14px] text-[#8B95A1]">{ME.name}님, 안녕하세요</p>
        <p className="mt-1 text-[34px] font-bold tracking-tight text-[#191F28]">
          ₩{ME.balance.toLocaleString()}
        </p>

        <div className="mt-7 grid grid-cols-4 gap-2 text-center text-[11px] text-[#4E5968]">
          {QUICK_ACTIONS.map((label) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF3FF] text-base text-[#3182F6]">
                {label === "송금" ? "↗" : label === "조회" ? "▤" : label === "카드" ? "▭" : "⋯"}
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#F2F4F6] px-5 py-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[15px] font-bold text-[#191F28]">최근 거래내역</span>
          <span className="text-[12px] text-[#8B95A1]">전체보기</span>
        </div>

        <div className="flex flex-col divide-y divide-[#F2F4F6] rounded-2xl bg-white px-4 shadow-[0_2px_12px_-4px_rgba(25,31,40,0.08)]">
          {HOME_TRANSACTIONS.map((tx) => (
            <button
              key={tx.id}
              onClick={() => onOpenReceipt(tx.id)}
              className="flex items-center justify-between py-4 text-left active:opacity-60"
            >
              <div>
                <p className="text-[14px] font-medium text-[#191F28]">{tx.title}</p>
                <p className="mt-0.5 text-[12px] text-[#8B95A1]">{tx.date}</p>
              </div>
              <div className="text-right">
                <p
                  className={`text-[15px] font-bold ${
                    tx.direction === "out" ? "text-[#191F28]" : "text-[#3182F6]"
                  }`}
                >
                  {tx.direction === "out" ? "-" : "+"}₩{tx.amount.toLocaleString()}
                </p>
                <p className="mt-0.5 text-[11px] text-[#B0B8C1]">확인증 보기 ›</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

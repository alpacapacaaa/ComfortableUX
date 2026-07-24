"use client";

import { HOME_TRANSACTIONS, ME } from "./data";

const QUICK_ACTIONS = ["송금", "조회", "카드", "더보기"];

export function BankHome({ onOpenReceipt }: { onOpenReceipt: (id: number) => void }) {
  return (
    <div className="flex h-full w-full flex-col bg-[#F2F4F6]">
      <div className="flex items-center justify-between px-5 pb-4 pt-6">
        <span className="text-[17px] font-extrabold tracking-tight text-[#191F28]">
          Comfortable Bank
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[15px]">
          🔔
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl bg-white p-5">
            <p className="text-[13px] text-[#8B95A1]">{ME.name}님, 안녕하세요</p>
            <p className="mt-1 text-[32px] font-extrabold tracking-tight text-[#191F28]">
              ₩{ME.balance.toLocaleString()}
            </p>

            <div className="mt-6 grid grid-cols-4 gap-2 text-center text-[11px] text-[#4E5968]">
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

          <div className="rounded-2xl bg-white p-4">
            <div className="flex items-center justify-between px-1 pb-2">
              <span className="text-[15px] font-bold text-[#191F28]">최근 거래내역</span>
              <span className="text-[12px] text-[#8B95A1]">전체보기</span>
            </div>

            <div className="flex flex-col divide-y divide-[#F2F4F6]">
              {HOME_TRANSACTIONS.map((tx) => (
                <button
                  key={tx.id}
                  onClick={() => onOpenReceipt(tx.id)}
                  className="flex items-center justify-between px-1 py-4 text-left active:opacity-60"
                >
                  <div>
                    <p className="text-[14px] font-semibold text-[#191F28]">{tx.title}</p>
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
      </div>
    </div>
  );
}

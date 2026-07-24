import { ReactNode } from "react";

export function BrowserFrame({ children, url }: { children: ReactNode; url: string }) {
  return (
    <div className="mx-auto w-[1200px] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl">
      <div className="flex items-center gap-4 border-b border-neutral-200 bg-neutral-100 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-[13px] text-neutral-500">
          <span>🔒</span>
          <span className="font-mono">{url}</span>
        </div>
      </div>
      <div className="relative h-[800px] overflow-hidden bg-white">{children}</div>
    </div>
  );
}

export function SubtitleOverlay({ note }: { note?: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 flex justify-center pb-7">
      <div className="mx-6 flex min-h-[54px] w-full items-center justify-center rounded-xl border border-dashed border-white/40 bg-black/55 px-4 py-3 backdrop-blur-sm">
        <span className="text-center text-[11px] font-medium leading-snug text-white/50">
          {note ?? "자막 영역 · 편집 시 텍스트 삽입 (예: OWASP Top 10 · A01 Broken Access Control)"}
        </span>
      </div>
    </div>
  );
}

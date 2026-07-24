const NAV = ["홈", "정치", "경제", "문화", "스포츠", "오피니언"];

const ARTICLES = [
  { tag: "경제", title: "금리 인상 속도 조절론 힘 얻어...연내 추가 인하 가능성", time: "3시간 전" },
  { tag: "문화", title: "영화제 개막...화제작 라인업 공개", time: "5시간 전" },
  { tag: "스포츠", title: "프로야구 순위 경쟁 치열...남은 3경기 변수는", time: "6시간 전" },
  { tag: "정치", title: "국회, 내년도 예산안 심사 본격화", time: "8시간 전" },
];

export function NewsSite({
  onSignup,
  showLockPrompt = true,
}: {
  onSignup: () => void;
  showLockPrompt?: boolean;
}) {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex items-center justify-between border-b border-neutral-200 px-10 py-5">
        <span className="text-2xl font-black tracking-tight text-neutral-900">
          Comfortable Daily
        </span>
        <nav className="flex gap-6 text-sm font-medium text-neutral-600">
          {NAV.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <span className="text-sm text-neutral-400">🔍 검색</span>
          <button
            onClick={onSignup}
            className="rounded-lg bg-neutral-900 px-4 py-2 text-[13px] font-semibold text-white"
          >
            회원가입
          </button>
        </div>
      </div>

      <div className="relative px-10 py-8">
        <div className="pointer-events-none select-none blur-[5px]">
          <div className="mb-10 grid grid-cols-2 gap-8">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-300" />
            <div className="flex flex-col justify-center gap-3">
              <span className="text-xs font-bold text-blue-600">단독</span>
              <h1 className="text-3xl font-bold leading-snug text-neutral-900">
                &ldquo;기록적인 폭염&rdquo; 이번 주 절정...전국 대부분 폭염특보
              </h1>
              <p className="text-[15px] leading-relaxed text-neutral-500">
                기상청은 이번 주 중반까지 낮 최고기온이 35도를 웃도는 무더위가 이어질 것으로
                내다봤다. 온열질환 발생이 급증하고 있어 각별한 주의가 필요하다는 분석이다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {ARTICLES.map((a) => (
              <div key={a.title} className="flex flex-col gap-2">
                <div className="aspect-video rounded-lg bg-neutral-100" />
                <span className="text-xs font-semibold text-blue-600">{a.tag}</span>
                <p className="text-[15px] font-semibold leading-snug text-neutral-900">
                  {a.title}
                </p>
                <span className="text-xs text-neutral-400">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {showLockPrompt && (
          <div className="absolute inset-0 flex items-start justify-center pt-16">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-neutral-200 bg-white/95 px-10 py-8 text-center shadow-xl">
              <span className="text-3xl">🔒</span>
              <p className="text-[15px] font-semibold text-neutral-900">
                회원가입하고 전체 기사를 확인하세요
              </p>
              <p className="max-w-[280px] text-[13px] leading-relaxed text-neutral-500">
                Comfortable Daily 회원이 되시면 모든 기사를 제한 없이 볼 수 있어요.
              </p>
              <button
                onClick={onSignup}
                className="rounded-lg bg-blue-600 px-8 py-3 text-[14px] font-bold text-white"
              >
                회원가입하고 계속 읽기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

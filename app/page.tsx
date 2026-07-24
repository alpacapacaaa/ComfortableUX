import Link from "next/link";

interface Episode {
  slug?: string;
  number: string;
  codename: string;
  app: string;
  blurb: string;
  ready: boolean;
}

const episodes: Episode[] = [
  {
    number: "EP. 01",
    codename: "미정",
    app: "?",
    blurb: "아이디어 선정 중.",
    ready: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-md flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium tracking-[0.3em] text-neutral-500">
            COMFORTABLEUX
          </span>
          <h1 className="text-2xl font-bold">멀쩡해 보이는 화면, 사실은 최악.</h1>
          <p className="text-sm leading-relaxed text-neutral-400">
            실제로 있을 법한 화면 속에 보안 취약점과 다크패턴을 하나씩 숨겨둔 목업 시리즈.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {episodes.map((ep) => {
            const card = (
              <div
                className={`flex flex-col gap-2 rounded-2xl border px-5 py-5 transition-colors ${
                  ep.ready
                    ? "border-neutral-700 bg-neutral-900 hover:border-neutral-500"
                    : "border-neutral-800 bg-neutral-900/40 opacity-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium tracking-widest text-neutral-500">
                    {ep.number}
                  </span>
                  {!ep.ready && (
                    <span className="text-[10px] tracking-wide text-neutral-500">
                      COMING SOON
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-xl font-bold">{ep.codename}</h2>
                  <span className="text-xs text-neutral-500">{ep.app}</span>
                </div>
                <p className="text-sm text-neutral-400">{ep.blurb}</p>
              </div>
            );

            return ep.ready ? (
              <Link key={ep.codename} href={`/${ep.slug}`}>
                {card}
              </Link>
            ) : (
              <div key={ep.codename}>{card}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

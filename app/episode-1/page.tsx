"use client";

import { useState } from "react";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { IntroBanner } from "@/components/ui/IntroBanner";
import { NewsSite } from "./_components/NewsSite";
import { CookieConsent } from "./_components/CookieConsent";

type Screen = "intro" | "site";

export default function Episode1Page() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [siteKey, setSiteKey] = useState(0);

  function restart() {
    setScreen("intro");
    setSiteKey((k) => k + 1);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 py-10">
      {screen === "intro" ? (
        <PhoneFrame>
          <IntroBanner
            episodeLabel="EPISODE 01"
            codename="GHOST"
            appName="Comfortable Daily"
            marketingCopy="고객님의 프라이버시를, 저희가 가장 먼저 생각합니다."
            hook="쿠키 거부 버튼, 어디 있는지 아세요?"
            onStart={() => setScreen("site")}
          />
        </PhoneFrame>
      ) : (
        <BrowserFrame url="comfortabledaily.com">
          <NewsSite />
          <CookieConsent key={siteKey} />
        </BrowserFrame>
      )}

      <div className="flex flex-col items-center gap-2 text-center text-[11px] text-neutral-500">
        <p>▲ 녹화 시 이 프레임 바깥은 잘라내세요</p>
        <button
          onClick={restart}
          className="rounded-full border border-neutral-700 px-4 py-1.5 text-neutral-300 transition-colors hover:border-neutral-500"
        >
          처음부터 다시보기
        </button>
      </div>
    </div>
  );
}

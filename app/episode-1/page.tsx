"use client";

import { useState } from "react";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { IntroBanner } from "@/components/ui/IntroBanner";
import { NewsSite } from "./_components/NewsSite";
import { SignupForm } from "./_components/SignupForm";
import { PaywallPrompt } from "./_components/PaywallPrompt";

type Screen = "intro" | "home" | "signup" | "paywall";

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
            marketingCopy="고객님의 소중한 개인정보, 저희가 가장 먼저 생각합니다."
            hook="선택 항목, 취소하려고 눌러보세요. 잡을 수 있다면요."
            onStart={() => setScreen("home")}
          />
        </PhoneFrame>
      ) : (
        <BrowserFrame url="comfortabledaily.com" key={siteKey}>
          {(screen === "home" || screen === "paywall") && (
            <NewsSite
              onSignup={() => setScreen("signup")}
              showLockPrompt={screen === "home"}
            />
          )}
          {screen === "signup" && <SignupForm onSubmit={() => setScreen("paywall")} />}
          {screen === "paywall" && <PaywallPrompt onDismiss={() => setScreen("home")} />}
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

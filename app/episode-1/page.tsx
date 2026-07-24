"use client";

import { useState } from "react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { NewsSite } from "./_components/NewsSite";
import { SignupForm } from "./_components/SignupForm";
import { PaywallPrompt } from "./_components/PaywallPrompt";

type Screen = "home" | "signup" | "paywall";

export default function Episode1Page() {
  const [screen, setScreen] = useState<Screen>("home");
  const [siteKey, setSiteKey] = useState(0);

  function restart() {
    setScreen("home");
    setSiteKey((k) => k + 1);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 py-10">
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

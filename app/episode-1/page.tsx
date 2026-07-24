"use client";

import { useState } from "react";
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
    <div className="relative min-h-screen w-full bg-white" key={siteKey}>
      {(screen === "home" || screen === "paywall") && (
        <NewsSite onSignup={() => setScreen("signup")} showLockPrompt={screen === "home"} />
      )}
      {screen === "signup" && <SignupForm onSubmit={() => setScreen("paywall")} />}
      {screen === "paywall" && <PaywallPrompt onDismiss={() => setScreen("home")} />}

      <button
        onClick={restart}
        className="fixed bottom-4 right-4 z-[60] rounded-full border border-neutral-200 bg-white/90 px-3 py-1.5 text-[11px] text-neutral-400 shadow-sm backdrop-blur hover:border-neutral-300"
      >
        처음부터 다시보기
      </button>
    </div>
  );
}

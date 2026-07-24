import { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto h-[844px] w-[390px] overflow-hidden rounded-[2.75rem] bg-black shadow-[0_0_0_10px_rgba(0,0,0,0.9),0_30px_60px_-15px_rgba(0,0,0,0.6)]">
      <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
        {children}
      </div>
    </div>
  );
}

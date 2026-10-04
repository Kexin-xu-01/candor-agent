"use client";

import { useEffect, useState } from "react";

const STEPS = ["Searching knowledge sources…", "Weighing the evidence…", "Deciding whether to answer…"];

export function LoadingIndicator() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 520);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex animate-rise items-center gap-3 px-0.5 py-1.5 text-[14.5px] text-muted" role="status">
      <span className="flex gap-1" aria-hidden>
        {[0, 150, 300].map((d) => (
          <span key={d} className="h-[7px] w-[7px] animate-blink rounded-full bg-accent" style={{ animationDelay: `${d}ms` }} />
        ))}
      </span>
      {STEPS[step]}
    </div>
  );
}

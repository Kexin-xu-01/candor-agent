"use client";

import { useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

interface Props {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  const submit = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
    if (ref.current) ref.current.style.height = "auto";
  };

  return (
    <div className="bg-gradient-to-t from-background from-70% to-transparent px-4 pb-4 pt-1.5 sm:px-5">
      <div className="mx-auto flex max-w-[760px] items-end gap-2.5 rounded-[20px] border border-line-strong bg-surface py-2.5 pl-[18px] pr-2.5 transition-colors focus-within:border-accent">
        <textarea
          ref={ref}
          rows={1}
          value={value}
          aria-label="Ask a question"
          placeholder="Ask a question…"
          className="max-h-40 min-h-7 flex-1 resize-none bg-transparent py-2 text-base outline-none placeholder:text-faint"
          onChange={(e) => {
            setValue(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
        />
        <button
          onClick={submit}
          disabled={!value.trim() || disabled}
          aria-label="Send"
          className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[13px] bg-accent text-accent-foreground transition-opacity disabled:opacity-35"
        >
          <ArrowUp size={18} strokeWidth={2.2} />
        </button>
      </div>
      <p className="mx-auto mt-2 max-w-[760px] text-center text-xs text-faint">
        Candor may say “I don’t know”. That is a deliberate, valid answer.
      </p>
    </div>
  );
}

"use client";

import type { AgentResponse, Feedback } from "@/types";
import { Button } from "@/components/ui/button";

interface Props {
  response: Pick<AgentResponse, "kind">;
  feedback?: Feedback;
  onChange: (patch: Partial<Feedback>) => void;
}

export function FeedbackButtons({ response, feedback, onChange }: Props) {
  const isAnswer = response.kind === "answer";
  const hasFeedback = feedback && (feedback.rating || feedback.shouldHaveAnswered !== undefined);

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
      <span className="mr-1 text-[13.5px] text-muted">{isAnswer ? "Was this correct?" : "Was this a good call?"}</span>
      <Button variant="chip" size="chip" aria-pressed={feedback?.rating === "correct"} onClick={() => onChange({ rating: "correct" })}>
        👍 Correct
      </Button>
      <Button variant="chip" size="chip" aria-pressed={feedback?.rating === "incorrect"} onClick={() => onChange({ rating: "incorrect" })}>
        👎 Incorrect
      </Button>

      {!isAnswer && (
        <>
          <span className="ml-2.5 mr-1 text-[13.5px] text-muted">Should the agent have answered?</span>
          <Button variant="chip" size="chip" aria-pressed={feedback?.shouldHaveAnswered === true} onClick={() => onChange({ shouldHaveAnswered: true })}>
            Yes
          </Button>
          <Button variant="chip" size="chip" aria-pressed={feedback?.shouldHaveAnswered === false} onClick={() => onChange({ shouldHaveAnswered: false })}>
            No
          </Button>
        </>
      )}

      {hasFeedback && <span className="ml-1.5 text-[13.5px] text-ok">Thanks, feedback recorded.</span>}
    </div>
  );
}

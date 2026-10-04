# Candor: uncertainty-aware agent prototype

A two-page Next.js app that demonstrates an AI agent which either **answers** or says **"I don't know"**, plus an evaluation dashboard.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · shadcn/ui-style primitives (Radix) · Recharts

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

- `/` is the agent chat
- `/dashboard` is the evaluation dashboard

## Structure

```
app/
  layout.tsx, globals.css      design tokens (light + dark) live in globals.css
  page.tsx                     "/"
  dashboard/page.tsx           "/dashboard"
  api/agent/route.ts           placeholder backend (optional)
components/
  chat/        ChatInterface, ChatInput, ChatMessage, DecisionBadge, ConfidenceIndicator,
               EvidencePanel, DecisionFactors, FeedbackButtons, LoadingIndicator
  dashboard/   MetricCard, AccuracyCoverageChart, CalibrationChart, DecisionMatrix,
               ResultDistributionChart, ModelComparisonTable, EvaluationTable, Panel, Pill
  layout/      AppShell, Sidebar
  providers/   ConversationProvider (conversations, loading, feedback state)
  ui/          button, card, tooltip, info-tip, sheet
data/          agent.ts, conversations.ts, evaluation.ts   <- all mock data
services/      agent.ts, evaluation.ts                     <- the swap points
types/         index.ts                                    <- AgentResponse, EvaluationReport, ...
lib/           utils.ts, mock-agent.ts
```

## Replacing the mock agent with a real backend

1. Make your backend accept `POST { "question": string }` and return an `AgentResponse` (see `types/index.ts`):
   `kind` (`"answer"` or `"abstain"`), `text`, `confidence` (0-100), `threshold`, `evidence[]`, `factors[]`, and `reason` for abstentions.
2. Set `NEXT_PUBLIC_AGENT_API_URL` in `.env.local` (see `.env.example`). Nothing else changes.
   To try the wiring first, use `NEXT_PUBLIC_AGENT_API_URL=/api/agent`.
3. Feedback is sent through `submitFeedback()` in `services/agent.ts` (currently logs in development). Point it at your endpoint.
4. Dashboard numbers come from `services/evaluation.ts`. Replace it with a fetch to your evaluation results, matching `EvaluationReport`.

A real failure (network, 5xx) renders a distinct error card. "I don't know" never does; it is a first-class output.

## Notes

- Fonts (Bricolage Grotesque, Instrument Sans) load from Google Fonts via a `<link>` in `app/layout.tsx`, with system fallbacks.
- Mock figures are illustrative and not reconciled to each other.

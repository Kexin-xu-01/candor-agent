import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConversationProvider } from "@/components/providers/ConversationProvider";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Candor – an agent that knows when to say “I don’t know”",
  description: "Uncertainty-aware AI agent prototype with an evaluation dashboard.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Instrument+Sans:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        <TooltipProvider delayDuration={100}>
          <ConversationProvider>
            <AppShell>{children}</AppShell>
          </ConversationProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}

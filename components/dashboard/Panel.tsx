import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Panel({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Card className={cn("min-w-0 p-5", className)}>
      <h2 className="text-[19px] font-semibold">{title}</h2>
      {description && <p className="mb-3.5 mt-1.5 max-w-[60ch] text-sm text-muted">{description}</p>}
      {children}
    </Card>
  );
}

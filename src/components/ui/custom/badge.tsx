import { cn } from "@/packages/utils/cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-xs rounded-full border border-border px-3 py-1.5 text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

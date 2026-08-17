import { cn } from "@/packages/utils/cn";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-2xl p-8 transition-all duration-300",
        "hover:-translate-y-1 hover:border-secondary/40 hover:shadow-[0_20px_50px_-20px_var(--primary)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

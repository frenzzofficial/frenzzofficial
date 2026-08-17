"use client";

import { useState } from "react";
import { cn } from "@/packages/utils/cn";

export function Accordion({
  items,
}: {
  items: { id: string; question: string; answer: string }[];
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="max-w-2xl mx-auto mt-14">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="border-b border-border">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between gap-5 py-6 text-left font-display text-base font-semibold"
            >
              {item.question}
              <span
                className={cn(
                  "shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-secondary transition-transform duration-300",
                  isOpen && "rotate-45 border-secondary/50",
                )}
              >
                +
              </span>
            </button>
            <div
              className="overflow-hidden transition-[max-height] duration-300"
              style={{ maxHeight: isOpen ? "200px" : "0px" }}
            >
              <p className="pb-6 text-sm leading-relaxed text-muted-foreground max-w-xl">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Badge, Card } from "@/components/ui";
import { appConfig, type Venture } from "@/packages/configs/app.config";
import { cn } from "@/packages/utils/cn";

gsap.registerPlugin(ScrollTrigger);

export function VenturesTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // center line fill, scrubs with scroll through the whole timeline
      gsap.to(fillRef.current, {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 60%",
          scrub: true,
        },
      });

      // each card slides in from its side and fades/scales up
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const venture = appConfig.ventures[i];
        const fromX = venture.side === "left" ? -60 : 60;

        gsap.fromTo(
          el,
          { opacity: 0, x: fromX, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="ventures" className="py-28 border-b border-border">
      <div className="max-w-6xl mx-auto px-7">
        <div className="text-center">
          <p className="font-mono text-xs tracking-widest text-accent uppercase mb-3">
            Ventures
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl">
            Five ventures. One engineering standard.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Scroll through what Frenzz runs — each venture specialized, all
            connected to the same core.
          </p>
        </div>

        <div ref={sectionRef} className="relative mt-16">
          {/* center track */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />
          <div
            ref={fillRef}
            className="absolute left-6 md:left-1/2 top-0 w-0.5 h-full brand-gradient-bg md:-translate-x-1/2 scale-y-0 shadow-[0_0_14px_-2px_var(--accent)]"
          />

          {appConfig.ventures.map((venture, i) => (
            <VentureRow
              key={venture.id}
              venture={venture}
              refCb={(el) => (itemRefs.current[i] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function VentureRow({
  venture,
  refCb,
}: {
  venture: Venture;
  refCb: (el: HTMLDivElement | null) => void;
}) {
  const isLeft = venture.side === "left";

  return (
    <div className="relative grid grid-cols-[44px_1fr] md:grid-cols-[1fr_60px_1fr] items-center py-10 md:py-16">
      <div
        className={cn(
          "col-start-2 md:col-start-auto",
          isLeft ? "md:col-start-1" : "md:col-start-3",
        )}
      >
        <div ref={refCb}>
          <Card>
            <span className="font-mono text-xs text-accent block mb-3">
              {venture.index} / {venture.category}
            </span>
            <h3 className="font-display text-xl font-semibold mb-2.5">
              {venture.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {venture.description}
            </p>
            <Badge className="text-accent border-accent/25 bg-accent/[0.06]">
              {venture.handle}
            </Badge>
          </Card>
        </div>
      </div>

      {/* node dot */}
      <div className="col-start-1 md:col-start-2 flex items-center justify-center relative z-10">
        <div className="w-4 h-4 rounded-full bg-background border-2 border-border" />
      </div>
    </div>
  );
}

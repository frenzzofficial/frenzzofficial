"use client";
import Image from "next/image";
import { Badge, Button } from "@/components/ui";
import { appConfig } from "@/packages/configs/app.config";
import useOrbitGravity from "@/packages/hooks/useOrbitGravity";

const Hero = () => {
  const { hero, brand, ventures } = appConfig;
  const {
    stageRef,
    setItemRef,
    stageHandlers,
    handleItemEnter,
    handleItemLeave,
  } = useOrbitGravity({
    count: ventures.length,
  });

  return (
    <header className="relative py-24">
      <div className="max-w-6xl mx-auto px-7 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <Badge className="inline-flex items-center gap-2 border-accent/30 bg-secondary/10 text-accent mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {hero.eyebrow}
          </Badge>

          <h1 className="font-display font-bold leading-[1.04] tracking-tight text-[38px] md:text-[64px]">
            {hero.title[0]}
            <br />
            One <span className="brand-gradient-text">{hero.accentWord}</span>.
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed">
            {hero.subtitle}
          </p>

          <div className="flex gap-3.5 mt-9 flex-wrap">
            {hero.ctas.map((cta) => (
              <Button
                key={cta.label}
                label={cta.label}
                href={cta.href}
                variant={cta.variant}
              />
            ))}
          </div>

          <div className="flex gap-2.5 mt-9 flex-wrap">
            {hero.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>

        <div
          ref={stageRef}
          {...stageHandlers}
          className="relative aspect-square max-w-110 mx-auto w-full"
        >
          <div className="absolute inset-0 rounded-full border border-border" />
          <div className="absolute inset-[14%] rounded-full border border-dashed border-border" />
          <div className="absolute inset-[28%] rounded-full border border-border" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-29.5 h-29.5 rounded-full overflow-hidden shadow-[0_0_70px_-10px_var(--secondary)] z-10">
            <Image
              src={brand.avatar}
              alt={brand.name}
              fill
              className="object-cover"
            />
          </div>

          {ventures.map((venture, i) => (
            <button
              type="button"
              key={venture.id}
              ref={setItemRef(i) as <T>(el: T | null) => void}
              onMouseEnter={() => handleItemEnter(i)}
              onMouseLeave={() => handleItemLeave(i)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-card/90 backdrop-blur border border-border rounded-full pl-2 pr-3 py-1.5 font-mono text-[11px] whitespace-nowrap cursor-pointer transition-[border-color,box-shadow] duration-300 hover:border-accent/60 hover:shadow-[0_0_26px_-4px_var(--accent)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--accent)]" />
              {venture.category === "ENGINEERING"
                ? "Web & AI Dev"
                : venture.category.charAt(0) +
                  venture.category.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Hero;

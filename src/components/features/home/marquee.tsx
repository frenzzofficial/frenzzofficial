import { appConfig } from "@/packages/configs/app.config";

export function Marquee() {
  const items = appConfig.techStack;
  return (
    <div
      id="stack"
      className="border-y border-border py-5 overflow-hidden bg-secondary/3"
    >
      <div className="flex gap-14 w-max animate-[marquee_22s_linear_infinite]">
        {[0, 1].map((rep) => (
          <div key={rep} className="flex gap-14 items-center">
            {items.map((tech) => (
              <span
                key={items.indexOf(tech)}
                className="font-mono text-sm text-muted-foreground flex items-center gap-14"
              >
                <b className="text-foreground font-medium">{tech}</b>
                <span className="text-accent">●</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

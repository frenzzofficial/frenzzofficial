import { Accordion } from "@/components/ui";
import { appConfig } from "@/packages/configs/app.config";

export function Faq() {
  return (
    <section id="faq" className="py-28 border-b border-border">
      <div className="max-w-6xl mx-auto px-7 text-center">
        <p className="font-mono text-xs tracking-widest text-accent uppercase mb-3">
          FAQ
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl">
          Questions, answered.
        </h2>
        <Accordion items={[...appConfig.faq]} />
      </div>
    </section>
  );
}

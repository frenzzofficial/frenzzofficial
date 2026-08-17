import { Button } from "@/components/ui";

export function CtaBand() {
  return (
    <section id="contact" className="py-28 text-center">
      <div className="max-w-6xl mx-auto px-7">
        <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight">
          Have a project in mind?
          <br />
          <span className="brand-gradient-text">
            Let&apos;s build it right.
          </span>
        </h2>
        <div className="flex gap-3.5 justify-center mt-9 flex-wrap">
          <Button label="Start a project →" href="#" variant="primary" />
          <Button label="View services" href="#" variant="secondary" />
        </div>
      </div>
    </section>
  );
}

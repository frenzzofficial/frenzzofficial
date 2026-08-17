import Image from "next/image";
import { appConfig } from "@/packages/configs/app.config";

export function Footer() {
  const { brand, footer } = appConfig;
  return (
    <footer className="py-20 pb-8">
      <div className="max-w-6xl mx-auto px-7">
        <div className="grid grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10 pb-14">
          <div>
            <div className="flex items-center gap-3 font-display font-bold text-lg mb-4">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>
            <p className="text-sm text-muted-foreground max-w-70 leading-relaxed">
              {footer.blurb}
            </p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <h5 className="font-mono text-xs uppercase tracking-wide text-accent mb-4">
                {col.title}
              </h5>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex justify-between items-center flex-wrap gap-4">
          <span className="font-mono text-xs text-muted-foreground">
            {footer.copyright}
          </span>
          <div className="flex gap-5">
            {footer.legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { appConfig } from "@/packages/configs/app.config";

const Header = () => {
  const { brand, nav } = appConfig;
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
      <div className="max-w-6xl mx-auto px-7 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 font-display font-bold text-lg"
        >
          <Image
            src={brand.logo}
            alt={brand.name}
            width={120}
            height={120}
            className="rounded-full"
          />
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          {nav.actions.map((action) => (
            <Button
              key={action.label}
              label={action.label}
              href={action.href}
              variant={action.variant}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;

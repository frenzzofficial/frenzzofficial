import {
  GoogleAdsSense,
  SidebarAdsSense,
} from "@/components/features/ads-sense";

import "@/styles/ui/ads-sense.css";

const DocsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <GoogleAdsSense>
      <div className="docs-content">
        <SidebarAdsSense side="left" />
        <div className="docs-content">
          {children}
          <SidebarAdsSense side="right" />
        </div>
      </div>
    </GoogleAdsSense>
  );
};

export default DocsLayout;

import Link from "next/link";
import { docsConfig } from "@/packages/configs/docs.config";

const DocsPage = () => {
  const currentRoute = docsConfig;

  return (
    <div className="docs-main">
      <div className="text-header">
        <h4>{currentRoute?.description}</h4>
      </div>
      <div className="app-grid">
        {!currentRoute && <p>No docs routes found.</p>}

        {currentRoute?.children?.map((app) => {
          // ✅ compute without touching readonly config
          const fullPath = `/${currentRoute.path}/${app.path}`.replace(
            /\/+/g,
            "/",
          );

          return (
            <Link key={app.key} href={fullPath} className="card">
              <h4>{app.title}</h4>
              <p>{app.description || "No description available."}</p>
              <span className="app-card-action">Open →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DocsPage;

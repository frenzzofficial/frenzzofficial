import fs from "node:fs";
import { docsConfig } from "@/packages/configs/docs.config";

export type DocEntry = (typeof docsConfig.children)[number];

export const getDocBySlug = (slug: string[]): DocEntry | undefined => {
  const requestedPath = slug.join("/");
  return docsConfig.children.find((doc) => doc.path === requestedPath);
};

export const getDocContent = (doc: DocEntry): string => {
  return fs.readFileSync(doc.file, "utf-8");
};

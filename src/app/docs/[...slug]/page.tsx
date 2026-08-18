import DocsTemplate from "@/components/features/docs-app/DocsTemplate";
import { docsConfig } from "@/packages/configs/docs.config";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export function generateStaticParams() {
  return docsConfig.children.map((doc) => ({
    slug: doc.path.split("/").filter(Boolean),
  }));
}

export const dynamicParams = false;

const DocsPage = async ({ params }: Props) => {
  const { slug } = await params;
  return <DocsTemplate slug={slug} />;
};

export default DocsPage;

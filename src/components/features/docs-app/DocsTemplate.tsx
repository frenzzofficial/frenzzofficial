import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { getDocBySlug, getDocContent } from "@/packages/hooks/useDocs";

interface Props {
  slug: string[];
}

const DocsTemplate = async ({ slug }: Props) => {
  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  const markdown = getDocContent(doc);

  return (
    <article className="prose">
      <Markdown>{markdown}</Markdown>
    </article>
  );
};

export default DocsTemplate;

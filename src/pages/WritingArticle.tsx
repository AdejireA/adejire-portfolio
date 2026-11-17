import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import Layout from "@/components/Layout";
import { getArticleBySlug } from "@/lib/writing";
import { renderMarkdown } from "@/lib/markdown";

const formatDate = (date: string) => {
  try {
    return format(parseISO(date), "MMMM d, yyyy");
  } catch {
    return date;
  }
};

const WritingArticle = () => {
  const { slug } = useParams();
  const article = slug ? getArticleBySlug(slug) : undefined;

  const html = useMemo(() => (article ? renderMarkdown(article.content) : ""), [article]);

  if (!article) {
    return (
      <Layout>
        <section className="page-shell py-24">
          <p className="eyebrow mb-4">Writing</p>
          <h1 className="text-4xl">Article not found.</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            This article doesn't exist, or hasn't been published yet.
          </p>
          <Link to="/writing" className="v2-text-link mt-8 inline-flex">
            Back to Writing <ArrowUpRight size={15} />
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="page-shell py-14 md:py-20">
        <Link to="/writing" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft size={14} /> All writing
        </Link>

        <p className="eyebrow mb-4 mt-8">{article.category}</p>
        <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl">{article.title}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted-foreground">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span>·</span>
          <span>{article.readingTime} min read</span>
        </div>

        {article.coverImage && (
          <div className="mt-10 aspect-[16/9] w-full overflow-hidden border border-border bg-muted">
            <img src={article.coverImage} alt={article.title} className="h-full w-full object-cover" />
          </div>
        )}

        <div
          className="prose prose-invert mt-12 max-w-2xl prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-pre:border prose-pre:border-border prose-pre:bg-card prose-img:border prose-img:border-border"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {article.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-6">
            {article.tags.map((tag) => (
              <span key={tag} className="border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-12 border-t border-border pt-8">
          <Link to="/writing" className="v2-text-link">
            <ArrowLeft size={15} /> Back to all writing
          </Link>
        </div>
      </article>
    </Layout>
  );
};

export default WritingArticle;

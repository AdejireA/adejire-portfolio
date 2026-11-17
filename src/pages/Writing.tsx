import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import Layout from "@/components/Layout";
import { publishedArticles, WRITING_CATEGORIES, type WritingCategory } from "@/lib/writing";

type Filter = "All" | WritingCategory;

const filters: Filter[] = ["All", ...WRITING_CATEGORIES];

const formatDate = (date: string) => {
  try {
    return format(parseISO(date), "MMM d, yyyy");
  } catch {
    return date;
  }
};

const Writing = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const visibleArticles = useMemo(
    () => (activeFilter === "All" ? publishedArticles : publishedArticles.filter((article) => article.category === activeFilter)),
    [activeFilter],
  );

  return (
    <Layout>
      <section className="page-shell py-14 md:py-20">
        <p className="eyebrow mb-4">Writing</p>
        <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl">Writing</h1>
        <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
          Technical ideas, research notes, experiments, and reflections from building and learning.
        </p>

        <div className="mt-10 flex flex-wrap gap-2 border-y border-border py-4">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
                activeFilter === filter
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {publishedArticles.length === 0 ? (
          <div className="mt-12 border-t border-border py-10">
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              Nothing published yet. This space will hold technical articles, research notes, project logs, and essays.
            </p>
          </div>
        ) : visibleArticles.length === 0 ? (
          <div className="mt-12 border-t border-border py-10">
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              No {activeFilter} published yet.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {visibleArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/writing/${article.slug}`}
                className="group flex flex-col border border-border transition-colors hover:border-primary/60"
              >
                {article.coverImage ? (
                  <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : null}
                <div className={`flex flex-1 flex-col p-5 ${article.coverImage ? "" : "justify-center"}`}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-primary">{article.category}</p>
                  <h2 className="mt-3 text-lg leading-snug text-foreground transition-colors group-hover:text-primary">
                    {article.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{article.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-3 font-mono text-[11px] text-muted-foreground">
                    <span>
                      {formatDate(article.date)} · {article.readingTime} min read
                    </span>
                    <ArrowUpRight size={14} className="text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Writing;

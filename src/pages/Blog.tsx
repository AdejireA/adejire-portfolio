import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";

const planned = [
  ["Just Logs", "Short, honest notes about learning ROS 2, C++, ML and debugging real project code."],
  ["Technical articles", "Explanations of concepts I’ve tested and understood well enough to teach clearly."],
  ["Project deep dives", "Design choices, evaluation methods, failed approaches and what I would change next time."],
  ["Life & growth", "Reflections on engineering school, research, leadership and building in public."],
];

const Blog = () => (
  <Layout>
    <section className="page-shell py-14 md:py-20">
      <p className="eyebrow mb-4">Writing · Just Logs</p>
      <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl">Notes from the work in progress.</h1>
      <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
        I’m building a public record of what I learn, including the parts that don’t work on the first try. I’d rather publish useful, honest notes than fill a page with articles I haven’t written.
      </p>

      <div className="mt-12 border-t border-border">
        {planned.map(([title, description], index) => (
          <article key={title} className="grid gap-3 border-b border-border py-5 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-5">
            <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="text-lg">{title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          </article>
        ))}
      </div>

      <a href="https://github.com/AdejireA" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm text-primary hover:underline">
        Follow the work on GitHub <ArrowUpRight size={15} />
      </a>
    </section>
  </Layout>
);

export default Blog;

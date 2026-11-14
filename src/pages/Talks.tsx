import Layout from "@/components/Layout";

const Talks = () => (
  <Layout>
    <section className="page-shell py-14 md:py-20">
      <p className="eyebrow mb-4">Talks & presentations</p>
      <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl">Sharing what I learn.</h1>
      <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
        This page is reserved for workshops, talks, and technical presentations with enough detail to be useful: the topic, audience, slides or recording where available.
      </p>
      <div className="mt-12 border-t border-border py-8">
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          No public talk entries have been added yet. I’ll update this page when I have a confirmed event or recording to share.
        </p>
      </div>
    </section>
  </Layout>
);

export default Talks;

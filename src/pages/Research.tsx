import Layout from "@/components/Layout";

const interests = [
  ["01", "Robotics and autonomous systems", "Control architectures, navigation, and safe interaction between autonomy and human operators."],
  ["02", "Reinforcement learning for robotics", "A long-term interest I’m building toward after strengthening the foundations in programming, ML and robotics."],
  ["03", "Embedded intelligence", "Practical sensing, edge inference and software that has to run within real hardware constraints."],
  ["04", "Agricultural robotics", "Field scouting and monitoring systems designed around the realities of smallholder agriculture."],
  ["05", "Energy systems", "Monitoring and anomaly detection for batteries and off-grid energy installations."],
];

const Research = () => (
  <Layout>
    <section className="page-shell py-14 md:py-20">
      <p className="eyebrow mb-4">Research</p>
      <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl">Questions I’m exploring.</h1>
      <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
        My current work is project-led. I’m interested in measurable, reproducible engineering experiments and in being explicit about the assumptions and limits behind a result.
      </p>

      <div className="mt-12 border-t border-border">
        {interests.map(([number, title, detail]) => (
          <article key={number} className="grid gap-3 border-b border-border py-5 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-5">
            <span className="font-mono text-xs text-muted-foreground">{number}</span>
            <div>
              <h2 className="text-lg">{title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{detail}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14 border-l-2 border-primary pl-5">
        <p className="eyebrow mb-3">Current project</p>
        <h2 className="text-xl">Dual-mode ROS 2 agricultural field scout</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          My final-year project evaluates mode arbitration between Nav2 autonomy and manual teleoperation in simulation. The current scope is deliberately focused: reliable switching, a dead-man timeout, controlled trials and clear reporting of what the simulation does and does not demonstrate.
        </p>
      </div>

      <div className="mt-14 border-t border-border pt-8">
        <p className="eyebrow mb-3">Publications</p>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          I don’t have a publication to list here yet. I’ll add research outputs when there is a public, verifiable record rather than presenting work in progress as a published result.
        </p>
      </div>
    </section>
  </Layout>
);

export default Research;

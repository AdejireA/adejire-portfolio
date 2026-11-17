import Layout from "@/components/Layout";

type LeadershipEntry = {
  id: string;
  role: string;
  organization: string;
  period: string;
  contributions: string[];
};

const leadership: LeadershipEntry[] = [
  {
    id: "ieee-chair",
    role: "Chairperson",
    organization: "IEEE FUTA Student Branch",
    period: "June 2026 — Present",
    contributions: [
      "Leading executive operations and technical strategy after the branch's reactivation, expanding activities from virtual webinars into in-person initiatives.",
      "Directed LAUNCHPAD, the branch's first physical event, drawing 85+ attendees across four technical tracks.",
      "Negotiated technical partnerships with Zindi, Data Science Nigeria, Google Developers on Campus and the AWS Student Builders Group.",
    ],
  },
  {
    id: "ieee-programs",
    role: "Programs Lead",
    organization: "IEEE FUTA Student Branch",
    period: "July 2025 — June 2026",
    contributions: [
      "Designed and ran practical workshops on robotics, embedded systems and emerging technologies, coordinating external speakers for virtual sessions.",
      "Helped rebuild engagement after the branch's reactivation — it had been inactive since 2012 with under 14 registered members — sustaining 30–50+ student attendees per event as membership grew past 300.",
    ],
  },
  {
    id: "nieees",
    role: "General Secretary",
    organization: "Nigerian Institution of Electrical and Electronics Engineers Students (NIEEES), FUTA chapter",
    period: "September 2024 — September 2025",
    contributions: [
      "Managed administrative governance and internal communications across the executive board for a 300+ member student body.",
      "Documented official proceedings, meetings and resolutions to maintain organisational transparency and accountability.",
      "Streamlined operational processes and coordinated logistics for departmental workshops and professional-development initiatives.",
    ],
  },
  {
    id: "ssrl-mentorship",
    role: "Mentorship & hardware coordination",
    organization: "Smart Systems Research Laboratory (SSRL), FUTA",
    period: "Ongoing",
    contributions: [
      "Mentors incoming research interns on embedded architecture and circuit bring-up as part of day-to-day lab work.",
      "Helped standardise diagnostic workflows across the lab so new members ramp up consistently.",
    ],
  },
];

const Leadership = () => (
  <Layout>
    <section className="page-shell py-14 md:py-20">
      <p className="eyebrow mb-4">Leadership &amp; Community</p>
      <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl">Positions, initiatives and mentorship.</h1>
      <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
        Dates and figures below are drawn from IEEE FUTA Student Branch records and corroborating correspondence.
      </p>

      <div className="mt-12 border-t border-border">
        {leadership.map((entry) => (
          <article key={entry.id} className="grid gap-3 border-b border-border py-7 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
            <p className="font-mono text-xs text-muted-foreground">{entry.period}</p>
            <div>
              <h2 className="text-lg">{entry.role} <span className="text-muted-foreground">· {entry.organization}</span></h2>
              <ul className="mt-3 max-w-3xl space-y-2 text-sm leading-6 text-muted-foreground">
                {entry.contributions.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  </Layout>
);

export default Leadership;

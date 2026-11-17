import Layout from "@/components/Layout";
import { useSeo } from "@/hooks/useSeo";
import awsScdPoster from "@/assets/aws-student-community-day-akure-2026-poster.jpg";
import ieeeUnibenPoster from "@/assets/ieee-uniben-research-writing-bootcamp-poster.jpg";

type TalkEntry = {
  id: string;
  date: string;
  role: string;
  event: string;
  title?: string;
  organiser?: string;
  location?: string;
  description: string;
  details?: string[];
  poster?: string;
  posterAlt?: string;
};

const talks: TalkEntry[] = [
  {
    id: "aws-scd-akure-2026",
    date: "2026",
    role: "Featured Panelist",
    event: "AWS Student Community Day Akure 2026 — “Building Tomorrow Today”",
    description:
      "Featured at AWS Student Community Day Akure 2026 to share his experience building and growing student technology communities, including his leadership of the IEEE FUTA Student Branch and work at the Smart Systems Research Laboratory.",
    details: [
      "IEEE FUTA Student Branch leadership",
      "Community-building and student engagement",
      "Engineering research and collaboration",
      "AWS Student Community Day, Akure, 2026",
    ],
    poster: awsScdPoster,
    posterAlt: "AWS Student Community Day Akure 2026 speaker card for Adejire Adegite, “Building Tomorrow Today”",
  },
  {
    id: "ieee-uniben-research-writing-bootcamp",
    date: "September 4, 2026",
    role: "Speaker",
    event: "IEEE University of Benin Research Writing Bootcamp",
    title: "Citations, IEEE Referencing & Research Ethics",
    organiser: "IEEE University of Benin Student Branch",
    description:
      "A session on responsible academic writing, covering when and how to cite sources, IEEE referencing conventions, and the importance of research integrity.",
    poster: ieeeUnibenPoster,
    posterAlt: "Title slide for “Citations, IEEE Referencing & Research Ethics,” presented by Adejire Adegite",
  },
  {
    id: "nextgen-innovation-challenge-2026",
    date: "2026",
    role: "Finalist / Project Presenter",
    event: "NextGen Innovation Challenge 2026 — International Grand Finale",
    location: "London, United Kingdom",
    description:
      "Presented TerraSync, an AI-enabled agricultural decision-support platform, at the international grand finale of the NextGen Innovation Challenge in London.",
    details: ["Project: TerraSync", "NextGen Innovation Challenge 2026, International Grand Finale", "London, United Kingdom"],
  },
];

const Talks = () => {
  useSeo({
    title: "Talks & Events",
    description: "Workshops, panels, and technical sessions with enough detail to be useful: the occasion, the role, and what was covered.",
    path: "/talks",
  });

  return (
  <Layout>
    <section className="page-shell py-14 md:py-20">
      <p className="eyebrow mb-4">Talks & Events</p>
      <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl">Sharing what I learn.</h1>
      <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
        Workshops, panels, and technical sessions with enough detail to be useful: the occasion, the role, and what was covered.
      </p>

      <div className="mt-12 border-t border-border">
        {talks.map((talk) => (
          <article
            key={talk.id}
            className={`grid gap-8 border-b border-border py-10 ${
              talk.poster ? "md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12" : ""
            }`}
          >
            {talk.poster && (
              <img
                src={talk.poster}
                alt={talk.posterAlt}
                className="w-full rounded-sm border border-border object-contain"
                loading="lazy"
              />
            )}
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                <span>{talk.date}</span>
                <span>·</span>
                <span className="text-primary">{talk.role}</span>
                {talk.location && (
                  <>
                    <span>·</span>
                    <span>{talk.location}</span>
                  </>
                )}
              </div>
              <h2 className="mt-3 text-xl">{talk.event}</h2>
              {talk.title && (
                <p className="mt-2 text-sm font-medium text-foreground">{talk.title}</p>
              )}
              {talk.organiser && (
                <p className="mt-1 text-xs text-muted-foreground">Organised by {talk.organiser}</p>
              )}
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">{talk.description}</p>
              {talk.details && (
                <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                  {talk.details.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  </Layout>
  );
};

export default Talks;

import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";

type AwardEntry = {
  id: string;
  title: string;
  year: string;
  organizer: string;
  event: string;
  description: string;
  project: string;
  verificationLabel: string;
  verificationHref: string;
};

const awards: AwardEntry[] = [
  {
    id: "nextgen-innovation-challenge-2026",
    title: "International Grand Finalist",
    year: "2026",
    organizer: "National Board for Technology Incubation (NBTI), in partnership with UKALD Group",
    event: "NextGen Innovation Challenge 2026 — International Grand Finale, London, UK",
    description:
      "Selected to present TerraSync, an AI-enabled agricultural decision-support platform built around the everyday decisions Nigerian smallholder farmers make, at the international grand finale of the NextGen Innovation Challenge in London. Received a finalist plaque and certificate of recognition.",
    project: "TerraSync",
    verificationLabel: "View announcement",
    verificationHref: "https://www.linkedin.com/posts/adegite-adejire_terrasync-nextgeninnovationchallenge-agritech-ugcPost-7522274533232357376-ZUYf/",
  },
  {
    id: "ieee-ies-genai-hackathon-2026",
    title: "Winning Team — Team Zenith",
    year: "2026",
    organizer: "IEEE Industrial Electronics Society (IES)",
    event: "IEEE IES Generative AI Hackathon Challenge 2026",
    description:
      "Named among the winning teams of the IEEE IES Generative AI Hackathon Challenge 2026, which drew a record 574 submissions from 55 countries. As Team Zenith, with Oluwaferanmi Oladepo and Nunsi Shiaki, developed a multimodal anomaly-detection approach using cross-modal attention and latent diffusion for electro-mechanical fault detection. Winning teams were invited to present peer-reviewed research at IEEE IRAI 2026.",
    project: "Label-free electro-mechanical fault detection research",
    verificationLabel: "View announcement",
    verificationHref: "https://www.linkedin.com/posts/ieee-ies_gen-ai-hackathon-2026-winners-activity-7472909746396831745-oj31",
  },
  {
    id: "prompt-to-screen-2025",
    title: "Winner — 1st Storytelling Edition",
    year: "2025",
    organizer: "Generative AI Network (GAIN), an Instig Labs initiative, in partnership with Falcon Aero",
    event: "Prompt to Screen AI Storytelling Competition",
    description:
      "Recognized as a winner of the 1st Storytelling edition of Prompt to Screen, credited alongside Nunsi Shiaki for an AI-assisted short film inspired by the Kuteb people of Taraba State.",
    project: "AI-assisted storytelling short film",
    verificationLabel: "View announcement",
    verificationHref: "https://www.linkedin.com/posts/genainetwork-prompttoscreen-aiinafrica-ugcPost-7447256680897306624-gtYJ/",
  },
];

const years = Array.from(new Set(awards.map((award) => award.year))).sort((a, b) => Number(b) - Number(a));

const Awards = () => (
  <Layout>
    <section className="page-shell py-14 md:py-20">
      <p className="eyebrow mb-4">Awards & Recognition</p>
      <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl">Recognition along the way.</h1>
      <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
        Competition results and selections tied to specific projects and teams, each with a source to verify it.
      </p>

      {years.map((year) => (
        <div key={year} className="mt-14 first:mt-12">
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-primary">{year}</p>
          <div className="mt-6 border-t border-border">
            {awards
              .filter((award) => award.year === year)
              .map((award) => (
                <article key={award.id} className="grid gap-3 border-b border-border py-8 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-8">
                  <p className="font-mono text-xs text-muted-foreground">{award.organizer}</p>
                  <div>
                    <h2 className="text-lg">{award.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{award.event}</p>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">{award.description}</p>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                      Project: <span className="text-foreground">{award.project}</span>
                    </p>
                    <a
                      href={award.verificationHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="v2-text-link mt-5 inline-flex"
                    >
                      {award.verificationLabel} <ArrowUpRight size={15} />
                    </a>
                  </div>
                </article>
              ))}
          </div>
        </div>
      ))}
    </section>
  </Layout>
);

export default Awards;

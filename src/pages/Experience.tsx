import Layout from "@/components/Layout";
import { useSeo } from "@/hooks/useSeo";

type ExperienceEntry = {
  id: string;
  role: string;
  organization: string;
  period: string;
  contributions: string[];
};

const experience: ExperienceEntry[] = [
  {
    id: "ssrl",
    role: "Lab Manager & Hardware Lead",
    organization: "Smart Systems Research Laboratory (SSRL), Federal University of Technology, Akure",
    period: "March 2024 — Present",
    contributions: [
      "Prototyped and debugged multi-sensor IoT systems, writing firmware to interface with microcontrollers over I2C, SPI, UART and MQTT.",
      "Directed hardware testbeds for edge-AI research, including the work behind an electromechanical fault-detection paper accepted and presented at IEEE IRAI 2026 (Melbourne).",
      "Mentored incoming interns on embedded architecture, circuit bring-up and sensor pipelines, and standardised diagnostic workflows across the lab.",
    ],
  },
  {
    id: "fidtech",
    role: "Electrical Engineering Intern",
    organization: "FIDTECH Global Engineering Resource Ltd, Ikeja, Lagos",
    period: "June 2025 — December 2025",
    contributions: [
      "Participated in the rehabilitation of two 33kV power supply systems.",
      "Worked on-site with a project manager and engineering team on electrical infrastructure projects, including the establishment of an injection substation.",
      "Supported field activities in power distribution systems and substation setup.",
    ],
  },
  {
    id: "ath",
    role: "Resources and Partnerships",
    organization: "Akure Tech Hub — Mechatronics Community",
    period: "September 2024 — May 2026",
    contributions: [
      "Developed and distributed content to simplify complex robotics and mechatronics concepts for the community.",
      "Built partnerships with other hubs, labs, departmental leaders and institutions to support knowledge exchange and opportunities for members.",
    ],
  },
];

const Experience = () => {
  useSeo({
    title: "Experience",
    description: "Hardware, firmware and research support work, alongside a first internship outside the university.",
    path: "/experience",
  });

  return (
  <Layout>
    <section className="page-shell py-14 md:py-20">
      <p className="eyebrow mb-4">Experience</p>
      <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl">Technical work and research responsibilities.</h1>
      <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
        Hardware, firmware and research support work, alongside a first internship outside the university.
      </p>

      <div className="mt-12 border-t border-border">
        {experience.map((entry) => (
          <article key={entry.id} className="grid gap-3 border-b border-border py-7 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-8">
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
};

export default Experience;

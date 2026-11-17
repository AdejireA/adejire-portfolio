import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useSeo } from "@/hooks/useSeo";

type ResearchEntry = {
  id: string;
  question: string;
  title: string;
  status: string;
  contribution: string;
  methodology: string;
  findings: string;
  link?: { label: string; to: string; external?: boolean };
};

const researchEntries: ResearchEntry[] = [
  {
    id: "label-free-fault-detection",
    question: "Does multimodal sensor fusion actually drive anomaly-detection performance, or does a stronger generative model account for the gain on its own?",
    title: "Label-Free Detection of Incipient Electro-Mechanical Faults via Cross-Modal Attention and Latent Diffusion",
    status: "Co-authored with Oluwaferanmi Oladepo and Nunsi Shiaki at the Federal University of Technology, Akure. Accepted and presented at IEEE IRAI 2026 (IEEE International Conference on Responsible Artificial Intelligence). The research grew out of the IEEE Industrial Electronics Society Generative AI Hackathon, with contributions associated with the Smart Systems Research Laboratory (SSRL), FUTA, and Adejire's work on it carried out as an Independent AI/ML Researcher at Machine Learning Collective, Africa.",
    contribution: "Contributed to a label-free, multimodal bearing-fault detection pipeline trained only on healthy vibration and stator-current data, built specifically to isolate whether cross-modal fusion or generative model capacity was responsible for detection performance.",
    methodology: "Separate residual 1D-CNN encoders compress 100 ms vibration and current windows into 128-dimensional latents. A bidirectional cross-modal attention module fuses these into a shared latent space, trained end-to-end on healthy windows only from the Paderborn KAt bearing dataset. A latent diffusion model is trained afterwards on the frozen latents purely for interpretability; a Mahalanobis distance in the shared latent space is the anomaly score used at inference.",
    findings: "The fused representation reached AUROC 0.975, F1 0.950 and 92.2% recall on held-out Paderborn evaluation windows, against 0.920 AUROC for pre-fusion and unimodal baselines and 0.642 for the diffusion model alone — isolating cross-modal attention, not generative complexity, as the source of the gain. The same frozen pipeline transferred zero-shot to the CWRU bearing dataset (different sensors, no retraining) with AUROC 1.000. Reported limitations: validated on a single lab dataset plus one transfer dataset, and the false-alarm rate still varies by operating condition.",
  },
  {
    id: "agricultural-field-scout",
    question: "Can a single ROS 2 control stack hand over predictably between autonomous navigation and a human operator, then stop reliably if its command stream disappears?",
    title: "ROS 2 Agricultural Robot: Control and Fail-Safe Evaluation",
    status: "Final-year project, simulation only.",
    contribution: "Built the ROS 2 command-arbitration node and a repeatable Gazebo experiment harness, combining Nav2 autonomy, AMCL localisation, scripted manual interventions, and dead-man-timeout command-loss testing.",
    methodology: "60 simulation trials across three conditions — reference autonomy, manual intervention, and command loss — in a Gazebo Harmonic crop-row environment, with results logged and analysed offline from CSV trial data.",
    findings: "Mean command-loss-to-physical-stop time of 0.553 seconds across the 20 command-loss trials. The system remains simulation-only and has not been field-deployed or safety-certified.",
    link: { label: "Read the full case study", to: "/projects/agricultural-field-scout" },
  },
  {
    id: "battery-anomaly-edge",
    question: "Can unsupervised anomaly detection flag early battery-health irregularities without labelled faults, on hardware constrained enough for field deployment?",
    title: "Battery Anomaly Detection at the Edge",
    status: "Independent project, synthetic anomaly injection.",
    contribution: "Reworked an initial absolute-feature Isolation Forest approach into a history-relative scoring pipeline designed to resist drift as cells age.",
    methodology: "Evaluated across NASA Ames and CALCE ageing datasets, then replayed the frozen inference pipeline on Raspberry Pi 3B+ hardware to check it runs within realistic compute constraints.",
    findings: "Documents the original false-positive problem, the redesigned relative-feature representation, and test-set plus on-device inference results. Synthetic anomaly injection is not equivalent to confirmed field faults, and the results do not establish deployment readiness.",
    link: { label: "Read the full case study", to: "/projects/battery-anomaly-edge" },
  },
];

const researchInterests = [
  ["01", "Agricultural Robotics", "Autonomous scouting, monitoring, and navigation systems designed around the practical challenges of agricultural environments."],
  ["02", "Edge & Embedded Intelligence", "Machine learning, sensing, and intelligent decision-making on resource-constrained hardware, including applications in energy monitoring."],
  ["03", "Robotics & Autonomous Systems", "Robot navigation, localisation, control architectures, and safe interaction between autonomous systems and human operators."],
  ["04", "Reinforcement Learning for Robotics", "Exploring how learning-based methods can help robots make decisions and adapt to changing environments. A direction I'm building toward as I strengthen my foundations."],
];

const Research = () => {
  useSeo({
    title: "Research & Exploration",
    description: "Research at the intersection of robotics, intelligent control, embedded systems, and machine learning, with a focus on reliable autonomous systems under real-world constraints.",
    path: "/research",
  });

  return (
  <Layout>
    <section className="page-shell py-14 md:py-20">
      <p className="eyebrow mb-4">Research</p>
      <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl">Research &amp; Exploration</h1>
      <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
        My research interests lie at the intersection of robotics, intelligent control, embedded systems, and machine learning. I'm particularly interested in how autonomous systems can remain reliable when operating conditions, computing resources, and available information are limited.
      </p>

      <h2 className="mt-16 text-xl">Research work</h2>
      <div className="mt-10 border-t border-border">
        {researchEntries.map((entry, index) => (
          <article key={entry.id} className="grid gap-5 border-b border-border py-9 sm:grid-cols-[44px_minmax(0,1fr)]">
            <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p className="mb-2 font-mono text-xs leading-5 text-foreground/80">{entry.question}</p>
              <h3 className="text-xl font-medium">{entry.title}</h3>
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">{entry.status}</p>

              <div className="mt-5 grid gap-5 md:grid-cols-3">
                <div>
                  <p className="eyebrow mb-2 text-[10px]">Contribution</p>
                  <p className="text-sm leading-6 text-muted-foreground">{entry.contribution}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2 text-[10px]">Methodology</p>
                  <p className="text-sm leading-6 text-muted-foreground">{entry.methodology}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2 text-[10px]">Findings &amp; status</p>
                  <p className="text-sm leading-6 text-muted-foreground">{entry.findings}</p>
                </div>
              </div>

              {entry.link && (
                <Link to={entry.link.to} className="v2-text-link mt-6 inline-flex">
                  {entry.link.label} <ArrowUpRight size={15} />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16">
        <p className="eyebrow mb-2">Research Interests</p>
        <h2 className="text-xl">Questions I'm exploring.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Areas I'm interested in developing through further research.
        </p>
        <div className="mt-8 border-t border-border">
          {researchInterests.map(([number, title, detail]) => (
            <article key={number} className="grid gap-3 border-b border-border py-5 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-5">
              <span className="font-mono text-xs text-muted-foreground">{number}</span>
              <div>
                <h3 className="text-lg">{title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </Layout>
  );
};

export default Research;

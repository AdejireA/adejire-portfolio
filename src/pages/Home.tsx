import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import Layout from "@/components/Layout";
import portrait from "@/assets/adejire-portrait.jpeg";

const socials = [
  { icon: Github, href: "https://github.com/AdejireA", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/adegite-adejire", label: "LinkedIn" },
  { icon: Mail, href: "mailto:adejireadegite@gmail.com", label: "Email" },
];

const Home = () => (
  <Layout>
    <section className="page-shell grid min-h-[calc(88vh-68px)] items-center gap-12 py-16 md:grid-cols-[minmax(0,1.3fr)_minmax(260px,0.7fr)] md:gap-16 md:py-20">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <p className="eyebrow mb-6">Electrical & Electronics Engineering · FUTA</p>
        <h1 className="max-w-3xl text-balance text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
          Adejire <span className="text-primary">Adegite.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/85 md:text-xl">
          I’m an engineering student learning to build reliable robotic and embedded systems, from the sensors and firmware to the software that makes a machine move.
        </p>
        <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
          My current work spans ROS 2 robot simulation, edge-based battery anomaly detection, and energy monitoring. I’m strengthening my foundations in C++, robotics software, and machine learning while documenting what I learn.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link to="/projects" className="inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-medium text-foreground transition-colors hover:text-primary">
            Explore projects <ArrowUpRight size={15} />
          </Link>
          <Link to="/writing" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
            Read my logs <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="mt-9 flex items-center gap-5">
          {socials.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} aria-label={label} title={label} target={label === "Email" ? undefined : "_blank"} rel={label === "Email" ? undefined : "noopener noreferrer"} className="text-muted-foreground transition-colors hover:text-primary">
              <Icon size={18} strokeWidth={1.7} />
            </a>
          ))}
          <span className="h-4 border-l border-border" />
          <span className="font-mono text-xs text-muted-foreground">Akure, Nigeria</span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="relative mx-auto w-full max-w-sm md:mx-0 md:justify-self-end">
        <div className="absolute -bottom-3 -left-3 h-full w-full border border-primary/70" />
        <img src={portrait} alt="Adejire Adegite" className="relative aspect-[4/5] w-full object-cover object-top grayscale-[12%]" />
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Build · test · learn · repeat</p>
      </motion.div>
    </section>

    <section className="section-rule">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[180px_1fr] md:gap-14">
        <p className="eyebrow pt-1">What I’m focused on</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-lg">Robotics & autonomy</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">ROS 2, simulation, navigation and safe handover between autonomous control and a human operator.</p>
          </div>
          <div>
            <h2 className="text-lg">Embedded systems</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Microcontrollers, sensor integration, telemetry and systems that have to work beyond a notebook demo.</p>
          </div>
          <div>
            <h2 className="text-lg">Applied ML</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Learning the fundamentals through measurable projects, with a long-term interest in learning-based robotics.</p>
          </div>
          <div>
            <h2 className="text-lg">Engineering in context</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Exploring practical systems for energy, agriculture and other problems where reliability and cost matter.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="page-shell py-14 md:py-16">
      <div className="grid gap-5 md:grid-cols-[180px_1fr] md:gap-14">
        <p className="eyebrow pt-1">A note on this site</p>
        <div>
          <p className="max-w-3xl text-foreground/85 leading-7">
            This is a working record, not a claim that I already know everything I’m interested in. I want to understand the systems I build well enough to explain the design decisions, debug them when they fail, and evaluate whether they actually work.
          </p>
          <Link to="/about" className="mt-5 inline-flex items-center gap-2 text-sm text-primary hover:underline">
            More about me <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Home;

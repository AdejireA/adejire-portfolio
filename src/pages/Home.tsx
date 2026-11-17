import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail, MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import portrait from "@/assets/adejire-portrait.jpeg";
import { projects } from "@/data/projects";
import { useSeo } from "@/hooks/useSeo";

const links = [
  { label: "GitHub", href: "https://github.com/AdejireA", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adegite-adejire", icon: Linkedin },
  { label: "Email", href: "mailto:adejireadegite@gmail.com", icon: Mail },
];

export default function Home() {
  useSeo({
    title: "Robotics & Embedded Systems",
    description: "Robotics, embedded systems, and machine learning, from experiments to working systems.",
    path: "/",
  });
  return <Layout>
    <section className="phase1-hero page-shell" aria-labelledby="hero-title">
      <div className="phase1-hero-copy">
        <p className="hero-name">ADEJIRE ADEGITE</p>
        <p className="hero-discipline">ROBOTICS / EMBEDDED SYSTEMS / EDGE INTELLIGENCE</p>
        <h1 id="hero-title">Building towards intelligent machines that work in the <em>real world.</em></h1>
        <p className="hero-intro">Robotics, embedded systems, and machine learning, from experiments to working systems.</p>
        <div className="v2-hero-actions">
          <Link to="/projects" className="v2-button-primary">Explore My Work <ArrowRight size={17} aria-hidden="true" /></Link>
          <Link to="/about" className="hero-secondary">About Me <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <figure className="hero-portrait">
        <img src={portrait} alt="Adejire Adegite" fetchPriority="high" />
        <figcaption><span>ADEJIRE ADEGITE</span><span>AKURE, NIGERIA</span></figcaption>
      </figure>
    </section>

    <section className="v2-work-section" id="work"><div className="page-shell">
      <div className="v2-section-heading"><div><p className="v2-overline">01 / SELECTED WORK</p><h2>Engineering, <i>in practice.</i></h2></div><Link to="/projects" className="v2-text-link">All projects <ArrowUpRight size={16}/></Link></div>
      <div className="v2-project-list">{projects.map((project,index)=><Link to={`/projects/${project.slug}`} className={`v2-project${project.image ? "" : " !grid-cols-1"}`} key={project.slug}>
        {project.image && <div className="v2-project-media"><img src={project.image} alt={project.imageAlt} loading="lazy"/><span className="v2-image-corner">0{index+1} / 03</span></div>}
        <div className="v2-project-copy"><div className="v2-project-meta">{project.field} <span>{project.year}</span></div><h3>{project.title}</h3><p>{project.summary}</p><div className="v2-project-bottom"><span>{project.stack.slice(0,3).join(" · ")}</span><span className="v2-project-arrow"><MoveUpRight size={19}/></span></div></div>
      </Link>)}</div>
    </div></section>

    <section className="v2-research-preview"><div className="page-shell v2-research-preview-inner">
      <p className="v2-overline">02 / RESEARCH &amp; EXPLORATION</p>
      <div className="v2-research-preview-body">
        <h2>Research with <i>open questions.</i></h2>
        <p>My research interests lie at the intersection of robotics, intelligent control, embedded systems, and machine learning &mdash; particularly how autonomous systems stay reliable when operating conditions, computing resources, and available information are limited.</p>
        <Link to="/research" className="v2-text-link">Read research <ArrowUpRight size={16}/></Link>
      </div>
    </div></section>

    <section className="v2-research-preview"><div className="page-shell v2-research-preview-inner">
      <p className="v2-overline">03 / EXPERIENCE &amp; LEADERSHIP</p>
      <div className="v2-research-preview-body">
        <h2>Built in <i>labs and communities.</i></h2>
        <p>Hardware and research work at FUTA's Smart Systems Research Laboratory, alongside leading the IEEE FUTA Student Branch through its reactivation, an electrical engineering internship, and mechatronics community work.</p>
        <div className="v2-preview-links">
          <Link to="/experience" className="v2-text-link">SSRL &amp; technical experience <ArrowUpRight size={16}/></Link>
          <Link to="/leadership" className="v2-text-link">IEEE FUTA &amp; leadership <ArrowUpRight size={16}/></Link>
        </div>
      </div>
    </div></section>

    <section className="page-shell v2-thinking"><div><p className="v2-overline">04 / AREAS OF INTEREST</p><h2>Curiosity with<br/><i>an engineering method.</i></h2></div><div className="v2-interest-list">{[
      ["01", "Robotics & autonomy", "Navigation, human-in-the-loop control, localisation, and safety behaviour."],
      ["02", "Embedded & cyber-physical systems", "Sensing, firmware, telemetry, and hardware-software integration."],
      ["03", "Edge intelligence", "Machine learning methods evaluated under real compute constraints."],
    ].map(([num,title,description])=><div className="v2-interest" key={num}><span>{num}</span><div><h3>{title}</h3><p>{description}</p></div><ArrowUpRight size={16}/></div>)}</div></section>

    <section className="v2-note"><div className="page-shell v2-note-inner"><p className="v2-overline">05 / THE APPROACH</p><blockquote>“A system isn't finished when it runs. I want to know <em>how it behaves when conditions change.</em>”</blockquote><Link to="/research" className="v2-text-link">Research and experiments <ArrowUpRight size={16}/></Link></div></section>

    <section className="page-shell v2-contact-strip"><div><p className="v2-overline">06 / CONNECT</p><h2>Let's talk about <i>what's next.</i></h2><p>Research collaborations, engineering projects, and thoughtful conversations.</p></div><div className="v2-socials">{links.map(({label,href,icon:Icon})=><a key={label} href={href} target={label==="Email"?undefined:"_blank"} rel={label==="Email"?undefined:"noopener noreferrer"}><Icon size={18}/>{label}<ArrowUpRight size={14}/></a>)}</div></section>
  </Layout>;
}

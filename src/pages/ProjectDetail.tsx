import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Layout from "@/components/Layout";
import { projects } from "@/data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(item => item.slug === slug);
  if (!project) return <Layout><main className="page-shell py-32"><h1 className="text-4xl">Project not found.</h1><Link className="v2-text-link mt-8 inline-flex" to="/projects">Back to projects <ArrowUpRight size={16}/></Link></main></Layout>;
  return <Layout><main className="page-shell v2-case-study">
    <Link to="/projects" className="v2-back"><ArrowLeft size={16}/> ALL PROJECTS</Link>
    <p className="v2-overline">{project.field} / {project.year}</p><h1>{project.caseStudyTitle || project.title}<span className="v2-title-dot">.</span></h1><p className="v2-case-lead">{project.summary}</p>
    {project.image && <div className="v2-case-cover"><img src={project.image} alt={project.imageAlt}/><span>01 / PROJECT EVIDENCE</span></div>}
    <div className="v2-case-grid"><aside><p className="v2-overline">PROJECT PROFILE</p><div className="v2-case-tags">{project.stack.map(item=><span key={item}>{item}</span>)}</div><a className="v2-button-primary" href={project.repo} target="_blank" rel="noopener noreferrer"><Github size={17}/> View source code <ArrowUpRight size={17}/></a></aside><div className="v2-case-body">
      <section><span>01 / PROBLEM</span><h2>The challenge</h2><p>{project.challenge}</p></section>
      <section><span>02 / ENGINEERING</span><h2>What I built</h2><p>{project.contribution}</p></section>
      {project.navigationImage && <section aria-labelledby="navigation-heading"><h2 id="navigation-heading">Navigation</h2><figure className="v2-case-secondary"><img src={project.navigationImage} alt={project.navigationAlt} loading="lazy"/><figcaption>Autonomous scouting route / waypoint diagram · Source: final evaluation figures</figcaption></figure></section>}
      <section><span>03 / EVIDENCE</span><h2>Evaluation & results</h2><p>{project.outcome}</p>{project.resultsSource && <a href={project.resultsSource} target="_blank" rel="noopener noreferrer" className="v2-text-link mt-4">View final trial results <ArrowUpRight size={16} aria-hidden="true"/></a>}</section>
      <section><span>04 / HONEST LIMITS</span><h2>What this doesn't prove</h2><p>{project.limitations}</p></section>
    </div></div>
    {project.secondaryImage && <figure className="v2-case-secondary"><img src={project.secondaryImage} alt={project.secondaryAlt||"Supporting project figure"}/><figcaption>02 / SUPPORTING EVIDENCE · SOURCE: PROJECT REPOSITORY</figcaption></figure>}
    <div className="v2-case-next"><Link to="/projects" className="v2-text-link"><ArrowLeft size={16}/> Back to all projects</Link></div>
  </main></Layout>;
}

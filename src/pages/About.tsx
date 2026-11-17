import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const About = () => (
  <Layout>
    <section className="page-shell py-14 md:py-20">
      <p className="eyebrow mb-4">About</p>
      <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl">An engineer in training, learning by building.</h1>

      <div className="mt-8 grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(220px,0.8fr)] md:gap-20">
        <div className="space-y-5 text-[15px] leading-7 text-muted-foreground">
          <p>
            I’m Adejire Adegite, an Electrical and Electronics Engineering student at the Federal University of Technology, Akure. I’m interested in the point where hardware, control, and software meet: embedded systems, mobile robots, and autonomous machines.
          </p>
          <p>
            I started with hands-on builds such as line-following robots, home automation and a small unmanned ground vehicle. More recently, I’ve been working on ROS 2 simulation and edge-based battery anomaly detection, where I’m learning to evaluate systems with measurements rather than relying on a demo that merely looks convincing.
          </p>
          <p>
            I’m also working to close gaps in my own foundations. I want to become comfortable writing and debugging C++, understand machine learning beyond using a library, and be able to explain every important design decision in the projects I present.
          </p>
          <p>
            Long term, I’m working toward robotics and autonomous-systems engineering, with a research interest in reinforcement learning for robotics. Agriculture and energy are especially interesting application areas because they connect technical decisions to real constraints around cost, access and reliability.
          </p>
        </div>

        <aside className="h-fit border-l border-border pl-5">
          <p className="eyebrow mb-5">At a glance</p>
          <dl className="space-y-5 text-sm">
            <div><dt className="text-muted-foreground">Education</dt><dd className="mt-1 text-foreground">B.Eng. Electrical & Electronics Engineering</dd></div>
            <div><dt className="text-muted-foreground">University</dt><dd className="mt-1 text-foreground">Federal University of Technology, Akure</dd></div>
            <div><dt className="text-muted-foreground">Based in</dt><dd className="mt-1 text-foreground">Akure, Nigeria</dd></div>
            <div><dt className="text-muted-foreground">Current learning</dt><dd className="mt-1 text-foreground">C++ · ROS 2 · Machine learning foundations</dd></div>
          </dl>
        </aside>
      </div>

      <div className="mt-16 border-t border-border pt-10">
        <p className="eyebrow mb-4">Experience &amp; leadership</p>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Technical work and research responsibilities are documented on the Experience page. Leadership positions and community initiatives are on the Leadership &amp; Community page.
        </p>
        <div className="mt-5 flex flex-wrap gap-6">
          <Link to="/experience" className="v2-text-link">Experience <ArrowUpRight size={15}/></Link>
          <Link to="/leadership" className="v2-text-link">Leadership &amp; Community <ArrowUpRight size={15}/></Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;

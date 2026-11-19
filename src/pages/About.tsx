import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useSeo } from "@/hooks/useSeo";

const exploreLinks = [
  { label: "Projects", to: "/projects" },
  { label: "Research", to: "/research" },
  { label: "Experience", to: "/experience" },
  { label: "Leadership & Community", to: "/leadership" },
];

const About = () => {
  useSeo({
    title: "About",
    description: "Adejire Adegite is an Electrical and Electronics Engineering student at the Federal University of Technology, Akure, with interests in robotics, embedded systems, autonomous systems, and machine learning.",
    path: "/about",
  });

  return (
  <Layout>
    <section className="page-shell pb-10 pt-14 md:pb-14 md:pt-20">
      <p className="eyebrow mb-4">About</p>
      <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl">About Adejire</h1>

      <div className="mt-8 grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(220px,0.8fr)] md:gap-20">
        <div className="space-y-5 text-[15px] leading-7 text-muted-foreground">
          <p>
            I am Adejire Adegite, an Electrical and Electronics Engineering student at the Federal University of Technology, Akure, with interests in robotics, embedded systems, autonomous systems, and machine learning.
          </p>
          <p>
            I enjoy building intelligent systems that connect hardware and software to solve real-world problems. My experience includes developing robots, embedded monitoring systems, and edge AI applications, with a growing focus on reliable autonomous systems for agriculture and energy.
          </p>
          <p>
            Beyond engineering, I am involved in research and hardware development at the Smart Systems Research Laboratory and serve as Chair of the IEEE FUTA Student Branch. I enjoy leading technical initiatives, collaborating with other engineers, and creating opportunities for students to learn, build, and grow.
          </p>
        </div>

        <aside className="h-fit space-y-10 border-l border-border pl-5">
          <div>
            <p className="eyebrow mb-5">At a glance</p>
            <dl className="space-y-5 text-sm">
              <div><dt className="text-muted-foreground">Education</dt><dd className="mt-1 text-foreground">B.Eng. Electrical & Electronics Engineering (in view)</dd></div>
              <div><dt className="text-muted-foreground">University</dt><dd className="mt-1 text-foreground">Federal University of Technology, Akure</dd></div>
              <div><dt className="text-muted-foreground">Based in</dt><dd className="mt-1 text-foreground">Akure, Nigeria</dd></div>
              <div><dt className="text-muted-foreground">Currently exploring</dt><dd className="mt-1 text-foreground">C++ · ROS 2 · Machine learning foundations</dd></div>
            </dl>
          </div>

          <div>
            <p className="eyebrow mb-5">Explore more</p>
            <div className="flex flex-col gap-4">
              {exploreLinks.map(({ label, to }) => (
                <Link key={to} to={to} className="v2-text-link">{label} <ArrowUpRight size={15} /></Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  </Layout>
  );
};

export default About;

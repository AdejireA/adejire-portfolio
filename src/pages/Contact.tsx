import { ArrowUpRight, Github, Linkedin, Mail, BookOpen, Hash, MapPin } from "lucide-react";
import Layout from "@/components/Layout";

const contactLinks = [
  { icon: Mail, label: "Email", value: "adejireadegite@gmail.com", href: "mailto:adejireadegite@gmail.com" },
  { icon: Github, label: "GitHub", value: "AdejireA", href: "https://github.com/AdejireA" },
  { icon: Linkedin, label: "LinkedIn", value: "adegite-adejire", href: "https://www.linkedin.com/in/adegite-adejire" },
  { icon: BookOpen, label: "Medium", value: "@AdejireA", href: "https://medium.com/@AdejireA" },
  { icon: Hash, label: "Hashnode", value: "AdejireA", href: "https://hashnode.com/@AdejireA" },
];

const Contact = () => (
  <Layout>
    <section className="page-shell py-14 md:py-20">
      <p className="eyebrow mb-4">Contact</p>
      <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl">Let’s talk about engineering.</h1>
      <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
        I’m open to thoughtful conversations about robotics, embedded systems, research opportunities and practical engineering projects.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.7fr)] md:gap-20">
        <div className="border-t border-border">
          {contactLinks.map(({ icon: Icon, label, value, href }) => (
            <a key={label} href={href} target={label === "Email" ? undefined : "_blank"} rel={label === "Email" ? undefined : "noopener noreferrer"} className="flex items-center justify-between gap-4 border-b border-border py-5 group">
              <span className="flex items-center gap-4">
                <Icon size={17} strokeWidth={1.7} className="text-primary" />
                <span>
                  <span className="block text-sm text-foreground">{label}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{value}</span>
                </span>
              </span>
              <ArrowUpRight size={15} className="text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
          ))}
        </div>
        <aside className="h-fit border-l border-border pl-5">
          <p className="eyebrow mb-4">Location</p>
          <p className="flex items-center gap-2 text-sm text-foreground"><MapPin size={15} className="text-primary" /> Akure, Nigeria</p>
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            Email is the best way to reach me. I try to keep this page simple and direct, with no contact form that silently depends on a service behind the scenes.
          </p>
        </aside>
      </div>
    </section>
  </Layout>
);

export default Contact;

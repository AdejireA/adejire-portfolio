import { Github, Linkedin, Mail, BookOpen, Hash } from "lucide-react";

const links = [
  { icon: Github, href: "https://github.com/AdejireA", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/adegite-adejire", label: "LinkedIn" },
  { icon: BookOpen, href: "https://medium.com/@adejireadegite", label: "Medium" },
  { icon: Hash, href: "https://hashnode.com/@AdejireA", label: "Hashnode" },
  { icon: Mail, href: "mailto:adejireadegite@gmail.com", label: "Email" },
];

const Footer = () => (
  <footer className="section-rule mt-20">
    <div className="page-shell flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Adejire Adegite. Built in public, one iteration at a time.</p>
      <div className="flex items-center gap-5">
        {links.map(({ icon: Icon, href, label }) => (
          <a key={label} href={href} target={label === "Email" ? undefined : "_blank"} rel={label === "Email" ? undefined : "noopener noreferrer"} aria-label={label} title={label} className="text-muted-foreground transition-colors hover:text-primary">
            <Icon size={16} strokeWidth={1.7} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;

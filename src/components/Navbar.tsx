import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const navLinks = [
  { label: "Work", path: "/projects" },
  { label: "Research", path: "/research" },
  { label: "Experience", path: "/experience" },
  { label: "About", path: "/about" },
  { label: "Writing", path: "/writing" },
];
const moreLinks = [
  { label: "Leadership & Community", path: "/leadership" },
  { label: "Awards & Recognition", path: "/awards" },
  { label: "Talks & Events", path: "/talks" },
  { label: "Contact", path: "/contact" },
];

const CvAction = () => (
  <a href="https://drive.google.com/file/d/1DdnhJ8I_U0rTsTwM48YGpV62BDObI66d/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="nav-cv" aria-label="View CV (opens in a new tab)">
    CV ↗
  </a>
);

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isActive = (path: string) => pathname === path || (path === "/projects" && pathname.startsWith("/projects/")) || (path === "/writing" && (pathname === "/blog" || pathname.startsWith("/writing/")));

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 1024px)");
    const close = () => setMobileOpen(false);
    breakpoint.addEventListener("change", close);
    return () => breakpoint.removeEventListener("change", close);
  }, []);

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    }} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setMobileOpen(false);
    }}>
      <nav className="page-shell flex h-[68px] items-center justify-between gap-6" aria-label="Main navigation">
        <Link to="/" aria-label="Adejire Adegite — Home" className="nav-brand" onClick={() => setMobileOpen(false)}>AJ<span>.</span></Link>
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map(({ label, path }) => <Link key={label} to={path} className="nav-link" aria-current={isActive(path) ? "page" : undefined}>{label}</Link>)}
          <DropdownMenu>
            <DropdownMenuTrigger className="nav-link inline-flex items-center gap-1">More <ChevronDown size={14} aria-hidden="true" /></DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={18} className="w-64 rounded-none p-2">
              {moreLinks.map(({ label, path }) => path ? (
                <DropdownMenuItem key={label} asChild className="min-h-11"><Link to={path}>{label}</Link></DropdownMenuItem>
              ) : <DropdownMenuItem key={label} disabled className="min-h-11 flex-col items-start">{label}<span className="text-xs">Not available yet</span></DropdownMenuItem>)}
            </DropdownMenuContent>
          </DropdownMenu>
          <CvAction />
        </div>
        <button ref={toggleRef} type="button" className="nav-toggle lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileOpen} aria-controls="mobile-navigation">
          {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>
      <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!mobileOpen} className="mobile-navigation lg:hidden">
        <div className="page-shell flex flex-col py-4">
          {[...navLinks, ...moreLinks].map(({ label, path }) => path ? (
            <Link key={label} to={path} onClick={() => setMobileOpen(false)} className="nav-link py-3" aria-current={isActive(path) ? "page" : undefined}>{label}</Link>
          ) : <span key={label} aria-disabled="true" className="py-3 text-sm text-muted-foreground">{label} <span className="text-xs">— Not available yet</span></span>)}
          <div className="mt-4"><CvAction /></div>
        </div>
      </nav>
    </header>
  );
}


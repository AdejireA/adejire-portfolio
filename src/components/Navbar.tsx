import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Projects", path: "/projects" },
  { label: "Writing", path: "/writing" },
  { label: "Research", path: "/research" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
      <nav className="page-shell flex h-[68px] items-center justify-between" aria-label="Main navigation">
        <Link to="/" className="font-mono text-sm font-semibold tracking-tight text-foreground" onClick={() => setMobileOpen(false)}>
          AJ<span className="ml-1 text-primary">.</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm transition-colors hover:text-primary ${
                pathname === link.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="inline-flex items-center justify-center p-2 text-muted-foreground hover:text-foreground md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="page-shell flex flex-col gap-4">
            <Link to="/" onClick={() => setMobileOpen(false)} className={`text-sm ${pathname === "/" ? "text-primary" : "text-muted-foreground"}`}>Home</Link>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-sm ${pathname === link.path ? "text-primary" : "text-muted-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

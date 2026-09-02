import { Link, NavLink } from "react-router-dom";
import { Shield, Globe } from "lucide-react";
import type { ReactNode } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/enroll", label: "Enroll" },
  { to: "/status", label: "Status" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <header className="sticky top-0 z-50 border-b-4 border-secondary bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="size-6 text-secondary" />
            <span className="font-display text-base font-extrabold tracking-tight sm:text-lg">
              OMOS TECHNOLOGIES
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold uppercase tracking-wide md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) => (isActive ? "text-secondary" : "hover:text-secondary")}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Link
            to="/enroll"
            className="rounded-sm bg-secondary px-4 py-2 font-display text-sm font-bold uppercase text-secondary-foreground transition-colors hover:bg-secondary/85"
          >
            Apply now
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-primary py-10 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 text-center">
          <div className="flex items-center gap-2">
            <Globe className="size-5 text-secondary" />
            <span className="font-display text-lg font-bold">www.omostechnologies.com</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-5 text-sm font-semibold uppercase tracking-wide">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-secondary">
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} OMOS Technologies. Cybersecurity training and certification.
          </p>
        </div>
      </footer>
    </div>
  );
}

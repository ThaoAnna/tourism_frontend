import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Container from "./layout/Container";

const NAV_ITEMS = [
  { label: "Home", href: "/", hash: "" },
  { label: "Tours", href: "/", hash: "tours" },
  { label: "Experiences", href: "/", hash: "experiences" },
  { label: "About", href: "/", hash: "about" },
] as const;

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (hash: string) => {
    setMobileOpen(false);
    if (!hash) return;
    if (location.pathname !== "/") {
      window.location.href = `/#${hash}`;
      return;
    }
    const el = document.getElementById(hash);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-navy/5 shadow-sm">
      <Container className="flex items-center justify-between h-16">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-navy"
          onClick={() => setMobileOpen(false)}
        >
          Wanderluster
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
          {NAV_ITEMS.map((item) =>
            item.hash ? (
              <button
                key={item.label}
                type="button"
                onClick={() => scrollToSection(item.hash)}
                className="nav-link"
              >
                {item.label}
              </button>
            ) : (
              <Link key={item.label} to={item.href} className="nav-link">
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center justify-center min-h-10 px-4 rounded-full text-sm font-medium text-navy border border-navy/15 hover:bg-sand transition-colors duration-200"
          >
            Login
          </Link>
          <Link to="/register" className="btn-primary !min-h-10 !px-5">
            Register
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 rounded-lg text-navy hover:bg-sand-dark transition-colors"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="lg:hidden border-t border-navy/5 bg-white/95 backdrop-blur-md">
          <Container className="py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) =>
              item.hash ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => scrollToSection(item.hash)}
                  className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-ink hover:bg-sand transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-ink hover:bg-sand transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-navy/5">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center min-h-11 px-4 rounded-full text-sm font-medium text-navy border border-navy/15"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="btn-primary"
              >
                Register
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

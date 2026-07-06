import { Link } from "react-router-dom";
import Container from "./layout/Container";

export default function Footer() {
  return (
    <footer id="about" className="bg-navy text-white/80 mt-auto scroll-mt-20">
      <Container className="section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-serif italic tracking-wide text-gold mb-4">
              Wanderluster
            </h2>
            <p className="text-base text-white/70 leading-relaxed font-light max-w-xl">
              Handpicked European journeys for travelers who value culture,
              comfort, and authentic local moments. Book with confidence —
              payments, confirmations, and support designed for modern travel.
            </p>
            {/* Future: payment badges (PayPal, Stripe), language switcher */}
            <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/50">
              <span className="px-3 py-1.5 rounded-full border border-white/15">
                Secure payments ready
              </span>
              <span className="px-3 py-1.5 rounded-full border border-white/15">
                Email confirmation
              </span>
              <span className="px-3 py-1.5 rounded-full border border-white/15">
                Multi-language ready
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#tours" className="hover:text-gold transition-colors">
                  Tours
                </a>
              </li>
              <li>
                <Link to="/login" className="hover:text-gold transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-gold transition-colors"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container>
          <p className="text-center text-white/40 text-sm">
            © {new Date().getFullYear()} Wanderluster. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}

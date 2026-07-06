import { motion } from "framer-motion";
import { ShieldCheck, MapPinned, Users, Zap } from "lucide-react";
import Container from "./layout/Container";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=80";

const TRUST_BADGES = [
  { icon: MapPinned, label: "10+ Curated Tours" },
  { icon: ShieldCheck, label: "Secure Booking" },
  { icon: Users, label: "Local Guides" },
  { icon: Zap, label: "Instant Confirmation" },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.12 * i,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

interface HeroProps {
  onExploreTours: () => void;
  onPlanTrip: () => void;
}

export default function Hero({ onExploreTours, onPlanTrip }: HeroProps) {
  return (
    <section className="relative min-h-[78vh] md:min-h-[82vh] flex items-end pb-28 md:pb-32 lg:pb-36">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/55 to-navy/80"
        aria-hidden
      />

      <Container className="relative z-10 w-full pt-10 md:pt-16">
        <div className="max-w-3xl">
          <motion.p
            className="text-gold text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-4"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Premium European Journeys
          </motion.p>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight tracking-tight"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Experience Europe Through Stories, Culture, and Local Moments
          </motion.h1>

          <motion.p
            className="mt-5 text-base md:text-lg text-white/85 leading-relaxed max-w-2xl"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Discover handpicked tours across Europe — from romantic canals in
            Venice to classic Paris landmarks and coastal Italian escapes.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-3"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <button type="button" onClick={onExploreTours} className="btn-primary">
              Explore Tours
            </button>
            <button type="button" onClick={onPlanTrip} className="btn-secondary">
              Plan My Trip
            </button>
          </motion.div>

          <motion.ul
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm text-white/90"
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10">
                  <Icon className="w-3.5 h-3.5 text-gold" aria-hidden />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}

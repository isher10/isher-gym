import { Link } from "@tanstack/react-router";
import { ChevronRight, RefreshCw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const QUOTES = [
  {
    text: "The only bad workout is the one that didn't happen.",
    author: "Unknown",
  },
  {
    text: "Push yourself because no one else is going to do it for you.",
    author: "Unknown",
  },
  {
    text: "Your body can stand almost anything. It's your mind you have to convince.",
    author: "Unknown",
  },
  {
    text: "Success starts with self-discipline. Train hard, eat right, stay consistent.",
    author: "Isher Gym",
  },
  {
    text: "Don't limit your challenges. Challenge your limits.",
    author: "Unknown",
  },
  {
    text: "It never gets easier. You just get stronger.",
    author: "Unknown",
  },
  {
    text: "The pain you feel today will be the strength you feel tomorrow.",
    author: "Unknown",
  },
  {
    text: "Wake up. Work out. Be stronger. Repeat.",
    author: "Isher Gym",
  },
];

const BENEFITS = [
  {
    emoji: "🏋️",
    title: "Personal Training",
    desc: "One-on-one sessions with certified expert trainers.",
  },
  {
    emoji: "👥",
    title: "Group Classes",
    desc: "HIIT, yoga, zumba, and more — for all fitness levels.",
  },
  {
    emoji: "⚡",
    title: "Modern Equipment",
    desc: "State-of-the-art machines updated annually.",
  },
  {
    emoji: "🥗",
    title: "Nutrition Guidance",
    desc: "Custom diet plans aligned with your fitness goals.",
  },
  {
    emoji: "🏃",
    title: "Cardio Zone",
    desc: "Treadmills, cycles, rowers, and ellipticals.",
  },
  {
    emoji: "🕐",
    title: "24/7 Access",
    desc: "Train on your schedule — early mornings or late nights.",
  },
];

export default function Home() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextQuote = () => {
    setDirection(1);
    setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
  };

  const quote = QUOTES[quoteIndex];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/gym-hero.dim_800x500.jpg"
            alt="Isher Gym"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/75 to-background" />
        </div>

        <div className="relative px-5 pt-10 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-3 py-1 mb-4">
              <span className="text-primary text-xs font-semibold tracking-wider uppercase">
                💪 Isher Gym
              </span>
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.1] text-foreground mb-2">
              Stronger <span className="text-primary">Every</span> Day.
            </h1>
            <p className="text-muted-foreground text-base mb-2 leading-relaxed font-body">
              Professional trainers · Modern equipment · Real results
            </p>
            <p className="text-foreground/70 text-sm mb-7 leading-relaxed font-body">
              Join Isher Gym and transform your fitness journey with expert
              guidance and world-class facilities built for champions.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                to="/workouts"
                className="btn-accent inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-display font-bold text-base w-full"
                data-ocid="cta-start-workout"
              >
                <span>🔥</span>
                Start Training
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/membership"
                className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-display font-semibold text-sm w-full"
                data-ocid="cta-view-plans"
              >
                <span>🏆</span>
                View Membership Plans
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote rotator */}
      <section className="px-4 py-5 bg-card/60">
        <div
          className="card-elevated rounded-2xl p-4 relative overflow-hidden"
          data-ocid="quote-card"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-2xl" />
          <div className="flex items-start justify-between gap-3 pl-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">
                💬 Daily Motivation
              </p>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={quoteIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -24 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="text-foreground text-sm font-medium italic leading-relaxed">
                    "{quote.text}"
                  </p>
                  <p className="text-muted-foreground text-xs mt-1.5">
                    — {quote.author}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              type="button"
              onClick={nextQuote}
              className="shrink-0 w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center text-primary transition-smooth hover:bg-primary/25 active:scale-95 mt-5"
              aria-label="Next quote"
              data-ocid="btn-next-quote"
            >
              <RefreshCw size={15} />
            </button>
          </div>
          <div className="flex gap-1 mt-3 pl-2">
            {QUOTES.map((q, i) => (
              <button
                type="button"
                key={q.text.slice(0, 12)}
                onClick={() => {
                  setDirection(i > quoteIndex ? 1 : -1);
                  setQuoteIndex(i);
                }}
                className={`h-1 rounded-full transition-smooth ${i === quoteIndex ? "w-5 bg-primary" : "w-1.5 bg-border"}`}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="px-4 py-7 bg-background">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-xl font-bold text-foreground mb-1"
        >
          Gym Benefits & Services
        </motion.h2>
        <p className="text-muted-foreground text-sm mb-5 font-body">
          Everything you need to reach your peak.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {BENEFITS.map(({ emoji, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.38 }}
              className="card-elevated rounded-2xl p-4 flex flex-col gap-2.5 active:scale-[0.98] transition-smooth"
              data-ocid={`benefit-${title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <span className="text-xl">{emoji}</span>
              </div>
              <h3 className="font-display font-bold text-sm text-foreground leading-tight">
                {title}
              </h3>
              <p className="text-muted-foreground text-xs leading-snug font-body">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="px-4 py-6 bg-muted/30">
        <h2 className="font-display text-xl font-bold text-foreground mb-1">
          Quick Access
        </h2>
        <p className="text-muted-foreground text-sm mb-4 font-body">
          Jump right into your fitness journey.
        </p>

        <div className="flex flex-col gap-2.5">
          {[
            {
              to: "/workouts",
              label: "Browse Workouts",
              sub: "6 categories · 40+ exercises",
              emoji: "🏋️",
            },
            {
              to: "/membership",
              label: "Membership Plans",
              sub: "Starter, Pro & Elite options",
              emoji: "🏆",
            },
          ].map(({ to, label, sub, emoji }) => (
            <Link
              key={to}
              to={to}
              className="card-elevated rounded-2xl flex items-center gap-3.5 px-4 py-4 transition-smooth active:scale-[0.98]"
              data-ocid={`quick-${label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <span className="text-2xl">{emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-sm text-foreground">
                  {label}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5 font-body">
                  {sub}
                </p>
              </div>
              <ChevronRight
                size={16}
                className="text-muted-foreground shrink-0"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Stats strip */}
      <section className="px-4 py-6 bg-background">
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "500+", label: "Members", emoji: "👥" },
            { value: "40+", label: "Exercises", emoji: "💪" },
            { value: "10+", label: "Trainers", emoji: "⭐" },
          ].map(({ value, label, emoji }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="card-elevated rounded-2xl p-3.5 text-center"
            >
              <div className="text-2xl mb-1">{emoji}</div>
              <p className="font-display font-extrabold text-lg text-primary leading-none">
                {value}
              </p>
              <p className="text-muted-foreground text-xs mt-1 font-body">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Branding footer */}
      <div className="px-4 py-6 text-center bg-card/40 border-t border-border">
        <p className="text-xs text-muted-foreground font-body">
          © {new Date().getFullYear()} Isher Gym. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}

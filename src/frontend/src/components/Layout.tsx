import { Link, useRouterState } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import {
  BarChart2,
  Bell,
  Calculator,
  CreditCard,
  Dumbbell,
  House,
  Info,
  Menu,
  MessageSquare,
  Salad,
  Star,
  Trophy,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export const NAV_LINKS = [
  { to: "/", label: "Home", icon: House },
  { to: "/workouts", label: "Workouts", icon: Dumbbell },
  { to: "/diet", label: "Diet", icon: Salad },
  { to: "/progress", label: "Progress", icon: BarChart2 },
  { to: "/challenges", label: "Challenges", icon: Trophy },
  { to: "/bmi", label: "BMI Calculator", icon: Calculator },
  { to: "/membership", label: "Membership", icon: CreditCard },
  { to: "/about", label: "About", icon: Info },
  { to: "/reminders", label: "Reminders", icon: Bell },
  { to: "/gamification", label: "Gamification", icon: Star },
  { to: "/feedback", label: "Feedback", icon: MessageSquare },
] as const;

export default function Layout() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (to: string) => {
    if (to === "/") return currentPath === "/";
    return currentPath.startsWith(to);
  };

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto relative">
      {/* Header */}
      <header
        className="sticky top-0 z-40 bg-card border-b border-border shadow-subtle"
        data-ocid="app-header"
      >
        <div className="flex items-center justify-between px-4 py-3 h-14">
          {/* Logo + Name */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80 active:opacity-60"
            data-ocid="header-logo"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Dumbbell size={18} className="text-primary" strokeWidth={2} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              <span className="text-primary">Isher</span>
              <span className="text-foreground"> Gym</span>
            </span>
          </Link>

          {/* Hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-smooth hover:bg-primary/20 active:scale-95"
            data-ocid="btn-open-menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-border/50 bg-card/50">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
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
      </footer>

      {/* Drawer backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Slide-in drawer from right */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-card border-l border-border flex flex-col shadow-2xl"
            data-ocid="nav-drawer"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Dumbbell
                    size={15}
                    className="text-primary"
                    strokeWidth={2}
                  />
                </div>
                <span className="font-display text-base font-bold">
                  <span className="text-primary">Isher</span>
                  <span className="text-foreground"> Gym</span>
                </span>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 rounded-xl bg-muted/60 flex items-center justify-center text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground active:scale-95"
                data-ocid="btn-close-menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto py-3 px-3">
              {NAV_LINKS.map(({ to, label, icon: Icon }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045, duration: 0.22 }}
                >
                  <Link
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-smooth font-display font-semibold text-sm ${
                      isActive(to)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60 active:bg-muted"
                    }`}
                    data-ocid={`drawer-nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <Icon size={18} strokeWidth={isActive(to) ? 2.2 : 1.8} />
                    <span>{label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Drawer footer */}
            <div className="px-5 py-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground font-body text-center">
                💪 Stay consistent. Stay strong.
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import {
  CreditCard,
  Dumbbell,
  Home,
  Info,
  Salad,
  TrendingUp,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/workouts", label: "Workouts", icon: Dumbbell, exact: false },
  { to: "/diet", label: "Diet", icon: Salad, exact: true },
  { to: "/progress", label: "Progress", icon: TrendingUp, exact: true },
  { to: "/membership", label: "Membership", icon: CreditCard, exact: true },
  { to: "/about", label: "About", icon: Info, exact: true },
] as const;

export default function BottomNav() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border"
      data-ocid="bottom-nav"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-stretch max-w-lg mx-auto">
        {NAV_ITEMS.map(({ to, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === to : pathname.startsWith(to);

          return (
            <Link
              key={to}
              to={to}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 min-h-[56px] transition-smooth"
              data-ocid={`nav-${label.toLowerCase()}`}
            >
              <Icon
                size={22}
                className={isActive ? "text-primary" : "text-muted-foreground"}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span
                className={`text-[10px] font-display font-medium leading-tight ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

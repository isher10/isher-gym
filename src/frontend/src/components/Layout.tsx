import { Outlet } from "@tanstack/react-router";
import { Dumbbell } from "lucide-react";
import BottomNav from "./BottomNav";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto relative">
      {/* Header */}
      <header
        className="sticky top-0 z-40 bg-card border-b border-border shadow-subtle"
        data-ocid="app-header"
      >
        <div className="flex items-center justify-center px-4 py-3 h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Dumbbell size={18} className="text-primary" strokeWidth={2} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              <span className="text-primary">Isher</span>
              <span className="text-foreground"> Gym</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-[calc(64px+env(safe-area-inset-bottom,0px))]">
        <Outlet />
      </main>

      {/* Bottom navigation */}
      <BottomNav />

      {/* Footer */}
      <footer className="hidden">
        <p className="text-center text-xs text-muted-foreground py-3">
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
    </div>
  );
}

import { WORKOUT_CATEGORIES } from "@/data/workouts";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Dumbbell } from "lucide-react";
import { motion } from "motion/react";

export { WORKOUT_CATEGORIES };

const CATEGORY_BG: Record<string, string> = {
  chest: "from-orange-900/30 to-red-900/20",
  back: "from-blue-900/30 to-indigo-900/20",
  legs: "from-green-900/30 to-teal-900/20",
  arms: "from-purple-900/30 to-violet-900/20",
  shoulders: "from-yellow-900/30 to-amber-900/20",
  abs: "from-rose-900/30 to-pink-900/20",
};

const CATEGORY_ACCENT: Record<string, string> = {
  chest: "text-orange-400",
  back: "text-blue-400",
  legs: "text-green-400",
  arms: "text-purple-400",
  shoulders: "text-yellow-400",
  abs: "text-rose-400",
};

export default function Workouts() {
  return (
    <div className="px-4 py-6 flex flex-col gap-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Dumbbell size={20} className="text-primary" />
          <h1 className="font-display text-2xl font-bold text-foreground">
            Workouts
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Choose a muscle group to start training
        </p>
      </motion.div>

      {/* Category grid */}
      <div className="grid grid-cols-2 gap-3">
        {WORKOUT_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
          >
            <Link
              to="/workouts/$category"
              params={{ category: cat.id }}
              className={`card-elevated rounded-2xl p-4 flex flex-col gap-2 block transition-smooth active:scale-[0.96] bg-gradient-to-br ${CATEGORY_BG[cat.id] ?? ""} overflow-hidden relative`}
              data-ocid={`workout-category-${cat.id}`}
            >
              {/* Icon circle */}
              <div className="w-11 h-11 rounded-xl bg-background/40 flex items-center justify-center mb-1">
                <span className="text-2xl leading-none">{cat.icon}</span>
              </div>

              <h2 className="font-display font-bold text-base text-foreground leading-tight">
                {cat.name}
              </h2>

              <p className="text-muted-foreground text-xs leading-snug line-clamp-2 min-h-[2.5rem]">
                {cat.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-1">
                <span
                  className={`text-xs font-semibold ${CATEGORY_ACCENT[cat.id] ?? "text-primary"}`}
                >
                  {cat.exercises.length} exercises
                </span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Tip card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="card-elevated rounded-xl p-4 border-l-4 border-primary"
      >
        <h3 className="font-display font-semibold text-sm text-foreground mb-1.5">
          💡 Beginner Tip
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed">
          Start with 3 sessions per week, focusing on compound movements. Rest
          1–2 days between sessions for optimal muscle recovery and growth.
        </p>
      </motion.div>
    </div>
  );
}

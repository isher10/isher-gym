import { WORKOUT_CATEGORIES } from "@/data/workouts";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Flame,
  Target,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const DIFFICULTY_STYLES: Record<string, { pill: string; label: string }> = {
  Beginner: {
    pill: "bg-emerald-900/50 text-emerald-400 border border-emerald-800/60",
    label: "Beginner",
  },
  Intermediate: {
    pill: "bg-amber-900/50 text-amber-400 border border-amber-800/60",
    label: "Intermediate",
  },
  Advanced: {
    pill: "bg-red-900/50 text-red-400 border border-red-800/60",
    label: "Advanced",
  },
};

const DIFF_ICON: Record<string, React.ReactNode> = {
  Beginner: <Zap size={11} />,
  Intermediate: <Flame size={11} />,
  Advanced: <Flame size={11} />,
};

export default function WorkoutCategory() {
  const { category } = useParams({ from: "/workouts/$category" });
  const cat = WORKOUT_CATEGORIES.find((c) => c.id === category);

  if (!cat) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 px-4">
        <p className="text-muted-foreground">Category not found.</p>
        <Link
          to="/workouts"
          className="btn-accent px-5 py-2 rounded-lg text-sm font-medium"
        >
          Back to Workouts
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Sub-header */}
      <div className="px-4 pt-4 pb-5 bg-card border-b border-border">
        <Link
          to="/workouts"
          className="inline-flex items-center gap-1.5 text-muted-foreground text-sm mb-4 hover:text-foreground transition-colors"
          data-ocid="back-to-workouts"
        >
          <ArrowLeft size={16} />
          All Categories
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
            <span className="text-3xl leading-none">{cat.icon}</span>
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-2xl font-bold text-foreground">
              {cat.name}
            </h1>
            <p className="text-muted-foreground text-xs mt-0.5 leading-snug">
              {cat.description}
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-1.5">
            <Target size={13} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              {cat.exercises.length} exercises
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame size={13} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              {cat.exercises.filter((e) => e.difficulty === "Beginner").length}{" "}
              beginner friendly
            </span>
          </div>
        </div>
      </div>

      {/* Exercise list */}
      <div className="px-4 py-4 flex flex-col gap-3">
        {cat.exercises.map((ex, i) => {
          const diffStyle =
            DIFFICULTY_STYLES[ex.difficulty] ?? DIFFICULTY_STYLES.Beginner;

          return (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              <Link
                to="/workouts/$category/$exercise"
                params={{ category: cat.id, exercise: ex.id }}
                className="card-elevated rounded-2xl flex items-stretch overflow-hidden block transition-smooth active:scale-[0.98]"
                data-ocid={`exercise-${ex.id}`}
              >
                {/* Thumbnail */}
                {ex.photoUrl && (
                  <div className="w-20 shrink-0 relative overflow-hidden">
                    <img
                      src={ex.photoUrl}
                      alt={ex.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0 p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="w-5 h-5 rounded-md bg-primary/15 flex items-center justify-center shrink-0">
                          <span className="text-primary font-display font-bold text-xs">
                            {i + 1}
                          </span>
                        </span>
                        <h3 className="font-display font-bold text-sm text-foreground leading-tight truncate">
                          {ex.name}
                        </h3>
                      </div>

                      {ex.nameHindi && (
                        <p className="text-muted-foreground text-xs ml-7 leading-none mb-1.5">
                          {ex.nameHindi}
                        </p>
                      )}
                    </div>
                    <ChevronRight
                      size={15}
                      className="text-muted-foreground shrink-0 mt-0.5"
                    />
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${diffStyle.pill}`}
                    >
                      {DIFF_ICON[ex.difficulty]}
                      {ex.difficulty}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Target size={11} />
                      {ex.targetMuscle}
                    </span>
                  </div>

                  {/* Duration / sets preview */}
                  {ex.duration ? (
                    <div className="flex items-center gap-1.5 mt-2">
                      <Clock size={11} className="text-primary shrink-0" />
                      <span className="text-xs text-primary font-semibold">
                        {ex.duration}
                      </span>
                    </div>
                  ) : (
                    (ex.sets || ex.reps) && (
                      <div className="flex gap-2 mt-2">
                        {ex.sets && (
                          <span className="text-xs text-primary font-semibold">
                            {ex.sets} sets
                          </span>
                        )}
                        {ex.reps && (
                          <span className="text-xs text-muted-foreground">
                            · {ex.reps} reps
                          </span>
                        )}
                      </div>
                    )
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

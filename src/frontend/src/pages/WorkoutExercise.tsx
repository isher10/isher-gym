import { WORKOUT_CATEGORIES } from "@/data/workouts";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Flame,
  Lightbulb,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

type BenefitType = "strength" | "fat-loss" | "muscle-gain" | "endurance";

const BENEFIT_META: Record<
  BenefitType,
  { label: string; pill: string; icon: React.ReactNode }
> = {
  strength: {
    label: "Strength",
    pill: "bg-blue-900/50 text-blue-300 border border-blue-800/60",
    icon: <Zap size={11} />,
  },
  "fat-loss": {
    label: "Fat Loss",
    pill: "bg-orange-900/50 text-orange-300 border border-orange-800/60",
    icon: <Flame size={11} />,
  },
  "muscle-gain": {
    label: "Muscle Gain",
    pill: "bg-primary/20 text-primary border border-primary/40",
    icon: <TrendingUp size={11} />,
  },
  endurance: {
    label: "Endurance",
    pill: "bg-teal-900/50 text-teal-300 border border-teal-800/60",
    icon: <Target size={11} />,
  },
};

const DIFFICULTY_STYLES: Record<string, string> = {
  Beginner: "bg-emerald-900/40 text-emerald-400 border border-emerald-800/50",
  Intermediate: "bg-amber-900/40 text-amber-400 border border-amber-800/50",
  Advanced: "bg-red-900/40 text-red-400 border border-red-800/50",
};

function parseBenefit(raw: string): { type: BenefitType; label: string } {
  const colonIdx = raw.indexOf(":");
  if (colonIdx === -1) return { type: "strength", label: raw };
  const type = raw.slice(0, colonIdx) as BenefitType;
  const label = raw.slice(colonIdx + 1);
  return { type: type in BENEFIT_META ? type : "strength", label };
}

const BEGINNER_TIPS: Record<string, string> = {
  chest:
    "Focus on form before adding weight. Use a spotter for bench press and keep your back flat on the bench.",
  back: "Never round your lower back under load. Think about driving elbows down and back during pulling movements.",
  legs: "Squat depth comes with flexibility. Practice bodyweight squats daily to improve your range of motion.",
  arms: "Resist the urge to swing for extra reps. Strict form activates more muscle fibers and prevents injury.",
  shoulders:
    "Warm up the rotator cuffs before heavy pressing. Use face pulls and band pull-aparts before every shoulder session.",
  abs: "Abs are built in the gym but revealed in the kitchen. Combine core training with a solid diet for visible results.",
};

export default function WorkoutExercise() {
  const { category, exercise } = useParams({
    from: "/workouts/$category/$exercise",
  });
  const cat = WORKOUT_CATEGORIES.find((c) => c.id === category);
  const ex = cat?.exercises.find((e) => e.id === exercise);

  if (!ex || !cat) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 px-4">
        <p className="text-muted-foreground">Exercise not found.</p>
        <Link
          to="/workouts"
          className="btn-accent px-5 py-2 rounded-lg text-sm font-medium"
        >
          Back to Workouts
        </Link>
      </div>
    );
  }

  const parsedBenefits = ex.benefits.map(parseBenefit);
  const tipText =
    BEGINNER_TIPS[cat.id] ??
    "Always warm up before this exercise. Master form with lighter weights before progressing to heavier loads.";

  return (
    <div className="flex flex-col pb-8">
      {/* Sub-header */}
      <div className="px-4 pt-4 pb-5 bg-card border-b border-border">
        <Link
          to="/workouts/$category"
          params={{ category: cat.id }}
          className="inline-flex items-center gap-1.5 text-muted-foreground text-sm mb-4 hover:text-foreground transition-colors"
          data-ocid="back-to-category"
        >
          <ArrowLeft size={16} />
          {cat.name}
        </Link>

        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <span className="text-2xl leading-none">{cat.icon}</span>
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-xl font-bold text-foreground leading-tight">
              {ex.name}
            </h1>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${DIFFICULTY_STYLES[ex.difficulty] ?? ""}`}
              >
                {ex.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Target size={11} />
                {ex.targetMuscle}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 flex flex-col gap-6">
        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-muted-foreground text-sm leading-relaxed"
        >
          {ex.description}
        </motion.p>

        {/* Sets & Reps */}
        {(ex.sets || ex.reps) && (
          <div className="flex gap-3">
            {ex.sets && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex-1 card-elevated rounded-2xl p-4 text-center"
              >
                <p className="text-primary font-display font-bold text-3xl">
                  {ex.sets}
                </p>
                <p className="text-muted-foreground text-xs mt-1 uppercase tracking-wide">
                  Sets
                </p>
              </motion.div>
            )}
            {ex.reps && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="flex-1 card-elevated rounded-2xl p-4 text-center"
              >
                <p className="text-primary font-display font-bold text-3xl leading-none">
                  {ex.reps}
                </p>
                <p className="text-muted-foreground text-xs mt-1 uppercase tracking-wide">
                  Reps
                </p>
              </motion.div>
            )}
          </div>
        )}

        {/* Benefits */}
        <div>
          <h2 className="font-display font-bold text-base text-foreground mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" />
            Benefits
          </h2>
          <div className="flex flex-col gap-2.5">
            {parsedBenefits.map(({ type, label }, i) => {
              const meta = BENEFIT_META[type] ?? BENEFIT_META.strength;
              return (
                <motion.div
                  key={`benefit-${type}-${label.slice(0, 12)}`}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${meta.pill}`}
                  >
                    {meta.icon}
                    {meta.label}
                  </span>
                  <span className="text-foreground text-sm leading-snug">
                    {label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Step-by-step */}
        <div>
          <h2 className="font-display font-bold text-base text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-primary" />
            Step-by-Step Instructions
          </h2>
          <div className="flex flex-col gap-4">
            {ex.steps.map((step, i) => (
              <motion.div
                key={`step-${step.slice(0, 20)}`}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-accent-foreground text-xs font-bold font-display">
                    {i + 1}
                  </span>
                </div>
                <p className="text-foreground text-sm leading-relaxed flex-1">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Beginner Tips */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="card-elevated rounded-2xl p-4 border-l-4 border-primary"
        >
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={15} className="text-primary" />
            <p className="text-xs text-primary font-semibold uppercase tracking-wide">
              Beginner Tip
            </p>
          </div>
          <p className="text-sm text-foreground leading-relaxed">{tipText}</p>
        </motion.div>

        {/* Back to category */}
        <Link
          to="/workouts/$category"
          params={{ category: cat.id }}
          className="btn-secondary flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-display font-semibold text-sm"
          data-ocid="back-btn"
        >
          <ArrowLeft size={16} />
          Back to {cat.name}
        </Link>
      </div>
    </div>
  );
}

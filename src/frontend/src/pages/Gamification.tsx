import { Skeleton } from "@/components/ui/skeleton";
import { useGetGamificationProfile } from "@/hooks/use-backend";
import type { GamificationProfile } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  Dumbbell,
  Flame,
  Heart,
  Lock,
  Sparkles,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { animate, motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

// ── Level config ──────────────────────────────────────────────────────────────

interface LevelConfig {
  level: number;
  label: string;
  min: number;
  max: number;
  color: string;
}

const LEVELS: LevelConfig[] = [
  { level: 1, label: "Beginner", min: 0, max: 99, color: "#6b7280" },
  { level: 2, label: "Active", min: 100, max: 249, color: "#10b981" },
  { level: 3, label: "Dedicated", min: 250, max: 499, color: "#3b82f6" },
  { level: 4, label: "Athlete", min: 500, max: 999, color: "#8b5cf6" },
  {
    level: 5,
    label: "Champion",
    min: 1000,
    max: Number.POSITIVE_INFINITY,
    color: "#f59e0b",
  },
];

function getLevelConfig(points: number): LevelConfig {
  return LEVELS.find((l) => points >= l.min && points <= l.max) ?? LEVELS[4];
}

function getProgressPercent(points: number, config: LevelConfig): number {
  if (config.level === 5) return 100;
  const range = config.max - config.min + 1;
  const progress = points - config.min;
  return Math.min(100, Math.round((progress / range) * 100));
}

// ── Badge definitions ─────────────────────────────────────────────────────────

interface BadgeDefinition {
  id: string;
  name: string;
  criteria: string;
  Icon: React.FC<{ size?: number; className?: string }>;
  color: string;
}

const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: "first_workout",
    name: "First Workout",
    criteria: "Log your first workout",
    Icon: Dumbbell,
    color: "text-emerald-400",
  },
  {
    id: "workout_10",
    name: "10 Workouts",
    criteria: "Log 10 total workouts",
    Icon: Activity,
    color: "text-blue-400",
  },
  {
    id: "workout_50",
    name: "50 Workouts",
    criteria: "Log 50 total workouts",
    Icon: BarChart3,
    color: "text-violet-400",
  },
  {
    id: "first_challenge",
    name: "First Challenge",
    criteria: "Complete your first challenge",
    Icon: Target,
    color: "text-orange-400",
  },
  {
    id: "challenge_3",
    name: "3 Challenges",
    criteria: "Complete 3 challenges",
    Icon: Trophy,
    color: "text-yellow-400",
  },
  {
    id: "bmi_check",
    name: "BMI Checked",
    criteria: "Check your BMI once",
    Icon: Heart,
    color: "text-rose-400",
  },
  {
    id: "consistency",
    name: "7-Day Streak",
    criteria: "Stay active 7 days in a row",
    Icon: Flame,
    color: "text-amber-400",
  },
  {
    id: "level_5",
    name: "Level 5",
    criteria: "Reach Level 5 Champion",
    Icon: Award,
    color: "text-primary",
  },
];

// ── Animated counter ──────────────────────────────────────────────────────────

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value]);
  return <>{display.toLocaleString()}</>;
}

// ── Loading skeleton ──────────────────────────────────────────────────────────

function GamificationSkeleton() {
  return (
    <div className="flex flex-col gap-6 px-4 py-6 max-w-lg mx-auto">
      <Skeleton className="h-52 w-full rounded-2xl" />
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-6 w-32 rounded" />
      <div className="grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-6 px-6 py-12 text-center max-w-sm mx-auto"
    >
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles size={44} className="text-primary" />
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-card border-2 border-background flex items-center justify-center">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Your Journey Starts Here
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Log a workout or start a challenge to earn points, unlock badges, and
          level up your fitness journey.
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Link
          to="/challenges"
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-smooth hover:opacity-90"
          data-ocid="empty-start-challenge"
        >
          <Target size={16} />
          Start a Challenge
          <ArrowRight size={14} />
        </Link>
        <Link
          to="/progress"
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm transition-smooth hover:opacity-85"
          data-ocid="empty-log-workout"
        >
          <Dumbbell size={16} />
          Log a Workout
        </Link>
      </div>
    </motion.div>
  );
}

// ── Hero profile card ─────────────────────────────────────────────────────────

function ProfileHeroCard({ profile }: { profile: GamificationProfile }) {
  const points = Number(profile.points);
  const level = Number(profile.level);
  const levelCfg = getLevelConfig(points);
  const progressPct = getProgressPercent(points, levelCfg);
  const pointsToNext = levelCfg.level < 5 ? levelCfg.max + 1 - points : null;

  const chartData = [{ value: progressPct, fill: levelCfg.color }];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-2xl p-5 shadow-md overflow-hidden relative"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 80% 50%, ${levelCfg.color} 0%, transparent 70%)`,
        }}
      />

      <div className="relative flex items-center gap-4">
        {/* Radial chart */}
        <div className="shrink-0 w-28 h-28">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="68%"
              outerRadius="90%"
              barSize={8}
              data={chartData}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background={{ fill: "oklch(var(--muted))" }}
                dataKey="value"
                cornerRadius={6}
                angleAxisId={0}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div
            className="-mt-[3.5rem] flex flex-col items-center justify-center h-14 pointer-events-none"
            aria-hidden="true"
          >
            <span className="font-display text-2xl font-bold text-foreground leading-none">
              {level}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
              Level
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
            {levelCfg.label}
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground leading-none mb-1">
            <AnimatedNumber value={points} />
            <span className="text-base font-medium text-muted-foreground ml-1">
              pts
            </span>
          </h2>

          {/* Progress bar */}
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>{levelCfg.min} pts</span>
              {pointsToNext !== null ? (
                <span>{pointsToNext} to next level</span>
              ) : (
                <span className="text-yellow-400 font-semibold">MAX LEVEL</span>
              )}
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: levelCfg.color }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>

      {profile.lastActivityDate && (
        <div className="relative mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar size={11} />
          <span>Last active: {profile.lastActivityDate}</span>
        </div>
      )}
    </motion.div>
  );
}

// ── Stats row ─────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  Icon,
  delay,
}: {
  label: string;
  value: number;
  Icon: React.FC<{ size?: number; className?: string }>;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-card border border-border rounded-2xl p-3 flex flex-col items-center gap-1.5 shadow-sm"
    >
      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon size={15} className="text-primary" />
      </div>
      <span className="font-display text-xl font-bold text-foreground leading-none">
        <AnimatedNumber value={value} />
      </span>
      <span className="text-[10px] text-muted-foreground text-center leading-tight">
        {label}
      </span>
    </motion.div>
  );
}

// ── Badge grid ────────────────────────────────────────────────────────────────

function BadgeCard({
  badge,
  unlocked,
  index,
}: {
  badge: BadgeDefinition;
  unlocked: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className={`bg-card border rounded-2xl p-3.5 flex flex-col items-center gap-2 shadow-sm transition-smooth ${
        unlocked ? "border-border" : "border-border/40 opacity-50"
      }`}
      data-ocid={`badge-${badge.id}`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          unlocked ? "bg-primary/10" : "bg-muted/60"
        }`}
      >
        {unlocked ? (
          <badge.Icon size={20} className={badge.color} />
        ) : (
          <Lock size={16} className="text-muted-foreground" />
        )}
      </div>
      <div className="text-center min-w-0 w-full">
        <p
          className={`text-xs font-semibold leading-tight truncate ${
            unlocked ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {badge.name}
        </p>
        <p className="text-[10px] text-muted-foreground leading-tight mt-0.5 line-clamp-2">
          {badge.criteria}
        </p>
      </div>
      {unlocked && (
        <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
          <CheckCircle2 size={12} className="text-emerald-400" />
        </div>
      )}
    </motion.div>
  );
}

// ── Milestones ────────────────────────────────────────────────────────────────

interface Milestone {
  label: string;
  description: string;
  Icon: React.FC<{ size?: number; className?: string }>;
  color: string;
}

function buildMilestones(profile: GamificationProfile): Milestone[] {
  const milestones: Milestone[] = [
    {
      label: "Joined Isher Gym",
      description: "Your fitness journey begins!",
      Icon: Star,
      color: "text-yellow-400",
    },
  ];
  if (Number(profile.totalWorkoutsLogged) >= 1) {
    milestones.push({
      label: "First Workout Logged",
      description: "You've taken the first step.",
      Icon: Dumbbell,
      color: "text-emerald-400",
    });
  }
  if (Number(profile.totalWorkoutsLogged) >= 10) {
    milestones.push({
      label: "10 Workouts Logged",
      description: "Consistency is your superpower.",
      Icon: Activity,
      color: "text-blue-400",
    });
  }
  if (Number(profile.totalChallengesCompleted) >= 1) {
    milestones.push({
      label: "First Challenge Completed",
      description: "You rose to the challenge!",
      Icon: Trophy,
      color: "text-orange-400",
    });
  }
  return milestones;
}

function MilestonesTimeline({ profile }: { profile: GamificationProfile }) {
  const milestones = buildMilestones(profile);
  return (
    <div className="flex flex-col gap-0">
      {milestones.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="flex gap-3"
        >
          {/* Timeline spine */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-card border-2 border-border flex items-center justify-center shrink-0">
              <m.Icon size={14} className={m.color} />
            </div>
            {i < milestones.length - 1 && (
              <div className="w-px flex-1 bg-border my-1" />
            )}
          </div>
          <div className="pb-4 pt-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-tight">
              {m.label}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {m.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Suggestions ───────────────────────────────────────────────────────────────

interface Suggestion {
  text: string;
  cta: string;
  to: string;
  Icon: React.FC<{ size?: number; className?: string }>;
}

function buildSuggestions(profile: GamificationProfile): Suggestion[] {
  const suggestions: Suggestion[] = [];
  if (Number(profile.totalChallengesCompleted) === 0) {
    suggestions.push({
      text: "Try your first challenge to unlock the 'First Challenge' badge!",
      cta: "View Challenges",
      to: "/challenges",
      Icon: Target,
    });
  }
  if (Number(profile.points) < 100) {
    suggestions.push({
      text: "Log a workout to earn 10 points and climb toward Level 2!",
      cta: "Log Progress",
      to: "/progress",
      Icon: Zap,
    });
  }
  if (profile.badges.length < 3) {
    suggestions.push({
      text: "Check your BMI to earn the 'BMI Checked' badge.",
      cta: "Open BMI Calc",
      to: "/bmi",
      Icon: Heart,
    });
  }
  return suggestions.slice(0, 3);
}

function SuggestionCard({
  suggestion,
  index,
}: {
  suggestion: Suggestion;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card border border-border rounded-2xl p-4 flex items-start gap-3"
      data-ocid={`suggestion-${index}`}
    >
      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <suggestion.Icon size={16} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-snug">
          {suggestion.text}
        </p>
        <Link
          to={suggestion.to as "/challenges" | "/progress" | "/bmi"}
          className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-primary hover:opacity-80 transition-smooth"
        >
          {suggestion.cta}
          <ArrowRight size={11} />
        </Link>
      </div>
    </motion.div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionHeader({
  title,
  icon,
}: { title: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h3 className="font-display text-base font-bold text-foreground">
        {title}
      </h3>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Gamification() {
  const { data: profile, isLoading } = useGetGamificationProfile();

  if (isLoading) return <GamificationSkeleton />;

  // No profile means backend hasn't initialized yet — show empty state
  if (!profile) return <EmptyState />;

  const p: GamificationProfile = profile;

  const suggestions = buildSuggestions(p);
  const earnedBadges = new Set(p.badges);

  return (
    <div className="flex flex-col gap-6 px-4 py-6 max-w-lg mx-auto pb-28">
      {/* Hero */}
      <ProfileHeroCard profile={p} />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          label="Total Points"
          value={Number(p.points)}
          Icon={Star}
          delay={0.1}
        />
        <StatCard
          label="Workouts Logged"
          value={Number(p.totalWorkoutsLogged)}
          Icon={Dumbbell}
          delay={0.15}
        />
        <StatCard
          label="Challenges Done"
          value={Number(p.totalChallengesCompleted)}
          Icon={Trophy}
          delay={0.2}
        />
      </div>

      {/* Badge gallery */}
      <div>
        <SectionHeader
          title="Badges"
          icon={<Award size={16} className="text-primary" />}
        />
        <div className="grid grid-cols-2 gap-3">
          {BADGE_DEFINITIONS.map((badge, i) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              unlocked={earnedBadges.has(badge.id)}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div>
        <SectionHeader
          title="Milestones"
          icon={<CheckCircle2 size={16} className="text-primary" />}
        />
        <div className="bg-card border border-border rounded-2xl p-4">
          <MilestonesTimeline profile={p} />
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <SectionHeader
            title="Next Steps"
            icon={<Sparkles size={16} className="text-primary" />}
          />
          <div className="flex flex-col gap-3">
            {suggestions.map((s, i) => (
              <SuggestionCard key={s.cta} suggestion={s} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

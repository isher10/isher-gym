import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAddPoints,
  useAddUserChallenge,
  useDeleteUserChallenge,
  useListChallengeTemplates,
  useListUserChallenges,
  useUnlockBadge,
  useUpdateChallengeProgress,
} from "@/hooks/use-backend";
import type { ChallengeTemplate, UserChallenge } from "@/types";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Loader2,
  Medal,
  Star,
  Target,
  Trash2,
  Trophy,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ── Goal styling helpers ──────────────────────────────────────────────────

type GoalStyle = { label: string; className: string };

function getGoalStyle(goal: string): GoalStyle {
  const g = goal.toLowerCase();
  if (g.includes("fat") || g.includes("loss"))
    return {
      label: "Fat Loss",
      className: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    };
  if (g.includes("muscle") || g.includes("gain"))
    return {
      label: "Muscle Gain",
      className: "bg-primary/20 text-primary border-primary/30",
    };
  if (g.includes("endurance") || g.includes("cardio"))
    return {
      label: "Endurance",
      className: "bg-green-500/20 text-green-400 border-green-500/30",
    };
  if (g.includes("strength") || g.includes("power"))
    return {
      label: "Strength",
      className: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    };
  if (g.includes("beginner") || g.includes("starter"))
    return {
      label: "Beginner",
      className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    };
  return {
    label: goal,
    className: "bg-muted text-muted-foreground border-border",
  };
}

function getDifficultyClass(difficulty: string): string {
  const d = difficulty.toLowerCase();
  if (d === "easy" || d === "beginner")
    return "bg-green-500/15 text-green-400 border-green-500/25";
  if (d === "medium" || d === "intermediate")
    return "bg-yellow-500/15 text-yellow-400 border-yellow-500/25";
  return "bg-red-500/15 text-red-400 border-red-500/25";
}

function getBadgeIdFromGoal(goal: string): string {
  const g = goal.toLowerCase();
  if (g.includes("fat") || g.includes("loss")) return "fat-loss-champion";
  if (g.includes("muscle") || g.includes("gain")) return "muscle-builder";
  if (g.includes("endurance") || g.includes("cardio"))
    return "endurance-master";
  if (g.includes("strength") || g.includes("power")) return "strength-warrior";
  if (g.includes("beginner")) return "first-challenge";
  return "challenge-complete";
}

// ── Sub-components ────────────────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  count,
}: { icon: React.ReactNode; title: string; count?: number }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
        {icon}
      </div>
      <h2 className="font-display text-xl font-bold text-foreground">
        {title}
      </h2>
      {count !== undefined && (
        <span className="ml-1 text-xs font-semibold bg-muted text-muted-foreground rounded-full px-2.5 py-0.5">
          {count}
        </span>
      )}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-9 w-full rounded-xl" />
    </div>
  );
}

function EmptyState({
  icon,
  title,
  subtitle,
}: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 gap-3 text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
        {icon}
      </div>
      <p className="font-display font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
        {subtitle}
      </p>
    </motion.div>
  );
}

// ── Available Challenge Card ──────────────────────────────────────────────

function AvailableChallengeCard({
  template,
  alreadyJoined,
  onJoin,
  isJoining,
}: {
  template: ChallengeTemplate;
  alreadyJoined: boolean;
  onJoin: () => void;
  isJoining: boolean;
}) {
  const goal = getGoalStyle(template.goal);
  const diffClass = getDifficultyClass(template.difficulty);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-3 transition-smooth"
      data-ocid="challenge-template-card"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display font-bold text-foreground text-base leading-tight min-w-0 truncate">
          {template.name}
        </h3>
        <div className="flex items-center gap-1.5 shrink-0">
          <Clock size={13} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-medium">
            {Number(template.durationDays)}d
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {template.description}
      </p>

      <div className="flex flex-wrap gap-2">
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${goal.className}`}
        >
          <Target size={10} />
          {goal.label}
        </span>
        <span
          className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border ${diffClass}`}
        >
          {template.difficulty}
        </span>
      </div>

      {template.exercises.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {template.exercises.slice(0, 3).map((ex) => (
            <span
              key={ex}
              className="text-xs bg-muted text-muted-foreground rounded-lg px-2 py-0.5"
            >
              {ex}
            </span>
          ))}
          {template.exercises.length > 3 && (
            <span className="text-xs bg-muted text-muted-foreground rounded-lg px-2 py-0.5">
              +{template.exercises.length - 3} more
            </span>
          )}
        </div>
      )}

      <Button
        className="w-full rounded-xl font-semibold mt-1"
        disabled={alreadyJoined || isJoining}
        onClick={onJoin}
        data-ocid="join-challenge-btn"
      >
        {isJoining ? (
          <>
            <Loader2 size={14} className="animate-spin mr-2" />
            Joining…
          </>
        ) : alreadyJoined ? (
          <>
            <CheckCircle2 size={14} className="mr-2" />
            Already Joined
          </>
        ) : (
          <>
            <Zap size={14} className="mr-2" />
            Join Challenge
          </>
        )}
      </Button>
    </motion.div>
  );
}

// ── Active Challenge Card ─────────────────────────────────────────────────

function ActiveChallengeCard({
  challenge,
  templateName,
  templateGoal,
  durationDays,
  onLogToday,
  onAbandon,
  isLogging,
  isAbandoning,
}: {
  challenge: UserChallenge;
  templateName: string;
  templateGoal: string;
  durationDays: number;
  onLogToday: () => void;
  onAbandon: () => void;
  isLogging: boolean;
  isAbandoning: boolean;
}) {
  const current = Number(challenge.currentDay);
  const total = durationDays;
  const percent = Math.min((current / total) * 100, 100);
  const remaining = Math.max(total - current, 0);
  const goal = getGoalStyle(templateGoal);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-3"
      data-ocid="active-challenge-card"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <Flame size={16} className="text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-bold text-foreground text-sm leading-tight truncate">
              {templateName}
            </h3>
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded-full border mt-0.5 ${goal.className}`}
            >
              <Target size={9} />
              {goal.label}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onAbandon}
          disabled={isAbandoning}
          className="text-muted-foreground hover:text-destructive transition-smooth p-1.5 rounded-lg hover:bg-destructive/10 shrink-0"
          aria-label="Abandon challenge"
          data-ocid="abandon-challenge-btn"
        >
          {isAbandoning ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Trash2 size={15} />
          )}
        </button>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            Day {current} of {total}
          </span>
          <span>{remaining} days left</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Flame size={11} className="text-orange-400" />
          <span>
            {current} day{current !== 1 ? "s" : ""} streak
          </span>
        </div>
      </div>

      <Button
        className="w-full rounded-xl font-semibold"
        onClick={onLogToday}
        disabled={isLogging}
        data-ocid="log-today-btn"
      >
        {isLogging ? (
          <>
            <Loader2 size={14} className="animate-spin mr-2" />
            Logging…
          </>
        ) : (
          <>
            <CheckCircle2 size={14} className="mr-2" />
            Log Today
            <ChevronRight size={14} className="ml-auto" />
          </>
        )}
      </Button>
    </motion.div>
  );
}

// ── Completed Challenge Card ──────────────────────────────────────────────

function CompletedChallengeCard({
  challenge,
  templateName,
  templateGoal,
  durationDays,
}: {
  challenge: UserChallenge;
  templateName: string;
  templateGoal: string;
  durationDays: number;
}) {
  const goal = getGoalStyle(templateGoal);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3"
      data-ocid="completed-challenge-card"
    >
      <div className="w-10 h-10 rounded-xl bg-yellow-500/15 flex items-center justify-center shrink-0">
        <Medal size={20} className="text-yellow-400" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display font-bold text-foreground text-sm truncate">
          {templateName}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className={`inline-flex text-xs font-semibold px-1.5 py-0.5 rounded-full border ${goal.className}`}
          >
            {goal.label}
          </span>
          <span className="text-xs text-muted-foreground">
            {durationDays} days
          </span>
        </div>
      </div>
      {challenge.badgeEarned && (
        <div className="flex items-center gap-1 text-yellow-400 shrink-0">
          <Star size={14} fill="currentColor" />
          <span className="text-xs font-semibold">Badge</span>
        </div>
      )}
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────

export default function Challenges() {
  const [joiningId, setJoiningId] = useState<bigint | null>(null);
  const [loggingId, setLoggingId] = useState<bigint | null>(null);
  const [abandoningId, setAbandoningId] = useState<bigint | null>(null);

  const {
    data: templates = [],
    isLoading: loadingTemplates,
    isError: templatesError,
  } = useListChallengeTemplates();
  const {
    data: userChallenges = [],
    isLoading: loadingChallenges,
    isError: challengesError,
  } = useListUserChallenges();

  const addUserChallenge = useAddUserChallenge();
  const updateProgress = useUpdateChallengeProgress();
  const deleteChallenge = useDeleteUserChallenge();
  const addPoints = useAddPoints();
  const unlockBadge = useUnlockBadge();

  const activeChallenges = userChallenges.filter((c) => !c.completed);
  const completedChallenges = userChallenges.filter((c) => c.completed);
  const joinedTemplateIds = new Set(userChallenges.map((c) => c.templateId));

  function getTemplate(templateId: bigint): ChallengeTemplate | undefined {
    return (templates as ChallengeTemplate[]).find((t) => t.id === templateId);
  }

  async function handleJoin(template: ChallengeTemplate) {
    setJoiningId(template.id);
    try {
      await addUserChallenge.mutateAsync({
        templateId: template.id,
        startDate: new Date().toISOString().split("T")[0],
      });
      toast.success(`Joined "${template.name}"! 🔥 Let's go!`);
    } catch {
      toast.error("Failed to join challenge. Try again.");
    } finally {
      setJoiningId(null);
    }
  }

  async function handleLogToday(challenge: UserChallenge) {
    const template = getTemplate(challenge.templateId);
    if (!template) return;
    const newDay = challenge.currentDay + 1n;
    const total = template.durationDays;
    const isCompleting = newDay >= total;

    setLoggingId(challenge.id);
    try {
      await updateProgress.mutateAsync({
        id: challenge.id,
        currentDay: newDay,
        completed: isCompleting,
        badgeEarned: isCompleting,
      });

      if (isCompleting) {
        await Promise.all([
          addPoints.mutateAsync({
            points: 100n,
            reason: "Challenge completed",
          }),
          unlockBadge.mutateAsync(getBadgeIdFromGoal(template.goal)),
        ]);
        toast.success(
          "🏆 Challenge Complete! You earned a badge and 100 points!",
          { duration: 5000 },
        );
      } else {
        toast.success(`Day ${Number(newDay)} logged! Keep it up! 💪`);
      }
    } catch {
      toast.error("Failed to log progress. Try again.");
    } finally {
      setLoggingId(null);
    }
  }

  async function handleAbandon(challenge: UserChallenge) {
    setAbandoningId(challenge.id);
    try {
      await deleteChallenge.mutateAsync(challenge.id);
      toast.info("Challenge abandoned. You can rejoin anytime.");
    } catch {
      toast.error("Failed to abandon challenge. Try again.");
    } finally {
      setAbandoningId(null);
    }
  }

  const isLoading = loadingTemplates || loadingChallenges;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero header */}
      <div className="bg-card border-b border-border px-4 pt-10 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Trophy size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground leading-tight">
              Challenges
            </h1>
            <p className="text-sm text-muted-foreground">
              Build streaks. Earn badges. Stay consistent.
            </p>
          </div>
        </motion.div>

        {/* Quick stats */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-3 mt-5"
          >
            {[
              {
                label: "Active",
                value: activeChallenges.length,
                icon: <Flame size={14} className="text-orange-400" />,
              },
              {
                label: "Completed",
                value: completedChallenges.length,
                icon: <Medal size={14} className="text-yellow-400" />,
              },
              {
                label: "Available",
                value: (templates as ChallengeTemplate[]).length,
                icon: <Target size={14} className="text-primary" />,
              },
            ].map(({ label, value, icon }) => (
              <div
                key={label}
                className="flex-1 bg-muted rounded-xl p-3 text-center"
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  {icon}
                </div>
                <p className="font-display font-bold text-foreground text-lg">
                  {value}
                </p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="px-4 pt-6 space-y-8">
        {/* Error states */}
        {(templatesError || challengesError) && (
          <div className="flex items-center gap-2 text-destructive bg-destructive/10 rounded-xl px-4 py-3 text-sm">
            <AlertCircle size={16} />
            <span>Failed to load data. Pull to refresh.</span>
          </div>
        )}

        {/* ── Active Challenges ── */}
        <section data-ocid="active-challenges-section">
          <SectionHeader
            icon={<Flame size={18} />}
            title="Your Active Challenges"
            count={isLoading ? undefined : activeChallenges.length}
          />
          {isLoading ? (
            <div className="space-y-3">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : activeChallenges.length === 0 ? (
            <EmptyState
              icon={<Flame size={26} />}
              title="No active challenges yet"
              subtitle="Join a challenge below to start building your streak and earning badges!"
            />
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="space-y-3">
                {activeChallenges.map((c) => {
                  const tmpl = getTemplate(c.templateId);
                  return (
                    <ActiveChallengeCard
                      key={String(c.id)}
                      challenge={c}
                      templateName={tmpl?.name ?? "Challenge"}
                      templateGoal={tmpl?.goal ?? ""}
                      durationDays={Number(tmpl?.durationDays ?? 0)}
                      onLogToday={() => handleLogToday(c)}
                      onAbandon={() => handleAbandon(c)}
                      isLogging={loggingId === c.id}
                      isAbandoning={abandoningId === c.id}
                    />
                  );
                })}
              </div>
            </AnimatePresence>
          )}
        </section>

        {/* ── Available Challenges ── */}
        <section data-ocid="available-challenges-section">
          <SectionHeader
            icon={<Target size={18} />}
            title="Available Challenges"
            count={
              isLoading ? undefined : (templates as ChallengeTemplate[]).length
            }
          />
          {isLoading ? (
            <div className="grid grid-cols-1 gap-3">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : (templates as ChallengeTemplate[]).length === 0 ? (
            <EmptyState
              icon={<Target size={26} />}
              title="No challenges available"
              subtitle="Check back soon — new challenges are added regularly."
            />
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {(templates as ChallengeTemplate[]).map((t, i) => (
                <motion.div
                  key={String(t.id)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <AvailableChallengeCard
                    template={t}
                    alreadyJoined={joinedTemplateIds.has(t.id)}
                    onJoin={() => handleJoin(t)}
                    isJoining={joiningId === t.id}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* ── Completed Challenges ── */}
        {(completedChallenges.length > 0 ||
          (!isLoading &&
            completedChallenges.length === 0 &&
            userChallenges.length > 0)) && (
          <section data-ocid="completed-challenges-section">
            <SectionHeader
              icon={<Medal size={18} />}
              title="Completed Challenges"
              count={completedChallenges.length}
            />
            {completedChallenges.length === 0 ? (
              <EmptyState
                icon={<Trophy size={26} />}
                title="No completions yet"
                subtitle="Finish an active challenge to see it here."
              />
            ) : (
              <div className="space-y-2">
                {completedChallenges.map((c, i) => {
                  const tmpl = getTemplate(c.templateId);
                  return (
                    <motion.div
                      key={String(c.id)}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <CompletedChallengeCard
                        challenge={c}
                        templateName={tmpl?.name ?? "Challenge"}
                        templateGoal={tmpl?.goal ?? ""}
                        durationDays={Number(tmpl?.durationDays ?? 0)}
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

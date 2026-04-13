import { Skeleton } from "@/components/ui/skeleton";
import {
  useAddProgress,
  useDeleteProgress,
  useListProgress,
  useUpdateProgress,
} from "@/hooks/use-backend";
import type { ProgressEntry, ProgressFormData } from "@/types";
import { Check, Dumbbell, Edit2, Scale, TrendingUp, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
type FormMode = { type: "add" } | { type: "edit"; entry: ProgressEntry };

// ─── Progress Form ─────────────────────────────────────────────────────────────
function ProgressForm({
  mode,
  onClose,
}: {
  mode: FormMode;
  onClose: () => void;
}) {
  const isEdit = mode.type === "edit";
  const existing = isEdit ? mode.entry : null;

  const [form, setForm] = useState<ProgressFormData>({
    weight: existing ? `${existing.weight}` : "",
    workoutsCompleted: existing ? existing.workoutsCompleted.toString() : "",
    notes: existing ? existing.notes : "",
    date: existing ? existing.date : new Date().toISOString().split("T")[0],
  });

  const { mutate: addProgress, isPending: isAdding } = useAddProgress();
  const { mutate: updateProgress, isPending: isUpdating } = useUpdateProgress();
  const isPending = isAdding || isUpdating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.weight || !form.date) return;

    const payload = {
      weight: Number.parseFloat(form.weight),
      workoutsCompleted: BigInt(form.workoutsCompleted || "0"),
      notes: form.notes,
      date: form.date,
    };

    if (isEdit && existing) {
      updateProgress(
        { id: existing.id, ...payload },
        {
          onSuccess: () => {
            toast.success("Entry updated!");
            onClose();
          },
          onError: () => toast.error("Failed to update entry."),
        },
      );
    } else {
      addProgress(payload, {
        onSuccess: () => {
          toast.success("Progress logged!");
          onClose();
        },
        onError: () => toast.error("Failed to save progress."),
      });
    }
  };

  const inputClass =
    "w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="card-elevated rounded-xl p-4 flex flex-col gap-3 mb-1"
      data-ocid="progress-form"
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-display font-bold text-sm text-foreground">
          {isEdit ? "Edit Entry" : "Log Progress"}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-smooth p-1 rounded-lg"
          aria-label="Close form"
          data-ocid="btn-close-form"
        >
          <X size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label
            htmlFor="input-weight"
            className="text-xs text-muted-foreground mb-1 block"
          >
            Weight (kg) *
          </label>
          <input
            id="input-weight"
            type="number"
            step="0.1"
            required
            placeholder="e.g. 75.5"
            className={inputClass}
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
            data-ocid="input-weight"
          />
        </div>
        <div>
          <label
            htmlFor="input-workouts"
            className="text-xs text-muted-foreground mb-1 block"
          >
            Workouts Done
          </label>
          <input
            id="input-workouts"
            type="number"
            min="0"
            placeholder="e.g. 3"
            className={inputClass}
            value={form.workoutsCompleted}
            onChange={(e) =>
              setForm({ ...form, workoutsCompleted: e.target.value })
            }
            data-ocid="input-workouts"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="input-date"
          className="text-xs text-muted-foreground mb-1 block"
        >
          Date *
        </label>
        <input
          id="input-date"
          type="date"
          required
          className={inputClass}
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          data-ocid="input-date"
        />
      </div>

      <div>
        <label
          htmlFor="input-notes"
          className="text-xs text-muted-foreground mb-1 block"
        >
          Notes
        </label>
        <textarea
          id="input-notes"
          rows={2}
          placeholder="How did you feel? Any PRs?"
          className={`${inputClass} resize-none`}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          data-ocid="input-notes"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn-accent w-full py-2.5 rounded-lg font-display font-semibold text-sm flex items-center justify-center gap-2"
        data-ocid="btn-save-progress"
      >
        {isPending ? (
          "Saving…"
        ) : (
          <>
            <Check size={15} />
            {isEdit ? "Update Entry" : "Save Progress"}
          </>
        )}
      </button>
    </motion.form>
  );
}

// ─── Weight Trend Chart ───────────────────────────────────────────────────────
function WeightTrendChart({ entries }: { entries: ProgressEntry[] }) {
  const last7 = entries.slice(0, 7).reverse();

  if (last7.length < 2) {
    return (
      <div
        className="card-elevated rounded-xl p-4 flex flex-col items-center justify-center gap-2 py-8 text-center"
        data-ocid="trend-empty-state"
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-1">
          <TrendingUp size={24} className="text-primary" />
        </div>
        <p className="font-display font-semibold text-sm text-foreground">
          Log 2+ entries to see your weight trend
        </p>
        <p className="text-muted-foreground text-xs max-w-xs">
          Keep tracking consistently and your progress chart will appear here.
        </p>
      </div>
    );
  }

  const weights = last7.map((e) => e.weight);
  const minW = Math.min(...weights);
  const maxW = Math.max(...weights);
  const range = maxW - minW || 1;

  return (
    <div
      className="card-elevated rounded-xl p-4"
      data-ocid="weight-trend-chart"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="font-display font-semibold text-sm text-foreground">
          Weight Trend
        </p>
        <span className="text-xs text-muted-foreground">
          Last {last7.length} entries
        </span>
      </div>
      <div className="flex items-end gap-1.5 h-20">
        {last7.map((entry, i) => {
          const heightPct = ((entry.weight - minW) / range) * 75 + 25;
          return (
            <div
              key={entry.id.toString()}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                style={{ height: `${heightPct}%`, transformOrigin: "bottom" }}
                className="w-full rounded-t-sm bg-primary/70 hover:bg-primary transition-smooth cursor-default"
                title={`${entry.weight} kg — ${entry.date}`}
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-1.5 mt-1">
        {last7.map((entry) => (
          <p
            key={entry.id.toString()}
            className="flex-1 text-center text-muted-foreground"
            style={{ fontSize: "9px" }}
          >
            {entry.date.slice(5)}
          </p>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
        <span className="text-xs text-muted-foreground">
          Min: <span className="text-foreground font-medium">{minW} kg</span>
        </span>
        <span className="text-xs text-muted-foreground">
          Max: <span className="text-foreground font-medium">{maxW} kg</span>
        </span>
      </div>
    </div>
  );
}

// ─── Progress Card ─────────────────────────────────────────────────────────────
function ProgressCard({
  entry,
  onEdit,
}: {
  entry: ProgressEntry;
  onEdit: (entry: ProgressEntry) => void;
}) {
  const { mutate: deleteEntry, isPending } = useDeleteProgress();

  const handleDelete = () => {
    deleteEntry(entry.id, {
      onSuccess: () => toast.success("Entry deleted."),
      onError: () => toast.error("Failed to delete entry."),
    });
  };

  const dateLabel = new Date(`${entry.date}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      month: "short",
      day: "numeric",
    },
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="card-elevated rounded-xl p-4"
      data-ocid="progress-card"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <p className="text-muted-foreground text-xs font-medium">{dateLabel}</p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(entry)}
            aria-label="Edit entry"
            className="text-muted-foreground hover:text-foreground transition-smooth p-1 rounded-md"
            data-ocid="btn-edit-progress"
          >
            <Edit2 size={13} />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            aria-label="Delete entry"
            className="text-muted-foreground hover:text-destructive transition-smooth p-1 rounded-md"
            data-ocid="btn-delete-progress"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 bg-primary/10 rounded-lg px-2.5 py-1.5">
          <Scale size={13} className="text-primary" />
          <span className="font-display font-bold text-base text-foreground">
            {entry.weight}
          </span>
          <span className="text-muted-foreground text-xs">kg</span>
        </div>
        <div className="flex items-center gap-1.5 bg-muted/50 rounded-lg px-2.5 py-1.5">
          <Dumbbell size={13} className="text-primary" />
          <span className="font-display font-bold text-base text-foreground">
            {entry.workoutsCompleted.toString()}
          </span>
          <span className="text-muted-foreground text-xs">sessions</span>
        </div>
      </div>

      {entry.notes && (
        <p className="text-muted-foreground text-xs leading-relaxed mt-2 italic border-t border-border/50 pt-2">
          "{entry.notes}"
        </p>
      )}
    </motion.div>
  );
}

// ─── Stats Bar ─────────────────────────────────────────────────────────────────
function StatsBar({ entries }: { entries: ProgressEntry[] }) {
  const totalSessions = entries.reduce(
    (acc, e) => acc + Number(e.workoutsCompleted),
    0,
  );
  const latestWeight = entries[0]?.weight;
  const firstWeight = entries[entries.length - 1]?.weight;
  const weightDelta =
    latestWeight !== undefined &&
    firstWeight !== undefined &&
    entries.length >= 2
      ? (latestWeight - firstWeight).toFixed(1)
      : null;

  return (
    <div className="grid grid-cols-3 gap-2" data-ocid="stats-bar">
      <div className="card-elevated rounded-xl p-3 text-center">
        <p className="font-display font-bold text-xl text-primary">
          {entries.length}
        </p>
        <p className="text-muted-foreground text-xs mt-0.5">Logs</p>
      </div>
      <div className="card-elevated rounded-xl p-3 text-center">
        <p className="font-display font-bold text-xl text-foreground">
          {totalSessions}
        </p>
        <p className="text-muted-foreground text-xs mt-0.5">Sessions</p>
      </div>
      <div className="card-elevated rounded-xl p-3 text-center">
        <p
          className={`font-display font-bold text-xl ${
            weightDelta && Number.parseFloat(weightDelta) < 0
              ? "text-emerald-400"
              : "text-primary"
          }`}
        >
          {weightDelta
            ? Number.parseFloat(weightDelta) > 0
              ? `+${weightDelta}`
              : weightDelta
            : latestWeight !== undefined
              ? `${latestWeight}`
              : "—"}
        </p>
        <p className="text-muted-foreground text-xs mt-0.5">
          {weightDelta ? "Δ Weight" : "Weight"}
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Progress() {
  const [formMode, setFormMode] = useState<FormMode | null>(null);
  const { data: entries = [], isLoading, isError } = useListProgress();

  const sorted = [...entries].sort((a, b) => (b.date > a.date ? 1 : -1));

  const handleEdit = (entry: ProgressEntry) => {
    setFormMode({ type: "edit", entry });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseForm = () => setFormMode(null);

  return (
    <div className="flex flex-col pb-24">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 bg-card border-b border-border flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Progress
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Track your fitness journey
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormMode(formMode ? null : { type: "add" })}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-smooth font-display font-bold text-lg ${
            formMode ? "btn-secondary" : "btn-accent shadow-md"
          }`}
          aria-label={formMode ? "Close form" : "Log progress"}
          data-ocid="btn-toggle-progress-form"
        >
          {formMode ? <X size={18} /> : <span>+</span>}
        </button>
      </div>

      <div className="px-4 mt-4 flex flex-col gap-4">
        {/* Form */}
        <AnimatePresence>
          {formMode && (
            <ProgressForm
              key="form"
              mode={formMode}
              onClose={handleCloseForm}
            />
          )}
        </AnimatePresence>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 rounded-xl" />
              ))}
            </div>
            <Skeleton className="h-36 rounded-xl" />
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <div
            className="card-elevated rounded-xl p-6 text-center"
            data-ocid="progress-error"
          >
            <p className="text-destructive font-display font-semibold text-sm">
              Failed to load progress data.
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Check your connection and try again.
            </p>
          </div>
        )}

        {/* Content */}
        {!isLoading && !isError && (
          <>
            {/* Stats */}
            {sorted.length > 0 && <StatsBar entries={sorted} />}

            {/* Weight trend chart */}
            <WeightTrendChart entries={sorted} />

            {/* Empty state */}
            {sorted.length === 0 && !formMode && (
              <div
                className="flex flex-col items-center justify-center py-12 gap-3 text-center"
                data-ocid="progress-empty-state"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp size={32} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-base text-foreground">
                  No entries yet
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Start logging your weight and workouts to track your progress
                  over time.
                </p>
                <button
                  type="button"
                  onClick={() => setFormMode({ type: "add" })}
                  className="btn-accent px-5 py-2.5 rounded-xl font-display font-semibold text-sm mt-1"
                  data-ocid="btn-log-first-progress"
                >
                  Log First Entry
                </button>
              </div>
            )}

            {/* Entry list */}
            {sorted.length > 0 && (
              <div className="flex flex-col gap-3" data-ocid="progress-list">
                <div className="flex items-center justify-between">
                  <p className="font-display font-semibold text-sm text-foreground">
                    All Entries
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {sorted.length} records
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {sorted.map((entry) => (
                    <ProgressCard
                      key={entry.id.toString()}
                      entry={entry}
                      onEdit={handleEdit}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAddBmiEntry,
  useAddPoints,
  useDeleteBmiEntry,
  useListBmiEntries,
} from "@/hooks/use-backend";
import type { BmiEntry } from "@/types";
import { ChevronDown, Scale, Trash2, TrendingUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

// ── BMI helpers ────────────────────────────────────────────────────────────

type BmiCategory = "Underweight" | "Normal" | "Overweight" | "Obese";

function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

const CATEGORY_STYLES: Record<
  BmiCategory,
  { badge: string; text: string; glow: string }
> = {
  Underweight: {
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    text: "text-blue-400",
    glow: "shadow-[0_0_20px_rgba(96,165,250,0.3)]",
  },
  Normal: {
    badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    text: "text-emerald-400",
    glow: "shadow-[0_0_20px_rgba(52,211,153,0.3)]",
  },
  Overweight: {
    badge: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    text: "text-yellow-400",
    glow: "shadow-[0_0_20px_rgba(251,191,36,0.3)]",
  },
  Obese: {
    badge: "bg-red-500/20 text-red-400 border-red-500/30",
    text: "text-red-400",
    glow: "shadow-[0_0_20px_rgba(248,113,113,0.3)]",
  },
};

const RECOMMENDATIONS: Record<BmiCategory, string[]> = {
  Underweight: [
    "Focus on calorie-dense whole foods like nuts, avocados, and lean proteins to gain healthy weight.",
    "Add strength training 3–4×/week to build muscle mass alongside your caloric surplus.",
    "Consult a nutritionist to create a structured meal plan tailored to your gain goals.",
  ],
  Normal: [
    "Maintain your great results with balanced meals: 40% carbs, 30% protein, 30% healthy fats.",
    "Mix cardio and strength training to preserve muscle and cardiovascular health.",
    "Stay consistent — track workouts and meals to keep your positive momentum going.",
  ],
  Overweight: [
    "Aim for a modest 300–500 kcal daily deficit through diet adjustments — avoid crash diets.",
    "Incorporate 150+ minutes of moderate cardio per week (brisk walks, cycling, swimming).",
    "Prioritize protein (0.8–1g per lb of body weight) to preserve muscle while losing fat.",
  ],
  Obese: [
    "Start with low-impact exercise (walking, swimming) and gradually increase intensity each week.",
    "Reduce ultra-processed foods and sugary drinks — even small changes compound over time.",
    "Work with a healthcare provider to set safe, realistic goals and track progress monthly.",
  ],
};

// BMI scale segments: [label, min, max, color class]
const BMI_SEGMENTS = [
  { label: "Under", min: 0, max: 18.5, color: "bg-blue-500" },
  { label: "Normal", min: 18.5, max: 25, color: "bg-emerald-500" },
  { label: "Over", min: 25, max: 30, color: "bg-yellow-500" },
  { label: "Obese", min: 30, max: 40, color: "bg-red-500" },
];

const SCALE_MIN = 10;
const SCALE_MAX = 40;

function bmiToPercent(bmi: number) {
  return Math.min(
    100,
    Math.max(0, ((bmi - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100),
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function BmiScale({ bmi }: { bmi: number }) {
  const markerPct = bmiToPercent(bmi);
  return (
    <div className="mt-4">
      <div className="relative h-3 rounded-full overflow-hidden flex">
        {BMI_SEGMENTS.map((seg) => {
          const segStart = bmiToPercent(seg.min);
          const segEnd = bmiToPercent(Math.min(seg.max, SCALE_MAX));
          return (
            <div
              key={seg.label}
              className={`h-full ${seg.color} opacity-70`}
              style={{ width: `${segEnd - segStart}%` }}
            />
          );
        })}
      </div>
      <div className="relative h-5 mt-0.5">
        <motion.div
          className="absolute top-0 -translate-x-1/2"
          initial={{ left: "50%" }}
          animate={{ left: `${markerPct}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="w-3 h-3 bg-foreground rounded-full border-2 border-background shadow-md" />
        </motion.div>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>Underweight</span>
        <span>Normal</span>
        <span>Overweight</span>
        <span>Obese</span>
      </div>
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const styles =
    CATEGORY_STYLES[category as BmiCategory] ?? CATEGORY_STYLES.Normal;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles.badge}`}
    >
      {category}
    </span>
  );
}

function BmiHistoryRow({
  entry,
  onDelete,
  deleting,
}: {
  entry: BmiEntry;
  onDelete: (id: bigint) => void;
  deleting: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center justify-between gap-3 py-3 border-b border-border last:border-0"
      data-ocid="bmi-history-row"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="text-2xl font-display font-bold text-foreground leading-none">
          {entry.bmi.toFixed(1)}
        </div>
        <div className="min-w-0">
          <CategoryBadge category={entry.category} />
          <p className="text-xs text-muted-foreground mt-1">{entry.date}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
        <span>
          {entry.height} cm · {entry.weight} kg
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
          disabled={deleting}
          onClick={() => onDelete(entry.id)}
          aria-label="Delete entry"
          data-ocid="bmi-delete-btn"
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </motion.div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function Bmi() {
  const [heightVal, setHeightVal] = useState("");
  const [weightVal, setWeightVal] = useState("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "inches">("cm");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [result, setResult] = useState<{
    bmi: number;
    category: BmiCategory;
  } | null>(null);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  const { data: entries = [], isLoading: loadingEntries } = useListBmiEntries();
  const addBmiEntry = useAddBmiEntry();
  const deleteBmiEntry = useDeleteBmiEntry();
  const addPoints = useAddPoints();

  const heightCm =
    heightUnit === "cm"
      ? Number.parseFloat(heightVal)
      : Number.parseFloat(heightVal) * 2.54;
  const weightKg =
    weightUnit === "kg"
      ? Number.parseFloat(weightVal)
      : Number.parseFloat(weightVal) * 0.453592;

  const isFormValid =
    heightVal !== "" &&
    weightVal !== "" &&
    !Number.isNaN(heightCm) &&
    !Number.isNaN(weightKg) &&
    heightCm > 50 &&
    heightCm < 300 &&
    weightKg > 10 &&
    weightKg < 500;

  async function handleCalculate() {
    if (!isFormValid) return;
    const bmi = weightKg / (heightCm / 100) ** 2;
    const category = getBmiCategory(bmi);
    setResult({ bmi, category });

    try {
      await addBmiEntry.mutateAsync({
        height: Math.round(heightCm * 10) / 10,
        weight: Math.round(weightKg * 10) / 10,
        date: new Date().toISOString().split("T")[0],
      });
      addPoints.mutate({ points: 5n, reason: "BMI calculation" });
      toast.success("BMI saved! +5 points earned 🎯");
    } catch {
      toast.error("Failed to save BMI entry");
    }
  }

  async function handleDelete(id: bigint) {
    setDeletingId(id);
    try {
      await deleteBmiEntry.mutateAsync(id);
      toast.success("Entry deleted");
    } catch {
      toast.error("Failed to delete entry");
    } finally {
      setDeletingId(null);
    }
  }

  const chartData = [...entries]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((e) => ({ date: e.date, bmi: e.bmi }));

  const category = result?.category ?? "Normal";
  const styles = CATEGORY_STYLES[category];

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
          <Scale size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-foreground leading-tight">
            BMI Calculator
          </h1>
          <p className="text-xs text-muted-foreground">
            Track your body mass index over time
          </p>
        </div>
      </motion.div>

      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-5 border border-border space-y-4"
        data-ocid="bmi-form"
      >
        {/* Height */}
        <div className="space-y-1.5">
          <label
            htmlFor="height-input"
            className="text-sm font-medium text-foreground"
          >
            Height
          </label>
          <div className="flex gap-2">
            <Input
              id="height-input"
              type="number"
              placeholder={heightUnit === "cm" ? "e.g. 175" : "e.g. 69"}
              value={heightVal}
              onChange={(e) => setHeightVal(e.target.value)}
              className="flex-1"
              data-ocid="bmi-height-input"
            />
            <button
              type="button"
              onClick={() =>
                setHeightUnit((u) => (u === "cm" ? "inches" : "cm"))
              }
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:opacity-85 transition-smooth min-w-[72px] justify-center"
              data-ocid="bmi-height-unit-toggle"
            >
              {heightUnit} <ChevronDown size={12} />
            </button>
          </div>
        </div>

        {/* Weight */}
        <div className="space-y-1.5">
          <label
            htmlFor="weight-input"
            className="text-sm font-medium text-foreground"
          >
            Weight
          </label>
          <div className="flex gap-2">
            <Input
              id="weight-input"
              type="number"
              placeholder={weightUnit === "kg" ? "e.g. 70" : "e.g. 154"}
              value={weightVal}
              onChange={(e) => setWeightVal(e.target.value)}
              className="flex-1"
              data-ocid="bmi-weight-input"
            />
            <button
              type="button"
              onClick={() => setWeightUnit((u) => (u === "kg" ? "lbs" : "kg"))}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:opacity-85 transition-smooth min-w-[72px] justify-center"
              data-ocid="bmi-weight-unit-toggle"
            >
              {weightUnit} <ChevronDown size={12} />
            </button>
          </div>
        </div>

        <Button
          className="w-full font-semibold"
          disabled={!isFormValid || addBmiEntry.isPending}
          onClick={handleCalculate}
          data-ocid="bmi-calculate-btn"
        >
          {addBmiEntry.isPending ? "Calculating…" : "Calculate BMI"}
        </Button>
      </motion.div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`bg-card rounded-2xl p-5 border border-border ${styles.glow}`}
            data-ocid="bmi-result"
          >
            <div className="flex items-end gap-3 mb-1">
              <span
                className={`font-display text-5xl font-bold leading-none ${styles.text}`}
              >
                {result.bmi.toFixed(1)}
              </span>
              <CategoryBadge category={category} />
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Based on {Math.round(heightCm)} cm height · {Math.round(weightKg)}{" "}
              kg weight
            </p>

            <BmiScale bmi={result.bmi} />

            {/* Recommendations */}
            <div className="mt-5 space-y-2">
              <p className="text-sm font-semibold text-foreground">
                Recommendations
              </p>
              {RECOMMENDATIONS[category].map((tip) => (
                <motion.div
                  key={tip}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed"
                >
                  <span
                    className={`mt-0.5 shrink-0 text-base leading-none ${styles.text}`}
                  >
                    ›
                  </span>
                  <span>{tip}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chart */}
      <AnimatePresence>
        {chartData.length >= 2 && (
          <motion.div
            key="chart"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-5 border border-border"
            data-ocid="bmi-chart"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-primary" />
              <p className="text-sm font-semibold text-foreground">
                BMI Over Time
              </p>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart
                data={chartData}
                margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
              >
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(v: string) => v.slice(5)}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                    color: "hsl(var(--foreground))",
                  }}
                  formatter={(v: number) => [v.toFixed(1), "BMI"]}
                />
                <Line
                  type="monotone"
                  dataKey="bmi"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-5 border border-border"
        data-ocid="bmi-history"
      >
        <p className="text-sm font-semibold text-foreground mb-3">History</p>

        {loadingEntries ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10 w-full rounded-lg" />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div
            className="py-8 flex flex-col items-center gap-2 text-center"
            data-ocid="bmi-empty-state"
          >
            <Scale size={28} className="text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              No entries yet — calculate your BMI above to get started.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {[...entries]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((entry) => (
                <BmiHistoryRow
                  key={String(entry.id)}
                  entry={entry}
                  onDelete={handleDelete}
                  deleting={deletingId === entry.id}
                />
              ))}
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
}

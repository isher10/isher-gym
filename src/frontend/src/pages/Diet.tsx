import { DIET_SECTIONS, MACRO_REFERENCE } from "@/data/diets";
import type { DietSection } from "@/data/diets";
import {
  ChevronDown,
  Droplets,
  ShieldCheck,
  UtensilsCrossed,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function MacroBar({
  label,
  value,
  max,
  color,
}: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-muted-foreground text-xs">{label}</span>
        <span className="text-foreground text-xs font-semibold">{value}g</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function MealBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="bg-muted/30 rounded-xl p-3">
      <p className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="flex flex-col gap-1.5">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0 mt-1.5" />
            <p className="text-foreground text-xs leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionCard({
  section,
  isOpen,
  onToggle,
}: { section: DietSection; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="card-elevated rounded-2xl overflow-hidden"
      data-ocid={`diet-section-${section.id}`}
    >
      {/* Header / Toggle */}
      <button
        type="button"
        onClick={onToggle}
        data-ocid={`diet-toggle-${section.id}`}
        className="w-full flex items-center justify-between p-4 text-left transition-smooth active:opacity-80"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-11 h-11 rounded-xl ${section.bgAccent} flex items-center justify-center shrink-0 text-2xl`}
          >
            {section.emoji}
          </div>
          <div className="min-w-0">
            <h2
              className={`font-display font-bold text-base ${section.accentColor}`}
            >
              {section.title}
            </h2>
            <p className="text-muted-foreground text-xs truncate">
              {section.subtitle}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="shrink-0 ml-2"
        >
          <ChevronDown size={20} className="text-muted-foreground" />
        </motion.div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-4 pb-5 flex flex-col gap-5 border-t border-border pt-4">
              {/* Goal Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {section.goalDescription}
              </p>

              {/* Daily Macros */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold text-sm text-foreground">
                    Daily Macros
                  </h3>
                  <span
                    className={`text-xs font-display font-bold ${section.accentColor}`}
                  >
                    {section.macros.calories} kcal
                  </span>
                </div>
                <div className="bg-muted/30 rounded-xl p-3 flex flex-col gap-3">
                  <MacroBar
                    label="Protein"
                    value={section.macros.protein}
                    max={250}
                    color="bg-primary"
                  />
                  <MacroBar
                    label="Carbohydrates"
                    value={section.macros.carbs}
                    max={450}
                    color="bg-blue-500"
                  />
                  <MacroBar
                    label="Fat"
                    value={section.macros.fat}
                    max={120}
                    color="bg-yellow-500"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {[
                    {
                      label: "Protein",
                      value: `${section.macros.protein}g`,
                      color: "text-primary",
                    },
                    {
                      label: "Carbs",
                      value: `${section.macros.carbs}g`,
                      color: "text-blue-400",
                    },
                    {
                      label: "Fat",
                      value: `${section.macros.fat}g`,
                      color: "text-yellow-400",
                    },
                  ].map(({ label, value, color }) => (
                    <div
                      key={label}
                      className="bg-muted/40 rounded-lg p-2 text-center"
                    >
                      <p className={`font-display font-bold text-sm ${color}`}>
                        {value}
                      </p>
                      <p className="text-muted-foreground text-xs">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Meals */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <UtensilsCrossed size={14} className={section.accentColor} />
                  <h3 className="font-display font-semibold text-sm text-foreground">
                    Sample Meal Ideas
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <MealBlock
                    label="Breakfast"
                    items={section.meals.breakfast.slice(0, 3)}
                  />
                  <MealBlock
                    label="Lunch"
                    items={section.meals.lunch.slice(0, 3)}
                  />
                  <MealBlock
                    label="Dinner"
                    items={section.meals.dinner.slice(0, 3)}
                  />
                  <MealBlock
                    label="Snack"
                    items={section.meals.snack.slice(0, 3)}
                  />
                </div>
              </div>

              {/* Hydration Tips */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Droplets size={14} className="text-blue-400" />
                  <h3 className="font-display font-semibold text-sm text-foreground">
                    Hydration Tips
                  </h3>
                </div>
                <div className="bg-muted/30 rounded-xl p-3 flex flex-col gap-2">
                  {section.hydrationTips.map((tip) => (
                    <div key={tip} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                      <p className="text-foreground text-xs leading-relaxed">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Foods Grid: Prioritize + Avoid */}
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <h3 className="font-display font-semibold text-xs text-foreground uppercase tracking-wide">
                      Foods to Prioritize
                    </h3>
                  </div>
                  <div className="bg-emerald-900/20 border border-emerald-900/40 rounded-xl p-3 flex flex-col gap-1.5">
                    {section.foodsToPrioritize.map((food) => (
                      <div key={food} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                        <p className="text-foreground text-xs leading-relaxed">
                          {food}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle size={14} className="text-red-400" />
                    <h3 className="font-display font-semibold text-xs text-foreground uppercase tracking-wide">
                      Foods to Avoid
                    </h3>
                  </div>
                  <div className="bg-red-900/20 border border-red-900/40 rounded-xl p-3 flex flex-col gap-1.5">
                    {section.foodsToAvoid.map((food) => (
                      <div key={food} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                        <p className="text-foreground text-xs leading-relaxed">
                          {food}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Diet() {
  const [openId, setOpenId] = useState<string>("beginner");

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? "" : id));

  return (
    <div className="flex flex-col pb-8">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 bg-card border-b border-border">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Diet Plans
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Nutrition guides tailored to your goal
        </p>
      </div>

      {/* Section Cards */}
      <div className="px-4 pt-5 flex flex-col gap-3">
        {DIET_SECTIONS.map((section, i) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.35 }}
          >
            <SectionCard
              section={section}
              isOpen={openId === section.id}
              onToggle={() => toggle(section.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Macro Reference Chart */}
      <div className="px-4 mt-6">
        <h3 className="font-display font-bold text-base text-foreground mb-3">
          📊 Macro Reference Chart
        </h3>
        <div className="card-elevated rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-0 bg-muted/60 border-b border-border">
            {["Food", "Cal", "P(g)", "C(g)", "F(g)"].map((col) => (
              <div key={col} className="px-2.5 py-2.5 text-center">
                <span className="text-muted-foreground text-xs font-semibold font-display uppercase">
                  {col}
                </span>
              </div>
            ))}
          </div>
          {/* Table rows */}
          {MACRO_REFERENCE.map((row, i) => (
            <div
              key={row.food}
              className={`grid grid-cols-[1fr_auto_auto_auto_auto] gap-0 border-b border-border/50 last:border-0 ${
                i % 2 === 0 ? "bg-background" : "bg-card"
              }`}
              data-ocid={`macro-row-${row.food.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="px-2.5 py-2.5 min-w-0">
                <p className="text-foreground text-xs font-semibold truncate">
                  {row.food}
                </p>
                <p className="text-muted-foreground text-[10px]">
                  {row.serving}
                </p>
              </div>
              <div className="px-2.5 py-2.5 flex items-center justify-center">
                <span className="text-primary text-xs font-bold font-display">
                  {row.calories}
                </span>
              </div>
              <div className="px-2.5 py-2.5 flex items-center justify-center">
                <span className="text-orange-400 text-xs font-semibold">
                  {row.protein}
                </span>
              </div>
              <div className="px-2.5 py-2.5 flex items-center justify-center">
                <span className="text-blue-400 text-xs font-semibold">
                  {row.carbs}
                </span>
              </div>
              <div className="px-2.5 py-2.5 flex items-center justify-center">
                <span className="text-yellow-400 text-xs font-semibold">
                  {row.fat}
                </span>
              </div>
            </div>
          ))}
          {/* Legend */}
          <div className="px-3 py-2.5 bg-muted/30 flex gap-4 flex-wrap">
            {[
              { label: "Calories", color: "bg-primary" },
              { label: "Protein", color: "bg-orange-400" },
              { label: "Carbs", color: "bg-blue-400" },
              { label: "Fat", color: "bg-yellow-400" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-muted-foreground text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Tip Banner */}
      <div className="px-4 mt-5">
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-2xl shrink-0">💡</span>
          <div>
            <p className="font-display font-semibold text-sm text-primary mb-1">
              Pro Tip
            </p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Consistency beats perfection. Eating well 80% of the time is far
              better than an extreme diet you can't maintain. Start small, build
              habits, and progress will follow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

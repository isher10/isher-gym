import { DIET_SECTIONS, MACRO_REFERENCE } from "@/data/diets";
import type { DietSection, MealItem } from "@/data/diets";
import {
  ChevronDown,
  Droplets,
  Flame,
  Leaf,
  ShieldCheck,
  UtensilsCrossed,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Language = "en" | "hi";
type VegFilter = "all" | "veg" | "nonveg";

// ── MacroBar ─────────────────────────────────────────────────────────────────
function MacroBar({
  labelEn,
  labelHi,
  value,
  max,
  color,
  lang,
}: {
  labelEn: string;
  labelHi: string;
  value: number;
  max: number;
  color: string;
  lang: Language;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-muted-foreground text-xs">
          {lang === "hi" ? labelHi : labelEn}
        </span>
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

// ── VegBadge ──────────────────────────────────────────────────────────────────
function VegBadge({ isVeg }: { isVeg: boolean }) {
  return isVeg ? (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-400 bg-emerald-900/30 rounded px-1.5 py-0.5">
      <Leaf size={9} />
      VEG
    </span>
  ) : (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-orange-400 bg-orange-900/30 rounded px-1.5 py-0.5">
      <Flame size={9} />
      NON-VEG
    </span>
  );
}

// ── MealCard ──────────────────────────────────────────────────────────────────
function MealCard({ meal, lang }: { meal: MealItem; lang: Language }) {
  const TIME_LABELS: Record<string, { en: string; hi: string }> = {
    breakfast: { en: "Breakfast", hi: "नाश्ता" },
    lunch: { en: "Lunch", hi: "दोपहर का खाना" },
    dinner: { en: "Dinner", hi: "रात का खाना" },
    snack: { en: "Snack", hi: "स्नैक" },
  };
  const timeLabel = TIME_LABELS[meal.time] ?? { en: meal.time, hi: meal.time };

  return (
    <div
      className="bg-muted/30 rounded-xl overflow-hidden flex flex-col"
      data-ocid={`meal-card-${meal.id}`}
    >
      <div className="relative">
        <img
          src={meal.photoUrl}
          alt={meal.name}
          loading="lazy"
          className="w-full h-28 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute top-1.5 left-1.5">
          <VegBadge isVeg={meal.isVeg} />
        </div>
        <div className="absolute top-1.5 right-1.5">
          <span className="text-[10px] font-semibold bg-background/80 text-muted-foreground rounded px-1.5 py-0.5 backdrop-blur-sm">
            {lang === "hi" ? timeLabel.hi : timeLabel.en}
          </span>
        </div>
      </div>
      <div className="p-2.5 flex flex-col gap-1 flex-1">
        <p className="text-foreground text-xs font-semibold leading-tight">
          {lang === "hi" ? meal.nameHindi : meal.name}
        </p>
        <p className="text-muted-foreground text-[10px] leading-relaxed">
          {lang === "hi" ? meal.descriptionHindi : meal.description}
        </p>
        <div className="mt-1 flex flex-col gap-0.5">
          {meal.items.slice(0, 2).map((item) => (
            <div key={item} className="flex items-start gap-1.5">
              <div className="w-1 h-1 rounded-full bg-primary/60 shrink-0 mt-1.5" />
              <p className="text-muted-foreground text-[10px] leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SectionCard ───────────────────────────────────────────────────────────────
function SectionCard({
  section,
  isOpen,
  onToggle,
  lang,
  vegFilter,
}: {
  section: DietSection;
  isOpen: boolean;
  onToggle: () => void;
  lang: Language;
  vegFilter: VegFilter;
}) {
  const filteredMeals = section.mealItems.filter((m) => {
    if (vegFilter === "veg") return m.isVeg;
    if (vegFilter === "nonveg") return !m.isVeg;
    return true;
  });

  const MACRO_LABELS = [
    {
      labelEn: "Protein",
      labelHi: "प्रोटीन",
      value: section.macros.protein,
      max: 250,
      color: "bg-primary",
      dispColor: "text-primary",
    },
    {
      labelEn: "Carbohydrates",
      labelHi: "कार्बोहाइड्रेट",
      value: section.macros.carbs,
      max: 450,
      color: "bg-blue-500",
      dispColor: "text-blue-400",
    },
    {
      labelEn: "Fat",
      labelHi: "वसा",
      value: section.macros.fat,
      max: 120,
      color: "bg-yellow-500",
      dispColor: "text-yellow-400",
    },
  ];

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
              {lang === "hi" ? section.titleHindi : section.title}
            </h2>
            <p className="text-muted-foreground text-xs truncate">
              {lang === "hi" ? section.subtitleHindi : section.subtitle}
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
                {lang === "hi"
                  ? section.goalDescriptionHindi
                  : section.goalDescription}
              </p>

              {/* Daily Macros */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold text-sm text-foreground">
                    {lang === "hi" ? "दैनिक मैक्रोज़" : "Daily Macros"}
                  </h3>
                  <span
                    className={`text-xs font-display font-bold ${section.accentColor}`}
                  >
                    {section.macros.calories} kcal
                  </span>
                </div>
                <div className="bg-muted/30 rounded-xl p-3 flex flex-col gap-3">
                  {MACRO_LABELS.map(
                    ({ labelEn, labelHi, value, max, color }) => (
                      <MacroBar
                        key={labelEn}
                        labelEn={labelEn}
                        labelHi={labelHi}
                        value={value}
                        max={max}
                        color={color}
                        lang={lang}
                      />
                    ),
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {MACRO_LABELS.map(
                    ({ labelEn, labelHi, value, dispColor }) => (
                      <div
                        key={labelEn}
                        className="bg-muted/40 rounded-lg p-2 text-center"
                      >
                        <p
                          className={`font-display font-bold text-sm ${dispColor}`}
                        >
                          {value}g
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {lang === "hi" ? labelHi : labelEn}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Meal Cards */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <UtensilsCrossed size={14} className={section.accentColor} />
                  <h3 className="font-display font-semibold text-sm text-foreground">
                    {lang === "hi" ? "भोजन विचार" : "Meal Ideas"}
                  </h3>
                  {filteredMeals.length === 0 && (
                    <span className="text-xs text-muted-foreground ml-auto">
                      {lang === "hi" ? "कोई मिलान नहीं" : "No matches"}
                    </span>
                  )}
                </div>
                {filteredMeals.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {filteredMeals.map((meal) => (
                      <MealCard key={meal.id} meal={meal} lang={lang} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-muted/20 rounded-xl p-4 text-center">
                    <p className="text-muted-foreground text-sm">
                      {lang === "hi"
                        ? "इस फ़िल्टर के लिए कोई भोजन नहीं"
                        : "No meals for this filter"}
                    </p>
                  </div>
                )}
              </div>

              {/* Hydration Tips */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Droplets size={14} className="text-blue-400" />
                  <h3 className="font-display font-semibold text-sm text-foreground">
                    {lang === "hi" ? "हाइड्रेशन टिप्स" : "Hydration Tips"}
                  </h3>
                </div>
                <div className="bg-muted/30 rounded-xl p-3 flex flex-col gap-2">
                  {(lang === "hi"
                    ? section.hydrationTipsHindi
                    : section.hydrationTips
                  ).map((tip) => (
                    <div key={tip} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                      <p className="text-foreground text-xs leading-relaxed">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Foods Grid */}
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <h3 className="font-display font-semibold text-xs text-foreground uppercase tracking-wide">
                      {lang === "hi"
                        ? "प्राथमिकता वाले खाद्य पदार्थ"
                        : "Foods to Prioritize"}
                    </h3>
                  </div>
                  <div className="bg-emerald-900/20 border border-emerald-900/40 rounded-xl p-3 flex flex-col gap-1.5">
                    {(lang === "hi"
                      ? section.foodsToPrioritizeHindi
                      : section.foodsToPrioritize
                    ).map((food) => (
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
                      {lang === "hi" ? "परहेज करें" : "Foods to Avoid"}
                    </h3>
                  </div>
                  <div className="bg-red-900/20 border border-red-900/40 rounded-xl p-3 flex flex-col gap-1.5">
                    {(lang === "hi"
                      ? section.foodsToAvoidHindi
                      : section.foodsToAvoid
                    ).map((food) => (
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

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Diet() {
  const [openId, setOpenId] = useState<string>("beginner");
  const [lang, setLang] = useState<Language>("en");
  const [vegFilter, setVegFilter] = useState<VegFilter>("all");

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? "" : id));

  return (
    <div className="flex flex-col pb-8">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 bg-card border-b border-border">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {lang === "hi" ? "डाइट प्लान" : "Diet Plans"}
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {lang === "hi"
                ? "आपके लक्ष्य के अनुसार पोषण गाइड"
                : "Nutrition guides tailored to your goal"}
            </p>
          </div>
          {/* Language Toggle */}
          <button
            type="button"
            onClick={() => setLang((l) => (l === "en" ? "hi" : "en"))}
            data-ocid="lang-toggle"
            className="shrink-0 flex items-center gap-0 bg-muted rounded-lg overflow-hidden border border-border text-xs font-semibold"
          >
            <span
              className={`px-2.5 py-1.5 transition-colors ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              EN
            </span>
            <span
              className={`px-2.5 py-1.5 transition-colors ${lang === "hi" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              हि
            </span>
          </button>
        </div>

        {/* Veg / Non-Veg Filter */}
        <div className="flex gap-2 mt-3" data-ocid="veg-filter">
          {(["all", "veg", "nonveg"] as VegFilter[]).map((f) => {
            const labels: Record<VegFilter, { en: string; hi: string }> = {
              all: { en: "All", hi: "सभी" },
              veg: { en: "🥦 Veg", hi: "🥦 शाकाहारी" },
              nonveg: { en: "🍗 Non-Veg", hi: "🍗 मांसाहारी" },
            };
            return (
              <button
                key={f}
                type="button"
                onClick={() => setVegFilter(f)}
                data-ocid={`veg-filter-${f}`}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                  vegFilter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/40 text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {lang === "hi" ? labels[f].hi : labels[f].en}
              </button>
            );
          })}
        </div>
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
              lang={lang}
              vegFilter={vegFilter}
            />
          </motion.div>
        ))}
      </div>

      {/* Macro Reference Chart */}
      <div className="px-4 mt-6">
        <h3 className="font-display font-bold text-base text-foreground mb-3">
          📊 {lang === "hi" ? "मैक्रो रेफरेंस चार्ट" : "Macro Reference Chart"}
        </h3>
        <div className="card-elevated rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-0 bg-muted/60 border-b border-border">
            {[
              lang === "hi" ? "खाना" : "Food",
              "Cal",
              "P(g)",
              "C(g)",
              "F(g)",
            ].map((col) => (
              <div key={col} className="px-2.5 py-2.5 text-center">
                <span className="text-muted-foreground text-xs font-semibold font-display uppercase">
                  {col}
                </span>
              </div>
            ))}
          </div>
          {MACRO_REFERENCE.map((row, i) => (
            <div
              key={row.food}
              className={`grid grid-cols-[1fr_auto_auto_auto_auto] gap-0 border-b border-border/50 last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-card"}`}
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
          <div className="px-3 py-2.5 bg-muted/30 flex gap-4 flex-wrap">
            {[
              {
                label: lang === "hi" ? "कैलोरी" : "Calories",
                color: "bg-primary",
              },
              {
                label: lang === "hi" ? "प्रोटीन" : "Protein",
                color: "bg-orange-400",
              },
              {
                label: lang === "hi" ? "कार्ब्स" : "Carbs",
                color: "bg-blue-400",
              },
              { label: lang === "hi" ? "वसा" : "Fat", color: "bg-yellow-400" },
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
              {lang === "hi" ? "प्रो टिप" : "Pro Tip"}
            </p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {lang === "hi"
                ? "नियमितता ही सफलता है। 80% समय सही खाना एक अत्यधिक डाइट से बेहतर है जो आप बनाए नहीं रख सकते। छोटे बदलावों से शुरुआत करें।"
                : "Consistency beats perfection. Eating well 80% of the time is far better than an extreme diet you can't maintain. Start small, build habits, and progress will follow."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

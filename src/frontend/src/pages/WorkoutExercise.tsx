import { WORKOUT_CATEGORIES } from "@/data/workouts";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  Languages,
  Lightbulb,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type BenefitType = "strength" | "fat-loss" | "muscle-gain" | "endurance";
type Lang = "en" | "hi";

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

const DIFFICULTY_HI: Record<string, string> = {
  Beginner: "शुरुआती",
  Intermediate: "मध्यम",
  Advanced: "उन्नत",
};

const BEGINNER_TIPS: Record<string, { en: string; hi: string }> = {
  chest: {
    en: "Focus on form before adding weight. Use a spotter for bench press and keep your back flat on the bench.",
    hi: "वजन बढ़ाने से पहले सही फॉर्म पर ध्यान दें। बेंच प्रेस के लिए स्पॉटर रखें और पीठ बेंच पर सपाट रखें।",
  },
  back: {
    en: "Never round your lower back under load. Think about driving elbows down and back during pulling movements.",
    hi: "वजन के नीचे कभी कमर मत झुकाएं। खींचने वाले मूवमेंट में कोहनियां नीचे और पीछे धकेलने का सोचें।",
  },
  legs: {
    en: "Squat depth comes with flexibility. Practice bodyweight squats daily to improve your range of motion.",
    hi: "स्क्वाट की गहराई लचीलेपन से आती है। रेंज ऑफ मोशन सुधारने के लिए रोज बॉडीवेट स्क्वाट करें।",
  },
  arms: {
    en: "Resist the urge to swing for extra reps. Strict form activates more muscle fibers and prevents injury.",
    hi: "अतिरिक्त रेप के लिए झुलाने की इच्छा रोकें। सख्त फॉर्म ज्यादा मांसपेशी फाइबर सक्रिय करती है।",
  },
  shoulders: {
    en: "Warm up the rotator cuffs before heavy pressing. Use face pulls and band pull-aparts before every shoulder session.",
    hi: "भारी प्रेस से पहले रोटेटर कफ वार्म-अप करें। हर शोल्डर सेशन से पहले फेस पुल करें।",
  },
  abs: {
    en: "Abs are built in the gym but revealed in the kitchen. Combine core training with a solid diet for visible results.",
    hi: "एब्स जिम में बनते हैं लेकिन किचन में दिखते हैं। दिखने वाले नतीजों के लिए कोर ट्रेनिंग के साथ अच्छी डाइट भी जरूरी है।",
  },
};

function parseBenefit(raw: string): { type: BenefitType; label: string } {
  const colonIdx = raw.indexOf(":");
  if (colonIdx === -1) return { type: "strength", label: raw };
  const type = raw.slice(0, colonIdx) as BenefitType;
  const label = raw.slice(colonIdx + 1);
  return { type: type in BENEFIT_META ? type : "strength", label };
}

export default function WorkoutExercise() {
  const { category, exercise } = useParams({
    from: "/workouts/$category/$exercise",
  });
  const [lang, setLang] = useState<Lang>("en");

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

  const isHindi = lang === "hi";
  const parsedBenefits = ex.benefits.map(parseBenefit);
  const tipData = BEGINNER_TIPS[cat.id] ?? {
    en: "Always warm up before this exercise. Master form with lighter weights before progressing.",
    hi: "इस एक्सरसाइज से पहले हमेशा वार्म-अप करें। हल्के वजन से सही फॉर्म सीखें।",
  };
  const tipText = isHindi ? tipData.hi : tipData.en;

  const displayName = isHindi && ex.nameHindi ? ex.nameHindi : ex.name;
  const displayTarget =
    isHindi && ex.targetMuscleHindi ? ex.targetMuscleHindi : ex.targetMuscle;
  const displayDescription =
    isHindi && ex.descriptionHindi ? ex.descriptionHindi : ex.description;
  const displaySteps =
    isHindi && ex.stepsHindi?.length ? ex.stepsHindi : ex.steps;
  const displayWhenToDoIt =
    isHindi && ex.whenToDoItHindi ? ex.whenToDoItHindi : ex.whenToDoIt;

  return (
    <div className="flex flex-col pb-8">
      {/* Sub-header */}
      <div className="px-4 pt-4 pb-5 bg-card border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/workouts/$category"
            params={{ category: cat.id }}
            className="inline-flex items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground transition-colors"
            data-ocid="back-to-category"
          >
            <ArrowLeft size={16} />
            {cat.name}
          </Link>

          {/* Language toggle */}
          <button
            type="button"
            onClick={() => setLang(isHindi ? "en" : "hi")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
            data-ocid="lang-toggle"
            aria-label="Toggle language"
          >
            <Languages size={13} className="text-primary" />
            <span className={!isHindi ? "text-foreground font-semibold" : ""}>
              EN
            </span>
            <span className="text-border">|</span>
            <span className={isHindi ? "text-foreground font-semibold" : ""}>
              हिंदी
            </span>
          </button>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <span className="text-2xl leading-none">{cat.icon}</span>
          </div>
          <div className="min-w-0 flex-1">
            <motion.h1
              key={displayName}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="font-display text-xl font-bold text-foreground leading-tight"
            >
              {displayName}
            </motion.h1>
            {isHindi && ex.name && (
              <p className="text-muted-foreground text-xs mt-0.5">{ex.name}</p>
            )}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${DIFFICULTY_STYLES[ex.difficulty] ?? ""}`}
              >
                {isHindi
                  ? (DIFFICULTY_HI[ex.difficulty] ?? ex.difficulty)
                  : ex.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Target size={11} />
                {displayTarget}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 flex flex-col gap-6">
        {/* Exercise Photo */}
        {ex.photoUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full rounded-2xl overflow-hidden aspect-video"
          >
            <img
              src={ex.photoUrl}
              alt={ex.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
              <span className="text-lg">{cat.icon}</span>
              <span className="text-white text-xs font-semibold font-display drop-shadow">
                {cat.name} Training
              </span>
            </div>
          </motion.div>
        )}

        {/* Description */}
        <motion.p
          key={displayDescription}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-muted-foreground text-sm leading-relaxed"
        >
          {displayDescription}
        </motion.p>

        {/* Duration + When to do */}
        {(ex.duration || ex.whenToDoIt) && (
          <div className="flex flex-col gap-3">
            {ex.duration && (
              <div className="flex items-start gap-3 card-elevated rounded-xl p-3.5">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <Clock size={15} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5">
                    {isHindi ? "अवधि" : "Duration"}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {ex.duration}
                  </p>
                </div>
              </div>
            )}
            {displayWhenToDoIt && (
              <div className="flex items-start gap-3 card-elevated rounded-xl p-3.5">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <Calendar size={15} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5">
                    {isHindi ? "कब करें" : "When to Do It"}
                  </p>
                  <p className="text-sm text-foreground leading-snug">
                    {displayWhenToDoIt}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

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
                  {isHindi ? "सेट्स" : "Sets"}
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
                <p className="text-primary font-display font-bold text-2xl leading-none">
                  {ex.reps}
                </p>
                <p className="text-muted-foreground text-xs mt-1 uppercase tracking-wide">
                  {isHindi ? "रेप्स" : "Reps"}
                </p>
              </motion.div>
            )}
          </div>
        )}

        {/* Benefits */}
        <div>
          <h2 className="font-display font-bold text-base text-foreground mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" />
            {isHindi ? "फायदे" : "Benefits"}
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
            {isHindi ? "कैसे करें (चरण-दर-चरण)" : "Step-by-Step Instructions"}
          </h2>
          <div className="flex flex-col gap-4">
            {displaySteps.map((step, i) => (
              <motion.div
                key={`step-${cat.id}-${ex.id}-${i}`}
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
              {isHindi ? "शुरुआती टिप" : "Beginner Tip"}
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
          {isHindi ? `${cat.name} पर वापस जाएं` : `Back to ${cat.name}`}
        </Link>
      </div>
    </div>
  );
}

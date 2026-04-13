export interface ProgressEntry {
  id: bigint;
  weight: number;
  date: string;
  notes: string;
  workoutsCompleted: bigint;
}

export interface Exercise {
  id: string;
  name: string;
  nameHindi?: string;
  targetMuscle: string;
  targetMuscleHindi?: string;
  description: string;
  descriptionHindi?: string;
  steps: string[];
  stepsHindi?: string[];
  benefits: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  sets?: string;
  reps?: string;
  duration?: string;
  whenToDoIt?: string;
  whenToDoItHindi?: string;
  photoUrl?: string;
}

export interface WorkoutCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  exercises: Exercise[];
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  period: "month" | "year";
  features: string[];
  highlighted?: boolean;
}

export interface DietPlan {
  id: string;
  title: string;
  goal: "weight-loss" | "weight-gain" | "maintenance";
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: DietMeal[];
}

export interface DietMeal {
  name: string;
  nameHindi?: string;
  time: string;
  foods: string[];
  calories: number;
  descriptionHindi?: string;
  isVeg?: boolean;
  photoUrl?: string;
}

export type ProgressFormData = {
  weight: string;
  workoutsCompleted: string;
  notes: string;
  date: string;
};

// ── New feature types ──────────────────────────────────────────────────────

export interface ChallengeTemplate {
  id: bigint;
  name: string;
  description: string;
  durationDays: bigint;
  goal: string;
  difficulty: string;
  exercises: string[];
}

export interface UserChallenge {
  id: bigint;
  templateId: bigint;
  startDate: string;
  currentDay: bigint;
  completed: boolean;
  badgeEarned: boolean;
}

export interface ReminderSettings {
  enabled: boolean;
  time: string;
  restDays: bigint[];
}

export interface GamificationProfile {
  points: bigint;
  level: bigint;
  badges: string[];
  totalWorkoutsLogged: bigint;
  totalChallengesCompleted: bigint;
  lastActivityDate: string;
}

export interface BmiEntry {
  id: bigint;
  height: number;
  weight: number;
  bmi: number;
  category: string;
  date: string;
}

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredPoints?: number;
  requiredChallenges?: number;
  requiredWorkouts?: number;
}

export interface FeedbackEntry {
  id: bigint;
  name: string;
  photoUrl: string;
  message: string;
  date: string;
}

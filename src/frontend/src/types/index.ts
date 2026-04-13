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
  targetMuscle: string;
  description: string;
  steps: string[];
  benefits: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  sets?: string;
  reps?: string;
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
  time: string;
  foods: string[];
  calories: number;
}

export type ProgressFormData = {
  weight: string;
  workoutsCompleted: string;
  notes: string;
  date: string;
};

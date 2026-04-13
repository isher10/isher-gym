import type { backendInterface, BmiEntry, ChallengeTemplate, FeedbackEntry, GamificationProfile, ProgressEntry, ReminderSettings, UserChallenge } from "../backend";

const sampleProgress: ProgressEntry[] = [
  { id: BigInt(1), weight: 75.5, date: "2026-04-10", notes: "Great workout today!", workoutsCompleted: BigInt(12) },
  { id: BigInt(2), weight: 74.8, date: "2026-04-12", notes: "Feeling stronger", workoutsCompleted: BigInt(15) },
];

const sampleChallengeTemplates: ChallengeTemplate[] = [
  { id: BigInt(1), name: "7-Day Fat Burn", description: "High-intensity cardio challenge", durationDays: BigInt(7), goal: "fat_loss", difficulty: "medium", exercises: ["Burpees", "Jump Rope", "Mountain Climbers"] },
  { id: BigInt(2), name: "30-Day Muscle Gain", description: "Progressive strength training", durationDays: BigInt(30), goal: "muscle_gain", difficulty: "hard", exercises: ["Bench Press", "Squats", "Deadlifts"] },
];

const sampleUserChallenges: UserChallenge[] = [];
const sampleBmiEntries: BmiEntry[] = [];
const sampleFeedbackEntries: FeedbackEntry[] = [
  { id: BigInt(1), name: "Rajesh Kumar", photoUrl: "", message: "Isher Gym ne meri zindagi badal di! 3 mahine mein 8 kg weight loss hua. Trainers bahut helpful hain aur equipment top-notch hai. Highly recommended!", date: "2026-03-15" },
  { id: BigInt(2), name: "Priya Sharma", photoUrl: "", message: "Best gym in the area! The staff is very supportive and the workout plans are excellent. I've seen amazing results in just 2 months. Thank you Isher Gym!", date: "2026-03-28" },
  { id: BigInt(3), name: "Amit Singh", photoUrl: "", message: "Yahan ka mahaul bahut acha hai. Gym saaf-suthra hai aur sab log bahut friendly hain. Muscle gain ke liye perfect jagah hai. 💪", date: "2026-04-05" },
];

let sampleGamification: GamificationProfile = {
  points: BigInt(250),
  level: BigInt(2),
  badges: ["first_workout", "week_streak"],
  totalWorkoutsLogged: BigInt(15),
  totalChallengesCompleted: BigInt(1),
  lastActivityDate: "2026-04-12",
};

let sampleReminderSettings: ReminderSettings | null = {
  enabled: true,
  time: "07:00",
  restDays: [BigInt(0), BigInt(6)],
};

export const mockBackend: backendInterface = {
  // Progress
  addProgress: async (weight, workoutsCompleted, notes, date): Promise<ProgressEntry> => ({
    id: BigInt(Date.now()),
    weight,
    date,
    notes,
    workoutsCompleted,
  }),
  deleteProgress: async (_id) => true,
  listProgress: async () => sampleProgress,
  updateProgress: async (_id, _weight, _workoutsCompleted, _notes, _date) => true,

  // Challenge Templates
  addChallengeTemplate: async (name, description, durationDays, goal, difficulty, exercises): Promise<ChallengeTemplate> => ({
    id: BigInt(Date.now()),
    name,
    description,
    durationDays,
    goal,
    difficulty,
    exercises,
  }),
  deleteChallengeTemplate: async (_id) => true,
  listChallengeTemplates: async () => sampleChallengeTemplates,

  // User Challenges
  addUserChallenge: async (templateId, startDate): Promise<UserChallenge> => {
    const uc: UserChallenge = { id: BigInt(Date.now()), templateId, startDate, currentDay: BigInt(1), completed: false, badgeEarned: false };
    sampleUserChallenges.push(uc);
    return uc;
  },
  deleteUserChallenge: async (_id) => true,
  listUserChallenges: async () => sampleUserChallenges,
  updateChallengeProgress: async (_id, _currentDay, _completed, _badgeEarned) => true,

  // Reminder Settings
  getReminderSettings: async () => sampleReminderSettings,
  saveReminderSettings: async (enabled, time, restDays): Promise<ReminderSettings> => {
    sampleReminderSettings = { enabled, time, restDays };
    return sampleReminderSettings;
  },

  // Gamification
  getGamificationProfile: async () => sampleGamification,
  addPoints: async (amount, _reason): Promise<GamificationProfile> => {
    sampleGamification = { ...sampleGamification, points: sampleGamification.points + amount };
    return sampleGamification;
  },
  unlockBadge: async (badgeId) => {
    if (!sampleGamification.badges.includes(badgeId)) {
      sampleGamification = { ...sampleGamification, badges: [...sampleGamification.badges, badgeId] };
    }
    return true;
  },
  resetGamification: async () => {
    sampleGamification = { points: BigInt(0), level: BigInt(1), badges: [], totalWorkoutsLogged: BigInt(0), totalChallengesCompleted: BigInt(0), lastActivityDate: "" };
  },

  // BMI
  addBmiEntry: async (height, weight, date): Promise<BmiEntry> => {
    const bmi = weight / ((height / 100) * (height / 100));
    let category = "Normal";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi >= 25 && bmi < 30) category = "Overweight";
    else if (bmi >= 30) category = "Obese";
    const entry: BmiEntry = { id: BigInt(Date.now()), height, weight, bmi, category, date };
    sampleBmiEntries.push(entry);
    return entry;
  },
  deleteBmiEntry: async (_id) => true,
  listBmiEntries: async () => sampleBmiEntries,

  // Feedback
  addFeedback: async (name, photoUrl, message, date): Promise<bigint> => {
    const id = BigInt(Date.now());
    sampleFeedbackEntries.push({ id, name, photoUrl, message, date });
    return id;
  },
  deleteFeedback: async (_id) => true,
  listFeedback: async () => sampleFeedbackEntries,
};

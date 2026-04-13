import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ReminderSettings {
    time: string;
    enabled: boolean;
    restDays: Array<bigint>;
}
export interface UserChallenge {
    id: bigint;
    templateId: bigint;
    completed: boolean;
    badgeEarned: boolean;
    currentDay: bigint;
    startDate: string;
}
export interface BmiEntry {
    id: bigint;
    bmi: number;
    weight: number;
    height: number;
    date: string;
    category: string;
}
export interface ProgressEntry {
    id: bigint;
    weight: number;
    date: string;
    notes: string;
    workoutsCompleted: bigint;
}
export interface FeedbackEntry {
    id: bigint;
    date: string;
    name: string;
    photoUrl: string;
    message: string;
}
export interface ChallengeTemplate {
    id: bigint;
    durationDays: bigint;
    goal: string;
    difficulty: string;
    name: string;
    exercises: Array<string>;
    description: string;
}
export interface GamificationProfile {
    totalChallengesCompleted: bigint;
    badges: Array<string>;
    lastActivityDate: string;
    totalWorkoutsLogged: bigint;
    level: bigint;
    points: bigint;
}
export interface backendInterface {
    addBmiEntry(height: number, weight: number, date: string): Promise<BmiEntry>;
    addChallengeTemplate(name: string, description: string, durationDays: bigint, goal: string, difficulty: string, exercises: Array<string>): Promise<ChallengeTemplate>;
    addFeedback(name: string, photoUrl: string, message: string, date: string): Promise<bigint>;
    addPoints(amount: bigint, reason: string): Promise<GamificationProfile>;
    addProgress(weight: number, workoutsCompleted: bigint, notes: string, date: string): Promise<ProgressEntry>;
    addUserChallenge(templateId: bigint, startDate: string): Promise<UserChallenge>;
    deleteBmiEntry(id: bigint): Promise<boolean>;
    deleteChallengeTemplate(id: bigint): Promise<boolean>;
    deleteFeedback(id: bigint): Promise<boolean>;
    deleteProgress(id: bigint): Promise<boolean>;
    deleteUserChallenge(id: bigint): Promise<boolean>;
    getGamificationProfile(): Promise<GamificationProfile>;
    getReminderSettings(): Promise<ReminderSettings | null>;
    listBmiEntries(): Promise<Array<BmiEntry>>;
    listChallengeTemplates(): Promise<Array<ChallengeTemplate>>;
    listFeedback(): Promise<Array<FeedbackEntry>>;
    listProgress(): Promise<Array<ProgressEntry>>;
    listUserChallenges(): Promise<Array<UserChallenge>>;
    resetGamification(): Promise<void>;
    saveReminderSettings(enabled: boolean, time: string, restDays: Array<bigint>): Promise<ReminderSettings>;
    unlockBadge(badgeId: string): Promise<boolean>;
    updateChallengeProgress(id: bigint, currentDay: bigint, completed: boolean, badgeEarned: boolean): Promise<boolean>;
    updateProgress(id: bigint, weight: number, workoutsCompleted: bigint, notes: string, date: string): Promise<boolean>;
}

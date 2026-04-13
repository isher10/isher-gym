import { createActor } from "@/backend";
import type {
  BmiEntry,
  FeedbackEntry,
  GamificationProfile,
  ProgressEntry,
  ReminderSettings,
  UserChallenge,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ── Query Keys ────────────────────────────────────────────────────────────

const PROGRESS_KEY = ["progress"] as const;
const CHALLENGE_TEMPLATES_KEY = ["challengeTemplates"] as const;
const USER_CHALLENGES_KEY = ["userChallenges"] as const;
const REMINDER_SETTINGS_KEY = ["reminderSettings"] as const;
const GAMIFICATION_KEY = ["gamification"] as const;
const BMI_ENTRIES_KEY = ["bmiEntries"] as const;
const FEEDBACK_KEY = ["feedback"] as const;

// ── Progress ──────────────────────────────────────────────────────────────

export function useListProgress() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ProgressEntry[]>({
    queryKey: PROGRESS_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProgress();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProgress() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      weight,
      workoutsCompleted,
      notes,
      date,
    }: {
      weight: number;
      workoutsCompleted: bigint;
      notes: string;
      date: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addProgress(weight, workoutsCompleted, notes, date);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROGRESS_KEY });
    },
  });
}

export function useUpdateProgress() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      weight,
      workoutsCompleted,
      notes,
      date,
    }: {
      id: bigint;
      weight: number;
      workoutsCompleted: bigint;
      notes: string;
      date: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateProgress(id, weight, workoutsCompleted, notes, date);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROGRESS_KEY });
    },
  });
}

export function useDeleteProgress() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProgress(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROGRESS_KEY });
    },
  });
}

// ── Challenge Templates ───────────────────────────────────────────────────

export function useListChallengeTemplates() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: CHALLENGE_TEMPLATES_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listChallengeTemplates();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── User Challenges ───────────────────────────────────────────────────────

export function useListUserChallenges() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserChallenge[]>({
    queryKey: USER_CHALLENGES_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUserChallenges();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddUserChallenge() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      templateId,
      startDate,
    }: { templateId: bigint; startDate: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addUserChallenge(templateId, startDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_CHALLENGES_KEY });
      queryClient.invalidateQueries({ queryKey: GAMIFICATION_KEY });
    },
  });
}

export function useUpdateChallengeProgress() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      currentDay,
      completed,
      badgeEarned,
    }: {
      id: bigint;
      currentDay: bigint;
      completed: boolean;
      badgeEarned: boolean;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateChallengeProgress(
        id,
        currentDay,
        completed,
        badgeEarned,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_CHALLENGES_KEY });
      queryClient.invalidateQueries({ queryKey: GAMIFICATION_KEY });
    },
  });
}

export function useDeleteUserChallenge() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteUserChallenge(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_CHALLENGES_KEY });
    },
  });
}

// ── Reminder Settings ─────────────────────────────────────────────────────

export function useGetReminderSettings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ReminderSettings | null>({
    queryKey: REMINDER_SETTINGS_KEY,
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getReminderSettings();
      if (result === null || result === undefined) return null;
      if (Array.isArray(result))
        return (
          result.length > 0 ? result[0] : null
        ) as ReminderSettings | null;
      return result as ReminderSettings;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveReminderSettings() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (settings: ReminderSettings) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveReminderSettings(
        settings.enabled,
        settings.time,
        settings.restDays,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REMINDER_SETTINGS_KEY });
    },
  });
}

// ── Gamification ──────────────────────────────────────────────────────────

export function useGetGamificationProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GamificationProfile | null>({
    queryKey: GAMIFICATION_KEY,
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getGamificationProfile();
      if (result === null || result === undefined) return null;
      if (Array.isArray(result))
        return (
          result.length > 0 ? result[0] : null
        ) as GamificationProfile | null;
      return result as GamificationProfile;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddPoints() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      points,
      reason,
    }: { points: bigint; reason: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addPoints(points, reason);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GAMIFICATION_KEY });
    },
  });
}

export function useUnlockBadge() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (badgeId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.unlockBadge(badgeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GAMIFICATION_KEY });
    },
  });
}

// ── BMI ───────────────────────────────────────────────────────────────────

export function useListBmiEntries() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BmiEntry[]>({
    queryKey: BMI_ENTRIES_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBmiEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddBmiEntry() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      height,
      weight,
      date,
    }: {
      height: number;
      weight: number;
      date: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addBmiEntry(height, weight, date);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BMI_ENTRIES_KEY });
    },
  });
}

export function useDeleteBmiEntry() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteBmiEntry(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BMI_ENTRIES_KEY });
    },
  });
}

// ── Feedback ──────────────────────────────────────────────────────────────

export function useListFeedback() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FeedbackEntry[]>({
    queryKey: FEEDBACK_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFeedback() as Promise<FeedbackEntry[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddFeedback() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      photoUrl,
      message,
      date,
    }: {
      name: string;
      photoUrl: string;
      message: string;
      date: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addFeedback(name, photoUrl, message, date);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEEDBACK_KEY });
    },
  });
}

export function useDeleteFeedback() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteFeedback(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEEDBACK_KEY });
    },
  });
}

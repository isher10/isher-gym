import { createActor } from "@/backend";
import type { ProgressEntry } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const PROGRESS_KEY = ["progress"] as const;

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

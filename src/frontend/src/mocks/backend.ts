import type { backendInterface } from "../backend";

const sampleProgress = [
  {
    id: BigInt(1),
    weight: 75.5,
    date: "2026-04-10",
    notes: "Great workout today!",
    workoutsCompleted: BigInt(12),
  },
  {
    id: BigInt(2),
    weight: 74.8,
    date: "2026-04-12",
    notes: "Feeling stronger",
    workoutsCompleted: BigInt(15),
  },
];

export const mockBackend: backendInterface = {
  addProgress: async (weight, workoutsCompleted, notes, date) => ({
    id: BigInt(Date.now()),
    weight,
    date,
    notes,
    workoutsCompleted,
  }),
  deleteProgress: async (_id) => true,
  listProgress: async () => sampleProgress,
  updateProgress: async (_id, _weight, _workoutsCompleted, _notes, _date) => true,
};

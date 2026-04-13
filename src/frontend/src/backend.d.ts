import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProgressEntry {
    id: bigint;
    weight: number;
    date: string;
    notes: string;
    workoutsCompleted: bigint;
}
export interface backendInterface {
    addProgress(weight: number, workoutsCompleted: bigint, notes: string, date: string): Promise<ProgressEntry>;
    deleteProgress(id: bigint): Promise<boolean>;
    listProgress(): Promise<Array<ProgressEntry>>;
    updateProgress(id: bigint, weight: number, workoutsCompleted: bigint, notes: string, date: string): Promise<boolean>;
}

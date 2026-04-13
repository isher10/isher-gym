import List "mo:core/List";
import Types "../types/progress";
import ProgressLib "../lib/progress";

mixin (entries : List.List<Types.ProgressEntry>, counter : Types.Counter) {

  /// Add a new progress entry.
  public func addProgress(
    weight : Float,
    workoutsCompleted : Nat,
    notes : Text,
    date : Text,
  ) : async Types.ProgressEntry {
    ProgressLib.add(entries, counter, weight, workoutsCompleted, notes, date);
  };

  /// List all progress entries sorted by date descending (newest first).
  public query func listProgress() : async [Types.ProgressEntry] {
    ProgressLib.listSortedDesc(entries);
  };

  /// Delete a progress entry by ID. Returns true if deleted.
  public func deleteProgress(id : Nat) : async Bool {
    ProgressLib.remove(entries, id);
  };

  /// Update an existing progress entry by ID. Returns true if updated.
  public func updateProgress(
    id : Nat,
    weight : Float,
    workoutsCompleted : Nat,
    notes : Text,
    date : Text,
  ) : async Bool {
    ProgressLib.update(entries, id, weight, workoutsCompleted, notes, date);
  };
};

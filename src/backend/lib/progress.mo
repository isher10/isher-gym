import List "mo:core/List";
import Types "../types/progress";

module {
  public type ProgressEntry = Types.ProgressEntry;

  /// Add a new progress entry using a shared counter object.
  public func add(
    entries : List.List<ProgressEntry>,
    counter : Types.Counter,
    weight : Float,
    workoutsCompleted : Nat,
    notes : Text,
    date : Text,
  ) : ProgressEntry {
    let entry : ProgressEntry = {
      id = counter.id;
      weight;
      workoutsCompleted;
      notes;
      date;
    };
    entries.add(entry);
    counter.id += 1;
    entry;
  };

  /// Return all entries sorted by date descending (newest first).
  /// Date is an ISO string — lexicographic descending works correctly for ISO-8601.
  public func listSortedDesc(entries : List.List<ProgressEntry>) : [ProgressEntry] {
    let arr = entries.toArray();
    arr.sort(func(a : ProgressEntry, b : ProgressEntry) : {#less; #equal; #greater} {
      // descending: compare b vs a
      b.date.compare(a.date);
    });
  };

  /// Delete an entry by ID. Returns true if found and removed.
  public func remove(entries : List.List<ProgressEntry>, id : Nat) : Bool {
    let sizeBefore = entries.size();
    let filtered = entries.filter(func(e : ProgressEntry) : Bool { e.id != id });
    entries.clear();
    entries.append(filtered);
    entries.size() < sizeBefore;
  };

  /// Update an existing entry by ID. Returns true if found and updated.
  public func update(
    entries : List.List<ProgressEntry>,
    id : Nat,
    weight : Float,
    workoutsCompleted : Nat,
    notes : Text,
    date : Text,
  ) : Bool {
    var found = false;
    entries.mapInPlace(func(e : ProgressEntry) : ProgressEntry {
      if (e.id == id) {
        found := true;
        { e with weight; workoutsCompleted; notes; date };
      } else {
        e;
      };
    });
    found;
  };
};

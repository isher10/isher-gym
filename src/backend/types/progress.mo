module {
  public type ProgressEntry = {
    id : Nat;
    weight : Float;
    workoutsCompleted : Nat;
    notes : Text;
    date : Text; // ISO date string from frontend
  };

  public type Counter = { var id : Nat };
};

module {
  public type ChallengeTemplate = {
    id : Nat;
    name : Text;
    description : Text;
    durationDays : Nat;
    goal : Text; // "fat-loss" | "muscle-gain" | "endurance" | "strength"
    difficulty : Text; // "beginner" | "intermediate" | "advanced"
    exercises : [Text]; // workout category names
  };

  public type UserChallenge = {
    id : Nat;
    templateId : Nat;
    startDate : Text; // ISO date string
    currentDay : Nat;
    completed : Bool;
    badgeEarned : Bool;
  };

  public type Counter = { var id : Nat };
};

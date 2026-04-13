module {
  public type Badge = {
    id : Text;
    name : Text;
    description : Text;
    earned : Bool;
    earnedDate : ?Text; // ISO date string, null if not earned
  };

  public type GamificationProfile = {
    points : Nat;
    level : Nat;
    badges : [Text]; // badge ids
    totalWorkoutsLogged : Nat;
    totalChallengesCompleted : Nat;
    lastActivityDate : Text; // ISO date string
  };
};

import Array "mo:core/Array";
import Types "../types/gamification";

module {
  public type GamificationProfile = Types.GamificationProfile;
  public type Badge = Types.Badge;

  let defaultProfile : GamificationProfile = {
    points = 0;
    level = 1;
    badges = [];
    totalWorkoutsLogged = 0;
    totalChallengesCompleted = 0;
    lastActivityDate = "";
  };

  func calcLevel(points : Nat) : Nat {
    if (points >= 1000) { 5 }
    else if (points >= 500) { 4 }
    else if (points >= 250) { 3 }
    else if (points >= 100) { 2 }
    else { 1 };
  };

  func currentProfile(profileRef : { var value : ?GamificationProfile }) : GamificationProfile {
    switch (profileRef.value) {
      case (?p) p;
      case null defaultProfile;
    };
  };

  public func getProfile(profileRef : { var value : ?GamificationProfile }) : GamificationProfile {
    currentProfile(profileRef);
  };

  public func addPoints(
    profileRef : { var value : ?GamificationProfile },
    amount : Nat,
    reason : Text,
  ) : GamificationProfile {
    let p = currentProfile(profileRef);
    let newPoints = p.points + amount;
    let updated : GamificationProfile = {
      p with
      points = newPoints;
      level = calcLevel(newPoints);
      lastActivityDate = reason; // reason doubles as activity label; date is set by frontend
    };
    profileRef.value := ?updated;
    updated;
  };

  public func unlockBadge(
    profileRef : { var value : ?GamificationProfile },
    badgeId : Text,
  ) : Bool {
    let p = currentProfile(profileRef);
    let alreadyHas = p.badges.find(func(b) { b == badgeId });
    switch (alreadyHas) {
      case (?_) { false };
      case null {
        let updated : GamificationProfile = {
          p with badges = p.badges.concat<Text>([badgeId])
        };
        profileRef.value := ?updated;
        true;
      };
    };
  };

  public func reset(profileRef : { var value : ?GamificationProfile }) : () {
    profileRef.value := ?defaultProfile;
  };
};

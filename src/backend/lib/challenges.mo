import List "mo:core/List";
import Types "../types/challenges";

module {
  public type ChallengeTemplate = Types.ChallengeTemplate;
  public type UserChallenge = Types.UserChallenge;

  public func addTemplate(
    templates : List.List<ChallengeTemplate>,
    counter : Types.Counter,
    name : Text,
    description : Text,
    durationDays : Nat,
    goal : Text,
    difficulty : Text,
    exercises : [Text],
  ) : ChallengeTemplate {
    counter.id += 1;
    let t : ChallengeTemplate = {
      id = counter.id;
      name;
      description;
      durationDays;
      goal;
      difficulty;
      exercises;
    };
    templates.add(t);
    t;
  };

  public func listTemplates(templates : List.List<ChallengeTemplate>) : [ChallengeTemplate] {
    templates.toArray();
  };

  public func deleteTemplate(templates : List.List<ChallengeTemplate>, id : Nat) : Bool {
    let before = templates.size();
    let filtered = templates.filter(func(t) { t.id != id });
    templates.clear();
    templates.append(filtered);
    templates.size() < before;
  };

  public func addUserChallenge(
    challenges : List.List<UserChallenge>,
    counter : Types.Counter,
    templateId : Nat,
    startDate : Text,
  ) : UserChallenge {
    counter.id += 1;
    let c : UserChallenge = {
      id = counter.id;
      templateId;
      startDate;
      currentDay = 0;
      completed = false;
      badgeEarned = false;
    };
    challenges.add(c);
    c;
  };

  public func listUserChallenges(challenges : List.List<UserChallenge>) : [UserChallenge] {
    challenges.toArray();
  };

  public func updateChallengeProgress(
    challenges : List.List<UserChallenge>,
    id : Nat,
    currentDay : Nat,
    completed : Bool,
    badgeEarned : Bool,
  ) : Bool {
    var found = false;
    challenges.mapInPlace(func(c) {
      if (c.id == id) {
        found := true;
        { c with currentDay; completed; badgeEarned };
      } else {
        c;
      }
    });
    found;
  };

  public func deleteUserChallenge(challenges : List.List<UserChallenge>, id : Nat) : Bool {
    let before = challenges.size();
    let filtered = challenges.filter(func(c) { c.id != id });
    challenges.clear();
    challenges.append(filtered);
    challenges.size() < before;
  };
};

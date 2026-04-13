import List "mo:core/List";
import ChallengesLib "../lib/challenges";
import Types "../types/challenges";

mixin (
  templates : List.List<Types.ChallengeTemplate>,
  templateCounter : Types.Counter,
  userChallenges : List.List<Types.UserChallenge>,
  challengeCounter : Types.Counter,
) {

  /// Add a new challenge template.
  public func addChallengeTemplate(
    name : Text,
    description : Text,
    durationDays : Nat,
    goal : Text,
    difficulty : Text,
    exercises : [Text],
  ) : async Types.ChallengeTemplate {
    ChallengesLib.addTemplate(templates, templateCounter, name, description, durationDays, goal, difficulty, exercises);
  };

  /// List all challenge templates.
  public query func listChallengeTemplates() : async [Types.ChallengeTemplate] {
    ChallengesLib.listTemplates(templates);
  };

  /// Delete a challenge template by ID. Returns true if deleted.
  public func deleteChallengeTemplate(id : Nat) : async Bool {
    ChallengesLib.deleteTemplate(templates, id);
  };

  /// Join a challenge by templateId.
  public func addUserChallenge(templateId : Nat, startDate : Text) : async Types.UserChallenge {
    ChallengesLib.addUserChallenge(userChallenges, challengeCounter, templateId, startDate);
  };

  /// List all user challenges.
  public query func listUserChallenges() : async [Types.UserChallenge] {
    ChallengesLib.listUserChallenges(userChallenges);
  };

  /// Update daily progress on a user challenge.
  public func updateChallengeProgress(
    id : Nat,
    currentDay : Nat,
    completed : Bool,
    badgeEarned : Bool,
  ) : async Bool {
    ChallengesLib.updateChallengeProgress(userChallenges, id, currentDay, completed, badgeEarned);
  };

  /// Delete a user challenge by ID. Returns true if deleted.
  public func deleteUserChallenge(id : Nat) : async Bool {
    ChallengesLib.deleteUserChallenge(userChallenges, id);
  };
};

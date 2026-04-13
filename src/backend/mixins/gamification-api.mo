import GamificationLib "../lib/gamification";
import Types "../types/gamification";

mixin (gamificationProfile : { var value : ?Types.GamificationProfile }) {

  /// Get the gamification profile. Returns default if not initialized.
  public query func getGamificationProfile() : async Types.GamificationProfile {
    GamificationLib.getProfile(gamificationProfile);
  };

  /// Add points to the profile for a given reason.
  public func addPoints(amount : Nat, reason : Text) : async Types.GamificationProfile {
    GamificationLib.addPoints(gamificationProfile, amount, reason);
  };

  /// Unlock a badge by ID. Returns true if newly unlocked.
  public func unlockBadge(badgeId : Text) : async Bool {
    GamificationLib.unlockBadge(gamificationProfile, badgeId);
  };

  /// Reset the gamification profile to defaults.
  public func resetGamification() : async () {
    GamificationLib.reset(gamificationProfile);
  };
};

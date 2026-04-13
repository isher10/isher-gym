import List "mo:core/List";
import ProgressTypes "types/progress";
import ChallengesTypes "types/challenges";
import RemindersTypes "types/reminders";
import GamificationTypes "types/gamification";
import BmiTypes "types/bmi";
import FeedbackTypes "types/feedback";
import ChallengesLib "lib/challenges";
import ProgressMixin "mixins/progress-api";
import ChallengesMixin "mixins/challenges-api";
import RemindersMixin "mixins/reminders-api";
import GamificationMixin "mixins/gamification-api";
import BmiMixin "mixins/bmi-api";
import FeedbackMixin "mixins/feedback-api";

actor {
  // Progress state
  let progressEntries = List.empty<ProgressTypes.ProgressEntry>();
  let progressCounter : ProgressTypes.Counter = { var id : Nat = 0 };

  // Challenges state
  let challengeTemplates = List.empty<ChallengesTypes.ChallengeTemplate>();
  let templateCounter : ChallengesTypes.Counter = { var id : Nat = 0 };
  let userChallenges = List.empty<ChallengesTypes.UserChallenge>();
  let challengeCounter : ChallengesTypes.Counter = { var id : Nat = 0 };

  // Reminders state
  let reminderSettings : { var value : ?RemindersTypes.ReminderSettings } = { var value = null };

  // Gamification state
  let gamificationProfile : { var value : ?GamificationTypes.GamificationProfile } = { var value = null };

  // BMI state
  let bmiEntries = List.empty<BmiTypes.BmiEntry>();
  let bmiCounter : BmiTypes.Counter = { var id : Nat = 0 };

  // Feedback state
  let feedbackEntries = List.empty<FeedbackTypes.FeedbackEntry>();
  let feedbackCounter : FeedbackTypes.Counter = { var id : Nat = 0 };

  // Seed preset challenge templates
  ignore ChallengesLib.addTemplate(challengeTemplates, templateCounter, "7-Day Fat Loss", "Burn fat and boost metabolism in 7 days with targeted cardio and HIIT workouts.", 7, "fat-loss", "beginner", ["Abs", "Legs", "Cardio"]);
  ignore ChallengesLib.addTemplate(challengeTemplates, templateCounter, "30-Day Muscle Gain", "Build serious muscle mass over 30 days with progressive overload training.", 30, "muscle-gain", "intermediate", ["Chest", "Back", "Arms", "Shoulders", "Legs"]);
  ignore ChallengesLib.addTemplate(challengeTemplates, templateCounter, "7-Day Full Body", "Hit every major muscle group daily with compound movements over 7 days.", 7, "strength", "beginner", ["Chest", "Back", "Legs", "Arms", "Shoulders", "Abs"]);
  ignore ChallengesLib.addTemplate(challengeTemplates, templateCounter, "14-Day Endurance", "Improve cardiovascular endurance and stamina over 14 days.", 14, "endurance", "intermediate", ["Legs", "Abs", "Cardio"]);
  ignore ChallengesLib.addTemplate(challengeTemplates, templateCounter, "30-Day Beginner", "A complete 30-day program designed for beginners to build a solid fitness foundation.", 30, "strength", "beginner", ["Chest", "Back", "Arms", "Legs", "Abs"]);

  include ProgressMixin(progressEntries, progressCounter);
  include ChallengesMixin(challengeTemplates, templateCounter, userChallenges, challengeCounter);
  include RemindersMixin(reminderSettings);
  include GamificationMixin(gamificationProfile);
  include BmiMixin(bmiEntries, bmiCounter);
  include FeedbackMixin(feedbackEntries, feedbackCounter);
};

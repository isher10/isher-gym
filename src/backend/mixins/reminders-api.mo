import RemindersLib "../lib/reminders";
import Types "../types/reminders";

mixin (reminderSettings : { var value : ?Types.ReminderSettings }) {

  /// Get the current reminder settings. Returns null if not set.
  public query func getReminderSettings() : async ?Types.ReminderSettings {
    RemindersLib.getSettings(reminderSettings.value);
  };

  /// Save reminder settings.
  public func saveReminderSettings(
    enabled : Bool,
    time : Text,
    restDays : [Nat],
  ) : async Types.ReminderSettings {
    RemindersLib.saveSettings(reminderSettings, enabled, time, restDays);
  };
};

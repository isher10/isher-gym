import Types "../types/reminders";

module {
  public type ReminderSettings = Types.ReminderSettings;

  public func getSettings(settings : ?ReminderSettings) : ?ReminderSettings {
    settings;
  };

  public func saveSettings(
    settingsRef : { var value : ?ReminderSettings },
    enabled : Bool,
    time : Text,
    restDays : [Nat],
  ) : ReminderSettings {
    let s : ReminderSettings = { enabled; time; restDays };
    settingsRef.value := ?s;
    s;
  };
};

module {
  public type ReminderSettings = {
    enabled : Bool;
    time : Text; // "HH:MM" format
    restDays : [Nat]; // 0-6 representing day of week
  };
};

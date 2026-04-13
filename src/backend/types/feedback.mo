module {
  public type FeedbackEntry = {
    id : Nat;
    name : Text;
    photoUrl : Text; // base64 data URL or empty ""
    message : Text;
    date : Text; // ISO date string from frontend
  };

  public type Counter = { var id : Nat };
};

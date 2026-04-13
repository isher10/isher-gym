import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Types "../types/feedback";
import FeedbackLib "../lib/feedback";

mixin (
  feedbackEntries : List.List<Types.FeedbackEntry>,
  feedbackCounter : Types.Counter,
) {
  public func addFeedback(name : Text, photoUrl : Text, message : Text, date : Text) : async Nat {
    Runtime.trap("not implemented");
  };

  public query func listFeedback() : async [Types.FeedbackEntry] {
    Runtime.trap("not implemented");
  };

  public func deleteFeedback(id : Nat) : async Bool {
    Runtime.trap("not implemented");
  };
};

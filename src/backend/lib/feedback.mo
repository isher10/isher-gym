import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Types "../types/feedback";

module {
  public func addFeedback(
    entries : List.List<Types.FeedbackEntry>,
    counter : Types.Counter,
    name : Text,
    photoUrl : Text,
    message : Text,
    date : Text,
  ) : Nat {
    Runtime.trap("not implemented");
  };

  public func listFeedback(entries : List.List<Types.FeedbackEntry>) : [Types.FeedbackEntry] {
    Runtime.trap("not implemented");
  };

  public func deleteFeedback(entries : List.List<Types.FeedbackEntry>, id : Nat) : Bool {
    Runtime.trap("not implemented");
  };
};

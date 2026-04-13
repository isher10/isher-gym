import List "mo:core/List";
import Types "types/progress";
import ProgressMixin "mixins/progress-api";

actor {
  let progressEntries = List.empty<Types.ProgressEntry>();
  let progressCounter : Types.Counter = { var id : Nat = 0 };

  include ProgressMixin(progressEntries, progressCounter);
};

import List "mo:core/List";
import BmiLib "../lib/bmi";
import Types "../types/bmi";

mixin (bmiEntries : List.List<Types.BmiEntry>, bmiCounter : Types.Counter) {

  /// Add a new BMI entry calculated from height and weight.
  public func addBmiEntry(height : Float, weight : Float, date : Text) : async Types.BmiEntry {
    BmiLib.add(bmiEntries, bmiCounter, height, weight, date);
  };

  /// List all BMI entries.
  public query func listBmiEntries() : async [Types.BmiEntry] {
    BmiLib.listAll(bmiEntries);
  };

  /// Delete a BMI entry by ID. Returns true if deleted.
  public func deleteBmiEntry(id : Nat) : async Bool {
    BmiLib.remove(bmiEntries, id);
  };
};

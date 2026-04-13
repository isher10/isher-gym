import List "mo:core/List";
import Types "../types/bmi";

module {
  public type BmiEntry = Types.BmiEntry;

  func calcBmi(height : Float, weight : Float) : Float {
    let heightM = height / 100.0;
    weight / (heightM * heightM);
  };

  func bmiCategory(bmi : Float) : Text {
    if (bmi < 18.5) { "underweight" }
    else if (bmi < 25.0) { "normal" }
    else if (bmi < 30.0) { "overweight" }
    else { "obese" };
  };

  public func add(
    entries : List.List<BmiEntry>,
    counter : Types.Counter,
    height : Float,
    weight : Float,
    date : Text,
  ) : BmiEntry {
    counter.id += 1;
    let bmi = calcBmi(height, weight);
    let entry : BmiEntry = {
      id = counter.id;
      height;
      weight;
      bmi;
      category = bmiCategory(bmi);
      date;
    };
    entries.add(entry);
    entry;
  };

  public func listAll(entries : List.List<BmiEntry>) : [BmiEntry] {
    // Return newest first (desc by id which is monotonically increasing)
    entries.reverse().toArray();
  };

  public func remove(entries : List.List<BmiEntry>, id : Nat) : Bool {
    let before = entries.size();
    let filtered = entries.filter(func(e) { e.id != id });
    entries.clear();
    entries.append(filtered);
    entries.size() < before;
  };
};

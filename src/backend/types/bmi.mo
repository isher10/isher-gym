module {
  public type BmiEntry = {
    id : Nat;
    height : Float; // in cm
    weight : Float; // in kg
    bmi : Float;
    category : Text; // "underweight" | "normal" | "overweight" | "obese"
    date : Text; // ISO date string
  };

  public type Counter = { var id : Nat };
};

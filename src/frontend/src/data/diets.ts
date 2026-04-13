export interface MacroInfo {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface SampleMeals {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snack: string[];
}

export interface DietSection {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  goal: string;
  accentColor: string;
  bgAccent: string;
  textAccent: string;
  macros: MacroInfo;
  goalDescription: string;
  meals: SampleMeals;
  hydrationTips: string[];
  foodsToPrioritize: string[];
  foodsToAvoid: string[];
}

export interface MacroFood {
  food: string;
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const DIET_SECTIONS: DietSection[] = [
  {
    id: "beginner",
    emoji: "🌱",
    title: "Beginner Basics",
    subtitle: "Build healthy habits from the ground up",
    goal: "foundation",
    accentColor: "text-emerald-400",
    bgAccent: "bg-emerald-900/30",
    textAccent: "text-emerald-400",
    macros: {
      protein: 120,
      carbs: 220,
      fat: 65,
      calories: 2000,
    },
    goalDescription:
      "Start your fitness journey with a balanced, sustainable diet. Focus on whole foods, regular meal timing, and building habits that last. No extreme restrictions — just clean, consistent eating to fuel your workouts and daily life.",
    meals: {
      breakfast: [
        "3 scrambled eggs with spinach",
        "1 cup oatmeal with banana slices and honey",
        "1 glass of water or black coffee",
      ],
      lunch: [
        "Grilled chicken breast (150g) with brown rice (¾ cup)",
        "Mixed salad with olive oil and lemon dressing",
        "1 glass of water",
      ],
      dinner: [
        "Baked fish or chicken (150g)",
        "Steamed broccoli, carrots and green beans",
        "1 medium sweet potato",
      ],
      snack: [
        "Greek yogurt with a handful of mixed nuts",
        "Apple or banana with 1 tbsp peanut butter",
        "A small handful of almonds (20–25 nuts)",
      ],
    },
    hydrationTips: [
      "Drink 2–2.5 litres of water daily",
      "Have a glass of water first thing in the morning",
      "Drink water before and after each meal",
      "Limit sugary drinks, sodas and energy drinks",
      "Herbal teas count toward your daily fluid intake",
    ],
    foodsToPrioritize: [
      "Chicken, fish, eggs, lentils",
      "Brown rice, oats, whole wheat bread",
      "Broccoli, spinach, carrots, cucumber",
      "Bananas, apples, berries",
      "Olive oil, nuts, avocado",
      "Low-fat dairy: milk, yogurt, cheese",
    ],
    foodsToAvoid: [
      "Fried fast food and deep-fried snacks",
      "Sugary drinks, sodas, and juices with added sugar",
      "Packaged chips, biscuits and processed snacks",
      "White bread and refined pasta in large amounts",
      "Excessive alcohol",
      "High-sugar desserts and sweets",
    ],
  },
  {
    id: "weight-gain",
    emoji: "💪",
    title: "Weight Gain",
    subtitle: "Build muscle mass with a caloric surplus",
    goal: "muscle-gain",
    accentColor: "text-orange-400",
    bgAccent: "bg-orange-900/30",
    textAccent: "text-orange-400",
    macros: {
      protein: 200,
      carbs: 380,
      fat: 90,
      calories: 3200,
    },
    goalDescription:
      "To gain muscle mass, you need to eat more calories than you burn (caloric surplus). Focus on high-protein meals combined with complex carbohydrates for energy. Train hard and eat consistently — muscle growth happens when nutrition supports recovery.",
    meals: {
      breakfast: [
        "4 whole eggs + 2 extra egg whites scrambled",
        "3 slices whole wheat toast with peanut butter",
        "1 large banana",
        "1 cup full-fat milk",
      ],
      lunch: [
        "Chicken or lean beef (220g) grilled with spices",
        "White or brown rice (1.5 cups cooked)",
        "Sautéed mixed vegetables in olive oil",
        "Whey protein shake if needed",
      ],
      dinner: [
        "Salmon or chicken (200g) baked or grilled",
        "Pasta or rice (2 cups cooked)",
        "Side salad with avocado",
        "Whole milk (1 cup)",
      ],
      snack: [
        "Peanut butter sandwich on whole wheat bread",
        "Protein shake with milk and banana (post-workout)",
        "Handful of mixed nuts and dried fruits",
        "Cottage cheese with berries",
      ],
    },
    hydrationTips: [
      "Drink 3–4 litres of water daily",
      "Stay hydrated during heavy training sessions",
      "Avoid drinking too much water just before meals (dilutes digestion)",
      "Milk is a great calorie-dense hydration source",
      "Coconut water can help replenish electrolytes post-workout",
    ],
    foodsToPrioritize: [
      "Chicken, beef, eggs, fatty fish, tuna",
      "Whole milk, cheese, cottage cheese, whey protein",
      "Rice, pasta, potatoes, sweet potatoes, oats",
      "Whole wheat bread, bagels, wraps",
      "Peanut butter, almond butter, avocado",
      "Bananas, mangoes, dried fruits",
    ],
    foodsToAvoid: [
      "Very low-calorie 'diet' foods that don't support growth",
      "Excessive junk food — calories matter but quality does too",
      "Alcohol (impairs muscle protein synthesis)",
      "Skipping meals — consistency is critical",
      "Highly processed meats with excessive sodium",
    ],
  },
  {
    id: "weight-loss",
    emoji: "🔥",
    title: "Weight Loss",
    subtitle: "Burn fat with a smart caloric deficit",
    goal: "fat-loss",
    accentColor: "text-primary",
    bgAccent: "bg-primary/20",
    textAccent: "text-primary",
    macros: {
      protein: 165,
      carbs: 155,
      fat: 50,
      calories: 1750,
    },
    goalDescription:
      "Fat loss requires eating fewer calories than you burn while keeping protein high to preserve muscle. Focus on lean proteins, fibre-rich vegetables, and minimising processed carbs. Small, sustainable changes beat extreme diets every time.",
    meals: {
      breakfast: [
        "3 egg whites + 1 whole egg omelette with vegetables",
        "½ cup oatmeal with berries and cinnamon (no sugar)",
        "Black coffee or unsweetened green tea",
      ],
      lunch: [
        "Grilled chicken breast (150g) or canned tuna",
        "Large mixed greens salad with tomato, cucumber",
        "Light olive oil and lemon dressing (1 tsp oil)",
        "½ cup brown rice or 1 small sweet potato",
      ],
      dinner: [
        "Grilled fish (150g) — salmon, tilapia or cod",
        "Steamed broccoli, asparagus, zucchini",
        "½ cup cauliflower rice or regular brown rice",
      ],
      snack: [
        "Greek yogurt (low-fat, unsweetened) with cucumber",
        "Apple or pear with 10–12 almonds",
        "Carrot sticks with hummus (2 tbsp)",
      ],
    },
    hydrationTips: [
      "Drink 2.5–3 litres of water daily",
      "Drink a full glass of water before each meal to reduce appetite",
      "Sparkling water can help curb cravings between meals",
      "Green tea boosts metabolism — 1–2 cups daily",
      "Avoid diet sodas — they can still trigger cravings",
    ],
    foodsToPrioritize: [
      "Chicken breast, white fish, egg whites, tofu",
      "Broccoli, spinach, kale, zucchini, cucumber",
      "Oats, brown rice, sweet potato (controlled portions)",
      "Berries, apples, grapefruit",
      "Greek yogurt (low-fat), cottage cheese",
      "Black beans, lentils, chickpeas",
    ],
    foodsToAvoid: [
      "White bread, white rice in large amounts, pastries",
      "Fried food, fast food burgers and fries",
      "Sugary drinks, juices, sports drinks",
      "High-calorie condiments: mayo, creamy sauces",
      "Sweets, chocolates, ice cream",
      "Late-night high-calorie snacking",
    ],
  },
];

export const MACRO_REFERENCE: MacroFood[] = [
  {
    food: "Chicken Breast",
    serving: "100g",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
  },
  {
    food: "Brown Rice",
    serving: "100g cooked",
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
  },
  {
    food: "Whole Egg",
    serving: "1 large",
    calories: 78,
    protein: 6,
    carbs: 0.6,
    fat: 5.3,
  },
  {
    food: "Oats",
    serving: "100g dry",
    calories: 389,
    protein: 17,
    carbs: 66,
    fat: 7,
  },
  {
    food: "Banana",
    serving: "1 medium",
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.4,
  },
  {
    food: "Broccoli",
    serving: "100g",
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
  },
  {
    food: "Salmon",
    serving: "100g",
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
  },
  {
    food: "Sweet Potato",
    serving: "1 medium",
    calories: 103,
    protein: 2.3,
    carbs: 24,
    fat: 0.1,
  },
  {
    food: "Greek Yogurt",
    serving: "170g",
    calories: 100,
    protein: 17,
    carbs: 6,
    fat: 0.7,
  },
  {
    food: "Almonds",
    serving: "28g (handful)",
    calories: 164,
    protein: 6,
    carbs: 6,
    fat: 14,
  },
  {
    food: "Peanut Butter",
    serving: "2 tbsp",
    calories: 188,
    protein: 8,
    carbs: 6,
    fat: 16,
  },
  {
    food: "Tuna (canned)",
    serving: "100g",
    calories: 116,
    protein: 26,
    carbs: 0,
    fat: 1,
  },
];

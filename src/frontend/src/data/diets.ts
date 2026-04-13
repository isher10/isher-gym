export interface MacroInfo {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface MealItem {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  descriptionHindi: string;
  isVeg: boolean;
  photoUrl: string;
  time: "breakfast" | "lunch" | "dinner" | "snack";
  items: string[];
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
  titleHindi: string;
  subtitle: string;
  subtitleHindi: string;
  goal: string;
  accentColor: string;
  bgAccent: string;
  textAccent: string;
  macros: MacroInfo;
  goalDescription: string;
  goalDescriptionHindi: string;
  meals: SampleMeals;
  mealItems: MealItem[];
  hydrationTips: string[];
  hydrationTipsHindi: string[];
  foodsToPrioritize: string[];
  foodsToPrioritizeHindi: string[];
  foodsToAvoid: string[];
  foodsToAvoidHindi: string[];
}

export interface MacroFood {
  food: string;
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Photo URLs
const PHOTOS = {
  dal: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",
  chicken:
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80",
  salad:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80",
  eggs: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&q=80",
  fruits:
    "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&q=80",
  paneer:
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",
  nuts: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&q=80",
};

export const DIET_SECTIONS: DietSection[] = [
  {
    id: "beginner",
    emoji: "🌱",
    title: "Beginner Basics",
    titleHindi: "शुरुआती आधार",
    subtitle: "Build healthy habits from the ground up",
    subtitleHindi: "स्वस्थ आदतें बनाएं शुरुआत से",
    goal: "foundation",
    accentColor: "text-emerald-400",
    bgAccent: "bg-emerald-900/30",
    textAccent: "text-emerald-400",
    macros: { protein: 120, carbs: 220, fat: 65, calories: 2000 },
    goalDescription:
      "Start your fitness journey with a balanced, sustainable diet. Focus on whole foods, regular meal timing, and building habits that last. No extreme restrictions — just clean, consistent eating to fuel your workouts and daily life.",
    goalDescriptionHindi:
      "संतुलित और टिकाऊ आहार के साथ अपनी फिटनेस यात्रा शुरू करें। पूरे खाद्य पदार्थों, नियमित भोजन समय और स्थायी आदतें बनाने पर ध्यान दें। कोई अत्यधिक प्रतिबंध नहीं — बस साफ, सुसंगत खाना।",
    meals: {
      breakfast: [
        "3 scrambled eggs with spinach",
        "1 cup oatmeal with banana slices",
        "1 glass of water or black coffee",
      ],
      lunch: [
        "Grilled chicken breast (150g) with brown rice",
        "Mixed salad with olive oil dressing",
        "1 glass of water",
      ],
      dinner: [
        "Baked fish or chicken (150g)",
        "Steamed broccoli, carrots and green beans",
        "1 medium sweet potato",
      ],
      snack: [
        "Greek yogurt with mixed nuts",
        "Apple or banana with peanut butter",
        "Handful of almonds (20–25)",
      ],
    },
    mealItems: [
      {
        id: "beg-b1",
        name: "Eggs & Oatmeal Breakfast",
        nameHindi: "अंडे और दलिया नाश्ता",
        description: "3 scrambled eggs with spinach + oatmeal with banana",
        descriptionHindi: "पालक के साथ 3 उबले अंडे + केले के साथ दलिया",
        isVeg: false,
        photoUrl: PHOTOS.eggs,
        time: "breakfast",
        items: [
          "3 scrambled eggs with spinach",
          "1 cup oatmeal with banana slices",
          "Black coffee or water",
        ],
      },
      {
        id: "beg-b2",
        name: "Poha & Fruits",
        nameHindi: "पोहा और फल",
        description: "Light flattened rice with vegetables and seasonal fruits",
        descriptionHindi: "सब्जियों के साथ हल्का पोहा और मौसमी फल",
        isVeg: true,
        photoUrl: PHOTOS.fruits,
        time: "breakfast",
        items: [
          "1 cup poha with onion and peas",
          "Seasonal fruits (apple/banana)",
          "Herbal tea",
        ],
      },
      {
        id: "beg-l1",
        name: "Chicken Rice Bowl",
        nameHindi: "चिकन राइस बाउल",
        description: "Grilled chicken with brown rice and salad",
        descriptionHindi: "भूरे चावल और सलाद के साथ ग्रिल्ड चिकन",
        isVeg: false,
        photoUrl: PHOTOS.chicken,
        time: "lunch",
        items: [
          "Grilled chicken breast 150g",
          "Brown rice ¾ cup",
          "Mixed salad with lemon dressing",
        ],
      },
      {
        id: "beg-l2",
        name: "Dal Rice & Salad",
        nameHindi: "दाल चावल और सलाद",
        description: "Protein-rich lentil dal with rice and cucumber salad",
        descriptionHindi: "प्रोटीन युक्त दाल, चावल और खीरे का सलाद",
        isVeg: true,
        photoUrl: PHOTOS.dal,
        time: "lunch",
        items: [
          "1 cup dal (lentils)",
          "¾ cup brown rice",
          "Cucumber and tomato salad",
        ],
      },
      {
        id: "beg-d1",
        name: "Baked Fish & Veggies",
        nameHindi: "बेक्ड मछली और सब्जियां",
        description: "Light baked fish with steamed vegetables",
        descriptionHindi: "भाप में पकी सब्जियों के साथ हल्की बेक्ड मछली",
        isVeg: false,
        photoUrl: PHOTOS.salad,
        time: "dinner",
        items: [
          "Baked fish 150g",
          "Steamed broccoli and carrots",
          "1 medium sweet potato",
        ],
      },
      {
        id: "beg-d2",
        name: "Paneer & Sabzi",
        nameHindi: "पनीर और सब्जी",
        description: "Paneer with mixed vegetables — high protein veg dinner",
        descriptionHindi:
          "मिश्रित सब्जियों के साथ पनीर — उच्च प्रोटीन शाकाहारी रात का खाना",
        isVeg: true,
        photoUrl: PHOTOS.paneer,
        time: "dinner",
        items: [
          "100g paneer (cottage cheese)",
          "Mixed seasonal vegetables",
          "2 whole wheat rotis",
        ],
      },
      {
        id: "beg-s1",
        name: "Greek Yogurt & Nuts",
        nameHindi: "ग्रीक दही और मेवे",
        description: "Low-fat yogurt with a handful of mixed nuts",
        descriptionHindi: "मुट्ठी भर मिश्रित मेवों के साथ कम वसा वाला दही",
        isVeg: true,
        photoUrl: PHOTOS.nuts,
        time: "snack",
        items: [
          "Greek yogurt 150g",
          "Mixed nuts (almonds, walnuts)",
          "Honey drizzle optional",
        ],
      },
    ],
    hydrationTips: [
      "Drink 2–2.5 litres of water daily",
      "Have a glass of water first thing in the morning",
      "Drink water before and after each meal",
      "Limit sugary drinks, sodas and energy drinks",
      "Herbal teas count toward your daily fluid intake",
    ],
    hydrationTipsHindi: [
      "रोजाना 2–2.5 लीटर पानी पियें",
      "सुबह सबसे पहले एक गिलास पानी पियें",
      "हर भोजन से पहले और बाद में पानी पियें",
      "मीठे पेय, सोडा और एनर्जी ड्रिंक सीमित करें",
      "हर्बल चाय आपके दैनिक तरल पदार्थ में गिनी जाती है",
    ],
    foodsToPrioritize: [
      "Chicken, fish, eggs, lentils",
      "Brown rice, oats, whole wheat bread",
      "Broccoli, spinach, carrots, cucumber",
      "Bananas, apples, berries",
      "Olive oil, nuts, avocado",
      "Low-fat dairy: milk, yogurt, cheese",
    ],
    foodsToPrioritizeHindi: [
      "चिकन, मछली, अंडे, दाल",
      "भूरे चावल, जई, साबुत गेहूं की रोटी",
      "ब्रोकली, पालक, गाजर, खीरा",
      "केले, सेब, जामुन",
      "जैतून का तेल, मेवे, एवोकाडो",
      "कम वसा वाले डेयरी: दूध, दही, पनीर",
    ],
    foodsToAvoid: [
      "Fried fast food and deep-fried snacks",
      "Sugary drinks, sodas, and juices with added sugar",
      "Packaged chips, biscuits and processed snacks",
      "White bread and refined pasta in large amounts",
      "Excessive alcohol",
      "High-sugar desserts and sweets",
    ],
    foodsToAvoidHindi: [
      "तले हुए फास्ट फूड और डीप फ्राइड स्नैक्स",
      "मीठे पेय, सोडा और अतिरिक्त चीनी वाले जूस",
      "पैकेज्ड चिप्स, बिस्कुट और प्रसंस्कृत स्नैक्स",
      "सफेद ब्रेड और परिष्कृत पास्ता अधिक मात्रा में",
      "अत्यधिक शराब",
      "उच्च चीनी मिठाइयां और मिष्ठान्न",
    ],
  },
  {
    id: "weight-gain",
    emoji: "💪",
    title: "Weight Gain",
    titleHindi: "वजन बढ़ाएं",
    subtitle: "Build muscle mass with a caloric surplus",
    subtitleHindi: "कैलोरी अधिशेष के साथ मांसपेशी बनाएं",
    goal: "muscle-gain",
    accentColor: "text-orange-400",
    bgAccent: "bg-orange-900/30",
    textAccent: "text-orange-400",
    macros: { protein: 200, carbs: 380, fat: 90, calories: 3200 },
    goalDescription:
      "To gain muscle mass, you need to eat more calories than you burn (caloric surplus). Focus on high-protein meals combined with complex carbohydrates for energy. Train hard and eat consistently — muscle growth happens when nutrition supports recovery.",
    goalDescriptionHindi:
      "मांसपेशी बनाने के लिए आपको जितनी कैलोरी जलाते हैं उससे ज्यादा खानी होगी (कैलोरी अधिशेष)। ऊर्जा के लिए जटिल कार्बोहाइड्रेट के साथ उच्च-प्रोटीन भोजन पर ध्यान दें। कड़ी ट्रेनिंग करें और नियमित खाएं।",
    meals: {
      breakfast: [
        "4 whole eggs + 2 egg whites scrambled",
        "3 slices whole wheat toast with peanut butter",
        "1 large banana",
        "1 cup full-fat milk",
      ],
      lunch: [
        "Chicken or lean beef (220g) grilled",
        "White or brown rice (1.5 cups)",
        "Sautéed mixed vegetables in olive oil",
      ],
      dinner: [
        "Salmon or chicken (200g) baked or grilled",
        "Pasta or rice (2 cups cooked)",
        "Side salad with avocado",
      ],
      snack: [
        "Peanut butter sandwich on whole wheat bread",
        "Protein shake with milk and banana",
        "Handful of mixed nuts and dried fruits",
      ],
    },
    mealItems: [
      {
        id: "wg-b1",
        name: "Power Egg Breakfast",
        nameHindi: "पावर अंडे नाश्ता",
        description:
          "4 whole eggs + whole wheat toast with peanut butter and banana",
        descriptionHindi: "4 पूरे अंडे + मूंगफली के मक्खन के साथ साबुत गेहूं टोस्ट और केला",
        isVeg: false,
        photoUrl: PHOTOS.eggs,
        time: "breakfast",
        items: [
          "4 whole eggs + 2 egg whites",
          "3 slices whole wheat toast + peanut butter",
          "1 large banana",
          "1 cup full-fat milk",
        ],
      },
      {
        id: "wg-b2",
        name: "Oats & Paneer Bowl",
        nameHindi: "ओट्स और पनीर बाउल",
        description: "High-protein oats with paneer, nuts and banana",
        descriptionHindi: "पनीर, मेवे और केले के साथ उच्च प्रोटीन ओट्स",
        isVeg: true,
        photoUrl: PHOTOS.nuts,
        time: "breakfast",
        items: [
          "1.5 cup oats cooked in full-fat milk",
          "100g scrambled paneer",
          "Banana and mixed nuts",
          "1 tsp honey",
        ],
      },
      {
        id: "wg-l1",
        name: "Grilled Chicken & Rice",
        nameHindi: "ग्रिल्ड चिकन और चावल",
        description: "220g grilled chicken with rice and sautéed vegetables",
        descriptionHindi: "220 ग्राम ग्रिल्ड चिकन, चावल और भुनी सब्जियां",
        isVeg: false,
        photoUrl: PHOTOS.chicken,
        time: "lunch",
        items: [
          "Grilled chicken 220g with spices",
          "1.5 cups cooked rice",
          "Sautéed veggies in olive oil",
        ],
      },
      {
        id: "wg-l2",
        name: "Rajma Rice",
        nameHindi: "राजमा चावल",
        description:
          "Protein-rich kidney beans with rice — classic muscle meal",
        descriptionHindi: "चावल के साथ प्रोटीन युक्त राजमा — क्लासिक मसल मील",
        isVeg: true,
        photoUrl: PHOTOS.dal,
        time: "lunch",
        items: [
          "1.5 cups rajma (kidney beans)",
          "1.5 cups cooked rice",
          "Onion salad and curd",
        ],
      },
      {
        id: "wg-d1",
        name: "Salmon & Pasta",
        nameHindi: "सैल्मन और पास्ता",
        description:
          "Baked salmon with pasta and avocado salad for calorie-dense dinner",
        descriptionHindi:
          "पास्ता और एवोकाडो सलाद के साथ बेक्ड सैल्मन — कैलोरी से भरपूर रात का खाना",
        isVeg: false,
        photoUrl: PHOTOS.rice,
        time: "dinner",
        items: [
          "Salmon 200g baked",
          "2 cups cooked pasta",
          "Side salad with avocado",
          "1 cup whole milk",
        ],
      },
      {
        id: "wg-d2",
        name: "Paneer Paratha & Curd",
        nameHindi: "पनीर पराठा और दही",
        description: "Calorie-dense paneer stuffed parathas with curd",
        descriptionHindi: "कैलोरी से भरपूर पनीर भरे पराठे और दही",
        isVeg: true,
        photoUrl: PHOTOS.paneer,
        time: "dinner",
        items: [
          "3 paneer stuffed parathas with ghee",
          "1 cup full-fat curd",
          "Mixed pickle and salad",
        ],
      },
      {
        id: "wg-s1",
        name: "Nut Butter Sandwich",
        nameHindi: "नट बटर सैंडविच",
        description: "Calorie-dense snack: whole wheat bread + peanut butter",
        descriptionHindi: "साबुत गेहूं ब्रेड + मूंगफली का मक्खन — कैलोरी युक्त स्नैक",
        isVeg: true,
        photoUrl: PHOTOS.nuts,
        time: "snack",
        items: [
          "2 slices whole wheat bread",
          "2 tbsp peanut butter",
          "Banana slices",
          "1 glass milk",
        ],
      },
      {
        id: "wg-s2",
        name: "Protein Shake",
        nameHindi: "प्रोटीन शेक",
        description: "Post-workout protein shake with milk and banana",
        descriptionHindi: "वर्कआउट के बाद दूध और केले के साथ प्रोटीन शेक",
        isVeg: false,
        photoUrl: PHOTOS.fruits,
        time: "snack",
        items: [
          "Whey protein scoop",
          "1 cup full-fat milk",
          "1 large banana",
          "Peanut butter 1 tbsp",
        ],
      },
    ],
    hydrationTips: [
      "Drink 3–4 litres of water daily",
      "Stay hydrated during heavy training sessions",
      "Avoid drinking too much water just before meals",
      "Milk is a great calorie-dense hydration source",
      "Coconut water can help replenish electrolytes post-workout",
    ],
    hydrationTipsHindi: [
      "रोजाना 3–4 लीटर पानी पियें",
      "भारी ट्रेनिंग के दौरान हाइड्रेटेड रहें",
      "भोजन से ठीक पहले बहुत अधिक पानी न पियें",
      "दूध एक बेहतरीन कैलोरी युक्त हाइड्रेशन स्रोत है",
      "नारियल पानी वर्कआउट के बाद इलेक्ट्रोलाइट्स भर सकता है",
    ],
    foodsToPrioritize: [
      "Chicken, beef, eggs, fatty fish, tuna",
      "Whole milk, cheese, cottage cheese, whey protein",
      "Rice, pasta, potatoes, sweet potatoes, oats",
      "Whole wheat bread, bagels, wraps",
      "Peanut butter, almond butter, avocado",
      "Bananas, mangoes, dried fruits",
    ],
    foodsToPrioritizeHindi: [
      "चिकन, बीफ, अंडे, वसायुक्त मछली, टूना",
      "पूर्ण वसा दूध, पनीर, कॉटेज चीज़, व्हे प्रोटीन",
      "चावल, पास्ता, आलू, शकरकंद, ओट्स",
      "साबुत गेहूं की रोटी, बैगेल, रैप्स",
      "मूंगफली का मक्खन, बादाम मक्खन, एवोकाडो",
      "केले, आम, सूखे मेवे",
    ],
    foodsToAvoid: [
      "Very low-calorie 'diet' foods that don't support growth",
      "Excessive junk food — calories matter but quality does too",
      "Alcohol (impairs muscle protein synthesis)",
      "Skipping meals — consistency is critical",
      "Highly processed meats with excessive sodium",
    ],
    foodsToAvoidHindi: [
      "बहुत कम कैलोरी वाले 'डाइट' खाद्य पदार्थ जो विकास में मदद नहीं करते",
      "अत्यधिक जंक फूड — कैलोरी मायने रखती है लेकिन गुणवत्ता भी",
      "शराब (मांसपेशी प्रोटीन संश्लेषण को बाधित करती है)",
      "भोजन छोड़ना — नियमितता महत्वपूर्ण है",
      "अत्यधिक सोडियम वाले प्रसंस्कृत मांस",
    ],
  },
  {
    id: "weight-loss",
    emoji: "🔥",
    title: "Weight Loss",
    titleHindi: "वजन घटाएं",
    subtitle: "Burn fat with a smart caloric deficit",
    subtitleHindi: "स्मार्ट कैलोरी घाटे के साथ चर्बी जलाएं",
    goal: "fat-loss",
    accentColor: "text-primary",
    bgAccent: "bg-primary/20",
    textAccent: "text-primary",
    macros: { protein: 165, carbs: 155, fat: 50, calories: 1750 },
    goalDescription:
      "Fat loss requires eating fewer calories than you burn while keeping protein high to preserve muscle. Focus on lean proteins, fibre-rich vegetables, and minimising processed carbs. Small, sustainable changes beat extreme diets every time.",
    goalDescriptionHindi:
      "चर्बी घटाने के लिए जितनी कैलोरी जलाते हैं उससे कम खाना होगा, लेकिन प्रोटीन ज्यादा रखें। दुबले प्रोटीन, फाइबर युक्त सब्जियों पर ध्यान दें। छोटे, टिकाऊ बदलाव ही काम करते हैं।",
    meals: {
      breakfast: [
        "3 egg whites + 1 whole egg omelette with vegetables",
        "½ cup oatmeal with berries (no sugar)",
        "Black coffee or unsweetened green tea",
      ],
      lunch: [
        "Grilled chicken breast (150g) or canned tuna",
        "Large mixed greens salad with tomato",
        "½ cup brown rice or 1 small sweet potato",
      ],
      dinner: [
        "Grilled fish (150g) — salmon, tilapia or cod",
        "Steamed broccoli, asparagus, zucchini",
        "½ cup cauliflower rice",
      ],
      snack: [
        "Greek yogurt (low-fat, unsweetened)",
        "Apple with 10–12 almonds",
        "Carrot sticks with hummus (2 tbsp)",
      ],
    },
    mealItems: [
      {
        id: "wl-b1",
        name: "Egg White Omelette",
        nameHindi: "अंडे का सफेद ऑमलेट",
        description: "3 egg whites + 1 whole egg with vegetables and oatmeal",
        descriptionHindi: "सब्जियों और ओटमील के साथ 3 अंडे का सफेद + 1 पूरा अंडा",
        isVeg: false,
        photoUrl: PHOTOS.eggs,
        time: "breakfast",
        items: [
          "3 egg whites + 1 whole egg omelette",
          "½ cup oatmeal with berries",
          "Black coffee",
        ],
      },
      {
        id: "wl-b2",
        name: "Sprouts & Fruits",
        nameHindi: "अंकुरित दाल और फल",
        description: "Low-calorie sprouts with seasonal fruits",
        descriptionHindi: "मौसमी फलों के साथ कम कैलोरी वाले अंकुरित दाल",
        isVeg: true,
        photoUrl: PHOTOS.fruits,
        time: "breakfast",
        items: [
          "1 cup mixed sprouts",
          "Seasonal fruits (apple/guava)",
          "1 cup green tea",
        ],
      },
      {
        id: "wl-l1",
        name: "Grilled Chicken Salad",
        nameHindi: "ग्रिल्ड चिकन सलाद",
        description: "Lean grilled chicken with large greens salad",
        descriptionHindi: "हरे सलाद के साथ दुबला ग्रिल्ड चिकन",
        isVeg: false,
        photoUrl: PHOTOS.salad,
        time: "lunch",
        items: [
          "Grilled chicken breast 150g",
          "Large mixed greens salad",
          "Light olive oil dressing",
          "½ cup brown rice",
        ],
      },
      {
        id: "wl-l2",
        name: "Moong Dal & Salad",
        nameHindi: "मूंग दाल और सलाद",
        description: "Low-calorie moong dal with fresh salad",
        descriptionHindi: "ताजे सलाद के साथ कम कैलोरी वाली मूंग दाल",
        isVeg: true,
        photoUrl: PHOTOS.dal,
        time: "lunch",
        items: [
          "1 cup moong dal (green gram)",
          "Cucumber and tomato salad",
          "1 small roti",
        ],
      },
      {
        id: "wl-d1",
        name: "Grilled Fish & Veggies",
        nameHindi: "ग्रिल्ड मछली और सब्जियां",
        description: "Lean grilled fish with steamed low-carb vegetables",
        descriptionHindi: "भाप में पकी कम कार्ब सब्जियों के साथ दुबली ग्रिल्ड मछली",
        isVeg: false,
        photoUrl: PHOTOS.chicken,
        time: "dinner",
        items: [
          "Grilled fish 150g (salmon/tilapia)",
          "Steamed broccoli and zucchini",
          "½ cup cauliflower rice",
        ],
      },
      {
        id: "wl-d2",
        name: "Tofu Stir Fry",
        nameHindi: "टोफू स्टिर फ्राई",
        description: "High-protein tofu with low-cal stir-fried vegetables",
        descriptionHindi: "कम कैलोरी भुनी सब्जियों के साथ उच्च प्रोटीन टोफू",
        isVeg: true,
        photoUrl: PHOTOS.salad,
        time: "dinner",
        items: [
          "150g tofu stir-fried with minimal oil",
          "Mixed vegetables (capsicum, broccoli)",
          "Soy sauce and ginger",
        ],
      },
      {
        id: "wl-s1",
        name: "Low-Fat Yogurt",
        nameHindi: "कम वसा दही",
        description: "Unsweetened low-fat Greek yogurt with cucumber",
        descriptionHindi: "खीरे के साथ बिना चीनी का कम वसा वाला ग्रीक दही",
        isVeg: true,
        photoUrl: PHOTOS.nuts,
        time: "snack",
        items: [
          "Greek yogurt 150g (low-fat)",
          "Cucumber slices",
          "Pinch of black pepper",
        ],
      },
      {
        id: "wl-s2",
        name: "Apple & Almonds",
        nameHindi: "सेब और बादाम",
        description: "Fibre-rich apple with protein-packed almonds",
        descriptionHindi: "प्रोटीन युक्त बादाम के साथ फाइबर से भरपूर सेब",
        isVeg: true,
        photoUrl: PHOTOS.fruits,
        time: "snack",
        items: ["1 medium apple", "10–12 raw almonds"],
      },
    ],
    hydrationTips: [
      "Drink 2.5–3 litres of water daily",
      "Drink a full glass of water before each meal to reduce appetite",
      "Sparkling water can help curb cravings between meals",
      "Green tea boosts metabolism — 1–2 cups daily",
      "Avoid diet sodas — they can still trigger cravings",
    ],
    hydrationTipsHindi: [
      "रोजाना 2.5–3 लीटर पानी पियें",
      "भूख कम करने के लिए हर भोजन से पहले एक पूरा गिलास पानी पियें",
      "भोजन के बीच क्रेविंग रोकने के लिए स्पार्कलिंग पानी",
      "ग्रीन टी मेटाबॉलिज्म बढ़ाती है — रोज 1–2 कप",
      "डाइट सोडा से बचें — ये भी क्रेविंग पैदा कर सकते हैं",
    ],
    foodsToPrioritize: [
      "Chicken breast, white fish, egg whites, tofu",
      "Broccoli, spinach, kale, zucchini, cucumber",
      "Oats, brown rice, sweet potato (controlled portions)",
      "Berries, apples, grapefruit",
      "Greek yogurt (low-fat), cottage cheese",
      "Black beans, lentils, chickpeas",
    ],
    foodsToPrioritizeHindi: [
      "चिकन ब्रेस्ट, सफेद मछली, अंडे का सफेद, टोफू",
      "ब्रोकली, पालक, केल, तोरी, खीरा",
      "ओट्स, भूरे चावल, शकरकंद (नियंत्रित मात्रा में)",
      "जामुन, सेब, चकोतरा",
      "ग्रीक दही (कम वसा), पनीर",
      "काले सेम, दाल, छोले",
    ],
    foodsToAvoid: [
      "White bread, white rice in large amounts, pastries",
      "Fried food, fast food burgers and fries",
      "Sugary drinks, juices, sports drinks",
      "High-calorie condiments: mayo, creamy sauces",
      "Sweets, chocolates, ice cream",
      "Late-night high-calorie snacking",
    ],
    foodsToAvoidHindi: [
      "सफेद ब्रेड, बड़ी मात्रा में सफेद चावल, पेस्ट्री",
      "तला हुआ खाना, फास्ट फूड बर्गर और फ्राइज",
      "मीठे पेय, जूस, स्पोर्ट्स ड्रिंक",
      "उच्च कैलोरी सॉस: मेयो, क्रीमी सॉस",
      "मिठाई, चॉकलेट, आइसक्रीम",
      "रात को देर से उच्च कैलोरी स्नैकिंग",
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

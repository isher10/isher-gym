import type { MembershipPlan } from "@/types";

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 999,
    period: "month",
    features: [
      "Full gym floor access",
      "Cardio equipment access",
      "Locker room & shower",
      "Basic fitness assessment",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: 1799,
    period: "month",
    highlighted: true,
    features: [
      "Everything in Basic",
      "Unlimited group fitness classes",
      "Full cardio zone access",
      "2 guest passes per month",
      "Body composition tracking",
      "Priority booking for classes",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 2999,
    period: "month",
    features: [
      "Everything in Standard",
      "4 personal trainer sessions/month",
      "Monthly diet consultation",
      "Towel service included",
      "Dedicated locker",
      "Supplement guidance",
    ],
  },
  {
    id: "annual",
    name: "Annual",
    price: 14999,
    period: "year",
    features: [
      "Everything in Premium",
      "2 free months (pay for 10)",
      "Unlimited personal training",
      "Custom meal plan",
      "Exclusive member events",
      "Priority support access",
    ],
  },
];

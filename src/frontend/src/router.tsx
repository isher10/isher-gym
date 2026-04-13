import Layout from "@/components/Layout";
import About from "@/pages/About";
import Bmi from "@/pages/Bmi";
import Challenges from "@/pages/Challenges";
import Diet from "@/pages/Diet";
import Gamification from "@/pages/Gamification";
import Home from "@/pages/Home";
import Membership from "@/pages/Membership";
import Progress from "@/pages/Progress";
import Reminders from "@/pages/Reminders";
import WorkoutCategory from "@/pages/WorkoutCategory";
import WorkoutExercise from "@/pages/WorkoutExercise";
import Workouts from "@/pages/Workouts";
import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const workoutsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/workouts",
  component: Workouts,
});

const workoutCategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/workouts/$category",
  component: WorkoutCategory,
});

const workoutExerciseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/workouts/$category/$exercise",
  component: WorkoutExercise,
});

const dietRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/diet",
  component: Diet,
});

const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/progress",
  component: Progress,
});

const membershipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/membership",
  component: Membership,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const bmiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bmi",
  component: Bmi,
});

const challengesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/challenges",
  component: Challenges,
});

const remindersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reminders",
  component: Reminders,
});

const gamificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gamification",
  component: Gamification,
});

const feedbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/feedback",
  component: lazyRouteComponent(() => import("./pages/Feedback")),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  workoutsRoute,
  workoutCategoryRoute,
  workoutExerciseRoute,
  dietRoute,
  progressRoute,
  membershipRoute,
  aboutRoute,
  bmiRoute,
  challengesRoute,
  remindersRoute,
  gamificationRoute,
  feedbackRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

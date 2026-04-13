import Layout from "@/components/Layout";
import About from "@/pages/About";
import Diet from "@/pages/Diet";
import Home from "@/pages/Home";
import Membership from "@/pages/Membership";
import Progress from "@/pages/Progress";
import WorkoutCategory from "@/pages/WorkoutCategory";
import WorkoutExercise from "@/pages/WorkoutExercise";
import Workouts from "@/pages/Workouts";
import {
  createRootRoute,
  createRoute,
  createRouter,
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

const routeTree = rootRoute.addChildren([
  homeRoute,
  workoutsRoute,
  workoutCategoryRoute,
  workoutExerciseRoute,
  dietRoute,
  progressRoute,
  membershipRoute,
  aboutRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

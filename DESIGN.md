# Design Brief

## Direction

Isher Gym — Modern fitness app with bold dark theme and energetic orange-red accents for motivation and action.

## Tone

Energetic and action-oriented: maximalist fitness intensity with warm, inviting darkness. Bold accents drive user engagement toward workouts and progress.

## Differentiation

Vivid orange-red accent (0.65 L, 0.22 C, 35° H) pops against warm charcoal background, creating visceral CTA clarity and motivational energy throughout the interface.

## Color Palette

| Token          | OKLCH            | Role                                 |
| -------------- | ---------------- | ------------------------------------ |
| background     | 0.145 0.015 50   | Dark charcoal base, app foundation   |
| foreground     | 0.92 0.01 60     | Text on backgrounds, high contrast   |
| card           | 0.18 0.018 50    | Elevated surfaces, workout/diet cards|
| primary        | 0.65 0.22 35     | Orange-red, CTAs and active states   |
| accent         | 0.65 0.22 35     | Same as primary, highlights, badges  |
| secondary      | 0.22 0.02 50     | Tertiary sections, muted backgrounds |
| muted          | 0.22 0.02 50     | Disabled states, subtle typography   |
| destructive    | 0.55 0.22 25     | Warnings, delete actions             |

## Typography

- Display: Space Grotesk — headings, hero text, motivational quotes, tab labels
- Body: DM Sans — exercise descriptions, diet tips, progress tracking, UI labels
- Scale: Hero `text-5xl md:text-7xl font-bold tracking-tight`, Section headings `text-3xl font-bold`, Labels `text-sm font-semibold uppercase`

## Elevation & Depth

Card-based hierarchy with subtle shadows: `shadow-subtle` (8px depth) for cards, `shadow-elevated` (16px depth) for overlays and modals. No shadows on base surfaces; subtle warm shadows on interactive elements for touch clarity.

## Structural Zones

| Zone       | Background        | Border                    | Notes                           |
| ---------- | ----------------- | ------------------------- | ------------------------------- |
| Header     | card (0.18 L)     | border-border (0.28 L)    | Hero section with gym branding  |
| Content    | background (0.145 L) | —                       | Alternating card grid sections  |
| Cards      | card (0.18 L)     | border-border (0.28 L)    | Workout, diet, progress modules |
| Footer     | secondary (0.22 L)| border-border (0.28 L)    | Bottom tab navigation           |

## Spacing & Rhythm

Spacious rhythm for mobile-first: 24px gap between sections, 16px padding within cards, 12px gap between items in grid. Touch-friendly tap targets (44px min). Consistent breathing around content prevents visual overload.

## Component Patterns

- Buttons: Orange-red (accent) with dark foreground, hover opacity 90%, rounded-lg (12px)
- Cards: card background, subtle border, rounded-lg with `shadow-elevated` on hover
- Badges: Accent background with primary foreground, small rounded pills (rounded-full)
- Tabs: Bottom navigation with active tab highlighted in accent color, inactive text muted-foreground

## Motion

- Entrance: `animate-slide-up` (0.3s ease-out) for cards and modals, staggered for card grids
- Hover: Opacity transitions (0.3s) on buttons and cards, no scale transforms (mobile-safe)
- Decorative: `animate-pulse-accent` (2s) on active CTA buttons for subtle fitness engagement cue

## Constraints

- Always use `oklch()` color tokens from CSS variables; no arbitrary hex or RGB
- Keep accent usage to CTAs, active states, and highlights only (not backgrounds)
- Maintain AA+ contrast: foreground on background (ΔL 0.775), foreground on primary (ΔL 0.275)
- Mobile-first design; all spacing and touch targets account for 375px viewport minimum

## Signature Detail

Warm orange-red accent glows subtly via `shadow-glow-accent` on active buttons, creating visceral "ready to lift" tension without being garish — fitness energy captured in a single shadow token.



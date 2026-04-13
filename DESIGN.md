# Design Brief

## Direction

Isher Gym — Clean, minimal fitness app with dark foundation and controlled orange-red accents. Spacious, uncluttered UI prioritizes breathing room and focus.

## Tone

Restrained minimalism with energetic accents: dark charcoal base with orange-red reserved for CTAs and active states only. Calm, approachable, motivating without visual chaos.

## Differentiation

Orange-red accent pops surgically at interactive moments (buttons, active tabs, badges) while backgrounds remain calm and neutral — fitness clarity without sensory overload.

## Color Palette

| Token          | OKLCH            | Role                                  |
| -------------- | ---------------- | ------------------------------------- |
| background     | 0.14 0.012 50    | Deep charcoal base, app foundation    |
| foreground     | 0.93 0.008 60    | Text on backgrounds, refined contrast |
| card           | 0.175 0.015 50   | Elevated surfaces, subtle boundaries  |
| primary        | 0.65 0.22 35     | Orange-red, CTAs and active states    |
| accent         | 0.65 0.22 35     | Same as primary, sparingly applied    |
| secondary      | 0.21 0.015 50    | Tertiary sections, muted backgrounds  |
| muted          | 0.21 0.015 50    | Disabled states, subtle typography    |
| destructive    | 0.55 0.22 25     | Warnings, delete actions              |

## Typography

- Display: Space Grotesk — headings, hero text, motivational quotes, crisp hierarchy
- Body: DM Sans — exercise descriptions, diet tips, progress tracking, readable labels
- Scale: Hero `text-4xl md:text-6xl font-bold tracking-tight`, Section headings `text-2xl font-bold`, Labels `text-sm font-medium`

## Elevation & Depth

Minimal shadow treatment: subtle 2px depth for cards at rest, gentle 4px depth on hover/active states. Borders define structure over shadows — clean separation without visual clutter.

## Structural Zones

| Zone       | Background        | Border                    | Notes                            |
| ---------- | ----------------- | ------------------------- | -------------------------------- |
| Header     | card (0.175 L)    | border-border (0.26 L)    | Top nav with gym branding, clean |
| Content    | background (0.14 L) | —                        | Generous gaps, card-grid rhythm  |
| Cards      | card (0.175 L)    | border-border (0.26 L)    | Workout, diet, progress modules  |
| Footer     | secondary (0.21 L)| border-border (0.26 L)    | Tab navigation at bottom         |

## Spacing & Rhythm

Spacious, breathing rhythm: 28px gap between major sections, 16px padding within cards, 12px gap between items. Touch-friendly 48px tap targets. Negative space prevents visual fatigue and emphasizes content hierarchy.

## Component Patterns

- Buttons: Orange-red accent with dark foreground, hover opacity 85%, rounded-lg (10px)
- Cards: card background, minimal border, subtle shadow, rounded-lg on hover
- Badges: Accent background sparingly, primary foreground, small rounded pills
- Tabs: Top/bottom nav with active tab accented, inactive text muted

## Motion

- Entrance: `animate-slide-up` (0.3s ease-out) on cards and modals, staggered for grids
- Hover: Opacity and subtle shadow transitions (0.3s) on interactive elements
- Decorative: None — focus on clarity over animation

## Constraints

- Use OKLCH tokens from CSS variables exclusively; no arbitrary hex or RGB
- Orange-red accent reserved for interactive elements and active states only
- Maintain AA+ contrast: foreground on background (ΔL 0.79), foreground on accent (ΔL 0.28)
- Mobile-first design; 48px minimum touch targets

## Signature Detail

Refined minimal aesthetic — orange-red emerges only at moments of action, creating visceral clarity and user intent focus without visual noise.



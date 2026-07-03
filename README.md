# CoachUp Kids — Discovery Day Prototype 🦦

A high-fidelity, mobile-first clickable prototype for **CoachUp Kids**.
Parents and children experience **Discovery Day** with Remi the Otter and
receive a **CoachUp DNA™** report.

> **Phase 1 prototype only** — no backend, no login, no payments, no real
> database. All data is mock data stored in React state + `localStorage`.

## What CoachUp Kids is (and isn't)

CoachUp Kids helps children become physically, emotionally, mentally and
socially prepared for sports and active lifestyles.

It is **not** a sports recommendation app, a talent prediction app, a
diagnosis tool, or a ranking tool. The assessment is designed to feel like
an adventure — never a test — and the report uses growth language only.

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).
Best experienced at mobile width — open DevTools and toggle device emulation,
or just resize the window. It's responsive on desktop too.

Other commands:

```bash
npm run build     # type-check + production build
npm run preview   # serve the production build
```

## The flow

1. **Landing** — "Discover how your child loves to move" → Start Discovery Day
2. **Parent Quick Start** — child name, age (4–12), activity level, activities tried, parent goal, optional note
3. **Meet Remi** — Remi explains this is an adventure, not a test
4. **Movement Snapshot** — 3 mini-adventures across Locomotor / Object Control / Stability
   - Ages 4–6: Bunny Hop Adventure 🐰 · Rolling Ball Rescue ⚽ · Balancing Flamingo 🦩
   - Ages 7–12: Zig-Zag Lightning Run ⚡ · Wall Ball 10 🎾 · Superhero Hold 🦸
5. **Comfort Map** — sound, contact, mess, climate (Calm 1 / Flexible 2 / Adventure 3)
6. **Spark Snapshot** — drive, confidence, social style
7. **Celebration** — confetti! 🎉
8. **CoachUp DNA™ Report** — strength, growth quest, comfort style, spark, recommended module, parent explanation, coach notes
9. **Parent Dashboard** — profile card, 12-week journey preview, growth quest, comfort notes, coach notes, book-a-trial CTA

## Scoring engine (`src/lib/scoring.ts`)

- Every answer maps to **Emerging = 1 / Growing = 2 / Thriving = 3**
- **Movement strength** = highest movement domain; **Growth quest** = lowest
- **Comfort style** = Calm if ≥3 answers are 1, Adventure if ≥3 are 3, otherwise Flex
- **Delivery calibration**: drive → intensity ramp, confidence → welcome style, social → group format
- **Module assignment**:
  | Module | Rule |
  |---|---|
  | All-Stars Multi-Sport 🌟 | age 7–12 with 2+ Thriving domains |
  | Foundations Explorers 🧭 | balanced profiles, early-journey profiles, or ages 4–6 with no Thriving domain yet |
  | Lightning Movers ⚡ | Locomotor strength |
  | Ball Masters 🏀 | Object Control strength |
  | Balance Ninjas 🥷 | Stability strength |

## Project structure

```
src/
├── App.tsx                  # Flow state machine + navigation + persistence
├── main.tsx                 # Entry point
├── index.css                # Tailwind + global background
├── types.ts                 # All shared TypeScript types
├── data/
│   └── content.ts           # All mock content: activities, questions, modules
├── lib/
│   ├── scoring.ts           # Scoring engine + report copy generation
│   └── storage.ts           # localStorage persistence
├── components/              # Reusable UI (Button, Card, ProgressBar, Remi,
│   ...                      #   SpeechBubble, OptionCard, Screen, Confetti)
└── screens/                 # One component per flow step
    ...
```

## Tech

React 18 · Vite 5 · TypeScript · TailwindCSS 3 · Framer Motion 11

## Tone rules baked into all copy

Never "weak", "low ability", "sensitive", or "problem" — growth language
only: *Emerging, Growing, Thriving, growth quest, movement spark*.

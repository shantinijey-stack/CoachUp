# CoachUp Kids — Reset-Safe Handoff

**Purpose:** this file lets a brand-new Claude (or human) session continue work on the
CoachUp Kids prototype without guessing. Read it fully before changing anything.

- **Repo:** `shantinijey-stack/CoachUp` (public)
- **Working branch (ALL work goes here):** `claude/coachup-kids-prototype-g44zai`
- **Run locally:** `npm install && npm run dev` (Vite prints the URL, usually :5173)
- **Verify:** `npm run build` must pass; a Playwright E2E script exists in session
  scratchpads (recreate if lost — it walks the entire flow and every feature below)
- **Stack:** React 18 · Vite 5 · TypeScript · TailwindCSS 3 · Framer Motion 11.
  Prototype only: no backend, no login, no payments. All state in React + localStorage
  (`coachup-kids-discovery-v1`, see `src/lib/storage.ts`).
- **Shareable builds:** `docs/index.html` is an auto-generated single-file build of the
  whole app (regenerate after changes by inlining `dist/` CSS+JS into one HTML file —
  see the pattern in the file itself). A GitHub Pages workflow exists
  (`.github/workflows/pages.yml`) but Pages was never enabled by the owner
  (one manual step: repo Settings → Pages → Source: GitHub Actions).

---

## 1. What changed in this session (most recent last)

1. Built the entire Phase 1 prototype: Landing → Parent Quick Start → Meet guide →
   Movement Snapshot (age-banded) → Comfort Map → Spark Snapshot → Celebration →
   CoachUp DNA™ report → Parent Dashboard. Scoring engine in `src/lib/scoring.ts`.
2. Added How-to-play visual guides (animated emoji demos) + game timers
   (countdown / stopwatch / tap-counter) to every movement activity.
3. Added personalized 12-week training plan (`src/lib/plan.ts`, quest library in
   `src/data/quests.ts`): 3 home quests/week, strength-led early, growth-led late.
4. Added weekly check-in with adaptive encouragement, parent quest-swap (🔄, same
   movement domain), and choosable guides (Remi otter / Luna owl / Dash dolphin /
   Koko koala) via `GuideContext` — story copy personalizes by name substitution.
5. Added the Courage Curve (`src/data/courage.ts`): one Courage Quest per week —
   Weeks 1–4 *Knowing Me*, 5–8 *Standing Strong* (bullying toolkit: Safety Team,
   Strong Stop, telling vs tattling, Buddy Shield), 9–12 *Lifting Others* (leadership).
6. Added stickers & effort badges (`src/lib/badges.ts`, `BadgeBook.tsx`) — rewards
   celebrate effort only, never scores; no streaks.
7. Added Rookie→Pro→Master quest levels (parent-confirmed "Smashed it!", NOT
   timer-based auto-rating) and the Growth Report (`src/lib/growth.ts`).
8. Added Seasons + Graduation Adventure gate (`src/lib/graduation.ts`,
   `GraduationDay.tsx`): 3 seasons × 12 weeks; gate = 25/36 quests + 4 Pro (6 Master);
   graduation replays the 3 Discovery activities vs the child's OWN baseline;
   fail-state is a "Victory Lap", never a fail. Master pass = CoachUp Champion →
   Growth Report unlocks "sport doors" (plural sport suggestions per strength).
9. Added guide personalities (picker styles, mottos, per-guide check-in reactions,
   graduation cheers) in `src/data/guides.ts`.
10. **THIS SESSION'S FINAL CHANGE — Landing page redesign (parent-facing):**
    removed the otter from the front page, added a real brand logo
    (`src/components/BrandLogo.tsx`), new copy and structure (see §4).

## 2. Current product direction

- CoachUp Kids **brings a child's sportiness to light — physically, emotionally,
  socially, and mentally**. It prepares children to *enjoy* sport, and prepares
  parents and coaches to support them.
- It is explicitly **NOT a talent test, ranking tool, sports-recommendation engine,
  diagnosis tool, or pressure-based sports selector**. (Exception negotiated with the
  founder: after completing all three seasons — Champion status — the Growth Report
  may name *plural* example sports as "doors to try", framed as invitations, never
  predictions.)
- Brand feel: **parent-trustworthy, sporty, warm, emotionally supportive** for
  grown-ups; playful adventure for children. Landing page speaks to parents; the
  in-app journey speaks to children through their chosen guide.
- The business bridge is real-world coaching: trial-class CTAs, coach notes, and
  (future) coach-verified graduations. Retention philosophy: the app is a companion
  to real sport, not an endless engagement machine — no streaks/guilt mechanics ever.
- Tone rules (enforced by tests): never "weak", "low ability", "sensitive",
  "problem". Growth language only: Emerging / Growing / Thriving, "growth quest".

## 3. New landing page strategy

- Audience: **parents first**. The child-facing mascot world starts AFTER Quick Start
  (Meet-your-guide screen). **The otter must NOT appear on the front page.**
- Job of the page: in 5 seconds a parent understands (a) we reveal hidden sportiness,
  (b) readiness is emotional/social/mental as well as physical, (c) zero pressure —
  not a talent test or ranking.
- Structure: hero (logo, headline, subheadline, readiness chips, primary + secondary
  CTA) → "How Discovery Day helps" (supporting copy + 3 parent value cards with small
  SVG icons, not emojis) → reassurance line → repeat CTA + time expectation.
- Style: clean, bright, warm, trustworthy; rounded shapes; minimal emojis; no
  purple-heavy gradients; must not read as a game-only product.

## 4. Exact landing copy (as shipped in `src/screens/Landing.tsx`)

- **Headline:** Bring your child's sportiness to light
- **Subheadline:** A playful discovery experience that helps parents understand how
  their child moves, builds confidence, and gets emotionally ready for sport.
- **Readiness chips:** "Ready in every way:" Physical · Emotional · Social · Mental
- **Primary CTA:** Start Discovery Day (appears in hero and at page bottom)
- **Secondary CTA:** See how it works (smooth-scrolls to `#how-it-works`)
- **Section title:** How Discovery Day helps
- **Supporting copy:** In a few gentle activities, CoachUp Kids reveals your child's
  movement strengths, comfort style, confidence needs, and coaching approach — so
  their first steps into sport feel positive, prepared, and fun.
- **Value cards:**
  1. *Discover their movement spark* — See how your child naturally loves to move —
     running and agility, coordination with balls, balance and body control —
     through play, not testing.
  2. *Build emotional readiness* — Understand their comfort style, confidence needs
     and social sweet spot — so new activities feel safe and exciting instead of
     overwhelming.
  3. *Give coaches better starting notes* — Practical guidance on pace, welcome style
     and group format — so their very first session is shaped around who they are.
- **Reassurance line:** No rankings. No pressure. Just a clearer way to help your
  child enjoy sport.
- **Footer note:** About 10 minutes, together with your child. Not a talent test —
  a head start.
- **Resume affordance:** "Continue where we left off →" (text link, only when a saved
  run exists).

## 5. Logo direction (as shipped in `src/components/BrandLogo.tsx`)

- Concept: **a soft coral ball rising along a teal growth arc into a golden spark** —
  "sportiness coming to light". Inline SVG, exports `BrandMark` (icon only) and
  `BrandLogo` (icon + wordmark "CoachUp **Kids**", deepsea + tangerine).
- Colors: coral/tangerine gradient ball (#FF9351→#FF6B6B), cream seam (#FFF9F0),
  lagoon arc (#2EC4B6), sunshine spark (#FFC94D), deepsea text (#1B4965).
- Rules: **no animals, trophies, whistles, medals, or aggressive sports imagery.**
  Warm, sporty, trustworthy, modern, parent-friendly. Works small (header) and large
  (hero); intended for app header, social thumbnails, parent website.
- Note: only the Landing page uses BrandLogo so far. The Dashboard header still uses
  the old orange "C" square — swapping it to `BrandLogo` is a sensible next polish.

## 6. Files / components changed for the landing redesign

- `src/components/BrandLogo.tsx` — **new**: BrandMark SVG + BrandLogo wordmark.
- `src/screens/Landing.tsx` — **rewritten**: parent-facing hero, value cards with
  inline SVG icons, reassurance, dual CTAs, scroll anchor. Otter (Remi component)
  removed from this screen only. Props/API unchanged (`onStart`, `hasSavedRun`,
  `onResume`) so App.tsx routing is untouched.
- Everything else intentionally untouched in the redesign.

## 7. Unfinished tasks / known gaps

- Regenerate + commit `docs/index.html` and re-publish the shareable single-file
  HTML + full-code markdown export after any change (the pattern: inline dist
  CSS/JS into one HTML document; also republish the Claude artifact if in a session
  that owns it).
- GitHub Pages still needs the owner to flip Settings → Pages → Source: GitHub
  Actions (workflow is ready; last attempt failed only on that permission).
- Dashboard/report headers still use the old "C" logo — consider BrandLogo there.
- Real character illustrations (guides are emoji placeholders), sound design.
- **Before real families use it:** child-development / safeguarding review of the
  Courage Curve (esp. Standing Strong weeks), level pacing, and graduation copy.
- Upper-body-strength signal quests were discussed but not built (founder floated
  strength-based sport suggestions; current domains are locomotor / object control /
  stability only).
- Landing page E2E coverage is minimal (screenshot + CTA click); value-card copy has
  no assertions yet.

## 8. Decisions that must NOT be reversed

1. **No otter/mascot on the landing page.** Guides live inside the child journey.
2. **Never auto-rate children from timer data.** Level-ups are parent/child
   confirmed ("Smashed it!"). Timers are personal-best toys only.
3. **No rankings, no cross-child comparison, ever.** Graduation compares a child to
   their own baseline only.
4. **No streaks or guilt mechanics.** Rewards celebrate effort; progress never expires.
5. **Growth language only** (no "weak"/"low ability"/"sensitive"/"problem") —
   automated checks exist in the test scripts; keep them passing.
6. **Courage content always routes to trusted adults**; week 5 keeps its explicit
   grown-up safety note. The app never positions itself as the child's confidant on
   safety topics.
7. **Named sports appear ONLY at Champion status, plural, as invitations.**
8. **Preserve the existing app flow** (Discovery Day structure, Quick Start, reports,
   training plan, navigation) unless the founder explicitly asks to change it.
9. All work stays on branch `claude/coachup-kids-prototype-g44zai`; commit and push
   after each feature; never force-push over history.

## 9. Instructions for the next session

- Read this file, then `README.md` (feature list #1–19) before coding.
- Founder communicates in short, idea-dense messages; respond by building, then
  explain in plain, non-technical language with screenshots. She shares the app with
  others via the single-file HTML and a Claude artifact link — regenerate both after
  changes.
- Verify every change: `npm run build`, the scoring/plan/graduation/courage unit
  checks (tsx scripts), and a Playwright walk of the full flow at 390×844.
- The landing page is now parent-facing: keep it that way. Child-facing playfulness
  begins at "Meet your guide".
- Likely next asks: BrandLogo across app headers, real illustrations, weekly
  check-in adjusting quest *content* (not just messaging), coach/class companion
  features, safeguarding review prep.

# CoachUp Kids — Logo & Copy Cleanup Handoff

Reset-safe notes for the next session. Scope of this pass: brand logo replacement,
consistent logo placement, and removal of double hyphens / em dashes from visible
copy. Nothing else was changed (flow, navigation, scoring, Discovery Day, reports,
dashboard, guide selection and training plan logic are all untouched).

- **Repo:** `shantinijey-stack/CoachUp` · **Branch:** `claude/coachup-kids-prototype-g44zai`
- Companion doc: `coachup-kids-reset-handoff.md` (full product history and rules).

## 1. What logo was replaced

The previous mark (a coral ball with a teal swoosh and spark) was judged too
generic. It was replaced with a more ownable mark: **an abstract child mid
star-jump, leaping above a soft teal bounce arc, with a blue spark at the
fingertips and a golden circle head as a point of light.** It communicates
movement, growth, confidence and "sportiness coming to light" without using
mascots, animals, balls-with-swooshes, trophies, medals, whistles or aggressive
sports imagery. Palette: coral→orange gradient limbs (#FF9351→#FF6B6B), lagoon
arc (#2EC4B6), sunshine head (#FFC94D), sky spark (#4CC9F0), deepsea wordmark
(#1B4965) with "Kids" in tangerine.

## 2. Where the new logo is used

- **Landing page:** one brand lockup in the hero (BrandMark 72px stacked above the
  wordmark). The mark is deliberately NOT repeated elsewhere on that screen.
- **Dashboard:** `BrandLogo` (mark + wordmark) replaces the old orange "C" square
  in the header.
- **DNA Report, Training Plan, Growth Report, Sticker Book:** small `BrandMark`
  (30px) at the right of the shared `Screen` header row via a new `brand` prop.
- Quiz/question screens intentionally show no logo (progress bar owns that row).

## 3. Reusable component

`src/components/BrandLogo.tsx` (already existed; the SVG artwork was replaced,
API unchanged): exports `BrandMark({ size })` for the icon alone and default
`BrandLogo({ markSize })` for icon + wordmark. Every placement uses these two
exports; never inline a copy of the SVG.

## 4. Remi confirmation

**Remi still works as a selectable guide.** The guide-selection screen
(`MeetRemi.tsx`) still offers Remi 🦦, Luna 🦉, Dash 🐬, Koko 🐨; Remi remains the
default (`guideId: "remi"` in `storage.ts`); choosing any guide personalizes story
copy, check-in reactions and cheers exactly as before. Verified by the E2E run
(selects Luna, confirms personalization) after the logo change. Guides appear
in-app only, starting at the Meet-your-guide screen. They are never the brand logo.

## 5. Text cleanup done

- All em dashes (`—`) removed from `src/` (verified: zero remain). Each occurrence
  was rewritten, not blindly deleted: most became sentence breaks with the next
  word capitalized ("Last week was a smash hit. Try the level-up twists early!"),
  a few became commas or colons where a period read badly (e.g. guide intro line
  "I'm Luna, wise and twinkly!", Growth Report heading "Ball Magic: the next quest",
  intensity labels "Gentle build: short bursts…").
- No `--` existed in visible copy; remaining `--` matches in the repo are code
  comment divider lines only (not UI) and were left alone.
- En dashes in ranges ("Weeks 1–4", "2–3 steps") were intentionally kept; only
  `—` and `--` were in scope.
- Two code paths parsed strings on " — " and were migrated to ": " **before** the
  sweep: `scoring.ts` (`INTENSITY_RAMP` split) and `growth.ts` (`STRENGTH_DETAIL`
  split). If you add label-plus-detail strings later, use ": " as the separator.

## 6. Files/components changed

- `src/components/BrandLogo.tsx`. New SVG artwork (star-jump mark).
- `src/components/Screen.tsx`. New optional `brand` prop rendering BrandMark in
  the header row.
- `src/screens/Landing.tsx`. Hero lockup (single mark, no duplication).
- `src/screens/Dashboard.tsx`. Header uses BrandLogo.
- `src/screens/DnaReport.tsx`, `TrainingPlan.tsx`, `GrowthReport.tsx`,
  `BadgeBook.tsx`. `brand` enabled on their Screen.
- Em-dash rewrites touched nearly every file with copy: `data/content.ts`,
  `data/quests.ts`, `data/courage.ts`, `data/guides.ts`, `lib/scoring.ts`,
  `lib/growth.ts`, `lib/plan.ts`, `lib/badges.ts`, `lib/graduation.ts`, and all
  screens/components with visible text (plus comments, harmlessly).

## 7. Unfinished issues

- `index.html` favicon is still the 🦦 emoji; consider exporting the new
  BrandMark as the favicon.
- README screenshots/wording don't yet mention the new logo.
- The docs/ single-file build and shareable exports were regenerated in this
  session; regenerate again after any future change.
- GitHub Pages still awaits the one manual enable step (Settings → Pages →
  Source: GitHub Actions).

## 8. Instructions for the next session

- Use `BrandMark` / `BrandLogo` for any new logo placement; one mark per screen.
- Never bring back a mascot/animal/ball-with-swoosh as the brand logo; never
  remove Remi or the other guides from guide selection.
- Keep visible copy free of `—` and `--`; rewrite sentences naturally (periods,
  commas or colons), and use ": " for label/detail strings that code may split.
- Verify with: `npm run build`, the four tsx unit suites (scoring, plan, courage,
  graduation), and the Playwright E2E walk. All were green at the end of this pass.

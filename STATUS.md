---
attention: Dormant
state: Live
form: Website
updated: 2026-07-14
live_url: https://the-draw-black.vercel.app
---

# The Draw — STATUS

**What this file is.** A running record of where The Draw stands — decisions made, what's shipped, what's blocked. Reference [INTENT.md](INTENT.md) for what the project is. For vision, structure, and the word pool mechanics, see `../\_docs/THE-DRAW-VISION.md`.

Last updated: 2026-07-14

---

## Decisions

### 2026-07-14 — Shift from weekly aspiration to weekday workflow

What:
- The Draw is now defined as a weekday publishing workflow that the Morning Brief can surface by day: Monday draw, Tuesday draft, Wednesday publish, Thursday log blockers or shipment, Friday catch-up only if missed.

Why:
- The project has been stalled for roughly 3-4 months despite working infrastructure. The failure mode is not missing tooling; it is a weekly unit of work that is too vague and emotionally expensive. A day-specific workflow is easier to obey and easier for the Morning Brief to enforce.

How to apply:
- Treat the daily action as the real commitment, not "make progress on The Draw" in general.
- Use the Morning Brief to surface the one required action for that weekday.
- Judge the project by weekly publication streak, not by how substantial each piece feels.

### 2026-06-24 — Docs initialized

What:
- STATUS.md and INTENT.md created as part of a Marius documentation pass. Sourced from VISION.md + registry.

Why:
- The project needed companion docs to clarify intent and current state.

How to apply:
- Keep STATUS focused on current state and decisions; keep INTENT focused on mission and rules.

### 2026-03-30 — Buttondown API URL fixed

What:
- Last GitHub commit fixed the Buttondown API URL (email → com). Site is functional and auto-deploys from GitHub via Vercel.

Why:
- Subscription flow depended on the correct API endpoint.

How to apply:
- Treat deployment and newsletter plumbing as working unless new evidence says otherwise.

### 2026-07-14 — The bottleneck is workflow design, not missing features

What:
- The Draw's blocker is no longer described as "write one piece" in the abstract. The blocker is a missing operational rhythm between drawing words and publishing a piece.

Why:
- "Just write one" has not converted a working toolchain into output. The system needed narrower actions that could recur automatically.

How to apply:
- Prefer changes that reduce ambiguity, scheduling friction, or emotional load.
- Do not spend more time extending features until the weekday cadence produces shipped work.

---

## Where I left off

- **Deployed:** `the-draw-black.vercel.app` — live, auto-deploy from GitHub (cubicleaf/The-Draw)
- **Word pool:** 1,290 words in `word_wall.json` at `webdev/projects/English/`
- **draw.py:** functional — run it to pull 10 words
- **publish.py:** functional — drops the piece into `draws.json`, git push, Vercel deploys
- **Buttondown:** wired for newsletter
- **Week 1 words already drawn:** first batch exists, but no piece has been published from it
- **Pieces written:** 0
- **New operating cadence:** Monday draw, Tuesday draft, Wednesday publish, Thursday log, Friday catch-up only if needed

---

## Open
- Publish the first piece from the already-drawn Week 1 word batch
- Make the Morning Brief surface the exact Draw action required for the current weekday
- After 4 shipped weeks, reassess whether "all 10 words must appear" is helping or quietly raising the activation energy too much

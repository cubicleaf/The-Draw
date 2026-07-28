---
attention: Active
state: Live
form: Website
updated: 2026-07-27
live_url: https://the-draw-black.vercel.app
---

# The Draw — STATUS

**What this file is.** A running record of where The Draw stands — decisions made, what's shipped, what's blocked. Reference [INTENT.md](INTENT.md) for what the project is. For vision, structure, and the word pool mechanics, see `../\_docs/THE-DRAW-VISION.md`.

Last updated: 2026-07-27

---

## Decisions

### 2026-07-27 — Corrected: Week 1 was already pushed live, and favicon added

What:
- STATUS.md wrongly carried "push Week 1 live" as an Open item and described Week 1 as unpublished in the entry below. It was already live at `the-draw-black.vercel.app/week/1` (a same-day follow-up commit "Update Week 1 display date to publish date" is in the repo history). Corrected here. Also added `favicon.ico`, `icon.png` (512×512), and `apple-icon.png` to `app/` — a circle favicon in the site's cream paper color (`#f5f0e8`) with "DRAW" set in Special Elite, matching the site wordmark, rendered from the font's actual gstatic TTF for exact letterform match. Next.js app-router auto-detects these from `app/`, no code changes needed.

Why:
- Bad status data was about to send Tim to re-push something already shipped. Caught when he pointed at the live URL.

How to apply:
- Trust the live site over STATUS.md when they conflict; correct STATUS.md immediately after, as done here.
- Favicon files are static assets in `app/` — deploy normally (`git add`, commit, push) to make them live.

### 2026-07-27 — Week 2 words drawn

What:
- Ran `draw.py` and drew Week 2's 10 words: amphiboly, wanton, obsequious, postcoital, imprecation, machination, inhere, primacy, misogynism, surreptitious. `weeks_completed` is now 2, 1,270 words remain available.

Why:
- Monday is the designated draw day in the weekday cadence.

How to apply:
- Tuesday: draft using all 10 words, format follows the words.
- Wednesday: revise and publish via `publish.py`.

### 2026-07-26 — First piece written and published: Week 1

What:
- Tim wrote the first piece using all 10 Week 1 words (jettison, ilk, ipsilateral, auxiliary, substratum, eschew, quiescence, slugabed, equine, antecedent), titled "Mental Quiescence and Equine Aspirations," format essay. Run through `publish.py --file --title --format essay`, which wrote it into `data/draws.json` (week 1, 3,321 characters) and stamped the title into `word_wall.json`'s draw history. Not yet pushed to GitHub/Vercel — that step is Tim's.

Why:
- This was the project's central blocker for ~4 months (0 pieces written despite working infrastructure) and the specific Open item this Morning Brief and prior ones kept surfacing.

How to apply:
- Once pushed, `weeks_completed` becomes 1 and the site shows the first live piece. Next Draw obligation resumes the Mon–Fri weekday cadence (Monday: draw Week 2's words).

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
- **Week 1 published and live:** "Mental Quiescence and Equine Aspirations" — `the-draw-black.vercel.app/week/1`
- **Pieces published:** 1
- **Week 2 words drawn:** 2026-07-27 — amphiboly, wanton, obsequious, postcoital, imprecation, machination, inhere, primacy, misogynism, surreptitious. Draft/publish not yet done.
- **Favicon:** added 2026-07-27 (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`), not yet deployed
- **New operating cadence:** Monday draw, Tuesday draft, Wednesday publish, Thursday log, Friday catch-up only if needed

---

## Open
- Push the new favicon files live (`git add app/favicon.ico app/icon.png app/apple-icon.png && git commit && git push` from the-draw/)
- Write and publish Week 2 (words drawn 2026-07-27; draft Tuesday, publish Wednesday)
- Make the Morning Brief surface the exact Draw action required for the current weekday
- After 4 shipped weeks, reassess whether "all 10 words must appear" is helping or quietly raising the activation energy too much

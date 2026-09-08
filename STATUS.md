---
attention: Active
state: Live
form: Website
updated: 2026-08-11
live_url: https://the-draw-black.vercel.app
---

# The Draw — STATUS

**What this file is.** A running record of where The Draw stands — decisions made, what's shipped, what's blocked. Reference [INTENT.md](INTENT.md) for what the project is. For vision, structure, and the word pool mechanics, see `_docs/THE-DRAW-VISION.md`.

Last updated: 2026-08-11

---

## Decisions

### 2026-08-11 — Dropped the "every week" promise from the public site; still aiming for weekly internally

**What:** Removed the "Every week." claim from all public-facing site copy: the tagline in `data/draws.json` (which `app/page.js` renders on the homepage), the meta description in `app/layout.js`, and the same hardcoded tagline in `the-draw-preview.html`. Went through two versions same day — first an interim cadence-neutral cut ("1,290 words. 10 drawn at random. One piece of writing."), then Tim replaced it with the final copy: "10 words drawn randomly at a time, original writing—no ai—that's a promise". The final version does two things the interim one didn't: drops the word-count framing entirely, and adds an explicit no-AI-authorship claim. `_docs/THE-DRAW-VISION.md` still quotes the original "Every week." tagline and was deliberately left untouched (it's an internal vision doc, not the live site) — now doubly stale against the live copy, worth a look next time that doc gets touched.

**Why:** Tim still wants weekly to be the real target, but it hasn't been happening in practice, and he doesn't want the public site making a promise the project isn't keeping. This is a copy-only change — it does not touch the Mon–Fri weekday cadence in `INTENT.md`/this file, which stays in force as the internal operating rhythm and keeps driving the Morning Brief's daily action line.

**How to apply:** The site no longer asserts a cadence anywhere a visitor can see. Internally, nothing changed — Monday draw, Tuesday draft, Wednesday publish, Thursday log, Friday catch-up is still the standing workflow. If the weekday cadence itself is ever dropped or changed, update `INTENT.md`'s cadence section (which the Morning Brief reads directly) separately from this — the two are decoupled on purpose now.

**Known gap surfaced while making this change, fully diagnosed 2026-08-11:** `the DRAW/` had no `.git` folder at all. Fixed in place (Tim rejected the fresh-clone-elsewhere workaround as unwanted clutter, correctly) — ran `git init -b main`, added `origin` pointed at `github.com/cubicleaf/The-Draw.git`, `git fetch`ed the real history, then `git reset origin/main` (index+HEAD only, never touches working files) to attach the existing folder to the real commit history without disturbing any local content. That part worked. Discovered in the process: local files have drifted from the last real push (2026-08-01, "Convert favicon to squircle shell") in more than just this change — `app/globals.css`, `app/page.js`, `app/week/[number]/page.js`, and `components/SubscribeForm.js` all show as locally modified vs. `origin/main`, uncommitted. Not touched or explained further here; flagged for whenever Tim next looks at this project. `the-draw-preview.html` is untracked (never committed) — it's a static legacy mockup, not part of the deployed Next.js app, so it wasn't included in the tagline-fix commit either.

**The actual blocker: a Cowork-sandbox-specific filesystem limit, confirmed three separate ways.** Every git operation that creates a lock file inside this repo's `.git/` (during `fetch`, `reset`, and `add`) throws `Operation not permitted` when git tries to clean the lock file up afterward — and a direct `rm` on the same lock files, same owner, also fails with the identical error. This reproduced identically in a brand-new `git init` here and in the unrelated pre-existing `the-draw-fresh-clone/` stub, so it's not specific to one `.git` directory's history or ownership — it's the sandbox's bridge to the mounted Documents folder not supporting unlink on these files. `git add`/`commit`/`push` cannot complete from inside a Cowork session for this project as a result. Files edited by Claude in this folder land for real (confirmed repeatedly), but committing them does not work from here — it has to happen from Tim's own Mac Terminal, where the same folder is a normal local disk, not a bridged mount.

### 2026-08-10 — Added portable word-lens framework for weekly word prep

**What:** Added `_docs/WORD-LENS-FRAMEWORK.md` — a standalone, copy-paste-ready 7-lens prompt (Etymology, Conceptual Vector, Register, Collocations, Traps, Domain Transposition, Stretch Limit) for building full command of each drawn word before drafting. Designed to be pasted whole into a fresh mobile chat, not run inside this repo's tooling — it's a static reusable prompt, not project infrastructure that grows week over week.

**Why:** Running all seven lenses on all ten words in one sitting risks recreating the "unit of work too heavy" failure that stalled the project for four months. Tim's fix is pacing, not depth-cutting: one word at a time, full thoroughness kept, spread across however many sittings he wants (mobile-friendly, away from the desk). A "quick mode" (Trap + Stretch Limit only) is built in for words he already has a working feel for.

**How to apply:** This is a pre-Tuesday-draft step, not a new weekday obligation — use it or skip it per word, per week. Nothing from a session using this framework needs to be saved back into the repo; the point is the internalization, not the artifact.

### 2026-07-31 — Favicon converted from circle to portfolio-wide squircle shell, letters enlarged and bolded
**What:** The "DRAW" wordmark was extracted from the existing circular badge (`app/icon.png`), thickened via alpha-channel dilation (a morphological "grow" applied to the letterforms since the source is raster, not editable vector text), enlarged ~12%, and recomposited onto the same rounded-square shell used across the rest of the portfolio.
**Why:** Portfolio-wide shape consistency pass; Tim wanted the lettering to read heavier/bolder, which required thickening the raster mask rather than just scaling it up.
**How to apply:** Files at `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` — Next.js App Router picks these up by filename convention automatically, no `<link>` tags to wire. This local folder is not the real repo (`cubicleaf/The-Draw`) — push via fresh clone.

### 2026-07-28 — Folder moved out of webdev/projects/, flattened, no longer under "English"

What:
- Tim moved the project folder from `webdev/projects/English/the-draw/` to a top-level `the DRAW/` directly under `Documents/`, and flattened it in the process — there is no longer a nested `the-draw/` subfolder; `app/`, `data/`, `STATUS.md`, `INTENT.md`, `draw.py`, `word_wall.json`, etc. all sit directly in `the DRAW/`. The workspace router (`Documents/CLAUDE.md`) and the Marius registry (`marius-data.js`) both still pointed at the old nested `English/the-draw/` path and have been corrected.

Why:
- The router had gone stale after a manual folder move/rename, which fed a wrong git command into a prior response. Tim caught it and asked for a registry realignment pass.

How to apply:
- Canonical path for The Draw is now `the DRAW/` (top-level, no nesting, no "English", no "webdev/projects").
- When referencing this project's local path anywhere (docs, commands, registries), use `the DRAW/` going forward.

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
- **Word pool:** 1,290 words in `word_wall.json` at `the DRAW/`
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
- Push the new favicon files live (`git add app/favicon.ico app/icon.png app/apple-icon.png && git commit && git push` from `the DRAW/`)
- Write and publish Week 2 (words drawn 2026-07-27; draft Tuesday, publish Wednesday)
- Make the Morning Brief surface the exact Draw action required for the current weekday
- After 4 shipped weeks, reassess whether "all 10 words must appear" is helping or quietly raising the activation energy too much

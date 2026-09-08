# The Draw — Vision & Mechanics

*Last updated: April 2026 — Week 2 complete*

---

## What It Is

The Draw is a weekly writing project built on a single constraint: a pool of 1,290 curated English words, 10 drawn at random each week, forced into a piece of writing. That's it. The constraint is the engine.

**Tagline:** 1,290 words. 10 drawn at random. One piece of writing. Every week.

The writing comes first. The practice is the point. Everything else — the website, the email list, the archive — is infrastructure built to serve that discipline and, over time, to let it reach people.

---

## The Mechanic

### The Word Pool

A hand-curated list of 1,290 English words — rich, obscure, precise, strange. Words that resist laziness. Words like *phantasmagoria*, *etiolate*, *shibboleth*, *mordant*. Words you can't bullshit your way through.

At 10 words per week, the pool covers **129 weeks — roughly 2.5 years** of draws without repetition. Once a word is drawn, it's marked used and removed from the pool. The pool is finite on purpose; it gives the project a shape.

What happens at week 129 is an open question. That's fine. The project earns the answer by getting there.

### The Draw Itself

Each week, `draw.py` runs and pulls 10 words at random from the available pool. The words are logged with a date and week number. There's a `--peek` mode for a dry run, an `--undo` for mistakes, and a `--status` to see how much runway is left.

The draw happens before the writing. You don't get to choose the words — that's the whole point. The randomness is the collaborator.

### The Writing

After the draw, a piece gets written. The default format is an essay, but the form should follow the words. Some weeks will demand an essay. Others might want a poem, a letter, a short story, a lyric fragment. Format is flexible; using all 10 words is not.

The piece doesn't have to be *about* the words. It has to *use* them — honestly, not decoratively. The words have to earn their place in the sentence.

### Publishing

`publish.py` handles the handoff from writing to website. It takes the week's words, the title, the format, and the piece body, formats everything correctly, and drops it into `draws.json` — the single data file that powers the site. From there:

```
git add data/draws.json
git commit -m "Week N: Title"
git push
```

Vercel picks up the push and deploys automatically. The site updates in under a minute.

---

## The Site

A Next.js site deployed on Vercel. The aesthetic is deliberate: **gonzo typewriter**. Cream paper background (`#f5f0e8`), dark ink (`#1a1a1a`), drawn words highlighted in dirty red (`#8b2500`). Fonts are Special Elite and Courier Prime — typewriter faces. The design feels like something typed, not designed.

**Structure:**
- Homepage: current week's words scattered visually, link to the piece, archive of past weeks, email subscribe form
- Week pages (`/week/1`, `/week/2`, etc.): full piece with the 10 drawn words highlighted in red wherever they appear in the text
- Subscribe: Buttondown integration — "No spam. Just ten words and whatever they become."

The site is a reading experience, not a product. Clean, fast, no clutter.

---

## The Long Game

The practice is the foundation. The media brand is the ceiling. Those two things are not in conflict — the practice is what makes the brand worth having.

**What "media brand" means here:**

The Draw is built around a repeatable, legible constraint that produces consistent output at a predictable cadence. That's the architecture of a media brand: something people can orient around, subscribe to, share, come back to week after week because they know what to expect and it keeps surprising them anyway.

The natural expansion path:

**Newsletter** — The piece goes out via email each week. The word list, the title, the full text. Buttondown is already wired in. This is the most immediate growth lever: a subscriber list is an audience you own.

**Social** — The words themselves are shareable objects. Ten words, scatter-displayed, dropped into a post with no explanation — that's a hook. The piece titles alone have pull. Weekly rhythm maps cleanly to social cadence.

**Audio** — Essays read aloud. The gonzo typewriter aesthetic translates well to a voice. A short weekly read — 4 to 6 minutes — would extend reach into podcast feeds and YouTube without requiring a separate creative process.

**Archive as artifact** — 129 weeks of pieces, written under constraint, forming a body of work. At some point that becomes a book. Not a plan yet, but a possibility the project is quietly building toward every week.

---

## What Makes It Work

The constraint is the credibility. Anyone can start a newsletter or a blog. Very few people build the discipline of a system that forces hard choices every week for 2.5 years. The randomness means no week is easy and no week is faked. The public archive means every piece stands on its own.

The words are the brand. They're unusual enough to signal something about the sensibility — this isn't content, it's language being taken seriously — but not so obscure that the project becomes a vocabulary lesson. The red highlights in the text make the constraint visible to the reader. You can see the work.

The difficulty is the point. You can't bullshit your way through *etiolate*. Either it fits or it doesn't.

---

## Current State

| | |
|---|---|
| **Site** | Live on Vercel |
| **Weeks complete** | 2 |
| **Words used** | 20 of 1,290 |
| **Weeks remaining** | ~127 |
| **Email** | Buttondown (wired in, subscriber count TBD) |
| **Workflow** | `draw.py` → write → `publish.py` → `git push` |

---

## Open Questions

- What happens at week 129? (Reset, expand, end — decide when the project earns the question)
- When does the newsletter become the primary distribution channel vs. the site?
- Social strategy: which platform, what cadence, how much context to give the words vs. letting them land raw?
- Audio: when does it make sense to start, and what's the minimum viable format?

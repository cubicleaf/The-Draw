"""
PUBLISH — Add a new week to The Draw website.
================================================
Takes your latest draw and your writing, formats it correctly,
and updates draws.json so the site is ready to deploy.

Usage:
    python publish.py                → Interactive mode (asks you questions)
    python publish.py --title "X"    → Set the title via command line
    python publish.py --file piece.txt --title "X"  → Read writing from a file

After running this, just:
    cd the-draw && git add data/draws.json && git commit -m "Week N: Title" && git push
"""

import json
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# PATHS
# ---------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).parent
WORD_WALL = SCRIPT_DIR.parent / "word_wall.json"  # ../word_wall.json
DRAWS_JSON = SCRIPT_DIR / "data" / "draws.json"    # ./data/draws.json

# If publish.py is in the-draw folder, word_wall.json is one level up.
# If that doesn't exist, try same directory (in case someone moves things).
if not WORD_WALL.exists():
    WORD_WALL = SCRIPT_DIR / "word_wall.json"


def load_word_wall():
    """Load the word wall to find the latest draw."""
    if not WORD_WALL.exists():
        print(f"Error: Can't find word_wall.json")
        print(f"Looked at: {WORD_WALL}")
        print("Make sure you've run draw.py first.")
        sys.exit(1)
    with open(WORD_WALL, "r", encoding="utf-8") as f:
        return json.load(f)


def load_draws():
    """Load the current draws.json from the website."""
    if not DRAWS_JSON.exists():
        print(f"Error: Can't find draws.json at {DRAWS_JSON}")
        sys.exit(1)
    with open(DRAWS_JSON, "r", encoding="utf-8") as f:
        return json.load(f)


def save_draws(data):
    """Write the updated draws.json back to disk."""
    with open(DRAWS_JSON, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"\nSaved to {DRAWS_JSON}")


def get_latest_draw(word_wall):
    """Find the most recent draw from draw_history."""
    history = word_wall.get("draw_history", [])
    if not history:
        print("Error: No draws found in word_wall.json.")
        print("Run 'python draw.py' first to draw your words.")
        sys.exit(1)
    return history[-1]


def get_published_weeks(draws_data):
    """Return a set of week numbers already published."""
    return {d["week"] for d in draws_data["draws"]}


def main():
    # Load both data sources
    word_wall = load_word_wall()
    draws_data = load_draws()

    # Find the latest draw
    latest = get_latest_draw(word_wall)
    week_num = latest["week"]
    draw_date = latest["date"]
    words = latest["words"]

    # Check if this week is already published
    published = get_published_weeks(draws_data)
    if week_num in published:
        print(f"\nWeek {week_num} is already published on the website.")
        print("Run 'python draw.py' to do a new draw first.")
        sys.exit(0)

    # Show what we're working with
    print(f"\n{'='*50}")
    print(f"  PUBLISH — Week {week_num}")
    print(f"  Date: {draw_date}")
    print(f"  Words: {', '.join(words)}")
    print(f"{'='*50}\n")

    # Parse command-line args
    args = sys.argv[1:]
    title = None
    piece_file = None
    piece_format = "essay"

    i = 0
    while i < len(args):
        if args[i] == "--title" and i + 1 < len(args):
            title = args[i + 1]
            i += 2
        elif args[i] == "--file" and i + 1 < len(args):
            piece_file = args[i + 1]
            i += 2
        elif args[i] == "--format" and i + 1 < len(args):
            piece_format = args[i + 1]
            i += 2
        else:
            i += 1

    # Get the title
    if not title:
        title = input("  Title of the piece: ").strip()
        if not title:
            print("  No title provided. Aborting.")
            sys.exit(1)

    # Get the piece format
    if "--format" not in sys.argv:
        fmt = input(f"  Format (essay/poem/story/letter) [{piece_format}]: ").strip()
        if fmt:
            piece_format = fmt

    # Get the writing
    if piece_file:
        file_path = Path(piece_file)
        if not file_path.exists():
            print(f"  Error: Can't find file '{piece_file}'")
            sys.exit(1)
        piece_body = file_path.read_text(encoding="utf-8").strip()
        print(f"  Read {len(piece_body)} characters from {piece_file}")
    else:
        print("\n  Paste your piece below.")
        print("  When done, press Enter twice on an empty line.")
        print("  " + "-" * 40)

        lines = []
        empty_count = 0
        while True:
            try:
                line = input()
                if line == "":
                    empty_count += 1
                    if empty_count >= 2:
                        break
                    lines.append("")  # preserve single blank lines (paragraph breaks)
                else:
                    empty_count = 0
                    lines.append(line)
            except EOFError:
                break

        piece_body = "\n".join(lines).strip()

    if not piece_body:
        print("  No writing provided. Aborting.")
        sys.exit(1)

    # Normalize paragraph breaks: convert single newlines within paragraphs
    # to spaces, keep double newlines as paragraph separators
    paragraphs = piece_body.split("\n\n")
    normalized = []
    for p in paragraphs:
        # Join lines within a paragraph
        clean = " ".join(p.split("\n"))
        # Clean up any extra spaces
        clean = " ".join(clean.split())
        normalized.append(clean)
    piece_body = "\n\n".join(normalized)

    # Build the new entry
    new_entry = {
        "week": week_num,
        "date": draw_date,
        "words": words,
        "piece_title": title,
        "piece_format": piece_format,
        "piece_body": piece_body
    }

    # Preview
    print(f"\n{'='*50}")
    print(f"  PREVIEW")
    print(f"{'='*50}")
    print(f"  Week:   {week_num}")
    print(f"  Date:   {draw_date}")
    print(f"  Title:  {title}")
    print(f"  Format: {piece_format}")
    print(f"  Words:  {', '.join(words)}")
    print(f"  Body:   {piece_body[:100]}...")
    print(f"  Length:  {len(piece_body)} characters")
    print(f"{'='*50}\n")

    confirm = input("  Add this to the website? (y/n): ").strip().lower()
    if confirm != "y":
        print("  Cancelled. Nothing was changed.")
        sys.exit(0)

    # Add to draws.json
    draws_data["draws"].append(new_entry)
    draws_data["weeks_completed"] = week_num

    # Also update the piece_title in word_wall draw_history
    for entry in word_wall["draw_history"]:
        if entry["week"] == week_num:
            entry["piece_title"] = title
    with open(WORD_WALL, "w", encoding="utf-8") as f:
        json.dump(word_wall, f, indent=2, ensure_ascii=False)

    save_draws(draws_data)

    print(f"\n  Week {week_num}: \"{title}\" added!")
    print(f"\n  To publish to the live site:")
    print(f"    cd {SCRIPT_DIR}")
    print(f"    git add data/draws.json")
    print(f"    git commit -m \"Week {week_num}: {title}\"")
    print(f"    git push")
    print()


if __name__ == "__main__":
    main()

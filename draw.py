"""
THE DRAW - Weekly Word Selection Tool
======================================
Draws 10 random words from your word wall.
Marks them as used so they won't be drawn again.

Usage:
    python draw.py          → Draw 10 words for this week
    python draw.py --peek   → Preview a draw WITHOUT saving (dry run)
    python draw.py --status → See how many words are left in the pool
    python draw.py --undo   → Undo the most recent draw (mistakes happen)
"""

import json
import random
import sys
from datetime import date
from pathlib import Path

# ---------------------------------------------------------------------------
# CONFIGURATION
# ---------------------------------------------------------------------------
WORDS_PER_DRAW = 10
JSON_FILE = Path(__file__).parent / "word_wall.json"


# ---------------------------------------------------------------------------
# HELPER FUNCTIONS
# ---------------------------------------------------------------------------
def load_data():
    """Open the JSON file and return the whole data structure."""
    with open(JSON_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_data(data):
    """Write the data structure back to the JSON file."""
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def get_available(data):
    """Return only the words that haven't been drawn yet."""
    return [w for w in data["words"] if w["status"] == "available"]


def get_used(data):
    """Return only the words that have already been drawn."""
    return [w for w in data["words"] if w["status"] == "used"]


# ---------------------------------------------------------------------------
# COMMANDS
# ---------------------------------------------------------------------------
def do_status(data):
    """Print a quick summary of the pool."""
    available = len(get_available(data))
    used = len(get_used(data))
    total = len(data["words"])
    weeks_done = data["weeks_completed"]
    weeks_left = available // WORDS_PER_DRAW

    print("\n========== THE DRAW — STATUS ==========")
    print(f"  Total words:      {total}")
    print(f"  Available:        {available}")
    print(f"  Used:             {used}")
    print(f"  Weeks completed:  {weeks_done}")
    print(f"  Weeks remaining:  {weeks_left}")
    print("========================================\n")


def do_draw(data, peek=False):
    """Draw 10 random words. If peek=True, don't save anything."""
    available = get_available(data)

    if len(available) < WORDS_PER_DRAW:
        print(f"\nOnly {len(available)} words left in the pool!")
        print("Not enough for a full draw. Add more words or reduce the draw size.")
        return

    # The actual random selection
    drawn = random.sample(available, WORDS_PER_DRAW)

    # Calculate the new week number
    week_number = data["weeks_completed"] + 1
    today = date.today().isoformat()

    # Display the draw
    mode = "PEEK (not saved)" if peek else f"WEEK {week_number}"
    print(f"\n========== THE DRAW — {mode} ==========")
    print(f"  Date: {today}\n")
    for i, word_entry in enumerate(drawn, 1):
        category_tag = f" [{word_entry['category']}]" if word_entry["category"] != "english" else ""
        print(f"  {i:>2}. {word_entry['word']}{category_tag}")
    print("\n========================================")

    if peek:
        print("  (This was a preview — nothing was saved.)")
        print("  Run without --peek to lock in a draw.\n")
        return

    # --- Save the draw ---
    # Update each drawn word's metadata
    drawn_word_texts = {w["word"] for w in drawn}
    for word_entry in data["words"]:
        if word_entry["word"] in drawn_word_texts:
            word_entry["status"] = "used"
            word_entry["week_drawn"] = week_number
            word_entry["date_drawn"] = today

    # Update the top-level counters
    data["weeks_completed"] = week_number
    data["total_available"] = len(get_available(data))
    data["total_used"] = len(get_used(data))

    # Add to draw history
    data["draw_history"].append({
        "week": week_number,
        "date": today,
        "words": [w["word"] for w in drawn],
        "piece_title": None
    })

    save_data(data)

    remaining = data["total_available"]
    print(f"  Saved! {remaining} words remain in the pool.")
    print(f"  ({remaining // WORDS_PER_DRAW} more weeks of draws)\n")


def do_undo(data):
    """Undo the most recent draw."""
    if not data["draw_history"]:
        print("\nNothing to undo — no draws have been made yet.\n")
        return

    last_draw = data["draw_history"][-1]
    week = last_draw["week"]
    words = last_draw["words"]

    print(f"\n========== UNDO WEEK {week} ==========")
    print(f"  Returning these words to the pool:\n")
    for i, word in enumerate(words, 1):
        print(f"  {i:>2}. {word}")

    # Reset each word back to available
    for word_entry in data["words"]:
        if word_entry["word"] in words:
            word_entry["status"] = "available"
            word_entry["week_drawn"] = None
            word_entry["date_drawn"] = None
            word_entry["piece_title"] = None

    # Remove from history
    data["draw_history"].pop()

    # Update counters
    data["weeks_completed"] = max(0, data["weeks_completed"] - 1)
    data["total_available"] = len(get_available(data))
    data["total_used"] = len(get_used(data))

    save_data(data)
    print(f"\n  Done. Week {week} has been undone.")
    print(f"  {data['total_available']} words now available.\n")


# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------
def main():
    if not JSON_FILE.exists():
        print(f"Error: Cannot find {JSON_FILE}")
        print("Make sure word_wall.json is in the same folder as this script.")
        sys.exit(1)

    data = load_data()

    # Parse the command
    args = sys.argv[1:]

    if "--status" in args:
        do_status(data)
    elif "--peek" in args:
        do_draw(data, peek=True)
    elif "--undo" in args:
        do_undo(data)
    else:
        do_draw(data)


if __name__ == "__main__":
    main()

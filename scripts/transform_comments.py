#!/usr/bin/env python3
"""
Transform a JSON lines or array file by:
- Removing the key "original_data" if present.
- Renaming key "scrubbed_data" to "comment_text".

Usage:
  python scripts/transform_comments.py input.json output.json
Auto-detects whether the top-level JSON is a list or newline-delimited objects.
"""
import sys, json, pathlib
from typing import Any, Dict, Iterable

REMOVE_KEY = "original_data"
OLD_KEY = "scrubbed_data"
NEW_KEY = "comment_text"

def transform_obj(obj: Dict[str, Any]) -> Dict[str, Any]:
    if REMOVE_KEY in obj:
        obj.pop(REMOVE_KEY, None)
    if OLD_KEY in obj and NEW_KEY not in obj:
        obj[NEW_KEY] = obj.pop(OLD_KEY)
    return obj

def load_json(path: pathlib.Path) -> Iterable[Dict[str, Any]]:
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        return []
    # Try full JSON parse first
    try:
        data = json.loads(text)
        if isinstance(data, list):
            return [transform_obj(d) for d in data if isinstance(d, dict)]
        elif isinstance(data, dict):
            return [transform_obj(data)]
    except json.JSONDecodeError:
        pass
    # Fallback: treat as JSON Lines
    out = []
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            continue
        if isinstance(obj, dict):
            out.append(transform_obj(obj))
    return out

def main(argv):
    if len(argv) != 3:
        print("Usage: python scripts/transform_comments.py input.json output.json", file=sys.stderr)
        return 1
    in_path = pathlib.Path(argv[1])
    out_path = pathlib.Path(argv[2])
    if not in_path.exists():
        print(f"Input file not found: {in_path}", file=sys.stderr)
        return 2
    transformed = load_json(in_path)
    out_path.write_text(json.dumps(transformed, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {len(transformed)} records to {out_path}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main(sys.argv))

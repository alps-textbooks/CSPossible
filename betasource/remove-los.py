from pathlib import Path
from lxml import etree
import re

# Also do a global Replace in Files of LOs-\d-\d*, (for xref links)
# Also replace summary los
# Also change some unit and topic titles 
# Then change source in project.ptx

# Change this to the root of your project
ROOT = Path(r"C:\Users\hoffm\Desktop\sourceb")

# Matches titles like:
# 1.1.B.7
# 12.3.A.15
# etc.
lo_note_pattern = re.compile(r"^\d+\.\d+\.[A-Z]\.\d+$")

parser = etree.XMLParser(remove_blank_text=False)

files_changed = 0
subsections_removed = 0
notes_removed = 0

for ptx in ROOT.rglob("*.ptx"):
#for ptx in [Path(r"C:\Users\hoffm\Desktop\sourceb\Unit1-Creating-Programs\topic-1-1-purpose.ptx")]:
    try:
        tree = etree.parse(str(ptx), parser)
        root = tree.getroot()
    except Exception as e:
        print(f"Skipping {ptx}: {e}")
        continue

    changed = False

    # ------------------------------------------------------------------
    # Remove Learning Objectives Review subsections
    # ------------------------------------------------------------------
    for subsection in root.xpath(".//subsection"):
        title = subsection.find("title")
        if title is not None and (title.text or "").strip() == "Learning Objectives Review":
            subsection.getparent().remove(subsection)
            subsections_removed += 1
            changed = True

    # ------------------------------------------------------------------
    # Remove LO notes (titles like 1.1.B.7)
    # ------------------------------------------------------------------
    for note in root.xpath(".//note"):
        title = note.find("title")
        if title is None or title.text is None:
            continue

        if lo_note_pattern.match(title.text.strip()):
            note.getparent().remove(note)
            notes_removed += 1
            changed = True

    if changed:
        tree.write(
            str(ptx),
            encoding="utf-8",
            xml_declaration=False,
            pretty_print=True,
        )
        print(f"Updated {ptx}")
        files_changed += 1

print()
print(f"Files modified: {files_changed}")
print(f"Subsections removed: {subsections_removed}")
print(f"Notes removed: {notes_removed}")
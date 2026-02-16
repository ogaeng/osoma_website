#!/usr/bin/env python3
"""Generate agent-friendly Markdown files from Jekyll blog posts.

Scans _posts/*.md, filters for division: blog posts, extracts raw markdown
body, cleans Liquid tags and kramdown attributes, converts relative URLs
to absolute, and outputs clean .md files to blog/<slug>.md.
"""

import os
import re
import glob
import yaml

SITE_URL = "https://osoma.kr"
POSTS_DIR = "_posts"
OUTPUT_DIR = "blog"


def parse_front_matter(content):
    """Parse YAML front matter and return (metadata_dict, body_text)."""
    if not content.startswith("---"):
        return None, content
    end = content.find("---", 3)
    if end == -1:
        return None, content
    fm_text = content[3:end]
    body = content[end + 3:].lstrip("\n")
    try:
        metadata = yaml.safe_load(fm_text)
    except yaml.YAMLError:
        return None, content
    return metadata, body


def clean_liquid_tags(text):
    """Remove Liquid tags from markdown body."""
    # Convert {% highlight lang %} ... {% endhighlight %} to fenced code blocks
    def highlight_to_fenced(match):
        lang = match.group(1).strip()
        code = match.group(2)
        # Remove {% raw %} / {% endraw %} inside highlight blocks
        code = re.sub(r'\{%[-\s]*raw\s*[-]?%\}', '', code)
        code = re.sub(r'\{%[-\s]*endraw\s*[-]?%\}', '', code)
        code = code.strip('\n')
        return f"```{lang}\n{code}\n```"

    text = re.sub(
        r'\{%[-\s]*highlight\s+(\w+)\s*[-]?%\}(.*?)\{%[-\s]*endhighlight\s*[-]?%\}',
        highlight_to_fenced,
        text,
        flags=re.DOTALL
    )

    # Remove {% raw %} / {% endraw %} tags (keep inner content)
    text = re.sub(r'\{%[-\s]*raw\s*[-]?%\}', '', text)
    text = re.sub(r'\{%[-\s]*endraw\s*[-]?%\}', '', text)

    # Remove {% if %}...{% endif %} blocks
    text = re.sub(r'\{%[-\s]*if\s.*?%\}.*?\{%[-\s]*endif\s*[-]?%\}', '', text, flags=re.DOTALL)

    # Remove {% include ... %}
    text = re.sub(r'\{%[-\s]*include\s.*?%\}', '', text)

    # Remove remaining Liquid tags {% ... %}
    text = re.sub(r'\{%.*?%\}', '', text)

    # Remove Liquid output tags {{ ... }}
    text = re.sub(r'\{\{.*?\}\}', '', text)

    return text


def clean_kramdown_attributes(text):
    """Remove kramdown inline attributes like {:target="_blank"}, {:.class}."""
    text = re.sub(r'\{:.*?\}', '', text)
    return text


def convert_relative_urls(text):
    """Convert relative URLs to absolute URLs."""
    # Markdown image/link patterns: ![alt](/path) or [text](/path)
    text = re.sub(
        r'(\[.*?\]\()(/[^)]+)(\))',
        lambda m: m.group(1) + SITE_URL + m.group(2) + m.group(3),
        text
    )

    # HTML img src attributes: src="/path"
    text = re.sub(
        r'(src=["\'])(/[^"\']+)(["\'])',
        lambda m: m.group(1) + SITE_URL + m.group(2) + m.group(3),
        text
    )

    # HTML href attributes: href="/path"
    text = re.sub(
        r'(href=["\'])(/[^"\']+)(["\'])',
        lambda m: m.group(1) + SITE_URL + m.group(2) + m.group(3),
        text
    )

    return text


def build_agent_header(metadata):
    """Build the agent-friendly header block."""
    title = metadata.get("title", "").strip('"').strip("'")
    permalink = metadata.get("permalink", "")
    date = str(metadata.get("date", ""))[:10]
    description = metadata.get("description", "")
    tags = metadata.get("tags", [])
    if isinstance(tags, list):
        tags_str = ", ".join(str(t) for t in tags)
    else:
        tags_str = str(tags)

    header = f"# {title}\n\n"
    header += f"Source: {SITE_URL}{permalink}\n"
    header += f"Last Updated: {date}\n"
    header += f"Description: {description}\n"
    header += f"Tags: {tags_str}\n"
    header += "\n---\n\n"
    return header


def process_post(filepath):
    """Process a single post file and return (slug, output_content) or None."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    metadata, body = parse_front_matter(content)
    if not metadata:
        return None

    # Only process blog posts
    if metadata.get("division") != "blog":
        return None

    # Extract slug from permalink (e.g. /blog/slug/ -> slug)
    permalink = metadata.get("permalink", "")
    slug_match = re.search(r'/blog/([^/]+)/?$', permalink)
    if not slug_match:
        return None
    slug = slug_match.group(1)

    # Process body
    body = clean_liquid_tags(body)
    body = clean_kramdown_attributes(body)
    body = convert_relative_urls(body)

    # Clean up excessive blank lines
    body = re.sub(r'\n{3,}', '\n\n', body)

    # Build output
    header = build_agent_header(metadata)
    output = header + body

    return slug, output


def main():
    # Find project root (where _posts directory is)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    os.chdir(project_root)

    # Ensure output directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Find all post files
    post_files = sorted(glob.glob(os.path.join(POSTS_DIR, "*.md")))

    generated = 0
    skipped = 0

    for filepath in post_files:
        result = process_post(filepath)
        if result is None:
            skipped += 1
            continue

        slug, output = result
        output_path = os.path.join(OUTPUT_DIR, f"{slug}.md")

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(output)

        generated += 1
        print(f"  Generated: {output_path}")

    print(f"\nDone! Generated {generated} files, skipped {skipped} posts.")


if __name__ == "__main__":
    main()

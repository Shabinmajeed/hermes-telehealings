#!/usr/bin/env python3
"""
Image viewer helper for terminal/LLM use.
Converts images to detailed ASCII art + color analysis + metadata.

Usage: python3 view_image.py <path_to_image> [--width 80] [--height 40]
"""

import sys
import os

try:
    from PIL import Image
except ImportError:
    print("ERROR: Pillow not installed. Run: pip3 install Pillow")
    sys.exit(1)


def analyze_image(path, term_width=80, term_height=40):
    img = Image.open(path).convert('RGB')
    w, h = img.size

    # Resize to terminal dimensions
    small = img.resize((term_width, term_height))

    # Character ramp from dark to light
    ramp = ' .:-=+*#%@'

    output = []
    output.append(f"Image: {os.path.basename(path)}")
    output.append(f"Size: {w}x{h}")
    output.append(f"Mode: {img.mode}")
    output.append("")

    # ASCII representation
    for y in range(term_height):
        line = ''
        for x in range(term_width):
            r, g, b = small.getpixel((x, y))
            brightness = (r + g + b) / 3
            idx = int(brightness / 256 * len(ramp))
            idx = min(idx, len(ramp) - 1)
            line += ramp[idx]
        output.append(line)

    # Color analysis - sample key regions
    output.append("")
    output.append("--- Color Analysis ---")

    # Top, center, bottom rows
    regions = {
        'top': (0, term_height // 6),
        'upper': (term_height // 6, term_height // 3),
        'middle': (term_height // 3, 2 * term_height // 3),
        'lower': (2 * term_height // 3, 5 * term_height // 6),
        'bottom': (5 * term_height // 6, term_height),
    }

    for name, (y_start, y_end) in regions.items():
        r_sum, g_sum, b_sum, count = 0, 0, 0, 0
        for y in range(y_start, y_end):
            for x in range(term_width):
                r, g, b = small.getpixel((x, y))
                r_sum += r
                g_sum += g
                b_sum += b
                count += 1
        if count > 0:
            avg_r = r_sum / count
            avg_g = g_sum / count
            avg_b = b_sum / count
            brightness = (avg_r + avg_g + avg_b) / 3
            dominant = 'blue' if avg_b > avg_r and avg_b > avg_g else (
                'red' if avg_r > avg_b and avg_r > avg_g else (
                'green' if avg_g > avg_r and avg_g > avg_b else 'neutral'))
            output.append(
                f"  {name:8s}: RGB({avg_r:5.1f}, {avg_g:5.1f}, {avg_b:5.1f}) "
                f"brightness={brightness:5.1f} dominant={dominant}"
            )

    # Detect UI elements by finding distinct brightness bands
    output.append("")
    output.append("--- Layout Zones (by brightness) ---")
    brightness_rows = []
    for y in range(term_height):
        row_sum = 0
        for x in range(term_width):
            r, g, b = small.getpixel((x, y))
            row_sum += (r + g + b) / 3
        brightness_rows.append(row_sum / term_width)

    # Group consecutive rows into zones
    zones = []
    zone_start = 0
    current_type = None
    for y in range(term_height):
        b = brightness_rows[y]
        if b > 240:
            zone_type = 'white/bg'
        elif b > 180:
            zone_type = 'light'
        elif b > 120:
            zone_type = 'medium'
        elif b > 60:
            zone_type = 'dark'
        else:
            zone_type = 'very dark'

        if zone_type != current_type:
            if current_type is not None:
                zones.append((zone_start, y - 1, current_type))
            zone_start = y
            current_type = zone_type
    zones.append((zone_start, term_height - 1, current_type))

    for start, end, ztype in zones:
        pct = ((end - start + 1) / term_height) * 100
        output.append(f"  rows {start:2d}-{end:2d} ({pct:4.0f}%): {ztype}")

    print('\n'.join(output))


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 view_image.py <image_path> [--width 80] [--height 40]")
        sys.exit(1)

    path = sys.argv[1]
    width = 80
    height = 40

    for i, arg in enumerate(sys.argv):
        if arg == '--width' and i + 1 < len(sys.argv):
            width = int(sys.argv[i + 1])
        if arg == '--height' and i + 1 < len(sys.argv):
            height = int(sys.argv[i + 1])

    if not os.path.exists(path):
        print(f"ERROR: File not found: {path}")
        sys.exit(1)

    analyze_image(path, width, height)

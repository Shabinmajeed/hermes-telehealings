# View Image Tool

Since the `read_file` tool cannot process binary files (PNG, JPG, etc.), use the
`scripts/view_image.py` helper to analyze images from the terminal.

## Usage

```bash
python3 scripts/view_image.py <path_to_image> [--width 70] [--height 35]
```

## What it returns

- Image dimensions and color mode
- ASCII art representation of the image layout
- Color analysis by region (top, upper, middle, lower, bottom)
- Layout zones grouped by brightness (helps identify UI elements)

## Example

```bash
python3 scripts/view_image.py design/user\ soft\ onboarding/1\ Splash\ screen.png
```

This is the standard way to "view" any image file in this environment.

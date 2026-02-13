# Icons Folder

This folder contains various sizes and formats of the Ultra-Pro Diff Checker logo for different use cases.

## Available Icons

### Standard Sizes (SVG)
- `icon-16x16.svg` - Favicon size
- `icon-32x32.svg` - Small icon
- `icon-48x48.svg` - Medium icon
- `icon-64x64.svg` - Standard icon
- `icon-128x128.svg` - Large icon
- `icon-256x256.svg` - Extra large icon
- `icon-512x512.svg` - High resolution icon

### Mobile & Web App Icons
- `apple-touch-icon.svg` - iOS home screen icon (180x180)
- `android-chrome-192x192.svg` - Android home screen icon (192x192)

## Usage

### In HTML
```html
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="icons/icon-32x32.svg">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" href="icons/apple-touch-icon.svg">

<!-- Android Chrome -->
<link rel="icon" sizes="192x192" href="icons/android-chrome-192x192.svg">
```

### In Web Manifest
```json
{
  "icons": [
    {
      "src": "icons/icon-192x192.svg",
      "sizes": "192x192",
      "type": "image/svg+xml"
    },
    {
      "src": "icons/icon-512x512.svg",
      "sizes": "512x512",
      "type": "image/svg+xml"
    }
  ]
}
```

## Icon Design

All icons feature:
- Two-panel design representing diff comparison
- Red line (deletion) on left panel
- Green line (addition) on right panel
- Center divider with bidirectional arrows
- Modern gradient effect
- Optimized for dark backgrounds

## Generating PNG Versions

To generate PNG versions of these icons:
1. Open `create-logo-pngs.html` in your browser
2. Or use any SVG to PNG converter
3. Maintain aspect ratio
4. Use transparent background for best results

## File Sizes

All SVG files are optimized and lightweight:
- 16x16: ~0.8 KB
- 32x32: ~1.0 KB
- 64x64: ~1.2 KB
- 128x128: ~1.5 KB
- 256x256: ~2.0 KB
- 512x512: ~2.5 KB

## Author

Mohammad Faiz

## License

MIT License - Same as the main project

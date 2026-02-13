<div align="center">
  <img src="logo.svg" alt="Ultra-Pro Diff Checker Logo" width="120" height="120">
  
  # Ultra-Pro Diff Checker

  A professional text and code comparison tool with a modern interface. Compare files, view differences side-by-side or inline, and export results in multiple formats.

  ![Version](https://img.shields.io/badge/version-1.1.0-blue)
  ![License](https://img.shields.io/badge/license-MIT-green)
  
  **[Launch App →](https://mohammad-faiz-cloud-engineer.github.io/Ultra-Pro-Diff-Checker/)**
</div>

---

## Quick Start

### Online

Visit **[mohammad-faiz-cloud-engineer.github.io/Ultra-Pro-Diff-Checker](https://mohammad-faiz-cloud-engineer.github.io/Ultra-Pro-Diff-Checker/)** to use the app instantly in your browser.

### Local

1. Clone or download this repository
2. Open `index.html` in your browser
2. Paste your original text in the left panel
3. Paste your modified text in the right panel
4. Click **Compare** to see the differences
5. Use **Export** to save or share your results

That's it. No installation, no dependencies, no build process.

## Features

**Theme Support**
- Dark mode (default)
- Light mode
- Auto mode (follows system preference)
- Persistent theme selection

**Comparison Modes**
- Split View: Side-by-side comparison with synchronized scrolling
- Unified View: Inline diff with +/- indicators

**Export Options**
- PNG: High-quality image export
- PDF: Multi-page document with proper pagination
- HTML: Standalone report with embedded styles
- Markdown: Copy diff in GitHub/Jira format

**Interface**
- Light and dark theme support with auto-detection
- Clean input mode for entering text
- Full-screen diff view for better readability
- Real-time line counting and statistics
- Keyboard shortcuts for faster workflow

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Enter` | Compare texts or return to edit mode |
| `Ctrl/Cmd + S` | Toggle between Split and Unified view |
| `Ctrl/Cmd + T` | Toggle theme (Auto → Light → Dark) |

## Browser Support

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Technical Details

Built with vanilla JavaScript, HTML5, and CSS3. Uses the following libraries:
- [diff](https://github.com/kpdecker/jsdiff) for text comparison
- [html2canvas](https://html2canvas.hertzen.com/) for PNG export
- [jsPDF](https://github.com/parallax/jsPDF) for PDF generation

Total size: ~43KB (uncompressed)

## File Structure

```
├── index.html           # Main application
├── script.js            # Application logic
├── styles.css           # Styling with theme support
├── manifest.json        # PWA manifest
├── icons/               # App icons
└── README.md            # This file
```

## Customization

The app uses CSS variables for easy theming. Both light and dark themes are fully supported:

```css
/* Dark Theme */
[data-theme="dark"] {
    --bg-primary: #0a0a0a;
    --accent-color: #ffffff;
    --added-text: #22c55e;
    --removed-text: #ef4444;
}

/* Light Theme */
[data-theme="light"] {
    --bg-primary: #ffffff;
    --accent-color: #1a1a1a;
    --added-text: #16a34a;
    --removed-text: #dc2626;
}
```

## Live Demo

The app is live at: **[mohammad-faiz-cloud-engineer.github.io/Ultra-Pro-Diff-Checker](https://mohammad-faiz-cloud-engineer.github.io/Ultra-Pro-Diff-Checker/)**

## Deployment

This project is deployed on GitHub Pages and can be hosted anywhere:
- GitHub Pages (current deployment)
- Netlify
- Vercel
- Any static web server

No server-side processing required. All operations run client-side for maximum privacy and performance.

## Performance

- Initial load: < 500ms
- Handles files up to 10,000+ lines
- Smooth 60fps scrolling
- Memory efficient (< 50MB)

## Privacy & Security

All processing happens entirely in your browser. No data is sent to any server. Your text never leaves your machine, ensuring complete privacy and security for sensitive comparisons.

## Known Limitations

- Requires internet connection for CDN libraries and fonts
- Export features require modern browser APIs
- Very large files (100,000+ lines) may impact performance

## Contributing

Found a bug or have a feature request? Feel free to fork and submit a pull request.

## Author

**Mohammad Faiz**

## License

MIT License - Free for personal and commercial use.

---

Made with attention to detail and a focus on user experience.

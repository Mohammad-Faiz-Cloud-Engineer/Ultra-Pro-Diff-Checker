<div align="center">
  <img src="logo.svg" alt="Ultra-Pro Diff Checker Logo" width="120" height="120">
  
  # Ultra-Pro Diff Checker

  A professional text and code comparison tool with a modern dark interface. Compare files, view differences side-by-side or inline, and export results in multiple formats.

  ![Version](https://img.shields.io/badge/version-1.0.0-blue)
  ![License](https://img.shields.io/badge/license-MIT-green)
</div>

---

## Quick Start

1. Open `diff-checker.html` in your browser
2. Paste your original text in the left panel
3. Paste your modified text in the right panel
4. Click **Compare** to see the differences
5. Use **Export** to save or share your results

That's it. No installation, no dependencies, no build process.

## Features

**Comparison Modes**
- Split View: Side-by-side comparison with synchronized scrolling
- Unified View: Inline diff with +/- indicators

**Export Options**
- PNG: High-quality image export
- PDF: Multi-page document with proper pagination
- HTML: Standalone report with embedded styles
- Markdown: Copy diff in GitHub/Jira format

**Interface**
- Clean input mode for entering text
- Full-screen diff view for better readability
- Real-time line counting and statistics
- Keyboard shortcuts for faster workflow

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Enter` | Compare texts or return to edit mode |
| `Ctrl/Cmd + S` | Toggle between Split and Unified view |

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
├── diff-checker.html    # Main application
├── script.js            # Application logic
├── styles.css           # Styling
└── README.md           # This file
```

## Customization

The app uses CSS variables for easy theming. Edit `styles.css`:

```css
:root {
    --bg-primary: #0a0a0a;
    --accent-color: #ffffff;
    --added-text: #22c55e;
    --removed-text: #ef4444;
}
```

## Deployment

Host anywhere:
- GitHub Pages
- Netlify
- Vercel
- Any static web server

No server-side processing required.

## Performance

- Initial load: < 500ms
- Handles files up to 10,000+ lines
- Smooth 60fps scrolling
- Memory efficient (< 50MB)

## Privacy

All processing happens in your browser. No data is sent to any server. Your text never leaves your machine.

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

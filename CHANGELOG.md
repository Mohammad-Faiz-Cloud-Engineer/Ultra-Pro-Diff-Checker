# Changelog

All notable changes to Ultra-Pro Diff Checker will be documented in this file.

## [1.1.0] - 2026-02-14

### Added
- Light and dark theme support with auto-detection
- Theme toggle button with smooth transitions
- System preference detection for automatic theme selection
- Persistent theme storage using localStorage
- Theme-aware export functionality (PNG, PDF, HTML)

### Improved
- Enhanced CSS architecture with theme variables
- Optimized color contrast for both themes
- Better accessibility in light mode
- Improved visual hierarchy across themes

### Fixed
- Manifest start_url now correctly points to index.html
- Theme colors properly applied to all UI elements
- Export functions now respect current theme

## [1.0.0] - 2026-02-13

### Initial Release

**Core Features**
- Text and code comparison with line-by-line diffing
- Split view for side-by-side comparison
- Unified view for inline diff display
- Synchronized scrolling between panels
- Real-time statistics (additions/deletions)

**Export Capabilities**
- PNG export with high-quality rendering
- PDF export with multi-page support
- HTML report generation
- Markdown format for GitHub/Jira

**User Interface**
- Clean two-mode interface (Input → Diff)
- Vercel-style dark theme
- Glassmorphism effects
- Responsive design for all devices
- Keyboard shortcuts support

**Technical**
- Vanilla JavaScript (no frameworks)
- Module pattern architecture
- Production-grade code quality
- Full accessibility support
- Cross-browser compatibility

**Performance**
- Fast initial load (< 500ms)
- Efficient diff computation
- Smooth 60fps scrolling
- Low memory footprint

---

## Future Roadmap

### Planned Features
- File upload support
- Syntax highlighting by language
- Custom theme support
- Diff history/bookmarks
- Search within diff results

### Under Consideration
- Git integration
- Collaborative features
- API for programmatic access
- Browser extension

---

**Author:** Mohammad Faiz  
**License:** MIT

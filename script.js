/**
 * Ultra-Pro Diff Checker
 * Professional text and code comparison tool
 * 
 * @author Mohammad Faiz
 * @version 1.0.0
 * @license MIT
 */

'use strict';

const DiffApp = (() => {
    // ============================================================================
    // STATE MANAGEMENT
    // ============================================================================

    const state = {
        viewMode: 'split',
        displayMode: 'input',
        originalText: '',
        modifiedText: '',
        diff: null,
        stats: { added: 0, removed: 0 }
    };

    const elements = {};

    // ============================================================================
    // INITIALIZATION
    // ============================================================================

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initApp);
        } else {
            initApp();
        }
    }

    function initApp() {
        if (typeof Diff === 'undefined') {
            alert('Required libraries failed to load. Please refresh the page.');
            return;
        }

        cacheElements();
        attachEventListeners();
        switchToDisplayMode('input');
        updateStats();
    }

    function cacheElements() {
        elements.originalTextarea = document.getElementById('originalText');
        elements.modifiedTextarea = document.getElementById('modifiedText');
        elements.diffContainer = document.getElementById('diffContainer');
        elements.inputMode = document.getElementById('inputMode');
        elements.diffMode = document.getElementById('diffMode');
        elements.compareBtn = document.getElementById('compareBtn');
        elements.clearBtn = document.getElementById('clearBtn');
        elements.splitViewBtn = document.getElementById('splitViewBtn');
        elements.unifiedViewBtn = document.getElementById('unifiedViewBtn');
        elements.exportBtn = document.getElementById('exportBtn');
        elements.exportDropdown = document.getElementById('exportDropdown');
        elements.addedCount = document.getElementById('addedCount');
        elements.removedCount = document.getElementById('removedCount');
        elements.statusText = document.getElementById('statusText');
    }

    // ============================================================================
    // EVENT LISTENERS
    // ============================================================================

    function attachEventListeners() {
        elements.compareBtn.addEventListener('click', handleCompare);
        elements.clearBtn.addEventListener('click', handleClear);
        elements.splitViewBtn.addEventListener('click', () => setViewMode('split'));
        elements.unifiedViewBtn.addEventListener('click', () => setViewMode('unified'));
        elements.exportBtn.addEventListener('click', toggleExportMenu);
        elements.exportDropdown.addEventListener('click', handleExportAction);

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.export-menu')) {
                closeExportMenu();
            }
        });

        document.addEventListener('keydown', handleKeyboardShortcuts);
    }

    function handleCompare() {
        if (state.displayMode === 'diff') {
            switchToDisplayMode('input');
            return;
        }

        state.originalText = elements.originalTextarea.value;
        state.modifiedText = elements.modifiedTextarea.value;

        if (!state.originalText && !state.modifiedText) {
            alert('Please enter text in both panels to compare.');
            return;
        }

        computeDiff();
        
        if (state.diff) {
            switchToDisplayMode('diff');
            renderDiff();
        }
    }

    function handleClear() {
        state.originalText = '';
        state.modifiedText = '';
        state.diff = null;
        state.stats = { added: 0, removed: 0 };
        
        elements.originalTextarea.value = '';
        elements.modifiedTextarea.value = '';
        
        switchToDisplayMode('input');
        updateStats();
    }

    function switchToDisplayMode(mode) {
        state.displayMode = mode;
        
        if (mode === 'input') {
            elements.inputMode.classList.remove('hidden');
            elements.diffMode.classList.add('hidden');
            elements.compareBtn.textContent = 'Compare';
            elements.compareBtn.classList.add('compare-btn');
            elements.splitViewBtn.style.display = 'none';
            elements.unifiedViewBtn.style.display = 'none';
            elements.exportBtn.parentElement.style.display = 'none';
        } else {
            elements.inputMode.classList.add('hidden');
            elements.diffMode.classList.remove('hidden');
            elements.compareBtn.textContent = 'Edit';
            elements.compareBtn.classList.remove('compare-btn');
            elements.splitViewBtn.style.display = 'inline-block';
            elements.unifiedViewBtn.style.display = 'inline-block';
            elements.exportBtn.parentElement.style.display = 'block';
        }
    }

    function handleKeyboardShortcuts(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            handleCompare();
        }
        
        if ((e.ctrlKey || e.metaKey) && e.key === 's' && state.displayMode === 'diff') {
            e.preventDefault();
            setViewMode(state.viewMode === 'split' ? 'unified' : 'split');
        }
    }

    function handleExportAction(e) {
        const button = e.target.closest('button[data-action]');
        if (!button) return;

        const action = button.dataset.action;
        closeExportMenu();

        const exportActions = {
            png: exportAsPNG,
            pdf: exportAsPDF,
            html: exportAsHTML,
            markdown: copyAsMarkdown
        };

        if (exportActions[action]) {
            exportActions[action]();
        }
    }

    // ============================================================================
    // DIFF COMPUTATION
    // ============================================================================

    function computeDiff() {
        if (!state.originalText && !state.modifiedText) {
            state.diff = null;
            state.stats = { added: 0, removed: 0 };
            updateStats();
            return;
        }

        try {
            if (typeof Diff === 'undefined' || typeof Diff.diffLines !== 'function') {
                throw new Error('Diff library is not available');
            }

            state.diff = Diff.diffLines(state.originalText, state.modifiedText);
            calculateStats();
            updateStats();
        } catch (error) {
            showError('Failed to compute differences: ' + error.message);
        }
    }

    function calculateStats() {
        state.stats.added = 0;
        state.stats.removed = 0;

        state.diff.forEach(part => {
            if (part.added) {
                state.stats.added += part.count;
            } else if (part.removed) {
                state.stats.removed += part.count;
            }
        });
    }

    function updateStats() {
        elements.addedCount.textContent = state.stats.added;
        elements.removedCount.textContent = state.stats.removed;
        elements.statusText.textContent = state.diff ? 'Compared' : 'Ready';
    }

    // ============================================================================
    // RENDERING
    // ============================================================================

    function renderDiff() {
        if (!state.diff) {
            renderEmptyState();
            return;
        }

        requestAnimationFrame(() => {
            if (state.viewMode === 'split') {
                renderSplitView();
            } else {
                renderUnifiedView();
            }
        });
    }

    function renderEmptyState() {
        elements.diffContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-content">
                    <h3>Start Comparing</h3>
                    <p>Enter text in both panels and click Compare to see the differences.</p>
                </div>
            </div>
        `;
    }

    function renderSplitView() {
        const { leftLines, rightLines } = buildSplitViewData();
        
        const leftHTML = buildLinesHTML(leftLines);
        const rightHTML = buildLinesHTML(rightLines);

        elements.diffContainer.innerHTML = `
            <div class="diff-view">
                <div class="diff-side" id="leftSide">${leftHTML}</div>
                <div class="diff-side" id="rightSide">${rightHTML}</div>
            </div>
        `;

        setupSyncScroll();
    }

    function buildSplitViewData() {
        const leftLines = [];
        const rightLines = [];
        let leftLineNum = 1;
        let rightLineNum = 1;

        state.diff.forEach(part => {
            const lines = part.value.split('\n');
            if (lines[lines.length - 1] === '') lines.pop();

            if (part.added) {
                lines.forEach(line => {
                    leftLines.push({ type: 'empty', content: '', lineNum: '' });
                    rightLines.push({ type: 'added', content: line, lineNum: rightLineNum++ });
                });
            } else if (part.removed) {
                lines.forEach(line => {
                    leftLines.push({ type: 'removed', content: line, lineNum: leftLineNum++ });
                    rightLines.push({ type: 'empty', content: '', lineNum: '' });
                });
            } else {
                lines.forEach(line => {
                    leftLines.push({ type: 'unchanged', content: line, lineNum: leftLineNum++ });
                    rightLines.push({ type: 'unchanged', content: line, lineNum: rightLineNum++ });
                });
            }
        });

        return { leftLines, rightLines };
    }

    function buildLinesHTML(lines) {
        return lines.map(line => 
            `<div class="diff-line line-${line.type}">
                <div class="line-number">${line.lineNum}</div>
                <div class="line-content">${escapeHtml(line.content)}</div>
            </div>`
        ).join('');
    }

    function setupSyncScroll() {
        const leftSide = document.getElementById('leftSide');
        const rightSide = document.getElementById('rightSide');
        
        if (!leftSide || !rightSide) return;

        let isLeftScrolling = false;
        let isRightScrolling = false;

        leftSide.addEventListener('scroll', () => {
            if (!isRightScrolling) {
                isLeftScrolling = true;
                rightSide.scrollTop = leftSide.scrollTop;
                setTimeout(() => { isLeftScrolling = false; }, 10);
            }
        }, { passive: true });

        rightSide.addEventListener('scroll', () => {
            if (!isLeftScrolling) {
                isRightScrolling = true;
                leftSide.scrollTop = rightSide.scrollTop;
                setTimeout(() => { isRightScrolling = false; }, 10);
            }
        }, { passive: true });
    }

    function renderUnifiedView() {
        const lines = buildUnifiedViewData();
        const html = lines.map(line => 
            `<div class="unified-line line-${line.type}">
                <div class="line-number">${line.lineNum}</div>
                <div class="line-content">${line.prefix} ${escapeHtml(line.content)}</div>
            </div>`
        ).join('');

        elements.diffContainer.innerHTML = `<div class="unified-view">${html}</div>`;
    }

    function buildUnifiedViewData() {
        let lineNum = 1;
        const lines = [];

        state.diff.forEach(part => {
            const textLines = part.value.split('\n');
            if (textLines[textLines.length - 1] === '') textLines.pop();

            textLines.forEach(line => {
                let type = 'unchanged';
                let prefix = ' ';

                if (part.added) {
                    type = 'added';
                    prefix = '+';
                } else if (part.removed) {
                    type = 'removed';
                    prefix = '−';
                }

                lines.push({
                    type,
                    content: line,
                    lineNum: type === 'unchanged' ? lineNum++ : '',
                    prefix
                });
            });
        });

        return lines;
    }

    // ============================================================================
    // VIEW MODE
    // ============================================================================

    function setViewMode(mode) {
        state.viewMode = mode;

        if (mode === 'split') {
            elements.splitViewBtn.classList.add('active');
            elements.unifiedViewBtn.classList.remove('active');
        } else {
            elements.unifiedViewBtn.classList.add('active');
            elements.splitViewBtn.classList.remove('active');
        }

        renderDiff();
    }

    // ============================================================================
    // EXPORT MENU
    // ============================================================================

    function toggleExportMenu(e) {
        e.stopPropagation();
        const isOpen = elements.exportDropdown.classList.toggle('show');
        elements.exportBtn.setAttribute('aria-expanded', isOpen);
    }

    function closeExportMenu() {
        elements.exportDropdown.classList.remove('show');
        elements.exportBtn.setAttribute('aria-expanded', 'false');
    }

    // ============================================================================
    // EXPORT FUNCTIONS
    // ============================================================================

    async function exportAsPNG() {
        if (!state.diff) {
            showError('No diff to export');
            return;
        }

        setStatus('Generating PNG...', true);

        try {
            if (typeof html2canvas === 'undefined') {
                throw new Error('html2canvas library not loaded');
            }

            const canvas = await html2canvas(elements.diffContainer, {
                backgroundColor: '#0a0a0a',
                scale: 2,
                logging: false,
                useCORS: true
            });

            const link = document.createElement('a');
            link.download = `diff-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            setStatus('PNG exported successfully');
        } catch (error) {
            showError('Failed to export PNG');
        }
    }

    async function exportAsPDF() {
        if (!state.diff) {
            showError('No diff to export');
            return;
        }

        setStatus('Generating PDF...', true);

        try {
            if (typeof window.jspdf === 'undefined') {
                throw new Error('jsPDF library not loaded');
            }

            const { jsPDF } = window.jspdf;
            const canvas = await html2canvas(elements.diffContainer, {
                backgroundColor: '#0a0a0a',
                scale: 2,
                logging: false,
                useCORS: true
            });

            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            const pdf = new jsPDF('p', 'mm', 'a4');
            
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= 297;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= 297;
            }

            pdf.save(`diff-${Date.now()}.pdf`);
            setStatus('PDF exported successfully');
        } catch (error) {
            showError('Failed to export PDF');
        }
    }

    function exportAsHTML() {
        if (!state.diff) {
            showError('No diff to export');
            return;
        }

        try {
            const htmlContent = generateHTMLReport();
            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            const link = document.createElement('a');
            link.download = `diff-report-${Date.now()}.html`;
            link.href = URL.createObjectURL(blob);
            link.click();

            setTimeout(() => URL.revokeObjectURL(link.href), 100);

            setStatus('HTML report downloaded');
        } catch (error) {
            showError('Failed to export HTML');
        }
    }

    function generateHTMLReport() {
        const timestamp = new Date().toLocaleString();
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diff Report - ${timestamp}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #0a0a0a; color: #ffffff; padding: 2rem; }
        .report-header { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1.5rem; margin-bottom: 2rem; }
        .report-header h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .report-header p { color: #a0a0a0; font-size: 0.875rem; }
        .stats { margin-top: 1rem; display: flex; gap: 1.5rem; }
        .stat-added { color: #22c55e; }
        .stat-removed { color: #ef4444; }
        .diff-view { font-family: 'Fira Code', monospace; font-size: 0.875rem; line-height: 1.6; display: flex; }
        .diff-side { flex: 1; }
        .diff-line, .unified-line { display: flex; min-height: 1.6em; }
        .line-number { background: #0f0f0f; color: #a0a0a0; padding: 0 0.75rem; text-align: right; min-width: 3.5rem; border-right: 1px solid rgba(255,255,255,0.1); user-select: none; }
        .line-content { padding: 0 1rem; flex: 1; white-space: pre-wrap; word-break: break-all; }
        .line-added { background: rgba(34, 197, 94, 0.15); }
        .line-added .line-content { color: #22c55e; }
        .line-removed { background: rgba(239, 68, 68, 0.15); }
        .line-removed .line-content { color: #ef4444; }
        .line-unchanged { color: #a0a0a0; }
        .unified-view { padding: 1rem; }
    </style>
</head>
<body>
    <div class="report-header">
        <h1>Diff Report</h1>
        <p>Generated on ${timestamp}</p>
        <div class="stats">
            <span class="stat-added">+${state.stats.added} additions</span>
            <span class="stat-removed">−${state.stats.removed} deletions</span>
        </div>
    </div>
    ${elements.diffContainer.innerHTML}
</body>
</html>`;
    }

    async function copyAsMarkdown() {
        if (!state.diff) {
            showError('No diff to copy');
            return;
        }

        try {
            const markdown = generateMarkdown();
            await navigator.clipboard.writeText(markdown);
            setStatus('Markdown copied to clipboard');
        } catch (error) {
            showError('Failed to copy Markdown');
        }
    }

    function generateMarkdown() {
        let markdown = '```diff\n';

        state.diff.forEach(part => {
            const lines = part.value.split('\n');
            if (lines[lines.length - 1] === '') lines.pop();

            lines.forEach(line => {
                if (part.added) {
                    markdown += `+ ${line}\n`;
                } else if (part.removed) {
                    markdown += `- ${line}\n`;
                } else {
                    markdown += `  ${line}\n`;
                }
            });
        });

        markdown += '```';
        return markdown;
    }

    // ============================================================================
    // UTILITIES
    // ============================================================================

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    function setStatus(message, showSpinner = false) {
        if (showSpinner) {
            elements.statusText.innerHTML = `<span class="spinner"></span> ${message}`;
        } else {
            elements.statusText.textContent = message;
        }
    }

    function showError(message) {
        setStatus(message);
        setTimeout(() => setStatus('Ready'), 3000);
    }

    // ============================================================================
    // PUBLIC API
    // ============================================================================

    return { init };
})();

// Initialize application
DiffApp.init();

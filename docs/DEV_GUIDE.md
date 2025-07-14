# AI Todo App - Developer Guide

## 🔄 Project Status
This document refers to the current Vanilla JavaScript implementation deployed on Netlify. The previous React implementation is archived and available for reference in the `/archived` directory.

## 🛠 Table of Contents
1. [Development Setup](#development-setup)
2. [Architecture Overview](#architecture-overview)
3. [Code Structure](#code-structure)
4. [API Integration](#api-integration)
5. [State Management](#state-management)
6. [UI Components](#ui-components)
7. [Testing Strategy](#testing-strategy)
8. [Performance Optimization](#performance-optimization)
9. [Deployment](#deployment)
10. [Contributing](#contributing)

## 🚀 Development Setup

### Deployments
- **Current Version (Netlify)**: [https://exquisite-kitsune-286948.netlify.app](https://exquisite-kitsune-286948.netlify.app)
- **Previous Version (Vercel)**: [https://ai-todo-app-henna.vercel.app](https://ai-todo-app-henna.vercel.app)

### Prerequisites
- **Node.js**: Version 16.0 or higher
- **npm**: Version 7.0 or higher
- **Modern Browser**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Code Editor**: VS Code recommended with extensions:
  - ES6 String HTML
  - Live Server
  - Prettier
  - ESLint

### Installation Steps
```bash
# Clone the repository
git clone https://github.com/yourusername/ai-todo-app.git
cd ai-todo-app

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Development Scripts
```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint for code quality
npm run format   # Format code with Prettier
```

### Environment Configuration
Create `.env` file for development:
```env
VITE_APP_NAME=AI Todo App
VITE_APP_VERSION=1.0.0
VITE_TRANSLATION_API_URL=https://api.mymemory.translated.net
```

## 🏗 Architecture Overview

### Application Architecture
```
┌─────────────────────────────────────────┐
│                Frontend                 │
├─────────────────────────────────────────┤
│  HTML Structure (index.html)           │
│  ├── Header (Statistics)               │
│  ├── Controls (Add Task, Filters)      │
│  └── Tasks Container (Grid Layout)     │
├─────────────────────────────────────────┤
│  CSS Styling (style.css)               │
│  ├── CSS Variables (Design System)     │
│  ├── Component Styles                  │
│  └── Responsive Media Queries          │
├─────────────────────────────────────────┤
│  JavaScript Logic (script.js)          │
│  ├── TodoApp Class (Main Controller)   │
│  ├── Event Handlers                    │
│  ├── DOM Manipulation                  │
│  └── State Management                  │
├─────────────────────────────────────────┤
│  Data Layer                            │
│  ├── LocalStorage (Persistence)        │
│  ├── Translation Cache                 │
│  └── User Preferences                  │
├─────────────────────────────────────────┤
│  External Services                     │
│  └── MyMemory Translation API          │
└─────────────────────────────────────────┘
```

### Design Patterns Used
- **Module Pattern**: Single TodoApp class encapsulates all functionality
- **Observer Pattern**: Event-driven architecture for UI updates
- **Strategy Pattern**: Different rendering strategies for various states
- **Facade Pattern**: Simplified API for complex operations
- **Singleton Pattern**: Single app instance with persistent state

### Technology Stack
- **Frontend Framework**: Vanilla JavaScript (ES6+)
- **Build Tool**: Vite (for development and building)
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)
- **Translation**: MyMemory Translation API
- **Storage**: Browser LocalStorage
- **Testing**: Manual testing with browser dev tools

## 📂 Code Structure

### Project Organization
```
ai-todo-app/
├── index.html          # Main HTML structure
├── style.css           # Comprehensive styling
├── script.js           # Application logic
├── README.md           # Project documentation
├── docs/
│   ├── PRD.md          # Product Requirements Document
│   ├── USER_GUIDE.md   # User documentation
│   └── DEV_GUIDE.md    # Developer documentation
├── package.json        # Project configuration
└── archived/           # Previous React/TypeScript implementation
    ├── src/            # React source code
    ├── public/         # Public assets
    ├── docs/           # Previous documentation
    └── ...             # Configuration files
```

### File Organization
```
ai-todo-app/
├── index.html              # Main HTML structure
├── style.css               # Complete styling
├── script.js               # Application logic
├── package.json            # Project configuration
├── vite.config.js          # Vite configuration
├── README.md               # Project overview
├── docs/                   # Documentation
│   ├── PRD.md              # Product Requirements
│   ├── USER_GUIDE.md       # User documentation
│   └── DEV_GUIDE.md        # This file
└── .gitignore              # Git ignore rules
```

### HTML Structure (index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta tags, title, stylesheets -->
</head>
<body>
    <div class="app-container">
        <header class="app-header">
            <!-- App title and statistics -->
        </header>
        <main class="main-content">
            <div class="controls-section">
                <!-- Add task form and filters -->
            </div>
            <div class="tasks-container">
                <!-- Task grid and empty state -->
            </div>
        </main>
        <!-- Modals for edit and delete confirmation -->
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### CSS Architecture (style.css)
```css
/* 1. CSS Variables (Design System) */
:root {
    --primary-color: #3B82F6;
    --success-color: #10B981;
    /* ... more variables */
}

/* 2. Reset and Base Styles */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* 3. Layout Components */
.app-container { /* Main container */ }
.app-header { /* Header styling */ }
.main-content { /* Main content area */ }

/* 4. UI Components */
.task-card { /* Individual task styling */ }
.modal-overlay { /* Modal components */ }
.filter-btn { /* Button components */ }

/* 5. Responsive Design */
@media (max-width: 768px) { /* Mobile styles */ }
@media (max-width: 480px) { /* Small mobile */ }

/* 6. Animations and Transitions */
.fade-in { animation: fadeIn 0.3s ease-in-out; }
@keyframes fadeIn { /* Animation definitions */ }
```

### JavaScript Architecture (script.js)
```javascript
/**
 * Main TodoApp class - handles all application logic
 */
class TodoApp {
    constructor() {
        // Initialize properties
        this.tasks = [];
        this.currentFilter = 'all';
        this.translations = new Map();
        
        // Setup application
        this.initializeElements();
        this.bindEvents();
        this.renderTasks();
    }
    
    // Core Methods
    initializeElements() { /* DOM element references */ }
    bindEvents() { /* Event listener setup */ }
    
    // Task Management
    addTask() { /* Create new task */ }
    editTask(id) { /* Edit existing task */ }
    deleteTask(id) { /* Remove task */ }
    toggleTask(id) { /* Toggle completion */ }
    
    // UI Management
    renderTasks() { /* Update task display */ }
    updateStats() { /* Update statistics */ }
    showNotification(message, type) { /* User feedback */ }
    
    // Translation Features
    setLanguage(language) { /* Change app language */ }
    translateTask(task, language) { /* Translate single task */ }
    translateAllTasks(language) { /* Batch translation */ }
    
    // Data Persistence
    saveTasks() { /* Save to localStorage */ }
    loadTasks() { /* Load from localStorage */ }
    
    // Utility Methods
    generateId() { /* Create unique IDs */ }
    escapeHtml(text) { /* Prevent XSS */ }
    getFilteredTasks() { /* Apply filters */ }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
```

## 🔌 API Integration

### Translation API Integration

#### MyMemory Translation API
```javascript
/**
 * Translates a single task using MyMemory Translation API
 * @param {Object} task - Task object to translate
 * @param {string} targetLanguage - Target language code
 */
async translateTask(task, targetLanguage) {
    const cacheKey = `${task.id}_${targetLanguage}`;
    
    if (this.translations.has(cacheKey)) {
        return; // Already cached
    }

    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(task.originalTitle)}&langpair=en|${targetLanguage}`
        );
        
        if (!response.ok) {
            throw new Error('Translation API request failed');
        }
        
        const data = await response.json();
        
        if (data.responseStatus === 200) {
            const translatedText = data.responseData.translatedText;
            this.translations.set(cacheKey, translatedText);
        }
    } catch (error) {
        console.error(`Translation failed for task ${task.id}:`, error);
        // Fallback to original text
        this.translations.set(cacheKey, task.originalTitle);
    }
}
```

#### API Features
- **Free Service**: No API key required
- **Rate Limiting**: Built-in request throttling
- **Error Handling**: Graceful fallback to original text
- **Caching**: Local storage of translations
- **Batch Processing**: Efficient multiple task translation

#### Supported Language Codes
```javascript
const SUPPORTED_LANGUAGES = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh': 'Chinese'
};
```

### Error Handling Strategy
```javascript
async translateAllTasks(targetLanguage) {
    try {
        // Show loading indicator
        this.showNotification('Translating tasks...', 'info');
        
        // Process in batches
        const batchSize = 5;
        for (let i = 0; i < tasksToTranslate.length; i += batchSize) {
            const batch = tasksToTranslate.slice(i, i + batchSize);
            await Promise.all(batch.map(task => 
                this.translateTask(task, targetLanguage)
            ));
        }
        
        this.showNotification('Tasks translated successfully!', 'success');
    } catch (error) {
        console.error('Translation error:', error);
        this.showNotification('Translation failed. Showing original text.', 'error');
    }
}
```

## 🗄 State Management

### Application State Structure
```javascript
// Main application state
{
    tasks: [
        {
            id: 'unique-id',
            title: 'Original task title',
            originalTitle: 'Preserved original',
            displayTitle: 'Current display text',
            priority: 'high|medium|low',
            dueDate: '2024-01-15',
            completed: false,
            createdAt: '2024-01-01T10:00:00.000Z'
        }
    ],
    currentFilter: 'all|pending|completed|high',
    currentLanguage: 'en',
    searchQuery: '',
    translations: Map<string, string>
}
```

### State Management Methods
```javascript
/**
 * Save application state to localStorage
 */
saveTasks() {
    localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    localStorage.setItem('todoTranslations', JSON.stringify([...this.translations]));
    localStorage.setItem('todoLanguage', this.currentLanguage);
}

/**
 * Load application state from localStorage
 */
loadTasks() {
    try {
        // Load tasks
        const savedTasks = localStorage.getItem('todoTasks');
        this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
        
        // Load translations cache
        const savedTranslations = localStorage.getItem('todoTranslations');
        if (savedTranslations) {
            this.translations = new Map(JSON.parse(savedTranslations));
        }
        
        // Load language preference
        this.currentLanguage = localStorage.getItem('todoLanguage') || 'en';
        
        return this.tasks;
    } catch (error) {
        console.error('Error loading state:', error);
        return [];
    }
}
```

### State Update Patterns
```javascript
// Immutable state updates
addTask() {
    const newTask = { /* task object */ };
    this.tasks = [newTask, ...this.tasks]; // Prepend new task
    this.saveTasks();
    this.renderTasks();
}

// Filtered state access
getFilteredTasks() {
    let filtered = [...this.tasks]; // Create copy
    
    // Apply status filter
    switch (this.currentFilter) {
        case 'pending':
            filtered = filtered.filter(t => !t.completed);
            break;
        case 'completed':
            filtered = filtered.filter(t => t.completed);
            break;
        case 'high':
            filtered = filtered.filter(t => t.priority === 'high');
            break;
    }
    
    // Apply search filter
    if (this.searchQuery) {
        filtered = filtered.filter(t => 
            t.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }
    
    return filtered;
}
```

## 🎨 UI Components

### Component Architecture
Each UI component follows a consistent pattern:
1. **HTML Structure**: Semantic markup
2. **CSS Styling**: Component-specific styles
3. **JavaScript Logic**: Event handling and state updates

### Task Card Component
```javascript
/**
 * Creates HTML for a single task card
 * @param {Object} task - Task data object
 * @returns {string} HTML string for task card
 */
createTaskCard(task) {
    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
    const dueDateInfo = this.calculateDueDateInfo(dueDate);
    
    return `
        <div class="task-card ${task.completed ? 'completed' : ''}" 
             data-task-id="${task.id}">
            <div class="task-header">
                <span class="task-priority ${task.priority}">
                    ${task.priority}
                </span>
                <div class="task-actions">
                    <button class="action-btn edit-btn" title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="task-content">
                ${this.escapeHtml(task.displayTitle || task.title)}
            </div>
            <div class="task-meta">
                <label class="task-checkbox">
                    <input type="checkbox" ${task.completed ? 'checked' : ''}>
                    <span>${task.completed ? 'Completed' : 'Mark as complete'}</span>
                </label>
                ${dueDateInfo.html}
            </div>
        </div>
    `;
}
```

### Modal Component System
```javascript
/**
 * Generic modal management
 */
openModal(modalElement) {
    modalElement.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus first input for accessibility
    const firstInput = modalElement.querySelector('input, select, textarea');
    if (firstInput) firstInput.focus();
}

closeModal(modalElement) {
    modalElement.classList.remove('active');
    document.body.style.overflow = '';
}

// Specific modal implementations
openEditModal() {
    const task = this.tasks.find(t => t.id === this.currentEditId);
    if (task) {
        this.editTaskInput.value = task.title;
        this.editPrioritySelect.value = task.priority;
        this.editDueDateInput.value = task.dueDate;
        this.openModal(this.editModal);
    }
}
```

### Notification System
```javascript
/**
 * Show user notifications with different types
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, warning, info)
 */
showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Styling based on type
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${colors[type]};
        color: white;
        border-radius: 0.5rem;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
```

## 🧪 Testing Strategy

### Manual Testing Checklist

#### Core Functionality
- [ ] **Task Creation**: Add tasks with various priorities and due dates
- [ ] **Task Editing**: Modify existing tasks and verify changes persist
- [ ] **Task Deletion**: Delete tasks with confirmation dialog
- [ ] **Task Completion**: Toggle completion status
- [ ] **Data Persistence**: Refresh browser and verify tasks remain

#### Search and Filtering
- [ ] **Real-time Search**: Type in search box and verify instant filtering
- [ ] **Filter Buttons**: Test All, Pending, Completed, High Priority filters
- [ ] **Combined Filtering**: Use search with different filters
- [ ] **Empty States**: Verify empty state shows when no tasks match

#### Translation Features
- [ ] **Language Selection**: Switch between all supported languages
- [ ] **Task Translation**: Verify tasks translate correctly
- [ ] **New Task Translation**: Add tasks in non-English and verify translation
- [ ] **Cache Performance**: Switch languages multiple times for speed test
- [ ] **Error Handling**: Test with network disconnected

#### Responsive Design
- [ ] **Desktop**: Test on various desktop screen sizes
- [ ] **Tablet**: Verify layout adapts properly
- [ ] **Mobile**: Test touch interactions and layout
- [ ] **Orientation**: Test portrait and landscape modes

#### Accessibility
- [ ] **Keyboard Navigation**: Navigate entire app with keyboard only
- [ ] **Screen Reader**: Test with screen reader software
- [ ] **Focus Indicators**: Verify visible focus indicators
- [ ] **Color Contrast**: Check contrast ratios meet WCAG standards

### Browser Testing Matrix
```
Browser          | Version | Desktop | Mobile | Status
-----------------|---------|---------|--------|--------
Chrome           | 80+     | ✅      | ✅     | Full Support
Firefox          | 75+     | ✅      | ✅     | Full Support
Safari           | 13+     | ✅      | ✅     | Full Support
Edge             | 80+     | ✅      | ✅     | Full Support
Chrome Mobile    | Latest  | N/A     | ✅     | Full Support
Safari Mobile    | Latest  | N/A     | ✅     | Full Support
```

### Performance Testing
```javascript
// Performance monitoring code
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.duration}ms`);
    }
});

performanceObserver.observe({ entryTypes: ['measure'] });

// Measure task rendering performance
performance.mark('render-start');
this.renderTasks();
performance.mark('render-end');
performance.measure('task-render', 'render-start', 'render-end');
```

### Error Testing Scenarios
1. **Network Failures**: Disconnect internet during translation
2. **Storage Limits**: Fill localStorage to capacity
3. **Invalid Data**: Manually corrupt localStorage data
4. **API Errors**: Mock translation API failures
5. **Memory Leaks**: Create and delete many tasks rapidly

## ⚡ Performance Optimization

### Code Optimization Techniques

#### Debounced Search
```javascript
/**
 * Debounced search to prevent excessive filtering
 */
setupDebouncedSearch() {
    let searchTimeout;
    
    this.searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderTasks();
        }, 300); // 300ms delay
    });
}
```

#### Efficient DOM Updates
```javascript
/**
 * Batch DOM updates for better performance
 */
renderTasks() {
    const filteredTasks = this.getFilteredTasks();
    
    // Use DocumentFragment for efficient DOM manipulation
    const fragment = document.createDocumentFragment();
    
    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = this.createTaskCard(task);
        fragment.appendChild(taskElement.firstElementChild);
    });
    
    // Single DOM update
    this.tasksGrid.innerHTML = '';
    this.tasksGrid.appendChild(fragment);
    
    // Batch event listener attachment
    this.attachTaskEventListeners(filteredTasks);
}
```

#### Memory Management
```javascript
/**
 * Clean up event listeners and references
 */
cleanup() {
    // Remove event listeners
    this.searchInput.removeEventListener('input', this.searchHandler);
    
    // Clear caches
    this.translations.clear();
    
    // Null references
    this.tasks = null;
    this.currentEditId = null;
}
```

### CSS Performance
```css
/* Use transform for animations (GPU accelerated) */
.task-card {
    transition: transform 0.3s ease;
    will-change: transform;
}

.task-card:hover {
    transform: translateY(-2px);
}

/* Optimize repaints with contain */
.task-card {
    contain: layout style paint;
}

/* Use efficient selectors */
.task-card.completed .task-content {
    text-decoration: line-through;
}
```

### Bundle Optimization
```javascript
// vite.config.js
export default {
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['font-awesome']
                }
            }
        }
    }
};
```

## 🚀 Deployment

### Build Process
```bash
# Production build
npm run build

# Output structure
dist/
├── index.html          # Minified HTML
├── assets/
│   ├── index-[hash].js # Minified JavaScript
│   └── index-[hash].css # Minified CSS
└── favicon.ico
```

### Deployment Options

#### Netlify (Recommended)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

#### GitHub Pages
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### Vercel
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Environment Configuration
```javascript
// Production environment variables
const config = {
    API_URL: import.meta.env.VITE_TRANSLATION_API_URL,
    APP_VERSION: import.meta.env.VITE_APP_VERSION,
    ENVIRONMENT: import.meta.env.MODE
};
```

### Performance Monitoring
```javascript
// Add to production build
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

// Analytics integration
function trackEvent(action, category, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}
```

## 🤝 Contributing

### Development Workflow
1. **Fork Repository**: Create personal fork on GitHub
2. **Create Branch**: `git checkout -b feature/new-feature`
3. **Make Changes**: Implement feature with tests
4. **Test Thoroughly**: Run all test scenarios
5. **Commit Changes**: Use conventional commit messages
6. **Push Branch**: `git push origin feature/new-feature`
7. **Create PR**: Submit pull request with description

### Code Standards

#### JavaScript Style Guide
```javascript
// Use const/let instead of var
const tasks = [];
let currentFilter = 'all';

// Use arrow functions for callbacks
tasks.filter(task => task.completed);

// Use template literals
const message = `Task "${task.title}" completed`;

// Use destructuring
const { title, priority, dueDate } = task;

// Use async/await instead of promises
async function translateTask(task) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Translation failed:', error);
    }
}
```

#### CSS Guidelines
```css
/* Use BEM methodology for class names */
.task-card { }
.task-card__header { }
.task-card__title { }
.task-card--completed { }

/* Use CSS custom properties */
:root {
    --primary-color: #3B82F6;
    --border-radius: 0.5rem;
}

/* Mobile-first responsive design */
.task-grid {
    display: grid;
    grid-template-columns: 1fr;
}

@media (min-width: 768px) {
    .task-grid {
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    }
}
```

#### Documentation Standards
```javascript
/**
 * Translates a task title to the specified language
 * @param {Object} task - The task object to translate
 * @param {string} task.id - Unique task identifier
 * @param {string} task.title - Original task title
 * @param {string} targetLanguage - ISO language code (e.g., 'es', 'fr')
 * @returns {Promise<string>} Translated task title
 * @throws {Error} When translation API is unavailable
 * @example
 * const translatedTitle = await translateTask(task, 'es');
 */
async translateTask(task, targetLanguage) {
    // Implementation
}
```

### Pull Request Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] Cross-browser testing done
- [ ] Mobile testing verified
- [ ] Accessibility testing passed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors
```

### Issue Templates
```markdown
## Bug Report
**Describe the bug**
Clear description of the issue.

**To Reproduce**
Steps to reproduce the behavior.

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Browser: [e.g., Chrome 91]
- OS: [e.g., Windows 10]
- Device: [e.g., Desktop, iPhone 12]
```

---

## 📚 Additional Resources

### Useful Links
- [MDN Web Docs](https://developer.mozilla.org/) - Web development reference
- [Can I Use](https://caniuse.com/) - Browser compatibility tables
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards
- [Vite Documentation](https://vitejs.dev/) - Build tool documentation

### Recommended Tools
- **VS Code Extensions**: ES6 String HTML, Live Server, Prettier
- **Browser DevTools**: Chrome DevTools, Firefox Developer Tools
- **Testing Tools**: Lighthouse, axe DevTools
- **Design Tools**: Figma, Adobe XD

### Learning Resources
- **JavaScript**: [JavaScript.info](https://javascript.info/)
- **CSS**: [CSS-Tricks](https://css-tricks.com/)
- **Accessibility**: [WebAIM](https://webaim.org/)
- **Performance**: [Web.dev](https://web.dev/)

---

**Last Updated**: [Current Date]  
**Version**: 1.0  
**Maintainer**: Development Team
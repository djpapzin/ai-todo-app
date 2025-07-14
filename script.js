class TodoApp {
    constructor() {
        this.tasks = this.loadTasks();
        this.translations = new Map();
        this.currentFilter = 'all';
        this.currentLanguage = 'en';
        this.currentEditId = null;
        this.currentDeleteId = null;
        this.searchQuery = '';
        
        this.initializeElements();
        this.loadLanguagePreference();
        this.bindEvents();
        this.renderTasks();
        this.updateStats();
    }

    initializeElements() {
        // Form elements
        this.taskInput = document.getElementById('taskInput');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.dueDateInput = document.getElementById('dueDateInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        
        // Filter elements
        this.searchInput = document.getElementById('searchInput');
        this.languageSelect = document.getElementById('languageSelect');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        
        // Display elements
        this.tasksGrid = document.getElementById('tasksGrid');
        this.emptyState = document.getElementById('emptyState');
        this.totalTasksSpan = document.getElementById('totalTasks');
        this.completedTasksSpan = document.getElementById('completedTasks');
        
        // Modal elements
        this.editModal = document.getElementById('editModal');
        this.confirmModal = document.getElementById('confirmModal');
        this.editTaskInput = document.getElementById('editTaskInput');
        this.editPrioritySelect = document.getElementById('editPrioritySelect');
        this.editDueDateInput = document.getElementById('editDueDateInput');
    }

    bindEvents() {
        // Add task
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        
        // Search
        this.searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderTasks();
        });
        
        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
        
        // Language selector
        this.languageSelect.addEventListener('change', (e) => {
            this.setLanguage(e.target.value);
        });
        
        // Edit modal events
        document.getElementById('closeModal').addEventListener('click', () => this.closeEditModal());
        document.getElementById('cancelEdit').addEventListener('click', () => this.closeEditModal());
        document.getElementById('saveEdit').addEventListener('click', () => this.saveEdit());
        
        // Confirm modal events
        document.getElementById('closeConfirmModal').addEventListener('click', () => this.closeConfirmModal());
        document.getElementById('cancelDelete').addEventListener('click', () => this.closeConfirmModal());
        document.getElementById('confirmDelete').addEventListener('click', () => this.confirmDelete());
        
        // Close modals on overlay click
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) this.closeEditModal();
        });
        this.confirmModal.addEventListener('click', (e) => {
            if (e.target === this.confirmModal) this.closeConfirmModal();
        });
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    addTask() {
        const title = this.taskInput.value.trim();
        const priority = this.prioritySelect.value;
        const dueDate = this.dueDateInput.value;
        
        if (!title) {
            this.showNotification('Please enter a task title', 'error');
            return;
        }
        
        const task = {
            id: this.generateId(),
            title,
            originalTitle: title, // Store original for translation
            displayTitle: title,  // Current display title
            priority,
            dueDate,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.unshift(task);
        this.saveTasks();
        
        // Translate new task if not in English
        if (this.currentLanguage !== 'en') {
            this.translateTask(task, this.currentLanguage).then(() => {
                this.applyCachedTranslations(this.currentLanguage);
                this.renderTasks();
            });
        }
        
        this.renderTasks();
        this.updateStats();
        this.clearForm();
        this.showNotification('Task added successfully!', 'success');
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            
            const message = task.completed ? 'Task completed!' : 'Task marked as pending';
            this.showNotification(message, 'success');
        }
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            this.currentEditId = id;
            this.editTaskInput.value = task.title;
            this.editPrioritySelect.value = task.priority;
            this.editDueDateInput.value = task.dueDate;
            this.openEditModal();
        }
    }

    saveEdit() {
        const title = this.editTaskInput.value.trim();
        const priority = this.editPrioritySelect.value;
        const dueDate = this.editDueDateInput.value;
        
        if (!title) {
            this.showNotification('Please enter a task title', 'error');
            return;
        }
        
        const task = this.tasks.find(t => t.id === this.currentEditId);
        if (task) {
            task.title = title;
            task.priority = priority;
            task.dueDate = dueDate;
            
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.closeEditModal();
            this.showNotification('Task updated successfully!', 'success');
        }
    }

    deleteTask(id) {
        this.currentDeleteId = id;
        this.openConfirmModal();
    }

    confirmDelete() {
        this.tasks = this.tasks.filter(t => t.id !== this.currentDeleteId);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        this.closeConfirmModal();
        this.showNotification('Task deleted successfully!', 'success');
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.renderTasks();
    }

    /**
     * Sets the application language and translates all tasks
     * @param {string} language - Language code (e.g., 'es', 'fr', 'de')
     */
    async setLanguage(language) {
        this.currentLanguage = language;
        this.languageSelect.value = language;
        this.saveLanguage(language);
        
        // Translate all tasks if not English
        if (language !== 'en') {
            await this.translateAllTasks(language);
        } else {
            // Restore original text for English
            this.restoreOriginalTasks();
        }
        
        this.renderTasks();
    }

    /**
     * Translates all tasks to the specified language using Google Translate API
     * @param {string} targetLanguage - Target language code
     */
    async translateAllTasks(targetLanguage) {
        const tasksToTranslate = this.tasks.filter(task => {
            const cacheKey = `${task.id}_${targetLanguage}`;
            return !this.translations.has(cacheKey);
        });

        if (tasksToTranslate.length === 0) {
            // All tasks already translated, apply cached translations
            this.applyCachedTranslations(targetLanguage);
            return;
        }

        try {
            // Show loading indicator
            this.showNotification('Translating tasks...', 'info');
            
            // Translate tasks in batches to avoid API limits
            const batchSize = 5;
            for (let i = 0; i < tasksToTranslate.length; i += batchSize) {
                const batch = tasksToTranslate.slice(i, i + batchSize);
                await Promise.all(batch.map(task => this.translateTask(task, targetLanguage)));
            }
            
            this.applyCachedTranslations(targetLanguage);
            this.showNotification('Tasks translated successfully!', 'success');
        } catch (error) {
            console.error('Translation error:', error);
            this.showNotification('Translation failed. Showing original text.', 'error');
        }
    }

    /**
     * Translates a single task using MyMemory Translation API (free)
     * @param {Object} task - Task object to translate
     * @param {string} targetLanguage - Target language code
     */
    async translateTask(task, targetLanguage) {
        const cacheKey = `${task.id}_${targetLanguage}`;
        
        if (this.translations.has(cacheKey)) {
            return;
        }

        try {
            // Store original text if not already stored
            if (!task.originalTitle) {
                task.originalTitle = task.title;
            }

            // Use MyMemory Translation API (free, no API key required)
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
            } else {
                throw new Error('Translation API returned error');
            }
        } catch (error) {
            console.error(`Failed to translate task ${task.id}:`, error);
            // Fallback: use original text
            this.translations.set(cacheKey, task.originalTitle);
        }
    }

    /**
     * Applies cached translations to all tasks
     * @param {string} targetLanguage - Target language code
     */
    applyCachedTranslations(targetLanguage) {
        this.tasks.forEach(task => {
            const cacheKey = `${task.id}_${targetLanguage}`;
            const translation = this.translations.get(cacheKey);
            if (translation) {
                task.displayTitle = translation;
            } else {
                task.displayTitle = task.originalTitle || task.title;
            }
        });
    }

    /**
     * Restores original task titles for English display
     */
    restoreOriginalTasks() {
        this.tasks.forEach(task => {
            task.displayTitle = task.originalTitle || task.title;
        });
    }

    getFilteredTasks() {
        let filtered = this.tasks;
        
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
                t.title.toLowerCase().includes(this.searchQuery)
            );
        }
        
        return filtered;
    }

    renderTasks() {
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            this.tasksGrid.style.display = 'none';
            this.emptyState.style.display = 'block';
            return;
        }
        
        this.tasksGrid.style.display = 'grid';
        this.emptyState.style.display = 'none';
        
        this.tasksGrid.innerHTML = filteredTasks.map(task => this.createTaskCard(task)).join('');
        
        // Add event listeners to task cards
        filteredTasks.forEach(task => {
            const taskCard = document.querySelector(`[data-task-id="${task.id}"]`);
            if (taskCard) {
                taskCard.classList.add('fade-in');
                
                // Checkbox
                const checkbox = taskCard.querySelector('.task-checkbox input');
                checkbox.addEventListener('change', () => this.toggleTask(task.id));
                
                // Edit button
                const editBtn = taskCard.querySelector('.edit-btn');
                editBtn.addEventListener('click', () => this.editTask(task.id));
                
                // Delete button
                const deleteBtn = taskCard.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', () => this.deleteTask(task.id));
            }
        });
    }

    createTaskCard(task) {
        const dueDate = task.dueDate ? new Date(task.dueDate) : null;
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        let dueDateClass = '';
        let dueDateText = '';
        
        if (dueDate) {
            const diffTime = dueDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays < 0) {
                dueDateClass = 'overdue';
                dueDateText = 'Overdue';
            } else if (diffDays === 0) {
                dueDateClass = 'due-soon';
                dueDateText = 'Due today';
            } else if (diffDays === 1) {
                dueDateClass = 'due-soon';
                dueDateText = 'Due tomorrow';
            } else {
                dueDateText = `Due ${dueDate.toLocaleDateString()}`;
            }
        }
        
        return `
            <div class="task-card ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-header">
                    <span class="task-priority ${task.priority}">${task.priority}</span>
                    <div class="task-actions">
                        <button class="action-btn edit-btn" title="Edit task">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" title="Delete task">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="task-content">${this.escapeHtml(task.displayTitle || task.title)}</div>
                <div class="task-meta">
                    <label class="task-checkbox">
                        <input type="checkbox" ${task.completed ? 'checked' : ''}>
                        <span>${task.completed ? 'Completed' : 'Mark as complete'}</span>
                    </label>
                    ${dueDate ? `<div class="task-due-date ${dueDateClass}">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${dueDateText}</span>
                    </div>` : ''}
                </div>
            </div>
        `;
    }

    updateStats() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(t => t.completed).length;
        
        this.totalTasksSpan.textContent = totalTasks;
        this.completedTasksSpan.textContent = completedTasks;
    }

    clearForm() {
        this.taskInput.value = '';
        this.prioritySelect.value = 'medium';
        this.dueDateInput.value = '';
        this.taskInput.focus();
    }

    openEditModal() {
        this.editModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.editTaskInput.focus();
    }

    closeEditModal() {
        this.editModal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentEditId = null;
    }

    openConfirmModal() {
        this.confirmModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeConfirmModal() {
        this.confirmModal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentDeleteId = null;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 400px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        `;
        
        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = '#10B981';
                break;
            case 'error':
                notification.style.background = '#EF4444';
                break;
            case 'warning':
                notification.style.background = '#F59E0B';
                break;
            default:
                notification.style.background = '#3B82F6';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
        localStorage.setItem('todoTranslations', JSON.stringify([...this.translations]));
    }

    loadTasks() {
        // Initialize translations Map first
        this.translations = new Map();
        
        try {
            const saved = localStorage.getItem('todoTasks');
            const savedTranslations = localStorage.getItem('todoTranslations');
            
            if (savedTranslations) {
                this.translations = new Map(JSON.parse(savedTranslations));
            }
            
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            return [];
        }
    }

    /**
     * Saves the current language preference
     * @param {string} language - Language code to save
     */
    saveLanguage(language) {
        localStorage.setItem('todoLanguage', language);
    }

    /**
     * Loads the saved language preference
     * @returns {string|null} - Saved language code or null
     */
    loadLanguage() {
        return localStorage.getItem('todoLanguage');
    }

    /**
     * Loads saved language preference and applies it
     */
    loadLanguagePreference() {
        const savedLanguage = this.loadLanguage();
        if (savedLanguage && savedLanguage !== 'en') {
            this.currentLanguage = savedLanguage;
            this.languageSelect.value = savedLanguage;
            // Apply cached translations if available
            this.applyCachedTranslations(savedLanguage);
        }
    }
}

// Initialize the app when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
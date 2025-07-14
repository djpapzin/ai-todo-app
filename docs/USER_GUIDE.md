# AI Todo App - User Guide

## 📋 Table of Contents
1. [Getting Started](#getting-started)
2. [Basic Features](#basic-features)
3. [Advanced Features](#advanced-features)
4. [Multi-Language Support](#multi-language-support)
5. [Tips & Tricks](#tips--tricks)
6. [Troubleshooting](#troubleshooting)
7. [Keyboard Shortcuts](#keyboard-shortcuts)
8. [FAQ](#faq)

## 🚀 Getting Started

### Welcome to AI Todo App!
The AI Todo App is designed to help you manage your tasks efficiently with a clean, intuitive interface. Whether you're organizing work projects, personal goals, or daily chores, this app adapts to your needs.

### Available Versions
- **Current Version**: [https://exquisite-kitsune-286948.netlify.app](https://exquisite-kitsune-286948.netlify.app) (Vanilla JavaScript implementation)
- **Previous Version**: [https://ai-todo-app-henna.vercel.app](https://ai-todo-app-henna.vercel.app) (React implementation - deprecated)

### First Steps
1. **Open the App**: Navigate to [https://exquisite-kitsune-286948.netlify.app](https://exquisite-kitsune-286948.netlify.app) in your web browser
2. **Add Your First Task**: Click the task input field and type your first task
3. **Set Priority**: Choose High, Medium, or Low priority from the dropdown
4. **Add Due Date** (Optional): Select a due date using the date picker
5. **Click "Add Task"**: Your task will appear in the main area

### Interface Overview
- **Header**: Shows app title and task statistics
- **Add Task Form**: Create new tasks with priority and due date
- **Search & Filters**: Find and organize your tasks
- **Task Grid**: Displays all your tasks in an organized layout
- **Language Selector**: Switch between different languages

## 📝 Basic Features

### Creating Tasks

#### Adding a New Task
1. **Enter Task Title**: Type your task description in the input field
2. **Select Priority**: Choose from:
   - 🔴 **High Priority**: Urgent or important tasks
   - 🟡 **Medium Priority**: Regular tasks (default)
   - 🟢 **Low Priority**: Less urgent tasks
3. **Set Due Date** (Optional): Click the date field to select a deadline
4. **Click "Add Task"**: Task appears immediately in your list

#### Task Information
Each task displays:
- **Title**: Your task description
- **Priority Badge**: Color-coded priority level
- **Due Date**: When applicable, with status indicators
- **Completion Status**: Checkbox to mark complete/incomplete
- **Action Buttons**: Edit and delete options (appear on hover)

### Managing Tasks

#### Completing Tasks
- **Mark Complete**: Click the checkbox next to any task
- **Visual Changes**: Completed tasks appear with strikethrough text and faded appearance
- **Statistics Update**: Completion count updates automatically
- **Toggle Status**: Click checkbox again to mark as incomplete

#### Editing Tasks
1. **Click Edit Button**: Hover over task and click the pencil icon
2. **Modify Details**: Update title, priority, or due date in the modal
3. **Save Changes**: Click "Save Changes" to apply updates
4. **Cancel**: Click "Cancel" or X to discard changes

#### Deleting Tasks
1. **Click Delete Button**: Hover over task and click the trash icon
2. **Confirm Deletion**: A confirmation dialog appears
3. **Confirm**: Click "Delete" to permanently remove the task
4. **Cancel**: Click "Cancel" to keep the task

### Organizing Tasks

#### Search Functionality
- **Real-time Search**: Type in the search box to filter tasks instantly
- **Case Insensitive**: Search works regardless of capitalization
- **Partial Matches**: Find tasks with partial title matches
- **Clear Search**: Delete search text to show all tasks

#### Filtering Tasks
Use filter buttons to show specific task types:
- **All**: Shows every task (default)
- **Pending**: Shows only incomplete tasks
- **Completed**: Shows only finished tasks
- **High Priority**: Shows only high-priority tasks

#### Combined Search and Filter
- Search and filters work together
- Apply a filter, then search within those results
- Clear search to see all filtered results

## 🌟 Advanced Features

### Task Statistics
The header displays real-time statistics:
- **Total Tasks**: Complete count of all tasks
- **Completed Tasks**: Number of finished tasks
- **Progress Tracking**: Visual representation of completion rate

### Due Date Management

#### Setting Due Dates
1. **Select Date**: Use the date picker when creating or editing tasks
2. **Visual Indicators**: Tasks show different colors based on due date status:
   - 🔴 **Overdue**: Past due date
   - 🟡 **Due Soon**: Due today or tomorrow
   - ⚪ **Future**: Due later

#### Due Date Features
- **Automatic Calculation**: App calculates days until due
- **Status Updates**: Due date status updates automatically
- **Visual Cues**: Color-coded indicators for quick recognition

### Responsive Design
The app adapts to your device:
- **Desktop**: Multi-column grid layout with hover effects
- **Tablet**: Adapted layout with touch-friendly controls
- **Mobile**: Single-column layout with optimized spacing

## 🌍 Multi-Language Support

### Supported Languages
The app supports translation into 10+ languages:
- 🇺🇸 English (Default)
- 🇪🇸 Spanish (Español)
- 🇫🇷 French (Français)
- 🇩🇪 German (Deutsch)
- 🇮🇹 Italian (Italiano)
- 🇵🇹 Portuguese (Português)
- 🇷🇺 Russian (Русский)
- 🇯🇵 Japanese (日本語)
- 🇰🇷 Korean (한국어)
- 🇨🇳 Chinese (中文)

### Using Translation

#### Switching Languages
1. **Find Language Selector**: Located in the filter controls area
2. **Select Language**: Choose your preferred language from dropdown
3. **Automatic Translation**: Existing tasks translate automatically
4. **Loading Indicator**: Brief "Translating tasks..." notification appears
5. **Instant Updates**: Task list updates with translated content

#### How Translation Works
- **Original Preservation**: Your original text is always saved
- **Smart Caching**: Translations are cached for faster switching
- **New Task Translation**: New tasks added in non-English languages get translated
- **Return to English**: Switch back to English to see original text
- **Offline Support**: Cached translations work without internet

#### Translation Features
- **Batch Processing**: Multiple tasks translate efficiently
- **Error Handling**: Falls back to original text if translation fails
- **Performance Optimized**: Minimal impact on app speed
- **Quality Translation**: Uses professional translation API

### Language-Specific Tips
- **Right-to-Left Languages**: App maintains proper text direction
- **Character Sets**: Supports Unicode for all language characters
- **Cultural Adaptation**: Date formats adapt to language selection

## 💡 Tips & Tricks

### Productivity Tips
1. **Use Priority Levels**: Organize tasks by importance for better focus
2. **Set Due Dates**: Add deadlines to stay on track
3. **Regular Reviews**: Use filters to review pending vs completed tasks
4. **Search Efficiently**: Use partial words to find tasks quickly

### Organization Strategies
- **Daily Planning**: Filter by due date to see today's tasks
- **Priority Focus**: Use High Priority filter for urgent items
- **Progress Tracking**: Check completion statistics regularly
- **Language Learning**: Use translation feature to learn task names in other languages

### Performance Tips
- **Regular Cleanup**: Delete completed tasks you no longer need
- **Efficient Search**: Use specific keywords for faster results
- **Mobile Usage**: App works great on phones for on-the-go task management

## 🔧 Troubleshooting

### Common Issues

#### Tasks Not Saving
**Problem**: Tasks disappear after browser refresh
**Solution**: 
- Ensure browser allows localStorage
- Check if in private/incognito mode
- Clear browser cache and try again

#### Translation Not Working
**Problem**: Language selection doesn't translate tasks
**Solutions**:
- Check internet connection
- Wait for "Translating tasks..." notification to complete
- Try switching back to English and then to desired language
- Clear browser cache if issues persist

#### Search Not Finding Tasks
**Problem**: Search doesn't show expected results
**Solutions**:
- Check spelling of search terms
- Try partial words instead of complete phrases
- Clear any active filters that might hide results
- Refresh the page and try again

#### Mobile Display Issues
**Problem**: App doesn't look right on mobile
**Solutions**:
- Ensure you're using a modern browser
- Try rotating device orientation
- Zoom out if content appears too large
- Clear browser cache

### Performance Issues

#### Slow Loading
- Check internet connection for translation features
- Clear browser cache and cookies
- Close other browser tabs to free memory
- Try refreshing the page

#### Memory Usage
- Delete old completed tasks regularly
- Clear translation cache by switching to English
- Restart browser if app becomes sluggish

### Browser Compatibility
**Supported Browsers**:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

**If using older browser**:
- Update to latest version
- Some features may not work properly
- Consider switching to supported browser

## ⌨️ Keyboard Shortcuts

### Navigation
- **Tab**: Move between interactive elements
- **Enter**: Activate buttons and submit forms
- **Escape**: Close modals and cancel operations
- **Space**: Toggle checkboxes and buttons

### Task Management
- **Enter in Task Input**: Add new task
- **Tab through Form**: Navigate add task form fields
- **Enter in Edit Modal**: Save task changes
- **Escape in Modal**: Cancel and close modal

### Search & Filter
- **Click Search Field**: Focus search input
- **Type**: Immediately start filtering tasks
- **Clear Search**: Delete all text to show all tasks

### Accessibility Features
- **Screen Reader Support**: Full compatibility with screen readers
- **High Contrast**: Works with browser high contrast modes
- **Keyboard Only**: Complete functionality without mouse
- **Focus Indicators**: Clear visual focus indicators

## ❓ FAQ

### General Questions

**Q: Is my data safe?**
A: Yes, all data is stored locally in your browser. Nothing is sent to external servers except for translation requests.

**Q: Can I use this offline?**
A: Yes, once loaded, the app works offline. Translation requires internet connection.

**Q: Is there a mobile app?**
A: The web app is fully responsive and works great on mobile browsers. No separate app needed.

**Q: Can I export my tasks?**
A: Currently, tasks are stored in browser localStorage. Export feature is planned for future updates.

### Feature Questions

**Q: How many tasks can I create?**
A: There's no hard limit, but performance may slow with thousands of tasks.

**Q: Can I set recurring tasks?**
A: Not currently, but this feature is planned for future updates.

**Q: Can I share tasks with others?**
A: Not currently. Collaboration features are planned for future versions.

**Q: Can I categorize tasks beyond priority?**
A: Currently, tasks can be organized by priority and completion status. More categories are planned.

### Technical Questions

**Q: Which browsers are supported?**
A: Modern browsers including Chrome 80+, Firefox 75+, Safari 13+, and Edge 80+.

**Q: Why do I need internet for translation?**
A: Translation uses an external API service. Once translated, content is cached locally.

**Q: Can I change the app's interface language?**
A: Currently, the interface is in English, but task content can be translated to other languages.

**Q: What happens if I clear my browser data?**
A: All tasks and settings will be lost. Consider exporting important tasks before clearing data.

### Troubleshooting Questions

**Q: Tasks disappeared after browser update**
A: Browser updates sometimes clear localStorage. Unfortunately, this data cannot be recovered.

**Q: Translation is showing wrong language**
A: Try switching back to English and then to your desired language. Clear cache if issues persist.

**Q: App is running slowly**
A: Try deleting old completed tasks, clearing browser cache, or restarting your browser.

**Q: Can't click buttons on mobile**
A: Ensure you're not zoomed in too far. Try rotating device or refreshing the page.

---

## 📞 Support

If you encounter issues not covered in this guide:

1. **Refresh the Page**: Often resolves temporary issues
2. **Clear Browser Cache**: Fixes most persistent problems
3. **Try Different Browser**: Helps identify browser-specific issues
4. **Check Console**: Press F12 and look for error messages

For additional support or feature requests, please refer to the project documentation or contact the development team.

---

**Last Updated**: [Current Date]  
**Version**: 1.0  
**Compatible With**: All modern browsers
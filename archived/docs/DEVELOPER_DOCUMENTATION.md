# AI Todo App - Developer Documentation (DEPRECATED)

## Important Notice

> **DEPRECATED**: This version of the application is now deprecated. A new version will replace it soon. This documentation is kept for reference purposes only.

## Overview

The AI Todo App is a React-based web application that allows users to create, manage, and translate to-do items. This document provides technical information for developers who want to understand, maintain, or extend the application.

## Project Structure

```
ai-todo-app/
├── archived/            # Deprecated version files
├── public/              # Static assets
│   ├── index.html       # HTML entry point
│   ├── manifest.json    # Web app manifest
│   └── ...
├── src/                 # Source code
│   ├── App.tsx          # Main application component
│   ├── index.tsx        # Entry point
│   ├── index.css        # Global styles (Tailwind)
│   └── ...
├── docs/                # Documentation
│   ├── PRD.md           # Product Requirements Document
│   ├── USER_DOCUMENTATION.md # User guide
│   └── DEVELOPER_DOCUMENTATION.md # This file
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md            # Project overview
```

## Tech Stack

- **React**: UI library for building the interface
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for making API requests
- **LibreTranslate API**: Free and open source translation API
- **Local Storage**: Browser API for data persistence

## Key Components

### App Component (`App.tsx`)

The main component that contains all the application logic and UI.

#### State Management
- `todos`: Array of to-do items with their properties
- `inputValue`: Current value of the task input field
- `selectedLanguage`: Currently selected language for translation

#### Core Functions
- `handleInputChange`: Updates the input field state
- `handleAddTodo`: Adds a new to-do item to the list
- `handleToggleComplete`: Toggles the completed state of a to-do item
- `handleDeleteTodo`: Removes a to-do item from the list
- `handleTranslate`: Translates a to-do item using the LibreTranslate API
- `handleLanguageChange`: Updates the selected language for translation

#### Data Persistence
- The application uses `localStorage` to save and retrieve to-do items
- Data is saved whenever the todos state changes
- Data is loaded when the component mounts

## TodoItem Interface

```typescript
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  translatedText?: string;
  translatedLanguage?: string;
}
```

## Translation API

The application uses the LibreTranslate API for translating to-do items.

### Endpoint
```
https://libretranslate.de/translate
```

### Request Format
```javascript
{
  q: "Text to translate",
  source: "auto", // Auto-detect source language
  target: "es",   // Target language code
}
```

### Response Format
```javascript
{
  translatedText: "Translated text"
}
```

## Local Storage

To-do items are stored in the browser's local storage under the key `todos` as a JSON string.

### Storage Format
```javascript
localStorage.setItem('todos', JSON.stringify(todos));
```

### Retrieval Format
```javascript
const storedTodos = localStorage.getItem('todos');
if (storedTodos) {
  setTodos(JSON.parse(storedTodos));
}
```

## Adding New Features

### Adding a New Language
To add a new language to the translation options:

1. Add an entry to the `languages` array in the `App` component:
```typescript
const languages = [
  // Existing languages
  { code: 'new-code', name: 'New Language' },
];
```

### Adding Categories for To-Do Items
To implement categories:

1. Update the `TodoItem` interface:
```typescript
interface TodoItem {
  // Existing properties
  category?: string;
}
```

2. Add UI elements for selecting and displaying categories

## Deployment

The application is configured to be deployed on Vercel:

1. Make sure you have the Vercel CLI installed:
```bash
npm install -g vercel
```

2. Run the build process:
```bash
npm run build
```

3. Deploy to Vercel:
```bash
vercel
```

## Testing

The application can be tested locally using:

```bash
npm start
```

This will start a development server at `http://localhost:3000`.

## Common Issues

### Translation API Rate Limiting
The LibreTranslate API may have rate limiting. For production use, consider:
- Implementing a caching mechanism
- Using a paid translation service with higher limits
- Self-hosting a translation service

### Performance Considerations
For large numbers of to-do items:
- Consider pagination or virtual scrolling
- Optimize render cycles by using React.memo for list items

## Further Development Ideas

- Add support for task due dates
- Implement task categories/tags
- Add user authentication for cloud sync
- Create a mobile application using React Native
- Implement offline support with Service Workers

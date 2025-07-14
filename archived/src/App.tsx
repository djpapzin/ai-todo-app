import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaCheck, FaLanguage } from 'react-icons/fa';
import axios from 'axios';

// Define the structure for a to-do item
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  translatedText?: string;
  translatedLanguage?: string;
}

// Main App Component
function App() {
  // State management for todo items, input field, selected language
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('es'); // Default to Spanish
  
  // List of available languages for translation
  const languages = [
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese' },
  ];

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle adding a new todo item
  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  // Handle key press (Enter) to add a todo
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  // Handle marking a todo as complete
  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  // Handle deleting a todo item
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Handle translating a todo item
  const handleTranslate = async (id: number) => {
    // Find the todo to translate
    const todoToTranslate = todos.find((todo) => todo.id === id);
    if (!todoToTranslate) return;

    try {
      // We'll use the LibreTranslate API (no API key required for demo)
      // In a production app, you'd use a more robust translation service like Google Translate or DeepL
      const response = await axios.post(
        'https://libretranslate.de/translate',
        {
          q: todoToTranslate.text,
          source: 'auto', // Auto-detect source language
          target: selectedLanguage,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Update the todo with the translated text
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              translatedText: response.data.translatedText,
              translatedLanguage: selectedLanguage,
            };
          }
          return todo;
        })
      );
    } catch (error) {
      console.error('Translation error:', error);
      // Fallback method if the API call fails
      alert('Translation service is currently unavailable. Please try again later.');
    }
  };

  // Handle language selection change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  /**
   * Effect hook to save todos to local storage whenever the todos state changes
   * This ensures persistence between browser sessions
   */
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  /**
   * Effect hook to load todos from local storage when the component mounts
   * This retrieves previously saved todos when the app is reopened
   */
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-500 to-purple-600">
          <h1 className="text-2xl font-bold text-white">AI Todo App</h1>
          <p className="mt-1 text-sm text-white">Add, complete, and translate your tasks</p>
        </div>

        <div className="p-4">
          {/* Todo Input Form */}
          <div className="flex items-center mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a new task..."
            />
            <button
              onClick={handleAddTodo}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
            >
              <FaPlus />
            </button>
          </div>

          {/* Language Selector */}
          <div className="flex items-center mb-6">
            <label htmlFor="language-select" className="mr-2 text-gray-700 flex items-center">
              <FaLanguage className="mr-1" /> Translate to:
            </label>
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Todo List */}
          <div className="space-y-3">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No tasks yet. Add one above!</p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex flex-col p-3 border rounded-lg ${
                    todo.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleToggleComplete(todo.id)}
                        className={`w-6 h-6 mr-3 flex items-center justify-center rounded-full ${
                          todo.completed ? 'bg-green-500 text-white' : 'border border-gray-300'
                        }`}
                      >
                        {todo.completed && <FaCheck className="text-xs" />}
                      </button>
                      <span
                        className={`text-lg ${
                          todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                        }`}
                      >
                        {todo.text}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleTranslate(todo.id)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                        title="Translate"
                      >
                        <FaLanguage />
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  {/* Display translated text if available */}
                  {todo.translatedText && (
                    <div className="mt-2 pl-9 text-sm text-gray-600 italic">
                      {languages.find(l => l.code === todo.translatedLanguage)?.name}: {todo.translatedText}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="px-4 py-3 bg-gray-50 text-right text-xs text-gray-500">
          <p>AI Todo App | Created with React, TypeScript & TailwindCSS</p>
        </div>
      </div>
    </div>
  );
}

export default App;

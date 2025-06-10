import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    const newId = Date.now().toString(); // Simple unique ID
    setTodos([...todos, { id: newId, text: newTodo.trim(), completed: false }]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const remainingTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">TODO List</h1>
      
      <form onSubmit={addTodo} className="flex mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-grow p-3 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors duration-200"
        >
          Add Todo
        </button>
      </form>

      <ul className="bg-white dark:bg-gray-800 rounded-md shadow-md overflow-hidden">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))
        ) : (
          <li className="p-4 text-center text-gray-500 dark:text-gray-400">No todos to display.</li>
        )}
      </ul>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 p-4 bg-white dark:bg-gray-800 rounded-md shadow-md text-gray-600 dark:text-gray-300 text-sm">
        <span className="mb-2 sm:mb-0">{remainingTodosCount} items left</span>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded-md ${filter === 'active' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-md ${filter === 'completed' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            Completed
          </button>
        </div>
        <button
          onClick={() => setTodos([])}
          className="mt-2 sm:mt-0 px-3 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default TodoList;

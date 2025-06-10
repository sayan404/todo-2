import React from 'react';
import { Trash2 } from 'lucide-react';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, toggleTodo, deleteTodo }) => {
  return (
    <li className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleTodo(id)}
          className="form-checkbox h-5 w-5 text-blue-600 rounded-md focus:ring-blue-500 cursor-pointer"
        />
        <span className={`ml-4 text-gray-900 dark:text-gray-100 ${completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
          {text}
        </span>
      </div>
      <button
        onClick={() => deleteTodo(id)}
        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
        aria-label="Delete todo"
      >
        <Trash2 size={20} />
      </button>
    </li>
  );
};

export default TodoItem;

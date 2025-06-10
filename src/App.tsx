import React from 'react';
import TodoList from './components/TodoList';
import './index.css'; // Ensure Tailwind CSS is imported

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black font-sans text-gray-900 dark:text-white transition-colors duration-300">
      <TodoList />
    </div>
  );
};

export default App;

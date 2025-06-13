import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-added');
  const [error, setError] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError('');
  };

  const addTask = () => {
    // Validate task input
    if (inputValue.trim() === '') {
      setError('Task cannot be empty');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date()
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all' filter
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.text.localeCompare(b.text);
    } else if (sortBy === 'completed') {
      return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
    } else {
      // Default: date-added
      return 0; // Already sorted by date added (most recent last)
    }
  });

  const activeTasks = tasks.filter(task => !task.completed).length;

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      
      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task"
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>Add</button>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      <div className="filters">
        <div className="filter-options">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''} 
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        
        <div className="sort-options">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date-added">Date Added</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="completed">Completion Status</option>
          </select>
        </div>
      </div>
      
      <ul className="todo-list">
        {sortedTasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <div className="task-content">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span className="task-text">{task.text}</span>
            </div>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      <div className="todo-footer">
        <span>{activeTasks} tasks left</span>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
};

export default TodoList; 
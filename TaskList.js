import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = ({ user, setIsLoggedIn }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      if (error.response.status === 401) setIsLoggedIn(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask) return;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/tasks', { title: newTask, completed: false }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      alert('Error adding task');
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/tasks/${id}`, { completed: !completed }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.map(task => task.id === id ? { ...task, completed: !completed } : task));
    } catch (error) {
      alert('Error updating task');
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      alert('Error deleting task');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Tasks for {user.email}</h2>
      <button onClick={() => setIsLoggedIn(false)} style={{ float: 'right' }}>Logout</button>
      <form onSubmit={addTask} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id, task.completed)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', marginLeft: '10px' }}>
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
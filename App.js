import React, { useState } from 'react';
import Login from './components/Login'; // We'll create this next
import TaskList from './components/TaskList'; // We'll create this next
import './App.css'; // For styles

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [user, setUser] = useState(null);

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />;
  }

  return <TaskList user={user} setIsLoggedIn={setIsLoggedIn} />;
}

export default App;
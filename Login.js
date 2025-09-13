import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsLoggedIn, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false); // Toggle between login/signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignup ? '/signup' : '/login'; // Your backend routes
      const response = await axios.post(`http://localhost:5001${endpoint}`, { email, password }); // Adjust URL to your backend
      setUser(response.data.user); // Assuming backend sends user data + JWT
      setIsLoggedIn(true);
      localStorage.setItem('token', response.data.token); // Store JWT
    } catch (error) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message; // e.g., "Network Error"
    }
      alert('Error: ' + error.response.data.message); // Simple error handling
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', margin: '10px 0', width: '100%' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', margin: '10px 0', width: '100%' }}
        />
        <button type="submit" style={{ width: '100%' }}>{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <p onClick={() => setIsSignup(!isSignup)} style={{ cursor: 'pointer', textAlign: 'center' }}>
        {isSignup ? 'Already have account? Login' : "Don't have account? Sign Up"}
      </p>
    </div>
  );
};

export default Login;
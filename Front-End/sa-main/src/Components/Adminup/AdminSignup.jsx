import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSignup.css';

const AdminSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7037/api/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.text();

      if (response.ok) {
        alert('Admin registered successfully!');
        navigate('/adminlogin'); // Redirect to the admin login page after successful signup
      } else {
        alert(`Signup failed: ${data}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error with the signup process.');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <h1>Admin Signup</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default AdminSignup;


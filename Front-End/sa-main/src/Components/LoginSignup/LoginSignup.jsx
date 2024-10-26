import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LogingSignup.css';

const LoginSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://localhost:7037/api/login/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.text(); // Expecting a simple text response like "Login successful!" or "Invalid username or password."

    if (response.ok) {
      alert(data); // Show success message
      navigate('/mainhome'); // Redirect to /home on successful login
    } else {
      alert(data); // Show error message
    }
  };

  return (
    <div>
      <div className='all'>
        <form onSubmit={handleSubmit} name='f1'>
          <h1>LogIn</h1>
          <table>
            <tr>
              <td>
                <input
                  type='text'
                  placeholder='UserName'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type='submit'>LogIn</button>
              </td>
            </tr>
          </table>
          <p>You don't have an account? <a href='/sign'>Click Here!</a></p>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;

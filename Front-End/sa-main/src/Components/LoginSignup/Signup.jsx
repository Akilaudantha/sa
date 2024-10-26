import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogingSignup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== rePassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch('https://localhost:7037/api/signup/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      alert("User registered successfully!");
      navigate('/');
    } else {
      const error = await response.json();
      alert(`Error: ${error.title}`);
    }
  };

  return (
    <div>
      <div className='all'>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <table>
            <tr>
              <td>
                <input type='text' placeholder='UserName' value={username} onChange={(e) => setUsername(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <input type='password' placeholder='Re Enter Password' value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <button type='submit'>SignUp</button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
};

export default Signup;

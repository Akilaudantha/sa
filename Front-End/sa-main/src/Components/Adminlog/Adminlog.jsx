import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Adminlog.css';

const Adminlog = () => {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    
      const response = await fetch('http://localhost:5014/api/admin/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: adminUsername, password: adminPassword }),
      });
  
      console.log("Response status:", response.status); // Log response status
  
      const data = await response.text();
  
      if (response.ok) {
          alert(data); // Success message
          navigate('/adminHome'); // Redirect to dashboard on successful login
      } else {
          alert(data); // Error message
      }
  
  
  };

  return (
    <div className="all">
      <form onSubmit={handleAdminLogin} name="adminLoginForm">
        <h1>Admin Login</h1>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Admin Username"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  placeholder="Admin Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit">Log In</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Adminlog;

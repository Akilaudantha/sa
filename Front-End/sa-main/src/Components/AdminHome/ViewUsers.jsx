import React, { useEffect, useState } from 'react';
import './ViewUsers.css';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://localhost:7037/api/Users/viewusers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      console.log('Fetched users:', data); // Check the data returned by API
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="view-users">
      <h1>Users</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.Id}>
                <td>{user.Id}</td>
                <td>{user.Username}</td>
                <td>{user.Email || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;

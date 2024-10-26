import React, { useEffect, useState } from 'react';
import './ViewUsers.css';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:7037/api/Users/viewusers');  
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched users:', data); // Log the fetched data
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
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.Id}>
                <td>{user.Id}</td>
                <td>{user.Username}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Editp.css';

const Editp = () => {
  const [name, setName] = useState('John Doe'); 
  const [email, setEmail] = useState('johndoe@example.com'); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Updated Profile:', { name, email });
    
    navigate('/profile');
  };

  return (
    <div className="edit-profile-container">
      <header className="profile-header">
        <div className="logo">Auction<span>House</span></div>
      </header>

      <main>
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="save-btn">Save Changes</button>
        </form>
      </main>

      <footer>
        <p>&copy; 2024 AuctionHouse. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Editp;

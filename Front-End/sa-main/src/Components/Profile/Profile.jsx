import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate('/login'); 
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="logo">Auction<span>House</span></div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/bb">Auctions</Link>
          <Link to="/my-bids">My Bids</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>

      <main>
        <section className="profile-card">
          <div className="profile-avatar">
            <img src="avatar.jpg" alt="User Avatar" />
          </div>
          <h1>John Doe</h1>
          <table className="profile-table">
            <tbody>
              <tr>
                <td><strong>Email:</strong></td>
                <td>johndoe@example.com</td>
              </tr>
              <tr>
                <td><strong>Account Balance:</strong></td>
                <td>$1000</td>
              </tr>
              <tr>
                <td><strong>Bids Won:</strong></td>
                <td>5</td>
              </tr>
            </tbody>
          </table>
          <div className="profile-actions">
            
            <Link to="/editp" className="edit-link">
            <button className="logout-btn">Logout</button>
            </Link>
          </div>
        </section>
      </main>

      <footer>
      <div className='adm'>
      <Link to="/admin" className="edit-link">
            <button className="admin-btn">Admin</button>
      </Link>
      </div>
        <p>&copy; 2024 AuctionHouse. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;

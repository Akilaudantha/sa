import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState(''); // No default value

  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
    if (location.state && location.state.userName) {
      const newUserName = location.state.userName;
      localStorage.setItem('username', newUserName);
      setUserName(newUserName);
    } else if (storedUserName) {
      setUserName(storedUserName);
    }
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="logo">Auction<span>House</span></div>
        <nav>
          <Link to="/mainhome">Home</Link>
          <Link to="/auction">Auctions</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>

      <main>
        <center>
          <section className="profile-card">
            {userName && <h1>Welcome, {userName}!</h1>} {/* Display username if it exists */}
            <table className="profile-table">
              <tbody>
                <tr>
                  <td><strong>Account Balance:</strong></td>
                </tr>
                <tr>
                  <td><strong>Bids Won:</strong></td>
                </tr>
              </tbody>
            </table>
            <Link to="/" > 
<button className="logout-btn">Logout</button> 
</Link>


          </section>
        </center>
      </main>

      <footer>
  <center>
    <div className="adm">
      <Link to="/admin" className="edit-link">
        <button className="admin-btn">Admin</button>
      </Link>
      <Link to="/payment" className="edit-link">
        <button className="payment-btn">Recharge</button>
      </Link>
    </div>
  </center>
  <p>&copy; 2024 AuctionHouse. All Rights Reserved.</p>
</footer>

    </div>
  );
};

export default Profile;

import React from 'react';
import { Link } from 'react-router-dom';
import './AdminHome.css';

const AdminHome = () => {
  return (
    <div className="admin-home">
      

      <main>
        <h1>Welcome to the Admin Panel</h1>
        <p>Select an option to manage the auction platform:</p>
        <div className="admin-options">
          <Link to="/manage" className="admin-option">
            <button>Manage Auctions</button>
          </Link>
          <Link to="/viewU" className="admin-option">
            <button>View Users</button>
          </Link>
          
          <Link to="/" className="admin-option">
            <button>Exit</button>
          </Link>
        </div>
      </main>

      <footer>
        <p>&copy; 2024 AuctionHouse Admin Panel. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AdminHome;

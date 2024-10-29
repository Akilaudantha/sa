// src/Components/Payment/Payment.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    alert(`Payment details submitted! Card Number: ${cardNumber}`);
  };

  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">Auction<span>House</span></div>
        <nav>
        <Link to="/mainhome">Home</Link>
          <Link to="/auction">Auctions</Link>
          
          
          <Link to="/profile">Profile</Link>
        </nav>
      </header>

      
        <h1>Payment Information</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              required
            />
          </div>
          <button type="submit">Cofirm</button>
        </form>
      

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 AuctionHouse. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="social-media">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </footer>
    </div>
  );
};

export default Payment;

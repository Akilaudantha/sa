import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contactus.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here, e.g., sending data to a server
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <main>
      <nav className="navbar">
        <div className="logo">Auction<span>House</span></div>
        <ul className="navbar-list">
          <Link to="/mainhome">Home</Link>
          <Link to="/auction">Auctions</Link>
          <Link to="/profile">Profile</Link>
        </ul>
      </nav>
      <main><center>
        <h2>Contact Us</h2>
        <p>Have questions or need support? Send us a message!</p>
        <form onSubmit={handleSubmit} className="contactus-form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
          <button type="submit" className="submit-button">Send Message</button>
        </form></center>
      </main>
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
    </main>
  );
};


export default ContactUs;

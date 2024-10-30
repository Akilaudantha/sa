import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import img1 from '../Assets/img1.jpeg'
import img2 from '../Assets/img2.jpg'
import img3 from '../Assets/img3.jpg'
const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Auction<span>House</span></div>
        <ul className="navbar-list">
          <li><Link to="/mainhome">Home</Link></li>
          <li><Link to="/auction">Auctions</Link></li>
          
          
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <header className="hero-section">
        <h1>Welcome to AuctionHouse</h1>
        <p>Discover rare items, bid, and win!</p>
      </header>
      <img src={img1}/>
      <section className="carousel-section">
        
        <div className="carousel">
          <img src={img1} alt="Featured Auction 1" className="carousel-image"  />
          <img src={img2} alt="Featured Auction 2" className="carousel-image" />
          <img src={img3} alt="Featured Auction 3" className="carousel-image" />
        </div>
      </section>

      

      <section className="about-section">
        <h2>About AuctionHouse</h2>
        <p>
          AuctionHouse brings you a seamless auction experience, connecting
          sellers and buyers worldwide. Discover exclusive items, join live
          bids, and win one-of-a-kind treasures.
        </p>
      </section>

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

export default HomePage; 
import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [bids, setBids] = useState({});
  const [auctionItems, setAuctionItems] = useState([]);

  // Function to fetch auction items from the API
  const fetchAuctionItems = async () => {
    try {
      const response = await fetch('http://localhost:3306/api/AuctionItems');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched auction items:', data); // Logging for debugging
      setAuctionItems(data);

      // Initialize bids state based on the fetched data
      const initialBids = {};
      data.forEach(item => {
        initialBids[item.id] = item.highest_bid || item.starting_bid || 0; // Ensure there's a default value
      });
      setBids(initialBids);
    } catch (error) {
      console.error('Failed to fetch auction items:', error);
      alert('Failed to fetch auction items. Please check the console for more details.');
    }
  };

  // Call fetchAuctionItems when the component mounts
  useEffect(() => {
    fetchAuctionItems();
  }, []);

  // Function to place a bid
  const placeBid = async (itemId) => {
    const newBid = parseFloat(document.getElementById(`bid-${itemId}`).value);
    if (isNaN(newBid)) {
      alert('Please enter a valid bid amount.');
      return;
    }
    if (newBid > bids[itemId]) {
      try {
        const response = await fetch(`http://localhost:3306/api/AuctionItems/${itemId}/bid`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bid: newBid }), // Send an object
        });

        if (response.ok) {
          setBids(prevBids => ({
            ...prevBids,
            [itemId]: newBid,
          }));
          document.getElementById(`bid-${itemId}`).value = ''; // Clear input after placing a bid
        } else {
          alert('Failed to place bid. Please try again.');
        }
      } catch (error) {
        console.error('Error placing bid:', error);
        alert('Error placing bid. Please check the console for more details.');
      }
    } else {
      alert('Bid must be higher than the current highest bid.');
    }
  };

  return (
    <div>
      <header>
        <div className="logo">AuctionHouse</div>
        <nav>
          <a href="/mainhome">Home</a>
          <a href="/auctions">Auctions</a>
          <a href="/my-bids">My Bids</a>
          <a href="/profile">Profile</a>
        </nav>
      </header>

      <main>
        <h1>Current Auctions</h1>
        <div className="auction-container">
          {auctionItems.length > 0 ? auctionItems.map(item => (
            <div className="auction-item" key={item.id}>
              <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} />
              <h2>{item.name}</h2>
              <p>Starting Bid: ${item.starting_bid}</p>
              <p>Highest Bid: ${bids[item.id]}</p>
              <input type="number" id={`bid-${item.id}`} placeholder="Your Bid" min={bids[item.id] + 0.01} step="0.01" />
              <button onClick={() => placeBid(item.id)}>Place Bid</button>
            </div>
          )) : (
            <p>No auction items available at the moment.</p>
          )}
        </div>
      </main>

      <footer>
        <p>&copy; 2024 AuctionHouse. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

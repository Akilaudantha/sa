import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [bids, setBids] = useState({});
  const [auctionItems, setAuctionItems] = useState([]);
  const [bidInput, setBidInput] = useState({});

  // Function to fetch auction items from the API
  const fetchAuctionItems = async () => {
    try {
      const response = await fetch('http://localhost:5014/api/AuctionItems');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched auction items:', data); // Debugging: log data to console

      setAuctionItems(data);

      const initialBids = {};
      data.forEach(item => {
        initialBids[item.id] = item.highestBid || item.startingBid || 0;
      });
      setBids(initialBids);
    } catch (error) {
      console.error('Failed to fetch auction items:', error);
      alert('Failed to fetch auction items. Please check the console for more details.');
    }
  };

  useEffect(() => {
    fetchAuctionItems();
  }, []);

  const handleBidChange = (itemId, value) => {
    setBidInput(prev => ({ ...prev, [itemId]: value }));
  };

  const placeBid = async (itemId) => {
    const newBid = parseFloat(bidInput[itemId]);
    if (isNaN(newBid)) {
      alert('Please enter a valid bid amount.');
      return;
    }
    if (newBid > (bids[itemId] || 0)) {
      try {
        const response = await fetch(`http://localhost:5014/api/AuctionItems/${itemId}/bid`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bid: newBid }),
        });

        if (response.ok) {
          const responseData = await response.json();
          alert(responseData.message);
          setBids(prevBids => ({
            ...prevBids,
            [itemId]: newBid,
          }));
          setBidInput(prev => ({ ...prev, [itemId]: '' }));
        } else {
          const errorResponse = await response.json();
          alert(errorResponse.message);
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
          <a href="/auction">Auctions</a>
          <a href="/profile">Profile</a>
        </nav>
      </header>

      <main>
        <h1>Current Auctions</h1>
        <div className="auction-container">
          {auctionItems.length > 0 ? (
            auctionItems.map(item => (
              <div className="auction-item" key={item.id}>
                <img src={`http://localhost:5014${item.imageUrl}`} alt={item.name} />
                <h2>{item.name}</h2>
                <p>Starting Bid: ${item.startingBid !== undefined ? item.startingBid.toFixed(2) : 'N/A'}</p>
                <p>Highest Bid: ${bids[item.id] !== undefined ? bids[item.id].toFixed(2) : 'N/A'}</p>
                <input
                  type="number"
                  id={`bid-${item.id}`}
                  value={bidInput[item.id] || ''}
                  onChange={(e) => handleBidChange(item.id, e.target.value)}
                  placeholder="Your Bid"
                  min={bids[item.id] ? (bids[item.id] + 0.01) : (item.startingBid || 0)}
                  step="0.01"
                />
                <button onClick={() => placeBid(item.id)}>Place Bid</button>
              </div>
            ))
          ) : (
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

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageAuctions.css';

const ManageAuctions = () => {
  const [auctionItems, setAuctionItems] = useState([]);
  const navigate = useNavigate();

  // Fetch auction items from API
  const fetchAuctionItems = async () => {
    try {
      const response = await fetch('http://localhost:7037/api/AuctionItems');
      const data = await response.json();
      setAuctionItems(data);
    } catch (error) {
      console.error('Failed to fetch auction items:', error);
    }
  };

  // Delete auction
  const deleteAuction = async (id) => {
    try {
      const response = await fetch(`http://localhost:7037/api/AuctionItems/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAuctionItems(auctionItems.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete auction:', error);
    }
  };

  // Update auction (redirect to edit page)
  const updateAuction = (id) => {
    navigate(`/admin/manage-auctions/edit/${id}`);
  };

  // Add new auction (redirect to add auction page)
  const addAuction = () => {
    navigate('/addauc');
  };

  useEffect(() => {
    fetchAuctionItems();
  }, []);

  return (
    <div className="manage-auctions">
      <h1>Manage Auctions</h1>
      <button onClick={addAuction} className="add-auction-button">Add New Auction</button>
      <div className="auction-list">
        {auctionItems.map((item) => (
          <div key={item.id} className="auction-item">
            <h2>{item.name}</h2>
            <p>Starting Bid: ${item.starting_bid}</p>
            <p>Highest Bid: ${item.highest_bid || item.starting_bid}</p>
            <button onClick={() => updateAuction(item.id)} className="edit-button">Edit</button>
            <button onClick={() => deleteAuction(item.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAuctions;

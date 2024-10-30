import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageAuctions.css';

const ManageAuctions = () => {
  const [auctionItems, setAuctionItems] = useState([]);
  const navigate = useNavigate();

  // Fetch auction items from API
  const fetchAuctionItems = async () => {
    try {
      const response = await fetch('http://localhost:5014/api/AuctionItems');
      const data = await response.json();
      setAuctionItems(data);
    } catch (error) {
      console.error('Failed to fetch auction items:', error);
    }
  };

  // Delete auction
  const deleteAuction = async (id) => {
    if (window.confirm("Are you sure you want to delete this auction item?")) {
      try {
        const response = await fetch(`http://localhost:5014/api/AuctionDelete/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Filter out the deleted item from state
          setAuctionItems(auctionItems.filter(item => item.id !== id));
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Failed to delete auction.");
        }
      } catch (error) {
        console.error('Failed to delete auction:', error);
      }
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
            
            <button onClick={() => updateAuction(item.id)} className="edit-button">Edit</button>
            <button onClick={() => deleteAuction(item.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAuctions;

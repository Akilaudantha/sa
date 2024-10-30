import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddAuction.css';

const AddAuction = () => {
  const [name, setName] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [highestBid, setHighestBid] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !startingBid || !image) {
      alert('Please fill all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('startingBid', startingBid);
    formData.append('highestBid', highestBid || null);
    formData.append('image', image);

    console.log({ name, startingBid, highestBid, image });

    try {
      const response = await fetch('http://localhost:5014/api/NewAuction/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Auction added successfully!');
        navigate('/admin/manage-auctions');
      } else {
        const errorMessage = await response.text();
        alert(`Failed to add auction: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error adding auction:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="add-auction">
      <h1>Add New Auction</h1>
      <form onSubmit={handleSubmit} className="add-auction-form">
        <label>
          Auction Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Starting Bid:
          <input
            type="number"
            value={startingBid}
            onChange={(e) => setStartingBid(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </label>
        <label>
          Highest Bid (Optional):
          <input
            type="number"
            value={highestBid}
            onChange={(e) => setHighestBid(e.target.value)}
            min="0"
            step="0.01"
          />
        </label>
        <label>
          Upload Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </label>
        <button type="submit" className="submit-button">Add Auction</button>
      </form>
    </div>
  );
};

export default AddAuction;

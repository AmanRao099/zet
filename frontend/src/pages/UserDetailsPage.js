import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDetailsPage.css';

const UserDetailsPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleProceedToPayment = () => {
    if (!userDetails.name || !userDetails.email || !userDetails.address || !userDetails.phone) {
      alert('Please fill in all fields');
      return;
    }
    navigate('/payment', { state: { userDetails } });
  };

  return (
    <div className="user-details-page">
      <h2>Enter Your Details</h2>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="button" onClick={handleProceedToPayment} className="proceed-btn">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default UserDetailsPage;

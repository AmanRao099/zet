import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    setError(null);  // Clear any previous errors

    try {
      // Request to the backend to create an order
      const orderResponse = await fetch('/api/create-order', { method: 'POST' });
      
      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }
      
      const orderData = await orderResponse.json();

      const options = {
        key: 'razorpay_key_id',  // Your Razorpay Key ID
        amount: orderData.amount,  // Amount fetched from the backend
        currency: 'INR',  // Currency
        order_id: orderData.id,  // Order ID from the backend
        description: 'Payment for services',  // Optional description
        handler: function (response) {
          // Handle success response from Razorpay
          console.log(response);
          alert('Payment Successful!');
          navigate('/home');  // Redirect to home after successful payment
        },
        prefill: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',  // Razorpay theme color
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();  // Open the Razorpay payment gateway modal
    } catch (error) {
      console.error('Payment failed:', error);
      setError('Payment failed. Please try again.');
      setLoading(false);  // Reset loading state on error
    }
  };

  return (
    <div className="payment-container">
      <h2>Make a Payment</h2>

      {/* Display loading state and disable button during processing */}
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay with Razorpay'}
      </button>

      {/* Display error message if any */}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Payment;

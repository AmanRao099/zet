import React from 'react';
import { useLocation } from 'react-router-dom';


const SuccessPage = () => {
  const location = useLocation();
  const { paymentId } = location.state || {}; // Get payment ID from state passed by PaymentPage

  return (
    <div className="success-page">
      <h2>Payment Successful!</h2>
      <p>Thank you for your payment. Your transaction was completed successfully.</p>
      {paymentId && (
        <div>
          <p>Your payment ID is: <strong>{paymentId}</strong></p>
        </div>
      )}
      <button onClick={() => window.location.href = '/'}>Go to Home</button>
    </div>
  );
};

export default SuccessPage;

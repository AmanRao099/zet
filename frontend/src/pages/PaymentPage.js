import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./PaymentPage.css";

const PaymentPage = () => {
  const [giftCardNumber, setGiftCardNumber] = useState("");
  const [giftCardPin, setGiftCardPin] = useState("");
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const fixedGiftCardNumber = "GC277317610"; // Updated gift card number
  const fixedGiftCardPin = "1234"; // PIN remains the same

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the entered gift card number and PIN are correct
    if (giftCardNumber === fixedGiftCardNumber && giftCardPin === fixedGiftCardPin) {
      setNotification({ message: "Payment successful!", type: "success" });

      // Redirect to the SuccessPage upon successful payment
      setTimeout(() => {
        navigate("/thank-you"); // Navigate to success page
      }, 1000); // 1 second delay before redirect
    } else {
      setNotification({ message: "Invalid Gift Card Number or PIN. Please try again.", type: "error" });
    }

    // Clear the input fields after submission
    setGiftCardNumber("");
    setGiftCardPin("");
  };

  return (
    <div className="payment-page">
      <h2>Complete Your Payment</h2>
      <div className="payment-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="giftCardNumber">Gift Card Number:</label>
          <input
            type="text"
            id="giftCardNumber"
            placeholder="Enter Gift Card Number"
            value={giftCardNumber}
            onChange={(e) => setGiftCardNumber(e.target.value)}
            required
          />

          <label htmlFor="giftCardPin">Gift Card PIN:</label>
          <input
            type="password"
            id="giftCardPin"
            placeholder="Enter Gift Card PIN"
            value={giftCardPin}
            onChange={(e) => setGiftCardPin(e.target.value)}
            required
          />

          <button type="submit" className="payment-btn">Pay Now</button>
        </form>
      </div>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default PaymentPage;

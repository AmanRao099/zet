import React from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import "./ThankYouPage.css";

const ThankYouPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // After a short delay, redirect to homepage
  setTimeout(() => {
    navigate("/initial"); // Redirect using navigate after 5 seconds
  }, 5000);

  return (
    <div className="thank-you-page">
      <div className="thank-you-message">
        <h2>Thank You!</h2>
        <p>Your payment was successful. We appreciate your business.</p>
      </div>
      <div className="success-icon">
        <span role="img" aria-label="success" className="check-mark">✔️</span>
      </div>
      <p className="redirect-text">Redirecting you back to the homepage...</p>
    </div>
  );
};

export default ThankYouPage;

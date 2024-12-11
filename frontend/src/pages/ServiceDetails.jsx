// In ServicePage.js or whatever component where the button is located
import React from 'react';
import { Link } from 'react-router-dom'; // Add this import at the top of your file

const ServicePage = () => {
  return (
    <div>
      <h1>Our Services</h1>
      {/* Button that navigates to the ServiceDetails page */}
      <Link to="/">
        <button className="service-details-button">View Service Details</button>
      </Link>
    </div>
  );
}

export default ServicePage;
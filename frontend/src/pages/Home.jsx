import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Importing the CartContext to access addToCart
import Bubble from '../components/CommunicationBubble/CommunicationBubble'; // Import the Bubble component
import './Home.css';

// Define the services array
const services = [
  { id: 1, name: 'AC Technician', price: 1000, image: '/images/Ac.jpg', description: 'Professional AC installation and repair services.' },
  { id: 2, name: 'Electrician', price: 500, image: '/images/electrician.jpg', description: 'Expert electrical repairs and installations services.' },
  { id: 3, name: 'Plumber', price: 800, image: '/images/plumber.jpg', description: 'Reliable plumbing services for homes and offices.' },
  { id: 4, name: 'Carpenter', price: 1200, image: '/images/carpenter.jpg', description: 'Skilled carpentry work for all your needs.' },
  { id: 5, name: 'Painter', price: 1500, image: '/images/painter.jpg', description: 'Quality painting services for homes and buildings.' },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState(services);
  const [notification, setNotification] = useState(null); // State for notification messages
  const { addToCart } = useCart(); // Access addToCart function from CartContext

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(term)
    );
    setFilteredServices(filtered);
  };

  const handleAddToCart = (service) => {
    addToCart(service); // Add the selected service to the cart
    setNotification(`${service.name} has been added to your cart!`); // Set a custom notification message
    setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
  };

  // Helper function to format price with commas
  const formatPrice = (price) => {
    return `₹${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    <div className="home-container">
      <h2>Welcome to the Service Platform!</h2>
      <p>Your one-stop solution for all service needs</p>

      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search services..."
        className="search-bar"
      />

      {/* Service Cards */}
      <div className="service-list">
        {filteredServices.map((service) => (
          <div key={service.id} className="service-card">
            <img src={service.image} alt={service.name} className="service-image" />
            <h3>{service.name}</h3>
            <p>Price: {formatPrice(service.price)}</p>
            <p>{service.description}</p>
            <button onClick={() => handleAddToCart(service)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Notification */}
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}

      {/* Bubble Component */}
      <Bubble />
    </div>
  );
};

export default Home;

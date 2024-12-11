import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase'; // Firebase authentication import
import { useCart } from '../context/CartContext'; // Import the CartContext
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null); // Store the authenticated user
  const { cartItems } = useCart(); // Access cart items from the CartContext
  const cartItemCount = cartItems.length; // Get the count of items in the cart
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State to manage profile menu visibility

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser); // Firebase listener for auth state change
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleLogout = () => {
    auth.signOut(); // Sign out the user
    setUser(null); // Reset the user state
    setIsProfileMenuOpen(false); // Close the profile menu after logout
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(prevState => !prevState); // Toggle the profile menu visibility
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/initial" className="navbar-brand">
        TaskMaster.
        </Link>
      </div>
      <div className="navbar-right">
        <ul className="navbar-links">
          <li>
            <Link to="/initial">Home</Link>
          </li>
          <li>
            <Link to="/topservices">Trending</Link>
          </li>
          <li>
            <Link to="/communication">Communication</Link>
          </li>

          {/* Cart Link */}
          <li>
            <Link to="/cart" className="cart-link">
              🛒
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span> // Show number of items in the cart
              )}
            </Link>
          </li>

          {/* Conditional rendering of Login/Logout */}
          <li>
            {user ? (
              <div className="user-profile" onClick={toggleProfileMenu}>
                <img
                  src={user.photoURL || '/default-avatar.png'} // Default avatar if no photo is set
                  alt="User Profile"
                  className="user-avatar"
                />
                {isProfileMenuOpen && (
                  <div className="profile-menu">
                    <button className="logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

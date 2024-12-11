// src/components/Cart.js
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <p>{item.name}</p>
              <p>₹{item.price}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <>
          <div className="cart-actions">
            <button onClick={clearCart}>Clear Cart</button>
            <Link to="/payment">
              <button>Proceed to Payment</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

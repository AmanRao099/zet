import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Cart context to manage cart state
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart(); // Destructuring cart state and functions
  const [couponCode, setCouponCode] = useState(''); // State to track coupon code input
  const [discount, setDiscount] = useState(0); // State to track discount percentage

  // Calculate total price (example: assuming each item has a price)
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Function to handle coupon code application
  const applyCoupon = () => {
    if (couponCode === 'FIRST10') {
      setDiscount(0.10); // Apply 10% discount if the code is valid
    } else {
      setDiscount(0); // No discount for invalid codes
    }
  };

  // Calculate final price after discount
  const finalPrice = totalPrice - totalPrice * discount;

  return (
    <div className="cart-page">
      <div className="cart-page-content">
        {/* Left Column - Cart Items */}
        <div className="cart-items">
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <p>Your cart is empty. <Link to="/home">Go back to shopping</Link></p>
          ) : (
            <div>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td className="product-name">
                        <img src={item.image} alt={item.name} className="product-image" />
                        {item.name}
                      </td>
                      <td>€{item.price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>€{(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button onClick={() => removeFromCart(item.id)} className="remove-item-btn">X</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="coupon-container">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="coupon-input"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)} // Update coupon code state
                />
                <button onClick={applyCoupon} className="apply-coupon-btn">Apply coupon</button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Cart Totals */}
        <div className="cart-totals">
          <h3>Cart Totals</h3>
          <div className="cart-total-info">
            <div className="total-row">
              <span>Items</span>
              <div className="itemized-list">
                {cartItems.map((item, index) => (
                  <div key={index} className="itemized-content">
                    <span>{item.name}</span> - €{(item.price * item.quantity).toFixed(2)}
                  </div>
                ))}
              </div>
            </div>
            <div className="total-row">
              <span>Coupon</span>
              <span>{couponCode === 'FIRST10' ? `FIRST10 Discount` : 'No Coupon Applied'}</span>
            </div>
            <div className="total-row">
              <span>Discount</span>
              <span>- €{(totalPrice * discount).toFixed(2)}</span> {/* Show the discount amount */}
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>€10.00</span> {/* Example static shipping cost */}
            </div>
            <div className="total-row">
              <span>Total</span>
              <span>€{(finalPrice + 10).toFixed(2)}</span> {/* Adding shipping to the final price */}
            </div>
          </div>
          <div className="checkout-btn-container">
            <Link to="/booking" className="checkout-btn">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import './index.css';
import App from './App';

import { CartProvider } from './context/CartContext'; // Import CartProvider

// Use createRoot instead of render for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider> {/* Wrap the App with CartProvider */}
    <App />
  </CartProvider>
);

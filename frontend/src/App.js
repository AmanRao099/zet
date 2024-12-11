import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import InitialPage from './pages/InitialPage';
import Login from './pages/Login';
import CommunicationPage from './pages/CommunicationPage';
import CartPage from './pages/CartPage'; // Import CartPage
import UserDetailsPage from '../src/pages/UserDetailsPage'; // Import UserDetailsPage
import PaymentPage from './pages/PaymentPage'; // If it's in the same level as src/
import Top from './pages/TopServices';
import BookingForm from './components/BookingForm';
import SchedulingDashboard from "./components/SchedulingDashBoard";
import Service from "./pages/ServiceDetails";
import Bubble from "./components/CommunicationBubble/CommunicationBubble";
import ThankYouPage from "./components/ThankYouPage";

import './App.css';
import { auth } from './firebase/firebase'; // Firebase authentication import

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
        <Route path="/" element={<UserDetailsPage />} />  {/* Home page */}
        <Route path="/booking" element={<BookingForm />} /> 
        <Route path="/topservices" element={<Top />} />
          <Route path="/initial" element={<InitialPage />} />
          <Route path="/bubble" element={<Bubble />} />
          <Route path="/home" element={user ? <Home /> : <Login />} />
          <Route path="/communication" element={<CommunicationPage />} />
          <Route path="/scheduling" element={<SchedulingDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/service" element={<Service />} />
          <Route path="/cart" element={<CartPage />} /> {/* Cart Page Route */}
          <Route path="/user-details" element={<UserDetailsPage />} /> {/* User Details Route */}
        </Routes>
        <Routes>
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        {/* other routes */}
      </Routes>
        
      </div>
      <Footer />
    </Router>
  );
};

export default App;

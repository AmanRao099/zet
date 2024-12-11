import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Bubble from '../components/CommunicationBubble/CommunicationBubble';
import './InitialPage.css';

const InitialPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically load the Spline Viewer script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js';
    script.type = 'module';
    script.async = true;
    document.body.appendChild(script);

    // Set up the event listener for button clicks (change this as per your model)
    script.onload = () => {
      const splineViewer = document.querySelector('spline-viewer');
      // Assuming you have a custom event like 'buttonClicked' in your Spline model
      splineViewer.addEventListener('buttonClicked', () => {
        navigate('/home');
      });
    };

    return () => {
      // Cleanup script when the component is unmounted
      document.body.removeChild(script);
    };
  }, [navigate]);

  const handleClick = () => {
    // Navigate to the Home page when button is clicked
    navigate('/home');
  };

  return (
    <div className="initial-page">
      {/* Spline model viewer */}
      <spline-viewer 
        loading-anim-type="spinner-small-dark" 
        url="https://prod.spline.design/NYYocbmIu-mXdJFm/scene.splinecode" 
        style={{ width: '100%', height: '100vh' }}
      ></spline-viewer>

      {/* Overlay content */}
      <div className="overlay">
        <h1>Welcome to Our Service Platform</h1>
        <p>Click to explore our services</p>
        
        {/* Button to transition to home page */}
        <button className="explore-button" onClick={handleClick}>
          Explore Services
        </button>
      </div>
      {/* Bubble Component - Chatbot */}
      <Bubble />
    </div>
  );
};

export default InitialPage;

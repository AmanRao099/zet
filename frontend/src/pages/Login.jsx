import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase/firebase';
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up
  const [user, setUser] = useState(null); // Store signed-in user info
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state
      if (currentUser) {
        navigate('/home'); // Redirect to Home page when logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Successfully logged in with Google!');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const handleEmailPasswordSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account successfully created!');
    } catch (error) {
      console.error('Sign-Up Error:', error);
      alert(error.message); // Display the error message
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Successfully logged out!');
      setUser(null);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <div className="login-container">
      {user ? (
        <div className="user-info">
          <img
            src={user.photoURL || 'default-avatar-url'} // Use default if no photoURL
            alt="User Profile"
            className="user-pfp"
            title={user.displayName}
          />
          <p>Welcome, {user.displayName}</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <>
          <div className="login-left">
            <h1>{isSignUp ? 'Create an Account' : 'Login to Your Account'}</h1>
            <p>{isSignUp ? 'Sign up using social networks' : 'Login using social networks'}</p>
            <div className="social-buttons">
              <button className="social-btn google" onClick={handleGoogleSignIn}>
                G
              </button>
            </div>
            <p className="divider">OR</p>
            <form
              className="login-form"
              onSubmit={isSignUp ? handleEmailPasswordSignUp : undefined} // Attach appropriate handler
            >
              <input type="email" name="email" placeholder="Email" className="form-input" required />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-input"
                required
              />
              <button type="submit" className="form-submit">
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
          </div>
          <div className="login-right">
            <h2>{isSignUp ? 'Already Have an Account?' : 'New Here?'}</h2>
            <p>
              {isSignUp
                ? 'Sign in to access your account!'
                : 'Sign up and discover a great amount of new opportunities!'}
            </p>
            <button className="sign-up-btn" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;

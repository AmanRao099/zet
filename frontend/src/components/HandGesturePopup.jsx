import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import './HandGesturePopup.css';

const GestureNavigation = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHandposeModel = async () => {
      const video = videoRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      video.play();

      const model = await handpose.load();
      console.log('Handpose model loaded');
      detectGestures(model);
    };

    loadHandposeModel();
  }, []);

  const detectGestures = async (model) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    setInterval(async () => {
      const predictions = await model.estimateHands(video);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (predictions.length > 0) {
        const landmarks = predictions[0].landmarks;

        // Draw hand landmarks on canvas
        drawHand(landmarks, ctx);

        // Detect gestures
        if (isSwipeLeft(landmarks)) {
          console.log('Swipe left detected! Navigating back.');
          navigate(-1); // Navigate to the previous page
        } else if (isSwipeRight(landmarks)) {
          console.log('Swipe right detected! Navigating forward.');
          navigate(1); // Navigate to the next page
        } else if (isThumbsUp(landmarks)) {
          console.log('Thumbs up detected! Confirming action.');
          navigate('/confirm'); // Navigate to a confirmation page
        }
      }
    }, 200);
  };

  const drawHand = (landmarks, ctx) => {
    for (let i = 0; i < landmarks.length; i++) {
      const [x, y] = landmarks[i];
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
    }
  };

  const isSwipeLeft = (landmarks) => {
    // Detect if the hand is moving left
    const wrist = landmarks[0];
    const indexFingerTip = landmarks[8];
    return indexFingerTip[0] - wrist[0] < -50; // Customize threshold
  };

  const isSwipeRight = (landmarks) => {
    // Detect if the hand is moving right
    const wrist = landmarks[0];
    const indexFingerTip = landmarks[8];
    return indexFingerTip[0] - wrist[0] > 50; // Customize threshold
  };

  const isThumbsUp = (landmarks) => {
    // Detect if the thumb is pointing up
    const thumbTip = landmarks[4];
    const indexFingerTip = landmarks[8];
    return thumbTip[1] < indexFingerTip[1]; // Thumb is above index finger
  };

  return (
    <div className="gesture-navigation">
      <h2>Gesture Navigation</h2>
      <p>Use hand gestures to navigate the website:</p>
      <ul>
        <li>Swipe Left: Go Back</li>
        <li>Swipe Right: Go Forward</li>
        <li>Thumbs Up: Confirm</li>
      </ul>

      <video ref={videoRef} className="video-feed" autoPlay muted />
      <canvas ref={canvasRef} className="gesture-canvas" />
    </div>
  );
};

export default GestureNavigation;

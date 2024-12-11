import React, { useState, useEffect, useRef } from 'react';
import { database } from '../firebase/firebase';
import { ref, push, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import './CommunicationPage.css';

// Recognize sign language function outside the component
export const recognizeSignLanguage = (landmarks) => {
  const thumb = landmarks[4]; // Thumb tip
  const index = landmarks[8]; // Index tip
  const middle = landmarks[12]; // Middle tip
  const ring = landmarks[16]; // Ring tip
  const pinky = landmarks[20]; // Pinky tip
  const wrist = landmarks[0]; // Wrist (base point for orientation)

   // A
   if (
    thumb[1] > index[1] && // Thumb curled down
    middle[1] > index[1] && // All fingers curled
    ring[1] > index[1] &&
    pinky[1] > index[1]
  ) {
    return 'A';
  }

  // B
  if (
    thumb[1] > index[1] && // Thumb across palm
    index[1] < middle[1] && // All fingers extended upward
    middle[1] < ring[1] &&
    ring[1] < pinky[1]
  ) {
    return 'B';
  }

  // C
  if (
    thumb[1] > index[1] && // Fingers form a "C" shape
    middle[0] > thumb[0] &&
    pinky[0] < wrist[0]
  ) {
    return 'C';
  }

  // D
  if (
    index[1] < middle[1] && // Index finger extended upward
    thumb[0] < index[0] &&
    middle[1] > thumb[1] && // Other fingers curled
    ring[1] > thumb[1] &&
    pinky[1] > thumb[1]
  ) {
    return 'D';
  }

  // E
  if (
    thumb[1] > index[1] && // All fingers curled toward palm
    middle[1] > index[1] &&
    ring[1] > middle[1] &&
    pinky[1] > ring[1]
  ) {
    return 'E';
  }

  // F
  if (
    Math.abs(thumb[0] - index[0]) < 20 && // Thumb and index form a circle
    middle[1] > index[1] &&
    ring[1] > middle[1] &&
    pinky[1] > ring[1]
  ) {
    return 'F';
  }

  // G
  if (
    thumb[1] > wrist[1] && // Thumb and index point horizontally
    index[1] > wrist[1] &&
    middle[1] > index[1] && // Other fingers curled
    ring[1] > middle[1] &&
    pinky[1] > ring[1]
  ) {
    return 'G';
  }

  // H
  if (
    thumb[1] > wrist[1] && // Thumb points horizontally
    index[1] > wrist[1] && // Index finger points horizontally
    middle[1] > wrist[1] && // Other fingers curled
    ring[1] > middle[1] &&
    pinky[1] > ring[1]
  ) {
    return 'H';
  }

  // I
  if (
    thumb[1] > index[1] && // Thumb curled down
    middle[1] > index[1] && // Other fingers curled
    pinky[1] < thumb[1] // Pinky extended
  ) {
    return 'I';
  }

  // J
  if (
    thumb[1] > index[1] && // Thumb curled down
    middle[1] > index[1] && // Other fingers curled
    pinky[1] < thumb[1] // Pinky extended in a curve
  ) {
    return 'J';
  }

  // K
  if (
    index[1] < thumb[1] && // Index extended upward
    middle[1] < thumb[1] && // Middle extended upward, angled
    ring[1] > thumb[1] &&
    pinky[1] > thumb[1]
  ) {
    return 'K';
  }

  // L
  if (
    index[1] < thumb[1] && // Index extended upward
    thumb[0] < index[0] && // Thumb extended horizontally
    middle[1] > index[1] && // Other fingers curled
    ring[1] > middle[1] &&
    pinky[1] > ring[1]
  ) {
    return 'L';
  }

  // M
  if (
    thumb[1] > index[1] && // Thumb crosses under fingers
    index[1] > middle[1] &&
    middle[1] > ring[1] &&
    ring[1] > pinky[1]
  ) {
    return 'M';
  }

  // N
  if (
    thumb[1] > index[1] && // Thumb crosses under fingers
    index[1] > middle[1] &&
    middle[1] > ring[1] &&
    ring[1] < pinky[1]
  ) {
    return 'N';
  }

  // O
  if (
    thumb[1] < index[1] && // Fingers form an "O" shape
    middle[1] < ring[1] &&
    pinky[1] < ring[1]
  ) {
    return 'O';
  }

  // P
  if (
    index[1] < thumb[1] && // Index points downward
    middle[1] < thumb[1] && // Middle points downward, angled
    ring[1] > thumb[1] &&
    pinky[1] > ring[1]
  ) {
    return 'P';
  }

  // Q
  if (
    thumb[1] > index[1] && // Thumb points downward
    index[1] < middle[1] &&
    middle[1] > ring[1] && // Other fingers curled
    pinky[1] > ring[1]
  ) {
    return 'Q';
  }

  // R
  if (
    index[1] < middle[1] && // Index and middle crossed
    thumb[1] > index[1] &&
    ring[1] > middle[1] && // Other fingers curled
    pinky[1] > ring[1]
  ) {
    return 'R';
  }

  // S
  if (
    thumb[1] > index[1] && // Thumb curled across fist
    index[1] > middle[1] && // All fingers curled
    middle[1] > ring[1] &&
    ring[1] > pinky[1]
  ) {
    return 'S';
  }

  // T
  if (
    thumb[1] < index[1] && // Thumb tucked under index
    index[1] > middle[1] && // Other fingers curled
    middle[1] > ring[1] &&
    ring[1] > pinky[1]
  ) {
    return 'T';
  }

  // U
  if (
    index[1] < middle[1] && // Index and middle extended upward
    thumb[1] > index[1] &&
    ring[1] > middle[1] && // Other fingers curled
    pinky[1] > ring[1]
  ) {
    return 'U';
  }

  // V
  if (
    index[1] < middle[1] && // Index and middle form a "V"
    thumb[1] > index[1] &&
    ring[1] > middle[1] && // Other fingers curled
    pinky[1] > ring[1]
  ) {
    return 'V';
  }

  // W
  if (
    index[1] < middle[1] && // Index, middle, and ring extended upward
    middle[1] < ring[1] &&
    thumb[1] > index[1] && // Pinky curled
    pinky[1] > ring[1]
  ) {
    return 'W';
  }

  // X
  if (
    index[1] < thumb[1] && // Index curled downward
    middle[1] > index[1] &&
    ring[1] > middle[1] && // Other fingers curled
    pinky[1] > ring[1]
  ) {
    return 'X';
  }

  // Y
  if (
    thumb[1] < index[1] && // Thumb and pinky extended
    pinky[1] < ring[1] &&
    index[1] > middle[1] && // Other fingers curled
    middle[1] > ring[1]
  ) {
    return 'Y';
  }

  // Z
  if (
    index[1] < middle[1] && // Index draws a "Z"
    thumb[1] > index[1] &&
    ring[1] > middle[1] &&
    pinky[1] > ring[1]
  ) {
    return 'Z';
  }


  return null; // If no recognizable sign is detected
};

const CommunicationPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [lastGestureTime, setLastGestureTime] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate('/login');
      }
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const messagesRef = ref(database, 'messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = data ? Object.values(data) : [];
      setMessages(loadedMessages);
    });
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messagesRef = ref(database, 'messages');
    push(messagesRef, {
      content: newMessage,
      timestamp: Date.now(),
      user: user ? user.displayName : 'Anonymous',
    });

    setNewMessage('');
  };

useEffect(() => {
    const intervalId = setInterval(() => {
      if (recognizeSignLanguage) {
      }
    }, 10000); // 5000ms = 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [recognizeSignLanguage]);
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    const loadHandpose = async () => {
      const model = await handpose.load();
      console.log('Handpose model loaded');
      detectHandGesture(model);
    };

    startCamera();
    loadHandpose();
  }, []);

  const detectHandGesture = (model) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const detect = async () => {
      const predictions = await model.estimateHands(video);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (predictions.length > 0) {
        const landmarks = predictions[0].landmarks;
        drawHand(landmarks, ctx);

        // Call function to map gesture to sign language letter
        const detectedLetter = recognizeSignLanguage(landmarks);
        if (detectedLetter) {
          const currentTime = Date.now();
          if (currentTime - lastGestureTime > 2000) {
            setNewMessage((prevMessage) => prevMessage + detectedLetter);
            setLastGestureTime(currentTime);
          }
        }
      }

      requestAnimationFrame(detect);
    };

    detect();
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

  return (
    <div className="communication-page">
      <h1>Chat with Service Providers</h1>

      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <strong>{message.user}</strong>: {message.content}
            </div>
          ))}
        </div>
        <form className="message-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>

      <div className="camera-container">
        <video ref={videoRef} className="video-feed" autoPlay muted />
        <canvas ref={canvasRef} className="gesture-canvas" />
      </div>
    </div>
  );
};

export default CommunicationPage;

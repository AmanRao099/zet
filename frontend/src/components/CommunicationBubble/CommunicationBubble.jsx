import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommunicationBubble.css';

const CommunicationBubble = () => {
  const [isChatOpen, setIsChatOpen] = useState(false); // To manage chatbox visibility
  const [messages, setMessages] = useState([]); // Store chat messages
  const [inputMessage, setInputMessage] = useState(''); // Current input message
  const navigate = useNavigate();

  // Open/close the chatbox
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Handle user message submission
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage(''); // Clear input field

      // Simulate chatbot response after a delay
      setTimeout(() => {
        let botResponse = 'I am your assistant. How can I help you today?';

        // Check if the message asks about booking
        if (/booking/i.test(inputMessage)) {
          botResponse = 'To book a service, simply visit our services page, choose the service you need, and follow the steps to confirm your booking.';
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, sender: 'bot' },
        ]);
      }, 1000); // Simulate delay for chatbot reply
    }
  };

  return (
    <div>
      {/* Communication Bubble */}
      <div
        className="communication-bubble"
        title="Chat and Communication"
        onClick={toggleChat}
      >
        <div className="communication-bubble-icon">💬</div>
      </div>

      {/* Chatbox Modal */}
      {isChatOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h3>Chat with Us</h3>
            <button onClick={toggleChat} className="close-btn">X</button>
          </div>
          <div className="chatbox-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
              >
                <p>{message.text}</p>
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationBubble;

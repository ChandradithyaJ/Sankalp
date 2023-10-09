import React, { useState } from "react";
import "./ChatBoxStyle.css";
//To Integrate for Release 2
const ChatBox = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleChat = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`chat-container ${isVisible ? `visible` : ``}`}>
      <div className="chat-header">
        <div className="chat-title">chatoori</div>
        <button className="close-button" onClick={toggleChat}>
          close
        </button>
      </div>
      <div className="chat-messages">
        <div className="message received">
          <div className="avatar">AI</div>
          <div className="message-text">Hello! How can I assist you today?</div>
        </div>
        {/* Add more messages here */}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type your message..." />
        <button className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatBox;

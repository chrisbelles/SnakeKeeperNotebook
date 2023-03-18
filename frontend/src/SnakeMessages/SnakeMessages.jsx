import React, { useState, useEffect } from "react";

const SnakeMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/snakes/messages/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessages(data.messages);
      });
  }, []);

  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
};

export default SnakeMessages;



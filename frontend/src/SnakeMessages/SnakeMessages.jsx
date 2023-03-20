import React, { useState, useEffect } from "react";

const SnakeMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/snakes/messages/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const contentType = response.headers.get("content-type");
        if (contentType.includes("application/json")) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((data) => {
        if (typeof data === "string") {
          setMessages([data]);
        } else {
          setMessages(data.messages);
        }
      })
      .catch((error) => console.error("Error fetching messages", error));
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

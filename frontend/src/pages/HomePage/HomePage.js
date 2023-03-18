import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const HomePage = () => {
  const [user] = useAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/snakes/messages/")
      .then((response) => response.json())
      .then((data) => setMessages(data.messages));
  }, []);

  return (
    <div className="container">
      <h1>Notebook for {user.username}!</h1>
      <Link to="/user-snakes">View Your Snakes</Link>
      <Link to="/add-snake">Add a Snake</Link>
    </div>
  );
};

export default HomePage;


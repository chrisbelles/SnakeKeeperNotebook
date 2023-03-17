import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const HomePage = () => {
  const [user] = useAuth();

  return (
    <div className="container">
      <h1>Notebook for {user.username}!</h1>
      <Link to="/user-snakes">View Your Snakes</Link>
    </div>
  );
};

export default HomePage;


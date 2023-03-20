import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import FeedingTable from "../../components/FeedingTable/FeedingTable";
import CleaningTable from "../../components/CleaningTable/CleaningTable";

const styles = {
  addsnakelink: {
    marginLeft: "1.5rem",
  },
};

const HomePage = () => {
  const [user] = useAuth();

  return (
    <div className="container">
      <h1>Notebook for {user.username}!</h1>
      <div>
        <Link to="/user-snakes">View Your Snakes</Link>
        <Link to="/add-snake" style={styles.addsnakelink}>
          Add a Snake
        </Link>
      </div>

      <h2>Feedings</h2>
      <FeedingTable />

      <h2>Cleanings</h2>
      <CleaningTable />
    </div>
  );
};

export default HomePage;

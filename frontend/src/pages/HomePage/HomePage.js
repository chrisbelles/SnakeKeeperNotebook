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
  const [feedings, setFeedings] = useState([]);
  const [cleanings, setCleanings] = useState([]);

  useEffect(() => {
    const fetchFeedings = async () => {
      const response = await fetch("/api/snakes/feedings/");
      const data = await response.json();
      setFeedings(data);
    };
    const fetchCleanings = async () => {
      const response = await fetch("/api/snakes/cleanings/");
      const data = await response.json();
      setCleanings(data);
    };
    fetchFeedings();
    fetchCleanings();
  }, []);

  return (
    <div className="container">
      <h1>Notebook for {user.username}!</h1>
      <div>
          <Link to="/user-snakes">View Your Snakes</Link>
          <Link to="/add-snake" style={styles.addsnakelink}> Add a Snake </Link> </div>
        <h2>Feedings</h2>
        <FeedingTable feedings={feedings} />
        <h2>Cleanings</h2>
        <CleaningTable cleanings={cleanings} />
      </div>
  );
};

export default HomePage;

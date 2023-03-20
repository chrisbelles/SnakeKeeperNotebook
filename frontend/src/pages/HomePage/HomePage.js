import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const HomePage = () => {
  const [user] = useAuth();
  const [feedings, setFeedings] = useState([]);
  const [cleanings, setCleanings] = useState([]);

  useEffect(() => {
    fetch('/api/feedings/')
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));

    fetch("/api/cleanings/")
      .then((response) => response.text())
      .then((response) => response.json())
      .then((data) => setCleanings(data));
  }, []);

  return (
    <div className="container">
      <h1>Notebook for {user.username}!</h1>
      <div>
      <Link to="/user-snakes">View Your Snakes</Link>
      <Link to="/add-snake">Add a Snake</Link>
      </div>

      <h2>Feedings</h2>
      <table>
        <thead>
          <tr>
            <th>Snake Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {feedings.map((feeding, index) => (
            <tr key={index}>
              <td>{feeding.snake_name}</td>
              <td>{feeding.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Cleanings</h2>
      <table>
        <thead>
          <tr>
            <th>Snake Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {cleanings.map((cleaning, index) => (
            <tr key={index}>
              <td>{cleaning.snake_name}</td>
              <td>{cleaning.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
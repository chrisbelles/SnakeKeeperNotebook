import React, { useState, useEffect } from "react";

const FeedingTable = () => {
  const [feedings, setFeedings] = useState([]);

  useEffect(() => {
    fetch("/api/snakes/feedings/")
      .then((response) => response.json())
      .then((data) => {
        setFeedings(data);
      });
  }, []);

  return (
    <div>
      <h3>Feeding Schedule:</h3>
      <table>
        <thead>
          <tr>
            <th>Snake Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {feedings.map((feeding) => (
            <tr key={feeding.id}>
              <td>{feeding.snake_name}</td>
              <td>{feeding.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedingTable;

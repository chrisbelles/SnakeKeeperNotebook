import React, { useState, useEffect } from "react";

const CleaningTable = () => {
  const [cleanings, setCleanings] = useState([]);

  useEffect(() => {
    fetch("/api/snakes/cleanings/")
      .then((response) => response.json())
      .then((data) => {
        setCleanings(data);
      });
  }, []);

  return (
    <div>
      <h3>Cleaning Schedule:</h3>
      <table>
        <thead>
          <tr>
            <th>Snake Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {cleanings.map((cleaning) => (
            <tr key={cleaning.id}>
              <td>{cleaning.snake_name}</td>
              <td>{cleaning.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CleaningTable;
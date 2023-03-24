import axios from "axios";
import React, { useState, useEffect } from "react";

const CleaningTable = () => {
  const [cleanings, setCleanings] = useState([]);

  useEffect(() => {
    const fetchCleanings = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/snakes/cleanings/"
        );
        setCleanings(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchCleanings();
  }, []);

  const handleCleanedChange = async ({ snakeId, cleaningId, lastCleaned }) => {
    console.log(cleanings);
    console.log(
      `snakeId: ${snakeId}, cleaningId: ${cleaningId}, lastCleaned: ${lastCleaned}`
    );
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/snakes/cleanings/${cleaningId}/`,
        { last_cleaned: lastCleaned, snake: snakeId }
      );
      const updatedCleanings = cleanings.map((cleaning) =>
        cleaning.id === cleaningId ? response.data : cleaning
      );
      setCleanings(updatedCleanings);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Snake</th>
          <th>Last Cleaned</th>
          <th>Cleaning Interval</th>
          <th>Next Cleaning</th>
          <th>Marked Complete</th>
        </tr>
      </thead>
      <tbody>
        {cleanings.map((cleaning) => (
          <tr key={cleaning.cleaning.id}>
            <td>{cleaning.snake.name}</td>
            <td>
              <input
                type="date"
                value={cleaning.cleaning.last_cleaned}
                onChange={(e) =>
                  handleCleanedChange({
                    snakeId: cleaning.snake.id,
                    cleaningId: cleaning.cleaning.id,
                    lastCleaned: e.target.value,
                  })
                }
                style={{ width: "7rem", height: "30px" }}
              />
            </td>
            <td>
              <input
                type="number"
                value={cleaning.cleaning.cleaning_interval}
                onChange={(e) =>
                  handleCleanedChange({
                    snakeId: cleaning.snake.id,
                    cleaningId: cleaning.cleaning.id,
                    cleaningInterval: e.target.value,
                  })
                }
                style={{ width: "7rem", height: "30px" }}
              />
            </td>
            <td>{cleaning.cleaning.next_cleaning}</td>
            <td>{cleaning.cleaning.marked_complete ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CleaningTable;

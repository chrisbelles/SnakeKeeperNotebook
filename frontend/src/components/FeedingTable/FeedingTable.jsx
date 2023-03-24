import axios from "axios";
import React, { useState, useEffect } from "react";

const FeedingTable = () => {
  const [feedings, setFeedings] = useState([]);

  useEffect(() => {
    const fetchFeedings = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/snakes/feedings/"
        );
        setFeedings(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchFeedings();
  }, []);

  const handleFedChange = async ({ snakeId, feedingId, lastFed }) => {
    console.log(
      `snakeId: ${snakeId}, feedingId: ${feedingId}, lastFed: ${lastFed}`
    );
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/snakes/feedings/${feedingId}/`,
        { last_fed: lastFed, snake: snakeId }
      );
      const updatedFeedings = feedings.map((feeding) =>
        feeding.id === feedingId ? response.data : feeding
      );
      setFeedings(updatedFeedings);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Snake</th>
          <th>Last Fed</th>
          <th>Feeding Interval</th>
          <th>Next Feeding</th>
          <th>Marked Complete</th>
        </tr>
      </thead>
      <tbody>
        {feedings.map((feeding) => (
          <tr key={feeding.feeding.id}>
            <td>{feeding.snake.name}</td>
            <td>
              <input
                type="date"
                value={feeding.feeding.last_fed}
                onChange={(e) =>
                  handleFedChange({
                    snakeId: feeding.snake.id,
                    feedingId: feeding.feeding.id,
                    lastFed: e.target.value,
                  })
                }
                style={{ width: "7rem", height: "30px" }}
              />
            </td>
            <td>
              <input
                type="number"
                value={feeding.feeding.feeding_interval}
                onChange={(e) =>
                  handleFedChange({
                    snakeId: feeding.snake.id,
                    feedingId: feeding.feeding.id,
                    feedingInterval: e.target.value,
                  })
                }
                style={{ width: "7rem", height: "30px" }}
              />
            </td>
            <td>{feeding.feeding.next_feed}</td>
            <td>{feeding.feeding.marked_complete ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FeedingTable;

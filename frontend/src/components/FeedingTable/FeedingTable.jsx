import axios from "axios";
import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const FeedingTable = () => {
  const [feedings, setFeedings] = useState([]);
  const [selectedSnake, setSelectedSnake] = useState("");
  const [lastFed, setLastFed] = useState("");
  const [feedingInterval, setFeedingInterval] = useState("");
  const [user, token] = useAuth();
  const [snakes, setSnakes] = useState([]);

  useEffect(() => {
    const fetchSnakes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/snakes/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data);
        setSnakes(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchSnakes();
  }, [token]);

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

  const handleFedChange = async ({
    snakeId,
    feedingId,
    lastFed,
    feedingInterval,
  }) => {
    console.log(
      `snakeId: ${snakeId}, feedingId: ${feedingId}, lastFed: ${lastFed}, feedingInterval: ${feedingInterval}`
    );
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/snakes/feedings/${feedingId}/`,
        { last_fed: lastFed, feeding_interval: feedingInterval, snake: snakeId }
      );
      const updatedFeedings = feedings.map((feeding) =>
        feeding.id === feedingId ? response.data : feeding
      );
      setFeedings(updatedFeedings);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleDelete = async (feedingId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/snakes/feedings/${feedingId}/`
      );
      const updatedFeedings = feedings.filter(
        (feeding) => feeding.feeding.id !== feedingId
      );
      setFeedings(updatedFeedings);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const [newFeeding, setNewFeeding] = useState({
    snake_id: selectedSnake.id,
    last_fed: "",
    feeding_interval: "",
  });

  const handleCreate = async () => {
    console.log("Creating feeding...");
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/snakes/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const snakes = response.data;
  
      let selectedSnake = null;
      for (const snake of snakes) {
        if (window.confirm(`Select ${snake.name}?`)) {
          selectedSnake = snake;
          break;
        }
      }
  
      if (selectedSnake) {
        const newFeedingData = {
          snake_id: selectedSnake.id,
          last_fed: window.prompt("Enter last fed date (yyyy-mm-dd):"),
          feeding_interval: window.prompt("Enter feeding interval:"),
        };
        console.log("New feeding object:", newFeedingData);
  
        const createResponse = await axios.post(
          "http://127.0.0.1:8000/api/snakes/feedings/add/",
          newFeedingData,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const newFeedingEntry = {
          feeding: createResponse.data,
          snake: selectedSnake,
        };
        setFeedings([...feedings, newFeedingEntry]);
        setNewFeeding({
          snake_id: selectedSnake.id,
          last_fed: "",
          feeding_interval: "",
        });
      }
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
          <th>Action</th>
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
                    feedingInterval: feeding.feeding.feeding_interval,
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
                    lastFed: feeding.feeding.last_fed,
                  })
                }
                style={{ width: "7rem", height: "30px" }}
              />
            </td>
            <td>{feeding.feeding.next_feeding}</td>
            <td>{feeding.feeding.marked_complete ? "Yes" : "No"}</td>
            <td>
              <button onClick={() => handleDelete(feeding.feeding.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="6">
          <button
            onClick={async (event) => {
              event.stopPropagation();
              await handleCreate();
            }}
          >
            Add New
          </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default FeedingTable;

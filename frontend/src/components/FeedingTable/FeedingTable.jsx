import axios from "axios";
import React, { useState, useEffect } from "react";

const FeedingTable = () => {
  const [feedings, setFeedings] = useState([]);

  useEffect(() => {
    const fetchFeedings = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/snakes/feedings/');
        setFeedings(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchFeedings();
  }, []);

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
        {feedings.map((feeding, index) => (
          <tr key={feeding.id ? feeding.id : `feeding-${index}`}>
            <td>{feeding.snake.name}</td>
            <td>{feeding.feeding.last_fed}</td>
            <td>{feeding.feeding.feeding_interval}</td>
            <td>{feeding.feeding.next_feeding}</td>
            <td>{feeding.feeding.marked_complete ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FeedingTable;

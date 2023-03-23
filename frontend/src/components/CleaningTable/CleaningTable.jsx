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

  return (
    <table>
      <thead>
        <tr>
          <th>Snake</th>
          <th>Last Cleaned</th>
          <th>Next Cleaning</th>
          <th>Marked Complete</th>
        </tr>
      </thead>
      <tbody>
        {cleanings.map((cleaning) => (
          <tr key={`cleaning-${cleaning.id}`}>
            <td>{cleaning.snake.name}</td>
            <td>{cleaning.cleaning.last_cleaned}</td>
            <td>{cleaning.cleaning.next_cleaning}</td>
            <td>{cleaning.cleaning.marked_complete ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CleaningTable;

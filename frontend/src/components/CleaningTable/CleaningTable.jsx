import React, { useState, useEffect } from "react";

const CleaningTable = (props) => {
    console.log(props.cleanings); 
  const [cleanings, setCleanings] = useState([]);

  useEffect(() => {
    fetch("/api/snakes/cleanings/")
      .then((response) => response.json())
      .then((data) => {
        setCleanings(data);
      });
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
        {props.cleanings.map((cleaning) => (
          <tr key={cleaning.id}>
            <td>{cleaning.snake.name}</td>
            <td>{cleaning.cleaning.last_cleaned}</td>
            <td>{cleaning.cleaning.next_cleaning}</td>
            <td>{cleaning.cleaning.marked_complete ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CleaningTable;

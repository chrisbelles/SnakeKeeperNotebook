import React, { useState, useEffect } from "react";

const FeedingTable = (props) => {
    console.log(props.feedings); 
  const [feedings, setFeedings] = useState([]);

  useEffect(() => {
    fetch("/api/snakes/feedings/")
      .then((response) => response.json())
      .then((data) => {
        setFeedings(data);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Snake</th>
          <th>Last Fed</th>
          <th>Next Feeding</th>
          <th>Marked Complete</th>
        </tr>
      </thead>
      <tbody>
        {props.feedings.map((feeding) => (
          <tr key={feeding.id}>
            <td>{feeding.snake.name}</td>
            <td>{feeding.feeding.last_fed}</td>
            <td>{feeding.feeding.next_feeding}</td>
            <td>{feeding.feeding.marked_complete ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FeedingTable;

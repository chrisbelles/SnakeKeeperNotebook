import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const UserSnakes = () => {
  const [user, token] = useAuth();
  const [snakes, setSnakes] = useState([]);

  useEffect(() => {
    const fetchSnakes = async (token) => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/snakes/", {
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
    fetchSnakes(token);
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/snakes/${id}/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setSnakes(snakes.filter((snake) => snake.id !== id));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container">
      <h1>Your Snakes</h1>
      <Link to="/">Go back to home</Link>
      <Link to="/add-snake">Add a new snake</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Weight</th>
            <th>Genetics</th>
            <th>Paired</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {snakes &&
            snakes.map((snake) => {
              console.log(snake);
              return (
                <tr key={snake.id}>
                  <td>{snake.name}</td>
                  <td>{snake.gender}</td>
                  <td>{snake.age}</td>
                  <td>{snake.weight}</td>
                  <td>{snake.genetics}</td>
                  <td>{snake.paired ? "Yes" : "No"}</td>
                  <td>
                    <button onClick={() => handleDelete(snake.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};


export default UserSnakes;


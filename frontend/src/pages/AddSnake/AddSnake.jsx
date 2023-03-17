import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const AddSnake = ({ authToken }) => {
    const [user, token] = useAuth();
    const [newSnake, setNewSnake] = useState({
        name: "",
        gender: "",
        age: "",
        weight: "",
        genetics: "",
        paired: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSnake({
      ...newSnake,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/snakes/",
        newSnake,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      window.alert("Snake added successfully!");
      setNewSnake({
        name: "",
        gender: "",
        age: "",
        weight: "",
        genetics: "",
        paired: false,
      });
    } catch (error) {
      console.log(error.response.data);
      window.alert("Failed to add new snake. Please check your input.");
    }
  };

  return (
    <div className="container">
      <h1>Add a New Snake</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newSnake.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Gender:
          <select
            name="gender"
            value={newSnake.gender}
            onChange={handleInputChange}
          >
            <option value="">--Select gender--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={newSnake.age}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Weight:
          <input
            type="number"
            name="weight"
            value={newSnake.weight}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Genetics:
          <input
            type="text"
            name="genetics"
            value={newSnake.genetics}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Paired:
          <input
            type="checkbox"
            name="paired"
            checked={newSnake.paired}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Add Snake</button>
      </form>
    </div>
  );
};

export default AddSnake;

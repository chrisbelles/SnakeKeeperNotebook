import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./AddSnake.css";

const styles = {
  label:  {
    float: 'left'
  },
  nameInput: {
    marginLeft : '3.6rem',
    width : '60%'
  },
  genderInput: {
    marginLeft : '2.75rem',
    width : '60%'
  },
  ageInput: {
    marginLeft : '4.5rem',
    width : '60%'
  },  
  weightInput: {
    marginLeft : '3rem',
    width : '60%'
  },
  geneticsInput: {
    marginLeft : '2rem',
    width : '60%'
  },
  button: {
    background: 'gray',
  },
  addsnakelink: {
    marginLeft: '1.5rem',
  }
}

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
      <div className="links">
        <Link to="/user-snakes">View Your Snakes</Link>
        <Link to="/" style={styles.addsnakelink}>Homepage</Link>
      </div>
        <h1>Add a New Snake</h1>
        <br></br>
        <br></br>
        <div className="form-group">
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="name" className="form-label"> Name: </label>
                  <input type="text" name="name" className="form-control" style={styles.nameInput} value={newSnake.name} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                  <label htmlFor="gender" className="form-label"> Gender: </label>
                  <select name="gender" className="form-control" style={styles.genderInput} value={newSnake.gender} onChange={handleInputChange} >
                      <option value="">--Select gender--</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                  </select>
              </div>
              <br></br>
              <div className="mb-3">
                  <label htmlFor="age" className="form-label"> Age: </label>
                  <input type="number" name="age" className="form-control" style={styles.ageInput} value={newSnake.age} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                  <label htmlFor="weight" className="form-label"> Weight: </label>
                  <input type="number" name="weight" className="form-control" style={styles.weightInput} value={newSnake.weight} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                  <label htmlFor="genetics" className="form-label"> Genetics: </label>
                  <input type="text" name="genetics" className="form-control" style={styles.geneticsInput} value={newSnake.genetics} onChange={handleInputChange} required />
              </div>
              <button type="submit" className="btn btn-primary" style={styles.button} > Add Snake </button>
          </form>
        </div>  
    </div>
  );
}

export default AddSnake;

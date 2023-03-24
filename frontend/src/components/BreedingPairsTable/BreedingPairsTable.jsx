import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BreedingPairsTable = () => {
  const [breedingPairs, setBreedingPairs] = useState([]);
  const [males, setMales] = useState([]);
  const [females, setFemales] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/snakes/breeding-pairs/")
      .then((response) => {
        setBreedingPairs(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("http://127.0.0.1:8000/api/snakes/males/")
      .then((response) => {
        setMales(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("http://127.0.0.1:8000/api/snakes/females/")
      .then((response) => {
        setFemales(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/snakes/breeding-pairs/${id}/`)
      .then((response) => {
        setBreedingPairs(breedingPairs.filter((pair) => pair.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const handleMaleChange = (event, pair) => {
    const maleId = event.target.value;
    const updatedPair = {
      ...pair,
      male: { ...pair.male, id: maleId },
    };
    updateBreedingPair(updatedPair);
  };

  const handleFemaleChange = (event, pair) => {
    const femaleId = event.target.value;
    const updatedPair = {
      ...pair,
      female: { ...pair.female, id: femaleId },
    };
    updateBreedingPair(updatedPair);
  };

  const updateBreedingPair = (pair) => {
    axios
      .put(`http://127.0.0.1:8000/api/snakes/breeding-pairs/${pair.id}/`, pair)
      .then((response) => {
        const updatedBreedingPairs = breedingPairs.map((existingPair) => {
          return existingPair.id === response.data.id
            ? response.data
            : existingPair;
        });
        setBreedingPairs(updatedBreedingPairs);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>Breeding Pairs</h2>
      <table>
        <thead>
          <tr>
            <th>Male</th>
            <th>Female</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {breedingPairs.map((pair) => (
            <tr key={pair.id}>
              <td>
                <div className="select-wrapper">
                  <select
                    name="male"
                    value={pair.male.id}
                    onChange={(event) => handleMaleChange(event, pair)}
                  >
                    {males.map((male) => (
                      <option key={male.id} value={male.id}>
                        {male.name}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
              <td>
                <div className="select-wrapper">
                  <select
                    name="female"
                    value={pair.female.id}
                    onChange={(event) => handleFemaleChange(event, pair)}
                  >
                    {females.map((female) => (
                      <option key={female.id} value={female.id}>
                        {female.name}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
              <td>{pair.start_date}</td>
              <td>{pair.end_date ? pair.end_date : "-"}</td>
              <td>
                <button
                  color="primary"
                  tag={Link}
                  to={`/breeding-pairs/${pair.id}/edit`}
                >
                  Edit
                </button>{" "}
                <button color="danger" onClick={() => handleDelete(pair.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button color="success" tag={Link} to="/breeding-pairs/new">
        New Breeding Pair
      </button>
    </div>
  );
};

export default BreedingPairsTable;

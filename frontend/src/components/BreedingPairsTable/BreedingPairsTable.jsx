import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BreedingPairsTable = () => {
  const [breedingPairs, setBreedingPairs] = useState([]);
  const [males, setMales] = useState([]);
  const [females, setFemales] = useState([]);
  const [selectedMale, setSelectedMale] = useState(null);
  const [selectedFemale, setSelectedFemale] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/snakes/breeding-pairs/")
      .then((response) => {
        setBreedingPairs(response.data);
        console.log("Breeding pairs:", response.data);
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
    setSelectedMale(maleId);
    const updatedMale = males.find((male) => male.id === maleId);
    const updatedPair = {
      ...pair,
      male: { ...updatedMale },
    };
    updateBreedingPair(updatedPair);
  };
  
  const handleFemaleChange = (event, pair) => {
    const femaleId = event.target.value;
    setSelectedFemale(femaleId);
    const updatedFemale = females.find((female) => female.id === femaleId);
    const updatedPair = {
      ...pair,
      female: { ...updatedFemale },
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
              <td>{pair.male_name}</td>
              <td>{pair.female_name}</td>
              <td>{pair.start_date}</td>
              <td>{pair.end_date ? pair.end_date : "-"}</td>
              <td>
                <button color="danger" onClick={() => handleDelete(pair.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/breeding-pairs/">
        <button color="success">
         Add New Pair
        </button>
      </Link>
    </div>
  );
};

export default BreedingPairsTable;
